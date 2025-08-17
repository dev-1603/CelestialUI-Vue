<template>
  <span
    :class="['c-icon', className]"
    :style="computedStyles"
    v-bind="$attrs"
  >
    <!-- Material Icons -->
    <span v-if="type === 'material'" class="material-icons">
      {{ name }}
    </span>

    <!-- Font Awesome -->
    <i v-else-if="type === 'fa'" :class="['fa', `fa-${name}`]"></i>

    <!-- SVG Icon -->
    <svg v-else-if="type === 'svg'"
      :width="size"
      :height="size"
      :viewBox="viewBox"
      v-html="svgContent"
    ></svg>

    <!-- Image Icon -->
    <img v-else-if="type === 'image'"
      :src="name"
      :alt="alt"
      :width="size"
      :height="size"
    >
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  /** Icon name or path */
  name: string
  /** Icon type: 'material' | 'fa' | 'svg' | 'image' */
  type?: string
  /** Icon size in pixels */
  size?: string | number
  /** Icon color */
  color?: string
  /** Additional CSS classes */
  className?: string
  /** SVG viewBox attribute */
  viewBox?: string
  /** SVG content when using type='svg' */
  svgContent?: string
  /** Alt text for image icons */
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'material',
  size: '24',
  color: 'currentColor',
  className: '',
  viewBox: '0 0 24 24',
  svgContent: '',
  alt: 'icon'
})

const computedStyles = computed(() => ({
  '--icon-size': typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color,
}))
</script>

<style scoped>
.c-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--icon-size);
  height: var(--icon-size);
  line-height: 1;
}

.c-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.c-icon :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Material Icons styles */
.c-icon :deep(.material-icons) {
  font-size: var(--icon-size);
  width: var(--icon-size);
  height: var(--icon-size);
}

/* Font Awesome styles */
.c-icon :deep(.fa) {
  font-size: var(--icon-size);
}
</style>
