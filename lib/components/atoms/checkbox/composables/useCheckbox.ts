import { computed, ref } from 'vue'
import type { CCheckboxProps, CCheckboxEmits, UseCheckboxReturn } from '../CCheckbox.types'

/**
 * Composable for checkbox behavior and logic
 * Handles state management, event handling, and accessibility
 */
export function useCheckbox(
  props: CCheckboxProps,
  emit: CCheckboxEmits
): UseCheckboxReturn {

  // Internal state for focus tracking
  const isFocused = ref(false)

  /**
   * Compute checked state
   */
  const isChecked = computed(() => {
    return Boolean(props.checked)
  })

  /**
   * Compute disabled state
   */
  const isDisabled = computed(() => {
    return Boolean(props.disabled)
  })

  /**
   * Compute indeterminate state
   */
  const isIndeterminate = computed(() => {
    return Boolean(props.indeterminate)
  })

  /**
   * Generate input element props and attributes
   */
  const inputProps = computed(() => {
    const baseProps = {
      type: 'checkbox',
      checked: isChecked.value,
      disabled: isDisabled.value,
      'aria-checked': isIndeterminate.value ? 'mixed' : isChecked.value,
      'aria-describedby': props.ariaDescribedBy,
      tabindex: props.tabIndex,
      form: props.form,
      id: props.id,
      name: props.name,
      value: props.value
    }

    // Remove undefined values
    return Object.fromEntries(
      Object.entries(baseProps).filter(([_, value]) => value !== undefined)
    )
  })

  /**
   * Handle change events
   */
  const handleChange = (event: Event) => {
    if (isDisabled.value) {
      event.preventDefault()
      return
    }

    const target = event.target as HTMLInputElement
    const newChecked = target.checked

    emit('change', newChecked, event)
  }

  /**
   * Handle focus events
   */
  const handleFocus = (event: FocusEvent) => {
    if (isDisabled.value) return

    isFocused.value = true
    emit('focus', event)
  }

  /**
   * Handle blur events
   */
  const handleBlur = (event: FocusEvent) => {
    if (isDisabled.value) return

    isFocused.value = false
    emit('blur', event)
  }

  /**
   * Handle keyboard events for accessibility
   * Space key toggles checkbox state
   */
  const handleKeydown = (event: KeyboardEvent) => {
    if (isDisabled.value) return

    // Space key should toggle checkbox
    if (event.key === ' ') {
      event.preventDefault()

      // Create synthetic change event
      const target = event.target as HTMLInputElement
      const syntheticEvent = new Event('change', {
        bubbles: true,
        cancelable: true
      })

      // Toggle the checked state
      target.checked = !isChecked.value

      handleChange(syntheticEvent)
    }
  }

  return {
    inputProps,
    isChecked,
    isDisabled,
    isIndeterminate,
    handleChange,
    handleFocus,
    handleBlur,
    handleKeydown
  }
}

/**
 * Headless checkbox hook for custom implementations
 * Provides checkbox logic without any UI assumptions
 */
export function useCheckboxHeadless(config: {
  defaultChecked?: boolean
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  onChange?: (checked: boolean, event: Event) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
} = {}) {
  const {
    defaultChecked = false,
    checked,
    indeterminate = false,
    disabled = false,
    onChange,
    onFocus,
    onBlur
  } = config

  // Internal state for uncontrolled usage
  const internalChecked = ref(defaultChecked)
  const isFocused = ref(false)

  // Use controlled value if provided, otherwise use internal state
  const isChecked = computed(() => {
    return checked !== undefined ? checked : internalChecked.value
  })

  const isDisabled = computed(() => Boolean(disabled))
  const isIndeterminate = computed(() => Boolean(indeterminate))

  const toggle = (event?: Event) => {
    if (isDisabled.value) return

    const newChecked = !isChecked.value

    // Update internal state if uncontrolled
    if (checked === undefined) {
      internalChecked.value = newChecked
    }

    // Call external handler
    if (onChange && event) {
      onChange(newChecked, event)
    }

    return newChecked
  }

  const handleFocus = (event: FocusEvent) => {
    if (isDisabled.value) return

    isFocused.value = true
    onFocus?.(event)
  }

  const handleBlur = (event: FocusEvent) => {
    if (isDisabled.value) return

    isFocused.value = false
    onBlur?.(event)
  }

  return {
    isChecked,
    isDisabled,
    isIndeterminate,
    isFocused,
    toggle,
    handleFocus,
    handleBlur
  }
}
