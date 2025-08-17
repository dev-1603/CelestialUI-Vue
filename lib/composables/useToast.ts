import { ref, reactive, nextTick } from 'vue'
import type { ToastOptions } from '../types'

// Global toast state
const toasts = ref<(ToastOptions & { id: string; visible: boolean })[]>([])
let toastIdCounter = 0

export function useToast() {
  // Generate unique ID
  const generateId = (): string => {
    return `toast-${++toastIdCounter}-${Date.now()}`
  }

  // Add a toast
  const show = (options: ToastOptions | string): string => {
    const toastOptions: ToastOptions = typeof options === 'string'
      ? { message: options }
      : options

    const id = toastOptions.id || generateId()

    const toast = {
      id,
      type: 'info' as const,
      duration: 5000,
      persistent: false,
      position: 'top-right' as const,
      visible: true,
      ...toastOptions
    }

    // Remove existing toast with same ID
    const existingIndex = toasts.value.findIndex(t => t.id === id)
    if (existingIndex > -1) {
      toasts.value.splice(existingIndex, 1)
    }

    toasts.value.push(toast)

    // Auto remove if not persistent
    if (!toast.persistent && toast.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration)
    }

    return id
  }

  // Convenience methods for different types
  const success = (options: ToastOptions | string): string => {
    const toastOptions: ToastOptions = typeof options === 'string'
      ? { message: options, type: 'success' }
      : { ...options, type: 'success' }

    return show(toastOptions)
  }

  const error = (options: ToastOptions | string): string => {
    const toastOptions: ToastOptions = typeof options === 'string'
      ? { message: options, type: 'error' }
      : { ...options, type: 'error' }

    return show(toastOptions)
  }

  const warning = (options: ToastOptions | string): string => {
    const toastOptions: ToastOptions = typeof options === 'string'
      ? { message: options, type: 'warning' }
      : { ...options, type: 'warning' }

    return show(toastOptions)
  }

  const info = (options: ToastOptions | string): string => {
    const toastOptions: ToastOptions = typeof options === 'string'
      ? { message: options, type: 'info' }
      : { ...options, type: 'info' }

    return show(toastOptions)
  }

  // Remove a specific toast
  const remove = (id: string): void => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value[index].visible = false
      // Remove from array after transition
      setTimeout(() => {
        const currentIndex = toasts.value.findIndex(toast => toast.id === id)
        if (currentIndex > -1) {
          toasts.value.splice(currentIndex, 1)
        }
      }, 300)
    }
  }

  // Remove all toasts
  const clear = (): void => {
    toasts.value.forEach(toast => {
      toast.visible = false
    })

    setTimeout(() => {
      toasts.value.splice(0)
    }, 300)
  }

  // Update a toast
  const update = (id: string, options: Partial<ToastOptions>): void => {
    const toast = toasts.value.find(t => t.id === id)
    if (toast) {
      Object.assign(toast, options)
    }
  }

  // Get toasts by position
  const getToastsByPosition = (position: ToastOptions['position'] = 'top-right') => {
    return toasts.value.filter(toast => toast.position === position)
  }

  // Pause auto-close for all toasts
  const pauseAll = (): void => {
    // Implementation would depend on individual toast components
    // This is a placeholder for the interface
  }

  // Resume auto-close for all toasts
  const resumeAll = (): void => {
    // Implementation would depend on individual toast components
    // This is a placeholder for the interface
  }

  return {
    // State
    toasts: toasts.value,

    // Methods
    show,
    success,
    error,
    warning,
    info,
    remove,
    clear,
    update,
    getToastsByPosition,
    pauseAll,
    resumeAll
  }
}

// Toast container component helper
export function useToastContainer() {
  const { toasts, remove } = useToast()

  const positions = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right'
  ] as const

  const getPositionClasses = (position: ToastOptions['position']) => {
    const classes = ['cui-toast-container']

    switch (position) {
      case 'top-left':
        classes.push('cui-toast-container--top-left')
        break
      case 'top-center':
        classes.push('cui-toast-container--top-center')
        break
      case 'top-right':
        classes.push('cui-toast-container--top-right')
        break
      case 'bottom-left':
        classes.push('cui-toast-container--bottom-left')
        break
      case 'bottom-center':
        classes.push('cui-toast-container--bottom-center')
        break
      case 'bottom-right':
        classes.push('cui-toast-container--bottom-right')
        break
      default:
        classes.push('cui-toast-container--top-right')
    }

    return classes
  }

  const getToastsByPosition = (position: ToastOptions['position']) => {
    return toasts.filter(toast => toast.position === position)
  }

  return {
    positions,
    toasts,
    getPositionClasses,
    getToastsByPosition,
    remove
  }
}
