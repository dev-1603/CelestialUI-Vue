<template>
  <Transition
    :name="animationName"
    @enter="handleEnter"
    @leave="handleLeave"
  >
    <div
      v-if="isVisible"
      :class="alertClasses"
      :style="computedStyle"
      :role="alertRole"
      :aria-live="ariaLive"
      :aria-label="computedAriaLabel"
      :aria-describedby="ariaDescribedBy"
      :aria-atomic="true"
      tabindex="-1"
      v-bind="$attrs"
      @click="handleClick"
      @keydown="handleKeydown"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @mouseenter="$emit('mouseenter', $event)"
      @mouseleave="$emit('mouseleave', $event)"
    >
      <!-- Progress bar for auto-dismiss -->
      <div
        :class="progressClasses"
        :style="{ '--progress-width': `${progressValue}%` }"
        role="progressbar"
        :aria-valuenow="progressValue"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-label="`Auto-dismiss progress: ${Math.round(progressValue)}%`"
      />

      <!-- Icon slot with default icons -->
      <div
        :class="iconClasses"
        aria-hidden="true"
      >
        <slot name="icon">
          <!-- Default icons based on type -->
          <svg
            v-if="!customIcon"
            :class="defaultIconClasses"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Info icon -->
            <path
              v-if="type === 'info'"
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
            <!-- Success icon -->
            <path
              v-else-if="type === 'success'"
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
            <!-- Warning icon -->
            <path
              v-else-if="type === 'warning'"
              fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
            <!-- Error icon -->
            <path
              v-else-if="type === 'error'"
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <!-- Custom icon if provided -->
          <CIcon
            v-else
            :name="icon"
            :size="iconSize"
            :color="iconColor"
            :aria-hidden="true"
          />
        </slot>
      </div>

      <!-- Content area -->
      <div :class="contentClasses">
        <!-- Title slot with fallback to title prop -->
        <div
          v-if="title || $slots.title"
          :class="titleClasses"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <!-- Main content slot -->
        <div class="celestial-alert__message">
          <slot>{{ children }}</slot>
        </div>
      </div>

      <!-- Action slot -->
      <div
        v-if="$slots.action"
        class="celestial-alert__action"
      >
        <slot name="action" />
      </div>

      <!-- Close button -->
      <button
        :class="closeClasses"
        type="button"
        :aria-label="closeAriaLabel"
        :disabled="isLoading"
        @click="handleClose"
      >
        <slot name="close">
          <svg
            class="celestial-alert__close-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </slot>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import CIcon from '../icon/CIcon.vue'
import type { CAlertProps, CAlertEmits } from './CAlert.types'
import { useAlert, useAlertStyles } from './composables'

// Import component styles
import './styles/index.css'

