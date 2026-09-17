<template>
  <component
    :is="cardComponent"
    :class="cardClasses"
    :style="computedStyles"
    :tabindex="computedTabIndex"
    :aria-label="computedAriaLabel"
    :aria-describedby="ariaDescribedBy"
    :aria-busy="loading"
    :role="cardLandmarkRole"
    v-bind="$attrs"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <!-- Media slot -->
    <div
      v-if="$slots.media"
      :class="mediaClasses"
    >
      <slot name="media" />
    </div>

    <!-- Header slot -->
    <header
      v-if="$slots.header"
      :class="headerClasses"
    >
      <slot name="header" />
    </header>

    <!-- Main content/body slot -->
    <div
      v-if="$slots.default || children"
      :class="bodyClasses"
    >
      <slot>{{ children }}</slot>
    </div>

    <!-- Footer slot -->
    <footer
      v-if="$slots.footer"
      :class="footerClasses"
    >
      <slot name="footer" />
    </footer>

    <!-- Actions slot -->
    <div
      v-if="$slots.actions"
      class="celestial-card__actions"
    >
      <slot name="actions" />
    </div>

    <!-- Overlay slot for loading/skeleton states -->
    <div
      v-if="$slots.overlay || loading"
      :class="overlayClasses"
    >
      <slot name="overlay">
        <div
          v-if="loading"
          class="celestial-card__spinner"
          aria-label="Loading content"
        />
      </slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CCardProps, CCardEmits } from './CCard.types'
import { useCard, useCardStyles } from './composables'

// Import component styles
import './styles/index.css'

defineOptions({
  name: 'CCard',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CCardProps>(), {
  as: 'section',
  elevated: false,
  outlined: false,
  hoverable: false,
  interactive: false,
  loading: false,
  padding: 'md',
  radius: 'md',
  tabIndex: undefined,
  ariaLabel: undefined,
  ariaDescribedBy: undefined,
  maxWidth: undefined,
  height: undefined,
  class: undefined,
  style: undefined
})

const emit = defineEmits<CCardEmits>()

// Composables
const {
  cardComponent,
  isInteractive,
  handleClick,
  handleKeydown,
  computedTabIndex,
  computedAriaLabel
} = useCard(props, emit)

const {
  cardClasses,
  headerClasses,
  bodyClasses,
  footerClasses,
  mediaClasses,
  overlayClasses
} = useCardStyles(props)

const cardLandmarkRole = computed(() => {
  const semanticLandmarks = ['section', 'article', 'aside', 'main', 'header', 'footer']
  return semanticLandmarks.includes(String(cardComponent.value)) ? undefined : 'region'
})

// Computed styles for dynamic properties
const computedStyles = computed(() => {
  const styles: Record<string, any> = {}

  if (props.maxWidth) {
    styles.maxWidth = typeof props.maxWidth === 'number'
      ? `${props.maxWidth}px`
      : props.maxWidth
  }

  if (props.height) {
    styles.height = typeof props.height === 'number'
      ? `${props.height}px`
      : props.height
  }

  if (props.style) {
    if (typeof props.style === 'string') {
      // Parse CSS string into object (basic implementation)
      const stylePairs = props.style.split(';').filter(Boolean)
      stylePairs.forEach(pair => {
        const [property, value] = pair.split(':').map(s => s.trim())
        if (property && value) {
          styles[property] = value
        }
      })
    } else {
      Object.assign(styles, props.style)
    }
  }

  return styles
})
</script>

<style scoped>
/* Component-specific styles are imported above */
/* Any scoped styles can be added here if needed */
</style>
