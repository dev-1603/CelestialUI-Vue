import { computed, type ComputedRef } from 'vue'
import type { CInputProps, UseInputStylesReturn } from '../CInput.types'

/**
 * Utility function to merge classes
 */
function mergeClasses(defaultClasses: string[], customClasses?: string | string[], headless?: boolean): string[] {
  if (headless) {
    // In headless mode, only return custom classes
    return Array.isArray(customClasses) ? customClasses : customClasses ? [customClasses] : []
  }

  const custom = Array.isArray(customClasses) ? customClasses : customClasses ? [customClasses] : []
  return [...defaultClasses, ...custom]
}

/**
 * Composable for input styling and CSS class computation
 * Handles size variants, visual variants, state classes, and custom overrides
 */
export function useInputStyles(
  props: CInputProps,
  state: ComputedRef<{
    isFocused: boolean
    hasLeftElement: boolean
    hasRightElement: boolean
    hasValue: boolean
  }>
): UseInputStylesReturn {

  /**
   * Compute wrapper classes based on props and state
   */
  const wrapperClasses = computed(() => {
    // Skip default classes if unstyled or headless
    if (props.unstyled) return []

    const defaultClasses = []

    if (!props.headless) {
      defaultClasses.push(
        'celestial-input',
        `celestial-input--${props.size || 'md'}`,
        `celestial-input--${props.variant || 'outline'}`
      )

      // State classes
      if (props.disabled) defaultClasses.push('celestial-input--disabled')
      if (props.readonly) defaultClasses.push('celestial-input--readonly')
      if (props.required) defaultClasses.push('celestial-input--required')
      if (props.invalid) defaultClasses.push('celestial-input--invalid')
      if (state.value.isFocused) defaultClasses.push('celestial-input--focused')
      if (state.value.hasValue) defaultClasses.push('celestial-input--has-value')
      if (state.value.hasLeftElement) defaultClasses.push('celestial-input--has-left')
      if (state.value.hasRightElement) defaultClasses.push('celestial-input--has-right')
    }

    return mergeClasses(defaultClasses, props.wrapperClass, props.headless)
  })

  /**
   * Compute input container classes
   */
  const inputContainerClasses = computed(() => {
    if (props.unstyled) return mergeClasses([], props.containerClass, props.headless)

    const defaultClasses = []

    if (!props.headless) {
      defaultClasses.push('celestial-input__container')

      // Size variants
      switch (props.size) {
        case 'sm':
          defaultClasses.push('celestial-input__container--sm')
          break
        case 'lg':
          defaultClasses.push('celestial-input__container--lg')
          break
        default:
          defaultClasses.push('celestial-input__container--md')
      }

      // Variant classes
      switch (props.variant) {
        case 'filled':
          defaultClasses.push('celestial-input__container--filled')
          break
        case 'unstyled':
          defaultClasses.push('celestial-input__container--unstyled')
          break
        default:
          defaultClasses.push('celestial-input__container--outline')
      }

      // State classes
      if (props.disabled) defaultClasses.push('celestial-input__container--disabled')
      if (props.readonly) defaultClasses.push('celestial-input__container--readonly')
      if (props.invalid) defaultClasses.push('celestial-input__container--invalid')
      if (state.value.isFocused) defaultClasses.push('celestial-input__container--focused')
    }

    return mergeClasses(defaultClasses, props.containerClass, props.headless)
  })

  /**
   * Compute input field classes
   */
  const inputClasses = computed(() => {
    if (props.unstyled) return mergeClasses([], props.inputClass, props.headless)

    const defaultClasses = []

    if (!props.headless) {
      defaultClasses.push('celestial-input__field')

      // Size-specific input classes
      switch (props.size) {
        case 'sm':
          defaultClasses.push('celestial-input__field--sm')
          break
        case 'lg':
          defaultClasses.push('celestial-input__field--lg')
          break
        default:
          defaultClasses.push('celestial-input__field--md')
      }

      // Variant classes
      switch (props.variant) {
        case 'filled':
          defaultClasses.push('celestial-input__field--filled')
          break
        case 'unstyled':
          defaultClasses.push('celestial-input__field--unstyled')
          break
        default:
          defaultClasses.push('celestial-input__field--outline')
      }

      // State classes
      if (props.disabled) defaultClasses.push('celestial-input__field--disabled')
      if (props.readonly) defaultClasses.push('celestial-input__field--readonly')
      if (props.invalid) defaultClasses.push('celestial-input__field--invalid')

      // Padding adjustments for elements
      if (state.value.hasLeftElement) defaultClasses.push('celestial-input__field--has-left')
      if (state.value.hasRightElement) defaultClasses.push('celestial-input__field--has-right')
    }

    return mergeClasses(defaultClasses, props.inputClass, props.headless)
  })

  /**
   * Compute left element classes
   */
  const leftElementClasses = computed(() => {
    if (props.unstyled) return mergeClasses([], props.leftElementClass, props.headless)

    const defaultClasses = []

    if (!props.headless) {
      defaultClasses.push('celestial-input__left-element')

      // Size variants
      switch (props.size) {
        case 'sm':
          defaultClasses.push('celestial-input__left-element--sm')
          break
        case 'lg':
          defaultClasses.push('celestial-input__left-element--lg')
          break
        default:
          defaultClasses.push('celestial-input__left-element--md')
      }

      // State classes
      if (props.disabled) defaultClasses.push('celestial-input__left-element--disabled')
      if (props.invalid) defaultClasses.push('celestial-input__left-element--invalid')
    }

    return mergeClasses(defaultClasses, props.leftElementClass, props.headless)
  })

  /**
   * Compute right element classes
   */
  const rightElementClasses = computed(() => {
    if (props.unstyled) return mergeClasses([], props.rightElementClass, props.headless)

    const defaultClasses = []

    if (!props.headless) {
      defaultClasses.push('celestial-input__right-element')

      // Size variants
      switch (props.size) {
        case 'sm':
          defaultClasses.push('celestial-input__right-element--sm')
          break
        case 'lg':
          defaultClasses.push('celestial-input__right-element--lg')
          break
        default:
          defaultClasses.push('celestial-input__right-element--md')
      }

      // State classes
      if (props.disabled) defaultClasses.push('celestial-input__right-element--disabled')
      if (props.invalid) defaultClasses.push('celestial-input__right-element--invalid')
    }

    return mergeClasses(defaultClasses, props.rightElementClass, props.headless)
  })

  /**
   * Compute helper text classes
   */
  const helperTextClasses = computed(() => {
    if (props.unstyled) return mergeClasses([], props.helperTextClass, props.headless)

    const defaultClasses = []

    if (!props.headless) {
      defaultClasses.push('celestial-input__helper-text')

      // Size variants
      switch (props.size) {
        case 'sm':
          defaultClasses.push('celestial-input__helper-text--sm')
          break
        case 'lg':
          defaultClasses.push('celestial-input__helper-text--lg')
          break
        default:
          defaultClasses.push('celestial-input__helper-text--md')
      }

      // State classes
      if (props.disabled) defaultClasses.push('celestial-input__helper-text--disabled')
    }

    return mergeClasses(defaultClasses, props.helperTextClass, props.headless)
  })

  /**
   * Compute error message classes
   */
  const errorMessageClasses = computed(() => {
    if (props.unstyled) return mergeClasses([], props.errorMessageClass, props.headless)

    const defaultClasses = []

    if (!props.headless) {
      defaultClasses.push('celestial-input__error-message')

      // Size variants
      switch (props.size) {
        case 'sm':
          defaultClasses.push('celestial-input__error-message--sm')
          break
        case 'lg':
          defaultClasses.push('celestial-input__error-message--lg')
          break
        default:
          defaultClasses.push('celestial-input__error-message--md')
      }

      // Always show as error state
      defaultClasses.push('celestial-input__error-message--error')
    }

    return mergeClasses(defaultClasses, props.errorMessageClass, props.headless)
  })

  return {
    wrapperClasses,
    inputClasses,
    leftElementClasses,
    rightElementClasses,
    helperTextClasses,
    errorMessageClasses,
    inputContainerClasses
  }
}
