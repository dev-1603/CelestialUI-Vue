<template>
  <div
    :class="avatarClasses"
    :style="avatarStyles"
    :tabindex="isClickable && !disabled ? 0 : undefined"
    :role="isClickable ? 'button' : 'img'"
    :aria-label="computedAriaLabel"
    :aria-disabled="disabled"
    v-bind="$attrs"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Loading state -->
    <div
      v-if="loading"
      class="celestial-avatar__loading"
      aria-hidden="true"
    >
      <slot name="loading">
        <div class="celestial-avatar__spinner" />
      </slot>
    </div>

    <!-- Image when src is provided and no error -->
    <img
      v-else-if="src && !hasError"
      :src="src"
      :alt="alt"
      :class="imageClasses"
      :style="{ objectFit: objectFit }"
      @load="handleImageLoad"
      @error="handleImageError"
    />

    <!-- Fallback content when no src, error, or loading -->
    <div
      v-else
      :class="fallbackClasses"
      :style="fallbackStyles"
    >
      <slot name="fallback">
        <!-- Default fallback: first letter of alt text -->
        <span v-if="alt && !decorative">
          {{ alt.charAt(0).toUpperCase() }}
        </span>
        <!-- Generic fallback icon -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-1/2 h-1/2"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </slot>
    </div>

    <!-- Badge slot -->
    <div
      v-if="$slots.badge"
      :class="badgeClasses"
    >
      <slot name="badge" />
    </div>

    <!-- Status indicator -->
    <div
      v-if="status || online"
      :class="statusClasses"
      :style="{ backgroundColor: statusColor }"
      role="status"
      :aria-label="`Status: ${status || (online ? 'online' : '')}`"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CAvatarProps, CAvatarEmits } from './CAvatar.types'
import { useAvatar, useAvatarStyles } from './composables'

// Import component styles
import './styles/index.css'

/**
 * CAvatar Component
 *
 * A versatile avatar component for displaying user profile images with fallback support.
 * Supports multiple sizes, rounded variants, status indicators, and accessibility features.
 *
 * @example
 * ```vue
 * <CAvatar
 *   src="/path/to/image.jpg"
 *   alt="John Doe"
 *   size="md"
 *   rounded
 *   status="online"
 * />
 * ```
 *
 * @example
 * ```vue
 * <CAvatar
 *   alt="Jane Smith"
 *   size="lg"
 *   :clickable="true"
 *   @click="handleAvatarClick"
 * >
 *   <template #fallback>
 *     <span>JS</span>
 *   </template>
 *   <template #badge>
 *     <span class="badge">3</span>
 *   </template>
 * </CAvatar>
 * ```
 */
defineOptions({
  name: 'CAvatar',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CAvatarProps>(), {
  size: 'md',
  rounded: false,
  clickable: false,
  disabled: false,
  loading: false,
  bordered: false,
  objectFit: 'cover',
  decorative: false
})

const emit = defineEmits<CAvatarEmits>()

// Composables
const {
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
  handleMouseLeave
} = useAvatar(props, emit)

const {
  avatarClasses,
  imageClasses,
  fallbackClasses,
  badgeClasses,
  statusClasses,
  avatarStyles,
  fallbackStyles
} = useAvatarStyles(props)

/**
 * Computed aria label for accessibility
 * Uses provided ariaLabel or falls back to alt text
 */
const computedAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  if (props.decorative) return undefined
  return props.alt
})
</script>

<style scoped>
/* Component-specific styles are imported above */
/* Any scoped styles can be added here if needed */
</style>
