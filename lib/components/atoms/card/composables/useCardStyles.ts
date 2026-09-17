import { computed } from 'vue'
import type { CCardProps, UseCardStylesReturn } from '../CCard.types'

/**
 * Composable for card styling and CSS classes
 * Generates appropriate classes based on props
 */
export function useCardStyles(props: CCardProps): UseCardStylesReturn {
  /**
   * Generate main card classes
   */
  const cardClasses = computed(() => {
    const classes = ['celestial-card']

    // Padding variants
    if (props.padding) {
      classes.push(`celestial-card--padding-${props.padding}`)
    } else {
      classes.push('celestial-card--padding-md')
    }

    // Radius variants
    if (props.radius) {
      classes.push(`celestial-card--radius-${props.radius}`)
    } else {
      classes.push('celestial-card--radius-md')
    }

    // Visual variants
    if (props.elevated) {
      classes.push('celestial-card--elevated')
    }

    if (props.outlined) {
      classes.push('celestial-card--outlined')
    }

    if (props.hoverable) {
      classes.push('celestial-card--hoverable')
    }

    if (props.interactive) {
      classes.push('celestial-card--interactive')
    }

    if (props.loading) {
      classes.push('celestial-card--loading')
    }

    // Custom class
    if (props.class) {
      classes.push(props.class)
    }

    return classes
  })

  /**
   * Generate header classes
   */
  const headerClasses = computed(() => {
    const classes = ['celestial-card__header']

    if (props.padding === 'none') {
      classes.push('celestial-card__header--no-padding')
    }

    return classes
  })

  /**
   * Generate body classes
   */
  const bodyClasses = computed(() => {
    const classes = ['celestial-card__body']

    if (props.padding === 'none') {
      classes.push('celestial-card__body--no-padding')
    }

    return classes
  })

  /**
   * Generate footer classes
   */
  const footerClasses = computed(() => {
    const classes = ['celestial-card__footer']

    if (props.padding === 'none') {
      classes.push('celestial-card__footer--no-padding')
    }

    return classes
  })

  /**
   * Generate media classes
   */
  const mediaClasses = computed(() => {
    return ['celestial-card__media']
  })

  /**
   * Generate overlay classes
   */
  const overlayClasses = computed(() => {
    const classes = ['celestial-card__overlay']

    if (props.loading) {
      classes.push('celestial-card__overlay--loading')
    }

    return classes
  })

  return {
    cardClasses,
    headerClasses,
    bodyClasses,
    footerClasses,
    mediaClasses,
    overlayClasses,
  }
}
