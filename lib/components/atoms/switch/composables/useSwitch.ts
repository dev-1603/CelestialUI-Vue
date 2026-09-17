/**
 * @fileoverview useSwitch composable for CSwitch component
 *
 * This composable provides reactive state management and event handling for switch components.
 * It includes accessibility features, keyboard navigation, and customizable behavior.
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useSwitch } from './composables/useSwitch'
 *
 * const { isOn, toggle, handleClick, switchClasses } = useSwitch({
 *   initialValue: false,
 *   onChange: (value) => console.log('Switch changed:', value)
 * })
 * </script>
 * ```
 *
 * @author CelestialUI Team
 * @version 1.0.0
 */

import { ref, computed, watch, readonly, unref, type Ref, type ComputedRef } from 'vue'
import type {
  UseSwitchOptions,
  UseSwitchReturn,
  SwitchSize,
  SwitchColor,
  SwitchConfig,
} from '../CSwitch.types'

/**
 * Default configuration for switch behavior
 */
const DEFAULT_CONFIG: SwitchConfig = {
  animationDuration: 200,
  hapticFeedback: true,
  emitOnProgrammaticChange: false,
}

/**
 * Size-based dimensions for switch components
 */
const SIZE_DIMENSIONS = {
  sm: {
    width: '32px',
    height: '18px',
    thumbSize: '14px',
    thumbOffset: '2px',
  },
  md: {
    width: '44px',
    height: '24px',
    thumbSize: '20px',
    thumbOffset: '2px',
  },
  lg: {
    width: '56px',
    height: '30px',
    thumbSize: '26px',
    thumbOffset: '2px',
  },
} as const

/**
 * Color theme definitions for switch states
 */
const COLOR_THEMES = {
  primary: {
    on: '#3b82f6',
    off: '#d1d5db',
    thumb: '#ffffff',
  },
  secondary: {
    on: '#6b7280',
    off: '#d1d5db',
    thumb: '#ffffff',
  },
  success: {
    on: '#10b981',
    off: '#d1d5db',
    thumb: '#ffffff',
  },
  warning: {
    on: '#f59e0b',
    off: '#d1d5db',
    thumb: '#ffffff',
  },
  error: {
    on: '#ef4444',
    off: '#d1d5db',
    thumb: '#ffffff',
  },
  info: {
    on: '#06b6d4',
    off: '#d1d5db',
    thumb: '#ffffff',
  },
} as const

/**
 * useSwitch composable for managing switch state and behavior
 *
 * @param options - Configuration options for the switch
 * @returns Object containing reactive state and methods
 *
 * @example
 * ```typescript
 * const switchState = useSwitch({
 *   initialValue: true,
 *   disabled: false,
 *   size: 'md',
 *   color: 'primary',
 *   onChange: (value) => {
 *     console.log('Switch toggled to:', value)
 *   }
 * })
 * ```
 */
