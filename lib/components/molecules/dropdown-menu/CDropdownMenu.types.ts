export interface CDropdownItem {
  id: string | number
  label: string
  icon?: string
  disabled?: boolean
  divider?: boolean
  shortcut?: string
}

export interface CDropdownMenuProps {
  items: CDropdownItem[] | CDropdownItem[][]
  trigger?: 'click' | 'hover'
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  disabled?: boolean
}

export interface CDropdownMenuEmits {
  (e: 'select', item: CDropdownItem): void
  (e: 'open'): void
  (e: 'close'): void
}
