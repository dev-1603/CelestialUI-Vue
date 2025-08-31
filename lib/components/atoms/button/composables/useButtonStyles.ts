import { computed } from 'vue'
import type { CButtonProps, UseButtonStylesReturn } from '../CButton.types'

/**
 * Composable for button styling and CSS class computation
 * Handles variant classes, size classes, and state classes
 */
export function useButtonStyles(props: CButtonProps): UseButtonStylesReturn {

  /**
   * Compute main button classes based on props
   */
  const buttonClasses = computed(() => {
    const classes = [
      'celestial-button',
      `celestial-button--${props.variant || 'primary'}`,
      `celestial-button--${props.size || 'md'}`
    ]

    // State classes
    if (props.loading) classes.push('celestial-button--loading')
    if (props.disabled) classes.push('celestial-button--disabled')
    if (props.fullWidth) classes.push('celestial-button--block')

    // Rounded variants
    if (props.rounded === true) {
      classes.push('celestial-button--rounded')
    } else if (typeof props.rounded === 'string') {
      classes.push(`celestial-button--rounded-${props.rounded}`)
    }

    // Special handling for link variant
    if (props.variant === 'link') {
      classes.push('celestial-button--link')
    }

    return classes
  })

  /**
   * Compute icon classes based on size
   */
  const iconClasses = computed(() => {
    const classes = ['celestial-button__icon']

    // Size-specific icon classes
    switch (props.size) {
      case 'xs':
        classes.push('celestial-button__icon--xs')
        break
      case 'sm':
        classes.push('celestial-button__icon--sm')
        break
      case 'lg':
        classes.push('celestial-button__icon--lg')
        break
      case 'xl':
        classes.push('celestial-button__icon--xl')
        break
      default:
        classes.push('celestial-button__icon--md')
    }

    return classes
  })

  /**
   * Compute text wrapper classes
   */
  const textClasses = computed(() => {
    const classes = ['celestial-button__text']

    // Add size-specific text classes if needed
    if (props.size) {
      classes.push(`celestial-button__text--${props.size}`)
    }

    return classes
  })

  return {
    buttonClasses,
    iconClasses,
    textClasses
  }
}
