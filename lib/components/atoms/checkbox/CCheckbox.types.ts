

export interface CCheckboxProps {
  /** Checkbox checked state - mandatory */
  checked: boolean

  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg'

  /** Color scheme for the checkbox */
  colorScheme?: string

  /** Indeterminate state */
  indeterminate?: boolean

  /** Disabled state */
  disabled?: boolean

  /** Checkbox label content */
  children?: string

  /** Unique identifier */
  id?: string

  /** Form field name */
  name?: string

  /** Form field value */
  value?: string

  /** Accessibility description */
  ariaDescribedBy?: string

  /** Tab order control */
  tabIndex?: number

  /** Associate with form element */
  form?: string

  /** Custom check icon */
  checkIcon?: string

  /** Custom indeterminate icon */
  indeterminateIcon?: string
}

export interface CCheckboxEmits {
  /** Change event - mandatory */
  (e: 'change', checked: boolean, event: Event): void

  /** Focus event */
  (e: 'focus', event: FocusEvent): void

  /** Blur event */
  (e: 'blur', event: FocusEvent): void
}

export interface CCheckboxSlots {
  /** Default slot for label content */
  default(): any

  /** Custom check icon slot */
  icon(): any

  /** Label slot */
  label(): any

  /** Description slot */
  description(): any
}

export interface UseCheckboxReturn {
  /** Input element props and attributes */
  inputProps: Record<string, any>

  /** Whether checkbox is checked */
  isChecked: boolean

  /** Whether checkbox is disabled */
  isDisabled: boolean

  /** Whether checkbox is indeterminate */
  isIndeterminate: boolean

  /** Handle change events */
  handleChange: (event: Event) => void

  /** Handle focus events */
  handleFocus: (event: FocusEvent) => void

  /** Handle blur events */
  handleBlur: (event: FocusEvent) => void

  /** Handle keyboard events */
  handleKeydown: (event: KeyboardEvent) => void
}

export interface UseCheckboxStylesReturn {
  /** Wrapper classes */
  wrapperClasses: string[]

  /** Input classes */
  inputClasses: string[]

  /** Checkbox box classes */
  checkboxClasses: string[]

  /** Icon classes */
  iconClasses: string[]

  /** Label classes */
  labelClasses: string[]

  /** Description classes */
  descriptionClasses: string[]
}

// Theme-specific checkbox variants
export type CheckboxSize = CCheckboxProps['size']
export type CheckboxColorScheme = CCheckboxProps['colorScheme']

// Checkbox states for styling
export interface CheckboxState {
  checked: boolean
  indeterminate: boolean
  disabled: boolean
  focused: boolean
  hovered: boolean
}

// Component registry entry
export interface CheckboxComponentInfo {
  name: 'CCheckbox'
  category: 'atoms'
  description: 'Binary selection control with intermediate state support'
  props: CCheckboxProps
  emits: CCheckboxEmits
  slots: CCheckboxSlots
}

// Hook configuration for headless usage
export interface UseCheckboxConfig {
  /** Initial checked state */
  defaultChecked?: boolean

  /** Controlled checked state */
  checked?: boolean

  /** Indeterminate state */
  indeterminate?: boolean

  /** Disabled state */
  disabled?: boolean

  /** Change handler */
  onChange?: (checked: boolean, event: Event) => void

  /** Focus handler */
  onFocus?: (event: FocusEvent) => void

  /** Blur handler */
  onBlur?: (event: FocusEvent) => void
}
