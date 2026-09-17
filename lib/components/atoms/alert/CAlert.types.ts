import type { ComputedRef, VNode } from 'vue'

/**
 * Alert component props interface
 * Defines all available props for the CAlert component
 */
export interface CAlertProps {
  /** Alert type/variant determining visual style and semantic meaning */
  type?: 'info' | 'success' | 'warning' | 'error'

  /** Optional title text displayed prominently in the alert */
  title?: string

  /** Whether the alert can be dismissed by the user */
  closable?: boolean

  /** Whether the alert is visible (for controlled visibility) */
  visible?: boolean

  /** Alert content - explicit children prop for programmatic usage */
  children?: string

  /** Custom CSS class to apply to the alert container */
  class?: string

  /** Custom CSS styles to apply to the alert container */
  style?: string | Record<string, any>

  /** Whether the alert should be dismissible with keyboard (Escape key) */
  dismissible?: boolean

  /** Auto-dismiss timeout in milliseconds (0 = no auto-dismiss) */
  autoDismiss?: number

  /** Whether to show a progress bar for auto-dismiss */
  showProgress?: boolean

  /** Custom icon name to override default type-based icon */
  icon?: string

  /** Whether to show the icon */
  showIcon?: boolean

  /** Alert size variant */
  size?: 'sm' | 'md' | 'lg'

  /** Whether the alert has a border */
  bordered?: boolean

  /** Whether the alert has a shadow */
  shadowed?: boolean

  /** Custom ARIA label for the alert */
  ariaLabel?: string

  /** ARIA described by reference */
  ariaDescribedBy?: string

  /** ARIA live region priority */
  ariaLive?: 'polite' | 'assertive' | 'off'

  /** Whether the alert is in a loading state */
  loading?: boolean

  /** Animation variant for show/hide transitions */
  animation?: 'fade' | 'slide' | 'scale' | 'none'
}

/**
 * Alert component events interface
 * Defines all events that the CAlert component can emit
 */
export interface CAlertEmits {
  /** Emitted when the alert is closed/dismissed */
  (e: 'close', event?: MouseEvent | KeyboardEvent): void

  /** Emitted when the alert becomes visible */
  (e: 'show'): void

  /** Emitted when the alert becomes hidden */
  (e: 'hide'): void

  /** Emitted when auto-dismiss timer starts */
  (e: 'autoDismissStart'): void

  /** Emitted when auto-dismiss timer is cancelled */
  (e: 'autoDismissCancel'): void

  /** Emitted when auto-dismiss timer completes */
  (e: 'autoDismissComplete'): void

  /** Emitted when the alert is clicked */
  (e: 'click', event: MouseEvent): void

  /** Emitted when the alert receives focus */
  (e: 'focus', event: FocusEvent): void

  /** Emitted when the alert loses focus */
  (e: 'blur', event: FocusEvent): void

  /** Emitted when mouse enters the alert */
  (e: 'mouseenter', event: MouseEvent): void

  /** Emitted when mouse leaves the alert */
  (e: 'mouseleave', event: MouseEvent): void
}

/**
 * Alert component slots interface
 * Defines all available slots for the CAlert component
 */
export interface CAlertSlots {
  /** Default slot for main alert content */
  default(): VNode | VNode[] | undefined

  /** Icon slot for custom icon content */
  icon(): VNode | VNode[] | undefined

  /** Action slot for buttons or interactive elements */
  action(): VNode | VNode[] | undefined

  /** Title slot for custom title content */
  title(): VNode | VNode[] | undefined

  /** Close button slot for custom close button */
  close(): VNode | VNode[] | undefined
}

/**
 * Return type for the useAlert composable
 * Provides reactive state and methods for alert behavior
 */
export interface UseAlertReturn {
  /** Whether the alert is currently visible */
  isVisible: ComputedRef<boolean>

  /** Whether the alert is in a loading state */
  isLoading: ComputedRef<boolean>

  /** Whether the alert can be dismissed */
  canDismiss: ComputedRef<boolean>

  /** Alert CSS classes based on props and state */
  alertClasses: ComputedRef<string[]>

  /** Icon CSS classes */
  iconClasses: ComputedRef<string[]>

  /** Content CSS classes */
  contentClasses: ComputedRef<string[]>

  /** Close button CSS classes */
  closeClasses: ComputedRef<string[]>

  /** Progress bar CSS classes */
  progressClasses: ComputedRef<string[]>

  /** Handle close button click */
  handleClose: (event?: MouseEvent) => void

  /** Handle keyboard events */
  handleKeydown: (event: KeyboardEvent) => void

  /** Handle click events */
  handleClick: (event: MouseEvent) => void

  /** Start auto-dismiss timer */
  startAutoDismiss: () => void

  /** Cancel auto-dismiss timer */
  cancelAutoDismiss: () => void

  /** Show the alert */
  show: () => void

  /** Hide the alert */
  hide: () => void

  /** Toggle alert visibility */
  toggle: () => void
}

/**
 * Return type for the useAlertStyles composable
 * Provides computed CSS classes for styling
 */
export interface UseAlertStylesReturn {
  /** Main alert container classes */
  alertClasses: ComputedRef<string[]>

  /** Icon container classes */
  iconClasses: ComputedRef<string[]>

  /** Content container classes */
  contentClasses: ComputedRef<string[]>

  /** Title classes */
  titleClasses: ComputedRef<string[]>

  /** Close button classes */
  closeClasses: ComputedRef<string[]>

  /** Progress bar classes */
  progressClasses: ComputedRef<string[]>
}

/**
 * Alert type definitions for better type safety
 */
export type AlertType = CAlertProps['type']
export type AlertSize = CAlertProps['size']
export type AlertAnimation = CAlertProps['animation']
export type AriaLive = CAlertProps['ariaLive']

/**
 * Alert configuration for programmatic usage
 */
export interface AlertConfig {
  type?: AlertType
  title?: string
  message?: string
  closable?: boolean
  autoDismiss?: number
  showProgress?: boolean
  icon?: string
  size?: AlertSize
  animation?: AlertAnimation
}

/**
 * Component registry entry for the alert component
 */
export interface AlertComponentInfo {
  name: 'CAlert'
  category: 'atoms'
  description: 'Flexible alert component with multiple variants, states, and accessibility features'
  props: CAlertProps
  emits: CAlertEmits
  slots: CAlertSlots
}
