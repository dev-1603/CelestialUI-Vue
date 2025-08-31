import { computed, type Component } from 'vue'
import type { CButtonProps, CButtonEmits, UseButtonReturn } from '../CButton.types'

/**
 * Composable for button behavior and logic
 * Handles component type, disabled state, and event handling
 */
export function useButton(
  props: CButtonProps,
  emit: CButtonEmits
): UseButtonReturn {

  /**
   * Determine component type with polymorphic support
   */
  const buttonComponent = computed<Component | string>(() => {
    // Use explicit 'as' prop if provided
    if (props.as) {
      return props.as
    }
    // Default to 'a' if href is present, otherwise 'button'
    return props.href ? 'a' : 'button'
  })

  /**
   * Compute disabled state based on props
   */
  const isDisabled = computed(() => {
    return props.disabled || props.loading
  })

  /**
   * Handle click events with disabled state checking
   */
  const handleClick = (event: MouseEvent) => {
    if (isDisabled.value) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    emit('click', event)
  }

  /**
   * Handle keyboard events for accessibility
   * Supports Enter and Space key activation
   */
  const handleKeydown = (event: KeyboardEvent) => {
    // Only handle keyboard events for button elements (not links)
    if (props.href) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()

      if (!isDisabled.value) {
        // Create synthetic mouse event for consistency
        const syntheticEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        })
        handleClick(syntheticEvent)
      }
    }
  }

  return {
    buttonComponent,
    isDisabled,
    handleClick,
    handleKeydown
  }
}
