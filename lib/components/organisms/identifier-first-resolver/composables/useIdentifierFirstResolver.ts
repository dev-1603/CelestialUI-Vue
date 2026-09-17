import { ref, computed } from 'vue'
import type { CIdentifierFirstResolverProps, CIdentifierFirstResolverEmits } from '../CIdentifierFirstResolver.types'

export function useIdentifierFirstResolver(props: CIdentifierFirstResolverProps, emit: CIdentifierFirstResolverEmits) {
  const identifier = ref(props.initialIdentifier || '')
  const internalError = ref('')

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isValidPhone = (phone: string) => {
    return /^\+?[\d\s-]{10,}$/.test(phone)
  }

  const validate = () => {
    internalError.value = ''
    if (!identifier.value) {
      internalError.value = 'Email or phone number is required'
      return false
    }
    
    // Naive check if it looks like an email or a phone number
    if (!isValidEmail(identifier.value) && !isValidPhone(identifier.value)) {
      internalError.value = 'Please enter a valid email or phone number'
      return false
    }

    return true
  }

  const handleSubmit = (e?: Event) => {
    if (e) e.preventDefault()
    if (props.disabled || props.loading) return
    
    if (validate()) {
      emit('resolve', identifier.value)
    }
  }

  const displayError = computed(() => {
    return props.error || internalError.value
  })

  return {
    identifier,
    displayError,
    handleSubmit
  }
}
