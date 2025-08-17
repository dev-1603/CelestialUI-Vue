<template>
  <component
    :is="tag"
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    :style="buttonStyles"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <span v-if="loading" class="cui-button__loading">
      <CIcon name="spinner" :spin="true" />
    </span>

    <CIcon
      v-if="leftIcon && !loading"
      :name="leftIcon"
      class="cui-button__icon cui-button__icon--left"
    />

    <span v-if="!iconOnly" class="cui-button__content">
      <slot />
    </span>

    <CIcon
      v-if="rightIcon && !loading"
      :name="rightIcon"
      class="cui-button__icon cui-button__icon--right"
    />
  </component>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { ButtonProps } from '../../../types'
import { useComponentTheme } from '../../../composables/useTheme'
import CIcon from '../icon/CIcon.vue'

interface Props extends ButtonProps {
  tag?: string
  href?: string
  to?: string | object
  replace?: boolean
  exact?: boolean
  activeClass?: string
  exactActiveClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  tag: 'button',
  disabled: false,
  loading: false,
  iconOnly: false,
  fullWidth: false,
  rounded: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const { componentClasses, componentStyles, getColor, getToken } = useComponentTheme('button', props)

// Determine the component tag
const tag = computed(() => {
  if (props.href) return 'a'
  if (props.to) return 'router-link'
  return props.tag
})

// Button classes
const buttonClasses = computed(() => {
  const classes = [...componentClasses.value]

  // Variant classes
  classes.push(`cui-button--${props.variant}`)

  // Size classes
  classes.push(`cui-button--${props.size}`)

  // State classes
  if (props.loading) classes.push('cui-button--loading')
  if (props.disabled) classes.push('cui-button--disabled')
  if (props.fullWidth) classes.push('cui-button--full-width')
  if (props.rounded) classes.push('cui-button--rounded')
  if (props.iconOnly) classes.push('cui-button--icon-only')

  // Icon position classes
  if (props.leftIcon && !props.iconOnly) classes.push('cui-button--with-left-icon')
  if (props.rightIcon && !props.iconOnly) classes.push('cui-button--with-right-icon')

  if (props.class) classes.push(props.class)

  return classes
})

// Button styles
const buttonStyles = computed(() => {
  return {
    ...componentStyles.value,
    ...(props.style || {})
  }
})

// Event handlers
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<style lang="scss" scoped>
.cui-button {
  // Base styles
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--cui-spacing-2);
  font-family: var(--cui-fontFamily-sans);
  font-weight: var(--cui-fontWeight-medium);
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: var(--cui-transition-base);
  outline: none;

  // Focus styles
  &:focus-visible {
    outline: 2px solid var(--cui-color-primary-500);
    outline-offset: 2px;
  }

  // Disabled styles
  &:disabled,
  &--disabled {
    pointer-events: none;
    opacity: 0.6;
    cursor: not-allowed;
  }

  // Loading styles
  &--loading {
    pointer-events: none;

    .cui-button__content {
      opacity: 0.7;
    }
  }

  // Full width
  &--full-width {
    width: 100%;
  }

  // Icon only
  &--icon-only {
    aspect-ratio: 1;
    padding: var(--cui-spacing-2);
  }

  // Rounded
  &--rounded {
    border-radius: var(--cui-radius-full);
  }
}

// Size variants
.cui-button--xs {
  padding: var(--cui-spacing-1) var(--cui-spacing-2);
  font-size: var(--cui-fontSize-xs);
  line-height: var(--cui-lineHeight-tight);
  border-radius: var(--cui-radius-sm);

  &.cui-button--icon-only {
    padding: var(--cui-spacing-1);
  }
}

.cui-button--sm {
  padding: var(--cui-spacing-2) var(--cui-spacing-3);
  font-size: var(--cui-fontSize-sm);
  line-height: var(--cui-lineHeight-tight);
  border-radius: var(--cui-radius-base);

  &.cui-button--icon-only {
    padding: var(--cui-spacing-2);
  }
}

