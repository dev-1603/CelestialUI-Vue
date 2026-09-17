import { computed } from 'vue'
import type { CAlertProps, UseAlertStylesReturn } from '../CAlert.types'

/**
 * Composable for alert styling and CSS class generation
 * Provides computed CSS classes based on props and state
 */
export function useAlertStyles(props: CAlertProps): UseAlertStylesReturn {
  /**
   * Main alert container classes
   */
  const alertClasses = computed(() => {
    const classes = ['celestial-alert']

    // Type variant
    if (props.type) {
      classes.push(`celestial-alert--${props.type}`)
    }

    // Size variant
    if (props.size) {
      classes.push(`celestial-alert--${props.size}`)
    }

    // State classes
    if (props.loading) {
      classes.push('celestial-alert--loading')
    }

    if (props.bordered) {
      classes.push('celestial-alert--bordered')
    }

    if (props.shadowed) {
      classes.push('celestial-alert--shadowed')
    }

    if (props.animation && props.animation !== 'none') {
      classes.push(`celestial-alert--${props.animation}`)
    }

    // Custom class
    if (props.class) {
      classes.push(props.class)
    }

    return classes
  })

  /**
   * Icon container classes
   */
  const iconClasses = computed(() => {
    const classes = ['celestial-alert__icon']

    if (props.showIcon === false) {
      classes.push('celestial-alert__icon--hidden')
    }

    if (props.size) {
      classes.push(`celestial-alert__icon--${props.size}`)
    }

    return classes
  })

  /**
   * Content container classes
   */
  const contentClasses = computed(() => {
    const classes = ['celestial-alert__content']

    if (props.title) {
      classes.push('celestial-alert__content--with-title')
    }

    if (props.size) {
      classes.push(`celestial-alert__content--${props.size}`)
    }

    return classes
  })

  /**
   * Title classes
   */
  const titleClasses = computed(() => {
    const classes = ['celestial-alert__title']

    if (props.size) {
      classes.push(`celestial-alert__title--${props.size}`)
    }

    if (props.type) {
      classes.push(`celestial-alert__title--${props.type}`)
    }

    return classes
  })

  /**
   * Close button classes
   */
  const closeClasses = computed(() => {
    const classes = ['celestial-alert__close']

    if (!props.closable && !props.dismissible) {
      classes.push('celestial-alert__close--hidden')
    }

    if (props.size) {
      classes.push(`celestial-alert__close--${props.size}`)
    }

    return classes
  })

  /**
   * Progress bar classes
   */
  const progressClasses = computed(() => {
    const classes = ['celestial-alert__progress']

    if (!props.showProgress || !props.autoDismiss) {
      classes.push('celestial-alert__progress--hidden')
    }

    if (props.type) {
      classes.push(`celestial-alert__progress--${props.type}`)
    }

    return classes
  })

  return {
    alertClasses,
    iconClasses,
    contentClasses,
    titleClasses,
    closeClasses,
    progressClasses,
  }
}
