import { ref, computed, watch } from 'vue'
import type { CMfaChallengePanelProps, CMfaChallengePanelEmits } from '../CMfaChallengePanel.types'

export function useMfaChallengePanel(props: CMfaChallengePanelProps, emit: CMfaChallengePanelEmits) {
  const code = ref('')
  
  const title = computed(() => {
    switch (props.method) {
      case 'totp': return 'Authenticator App'
      case 'sms': return 'Check your phone'
      case 'email': return 'Check your email'
      default: return 'Two-Factor Authentication'
    }
  })

  const description = computed(() => {
    switch (props.method) {
      case 'totp': 
        return 'Enter the 6-digit code from your authenticator app.'
      case 'sms': 
        return `We sent a 6-digit code to ${props.destination || 'your phone'}.`
      case 'email': 
        return `We sent a 6-digit code to ${props.destination || 'your email'}.`
      default: 
        return 'Enter your verification code.'
    }
  })

  const isResendVisible = computed(() => {
    return props.method === 'sms' || props.method === 'email'
  })

  const handleVerify = () => {
    if (props.disabled || props.loading || code.value.length < 6) return
    emit('verify', code.value)
  }

  const handleResend = () => {
    if (props.disabled || props.loading || props.resendDisabled) return
    emit('resend')
  }

  const handleCancel = () => {
    if (props.disabled || props.loading) return
    emit('cancel')
  }

  return {
    code,
    title,
    description,
    isResendVisible,
    handleVerify,
    handleResend,
    handleCancel
  }
}
