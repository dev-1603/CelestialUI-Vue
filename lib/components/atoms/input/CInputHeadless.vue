<template>
  <div :class="wrapperClasses">
    <!-- Input container with elements -->
    <div :class="inputContainerClasses">
      <!-- Left element slot -->
      <div
        v-if="$slots.leftElement"
        :class="leftElementClasses"
      >
        <slot name="leftElement" />
      </div>

      <!-- Prepend slot for additional content -->
      <div
        v-if="$slots.prepend"
        :class="prependClasses"
      >
        <slot name="prepend" />
      </div>

      <!-- Main input field -->
      <input
        ref="inputRef"
        :class="inputClasses"
        v-bind="{
          ...inputProps,
          'aria-describedby': computedAriaDescribedBy
        }"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
      />

      <!-- Append slot for additional content -->
      <div
        v-if="$slots.append"
        :class="appendClasses"
      >
        <slot name="append" />
      </div>

      <!-- Right element slot -->
      <div
        v-if="$slots.rightElement"
        :class="rightElementClasses"
      >
        <slot name="rightElement" />
      </div>

      <!-- Clear button (optional) -->
      <button
        v-if="showClearButton"
        type="button"
        :class="clearButtonClasses"
        @click="handleClear"
        :aria-label="clearButtonLabel"
      >
        <slot name="clearIcon">
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </slot>
      </button>
    </div>

    <!-- Helper text -->
    <div
      v-if="showHelperText"
      :class="helperTextClasses"
      :id="helperTextId"
    >
      <slot name="helperText">
        {{ helperText }}
      </slot>
    </div>

    <!-- Error message -->
    <div
      v-if="showErrorMessage"
      :class="errorMessageClasses"
      :id="errorMessageId"
      role="alert"
      aria-live="polite"
    >
      <slot name="errorMessage">
        {{ errorMessage }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, useSlots } from 'vue'
import type { CInputProps, CInputEmits } from './CInput.types'
import { useInput, useInputStyles } from './composables'

// NO CSS IMPORTS - Completely headless

defineOptions({
  name: 'CInputHeadless',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CInputProps>(), {
  type: 'text',
  size: 'md',
  variant: 'outline',
  disabled: false,
  readonly: false,
  required: false,
  invalid: false,
  debounceMs: 0,
  // Force headless mode
  headless: true
})

const emit = defineEmits<CInputEmits>()

// Get slots
const slots = useSlots()

// Template ref for input element
const inputRef = ref<HTMLInputElement>()

// Use composables
const {
  inputProps,
  inputValue,
  isDisabled,
  isReadonly,
  isRequired,
  isInvalid,
  isFocused,
  handleInput,
  handleChange,
  handleFocus,
  handleBlur,
  handleKeydown,
  handleKeyup,
  clear,
  focus,
  blur
} = useInput(props, emit)

// Compute state for styling
const inputState = computed(() => ({
  isFocused: isFocused.value,
  hasLeftElement: Boolean(slots.leftElement),
  hasRightElement: Boolean(slots.rightElement),
  hasValue: Boolean(inputValue.value)
}))

const {
  wrapperClasses,
  inputClasses,
  leftElementClasses,
  rightElementClasses,
  helperTextClasses,
  errorMessageClasses,
  inputContainerClasses
} = useInputStyles(props, inputState)

// Helper text and error message display logic
const showHelperText = computed(() => {
  return (props.helperText || slots.helperText) && !showErrorMessage.value
})

const showErrorMessage = computed(() => {
  return (props.errorMessage || slots.errorMessage) && isInvalid.value
})

// IDs for accessibility
const helperTextId = computed(() => {
  return props.id ? `${props.id}-helper-text` : undefined
})

const errorMessageId = computed(() => {
  return props.id ? `${props.id}-error-message` : undefined
})

// Clear button logic
const showClearButton = computed(() => {
  return inputValue.value && !isDisabled.value && !isReadonly.value && slots.clearIcon !== undefined
})

const clearButtonClasses = computed(() => {
  const custom = Array.isArray(props.clearButtonClass)
    ? props.clearButtonClass
    : props.clearButtonClass
      ? [props.clearButtonClass]
      : []
  return custom
})

// Prepend and append classes
const prependClasses = computed(() => {
  const custom = Array.isArray(props.prependClass)
    ? props.prependClass
    : props.prependClass
      ? [props.prependClass]
      : []
  return custom
})

const appendClasses = computed(() => {
  const custom = Array.isArray(props.appendClass)
    ? props.appendClass
    : props.appendClass
      ? [props.appendClass]
      : []
  return custom
})

const clearButtonLabel = computed(() => {
  return `Clear ${props.placeholder || 'input'}`
})

// Handle clear button click
const handleClear = () => {
  clear()
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// Update aria-describedby to include helper text and error message
const computedAriaDescribedBy = computed(() => {
  const ids = []

  if (props.ariaDescribedBy) {
    ids.push(props.ariaDescribedBy)
  }

  if (showHelperText.value && helperTextId.value) {
    ids.push(helperTextId.value)
  }

  if (showErrorMessage.value && errorMessageId.value) {
    ids.push(errorMessageId.value)
  }

  return ids.length > 0 ? ids.join(' ') : undefined
})

// Expose public methods
defineExpose({
  focus,
  blur,
  clear,
  inputRef
})
</script>

<!-- NO STYLES - Completely headless -->