.cui-button--md {
  padding: var(--cui-spacing-3) var(--cui-spacing-4);
  font-size: var(--cui-fontSize-base);
  line-height: var(--cui-lineHeight-normal);
  border-radius: var(--cui-radius-md);

  &.cui-button--icon-only {
    padding: var(--cui-spacing-3);
  }
}

.cui-button--lg {
  padding: var(--cui-spacing-4) var(--cui-spacing-6);
  font-size: var(--cui-fontSize-lg);
  line-height: var(--cui-lineHeight-normal);
  border-radius: var(--cui-radius-lg);

  &.cui-button--icon-only {
    padding: var(--cui-spacing-4);
  }
}

.cui-button--xl {
  padding: var(--cui-spacing-5) var(--cui-spacing-8);
  font-size: var(--cui-fontSize-xl);
  line-height: var(--cui-lineHeight-normal);
  border-radius: var(--cui-radius-xl);

  &.cui-button--icon-only {
    padding: var(--cui-spacing-5);
  }
}

// Variant styles
.cui-button--primary {
  background-color: var(--cui-color-primary-500);
  border-color: var(--cui-color-primary-500);
  color: white;

  &:hover:not(:disabled):not(.cui-button--disabled) {
    background-color: var(--cui-color-primary-600);
    border-color: var(--cui-color-primary-600);
  }

  &:active {
    background-color: var(--cui-color-primary-700);
    border-color: var(--cui-color-primary-700);
  }
}

.cui-button--secondary {
  background-color: var(--cui-color-secondary-500);
  border-color: var(--cui-color-secondary-500);
  color: white;

  &:hover:not(:disabled):not(.cui-button--disabled) {
    background-color: var(--cui-color-secondary-600);
    border-color: var(--cui-color-secondary-600);
  }

  &:active {
    background-color: var(--cui-color-secondary-700);
    border-color: var(--cui-color-secondary-700);
  }
}

.cui-button--outline {
  background-color: transparent;
  border-color: var(--cui-color-primary-500);
  color: var(--cui-color-primary-500);

  &:hover:not(:disabled):not(.cui-button--disabled) {
    background-color: var(--cui-color-primary-50);
    border-color: var(--cui-color-primary-600);
    color: var(--cui-color-primary-600);
  }

  &:active {
    background-color: var(--cui-color-primary-100);
  }
}

.cui-button--ghost {
  background-color: transparent;
  border-color: transparent;
  color: var(--cui-color-primary-500);

  &:hover:not(:disabled):not(.cui-button--disabled) {
    background-color: var(--cui-color-primary-50);
    color: var(--cui-color-primary-600);
  }

  &:active {
    background-color: var(--cui-color-primary-100);
  }
}

.cui-button--link {
  background-color: transparent;
  border-color: transparent;
  color: var(--cui-color-primary-500);
  text-decoration: underline;

  &:hover:not(:disabled):not(.cui-button--disabled) {
    color: var(--cui-color-primary-600);
    text-decoration: none;
  }
}

.cui-button--destructive {
  background-color: var(--cui-color-error-500);
  border-color: var(--cui-color-error-500);
  color: white;

  &:hover:not(:disabled):not(.cui-button--disabled) {
    background-color: var(--cui-color-error-600);
    border-color: var(--cui-color-error-600);
  }

  &:active {
    background-color: var(--cui-color-error-700);
    border-color: var(--cui-color-error-700);
  }
}

// Icon styles
.cui-button__icon {
  flex-shrink: 0;

  &--left {
    margin-left: calc(var(--cui-spacing-1) * -1);
  }

  &--right {
    margin-right: calc(var(--cui-spacing-1) * -1);
  }
}

.cui-button__loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.cui-button__content {
  display: flex;
  align-items: center;
  transition: var(--cui-transition-fast);
}

// With icon adjustments
.cui-button--with-left-icon .cui-button__content {
  margin-left: var(--cui-spacing-1);
}

.cui-button--with-right-icon .cui-button__content {
  margin-right: var(--cui-spacing-1);
}
</style>
