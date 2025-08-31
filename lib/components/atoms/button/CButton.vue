<template>
  <component
    :is="buttonComponent"
    :class="buttonClasses"
    :disabled="isDisabled"
    :type="type"
    :href="href"
    :target="target"
    :download="download"
    :aria-label="computedAriaLabel"
    :aria-describedby="ariaDescribedBy"
    :aria-disabled="isDisabled"
    v-bind="$attrs"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <!-- Loading icon with slot support -->
    <span
      v-if="loading"
      :class="iconClasses"
      :data-loading="true"
      aria-hidden="true"
    >
      <slot name="loadingSpinner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="w-full h-full"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
            class="opacity-25"
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            class="opacity-75"
          />
        </svg>
      </slot>
    </span>

    <!-- Left icon with slot support -->
    <span
      v-else-if="leftIcon || $slots.leftIcon"
      :class="iconClasses"
      aria-hidden="true"
    >
      <slot name="leftIcon">
        <!-- Placeholder for icon system - replace with actual icon component -->
        <span class="text-current">{{ leftIcon }}</span>
      </slot>
    </span>

    <!-- Button text content with children prop support -->
    <span
      v-if="children || $slots.default"
      :class="textClasses"
    >
      <slot>{{ children }}</slot>
    </span>

    <!-- Right icon with slot support -->
    <span
      v-if="(rightIcon || $slots.rightIcon) && !loading"
      :class="iconClasses"
      aria-hidden="true"
    >
      <slot name="rightIcon">
        <!-- Placeholder for icon system - replace with actual icon component -->
        <span class="text-current">{{ rightIcon }}</span>
      </slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CButtonProps, CButtonEmits } from './CButton.types'
import { useButton, useButtonStyles } from './composables'

// Import component styles
import './styles/index.css'

defineOptions({
  name: 'CButton',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
  rounded: false
})

const emit = defineEmits<CButtonEmits>()

// Use composables
const {
  buttonComponent,
  isDisabled,
  handleClick,
  handleKeydown
} = useButton(props, emit)

const {
  buttonClasses,
  iconClasses,
  textClasses
} = useButtonStyles(props)

// Computed properties for accessibility
const computedAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  if (props.loading) return 'Loading'
  return undefined
})
</script>

<style scoped>
/* Component-specific styles are imported above */
/* Any scoped styles can be added here if needed */
</style>
