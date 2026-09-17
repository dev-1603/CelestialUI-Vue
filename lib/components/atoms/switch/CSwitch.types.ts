/**
 * @fileoverview TypeScript type definitions for CSwitch component
 * @author CelestialUI Team
 * @version 1.0.0
 */

/**
 * Size variants for the switch component
 * @public
 */
export type SwitchSize = 'sm' | 'md' | 'lg'

/**
 * Color theme variants for the switch component
 * @public
 */
export type SwitchColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

/**
 * Props interface for CSwitch component
 * @public
 */
export interface CSwitchProps {
  /**
   * The current state of the switch (true = on, false = off)
   * @default false
   */
  modelValue: boolean

  /**
   * Size variant of the switch
   * @default 'md'
   */
  size?: SwitchSize

  /**
   * Color theme variant
   * @default 'primary'
   */
  color?: SwitchColor

  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Whether the switch is in a loading state
   * @default false
   */
  loading?: boolean

  /**
   * Custom CSS class to apply to the switch
   */
  class?: string

  /**
   * Custom CSS styles to apply to the switch
   */
  style?: string | Record<string, any>

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string

  /**
   * ARIA described by for accessibility
   */
  ariaDescribedBy?: string

  /**
   * Whether the switch should be focusable
   * @default true
   */
  focusable?: boolean

  /**
   * Custom tab index
   */
  tabIndex?: number
}

/**
 * Events interface for CSwitch component
 * @public
 */
export interface CSwitchEmits {
  /**
   * Emitted when the switch value changes
   * @param value - The new boolean value
   */
  (e: 'update:modelValue', value: boolean): void

  /**
   * Emitted when the switch is clicked
   * @param event - The click event
   */
  (e: 'click', event: MouseEvent): void

  /**
   * Emitted when the switch receives focus
   * @param event - The focus event
   */
  (e: 'focus', event: FocusEvent): void

  /**
   * Emitted when the switch loses focus
   * @param event - The blur event
   */
  (e: 'blur', event: FocusEvent): void

  /**
   * Emitted when a key is pressed on the switch
   * @param event - The keyboard event
   */
  (e: 'keydown', event: KeyboardEvent): void

  /**
   * Emitted when the switch state changes (includes programmatic changes)
   * @param value - The new boolean value
   */
  (e: 'change', value: boolean): void
}

/**
 * Slots interface for CSwitch component
 * @public
 */
export interface CSwitchSlots {
  /**
   * Default slot for custom content inside the switch
   */
  default?: () => any

  /**
   * Track slot for customizing the switch track appearance
   */
  track?: (props: { isOn: boolean; disabled: boolean; loading: boolean }) => any

  /**
   * Thumb slot for customizing the switch thumb appearance
   */
  thumb?: (props: { isOn: boolean; disabled: boolean; loading: boolean }) => any
}

/**
 * Configuration object for switch behavior
 * @public
 */
export interface SwitchConfig {
  /**
   * Animation duration in milliseconds
   * @default 200
   */
  animationDuration: number

  /**
   * Whether to enable haptic feedback on mobile devices
   * @default true
   */
  hapticFeedback: boolean

  /**
   * Whether to emit change event on programmatic updates
   * @default false
   */
  emitOnProgrammaticChange: boolean
}

/**
 * Return type for useSwitch composable
 * @public
 */
export interface UseSwitchReturn {
  /**
   * Current switch state
   */
  isOn: Ref<boolean>

  /**
   * Whether the switch is disabled
   */
  isDisabled: Ref<boolean>

  /**
   * Whether the switch is in loading state
   */
  isLoading: Ref<boolean>

  /**
   * Toggle the switch state
   */
  toggle: () => void

  /**
   * Set the switch to on state
   */
  turnOn: () => void

  /**
   * Set the switch to off state
   */
  turnOff: () => void

  /**
   * Handle click events
   */
  handleClick: (event: MouseEvent) => void

  /**
   * Handle keyboard events
   */
  handleKeydown: (event: KeyboardEvent) => void

  /**
   * Handle focus events
   */
  handleFocus: (event: FocusEvent) => void

  /**
   * Handle blur events
   */
  handleBlur: (event: FocusEvent) => void

  /**
   * Computed CSS classes for the switch
   */
  switchClasses: ComputedRef<string>

  /**
   * Computed CSS classes for the track
   */
  trackClasses: ComputedRef<string>

  /**
   * Computed classes for the thumb
   */
  thumbClasses: ComputedRef<string>

  /**
   * Inline styles for the switch container
   */
  switchStyles: ComputedRef<Record<string, string>>
}

/**
 * Parameters for useSwitch composable
 * @public
 */
export interface UseSwitchOptions {
  /**
   * Initial value of the switch
   * @default false
   */
  initialValue?: boolean

  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean | ComputedRef<boolean>

  /**
   * Whether the switch is in loading state
   * @default false
   */
  loading?: boolean | ComputedRef<boolean>

  /**
   * Size variant
   * @default 'md'
   */
  size?: SwitchSize | ComputedRef<SwitchSize>

  /**
   * Color variant
   * @default 'primary'
   */
  color?: SwitchColor | ComputedRef<SwitchColor>

  /**
   * Configuration object
   */
  config?: Partial<SwitchConfig>

  /**
   * Callback when value changes
   */
  onChange?: (value: boolean) => void

  /**
   * Callback when switch is toggled
   */
  onToggle?: () => void
}

// Re-export Vue types for convenience
import type { Ref, ComputedRef } from 'vue'
