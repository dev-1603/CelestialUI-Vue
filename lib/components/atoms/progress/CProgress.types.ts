import type { VNode, ComputedRef } from 'vue'

export interface CProgressProps {
  /** Current progress value (0 to max) */
  value: number

  /** Maximum progress value */
  max?: number

  /** Progress bar size */
  size?: 'sm' | 'md' | 'lg'

  /** Color scheme variant */
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'blue' | 'green' | 'purple' | 'red' | 'amber' | string

  /** Progress label for accessibility */
  label?: string

  /** Whether to show percentage text */
  showPercentage?: boolean

  /** Whether to show value text */
  showValue?: boolean

  /** Custom text format function */
  textFormat?: (value: number, max: number, percentage: number) => string

  /** Whether the progress bar is animated */
  animated?: boolean

  /** Animation duration in milliseconds */
  animationDuration?: number

  /** Whether to show progress bar stripes */
  striped?: boolean

  /** Custom CSS class for the progress bar */
  customClass?: string

  /** Custom CSS class for the progress fill */
  fillClass?: string

  /** Custom CSS class for the progress text */
  textClass?: string

  /** Whether the progress bar is indeterminate */
  indeterminate?: boolean

  /** Accessibility label override */
  ariaLabel?: string

  /** Accessibility description */
  ariaDescribedBy?: string

  /** Whether to announce progress changes to screen readers */
  announceChanges?: boolean
}

export interface CProgressEmits {
  /** Emitted when progress reaches 100% */
  (e: 'complete'): void

  /** Emitted when progress value changes */
  (e: 'change', value: number, percentage: number): void

  /** Emitted when progress bar is focused */
  (e: 'focus', event: FocusEvent): void

  /** Emitted when progress bar loses focus */
  (e: 'blur', event: FocusEvent): void
}

export interface CProgressSlots {
  /** Default slot for custom content */
  default(): VNode | VNode[] | undefined

  /** Label slot for custom label content */
  label(): VNode | VNode[] | undefined

  /** Text slot for custom progress text */
  text(): VNode | VNode[] | undefined
}

export interface UseProgressReturn {
  /** Computed percentage value */
  percentage: ComputedRef<number>

  /** Computed progress bar width */
  progressWidth: ComputedRef<string>

  /** Whether progress is complete */
  isComplete: ComputedRef<boolean>

  /** Whether progress is indeterminate */
  isIndeterminate: ComputedRef<boolean>

  /** Formatted progress text */
  progressText: ComputedRef<string>

  /** ARIA attributes for accessibility */
  ariaAttributes: ComputedRef<Record<string, string | number>>

  /** Handle progress completion */
  handleComplete: () => void

  /** Handle progress change */
  handleChange: (newValue: number) => void

  /** Handle focus events */
  handleFocus: (event: FocusEvent) => void

  /** Handle blur events */
  handleBlur: (event: FocusEvent) => void
}

export interface UseProgressStylesReturn {
  /** Progress container classes */
  containerClasses: ComputedRef<string[]>

  /** Progress bar classes */
  barClasses: ComputedRef<string[]>

  /** Progress fill classes */
  fillClasses: ComputedRef<string[]>

  /** Progress text classes */
  textClasses: ComputedRef<string[]>

  /** Progress label classes */
  labelClasses: ComputedRef<string[]>
}

// Theme-specific progress variants
export type ProgressSize = CProgressProps['size']

// Component registry entry
export interface ProgressComponentInfo {
  name: 'CProgress'
  category: 'atoms'
  description: 'Progress indicator component with accessibility features and customizable styling'
  props: CProgressProps
  emits: CProgressEmits
  slots: CProgressSlots
}