export function useSwitch(options: UseSwitchOptions = {}): UseSwitchReturn {
  const {
    initialValue = false,
    disabled = false,
    loading = false,
    size = 'md',
    color = 'primary',
    config = {},
    onChange,
    onToggle,
  } = options

  // Merge with default configuration
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  // Reactive state
  const isOn = ref(initialValue)
  const isDisabled = ref(disabled)
  const isLoading = ref(loading)
  const isFocused = ref(false)

  /**
   * Toggle the switch state
   * Handles disabled and loading states appropriately
   */
  const toggle = (): void => {
    if (isDisabled.value || isLoading.value) {
      return
    }

    isOn.value = !isOn.value

    // Trigger haptic feedback on mobile devices
    if (finalConfig.hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10)
    }

    // Call callbacks
    onChange?.(isOn.value)
    onToggle?.()
  }

  /**
   * Set switch to on state
   */
  const turnOn = (): void => {
    if (isDisabled.value || isLoading.value || isOn.value) {
      return
    }

    isOn.value = true
    onChange?.(isOn.value)
  }

  /**
   * Set switch to off state
   */
  const turnOff = (): void => {
    if (isDisabled.value || isLoading.value || !isOn.value) {
      return
    }

    isOn.value = false
    onChange?.(isOn.value)
  }

  /**
   * Handle click events
   * @param event - Mouse click event
   */
  const handleClick = (event: MouseEvent): void => {
    event.preventDefault()
    event.stopPropagation()

    if (isDisabled.value || isLoading.value) {
      return
    }

    toggle()
  }

  /**
   * Handle keyboard events for accessibility
   * @param event - Keyboard event
   */
  const handleKeydown = (event: KeyboardEvent): void => {
    if (isDisabled.value || isLoading.value) {
      return
    }

    // Handle space and enter keys
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      toggle()
    }
  }

  /**
   * Handle focus events
   * @param event - Focus event
   */
  const handleFocus = (event: FocusEvent): void => {
    isFocused.value = true
  }

  /**
   * Handle blur events
   * @param event - Blur event
   */
  const handleBlur = (event: FocusEvent): void => {
    isFocused.value = false
  }

  /**
   * Computed CSS classes for the switch container
   */
  const switchClasses = computed((): string => {
    const currentSize = unref(size)
    const currentColor = unref(color)

    const classes = [
      'c-switch',
      `c-switch--${currentSize}`,
      `c-switch--${currentColor}`,
      isOn.value ? 'c-switch--on' : 'c-switch--off',
      isDisabled.value ? 'c-switch--disabled' : '',
      isLoading.value ? 'c-switch--loading' : '',
      isFocused.value ? 'c-switch--focused' : '',
    ].filter(Boolean)

    return classes.join(' ')
  })

  /**
   * Computed CSS classes for the track
   */
  const trackClasses = computed((): string => {
    const currentSize = unref(size)

    const classes = [
      'c-switch__track',
      `c-switch__track--${currentSize}`,
      isOn.value ? 'c-switch__track--on' : 'c-switch__track--off',
      isDisabled.value ? 'c-switch__track--disabled' : '',
      isLoading.value ? 'c-switch__track--loading' : '',
    ].filter(Boolean)

    return classes.join(' ')
  })

  /**
   * Computed CSS classes for the thumb
   */
  const thumbClasses = computed((): string => {
    const currentSize = unref(size)

    const classes = [
      'c-switch__thumb',
      `c-switch__thumb--${currentSize}`,
      isOn.value ? 'c-switch__thumb--on' : 'c-switch__thumb--off',
      isDisabled.value ? 'c-switch__thumb--disabled' : '',
      isLoading.value ? 'c-switch__thumb--loading' : '',
    ].filter(Boolean)

    return classes.join(' ')
  })

  /**
   * Computed styles for the switch based on size and color
   */
  const switchStyles = computed(() => {
    const currentSize = unref(size)
    const currentColor = unref(color)

    const dimensions = SIZE_DIMENSIONS[currentSize]
    const theme = COLOR_THEMES[currentColor]

    return {
      '--switch-width': dimensions.width,
      '--switch-height': dimensions.height,
      '--thumb-size': dimensions.thumbSize,
      '--thumb-offset': dimensions.thumbOffset,
      '--color-on': theme.on,
      '--color-off': theme.off,
      '--color-thumb': theme.thumb,
      '--animation-duration': `${finalConfig.animationDuration}ms`,
    }
  })

  // Watch for external changes to disabled state
  watch(
    () => disabled,
    (newValue) => {
      isDisabled.value = newValue
    },
  )

  // Watch for external changes to loading state
  watch(
    () => loading,
    (newValue) => {
      isLoading.value = newValue
    },
  )

  // Watch for external changes to size
  watch(
    () => size,
    (newValue) => {
      // Update the computed classes when size changes
      // The computed properties will automatically update
    },
  )

  // Watch for external changes to color
  watch(
    () => color,
    (newValue) => {
      // Update the computed classes when color changes
      // The computed properties will automatically update
    },
  )

  return {
    // State
    isOn,
    isDisabled,
    isLoading,

    // Methods
    toggle,
    turnOn,
    turnOff,
    handleClick,
    handleKeydown,
    handleFocus,
    handleBlur,

    // Computed
    switchClasses,
    trackClasses,
    thumbClasses,

    // Additional computed properties
    switchStyles: computed(() => switchStyles.value),
    isFocused,
    dimensions: computed(() => {
      const currentSize = unref(size)
      return SIZE_DIMENSIONS[currentSize]
    }),
    theme: computed(() => {
      const currentColor = unref(color)
      return COLOR_THEMES[currentColor]
    }),
  } as UseSwitchReturn
}

/**
 * Utility function to create a switch with external model value
 * Useful for v-model integration
 *
 * @param modelValue - External model value ref
 * @param options - Additional options
 * @returns Enhanced switch state with model value integration
 */
export function useSwitchModel(
  modelValue: Ref<boolean>,
  options: Omit<UseSwitchOptions, 'initialValue'> = {},
): UseSwitchReturn {
  const switchState = useSwitch({
    ...options,
    initialValue: modelValue.value,
  })

  // Sync with external model value
  watch(modelValue, (newValue) => {
    if (newValue !== switchState.isOn.value) {
      switchState.isOn.value = newValue
    }
  })

  watch(switchState.isOn, (newValue) => {
    if (newValue !== modelValue.value) {
      modelValue.value = newValue
    }
  })

  return switchState
}

// Re-export types for convenience
export type { UseSwitchOptions, UseSwitchReturn, SwitchSize, SwitchColor, SwitchConfig }
