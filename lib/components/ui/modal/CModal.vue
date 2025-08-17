<template>
  <Teleport to="body">
    <Transition name="cui-modal" appear>
      <div
        v-if="isOpen"
        class="cui-modal-overlay"
        :class="overlayClasses"
        @click="handleOverlayClick"
        @keydown.esc="handleEscKey"
        tabindex="-1"
      >
        <div
          ref="modalRef"
          class="cui-modal"
          :class="modalClasses"
          :style="modalStyles"
          role="dialog"
          :aria-modal="true"
          :aria-labelledby="title ? 'cui-modal-title' : undefined"
          @click.stop
        >
          <!-- Header -->
          <div v-if="$slots.header || title || closable" class="cui-modal__header">
            <slot name="header">
              <h2 v-if="title" id="cui-modal-title" class="cui-modal__title">
                {{ title }}
              </h2>
            </slot>

            <button
              v-if="closable"
              type="button"
              class="cui-modal__close"
              @click="close"
              :aria-label="'Close ' + (title || 'modal')"
            >
              <CIcon name="times" />
            </button>
          </div>

          <!-- Content -->
          <div class="cui-modal__content" :class="{ 'cui-modal__content--scrollable': scrollable }">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="cui-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import type { ModalProps } from '../../../types'
import { useComponentTheme } from '../../../composables/useTheme'
import CIcon from '../icon/CIcon.vue'

interface Props extends ModalProps {
  closable?: boolean
  overlayClass?: string
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  persistent: false,
  fullscreen: false,
  scrollable: false,
  closeOnEscape: true,
  closeOnClickOutside: true,
  closable: true,
  maxWidth: '500px',
  zIndex: 1000
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
  'before-open': []
  'after-open': []
  'before-close': []
  'after-close': []
}>()

const { componentClasses, componentStyles } = useComponentTheme('modal', props)

// Refs
const modalRef = ref<HTMLElement>()
const previousActiveElement = ref<Element | null>(null)

// State
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Classes
const overlayClasses = computed(() => {
  const classes = ['cui-modal-overlay']

  if (props.fullscreen) classes.push('cui-modal-overlay--fullscreen')
  if (props.overlayClass) classes.push(props.overlayClass)

  return classes
})

const modalClasses = computed(() => {
  const classes = [...componentClasses.value]

  if (props.size) classes.push(`cui-modal--${props.size}`)
  if (props.fullscreen) classes.push('cui-modal--fullscreen')
  if (props.scrollable) classes.push('cui-modal--scrollable')

  return classes
})

const modalStyles = computed(() => {
  const styles = { ...componentStyles.value }

  if (!props.fullscreen && props.maxWidth) {
    styles.maxWidth = props.maxWidth
  }

  if (props.zIndex) {
    styles.zIndex = props.zIndex.toString()
  }

  return styles
})

// Methods
const open = () => {
  if (isOpen.value) return

  emit('before-open')
  previousActiveElement.value = document.activeElement
  isOpen.value = true

  nextTick(() => {
    // Focus the modal
    modalRef.value?.focus()
    emit('after-open')
  })
}

const close = () => {
  if (!isOpen.value) return

  emit('before-close')
  isOpen.value = false

  // Restore focus
  if (previousActiveElement.value && 'focus' in previousActiveElement.value) {
    (previousActiveElement.value as HTMLElement).focus()
  }

  emit('after-close')
}

const handleOverlayClick = () => {
  if (props.closeOnClickOutside && !props.persistent) {
    close()
  }
}

const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape && !props.persistent) {
    close()
  }
}

// Focus trap
const focusableElements = computed(() => {
  if (!modalRef.value) return []

  const selector = [
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ')

  return Array.from(modalRef.value.querySelectorAll(selector)) as HTMLElement[]
})

const trapFocus = (event: KeyboardEvent) => {
  if (event.key !== 'Tab' || !isOpen.value) return

  const elements = focusableElements.value
  if (elements.length === 0) return

  const firstElement = elements[0]
  const lastElement = elements[elements.length - 1]

  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    }
  } else {
    if (document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }
}

// Body scroll lock
const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
}

