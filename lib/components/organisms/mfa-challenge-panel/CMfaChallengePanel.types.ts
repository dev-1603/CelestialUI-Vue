export type MfaMethod = 'totp' | 'sms' | 'email'

export interface CMfaChallengePanelProps {
  method: MfaMethod
  destination?: string // e.g. phone number or email address
  loading?: boolean
  error?: string
  disabled?: boolean
  resendDisabled?: boolean
  resendCooldown?: number // seconds
}

export interface CMfaChallengePanelEmits {
  (e: 'verify', code: string): void
  (e: 'resend'): void
  (e: 'cancel'): void
}
