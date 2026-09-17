import { computed } from 'vue'
import type { CAvatarProps, UseAvatarStylesReturn } from '../CAvatar.types'

/**
 * Composable for avatar styling and CSS classes
 * Generates appropriate CSS classes and inline styles based on props
 *
 * @param props - Avatar component props
 * @returns Avatar styling utilities
 */
export function useAvatarStyles(props: CAvatarProps): UseAvatarStylesReturn {
  /**
   * Base CSS classes for the avatar container
   */
  const avatarClasses = computed(() => {
    const classes = ['celestial-avatar']

    // Size variant
    if (props.size) {
      classes.push(`celestial-avatar--${props.size}`)
    }

    // Rounded variant
    if (props.rounded) {
      classes.push('celestial-avatar--rounded')
    }

    // Clickable state
    if (props.clickable) {
      classes.push('celestial-avatar--clickable')
    }

    // Disabled state
    if (props.disabled) {
      classes.push('celestial-avatar--disabled')
    }

    // Loading state
    if (props.loading) {
      classes.push('celestial-avatar--loading')
    }

    // Bordered state
    if (props.bordered) {
      classes.push('celestial-avatar--bordered')
    }

    // Status indicator
    if (props.status) {
      classes.push(`celestial-avatar--status-${props.status}`)
    }

    // Custom class
    if (props.class) {
      classes.push(props.class)
    }

    return classes
  })

  /**
   * CSS classes for the avatar image
   */
  const imageClasses = computed(() => {
    const classes = ['celestial-avatar__image']

    // Custom image class
    if (props.imageClass) {
      classes.push(props.imageClass)
    }

    return classes
  })

  /**
   * CSS classes for the fallback content
   */
  const fallbackClasses = computed(() => {
    const classes = ['celestial-avatar__fallback']

    // Custom fallback class
    if (props.fallbackClass) {
      classes.push(props.fallbackClass)
    }

    return classes
  })

  /**
   * CSS classes for the badge
   */
  const badgeClasses = computed(() => {
    const classes = ['celestial-avatar__badge']

    // Custom badge class
    if (props.badgeClass) {
      classes.push(props.badgeClass)
    }

    return classes
  })

  /**
   * CSS classes for the status indicator
   */
  const statusClasses = computed(() => {
    const classes = ['celestial-avatar__status']

    // Status variant
    if (props.status) {
      classes.push(`celestial-avatar__status--${props.status}`)
    } else if (props.online) {
      classes.push('celestial-avatar__status--online')
    }

    return classes
  })

  /**
   * Inline styles for the avatar container
   */
  const avatarStyles = computed(() => {
    const styles: Record<string, string> = {}

    // Custom width
    if (props.width) {
      styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
    }

    // Custom height
    if (props.height) {
      styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
    }

    // Border styles
    if (props.bordered) {
      if (props.borderColor) {
        styles.borderColor = props.borderColor
      }
      if (props.borderWidth) {
        styles.borderWidth =
          typeof props.borderWidth === 'number' ? `${props.borderWidth}px` : props.borderWidth
      }
    }

    return styles
  })

  /**
   * Inline styles for the fallback content
   */
  const fallbackStyles = computed(() => {
    const styles: Record<string, string> = {}

    // Background color
    if (props.backgroundColor) {
      styles.backgroundColor = props.backgroundColor
    }

    // Text color
    if (props.textColor) {
      styles.color = props.textColor
    }

    return styles
  })

  return {
    avatarClasses,
    imageClasses,
    fallbackClasses,
    badgeClasses,
    statusClasses,
    avatarStyles,
    fallbackStyles,
  }
}
