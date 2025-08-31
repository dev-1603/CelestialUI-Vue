// Toast composable
import { ref } from 'vue'

export function useToast() {
  const toasts = ref<any[]>([])

  const addToast = (toast: any) => {
    toasts.value.push(toast)
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message: string, options?: any) => {
    addToast({
      id: Date.now().toString(),
      type: 'success',
      message,
      ...options
    })
  }

  const error = (message: string, options?: any) => {
    addToast({
      id: Date.now().toString(),
      type: 'error',
      message,
      ...options
    })
  }

  const warning = (message: string, options?: any) => {
    addToast({
      id: Date.now().toString(),
      type: 'warning',
      message,
      ...options
    })
  }

  const info = (message: string, options?: any) => {
    addToast({
      id: Date.now().toString(),
      type: 'info',
      message,
      ...options
    })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
}








