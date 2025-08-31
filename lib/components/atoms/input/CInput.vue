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

// Import component styles (users can override or disable via headless/unstyled)
import './styles/index.css'

defineOptions({
  name: 'CInput',
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
  debounceMs: 0
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
  if (props.unstyled) {
    return Array.isArray(props.clearButtonClass)
      ? props.clearButtonClass
      : props.clearButtonClass
        ? [props.clearButtonClass]
        : []
  }

  const defaultClasses = []

  if (!props.headless) {
    defaultClasses.push(
      'celestial-input__clear-button',
      `celestial-input__clear-button--${props.size || 'md'}`
    )
  }

  const custom = Array.isArray(props.clearButtonClass)
    ? props.clearButtonClass
    : props.clearButtonClass
      ? [props.clearButtonClass]
      : []

  return props.headless ? custom : [...defaultClasses, ...custom]
})

// Prepend and append classes
const prependClasses = computed(() => {
  if (props.unstyled) {
    return Array.isArray(props.prependClass)
      ? props.prependClass
      : props.prependClass
        ? [props.prependClass]
        : []
  }

  const defaultClasses = []

  if (!props.headless) {
    defaultClasses.push('celestial-input__prepend')
  }

  const custom = Array.isArray(props.prependClass)
    ? props.prependClass
    : props.prependClass
      ? [props.prependClass]
      : []

  return props.headless ? custom : [...defaultClasses, ...custom]
})

const appendClasses = computed(() => {
  if (props.unstyled) {
    return Array.isArray(props.appendClass)
      ? props.appendClass
      : props.appendClass
        ? [props.appendClass]
        : []
  }

  const defaultClasses = []

  if (!props.headless) {
    defaultClasses.push('celestial-input__append')
  }

  const custom = Array.isArray(props.appendClass)
    ? props.appendClass
    : props.appendClass
      ? [props.appendClass]
      : []

  return props.headless ? custom : [...defaultClasses, ...custom]
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

<style scoped>
/* Clear button styles */
.celestial-input__clear-button {
  @apply flex items-center justify-center flex-shrink-0;
  @apply text-gray-400 hover:text-gray-600;
  @apply transition-colors duration-200 ease-in-out;
  @apply rounded cursor-pointer;
  @apply focus:outline-none focus:ring-1 focus:ring-blue-500;

  background: none;
  border: none;
  padding: 0.25rem;
}

.celestial-input__clear-button--sm {
  @apply w-6 h-6;
}

.celestial-input__clear-button--md {
  @apply w-7 h-7;
}

.celestial-input__clear-button--lg {
  @apply w-8 h-8;
}

.celestial-input__clear-button:hover {
  @apply bg-gray-100;
}

.celestial-input--disabled .celestial-input__clear-button {
  @apply text-gray-300 cursor-not-allowed;
}

.celestial-input--disabled .celestial-input__clear-button:hover {
  @apply bg-transparent;
}

/* Prepend and append styles */
.celestial-input__prepend,
.celestial-input__append {
  @apply flex items-center justify-center flex-shrink-0;
  @apply text-gray-600;
}
</style>
