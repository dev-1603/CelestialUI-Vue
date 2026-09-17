export type SocialProvider = 'google' | 'github' | 'apple' | 'microsoft' | 'facebook' | 'twitter'

export interface CSocialLoginButtonProps {
  provider: SocialProvider
  label?: string
  loading?: boolean
  disabled?: boolean
  variant?: 'outline' | 'solid'
  iconOnly?: boolean
  monochrome?: boolean
}

export interface CSocialLoginButtonEmits {
  (e: 'click', event: MouseEvent): void
}
