/**
 * CAlert Component Exports
 *
 * Centralized export for the alert component and its related utilities.
 * This file provides a clean API for importing the alert component and its types.
 */

// Main component export
export { default as CAlert } from './CAlert.vue'

// Type exports
export type {
  CAlertProps,
  CAlertEmits,
  CAlertSlots,
  UseAlertReturn,
  UseAlertStylesReturn,
  AlertType,
  AlertSize,
  AlertAnimation,
  AriaLive,
  AlertConfig,
  AlertComponentInfo,
} from './CAlert.types'

// Composable exports
export { useAlert, useAlertStyles } from './composables'

// Re-export composable types for convenience
export type {
  UseAlertReturn as UseAlert,
  UseAlertStylesReturn as UseAlertStyles,
} from './composables'
