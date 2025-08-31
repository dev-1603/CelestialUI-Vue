import { computed, ref, watch, nextTick } from 'vue'
import type { CInputProps, CInputEmits, UseInputReturn, UseInputConfig, ValidationResult, DebouncedFunction } from '../CInput.types'

/**
 * Create a debounced function that delays execution
 */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout>
  let lastArgs: Parameters<T>

  const debouncedFn = (...args: Parameters<T>) => {
    lastArgs = args
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }

  debouncedFn.cancel = () => {
    clearTimeout(timeoutId)
  }

  debouncedFn.flush = () => {
    clearTimeout(timeoutId)
    if (lastArgs) {
      func(...lastArgs)
    }
  }

  return debouncedFn as DebouncedFunction<T>
}

/**
 * Composable for input behavior and logic
 * Handles state management, event handling, validation, and accessibility
 */
export function useInput(
  props: CInputProps,
  emit: CInputEmits
): UseInputReturn {

  // Internal state
  const isFocused = ref(false)
  const inputRef = ref<HTMLInputElement>()

  // Create debounced change handler if debounceMs is provided
  const debouncedChange = computed(() => {
    if (props.debounceMs && props.debounceMs > 0) {
      return debounce((value: string, event: Event) => {
        emit('update:value', value)
        emit('change', value, event)
      }, props.debounceMs)
    }
    return null
  })

  /**
   * Compute input value
   */
  const inputValue = computed(() => {
    return props.value || ''
  })

  /**
   * Compute disabled state
   */
  const isDisabled = computed(() => {
    return Boolean(props.disabled)
  })

  /**
   * Compute readonly state
   */
  const isReadonly = computed(() => {
    return Boolean(props.readonly)
  })

  /**
   * Compute required state
   */
  const isRequired = computed(() => {
    return Boolean(props.required)
  })

  /**
   * Compute invalid state
   */
  const isInvalid = computed(() => {
    return Boolean(props.invalid)
  })

  /**
   * Validate input value
   */
  const _validateValue = (value: string): ValidationResult => {
    // Required validation
    if (isRequired.value && !value.trim()) {
      return {
        isValid: false,
        message: 'This field is required'
      }
    }

    // Length validation
    if (props.minLength && value.length < props.minLength) {
      return {
        isValid: false,
        message: `Minimum length is ${props.minLength} characters`
      }
    }

    if (props.maxLength && value.length > props.maxLength) {
      return {
        isValid: false,
        message: `Maximum length is ${props.maxLength} characters`
      }
    }

    // Pattern validation
    if (props.pattern && value) {
      const regex = new RegExp(props.pattern)
      if (!regex.test(value)) {
        return {
          isValid: false,
          message: 'Invalid format'
        }
      }
    }

    // Type-specific validation
    if (props.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return {
          isValid: false,
          message: 'Invalid email format'
        }
      }
    }

    if (props.type === 'url' && value) {
      try {
        new URL(value)
      } catch {
        return {
          isValid: false,
          message: 'Invalid URL format'
        }
      }
    }

    return { isValid: true }
  }

  /**
   * Generate input element props and attributes
   */
  const inputProps = computed(() => {
    const baseProps = {
      type: props.type || 'text',
      value: inputValue.value,
      placeholder: props.placeholder,
      disabled: isDisabled.value,
      readonly: isReadonly.value,
      required: isRequired.value,
      'aria-invalid': isInvalid.value,
      'aria-label': props.ariaLabel,
      'aria-describedby': props.ariaDescribedBy,
      autocomplete: props.autocomplete,
      pattern: props.pattern,
      minlength: props.minLength,
      maxlength: props.maxLength,
      min: props.min,
      max: props.max,
      step: props.step,
      tabindex: props.tabIndex,
      form: props.form,
      id: props.id,
      name: props.name
    }

    // Remove undefined values
    return Object.fromEntries(
      Object.entries(baseProps).filter(([_, value]) => value !== undefined)
    )
  })

  /**
   * Handle input events (real-time typing)
   */
  const handleInput = (event: Event) => {
    if (isDisabled.value || isReadonly.value) return

    const target = event.target as HTMLInputElement
    const value = target.value

    emit('update:value', value)
    emit('input', value, event)

    // Use debounced change if configured
    if (debouncedChange.value) {
      debouncedChange.value(value, event)
    }
  }

  /**
   * Handle change events (on blur or explicit change)
   */
  const handleChange = (event: Event) => {
    if (isDisabled.value || isReadonly.value) return

    const target = event.target as HTMLInputElement
    const value = target.value

    emit('update:value', value)

    // If not using debounced change, emit immediately
    if (!debouncedChange.value) {
      emit('change', value, event)
    }
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

    // Flush debounced change on blur
    if (debouncedChange.value) {
      debouncedChange.value.flush()
    }
  }

  /**
   * Handle keydown events
   */
  const handleKeydown = (event: KeyboardEvent) => {
    if (isDisabled.value || isReadonly.value) return

    emit('keydown', event)

    // Emit specific key events
    if (event.key === 'Enter') {
      emit('enter', event)
    } else if (event.key === 'Escape') {
      emit('escape', event)
    }
  }

  /**
   * Handle keyup events
   */
  const handleKeyup = (event: KeyboardEvent) => {
    if (isDisabled.value || isReadonly.value) return

    emit('keyup', event)
  }

  /**
   * Clear input value
   */
  const clear = () => {
    if (isDisabled.value || isReadonly.value) return

    const syntheticEvent = new Event('input', {
      bubbles: true,
      cancelable: true
    })

    emit('input', '', syntheticEvent)
    emit('change', '', syntheticEvent)
  }

  /**
   * Focus the input
   */
  const focus = async () => {
    if (isDisabled.value) return

    await nextTick()
    inputRef.value?.focus()
  }

  /**
   * Blur the input
   */
  const blur = () => {
    if (isDisabled.value) return

    inputRef.value?.blur()
  }

  // Cleanup debounced function on unmount
  watch(() => debouncedChange.value, (newDebounced, oldDebounced) => {
    if (oldDebounced) {
      oldDebounced.cancel()
    }
  })

  return {
    inputProps,
    inputValue,
    isDisabled,
    isReadonly,
    isRequired,
    isInvalid,
    isFocused,
    handleInput,
    handleChange,
    handleFocus,
    handleBlur,
    handleKeydown,
    handleKeyup,
    clear,
    focus,
    blur
  }
}

