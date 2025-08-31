import { computed } from 'vue'
import type { CCheckboxProps, UseCheckboxStylesReturn } from '../CCheckbox.types'

/**
 * Composable for checkbox styling and CSS class computation
 * Handles size variants, color schemes, and state classes
 */
export function useCheckboxStyles(props: CCheckboxProps): UseCheckboxStylesReturn {

  /**
   * Compute wrapper classes based on props
   */
  const wrapperClasses = computed(() => {
    const classes = [
      'celestial-checkbox',
      `celestial-checkbox--${props.size || 'md'}`
    ]

    // State classes
    if (props.disabled) classes.push('celestial-checkbox--disabled')
    if (props.checked) classes.push('celestial-checkbox--checked')
    if (props.indeterminate) classes.push('celestial-checkbox--indeterminate')

    // Color scheme
    if (props.colorScheme) {
      classes.push(`celestial-checkbox--${props.colorScheme}`)
    }

    return classes
  })

  /**
   * Compute input element classes
   */
  const inputClasses = computed(() => {
    const classes = ['celestial-checkbox__input']

    // Size-specific input classes
    switch (props.size) {
      case 'sm':
        classes.push('celestial-checkbox__input--sm')
        break
      case 'lg':
        classes.push('celestial-checkbox__input--lg')
        break
      default:
        classes.push('celestial-checkbox__input--md')
    }

    return classes
  })

  /**
   * Compute checkbox box classes (visual checkbox)
   */
  const checkboxClasses = computed(() => {
    const classes = ['celestial-checkbox__box']

    // Size variants
    switch (props.size) {
      case 'sm':
        classes.push('celestial-checkbox__box--sm')
        break
      case 'lg':
        classes.push('celestial-checkbox__box--lg')
        break
      default:
        classes.push('celestial-checkbox__box--md')
    }

    // State classes
    if (props.checked) classes.push('celestial-checkbox__box--checked')
    if (props.indeterminate) classes.push('celestial-checkbox__box--indeterminate')
    if (props.disabled) classes.push('celestial-checkbox__box--disabled')

    // Color scheme
    if (props.colorScheme) {
      classes.push(`celestial-checkbox__box--${props.colorScheme}`)
    }

    return classes
  })

  /**
   * Compute icon classes
   */
  const iconClasses = computed(() => {
    const classes = ['celestial-checkbox__icon']

    // Size-specific icon classes
    switch (props.size) {
      case 'sm':
        classes.push('celestial-checkbox__icon--sm')
        break
      case 'lg':
        classes.push('celestial-checkbox__icon--lg')
        break
      default:
        classes.push('celestial-checkbox__icon--md')
    }

    // State classes for icon visibility
    if (props.checked) classes.push('celestial-checkbox__icon--visible')
    if (props.indeterminate) classes.push('celestial-checkbox__icon--indeterminate')

    return classes
  })

  /**
   * Compute label classes
   */
  const labelClasses = computed(() => {
    const classes = ['celestial-checkbox__label']

    // Size-specific text classes
    switch (props.size) {
      case 'sm':
        classes.push('celestial-checkbox__label--sm')
        break
      case 'lg':
        classes.push('celestial-checkbox__label--lg')
        break
      default:
        classes.push('celestial-checkbox__label--md')
    }

    // State classes
    if (props.disabled) classes.push('celestial-checkbox__label--disabled')

    return classes
  })

  /**
   * Compute description classes
   */
  const descriptionClasses = computed(() => {
    const classes = ['celestial-checkbox__description']

    // Size-specific description classes
    switch (props.size) {
      case 'sm':
        classes.push('celestial-checkbox__description--sm')
        break
      case 'lg':
        classes.push('celestial-checkbox__description--lg')
        break
      default:
        classes.push('celestial-checkbox__description--md')
    }

    // State classes
    if (props.disabled) classes.push('celestial-checkbox__description--disabled')

    return classes
  })

  return {
    wrapperClasses,
    inputClasses,
    checkboxClasses,
    iconClasses,
    labelClasses,
    descriptionClasses
  }
}
