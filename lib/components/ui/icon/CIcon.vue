<template>
  <component
    :is="iconComponent"
    :class="iconClasses"
    :style="iconStyles"
    v-bind="iconProps"
  />
</template>

<script setup lang="ts">
import { computed, inject, type Component } from 'vue'
import type { IconConfig } from '../../../types'
import { useComponentTheme } from '../../../composables/useTheme'

interface Props {
  name: string
  size?: string | number
  color?: string
  provider?: 'fontawesome' | 'material' | 'heroicons' | 'lucide' | 'custom'
  format?: 'svg' | 'font' | 'img'
  spin?: boolean
  pulse?: boolean
  flip?: 'horizontal' | 'vertical' | 'both'
  rotate?: number
  class?: string
  style?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  size: '1em',
  provider: 'fontawesome',
  format: 'font',
  spin: false,
  pulse: false,
  rotate: 0
})

const iconConfig = inject<IconConfig>('icon-config', {
  provider: 'fontawesome',
  format: 'font'
})

const { componentClasses, componentStyles } = useComponentTheme('icon', props)

// Determine the icon component to render
const iconComponent = computed((): string | Component => {
  const provider = props.provider || iconConfig.provider
  const format = props.format || iconConfig.format

  switch (provider) {
    case 'fontawesome':
      return 'i'
    case 'material':
      return format === 'svg' ? 'svg' : 'i'
    case 'heroicons':
    case 'lucide':
      return 'svg'
    case 'custom':
      // Check if custom icon exists
      if (iconConfig.customIcons?.[props.name]) {
        const customIcon = iconConfig.customIcons[props.name]
        return typeof customIcon === 'string' ? 'img' : customIcon
      }
      return 'i'
    default:
      return 'i'
  }
})

// Generate icon classes
const iconClasses = computed(() => {
  const classes = [...componentClasses.value]
  const provider = props.provider || iconConfig.provider
  const format = props.format || iconConfig.format

  switch (provider) {
    case 'fontawesome':
      if (format === 'font') {
        const prefix = iconConfig.prefix || 'fas'
        classes.push(prefix, `fa-${props.name}`)

        if (props.spin) classes.push('fa-spin')
        if (props.pulse) classes.push('fa-pulse')
        if (props.flip) {
          if (props.flip === 'horizontal') classes.push('fa-flip-horizontal')
          if (props.flip === 'vertical') classes.push('fa-flip-vertical')
          if (props.flip === 'both') classes.push('fa-flip-horizontal', 'fa-flip-vertical')
        }
      }
      break

    case 'material':
      if (format === 'font') {
        classes.push('material-icons')
      }
      break

    default:
      // Add provider-specific classes
      break
  }

  if (props.class) {
    classes.push(props.class)
  }

  return classes
})

// Generate icon styles
const iconStyles = computed(() => {
  const styles = { ...componentStyles.value }

  // Size handling
  if (props.size) {
    const size = typeof props.size === 'number' ? `${props.size}px` : props.size
    styles.fontSize = size
    styles.width = size
    styles.height = size
  }

  // Color handling
  if (props.color) {
    styles.color = props.color
  }

  // Rotation
  if (props.rotate && props.rotate !== 0) {
    styles.transform = `rotate(${props.rotate}deg)`
  }

  // Animation
  if (props.spin && props.provider !== 'fontawesome') {
    styles.animation = 'cui-icon-spin 1s linear infinite'
  }

  if (props.pulse && props.provider !== 'fontawesome') {
    styles.animation = 'cui-icon-pulse 1s ease-in-out infinite alternate'
  }

  return styles
})

// Generate icon props for different providers
const iconProps = computed(() => {
  const provider = props.provider || iconConfig.provider
  const format = props.format || iconConfig.format
  const iconProps: Record<string, any> = {}

  if (provider === 'material' && format === 'font') {
    // Material Icons use text content
    return { innerHTML: props.name }
  }

  if (provider === 'custom' && iconConfig.customIcons?.[props.name]) {
    const customIcon = iconConfig.customIcons[props.name]
    if (typeof customIcon === 'string') {
      iconProps.src = customIcon
      iconProps.alt = props.name
    }
  }

  // SVG props for heroicons, lucide, etc.
  if (format === 'svg') {
    iconProps.width = props.size
    iconProps.height = props.size
    iconProps.viewBox = '0 0 24 24'
    iconProps.fill = 'currentColor'
  }

  return iconProps
})
</script>

<style scoped>
.cui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 1;
}

.cui-icon--spin {
  animation: cui-icon-spin 1s linear infinite;
}

.cui-icon--pulse {
  animation: cui-icon-pulse 1s ease-in-out infinite alternate;
}

@keyframes cui-icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes cui-icon-pulse {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.5;
  }
}

/* Provider-specific styles */
.cui-icon.material-icons {
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

.cui-icon svg {
  display: block;
}

.cui-icon img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