/**
 * Headless input hook for custom implementations
 * Provides input logic without any UI assumptions
 */
export function useInputHeadless(config: UseInputConfig = {}) {
  const {
    defaultValue = '',
    value,
    disabled = false,
    readonly = false,
    required = false,
    invalid = false,
    debounceMs = 0,
    onChange,
    onInput,
    onFocus,
    onBlur,
    onKeydown,
    validate
  } = config

  // Internal state for uncontrolled usage
  const internalValue = ref(defaultValue)
  const isFocused = ref(false)
  const isValid = ref(true)
  const validationMessage = ref('')

  // Use controlled value if provided, otherwise use internal state
  const inputValue = computed(() => {
    return value !== undefined ? value : internalValue.value
  })

  const isDisabled = computed(() => Boolean(disabled))
  const isReadonly = computed(() => Boolean(readonly))
  const isRequired = computed(() => Boolean(required))
  const isInvalid = computed(() => Boolean(invalid) || !isValid.value)

  // Create debounced onChange if debounceMs is provided
  const debouncedOnChange = debounceMs > 0 && onChange
    ? debounce(onChange, debounceMs)
    : null

  /**
   * Update value and trigger validation
   */
  const setValue = (newValue: string, event?: Event) => {
    // Update internal state if uncontrolled
    if (value === undefined) {
      internalValue.value = newValue
    }

    // Run validation
    if (validate) {
      const result = validate(newValue)
      if (typeof result === 'boolean') {
        isValid.value = result
        validationMessage.value = result ? '' : 'Invalid value'
      } else {
        isValid.value = result === undefined || result === ''
        validationMessage.value = result || ''
      }
    }

    // Call external handlers
    if (onInput && event) {
      onInput(newValue, event)
    }

    if (debouncedOnChange && event) {
      debouncedOnChange(newValue, event)
    } else if (onChange && event) {
      onChange(newValue, event)
    }
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

    // Flush debounced onChange on blur
    if (debouncedOnChange) {
      debouncedOnChange.flush()
    }
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (isDisabled.value || isReadonly.value) return

    onKeydown?.(event)
  }

  const clear = () => {
    if (isDisabled.value || isReadonly.value) return

    setValue('', new Event('input'))
  }

  return {
    inputValue,
    isDisabled,
    isReadonly,
    isRequired,
    isInvalid,
    isFocused,
    isValid,
    validationMessage,
    setValue,
    handleFocus,
    handleBlur,
    handleKeydown,
    clear
  }
}
