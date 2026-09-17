import { computed } from 'vue'
import type { CQrSessionCanvasProps, CQrSessionCanvasEmits } from '../CQrSessionCanvas.types'

export function useQrSessionCanvas(props: CQrSessionCanvasProps, emit: CQrSessionCanvasEmits) {
  const isQrVisible = computed(() => {
    return props.status === 'active' || props.status === 'scanned'
  })

  const statusMessage = computed(() => {
    switch (props.status) {
      case 'loading': return 'Generating QR code...'
      case 'active': return 'Scan this code with your mobile device'
      case 'scanned': return 'Code scanned! Please confirm on your device.'
      case 'expired': return 'This QR code has expired.'
      case 'error': return props.error || 'An error occurred. Please try again.'
      default: return ''
    }
  })

  const overlayIcon = computed(() => {
    if (props.status === 'scanned') return 'check-circle'
    if (props.status === 'expired') return 'lock'
    if (props.status === 'error') return 'alert-circle'
    return undefined
  })

  const handleRefresh = () => {
    if (props.disabled || props.loading) return
    emit('refresh')
  }

  const handleCancel = () => {
    if (props.disabled || props.loading) return
    emit('cancel')
  }

  return {
    isQrVisible,
    statusMessage,
    overlayIcon,
    handleRefresh,
    handleCancel
  }
}
