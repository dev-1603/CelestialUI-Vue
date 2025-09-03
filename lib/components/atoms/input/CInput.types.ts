import type { ComputedRef, Ref } from 'vue'

export interface CInputProps {
  /** Input value - mandatory */
  value: string

  /** Input placeholder text */
  placeholder?: string

  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel' | 'search'

  /** Input size */
  size?: 'sm' | 'md' | 'lg'

  /** Input visual variant */
  variant?: 'outline' | 'filled' | 'unstyled'

  /** Disabled state */
  disabled?: boolean

  /** Readonly state */
  readonly?: boolean

  /** Required field */
  required?: boolean

  /** Invalid/error state */
  invalid?: boolean

  /** Unique identifier */
  id?: string

  /** Form field name */
  name?: string

  /** Autocomplete attribute */
  autocomplete?: string

  /** Validation pattern (regex) */
  pattern?: string

  /** Minimum length */
  minLength?: number

  /** Maximum length */
  maxLength?: number

  /** Debounce delay in milliseconds */
  debounceMs?: number

  /** Accessibility label */
  ariaLabel?: string

  /** Accessibility description */
  ariaDescribedBy?: string

  /** Tab order control */
  tabIndex?: number

  /** Associate with form element */
  form?: string

  /** Input step for number type */
  step?: number | string

  /** Minimum value for number type */
  min?: number | string

  /** Maximum value for number type */
  max?: number | string

  /** Helper text */
  helperText?: string

  /** Error message text */
  errorMessage?: string

  /** Custom CSS classes */
  /** Override wrapper classes */
  wrapperClass?: string | string[]

  /** Override input container classes */
  containerClass?: string | string[]

  /** Override input field classes */
  inputClass?: string | string[]

  /** Override left element classes */
  leftElementClass?: string | string[]

  /** Override right element classes */
  rightElementClass?: string | string[]

  /** Override helper text classes */
  helperTextClass?: string | string[]

  /** Override error message classes */
  errorMessageClass?: string | string[]

  /** Override clear button classes */
  clearButtonClass?: string | string[]

  /** Override prepend element classes */
  prependClass?: string | string[]

  /** Override append element classes */
  appendClass?: string | string[]

  /** Disable default styling completely */
  unstyled?: boolean

  /** Enable headless mode (no default classes) */
  headless?: boolean
}

export interface CInputEmits {
  /** Update value for v-model support */
  (e: 'update:value', value: string): void

  /** Change event - mandatory */
  (e: 'change', value: string, event: Event): void

  /** Input event for real-time updates */
  (e: 'input', value: string, event: Event): void

  /** Focus event */
  (e: 'focus', event: FocusEvent): void

  /** Blur event */
  (e: 'blur', event: FocusEvent): void

  /** Keydown event */
  (e: 'keydown', event: KeyboardEvent): void

  /** Keyup event */
  (e: 'keyup', event: KeyboardEvent): void

  /** Enter key pressed */
  (e: 'enter', event: KeyboardEvent): void

  /** Escape key pressed */
  (e: 'escape', event: KeyboardEvent): void
}

export interface CInputSlots {
  /** Left element slot */
  leftElement(): any

  /** Right element slot */
  rightElement(): any

  /** Helper text slot */
  helperText(): any

  /** Error message slot */
  errorMessage(): any

  /** Prepend content before input */
  prepend(): any

  /** Append content after input */
  append(): any
}

export interface UseInputReturn {
  /** Input element props and attributes */
  inputProps: Record<string, any>

  /** Current input value */
  inputValue: ComputedRef<string>

  /** Whether input is disabled */
  isDisabled: ComputedRef<boolean>

  /** Whether input is readonly */
  isReadonly: ComputedRef<boolean>

  /** Whether input is required */
  isRequired: ComputedRef<boolean>

  /** Whether input is invalid */
  isInvalid: ComputedRef<boolean>

  /** Whether input is focused */
  isFocused: Ref<boolean>

  /** Handle input events */
  handleInput: (event: Event) => void

  /** Handle change events */
  handleChange: (event: Event) => void

  /** Handle focus events */
  handleFocus: (event: FocusEvent) => void

  /** Handle blur events */
  handleBlur: (event: FocusEvent) => void

  /** Handle keydown events */
  handleKeydown: (event: KeyboardEvent) => void

  /** Handle keyup events */
  handleKeyup: (event: KeyboardEvent) => void

  /** Clear input value */
  clear: () => void

  /** Focus the input */
  focus: () => void

  /** Blur the input */
  blur: () => void
}

export interface UseInputStylesReturn {
  /** Wrapper classes */
  wrapperClasses: ComputedRef<string[]>

  /** Input field classes */
  inputClasses: ComputedRef<string[]>

  /** Left element classes */
  leftElementClasses: ComputedRef<string[]>

  /** Right element classes */
  rightElementClasses: ComputedRef<string[]>

  /** Helper text classes */
  helperTextClasses: ComputedRef<string[]>

  /** Error message classes */
  errorMessageClasses: ComputedRef<string[]>

  /** Input container classes */
  inputContainerClasses: ComputedRef<string[]>
}

// Theme-specific input variants
export type InputType = CInputProps['type']
export type InputSize = CInputProps['size']
export type InputVariant = CInputProps['variant']

// Input states for styling
export interface InputState {
  focused: boolean
  disabled: boolean
  readonly: boolean
  required: boolean
  invalid: boolean
  hasValue: boolean
  hasLeftElement: boolean
  hasRightElement: boolean
}

// Component registry entry
export interface InputComponentInfo {
  name: 'CInput'
  category: 'atoms'
  description: 'Text input field with validation, states, and accessibility'
  props: CInputProps
  emits: CInputEmits
  slots: CInputSlots
}

// Hook configuration for headless usage
export interface UseInputConfig {
  /** Initial value */
  defaultValue?: string

  /** Controlled value */
  value?: string

  /** Input type */
  type?: InputType

  /** Disabled state */
  disabled?: boolean

  /** Readonly state */
  readonly?: boolean

  /** Required state */
  required?: boolean

  /** Invalid state */
  invalid?: boolean

  /** Debounce delay */
  debounceMs?: number

  /** Validation pattern */
  pattern?: string

  /** Minimum length */
  minLength?: number

  /** Maximum length */
  maxLength?: number

  /** Change handler */
  onChange?: (value: string, event: Event) => void

  /** Input handler */
  onInput?: (value: string, event: Event) => void

  /** Focus handler */
  onFocus?: (event: FocusEvent) => void

  /** Blur handler */
  onBlur?: (event: FocusEvent) => void

  /** Keydown handler */
  onKeydown?: (event: KeyboardEvent) => void

  /** Validation function */
  validate?: (value: string) => boolean | string
}

// Validation result
export interface ValidationResult {
  isValid: boolean
  message?: string
}

// Debounced function type
export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void
  cancel: () => void
  flush: () => void
}
