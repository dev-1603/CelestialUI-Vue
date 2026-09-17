import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { CDropdownMenuProps, CDropdownMenuEmits, CDropdownItem } from '../CDropdownMenu.types'

export function useDropdownMenu(props: CDropdownMenuProps, emit: CDropdownMenuEmits) {
  const isOpen = ref(false)
  const menuRef = ref<HTMLElement | null>(null)
  const triggerRef = ref<HTMLElement | null>(null)

  const toggle = () => {
    if (props.disabled) return
    isOpen.value = !isOpen.value
    if (isOpen.value) {
      emit('open')
    } else {
      emit('close')
    }
  }

  const open = () => {
    if (props.disabled || isOpen.value) return
    isOpen.value = true
    emit('open')
  }

  const close = () => {
    if (!isOpen.value) return
    isOpen.value = false
    emit('close')
  }

  const select = (item: CDropdownItem) => {
    if (item.disabled || item.divider) return
    emit('select', item)
    close()
  }

  const onOutsideClick = (e: MouseEvent) => {
    if (!isOpen.value) return
    const target = e.target as HTMLElement
    if (
      menuRef.value && !menuRef.value.contains(target) &&
      triggerRef.value && !triggerRef.value.contains(target)
    ) {
      close()
    }
  }

  const onEsc = (e: KeyboardEvent) => {
    if (isOpen.value && e.key === 'Escape') {
      close()
      triggerRef.value?.focus()
    }
  }

  onMounted(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', onOutsideClick)
      document.addEventListener('keydown', onEsc)
    }
  })

  onBeforeUnmount(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', onOutsideClick)
      document.removeEventListener('keydown', onEsc)
    }
  })

  return {
    isOpen,
    menuRef,
    triggerRef,
    toggle,
    open,
    close,
    select
  }
}