// Watchers
watch(isOpen, (newValue) => {
  if (newValue) {
    lockBodyScroll()
    document.addEventListener('keydown', trapFocus)
    emit('open')
  } else {
    unlockBodyScroll()
    document.removeEventListener('keydown', trapFocus)
    emit('close')
  }
})

// Lifecycle
onMounted(() => {
  if (isOpen.value) {
    lockBodyScroll()
    document.addEventListener('keydown', trapFocus)
  }
})

onUnmounted(() => {
  unlockBodyScroll()
  document.removeEventListener('keydown', trapFocus)
})

// Expose methods
defineExpose({
  open,
  close,
  modalRef
})
</script>

<style lang="scss" scoped>
.cui-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--cui-spacing-4);
  z-index: 1000;

  &--fullscreen {
    padding: 0;
  }
}

.cui-modal {
  position: relative;
  background-color: var(--cui-color-surface-primary);
  border-radius: var(--cui-radius-lg);
  box-shadow: var(--cui-shadow-2xl);
  max-height: 90vh;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  outline: none;

  &--fullscreen {
    width: 100vw;
    height: 100vh;
    max-width: none;
    max-height: none;
    border-radius: 0;
  }

  &--scrollable {
    max-height: 90vh;

    .cui-modal__content {
      overflow-y: auto;
    }
  }
}

// Size variants
.cui-modal--xs {
  max-width: 300px;
}

.cui-modal--sm {
  max-width: 400px;
}

.cui-modal--md {
  max-width: 500px;
}

.cui-modal--lg {
  max-width: 700px;
}

.cui-modal--xl {
  max-width: 900px;
}

.cui-modal--2xl {
  max-width: 1200px;
}

// Header
.cui-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--cui-spacing-6) var(--cui-spacing-6) var(--cui-spacing-4);
  border-bottom: 1px solid var(--cui-color-border-primary);
}

.cui-modal__title {
  margin: 0;
  font-size: var(--cui-fontSize-lg);
  font-weight: var(--cui-fontWeight-semibold);
  color: var(--cui-color-text-primary);
  line-height: var(--cui-lineHeight-tight);
}

.cui-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--cui-spacing-8);
  height: var(--cui-spacing-8);
  background: none;
  border: none;
  border-radius: var(--cui-radius-base);
  color: var(--cui-color-text-secondary);
  cursor: pointer;
  transition: var(--cui-transition-fast);

  &:hover {
    background-color: var(--cui-color-neutral-100);
    color: var(--cui-color-text-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--cui-color-primary-500);
    outline-offset: 2px;
  }
}

// Content
.cui-modal__content {
  flex: 1;
  padding: var(--cui-spacing-6);

  &--scrollable {
    overflow-y: auto;
  }
}

// Footer
.cui-modal__footer {
  padding: var(--cui-spacing-4) var(--cui-spacing-6) var(--cui-spacing-6);
  border-top: 1px solid var(--cui-color-border-primary);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--cui-spacing-3);
}

// Transitions
.cui-modal-enter-active,
.cui-modal-leave-active {
  transition: opacity 0.2s ease;

  .cui-modal {
    transition: transform 0.2s ease, opacity 0.2s ease;
  }
}

.cui-modal-enter-from,
.cui-modal-leave-to {
  opacity: 0;

  .cui-modal {
    transform: scale(0.95);
    opacity: 0;
  }
}

// Responsive adjustments
@media (max-width: 640px) {
  .cui-modal-overlay {
    padding: var(--cui-spacing-2);
  }

  .cui-modal {
    max-height: 95vh;

    &:not(.cui-modal--fullscreen) {
      max-width: none;
      width: 100%;
    }
  }

  .cui-modal__header {
    padding: var(--cui-spacing-4) var(--cui-spacing-4) var(--cui-spacing-3);
  }

  .cui-modal__content {
    padding: var(--cui-spacing-4);
  }

  .cui-modal__footer {
    padding: var(--cui-spacing-3) var(--cui-spacing-4) var(--cui-spacing-4);
    flex-direction: column-reverse;

    > * {
      width: 100%;
    }
  }
}
</style>
