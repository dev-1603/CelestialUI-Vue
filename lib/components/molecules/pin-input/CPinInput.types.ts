export interface CPinInputProps {
  modelValue: string
  length?: number
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  disabled?: boolean
  error?: boolean
  autofocus?: boolean
  variant?: 'default' | 'slack' | 'atlassian'
}

export interface CPinInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'complete', value: string): void
}
