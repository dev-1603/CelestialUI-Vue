import { ref, computed, type Ref } from 'vue'
import type { CAvatarProps, CAvatarEmits, UseAvatarReturn } from '../CAvatar.types'

/**
 * Composable for avatar behavior and logic
 * Handles image loading states, error handling, and event management
 *
 * @param props - Avatar component props
 * @param emit - Avatar component emit function
 * @returns Avatar behavior and state management
 */
export function useAvatar(props: CAvatarProps, emit: CAvatarEmits): UseAvatarReturn {
  // Reactive state for image loading
  const hasError = ref<boolean>(false)
  const isLoading = ref<boolean>(true)

  /**
   * Whether the avatar should be clickable
   * Based on clickable prop and disabled state
   */
  const isClickable = computed(() => {
    return Boolean(props.clickable && !props.disabled)
  })

  /**
   * Handle image load success
   * Resets error state and sets loading to false
   */
  const handleImageLoad = (event: Event) => {
    hasError.value = false
    isLoading.value = false
    emit('load', event)
  }

  /**
   * Handle image load error
   * Sets error state and loading to false
   */
  const handleImageError = (event: Event) => {
    hasError.value = true
    isLoading.value = false
    emit('error', event)
  }

  /**
   * Handle click events
   * Only emits if avatar is clickable and not disabled
   */
  const handleClick = (event: MouseEvent) => {
    if (!isClickable.value) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    emit('click', event)
  }

  /**
   * Handle keyboard events for accessibility
   * Supports Enter and Space key activation for clickable avatars
   */
  const handleKeydown = (event: KeyboardEvent) => {
    // Always emit the keydown event
    emit('keydown', event)

    if (!isClickable.value) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      event.stopPropagation()

      // Create a synthetic click event
      const syntheticEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })

      emit('click', syntheticEvent)
    }
  }

  /**
   * Handle focus events
   */
  const handleFocus = (event: FocusEvent) => {
    emit('focus', event)
  }

  /**
   * Handle blur events
   */
  const handleBlur = (event: FocusEvent) => {
    emit('blur', event)
  }

  /**
   * Handle mouse enter events
   */
  const handleMouseEnter = (event: MouseEvent) => {
    emit('mouseenter', event)
  }

  /**
   * Handle mouse leave events
   */
  const handleMouseLeave = (event: MouseEvent) => {
    emit('mouseleave', event)
  }

  return {
    hasError,
    isLoading,
    isClickable,
    handleImageLoad,
    handleImageError,
    handleClick,
    handleKeydown,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
  }
}
