export type IconLibrary = 'material' | 'fontawesome' | 'custom'
export type IconType = 'font' | 'svg' | 'image'
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
export type IconColor = 'inherit' | 'current' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

// Material Icons variants
export type MaterialIconVariant = 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone'

// Font Awesome styles
export type FontAwesomeStyle = 'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'brands'

export interface CIconProps {
  /**
   * Icon library to use
   */
  library?: IconLibrary

  /**
   * Type of icon rendering
   */
  type?: IconType

  /**
   * Icon name/identifier
   */
  name?: string

  /**
   * Icon size (predefined sizes, number in pixels, or CSS string)
   */
  size?: IconSize | number | string

  /**
   * Icon color
   */
  color?: IconColor | string

  /**
   * Material Icons variant (when using Material Icons)
   */
  variant?: MaterialIconVariant

  /**
   * Font Awesome style (when using Font Awesome)
   */
  faStyle?: FontAwesomeStyle

  /**
   * Custom SVG content (for inline SVG)
   */
  svg?: string

  /**
   * Image/SVG source URL (for image/svg type)
   */
  src?: string

  /**
   * Image alt text (for image type)
   */
  alt?: string

  /**
   * Whether the icon is clickable
   */
  clickable?: boolean

  /**
   * Whether the icon is in loading state
   */
  loading?: boolean

  /**
   * Whether the icon is disabled
   */
  disabled?: boolean

  /**
   * Custom CSS classes
   */
  class?: string

  /**
   * Custom inline styles
   */
  style?: string | Record<string, any>

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string

  /**
   * Whether to hide from screen readers
   */
  ariaHidden?: boolean

  /**
   * Custom role attribute
   */
  role?: string

  /**
   * Custom width (for SVG/image)
   */
  width?: number | string

  /**
   * Custom height (for SVG/image)
   */
  height?: number | string

  /**
   * ViewBox for SVG icons
   */
  viewBox?: string

  /**
   * Whether to flip horizontally
   */
  flipX?: boolean

  /**
   * Whether to flip vertically
   */
  flipY?: boolean

  /**
   * Rotation angle in degrees
   */
  rotate?: number

  /**
   * Animation type
   */
  animation?: 'spin' | 'pulse' | 'bounce' | 'fade'

  /**
   * Whether to load external SVG files inline (allows customization)
   */
  inlineSvg?: boolean

  /**
   * Whether to cache loaded SVG content
   */
  cacheSvg?: boolean

  /**
   * Timeout for SVG loading in milliseconds
   */
  loadTimeout?: number
}

export interface CIconSlots {
  default?: () => any
}

export type CIconEmits = {
  (e: 'click', event: MouseEvent): void
  (e: 'load', event: Event): void
  (e: 'error', event: Event): void
}

// Icon configuration interfaces
export interface IconConfig {
  library: IconLibrary
  type: IconType
  name?: string
  variant?: MaterialIconVariant
  faStyle?: FontAwesomeStyle
  svg?: string
  src?: string
}

export interface IconLibraryConfig {
  material: {
    baseClass: string
    variants: Record<MaterialIconVariant, string>
    sizes: Record<IconSize, string>
  }
  fontawesome: {
    baseClass: string
    styles: Record<FontAwesomeStyle, string>
    sizes: Record<IconSize, string>
  }
  custom: {
    baseClass: string
    sizes: Record<IconSize, string>
  }
}
