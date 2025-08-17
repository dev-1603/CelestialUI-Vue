<template>
  <component
    :is="tag"
    :class="cardClasses"
    :style="cardStyles"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Header -->
    <div v-if="$slots.header || title || subtitle" class="cui-card__header">
      <slot name="header">
        <div v-if="title || subtitle" class="cui-card__header-content">
          <h3 v-if="title" class="cui-card__title">{{ title }}</h3>
          <p v-if="subtitle" class="cui-card__subtitle">{{ subtitle }}</p>
        </div>
      </slot>
      <div v-if="$slots.actions" class="cui-card__actions">
        <slot name="actions" />
      </div>
    </div>

    <!-- Media -->
    <div v-if="$slots.media" class="cui-card__media">
      <slot name="media" />
    </div>

    <!-- Content -->
    <div v-if="$slots.default" class="cui-card__content" :class="{ 'cui-card__content--padded': padding }">
      <slot />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="cui-card__footer">
      <slot name="footer" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CardProps } from '../../../types'
import { useComponentTheme } from '../../../composables/useTheme'

interface Props extends CardProps {
  tag?: string
  title?: string
  subtitle?: string
  elevation?: number
  interactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  variant: 'elevated',
  padding: true,
  hoverable: false,
  clickable: false,
  interactive: false,
  elevation: 1
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  hover: [isHovered: boolean]
}>()

const { componentClasses, componentStyles } = useComponentTheme('card', props)

// State
const isHovered = ref(false)

// Computed
const cardClasses = computed(() => {
  const classes = [...componentClasses.value]

  // Variant
  classes.push(`cui-card--${props.variant}`)

  // Elevation
  if (props.variant === 'elevated' && props.elevation) {
    classes.push(`cui-card--elevation-${props.elevation}`)
  }

  // States
  if (props.hoverable) classes.push('cui-card--hoverable')
  if (props.clickable || props.interactive) classes.push('cui-card--clickable')
  if (props.disabled) classes.push('cui-card--disabled')
  if (isHovered.value && props.hoverable) classes.push('cui-card--hovered')

  if (props.class) classes.push(props.class)

  return classes
})

const cardStyles = computed(() => {
  return {
    ...componentStyles.value,
    ...(props.style || {})
  }
})

// Methods
const handleClick = (event: MouseEvent) => {
  if (props.disabled) return
  if (props.clickable || props.interactive) {
    emit('click', event)
  }
}

const handleMouseEnter = () => {
  if (props.disabled) return
  isHovered.value = true
  emit('hover', true)
}

const handleMouseLeave = () => {
  isHovered.value = false
  emit('hover', false)
}
</script>

<style lang="scss" scoped>
.cui-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--cui-color-surface-primary);
  color: var(--cui-color-text-primary);
  border-radius: var(--cui-radius-lg);
  transition: var(--cui-transition-base);
  overflow: hidden;

  // Clickable state
  &--clickable {
    cursor: pointer;
    user-select: none;
  }

  // Disabled state
  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

// Variant styles
.cui-card--elevated {
  box-shadow: var(--cui-shadow-base);
  border: 1px solid var(--cui-color-border-primary);

  &.cui-card--hoverable:hover,
  &.cui-card--hovered {
    box-shadow: var(--cui-shadow-lg);
    transform: translateY(-2px);
  }

  // Elevation levels
  &.cui-card--elevation-0 {
    box-shadow: none;
  }

  &.cui-card--elevation-1 {
    box-shadow: var(--cui-shadow-sm);
  }

  &.cui-card--elevation-2 {
    box-shadow: var(--cui-shadow-base);
  }

  &.cui-card--elevation-3 {
    box-shadow: var(--cui-shadow-md);
  }

  &.cui-card--elevation-4 {
    box-shadow: var(--cui-shadow-lg);
  }

  &.cui-card--elevation-5 {
    box-shadow: var(--cui-shadow-xl);
  }
}

.cui-card--outlined {
  border: 2px solid var(--cui-color-border-primary);
  box-shadow: none;

  &.cui-card--hoverable:hover,
  &.cui-card--hovered {
    border-color: var(--cui-color-primary-500);
    box-shadow: var(--cui-shadow-base);
  }
}

