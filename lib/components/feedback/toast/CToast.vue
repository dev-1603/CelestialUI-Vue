<template>
  <Transition
    name="cui-toast"
    @enter="onEnter"
    @leave="onLeave"
  >
    <div
      v-if="visible"
      :class="toastClasses"
      :style="toastStyles"
      role="alert"
      :aria-live="type === 'error' ? 'assertive' : 'polite'"
    >
      <!-- Icon -->
      <div v-if="showIcon" class="cui-toast__icon">
        <CIcon :name="iconName" />
      </div>

      <!-- Content -->
      <div class="cui-toast__content">
        <div v-if="title" class="cui-toast__title">{{ title }}</div>
        <div class="cui-toast__message">{{ message }}</div>
      </div>

      <!-- Action -->
      <div v-if="action" class="cui-toast__action">
        <button
          type="button"
          class="cui-toast__action-button"
          @click="handleAction"
        >
          {{ action.label }}
        </button>
      </div>

      <!-- Close Button -->
      <button
        v-if="closable"
        type="button"
        class="cui-toast__close"
        @click="close"
        :aria-label="'Close notification'"
      >
        <CIcon name="times" />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ToastOptions } from '../../../types'
import { useComponentTheme } from '../../../composables/useTheme'
import CIcon from '../../ui/icon/CIcon.vue'

interface Props extends ToastOptions {
  visible?: boolean
  closable?: boolean
  showIcon?: boolean
  autoClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 5000,
  persistent: false,
  visible: true,
  closable: true,
  showIcon: true,
  autoClose: true,
  position: 'top-right'
})

const emit = defineEmits<{
  close: []
  action: []
}>()

const { componentClasses, componentStyles } = useComponentTheme('toast', props)

// State
const visible = ref(props.visible)
let autoCloseTimer: NodeJS.Timeout | null = null

// Computed
const toastClasses = computed(() => {
  const classes = [...componentClasses.value]

  classes.push(`cui-toast--${props.type}`)

  if (props.title) classes.push('cui-toast--with-title')
  if (props.action) classes.push('cui-toast--with-action')
  if (props.closable) classes.push('cui-toast--closable')

  return classes
})

const toastStyles = computed(() => {
  return {
    ...componentStyles.value,
    ...(props.style || {})
  }
})

const iconName = computed(() => {
  const icons = {
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle'
  }
  return icons[props.type] || icons.info
})

// Methods
const close = () => {
  visible.value = false
  clearAutoCloseTimer()
  emit('close')
}

const handleAction = () => {
  if (props.action?.handler) {
    props.action.handler()
  }
  emit('action')
  if (!props.persistent) {
    close()
  }
}

const startAutoCloseTimer = () => {
  if (props.autoClose && !props.persistent && props.duration > 0) {
    autoCloseTimer = setTimeout(() => {
      close()
    }, props.duration)
  }
}

const clearAutoCloseTimer = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
}

const pauseAutoClose = () => {
  clearAutoCloseTimer()
}

const resumeAutoClose = () => {
  startAutoCloseTimer()
}

// Transition handlers
const onEnter = () => {
  startAutoCloseTimer()
}

const onLeave = () => {
  clearAutoCloseTimer()
}

// Lifecycle
onMounted(() => {
  if (visible.value) {
    startAutoCloseTimer()
  }
})

onUnmounted(() => {
  clearAutoCloseTimer()
})

// Expose methods
defineExpose({
  close,
  pauseAutoClose,
  resumeAutoClose
})
</script>

<style lang="scss" scoped>
.cui-toast {
  display: flex;
  align-items: flex-start;
  gap: var(--cui-spacing-3);
  padding: var(--cui-spacing-4);
  background-color: var(--cui-color-surface-primary);
  border: 1px solid var(--cui-color-border-primary);
  border-radius: var(--cui-radius-lg);
  box-shadow: var(--cui-shadow-lg);
  min-width: 300px;
  max-width: 500px;
  position: relative;

  // Type variants
  &--success {
    border-left: 4px solid var(--cui-color-success-500);

    .cui-toast__icon {
      color: var(--cui-color-success-500);
    }
  }

  &--error {
    border-left: 4px solid var(--cui-color-error-500);

    .cui-toast__icon {
      color: var(--cui-color-error-500);
    }
  }

  &--warning {
    border-left: 4px solid var(--cui-color-warning-500);

    .cui-toast__icon {
      color: var(--cui-color-warning-500);
    }
  }

  &--info {
    border-left: 4px solid var(--cui-color-primary-500);

    .cui-toast__icon {
      color: var(--cui-color-primary-500);
    }
  }
}

