import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import type { CDialogProps, CDialogEmits } from '../CDialog.types'

export function useDialog(props: CDialogProps, emit: CDialogEmits) {
  const dialogRef = ref<HTMLElement | null>(null)
  
  const close = () => {
    emit('update:modelValue', false)
    emit('close')
  }

  const open = () => {
    emit('update:modelValue', true)
    emit('open')
  }

  const onEsc = (e: KeyboardEvent) => {
    if (props.modelValue && props.closeOnEsc && e.key === 'Escape') {
      close()
    }
  }

  const onOutsideClick = (e: MouseEvent) => {
    if (props.modelValue && props.closeOnOutsideClick && dialogRef.value) {
      const target = e.target as HTMLElement
      // If click is on the backdrop, not inside the dialog content
      if (!dialogRef.value.contains(target)) {
        close()
      }
    }
  }

  // Handle body scroll locking
  watch(() => props.modelValue, (isOpen) => {
    if (typeof document !== 'undefined') {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  })

  onMounted(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', onEsc)
    }
  })

  onBeforeUnmount(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  })

  return {
    dialogRef,
    close,
    open,
    onOutsideClick
  }
}
