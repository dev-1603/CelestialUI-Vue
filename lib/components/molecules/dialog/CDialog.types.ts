export interface CDialogProps {
  modelValue: boolean
  title?: string
  description?: string
  closable?: boolean
  closeOnOutsideClick?: boolean
  closeOnEsc?: boolean
  size?: 'sm' | 'md' | 'lg' | 'full'
  role?: 'dialog' | 'alertdialog'
}

export interface CDialogEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
  (e: 'open'): void
}
