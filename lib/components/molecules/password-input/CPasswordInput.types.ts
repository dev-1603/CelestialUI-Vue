export interface PasswordRequirement {
  id: string
  label: string
  regex: RegExp
}

export interface CPasswordInputProps {
  modelValue: string
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  showStrengthIndicator?: boolean
  showRequirements?: boolean
  requirements?: PasswordRequirement[]
}

export interface CPasswordInputEmits {
  (e: 'update:modelValue', value: string): void
}

export const defaultRequirements: PasswordRequirement[] = [
  { id: 'length', label: 'At least 8 characters', regex: /.{8,}/ },
  { id: 'uppercase', label: 'One uppercase letter', regex: /[A-Z]/ },
  { id: 'lowercase', label: 'One lowercase letter', regex: /[a-z]/ },
  { id: 'number', label: 'One number', regex: /[0-9]/ },
  { id: 'special', label: 'One special character', regex: /[^A-Za-z0-9]/ }
]
