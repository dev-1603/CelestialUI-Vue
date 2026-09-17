import { ref } from 'vue'
import type { CAuthMethodDispatcherProps, CAuthMethodDispatcherEmits, AuthMethod } from '../CAuthMethodDispatcher.types'

export function useAuthMethodDispatcher(props: CAuthMethodDispatcherProps, emit: CAuthMethodDispatcherEmits) {
  const currentMethod = ref<AuthMethod>(props.defaultMethod || props.availableMethods[0])

  const getMethodLabel = (method: AuthMethod): string => {
    switch (method) {
      case 'password': return 'Password'
      case 'magic_link': return 'Email Link'
      case 'otp': return 'One-Time Passcode'
      case 'passkey': return 'Passkey'
      case 'social': return 'Other options'
      default: return 'Unknown'
    }
  }

  const getMethodIcon = (method: AuthMethod): string => {
    switch (method) {
      case 'password': return 'key'
      case 'magic_link': return 'mail'
      case 'otp': return 'smartphone'
      case 'passkey': return 'fingerprint'
      case 'social': return 'users'
      default: return 'circle'
    }
  }

  const selectMethod = (method: AuthMethod) => {
    if (props.disabled || props.loading) return
    currentMethod.value = method
    emit('select-method', method)
  }

  const selectSocial = (providerId: string) => {
    if (props.disabled || props.loading) return
    emit('select-social', providerId)
  }

  const goBack = () => {
    if (props.disabled || props.loading) return
    emit('back')
  }

  return {
    currentMethod,
    getMethodLabel,
    getMethodIcon,
    selectMethod,
    selectSocial,
    goBack
  }
}
