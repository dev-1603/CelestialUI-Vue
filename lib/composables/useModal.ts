import { ref, reactive, nextTick, type Component } from 'vue'
import type { ModalProps } from '../types'

// Modal state interface
interface ModalState extends ModalProps {
  id: string
  component?: Component
  props?: Record<string, any>
  resolve?: (value: any) => void
  reject?: (reason: any) => void
}

// Global modal state
const modals = ref<ModalState[]>([])
let modalIdCounter = 0

export function useModal() {
  // Generate unique ID
  const generateId = (): string => {
    return `modal-${++modalIdCounter}-${Date.now()}`
  }

  // Open a modal
  const open = (options: Partial<ModalProps> & {
    component?: Component
    props?: Record<string, any>
  }): Promise<any> => {
    return new Promise((resolve, reject) => {
      const id = generateId()

      const modal: ModalState = {
        id,
        modelValue: true,
        persistent: false,
        fullscreen: false,
        scrollable: false,
        closeOnEscape: true,
        closeOnClickOutside: true,
        maxWidth: '500px',
        ...options,
        resolve,
        reject
      }

      modals.value.push(modal)
    })
  }

  // Close a specific modal
  const close = (id: string, result?: any): void => {
    const modal = modals.value.find(m => m.id === id)
    if (modal) {
      modal.modelValue = false

      if (modal.resolve) {
        modal.resolve(result)
      }

      // Remove from array after transition
      setTimeout(() => {
        const index = modals.value.findIndex(m => m.id === id)
        if (index > -1) {
          modals.value.splice(index, 1)
        }
      }, 300)
    }
  }

  // Close the topmost modal
  const closeTop = (result?: any): void => {
    if (modals.value.length > 0) {
      const topModal = modals.value[modals.value.length - 1]
      close(topModal.id, result)
    }
  }

  // Close all modals
  const closeAll = (): void => {
    modals.value.forEach(modal => {
      modal.modelValue = false
      if (modal.reject) {
        modal.reject('Modal closed')
      }
    })

    setTimeout(() => {
      modals.value.splice(0)
    }, 300)
  }

  // Update modal properties
  const update = (id: string, options: Partial<ModalProps>): void => {
    const modal = modals.value.find(m => m.id === id)
    if (modal) {
      Object.assign(modal, options)
    }
  }

  // Confirmation dialog
  const confirm = (options: {
    title?: string
    message: string
    confirmText?: string
    cancelText?: string
    type?: 'info' | 'warning' | 'error' | 'success'
    persistent?: boolean
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      const id = generateId()

      const modal: ModalState = {
        id,
        modelValue: true,
        title: options.title || 'Confirm',
        persistent: options.persistent || false,
        maxWidth: '400px',
        resolve: (result: boolean) => resolve(result),
        reject: () => resolve(false)
      }

      modals.value.push(modal)
    })
  }

  // Alert dialog
  const alert = (options: {
    title?: string
    message: string
    buttonText?: string
    type?: 'info' | 'warning' | 'error' | 'success'
  }): Promise<void> => {
    return new Promise((resolve) => {
      const id = generateId()

      const modal: ModalState = {
        id,
        modelValue: true,
        title: options.title || 'Alert',
        maxWidth: '400px',
        resolve,
        reject: resolve
      }

      modals.value.push(modal)
    })
  }

  // Prompt dialog
  const prompt = (options: {
    title?: string
    message: string
    placeholder?: string
    defaultValue?: string
    confirmText?: string
    cancelText?: string
    required?: boolean
  }): Promise<string | null> => {
    return new Promise((resolve) => {
      const id = generateId()

      const modal: ModalState = {
        id,
        modelValue: true,
        title: options.title || 'Input Required',
        maxWidth: '400px',
        resolve: (result: string | null) => resolve(result),
        reject: () => resolve(null)
      }

      modals.value.push(modal)
    })
  }

  // Get current modals
  const getCurrentModals = () => {
    return modals.value.filter(modal => modal.modelValue)
  }

  // Check if any modal is open
  const hasOpenModals = () => {
    return modals.value.some(modal => modal.modelValue)
  }

  // Get z-index for modal stacking
  const getZIndex = (id: string): number => {
    const index = modals.value.findIndex(m => m.id === id)
    return 1000 + index * 10
  }

  return {
    // State
    modals: modals.value,

    // Methods
    open,
    close,
    closeTop,
    closeAll,
    update,
    confirm,
    alert,
    prompt,
    getCurrentModals,
    hasOpenModals,
    getZIndex
  }
}

// Modal manager for handling multiple modals
export function useModalManager() {
  const { modals, close, getZIndex } = useModal()

  // Handle escape key for closing modals
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      const openModals = modals.filter(m => m.modelValue && m.closeOnEscape)
      if (openModals.length > 0) {
        const topModal = openModals[openModals.length - 1]
        close(topModal.id)
      }
    }
  }

  // Setup global event listeners
  const setupGlobalListeners = () => {
    document.addEventListener('keydown', handleEscapeKey)
  }

  // Cleanup global event listeners
  const cleanupGlobalListeners = () => {
    document.removeEventListener('keydown', handleEscapeKey)
  }

  return {
    modals,
    getZIndex,
    setupGlobalListeners,
    cleanupGlobalListeners
  }
}
