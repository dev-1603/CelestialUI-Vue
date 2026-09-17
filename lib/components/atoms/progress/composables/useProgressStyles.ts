import { computed, type ComputedRef } from 'vue'
import type { CProgressProps, UseProgressStylesReturn } from '../CProgress.types'

/**
 * Composable for progress bar styling and CSS classes
 * Handles responsive design, theming, and variant styling
 */
export function useProgressStyles(props: CProgressProps): UseProgressStylesReturn {
  /**
   * Generate container classes
   */
  const containerClasses = computed(() => {
    const classes = ['celestial-progress']

    // Size classes
    if (props.size) {
      classes.push(`celestial-progress--${props.size}`)
    }

    // Custom class
    if (props.customClass) {
      classes.push(props.customClass)
    }

    return classes
  })

  /**
   * Generate progress bar classes
   */
  const barClasses = computed(() => {
    const classes = ['celestial-progress__bar']

    // Size classes
    if (props.size) {
      classes.push(`celestial-progress__bar--${props.size}`)
    }

    // Animation classes
    if (props.animated) {
      classes.push('celestial-progress__bar--animated')
    }

    if (props.striped) {
      classes.push('celestial-progress__bar--striped')
    }

    // Indeterminate class
    if (props.indeterminate) {
      classes.push('celestial-progress__bar--indeterminate')
    }

    return classes
  })

  /**
   * Generate progress fill classes
   */
  const fillClasses = computed(() => {
    const classes = ['celestial-progress__fill']

    // Size classes
    if (props.size) {
      classes.push(`celestial-progress__fill--${props.size}`)
    }

    // Animation classes
    if (props.animated) {
      classes.push('celestial-progress__fill--animated')
    }

    if (props.striped) {
      classes.push('celestial-progress__fill--striped')
    }

    // Indeterminate class
    if (props.indeterminate) {
      classes.push('celestial-progress__fill--indeterminate')
    }

    // Color scheme classes
    if (props.colorScheme) {
      classes.push(`celestial-progress__fill--${props.colorScheme}`)
    }

    // Custom fill class
    if (props.fillClass) {
      classes.push(props.fillClass)
    }

    return classes
  })

  /**
   * Generate progress text classes
   */
  const textClasses = computed(() => {
    const classes = ['celestial-progress__text']

    // Size classes
    if (props.size) {
      classes.push(`celestial-progress__text--${props.size}`)
    }

    // Custom text class
    if (props.textClass) {
      classes.push(props.textClass)
    }

    return classes
  })

  /**
   * Generate progress label classes
   */
  const labelClasses = computed(() => {
    const classes = ['celestial-progress__label']

    // Size classes
    if (props.size) {
      classes.push(`celestial-progress__label--${props.size}`)
    }

    return classes
  })

  return {
    containerClasses,
    barClasses,
    fillClasses,
    textClasses,
    labelClasses,
  }
}
