<template>
  <nav
    :class="breadcrumbClasses"
    :aria-label="ariaLabel || 'Breadcrumb navigation'"
    role="navigation"
  >
    <ol class="c-breadcrumb">
      <li
        v-for="(item, index) in processedItems"
        :key="item.id"
        class="c-breadcrumb__item"
        :class="{
          'c-breadcrumb__item--hidden-mobile': shouldHideOnMobile(index)
        }"
      >
        <!-- Custom item slot -->
        <slot
          v-if="$slots.item"
          name="item"
          :item="item"
          :index="index"
          :is-last="index === processedItems.length - 1"
          :is-active="index === processedItems.length - 1"
        >
          <component
            :is="getItemComponent(item, index)"
            :class="getItemClasses(item, index)"
            :href="item.href"
            :disabled="item.disabled"
            :aria-current="index === processedItems.length - 1 ? 'page' : undefined"
            @click="handleItemClick(item, index)"
            @keydown.enter="handleItemClick(item, index)"
            @keydown.space.prevent="handleItemClick(item, index)"
          >
            {{ item.label }}
          </component>
        </slot>

        <!-- Default item rendering -->
        <template v-else>
          <component
            :is="getItemComponent(item, index)"
            :class="getItemClasses(item, index)"
            :href="item.href"
            :disabled="item.disabled"
            :aria-current="index === processedItems.length - 1 ? 'page' : undefined"
            @click="handleItemClick(item, index)"
            @keydown.enter="handleItemClick(item, index)"
            @keydown.space.prevent="handleItemClick(item, index)"
          >
            {{ item.label }}
          </component>
        </template>

        <!-- Separator -->
        <span
          v-if="index < processedItems.length - 1"
          class="c-breadcrumb__separator"
          aria-hidden="true"
        >
          <slot name="separator">
            {{ separator }}
          </slot>
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed, type VNode } from 'vue'
import { useBreadcrumb } from './composables/useBreadcrumb'
import type { CBreadcrumbProps, CBreadcrumbEmits, BreadcrumbItem } from './CBreadcrumb.types'
import './styles/CBreadcrumb.css'

// CBreadcrumb Component - A responsive, accessible breadcrumb navigation component

// Props definition
const props = withDefaults(defineProps<CBreadcrumbProps>(), {
  separator: '/',
  maxItems: 10,
  showHome: false,
  compact: false,
  ariaLabel: 'Breadcrumb navigation',
})

// Emits definition
const emit = defineEmits<CBreadcrumbEmits>()

// Composable usage
const { processedItems, handleNavigate, handleHome } = useBreadcrumb(
  computed(() => props.items),
  {
    maxItems: props.maxItems,
    showHome: props.showHome,
    homeItem: props.homeItem,
    onNavigate: (item: BreadcrumbItem, index: number) => {
      emit('navigate', item, index)
    },
    onHome: (item: BreadcrumbItem) => {
      emit('home', item)
    },
  }
)

/**
 * Computed classes for the breadcrumb container
 */
const breadcrumbClasses = computed(() => [
  'c-breadcrumb-container',
  {
    'c-breadcrumb-container--compact': props.compact,
  },
  props.class,
])

/**
 * Determine the appropriate component for a breadcrumb item
 */
const getItemComponent = (item: BreadcrumbItem, index: number): string => {
  // Last item should be a span (current page)
  if (index === processedItems.value.length - 1) {
    return 'span'
  }

  // Items with href should be links
  if (item.href && !item.disabled) {
    return 'a'
  }

  // Default to button for interactive items
  return 'button'
}

/**
 * Get CSS classes for a breadcrumb item
 */
const getItemClasses = (item: BreadcrumbItem, index: number): string[] => {
  const classes = ['c-breadcrumb__link']

  // Active state (last item)
  if (index === processedItems.value.length - 1) {
    classes.push('c-breadcrumb__link--active')
  }

  // Disabled state
  if (item.disabled) {
    classes.push('c-breadcrumb__link--disabled')
  }

  // Truncated state
  if (item.id === 'truncated') {
    classes.push('c-breadcrumb__link--truncated')
  }

  return classes
}

/**
 * Handle item click events
 */
const handleItemClick = (item: BreadcrumbItem, index: number): void => {
  // Handle home item specially
  if (item.id === 'home' || (props.showHome && index === 0)) {
    handleHome(item)
  } else {
    handleNavigate(item, index)
  }
}

/**
 * Determine if an item should be hidden on mobile
 */
const shouldHideOnMobile = (index: number): boolean => {
  // Hide middle items on mobile when truncated
  if (props.maxItems < processedItems.value.length) {
    const totalItems = processedItems.value.length
    const visibleItems = Math.min(props.maxItems, totalItems)

    // Hide items in the middle section
    if (index > 0 && index < totalItems - 2) {
      return true
    }
  }

  return false
}
</script>

<style scoped>
.c-breadcrumb-container {
  width: 100%;
}

.c-breadcrumb-container--compact {
  --breadcrumb-item-padding: 0.25rem;
  --breadcrumb-separator-margin: 0.25rem;
  --breadcrumb-font-size: 0.75rem;
  --breadcrumb-line-height: 1rem;
}
</style>
