/**
 * @fileoverview CSwitch component exports
 *
 * This file exports the CSwitch component and all related utilities,
 * types, and composables for external consumption.
 *
 * @example
 * ```typescript
 * import { CSwitch, useSwitch } from '@lib/components/atoms/switch'
 *
 * // Use the component
 * <CSwitch v-model="isEnabled" />
 *
 * // Use the composable
 * const { isOn, toggle } = useSwitch({ initialValue: false })
 * ```
 *
 * @author CelestialUI Team
 * @version 1.0.0
 */

// Main component export
export { default as CSwitch } from './CSwitch.vue'

// Composable exports
export { useSwitch, useSwitchModel } from './composables/useSwitch'

// Type exports
export type {
  // Component types
  CSwitchProps,
  CSwitchEmits,
  CSwitchSlots,

  // Composable types
  UseSwitchOptions,
  UseSwitchReturn,
  SwitchConfig,

  // Utility types
  SwitchSize,
  SwitchColor,
} from './CSwitch.types'

// Re-export Vue types for convenience
export type { Ref, ComputedRef } from 'vue'
