<template>
  <div
    :class="containerClasses"
    v-bind="$attrs"
  >
    <!-- Progress Header with Label and Value/Percentage -->
    <div
      v-if="label || $slots.label || progressText || $slots.text"
      class="celestial-progress__header flex items-center justify-between gap-2 mb-1.5"
    >
      <div
        v-if="label || $slots.label"
        :class="labelClasses"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </div>

      <div
        v-if="progressText || $slots.text"
        :class="textClasses"
      >
        <slot name="text">
          {{ progressText }}
        </slot>
      </div>
    </div>

    <!-- Progress bar container -->
    <div
      :class="barClasses"
      :style="progressBarStyle"
      tabindex="0"
      v-bind="ariaAttributes"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <!-- Progress fill -->
      <div
        :class="fillClasses"
        :style="progressFillStyle"
        :data-value="value"
        :data-percentage="percentage"
      />
    </div>

    <!-- Default slot for custom content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CProgressProps, CProgressEmits } from './CProgress.types'
import { useProgress, useProgressStyles } from './composables'

// Import component styles
import './styles/index.css'

/**
 * CProgress - Progress indicator component
 *
 * A versatile progress bar component with accessibility features, animations,
 * and customizable styling. Supports both determinate and indeterminate progress.
 *
 * @example
 * Basic usage with value and max props
 * ```typescript
 * const progressValue = ref(0)
 * const handleComplete = () => console.log('Progress complete!')
 * ```
 */
defineOptions({
  name: 'CProgress',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CProgressProps>(), {
  value: 0,
  max: 100,
  size: 'md',
  label: '',
  showPercentage: false,
  showValue: false,
  animated: false,
  animationDuration: 300,
  striped: false,
  customClass: '',
  fillClass: '',
  textClass: '',
  indeterminate: false,
  ariaLabel: '',
  ariaDescribedBy: '',
  announceChanges: false
})

const emit = defineEmits<CProgressEmits>()

// Composables
const {
  percentage,
  progressWidth,
  isComplete,
  isIndeterminate,
  progressText,
  ariaAttributes,
  handleComplete,
  handleChange,
  handleFocus,
  handleBlur
} = useProgress(props, emit)

const {
  containerClasses,
  barClasses,
  fillClasses,
  textClasses,
  labelClasses
} = useProgressStyles(props)

/**
 * Progress bar container styles
 */
const progressBarStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (props.animationDuration && props.animationDuration !== 300) {
    styles['--celestial-progress-transition'] = `${props.animationDuration}ms ease-in-out`
  }

  return styles
})

/**
 * Progress fill styles
 */
const progressFillStyle = computed(() => {
  const styles: Record<string, string> = {
    width: progressWidth.value
  }

  if (props.animationDuration && props.animationDuration !== 300) {
    styles['--celestial-progress-transition'] = `${props.animationDuration}ms ease-in-out`
  }

  return styles
})
</script>

<style scoped>
/* Component-specific styles are imported above */
/* Any scoped styles can be added here if needed */
</style>
