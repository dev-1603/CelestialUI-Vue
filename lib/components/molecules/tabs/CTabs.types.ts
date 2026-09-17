export interface CTabItem {
  id: string | number
  label: string
  icon?: string
  disabled?: boolean
}

export interface CTabsProps {
  modelValue: string | number // Active tab ID
  items: CTabItem[]
  variant?: 'line' | 'enclosed' | 'pills'
  orientation?: 'horizontal' | 'vertical'
  rtl?: boolean
  scrollable?: boolean
}

export interface CTabsEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}
