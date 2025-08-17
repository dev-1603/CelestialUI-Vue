<template>
  <div class="cui-input-wrapper" :class="wrapperClasses">
    <div class="cui-input-container">
      <!-- Prefix Icon -->
      <div v-if="prefixIcon" class="cui-input__icon cui-input__icon--prefix">
        <CIcon :name="prefixIcon" />
      </div>

      <!-- Input Field -->
      <div class="cui-input__field-wrapper">
        <input
          ref="inputRef"
          v-model="inputValue"
          :type="type"
          :placeholder="floatingLabel ? '' : placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :autocomplete="autocomplete"
          :name="name"
          :id="id"
          :class="inputClasses"
          :style="inputStyles"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
        />

        <!-- Floating Label -->
        <label
          v-if="label"
          :for="id"
          :class="labelClasses"
          class="cui-input__label"
        >
          {{ label }}
          <span v-if="required" class="cui-input__required">*</span>
        </label>
      </div>

      <!-- Suffix Icon / Clear Button -->
      <div v-if="suffixIcon || (clearable && hasValue)" class="cui-input__icon cui-input__icon--suffix">
        <button
          v-if="clearable && hasValue && !disabled"
          type="button"
          class="cui-input__clear"
          @click="clearInput"
          :aria-label="'Clear ' + (label || 'input')"
        >
          <CIcon name="times" />
        </button>
        <CIcon v-else-if="suffixIcon" :name="suffixIcon" />
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading" class="cui-input__loading">
        <CIcon name="spinner" :spin="true" />
      </div>
    </div>

    <!-- Helper Text / Error Message -->
    <div v-if="helperText || errorMessage" class="cui-input__help" :class="helpClasses">
      {{ errorMessage || helperText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, type Ref } from 'vue'
import type { InputProps } from '../../../types'
import { useComponentTheme } from '../../../composables/useTheme'
import CIcon from '../icon/CIcon.vue'

interface Props extends InputProps {
  id?: string
  name?: string
  autocomplete?: string
  floatingLabel?: boolean
  dense?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  variant: 'outlined',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
  loading: false,
  floatingLabel: true,
  dense: false,
  debounce: 0
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
  keydown: [event: KeyboardEvent]
}>()

const { componentClasses, componentStyles } = useComponentTheme('input', props)

// Refs
const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)
const inputValue = ref(props.modelValue || '')

// Debounced input handler
let debounceTimer: NodeJS.Timeout | null = null

// Computed properties
const hasValue = computed(() => {
  return inputValue.value !== '' && inputValue.value != null
})

const hasContent = computed(() => {
  return hasValue.value || isFocused.value
})

const wrapperClasses = computed(() => {
  const classes = [...componentClasses.value]

  if (props.variant) classes.push(`cui-input--${props.variant}`)
  if (props.size) classes.push(`cui-input--${props.size}`)
  if (props.disabled) classes.push('cui-input--disabled')
  if (props.readonly) classes.push('cui-input--readonly')
  if (props.loading) classes.push('cui-input--loading')
  if (props.dense) classes.push('cui-input--dense')
  if (isFocused.value) classes.push('cui-input--focused')
  if (hasValue.value) classes.push('cui-input--has-value')
  if (props.errorMessage) classes.push('cui-input--error')
  if (props.prefixIcon) classes.push('cui-input--with-prefix')
  if (props.suffixIcon || (props.clearable && hasValue.value)) classes.push('cui-input--with-suffix')

  return classes
})

const inputClasses = computed(() => {
  const classes = ['cui-input__field']
  if (props.class) classes.push(props.class)
  return classes
})

const inputStyles = computed(() => {
  return {
    ...componentStyles.value,
    ...(props.style || {})
  }
})

const labelClasses = computed(() => {
  const classes = []

  if (props.floatingLabel) {
    classes.push('cui-input__label--floating')
    if (hasContent.value) classes.push('cui-input__label--active')
  }

  if (isFocused.value) classes.push('cui-input__label--focused')
  if (props.errorMessage) classes.push('cui-input__label--error')

  return classes
})

const helpClasses = computed(() => {
  const classes = []
  if (props.errorMessage) classes.push('cui-input__help--error')
  return classes
})

// Methods
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value

  if (props.debounce > 0) {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      inputValue.value = value
      emit('update:modelValue', value)
      emit('input', event)
    }, props.debounce)
  } else {
    inputValue.value = value
    emit('update:modelValue', value)
    emit('input', event)
  }
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const clearInput = () => {
  inputValue.value = ''
  emit('update:modelValue', '')
  emit('clear')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

// Watch for external model value changes
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue || ''
})

// Expose methods
defineExpose({
  focus,
  blur,
  inputRef
})
</script>

<style lang="scss" scoped>
.cui-input-wrapper {
  position: relative;
  width: 100%;
}

