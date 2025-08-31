import { computed, ref, watch } from 'vue'
import type { CIconProps, CIconEmits, IconConfig } from '../CIcon.types'
import { getIconLibraryConfig } from '../config/iconLibraryConfig'
import { loadSvg, transformSvgForInline, getSvgAttributes } from '../utils/svgLoader'

export function useIcon(props: CIconProps, emit: CIconEmits) {
  const svgContent = ref<string>('')
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)
  const svgAttributes = ref<Record<string, string>>({})

  // Determine the icon type based on props
  const iconType = computed(() => {
    if (props.svg) return 'svg'
    if (props.src) {
      // Check if it's an SVG file by extension or if inlineSvg is enabled
      const isSvgFile = props.src.toLowerCase().includes('.svg')
      if (isSvgFile && props.inlineSvg) return 'svg'
      return 'image'
    }
    return props.type || 'font'
  })

  // Determine the HTML element to render
  const iconElement = computed(() => {
    switch (iconType.value) {
      case 'svg':
        return 'svg'
      case 'image':
        return 'img'
      case 'font':
      default:
        return props.clickable ? 'button' : 'i'
    }
  })

  // Get icon configuration
  const iconConfig = computed<IconConfig>(() => ({
    library: props.library || 'material',
    type: iconType.value,
    name: props.name,
    variant: props.variant,
    faStyle: props.faStyle,
    svg: props.svg,
    src: props.src
  }))

  // Generate class names for font icons
  const fontIconClasses = computed(() => {
    const config = getIconLibraryConfig()
    const libraryConfig = config[props.library || 'material']

    if (!libraryConfig || iconType.value !== 'font' || !props.name) {
      return []
    }

    const classes: string[] = []

    // Add library-specific classes
    if (props.library === 'material') {
      // For Material Icons, use variant class OR base class
      // Note: Material Icons use text content for icon name, not classes
      if (props.variant && 'variants' in libraryConfig) {
        classes.push(libraryConfig.variants[props.variant])
      } else {
        classes.push(libraryConfig.baseClass) // Default to filled variant
      }
      // Material Icons don't need the icon name as a class - it's text content
    } else if (props.library === 'fontawesome') {
      classes.push(libraryConfig.baseClass)
      if (props.faStyle && 'styles' in libraryConfig) {
        classes.push(libraryConfig.styles[props.faStyle])
      }
      if (props.name) {
        classes.push(`fa-${props.name}`)
      }
    } else {
      classes.push(libraryConfig.baseClass)
    }

    return classes
  })

    // Generate attributes for different icon types
  const iconAttributes = computed(() => {
    const attrs: Record<string, any> = {}

    switch (iconType.value) {
      case 'svg':
        attrs.xmlns = 'http://www.w3.org/2000/svg'
        // Use extracted viewBox from loaded SVG or fallback to prop
        attrs.viewBox = svgAttributes.value.viewBox || props.viewBox || '0 0 24 24'
        attrs.fill = 'currentColor'

        // Handle pixel sizes for SVG
        if (typeof props.size === 'number') {
          attrs.width = `${props.size}px`
          attrs.height = `${props.size}px`
        } else if (props.width || props.height) {
          if (props.width) attrs.width = typeof props.width === 'number' ? `${props.width}px` : props.width
          if (props.height) attrs.height = typeof props.height === 'number' ? `${props.height}px` : props.height
        }
        break

      case 'image':
        attrs.src = props.src
        attrs.alt = props.alt || props.ariaLabel || ''

        // Handle pixel sizes for images
        if (typeof props.size === 'number') {
          attrs.width = `${props.size}px`
          attrs.height = `${props.size}px`
        } else if (props.width || props.height) {
          if (props.width) attrs.width = typeof props.width === 'number' ? `${props.width}px` : props.width
          if (props.height) attrs.height = typeof props.height === 'number' ? `${props.height}px` : props.height
        }

        attrs.onload = (event: Event) => emit('load', event)
        attrs.onerror = (event: Event) => emit('error', event)
        break

      case 'font':
        if (props.clickable) {
          attrs.type = 'button'
          attrs.onclick = (event: MouseEvent) => {
            if (!props.disabled && !props.loading) {
              emit('click', event)
            }
          }
        }
        break
    }

    return attrs
  })

  // Handle SVG content loading
  const loadSvgContent = async (svgString: string) => {
    svgContent.value = svgString
  }

  // Load external SVG file
  const loadExternalSvg = async (url: string) => {
    if (!url) return

    isLoading.value = true
    loadError.value = null

    try {
      const content = await loadSvg(url, {
        cache: props.cacheSvg,
        timeout: props.loadTimeout,
        transform: transformSvgForInline
      })

      // Extract original SVG attributes for viewBox, etc.
      const fullSvg = await loadSvg(url, {
        cache: props.cacheSvg,
        timeout: props.loadTimeout
      })
      svgAttributes.value = getSvgAttributes(fullSvg)

      svgContent.value = content
      emit('load', new Event('load'))
    } catch (error) {
      loadError.value = error instanceof Error ? error.message : 'Failed to load SVG'
      emit('error', new Event('error'))
    } finally {
      isLoading.value = false
    }
  }

  // Watch for changes in src prop to load SVG
  watch(
    () => props.src,
    (newSrc) => {
      if (newSrc && iconType.value === 'svg' && props.inlineSvg) {
        loadExternalSvg(newSrc)
      }
    },
    { immediate: true }
  )

  // Accessibility attributes
  const role = computed(() => {
    if (props.role) return props.role
    if (props.clickable) return 'button'
    if (iconType.value === 'image') return 'img'
    return 'img'
  })

  const ariaLabel = computed(() => {
    if (props.ariaLabel) return props.ariaLabel
    if (iconType.value === 'image' && props.alt) return props.alt
    if (props.name) return props.name
    return undefined
  })

  const ariaHidden = computed(() => {
    if (props.ariaHidden !== undefined) return props.ariaHidden
    // Hide decorative icons from screen readers
    return !props.ariaLabel && !props.alt && !props.clickable
  })

    // Initialize SVG content if provided
  if (props.svg) {
    loadSvgContent(props.svg)
  }

  return {
    iconElement,
    iconAttributes,
    iconType,
    iconConfig,
    fontIconClasses,
    svgContent,
    svgAttributes,
    isLoading,
    loadError,
    loadSvgContent,
    loadExternalSvg,
    role,
    ariaLabel,
    ariaHidden
  }
}
