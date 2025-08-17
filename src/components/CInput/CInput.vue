<template>
  <div class="input-container" :class="inputClasses">
    <div class="input-wrapper">
      <div v-if="prependIcon" class="input__icon input__icon--prepend">
        <slot name="prepend-icon">
          <i :class="prependIcon"></i>
        </slot>
      </div>

      <div class="input__field-wrapper">
        <input
          :value="inputValue"
          :type="type"
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
          :required="required"
          :min="min"
          :max="max"
          :pattern="pattern"
          :autocomplete="autocomplete"
          :name="name"
          :id="id"
          class="input__field"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        >
        <label :class="labelClasses">
          {{ label }}
          <span v-if="required" class="input__required-indicator">*</span>
        </label>
      </div>

      <div v-if="appendIcon || clearable" class="input__icon input__icon--append">
        <slot name="append-icon">
          <i v-if="appendIcon" :class="appendIcon"></i>
          <button
            v-if="clearable && inputValue"
            type="button"
            class="input__clear-button"
            @click="clearInput"
          >
            <span class="input__clear-icon">×</span>
          </button>
        </slot>
      </div>
    </div>

    <div v-if="helpText || validationError || error" class="help-text" :class="{
      'help-text--error': error || validationError,
      'help-text--success': success && !validationError
    }">
      {{ validationError || (typeof error === 'string' ? error : helpText) }}
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import debounce from 'lodash/debounce'

interface Props {
  modelValue?: string | number
  label?: string
  type?: string
  variant?: 'outlined' | 'filled' | 'dense'
  prependIcon?: string
  appendIcon?: string
  clearable?: boolean
  error?: boolean | string
  success?: boolean
  disabled?: boolean
  readonly?: boolean
  debounceTime?: number
  helpText?: string
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
  min?: number | string
  max?: number | string
  pattern?: string
  autocomplete?: string
  name?: string
  id?: string
  validateOnInput?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  variant: 'outlined',
  clearable: false,
  debounceTime: 0,
  size: 'md',
  validateOnInput: true,
  error: false,
  success: false,
  required: false,
  disabled: false,
  readonly: false
})

const emit = defineEmits(['update:modelValue', 'input', 'clear', 'error', 'focus', 'blur'])

const inputValue = ref(props.modelValue)
const isFocused = ref(false)
const hasContent = computed(() => !!inputValue.value || isFocused.value)
const validationError = ref<string | boolean>(false)

// Validation function
const validate = () => {
  if (!props.validateOnInput) return true

  validationError.value = false

  if (props.required && !inputValue.value) {
    validationError.value = 'This field is required'
  }

  if (props.type === 'email' && inputValue.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(inputValue.value.toString())) {
      validationError.value = 'Please enter a valid email address'
    }
  }

  if (props.pattern && inputValue.value) {
    const patternRegex = new RegExp(props.pattern)
    if (!patternRegex.test(inputValue.value.toString())) {
      validationError.value = 'Invalid format'
    }
  }

  if (props.min !== undefined && inputValue.value < props.min) {
    validationError.value = `Value must be greater than or equal to ${props.min}`
  }

  if (props.max !== undefined && inputValue.value > props.max) {
    validationError.value = `Value must be less than or equal to ${props.max}`
  }

  emit('error', validationError.value)
  return !validationError.value
}

// Handle input changes with optional debounce
const handleInput = debounce((event: Event) => {
  const target = event.target as HTMLInputElement
  inputValue.value = target.value
  emit('update:modelValue', target.value)
  emit('input', event)
  validate()
}, props.debounceTime)

// Clear input value
const clearInput = () => {
  inputValue.value = ''
  emit('update:modelValue', '')
  emit('clear')
  validate()
}

// Handle focus/blur
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
  validate()
}

// Watch for external modelValue changes
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
  validate()
})

// Computed classes for styling
const inputClasses = computed(() => ({
  'input': true,
  [`input--${props.variant}`]: true,
  [`input--${props.size}`]: true,
  'input--focused': isFocused.value,
  'input--has-content': hasContent.value,
  'input--disabled': props.disabled,
  'input--error': props.error || validationError.value,
  'input--success': props.success && !validationError.value,
  'input--with-prepend': !!props.prependIcon,
  'input--with-append': !!props.appendIcon || props.clearable,
  'input--required': props.required
}))

const labelClasses = computed(() => ({
  'input__label': true,
  'input__label--float': hasContent.value,
  'input__label--focused': isFocused.value,
  'input__label--error': props.error || validationError.value,
  'input__label--success': props.success && !validationError.value
}))
</script>



<style lang="scss" scoped>
.input-container {
  position: relative;
  width: 100%;
  margin-bottom: var(--kui-space-40);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input__field-wrapper {
  position: relative;
  flex: 1;
}

.input__field {
  width: 100%;
  padding: var(--kui-space-30) var(--kui-space-40);
  font-size: var(--kui-font-size-30);
  border: 1px solid var(--kui-color-border-neutral);
  border-radius: var(--kui-border-radius-10);
  transition: all 0.2s ease;
  background: transparent;

  &:focus {
    outline: none;
    border-color: var(--kui-color-border-primary);
  }
}

// Size variants
.input--sm .input__field {
  padding: var(--kui-space-20) var(--kui-space-30);
  font-size: var(--kui-font-size-20);
}

.input--lg .input__field {
  padding: var(--kui-space-40) var(--kui-space-50);
  font-size: var(--kui-font-size-40);
}

.input__label {
  position: absolute;
  left: var(--kui-space-40);
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease;
  color: var(--kui-color-text-neutral);
  pointer-events: none;
  background: var(--kui-color-background-neutral-weakest);
  padding: 0 var(--kui-space-20);

  &--float {
    top: 0;
    font-size: var(--kui-font-size-20);
  }

  &--focused {
    color: var(--kui-color-text-primary);
  }

  &--error {
    color: var(--kui-color-text-danger);
  }

  &--success {
    color: var(--kui-color-text-success);
  }
}

.input__required-indicator {
  color: var(--kui-color-text-danger);
  margin-left: var(--kui-space-10);
}

.input--dense {
  .input__field {
    padding: var(--kui-space-20) var(--kui-space-30);
  }
}

.input--filled {
  .input__field {
    background: var(--kui-color-background-neutral-weak);
    border: none;
  }
}

.input--outlined {
  .input__field {
    background: transparent;
  }
}

.input__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--kui-space-60);
  color: var(--kui-color-text-neutral);

  &--prepend {
    margin-right: var(--kui-space-20);
  }

  &--append {
    margin-left: var(--kui-space-20);
  }
}

.input__clear-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--kui-color-text-neutral);

  &:hover {
    color: var(--kui-color-text-danger);
  }
}

.input__clear-icon {
  font-size: var(--kui-font-size-40);
  line-height: 1;
}

// Help text
.help-text {
  margin-top: var(--kui-space-20);
  font-size: var(--kui-font-size-20);
  color: var(--kui-color-text-neutral);

  &--error {
    color: var(--kui-color-text-danger);
  }

  &--success {
    color: var(--kui-color-text-success);
  }
}

// Hover states
.input:not(.input--disabled) {
  &:hover {
    .input__field {
      border-color: var(--kui-color-border-neutral-strong);
    }
  }
}

// Disabled state
.input--disabled {
  opacity: 0.6;
  cursor: not-allowed;

  .input__field {
    cursor: not-allowed;
  }
}

// Error state
.input--error {
  .input__field {
    border-color: var(--kui-color-border-danger);
  }
}

// Success state
.input--success {
  .input__field {
    border-color: var(--kui-color-border-success);
  }
}
</style>
