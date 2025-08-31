<template>
    <component
    :is="iconElement"
    :class="iconClasses"
    :style="iconStyles"
    :role="role"
    :aria-label="ariaLabel"
    :aria-hidden="ariaHidden"
    v-bind="iconAttributes"
  >
    <!-- Loading state for external SVG -->
    <template v-if="iconType === 'svg' && isLoading">
      <circle cx="12" cy="12" r="10" opacity="0.3" />
      <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </template>

    <!-- Error state for external SVG -->
    <template v-else-if="iconType === 'svg' && loadError">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </template>

    <!-- SVG Content (for inline SVG) -->
    <template v-else-if="iconType === 'svg' && svgContent">
      <g v-html="svgContent" />
    </template>

    <!-- Material Icons text content -->
    <template v-if="iconType === 'font' && props.library === 'material' && props.name">
      {{ props.name }}
    </template>

    <!-- Slot for custom content -->
    <slot v-if="$slots.default" />
  </component>
</template>

<script setup lang="ts">
import { computed, defineOptions } from 'vue'
import type { CIconProps } from './CIcon.types'
import { useIcon } from './composables/useIcon'
import { useIconStyles } from './composables/useIconStyles'

defineOptions({
  name: 'CIcon'
})

const props = withDefaults(defineProps<CIconProps>(), {
  library: 'material',
  type: 'font',
  size: 'md',
  color: 'inherit',
  clickable: false,
  loading: false,
  disabled: false,
  inlineSvg: true,
  cacheSvg: true,
  loadTimeout: 5000
}) as CIconProps

const emit = defineEmits<{
  click: [event: MouseEvent]
  load: [event: Event]
  error: [event: Event]
}>()

// Composables
const {
  iconElement,
  iconAttributes,
  iconType,
  svgContent,
  svgAttributes,
  isLoading,
  loadError,
  fontIconClasses,
  role,
  ariaLabel,
  ariaHidden
} = useIcon(props, emit)

const { iconClasses, iconStyles } = useIconStyles(props, fontIconClasses)

// Event handlers
const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading && props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
@import './styles/CIcon.css';
</style>
