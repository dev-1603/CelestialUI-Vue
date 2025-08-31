<template>
  <label
    :class="wrapperClasses"
    :for="props.id"
  >
    <!-- Hidden native input for accessibility and form submission -->
    <input
      :class="inputClasses"
      v-bind="inputProps"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />

    <!-- Custom checkbox visual -->
    <span
      :class="checkboxClasses"
      :aria-hidden="true"
    >
      <!-- Check/Indeterminate icon with slot support -->
      <span
        :class="iconClasses"
      >
        <slot name="icon">
          <!-- Default check icon -->
          <span
            v-if="isChecked && !isIndeterminate"
            :class="['celestial-checkbox__icon--check']"
            aria-hidden="true"
          >
            {{ checkIcon || '✓' }}
          </span>

          <!-- Default indeterminate icon -->
          <span
            v-else-if="isIndeterminate"
            :class="['celestial-checkbox__icon--indeterminate']"
            aria-hidden="true"
          >
            {{ indeterminateIcon || '−' }}
          </span>
        </slot>
      </span>
    </span>

    <!-- Label content -->
    <div
      v-if="children || $slots.default || $slots.label"
      :class="labelClasses"
    >
      <!-- Main label content -->
      <slot name="label">
        <slot>{{ children }}</slot>
      </slot>

      <!-- Description slot -->
      <div
        v-if="$slots.description"
        :class="descriptionClasses"
      >
        <slot name="description" />
      </div>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CCheckboxProps, CCheckboxEmits } from './CCheckbox.types'
import { useCheckbox, useCheckboxStyles } from './composables'

// Import component styles
import './styles/index.css'

defineOptions({
  name: 'CCheckbox',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CCheckboxProps>(), {
  size: 'md',
  colorScheme: 'primary',
  disabled: false,
  indeterminate: false
})

const emit = defineEmits<CCheckboxEmits>()

// Use composables
const {
  inputProps,
  isChecked,
  isDisabled,
  isIndeterminate,
  handleChange,
  handleFocus,
  handleBlur,
  handleKeydown
} = useCheckbox(props, emit)

const {
  wrapperClasses,
  inputClasses,
  checkboxClasses,
  iconClasses,
  labelClasses,
  descriptionClasses
} = useCheckboxStyles(props)
</script>

<style scoped>
/* Component-specific styles are imported above */
/* Any scoped styles can be added here if needed */
</style>
