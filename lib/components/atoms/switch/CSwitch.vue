<!--
  @fileoverview CSwitch - Binary on/off toggle control component

  A fully accessible switch component with keyboard navigation, ARIA support,
  and customizable appearance. Supports v-model binding and provides slots
  for custom content.

  @example
  Basic usage: <CSwitch v-model="isEnabled" />
  With props: <CSwitch v-model="isEnabled" size="lg" color="success" />

  @author CelestialUI Team
  @version 1.0.0
-->

<template>
  <div
    ref="switchRef"
    :class="[switchClasses, props.class]"
    :style="[switchStyles, props.style]"
    :tabindex="focusable ? (disabled ? -1 : 0) : -1"
    :role="role"
    :aria-checked="isOn"
    :aria-disabled="disabled"
    :aria-label="ariaLabel"
    :aria-describedby="ariaDescribedBy"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- Track Slot -->
    <div :class="trackClasses">
      <slot
        name="track"
        :is-on="isOn"
        :disabled="disabled"
        :loading="loading"
      >
        <!-- Default track content -->
      </slot>
    </div>

    <!-- Thumb Slot -->
    <div :class="thumbClasses">
      <slot
        name="thumb"
        :is-on="isOn"
        :disabled="disabled"
        :loading="loading"
      >
        <!-- Default thumb content -->
      </slot>
    </div>

    <!-- Default Slot for additional content -->
    <slot :is-on="isOn" :disabled="disabled" :loading="loading"></slot>
  </div>
</template>

<script setup lang="ts">
/**
 * CSwitch Component
 *
 * A binary toggle switch component with full accessibility support,
 * keyboard navigation, and customizable appearance.
 *
 * Features:
 * - v-model support for two-way data binding
 * - Keyboard navigation (Space, Enter)
 * - ARIA attributes for screen readers
 * - Customizable size and color variants
 * - Loading and disabled states
 * - Custom slots for track and thumb content
 * - Focus management and visual feedback
 *
 * @component
 */

import { ref, computed, watch, type Ref } from 'vue'
import { useSwitch } from './composables/useSwitch'
import type { CSwitchProps, CSwitchEmits, CSwitchSlots } from './CSwitch.types'
import './styles/CSwitch.css'

// Component name for debugging
defineOptions({
  name: 'CSwitch'
})

/**
 * Props definition with defaults
 */
const props = withDefaults(defineProps<CSwitchProps>(), {
  modelValue: false,
  size: 'md',
  color: 'primary',
  disabled: false,
  loading: false,
  focusable: true,
  tabIndex: 0
})

/**
 * Emits definition
 */
const emit = defineEmits<CSwitchEmits>()

/**
 * Slots definition
 */
defineSlots<CSwitchSlots>()

// Template refs
const switchRef = ref<HTMLElement>()

// Use the switch composable for state management
const {
  isOn,
  isDisabled,
  isLoading,
  toggle,
  handleClick: composableHandleClick,
  handleKeydown: composableHandleKeydown,
  handleFocus: composableHandleFocus,
  handleBlur: composableHandleBlur,
  switchClasses,
  trackClasses,
  thumbClasses,
  switchStyles
} = useSwitch({
  initialValue: props.modelValue,
  disabled: computed(() => props.disabled),
  loading: computed(() => props.loading),
  size: computed(() => props.size),
  color: computed(() => props.color),
  onChange: (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  }
})

/**
 * Computed role for accessibility
 * Uses 'switch' role for proper screen reader support
 */
const role = computed(() => 'switch')

/**
 * Handle click events with proper event handling
 * @param event - Mouse click event
 */
const handleClick = (event: MouseEvent): void => {
  // Call composable handler
  composableHandleClick(event)

  // Emit click event
  emit('click', event)
}

/**
 * Handle keyboard events for accessibility
 * @param event - Keyboard event
 */
const handleKeydown = (event: KeyboardEvent): void => {
  // Call composable handler
  composableHandleKeydown(event)

  // Emit keydown event
  emit('keydown', event)
}

/**
 * Handle focus events
 * @param event - Focus event
 */
const handleFocus = (event: FocusEvent): void => {
  // Call composable handler
  composableHandleFocus(event)

  // Emit focus event
  emit('focus', event)
}

/**
 * Handle blur events
 * @param event - Blur event
 */
const handleBlur = (event: FocusEvent): void => {
  // Call composable handler
  composableHandleBlur(event)

  // Emit blur event
  emit('blur', event)
}

/**
 * Watch for external changes to modelValue
 * This ensures the component stays in sync with parent state
 */
watch(() => props.modelValue, (newValue) => {
  if (newValue !== isOn.value) {
    isOn.value = newValue
  }
})

/**
 * Watch for external changes to disabled state
 */
watch(() => props.disabled, (newValue) => {
  isDisabled.value = newValue
})

/**
 * Watch for external changes to loading state
 */
watch(() => props.loading, (newValue) => {
  isLoading.value = newValue
})

/**
 * Watch for external changes to size prop
 */
watch(() => props.size, (newValue) => {
  // Update the composable with new size
  // The composable will handle the class updates
})

/**
 * Watch for external changes to color prop
 */
watch(() => props.color, (newValue) => {
  // Update the composable with new color
  // The composable will handle the class updates
})

/**
 * Expose methods for parent component access
 * Useful for programmatic control
 */
defineExpose({
  /**
   * Toggle the switch state
   */
  toggle,

  /**
   * Focus the switch element
   */
  focus: () => switchRef.value?.focus(),

  /**
   * Blur the switch element
   */
  blur: () => switchRef.value?.blur(),

  /**
   * Get the current switch state
   */
  getValue: () => isOn.value,

  /**
   * Set the switch state
   * @param value - New boolean value
   */
  setValue: (value: boolean) => {
    isOn.value = value
    emit('update:modelValue', value)
    emit('change', value)
  }
})
</script>

<style scoped>
/**
 * Component-specific styles
 * Most styling is handled by the imported CSS file
 */

/* Ensure proper focus behavior */
.c-switch:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Ensure proper cursor behavior */
.c-switch:not(.c-switch--disabled):not(.c-switch--loading) {
  cursor: pointer;
}

.c-switch--disabled,
.c-switch--loading {
  cursor: not-allowed;
}

/* Loading state animation */
.c-switch--loading .c-switch__thumb {
  animation: c-switch-loading 1.5s ease-in-out infinite;
}

@keyframes c-switch-loading {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .c-switch--loading .c-switch__thumb {
    animation: none;
  }
}
</style>
