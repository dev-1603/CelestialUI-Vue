<template>
  <component
    :is="buttonComponent"
    :class="buttonClasses"
    :disabled="isDisabled"
    :type="type"
    :href="href"
    :target="target"
    :download="download"
    :aria-label="computedAriaLabel"
    :aria-describedby="ariaDescribedBy"
    :aria-disabled="isDisabled"
    v-bind="$attrs"
    @click="handleClick"
    @keydown="handleKeydown"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
  >
    <!-- Loading icon with slot support -->
    <span
      v-if="loading"
      :class="iconClasses"
      :data-loading="true"
      aria-hidden="true"
    >
      <slot name="loadingSpinner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="w-full h-full"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
            class="opacity-25"
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            class="opacity-75"
          />
        </svg>
      </slot>
    </span>

    <!-- Left icon with slot support -->
    <span
      v-else-if="leftIcon || $slots.leftIcon"
      :class="iconClasses"
      aria-hidden="true"
    >
      <slot name="leftIcon">
        <CIcon
          v-if="leftIcon || leftIconSvg || leftIconSrc"
          :name="leftIcon"
          :library="iconLibrary"
          :type="iconType"
          :size="computedLeftIconSize"
          :color="computedLeftIconColor"
          :variant="iconVariant"
          :fa-style="iconFaStyle"
          :svg="leftIconSvg"
          :src="leftIconSrc"
          :clickable="leftIconClickable"
          :loading="loading"
          :disabled="isDisabled"
          :aria-label="leftIconAriaLabel"
          :flip-x="leftIconFlipX"
          :flip-y="leftIconFlipY"
          :rotate="leftIconRotate"
          :animation="leftIconAnimation"
          @click="handleLeftIconClick"
          @load="handleLeftIconLoad"
          @error="handleLeftIconError"
        />
      </slot>
    </span>

    <!-- Button text content with children prop support -->
    <span
      v-if="children || $slots.default"
      :class="textClasses"
    >
      <slot>{{ children }}</slot>
    </span>

    <!-- Right icon with slot support -->
    <span
      v-if="(rightIcon || $slots.rightIcon) && !loading"
      :class="iconClasses"
      aria-hidden="true"
    >
      <slot name="rightIcon">
        <CIcon
          v-if="rightIcon || rightIconSvg || rightIconSrc"
          :name="rightIcon"
          :library="iconLibrary"
          :type="iconType"
          :size="computedRightIconSize"
          :color="computedRightIconColor"
          :variant="iconVariant"
          :fa-style="iconFaStyle"
          :svg="rightIconSvg"
          :src="rightIconSrc"
          :clickable="rightIconClickable"
          :loading="false"
          :disabled="isDisabled"
          :aria-label="rightIconAriaLabel"
          :flip-x="rightIconFlipX"
          :flip-y="rightIconFlipY"
          :rotate="rightIconRotate"
          :animation="rightIconAnimation"
          @click="handleRightIconClick"
          @load="handleRightIconLoad"
          @error="handleRightIconError"
        />
      </slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CIcon from '../icon/CIcon.vue'
import type { CButtonProps, CButtonEmits } from './CButton.types'
import { useButton, useButtonStyles } from './composables'

// Import component styles
import './styles/index.css'

defineOptions({
  name: 'CButton',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
  rounded: false,
  iconLibrary: undefined,
  iconType: undefined,
  iconSize: undefined,
  iconColor: undefined,
  iconVariant: undefined,
  iconFaStyle: undefined,
  leftIconClickable: false,
  rightIconClickable: false
})

const emit = defineEmits<CButtonEmits>()

// Composables
const {
  buttonComponent,
  isDisabled,
  handleClick,
  handleKeydown
} = useButton(props, emit)

const {
  buttonClasses,
  iconClasses,
  textClasses
} = useButtonStyles(props)

// Computed properties for icon sizing and color
const computedLeftIconSize = computed(() => {
  return props.iconSize || (() => {
    switch (props.size) {
      case 'xs': return 'sm'
      case 'sm': return 'sm'
      case 'md': return 'md'
      case 'lg': return 'lg'
      case 'xl': return 'xl'
      default: return 'md'
    }
  })()
})

const computedRightIconSize = computed(() => {
  return props.iconSize || (() => {
    switch (props.size) {
      case 'xs': return 'sm'
      case 'sm': return 'sm'
      case 'md': return 'md'
      case 'lg': return 'lg'
      case 'xl': return 'xl'
      default: return 'md'
    }
  })()
})

const computedLeftIconColor = computed(() => {
  return props.iconColor || (() => {
    if (props.disabled) return 'current'
    if (props.variant === 'outline' || props.variant === 'ghost') return 'current'
    return 'inherit'
  })()
})

const computedRightIconColor = computed(() => {
  return props.iconColor || (() => {
    if (props.disabled) return 'current'
    if (props.variant === 'outline' || props.variant === 'ghost') return 'current'
    return 'inherit'
  })()
})

// Computed aria label
const computedAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  if (props.loading) return 'Loading'
  return undefined
})

// Icon event handlers
const handleLeftIconClick = (event: MouseEvent) => {
  emit('leftIconClick', event)
}

const handleLeftIconLoad = (event: Event) => {
  emit('leftIconLoad', event)
}

const handleLeftIconError = (event: Event) => {
  emit('leftIconError', event)
}

const handleRightIconClick = (event: MouseEvent) => {
  emit('rightIconClick', event)
}

const handleRightIconLoad = (event: Event) => {
  emit('rightIconLoad', event)
}

const handleRightIconError = (event: Event) => {
  emit('rightIconError', event)
}
</script>

<style scoped>
/* Component-specific styles are imported above */
/* Any scoped styles can be added here if needed */
</style>
