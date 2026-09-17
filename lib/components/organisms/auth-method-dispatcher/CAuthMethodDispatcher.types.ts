export type AuthMethod = 'password' | 'magic_link' | 'otp' | 'passkey' | 'social'

export interface ProviderState {
  id: string
  name: string
  icon: string
}

export interface CAuthMethodDispatcherProps {
  availableMethods: AuthMethod[]
  identifier: string
  socialProviders?: ProviderState[]
  loading?: boolean
  disabled?: boolean
  defaultMethod?: AuthMethod
}

export interface CAuthMethodDispatcherEmits {
  (e: 'select-method', method: AuthMethod): void
  (e: 'select-social', providerId: string): void
  (e: 'back'): void
}
