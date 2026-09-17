<template>
  <Teleport to="body">
    <Transition name="cui-dialog-fade">
      <div 
        v-if="modelValue" 
        :class="wrapperClasses"
        @click="onOutsideClick"
      >
        <div 
          ref="dialogRef"
          :class="dialogClasses"
          :role="role"
          aria-modal="true"
          :aria-labelledby="title ? 'cui-dialog-title' : undefined"
          :aria-describedby="description ? 'cui-dialog-description' : undefined"
          tabindex="-1"
        >
          <!-- Header -->
          <div v-if="title || $slots.header || closable" class="cui-dialog-header">
            <slot name="header">
              <h2 v-if="title" id="cui-dialog-title" class="cui-dialog-title">{{ title }}</h2>
            </slot>
            <button 
              v-if="closable" 
              class="cui-dialog-close" 
              aria-label="Close dialog" 
              @click="close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="cui-dialog-body">
            <p v-if="description" id="cui-dialog-description" class="cui-dialog-description">{{ description }}</p>
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="cui-dialog-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useDialog } from './composables/useDialog'
import { useDialogStyles } from './composables/useDialogStyles'
import type { CDialogProps, CDialogEmits } from './CDialog.types'
import './styles/CDialog.css'

defineOptions({ name: 'CDialog' })

const props = withDefaults(defineProps<CDialogProps>(), {
  modelValue: false,
  closable: true,
  closeOnOutsideClick: true,
  closeOnEsc: true,
  size: 'md',
  role: 'dialog'
})

const emit = defineEmits<CDialogEmits>()

const { dialogRef, close, onOutsideClick } = useDialog(props, emit)
const { wrapperClasses, dialogClasses } = useDialogStyles(props)
</script>
