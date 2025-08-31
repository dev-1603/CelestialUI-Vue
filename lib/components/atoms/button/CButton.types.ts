import type { Component } from 'vue'

export interface CButtonProps {
  /** Button content - explicit children prop */
  children?: string

  /** Button visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'

  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /** Disabled state */
  disabled?: boolean

  /** Loading state */
  loading?: boolean

  /** Full width button */
  fullWidth?: boolean

  /** Left icon name */
  leftIcon?: string

  /** Right icon name */
  rightIcon?: string

  /** Link URL (makes button behave as link) */
  href?: string

  /** Link target */
  target?: '_blank' | '_self' | '_parent' | '_top'

    /** Button type for forms */
  type?: 'button' | 'submit' | 'reset'

  /** Polymorphic component support */
  as?: 'button' | 'a' | 'div'

  /** Download attribute for file buttons */
  download?: string | boolean

  /** Border radius */
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full'

  /** Accessibility label */
  ariaLabel?: string

  /** Accessibility description */
  ariaDescribedBy?: string
}

export interface CButtonEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'mouseenter', event: MouseEvent): void
  (e: 'mouseleave', event: MouseEvent): void
}

export interface CButtonSlots {
  default(): any
  leftIcon(): any
  rightIcon(): any
  loadingSpinner(): any
}

export interface UseButtonReturn {
  buttonComponent: Component | string
  isDisabled: boolean
  handleClick: (event: MouseEvent) => void
  handleKeydown: (event: KeyboardEvent) => void
}

export interface UseButtonStylesReturn {
  buttonClasses: string[]
  iconClasses: string[]
  textClasses: string[]
}

// Theme-specific button variants
export type ButtonVariant = CButtonProps['variant']
export type ButtonSize = CButtonProps['size']
export type ButtonRounded = CButtonProps['rounded']

// Component registry entry
export interface ButtonComponentInfo {
  name: 'CButton'
  category: 'atoms'
  description: 'Versatile button component with multiple variants and states'
  props: CButtonProps
  emits: CButtonEmits
  slots: CButtonSlots
}