defineOptions({
  name: 'CAlert',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CAlertProps>(), {
  type: 'info',
  size: 'md',
  closable: false,
  visible: undefined,
  dismissible: true,
  autoDismiss: 0,
  showProgress: false,
  showIcon: true,
  bordered: false,
  shadowed: false,
  ariaLive: 'assertive',
  loading: false,
  animation: 'fade'
})

const emit = defineEmits<CAlertEmits>()

// Composables
const {
  isVisible,
  isLoading,
  canDismiss,
  alertClasses,
  iconClasses,
  contentClasses,
  closeClasses,
  progressClasses,
  handleClose,
  handleKeydown,
  handleClick,
  startAutoDismiss,
  cancelAutoDismiss,
  show,
  hide,
  toggle
} = useAlert(props, emit)

const {
  alertClasses: styleClasses,
  iconClasses: styleIconClasses,
  contentClasses: styleContentClasses,
  titleClasses,
  closeClasses: styleCloseClasses,
  progressClasses: styleProgressClasses
} = useAlertStyles(props)

// Merge composable classes with style classes
const finalAlertClasses = computed(() => [...alertClasses.value, ...styleClasses.value])
const finalIconClasses = computed(() => [...iconClasses.value, ...styleIconClasses.value])
const finalContentClasses = computed(() => [...contentClasses.value, ...styleContentClasses.value])
const finalCloseClasses = computed(() => [...closeClasses.value, ...styleCloseClasses.value])
const finalProgressClasses = computed(() => [...progressClasses.value, ...styleProgressClasses.value])

// Animation name for transitions
const animationName = computed(() => {
  if (props.animation === 'none') return ''
  return `celestial-alert-${props.animation}`
})

// Computed style object
const computedStyle = computed(() => {
  const style: Record<string, any> = {}

  if (props.style) {
    if (typeof props.style === 'string') {
      // Parse CSS string (basic implementation)
      props.style.split(';').forEach(rule => {
        const [property, value] = rule.split(':').map(s => s.trim())
        if (property && value) {
          style[property] = value
        }
      })
    } else {
      Object.assign(style, props.style)
    }
  }

  return style
})

// ARIA attributes
const alertRole = computed(() => {
  // Use 'alert' for assertive messages, 'status' for polite messages
  return props.ariaLive === 'assertive' ? 'alert' : 'status'
})

const computedAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel

  // Generate default aria-label based on type and title
  const typeLabels = {
    info: 'Information',
    success: 'Success',
    warning: 'Warning',
    error: 'Error'
  }

  const typeLabel = typeLabels[props.type || 'info']
  return props.title ? `${typeLabel}: ${props.title}` : typeLabel
})

const closeAriaLabel = computed(() => {
  return `Close ${computedAriaLabel.value.toLowerCase()}`
})

// Icon configuration
const customIcon = computed(() => Boolean(props.icon))
const iconSize = computed(() => {
  switch (props.size) {
    case 'sm': return 'sm'
    case 'md': return 'md'
    case 'lg': return 'lg'
    default: return 'md'
  }
})
const iconColor = computed(() => 'current')

// Default icon classes
const defaultIconClasses = computed(() => {
  const classes = ['celestial-alert__default-icon']
  if (props.size) {
    classes.push(`celestial-alert__default-icon--${props.size}`)
  }
  return classes
})

// Progress value for auto-dismiss
const progressValue = ref(0)

// Watch for auto-dismiss changes
watch(() => props.autoDismiss, (newValue) => {
  if (newValue && newValue > 0 && isVisible.value) {
    startAutoDismiss()
  } else {
    cancelAutoDismiss()
  }
}, { immediate: true })

// Watch for visibility changes
watch(() => props.visible, (newValue) => {
  if (newValue === true) {
    show()
  } else if (newValue === false) {
    hide()
  }
})

// Transition handlers
const handleEnter = (el: Element) => {
  nextTick(() => {
    emit('show')
  })
}

const handleLeave = (el: Element) => {
  nextTick(() => {
    emit('hide')
  })
}

// Expose methods for parent components
defineExpose({
  show,
  hide,
  toggle,
  startAutoDismiss,
  cancelAutoDismiss
})
</script>

<style scoped>
/* Component-specific styles are imported above */
/* Any additional scoped styles can be added here if needed */

.celestial-alert__default-icon {
  width: 100%;
  height: 100%;
}

.celestial-alert__default-icon--sm {
  width: 1rem;
  height: 1rem;
}

.celestial-alert__default-icon--md {
  width: 1.25rem;
  height: 1.25rem;
}

.celestial-alert__default-icon--lg {
  width: 1.5rem;
  height: 1.5rem;
}

.celestial-alert__close-icon {
  width: 100%;
  height: 100%;
}

.celestial-alert__message {
  line-height: 1.5;
}

/* Transition styles */
.celestial-alert-fade-enter-active,
.celestial-alert-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.celestial-alert-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.celestial-alert-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.celestial-alert-slide-enter-active,
.celestial-alert-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.celestial-alert-slide-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.celestial-alert-slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.celestial-alert-scale-enter-active,
.celestial-alert-scale-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.celestial-alert-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.celestial-alert-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