.cui-input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.cui-input__field-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.cui-input__field {
  width: 100%;
  background: transparent;
  border: 1px solid var(--cui-color-border-primary);
  color: var(--cui-color-text-primary);
  font-family: var(--cui-fontFamily-sans);
  transition: var(--cui-transition-base);
  outline: none;

  &::placeholder {
    color: var(--cui-color-text-tertiary);
  }

  &:focus {
    border-color: var(--cui-color-primary-500);
    box-shadow: 0 0 0 1px var(--cui-color-primary-500);
  }

  &:disabled {
    background-color: var(--cui-color-neutral-50);
    color: var(--cui-color-text-disabled);
    cursor: not-allowed;
  }
}

// Size variants
.cui-input--xs {
  .cui-input__field {
    padding: var(--cui-spacing-1) var(--cui-spacing-2);
    font-size: var(--cui-fontSize-xs);
    border-radius: var(--cui-radius-sm);
  }
}

.cui-input--sm {
  .cui-input__field {
    padding: var(--cui-spacing-2) var(--cui-spacing-3);
    font-size: var(--cui-fontSize-sm);
    border-radius: var(--cui-radius-base);
  }
}

.cui-input--md {
  .cui-input__field {
    padding: var(--cui-spacing-3) var(--cui-spacing-4);
    font-size: var(--cui-fontSize-base);
    border-radius: var(--cui-radius-md);
  }
}

.cui-input--lg {
  .cui-input__field {
    padding: var(--cui-spacing-4) var(--cui-spacing-5);
    font-size: var(--cui-fontSize-lg);
    border-radius: var(--cui-radius-lg);
  }
}

.cui-input--xl {
  .cui-input__field {
    padding: var(--cui-spacing-5) var(--cui-spacing-6);
    font-size: var(--cui-fontSize-xl);
    border-radius: var(--cui-radius-xl);
  }
}

// Variant styles
.cui-input--outlined {
  .cui-input__field {
    background-color: transparent;
  }
}

.cui-input--filled {
  .cui-input__field {
    background-color: var(--cui-color-neutral-50);
    border: 1px solid transparent;

    &:focus {
      background-color: var(--cui-color-background-primary);
      border-color: var(--cui-color-primary-500);
    }
  }
}

.cui-input--underlined {
  .cui-input__field {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid var(--cui-color-border-primary);
    border-radius: 0;

    &:focus {
      border-bottom-color: var(--cui-color-primary-500);
      box-shadow: none;
    }
  }
}

// Dense variant
.cui-input--dense {
  .cui-input__field {
    padding-top: var(--cui-spacing-2);
    padding-bottom: var(--cui-spacing-2);
  }
}

// Icon styles
.cui-input__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--cui-color-text-tertiary);

  &--prefix {
    margin-right: var(--cui-spacing-2);
    padding-left: var(--cui-spacing-3);
  }

  &--suffix {
    margin-left: var(--cui-spacing-2);
    padding-right: var(--cui-spacing-3);
  }
}

.cui-input__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--cui-color-text-tertiary);
  cursor: pointer;
  padding: var(--cui-spacing-1);
  border-radius: var(--cui-radius-sm);
  transition: var(--cui-transition-fast);

  &:hover {
    color: var(--cui-color-text-secondary);
    background-color: var(--cui-color-neutral-100);
  }
}

.cui-input__loading {
  position: absolute;
  right: var(--cui-spacing-3);
  color: var(--cui-color-primary-500);
}

// Label styles
.cui-input__label {
  color: var(--cui-color-text-secondary);
  font-size: var(--cui-fontSize-sm);
  font-weight: var(--cui-fontWeight-medium);
  transition: var(--cui-transition-base);
  pointer-events: none;

  &--floating {
    position: absolute;
    left: var(--cui-spacing-4);
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--cui-color-background-primary);
    padding: 0 var(--cui-spacing-1);

    &.cui-input__label--active {
      top: 0;
      font-size: var(--cui-fontSize-xs);
      transform: translateY(-50%);
    }
  }

  &--focused {
    color: var(--cui-color-primary-500);
  }

  &--error {
    color: var(--cui-color-error-500);
  }
}

.cui-input__required {
  color: var(--cui-color-error-500);
  margin-left: var(--cui-spacing-1);
}

// Help text styles
.cui-input__help {
  margin-top: var(--cui-spacing-1);
  font-size: var(--cui-fontSize-xs);
  color: var(--cui-color-text-tertiary);

  &--error {
    color: var(--cui-color-error-500);
  }
}

// State styles
.cui-input--error {
  .cui-input__field {
    border-color: var(--cui-color-error-500);

    &:focus {
      border-color: var(--cui-color-error-500);
      box-shadow: 0 0 0 1px var(--cui-color-error-500);
    }
  }
}

.cui-input--disabled {
  opacity: 0.6;
  pointer-events: none;
}

.cui-input--readonly {
  .cui-input__field {
    cursor: default;
  }
}

// Adjustments for icons
.cui-input--with-prefix {
  .cui-input__field {
    padding-left: var(--cui-spacing-2);
  }

  .cui-input__label--floating {
    left: calc(var(--cui-spacing-8) + var(--cui-spacing-2));
  }
}

.cui-input--with-suffix {
  .cui-input__field {
    padding-right: var(--cui-spacing-2);
  }
}
</style>
