import { computed, type Component } from 'vue'
import type { CCardProps, CCardEmits, UseCardReturn } from '../CCard.types'

/**
 * Composable for card behavior and logic
 * Handles component type, interactive state, and event handling
 */
export function useCard(props: CCardProps, emit: CCardEmits): UseCardReturn {
  /**
   * Determine component type with polymorphic support
   */
  const cardComponent = computed<Component | string>(() => {
    return props.as || 'section'
  })

  /**
   * Compute interactive state based on props
   */
  const isInteractive = computed(() => {
    return Boolean(props.interactive || props.hoverable)
  })

  /**
   * Handle click events with interactive state checking
   */
  const handleClick = (event: MouseEvent) => {
    if (!isInteractive.value) {
      return
    }

    emit('click', event)
  }

  /**
   * Handle keyboard events for accessibility
   * Supports Enter and Space key activation for interactive cards
   */
  const handleKeydown = (event: KeyboardEvent) => {
    if (!isInteractive.value) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      emit('click', event as any)
    }

    emit('keydown', event)
  }

  /**
   * Compute tab index for keyboard navigation
   */
  const computedTabIndex = computed(() => {
    if (props.tabIndex !== undefined) {
      return props.tabIndex
    }
    return isInteractive.value ? 0 : -1
  })

  /**
   * Compute aria label with loading state support
   */
  const computedAriaLabel = computed(() => {
    if (props.ariaLabel) return props.ariaLabel
    if (props.loading) return 'Loading content'
    return undefined
  })

  return {
    cardComponent,
    isInteractive,
    handleClick,
    handleKeydown,
    computedTabIndex,
    computedAriaLabel,
  }
}
