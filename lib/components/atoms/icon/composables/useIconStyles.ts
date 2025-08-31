import { computed, type ComputedRef } from 'vue'
import type { CIconProps } from '../CIcon.types'
import { getIconLibraryConfig } from '../config/iconLibraryConfig'

export function useIconStyles(props: CIconProps, fontIconClasses?: ComputedRef<string[]>) {
  // Get library configuration
  const libraryConfig = computed(() => {
    const config = getIconLibraryConfig()
    return config[props.library || 'material']
  })

  // Generate CSS classes
  const iconClasses = computed(() => {
    const classes = ['c-icon']

    // Add font icon classes if provided
    if (fontIconClasses && fontIconClasses.value.length > 0) {
      classes.push(...fontIconClasses.value)
    }

    // Fallback: Base library classes (for font icons)
    const iconType = props.type || 'font'
    if (iconType === 'font' && libraryConfig.value && (!fontIconClasses || fontIconClasses.value.length === 0)) {
      classes.push(libraryConfig.value.baseClass)

      // Add library-specific classes
      if (props.library === 'material') {
        if (props.variant && 'variants' in libraryConfig.value) {
          classes.push(libraryConfig.value.variants[props.variant])
        }
        if (props.name) {
          classes.push(props.name)
        }
      } else if (props.library === 'fontawesome') {
        if (props.faStyle && 'styles' in libraryConfig.value) {
          classes.push(libraryConfig.value.styles[props.faStyle])
        }
        if (props.name) {
          classes.push(`fa-${props.name}`)
        }
      }
    }

    // Size classes
    if (typeof props.size === 'string' && libraryConfig.value?.sizes[props.size as keyof typeof libraryConfig.value.sizes]) {
      classes.push(`c-icon--${props.size}`)
    } else if (typeof props.size === 'string') {
      classes.push(`c-icon--${props.size}`)
    }

    // Color classes
    if (props.color && props.color !== 'inherit') {
      classes.push(`c-icon--${props.color}`)
    }

    // State classes
    if (props.clickable) classes.push('c-icon--clickable')
    if (props.disabled) classes.push('c-icon--disabled')
    if (props.loading) classes.push('c-icon--loading')

    // Transform classes
    if (props.flipX) classes.push('c-icon--flip-x')
    if (props.flipY) classes.push('c-icon--flip-y')
    if (props.rotate) classes.push(`c-icon--rotate-${props.rotate}`)

    // Animation classes
    if (props.animation) classes.push(`c-icon--${props.animation}`)

    // Type-specific classes
    classes.push(`c-icon--${props.type || 'font'}`)

    // Custom classes
    if (props.class) {
      if (typeof props.class === 'string') {
        classes.push(props.class)
      }
    }

    return classes.join(' ')
  })

    // Generate inline styles
  const iconStyles = computed(() => {
    const styles: Record<string, string> = {}

    // Custom size handling
    if (typeof props.size === 'number') {
      // Number is treated as pixels
      const sizeValue = `${props.size}px`
      styles.fontSize = sizeValue
      styles.width = sizeValue
      styles.height = sizeValue
    } else if (typeof props.size === 'string') {
      // Check if it's a predefined size
      const predefinedSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
      if (!predefinedSizes.includes(props.size)) {
        // Custom string size (e.g., "2rem", "32px", "1.5em")
        styles.fontSize = props.size
        styles.width = props.size
        styles.height = props.size
      }
    }

    // Custom color (when color is not a predefined color)
    if (props.color && !['inherit', 'current', 'primary', 'secondary', 'success', 'warning', 'error', 'info'].includes(props.color)) {
      styles.color = props.color
    }

    // Custom dimensions for SVG/image
    if (props.width && (props.type === 'svg' || props.type === 'image')) {
      styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
    }
    if (props.height && (props.type === 'svg' || props.type === 'image')) {
      styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
    }

    // Custom rotation
    if (props.rotate && typeof props.rotate === 'number') {
      styles.transform = `rotate(${props.rotate}deg)`
    }

    // Merge with custom styles
    if (props.style) {
      if (typeof props.style === 'string') {
        // Parse string styles
        const customStyles = props.style.split(';').reduce((acc, style) => {
          const [property, value] = style.split(':').map(s => s.trim())
          if (property && value) {
            acc[property] = value
          }
          return acc
        }, {} as Record<string, string>)
        Object.assign(styles, customStyles)
      } else {
        Object.assign(styles, props.style)
      }
    }

    return styles
  })

  return {
    iconClasses,
    iconStyles
  }
}