.cui-toast__icon {
  flex-shrink: 0;
  font-size: var(--cui-fontSize-lg);
  margin-top: var(--cui-spacing-1);
}

.cui-toast__content {
  flex: 1;
  min-width: 0;
}

.cui-toast__title {
  font-weight: var(--cui-fontWeight-semibold);
  color: var(--cui-color-text-primary);
  margin-bottom: var(--cui-spacing-1);
  line-height: var(--cui-lineHeight-tight);
}

.cui-toast__message {
  color: var(--cui-color-text-secondary);
  font-size: var(--cui-fontSize-sm);
  line-height: var(--cui-lineHeight-normal);
  word-wrap: break-word;
}

.cui-toast__action {
  flex-shrink: 0;
}

.cui-toast__action-button {
  background: none;
  border: 1px solid var(--cui-color-primary-500);
  color: var(--cui-color-primary-500);
  padding: var(--cui-spacing-1) var(--cui-spacing-3);
  border-radius: var(--cui-radius-base);
  font-size: var(--cui-fontSize-sm);
  font-weight: var(--cui-fontWeight-medium);
  cursor: pointer;
  transition: var(--cui-transition-fast);

  &:hover {
    background-color: var(--cui-color-primary-50);
    border-color: var(--cui-color-primary-600);
    color: var(--cui-color-primary-600);
  }

  &:focus-visible {
    outline: 2px solid var(--cui-color-primary-500);
    outline-offset: 2px;
  }
}

.cui-toast__close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: var(--cui-color-text-tertiary);
  cursor: pointer;
  padding: var(--cui-spacing-1);
  border-radius: var(--cui-radius-sm);
  transition: var(--cui-transition-fast);
  margin: calc(var(--cui-spacing-1) * -1) calc(var(--cui-spacing-1) * -1) calc(var(--cui-spacing-1) * -1) 0;

  &:hover {
    background-color: var(--cui-color-neutral-100);
    color: var(--cui-color-text-secondary);
  }

  &:focus-visible {
    outline: 2px solid var(--cui-color-primary-500);
    outline-offset: 2px;
  }
}

// Layout adjustments
.cui-toast--with-title {
  .cui-toast__message {
    margin-top: var(--cui-spacing-1);
  }
}

.cui-toast--with-action {
  align-items: center;

  .cui-toast__content {
    padding-right: var(--cui-spacing-2);
  }
}

.cui-toast--closable {
  padding-right: var(--cui-spacing-3);
}

// Transitions
.cui-toast-enter-active {
  transition: all 0.3s ease-out;
}

.cui-toast-leave-active {
  transition: all 0.2s ease-in;
}

.cui-toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.cui-toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

// Position-specific transitions
.cui-toast-enter-from {
  &[data-position*="left"] {
    transform: translateX(-100%);
  }

  &[data-position*="top"] {
    transform: translateY(-100%);
  }

  &[data-position*="bottom"] {
    transform: translateY(100%);
  }
}

.cui-toast-leave-to {
  &[data-position*="left"] {
    transform: translateX(-100%);
  }

  &[data-position*="top"] {
    transform: translateY(-100%);
  }

  &[data-position*="bottom"] {
    transform: translateY(100%);
  }
}

// Responsive
@media (max-width: 640px) {
  .cui-toast {
    min-width: auto;
    max-width: calc(100vw - var(--cui-spacing-8));
    margin: 0 var(--cui-spacing-4);
  }

  .cui-toast--with-action {
    flex-direction: column;
    align-items: stretch;

    .cui-toast__action {
      margin-top: var(--cui-spacing-3);
      align-self: flex-end;
    }

    .cui-toast__content {
      padding-right: 0;
    }
  }
}
</style>