.cui-card--filled {
  background-color: var(--cui-color-neutral-50);
  border: none;
  box-shadow: none;

  &.cui-card--hoverable:hover,
  &.cui-card--hovered {
    background-color: var(--cui-color-neutral-100);
  }
}

// Header
.cui-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: var(--cui-spacing-6) var(--cui-spacing-6) var(--cui-spacing-4);
  border-bottom: 1px solid var(--cui-color-border-primary);
}

.cui-card__header-content {
  flex: 1;
}

.cui-card__title {
  margin: 0;
  font-size: var(--cui-fontSize-lg);
  font-weight: var(--cui-fontWeight-semibold);
  color: var(--cui-color-text-primary);
  line-height: var(--cui-lineHeight-tight);
}

.cui-card__subtitle {
  margin: var(--cui-spacing-1) 0 0;
  font-size: var(--cui-fontSize-sm);
  color: var(--cui-color-text-secondary);
  line-height: var(--cui-lineHeight-normal);
}

.cui-card__actions {
  display: flex;
  align-items: center;
  gap: var(--cui-spacing-2);
  margin-left: var(--cui-spacing-4);
}

// Media
.cui-card__media {
  position: relative;
  overflow: hidden;

  :deep(img) {
    width: 100%;
    height: auto;
    display: block;
  }

  :deep(video) {
    width: 100%;
    height: auto;
    display: block;
  }
}

// Content
.cui-card__content {
  flex: 1;

  &--padded {
    padding: var(--cui-spacing-6);
  }

  // Remove padding from header if content is padded
  .cui-card__header + & {
    padding-top: var(--cui-spacing-4);
  }
}

// Footer
.cui-card__footer {
  padding: var(--cui-spacing-4) var(--cui-spacing-6) var(--cui-spacing-6);
  border-top: 1px solid var(--cui-color-border-primary);
  background-color: var(--cui-color-neutral-25);
}

// Size variants
.cui-card--xs {
  .cui-card__header {
    padding: var(--cui-spacing-3) var(--cui-spacing-4) var(--cui-spacing-2);
  }

  .cui-card__content--padded {
    padding: var(--cui-spacing-4);
  }

  .cui-card__footer {
    padding: var(--cui-spacing-2) var(--cui-spacing-4) var(--cui-spacing-3);
  }

  .cui-card__title {
    font-size: var(--cui-fontSize-base);
  }
}

.cui-card--sm {
  .cui-card__header {
    padding: var(--cui-spacing-4) var(--cui-spacing-5) var(--cui-spacing-3);
  }

  .cui-card__content--padded {
    padding: var(--cui-spacing-5);
  }

  .cui-card__footer {
    padding: var(--cui-spacing-3) var(--cui-spacing-5) var(--cui-spacing-4);
  }
}

.cui-card--lg {
  .cui-card__header {
    padding: var(--cui-spacing-8) var(--cui-spacing-8) var(--cui-spacing-5);
  }

  .cui-card__content--padded {
    padding: var(--cui-spacing-8);
  }

  .cui-card__footer {
    padding: var(--cui-spacing-5) var(--cui-spacing-8) var(--cui-spacing-8);
  }

  .cui-card__title {
    font-size: var(--cui-fontSize-xl);
  }
}

.cui-card--xl {
  .cui-card__header {
    padding: var(--cui-spacing-10) var(--cui-spacing-10) var(--cui-spacing-6);
  }

  .cui-card__content--padded {
    padding: var(--cui-spacing-10);
  }

  .cui-card__footer {
    padding: var(--cui-spacing-6) var(--cui-spacing-10) var(--cui-spacing-10);
  }

  .cui-card__title {
    font-size: var(--cui-fontSize-2xl);
  }
}

// Special card types
.cui-card--compact {
  .cui-card__header {
    padding: var(--cui-spacing-4) var(--cui-spacing-5);
    border-bottom: none;
  }

  .cui-card__content--padded {
    padding: var(--cui-spacing-5);
    padding-top: 0;
  }
}

// Interactive states for clickable cards
.cui-card--clickable {
  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--cui-color-primary-500);
    outline-offset: 2px;
  }
}
</style>
