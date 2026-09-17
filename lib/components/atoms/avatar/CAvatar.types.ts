import type { VNode, Ref, ComputedRef } from 'vue'

/**
 * Avatar component props interface
 * Defines all available props for the CAvatar component
 */
export interface CAvatarProps {
  /** Image source URL for the avatar */
  src?: string

  /** Alt text for the avatar image (required for accessibility) */
  alt: string

  /** Avatar size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  /** Whether the avatar should be rounded */
  rounded?: boolean

  /** Custom CSS class for the avatar container */
  class?: string

  /** Custom CSS class for the avatar image */
  imageClass?: string

  /** Custom CSS class for the fallback content */
  fallbackClass?: string

  /** Custom CSS class for the badge */
  badgeClass?: string

  /** Background color for fallback state */
  backgroundColor?: string

  /** Text color for fallback state */
  textColor?: string

  /** Whether the avatar is clickable */
  clickable?: boolean

  /** Whether the avatar is disabled */
  disabled?: boolean

  /** Loading state */
  loading?: boolean

  /** Custom loading placeholder */
  loadingPlaceholder?: string

  /** Whether to show a border */
  bordered?: boolean

  /** Border color */
  borderColor?: string

  /** Border width */
  borderWidth?: number | string

  /** Custom width override */
  width?: number | string

  /** Custom height override */
  height?: number | string

  /** Object fit for the image */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

  /** Whether to show a status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy'

  /** Shortcut for online status */
  online?: boolean

  /** Status indicator color */
  statusColor?: string

  /** Accessibility label override */
  ariaLabel?: string

  /** Whether the avatar is decorative (no alt text needed) */
  decorative?: boolean
}

/**
 * Avatar component events interface
 * Defines all events that the CAvatar component can emit
 */
export interface CAvatarEmits {
  /** Emitted when the image fails to load */
  (e: 'error', event: Event): void

  /** Emitted when the image loads successfully */
  (e: 'load', event: Event): void

  /** Emitted when the avatar is clicked */
  (e: 'click', event: MouseEvent): void

  /** Emitted when the avatar receives focus */
  (e: 'focus', event: FocusEvent): void

  /** Emitted when the avatar loses focus */
  (e: 'blur', event: FocusEvent): void

  /** Emitted when mouse enters the avatar */
  (e: 'mouseenter', event: MouseEvent): void

  /** Emitted when mouse leaves the avatar */
  (e: 'mouseleave', event: MouseEvent): void

  /** Emitted when a key is pressed on the avatar */
  (e: 'keydown', event: KeyboardEvent): void
}

/**
 * Avatar component slots interface
 * Defines all available slots for the CAvatar component
 */
export interface CAvatarSlots {
  /** Default slot for custom content */
  default(): VNode | VNode[] | undefined

  /** Fallback slot for when image fails to load */
  fallback(): VNode | VNode[] | undefined

  /** Badge slot for status indicators or notifications */
  badge(): VNode | VNode[] | undefined

  /** Loading slot for custom loading state */
  loading(): VNode | VNode[] | undefined
}

/**
 * Return type for the useAvatar composable
 */
export interface UseAvatarReturn {
  /** Whether the image has failed to load */
  hasError: Ref<boolean>

  /** Whether the image is currently loading */
  isLoading: Ref<boolean>

  /** Whether the avatar should be clickable */
  isClickable: ComputedRef<boolean>

  /** Handle image load event */
  handleImageLoad: (event: Event) => void

  /** Handle image error event */
  handleImageError: (event: Event) => void

  /** Handle click event */
  handleClick: (event: MouseEvent) => void

  /** Handle keydown event */
  handleKeydown: (event: KeyboardEvent) => void

  /** Handle focus event */
  handleFocus: (event: FocusEvent) => void

  /** Handle blur event */
  handleBlur: (event: FocusEvent) => void

  /** Handle mouseenter event */
  handleMouseEnter: (event: MouseEvent) => void

  /** Handle mouseleave event */
  handleMouseLeave: (event: MouseEvent) => void
}

/**
 * Return type for the useAvatarStyles composable
 */
export interface UseAvatarStylesReturn {
  /** CSS classes for the avatar container */
  avatarClasses: ComputedRef<string[]>

  /** CSS classes for the avatar image */
  imageClasses: ComputedRef<string[]>

  /** CSS classes for the fallback content */
  fallbackClasses: ComputedRef<string[]>

  /** CSS classes for the badge */
  badgeClasses: ComputedRef<string[]>

  /** CSS classes for the status indicator */
  statusClasses: ComputedRef<string[]>

  /** Inline styles for the avatar container */
  avatarStyles: ComputedRef<Record<string, string>>

  /** Inline styles for the fallback content */
  fallbackStyles: ComputedRef<Record<string, string>>
}

/**
 * Avatar size type
 */
export type AvatarSize = CAvatarProps['size']

/**
 * Avatar status type
 */
export type AvatarStatus = CAvatarProps['status']

/**
 * Avatar object fit type
 */
export type AvatarObjectFit = CAvatarProps['objectFit']

/**
 * Component registry entry for Avatar
 */
export interface AvatarComponentInfo {
  name: 'CAvatar'
  category: 'atoms'
  description: 'User profile image/avatar component with fallback support and accessibility features'
  props: CAvatarProps
  emits: CAvatarEmits
  slots: CAvatarSlots
}
