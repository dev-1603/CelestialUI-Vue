import type { Component } from 'vue'
import type { IconLibrary, IconType, IconSize, IconColor, MaterialIconVariant, FontAwesomeStyle } from '../icon/CIcon.types'
import type { VNode } from 'vue'

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

  /** Icon library to use for both left and right icons */
  iconLibrary?: IconLibrary

  /** Icon type for both left and right icons */
  iconType?: IconType

  /** Icon size override for both left and right icons */
  iconSize?: IconSize | number | string

  /** Icon color override for both left and right icons */
  iconColor?: IconColor | string

  /** Material Icons variant for both left and right icons */
  iconVariant?: MaterialIconVariant

  /** Font Awesome style for both left and right icons */
  iconFaStyle?: FontAwesomeStyle

  /** Custom SVG content for left icon */
  leftIconSvg?: string

  /** Custom SVG content for right icon */
  rightIconSvg?: string

  /** Image/SVG source URL for left icon */
  leftIconSrc?: string

  /** Image/SVG source URL for right icon */
  rightIconSrc?: string

  /** Whether left icon is clickable */
  leftIconClickable?: boolean

  /** Whether right icon is clickable */
  rightIconClickable?: boolean

  /** Left icon ARIA label */
  leftIconAriaLabel?: string

  /** Right icon ARIA label */
  rightIconAriaLabel?: string

  /** Whether to flip left icon horizontally */
  leftIconFlipX?: boolean

  /** Whether to flip right icon horizontally */
  rightIconFlipX?: boolean

  /** Whether to flip left icon vertically */
  leftIconFlipY?: boolean

  /** Whether to flip right icon vertically */
  rightIconFlipY?: boolean

  /** Left icon rotation angle in degrees */
  leftIconRotate?: number

  /** Right icon rotation angle in degrees */
  rightIconRotate?: number

  /** Left icon animation type */
  leftIconAnimation?: 'spin' | 'pulse' | 'bounce' | 'fade'

  /** Right icon animation type */
  rightIconAnimation?: 'spin' | 'pulse' | 'bounce' | 'fade'

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
  (e: 'leftIconClick', event: MouseEvent): void
  (e: 'rightIconClick', event: MouseEvent): void
  (e: 'leftIconLoad', event: Event): void
  (e: 'rightIconLoad', event: Event): void
  (e: 'leftIconError', event: Event): void
  (e: 'rightIconError', event: Event): void
}

export interface CButtonSlots {
  default(): VNode | VNode[] | undefined
  leftIcon(): VNode | VNode[] | undefined
  rightIcon(): VNode | VNode[] | undefined
  loadingSpinner(): VNode | VNode[] | undefined
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
