export interface CQrSessionCanvasProps {
  qrData?: string
  status?: 'loading' | 'active' | 'scanned' | 'expired' | 'error'
  error?: string
  loading?: boolean
  disabled?: boolean
  expiresIn?: number // seconds
}

export interface CQrSessionCanvasEmits {
  (e: 'refresh'): void
  (e: 'cancel'): void
}
