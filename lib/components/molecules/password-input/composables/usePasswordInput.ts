import { ref, computed } from 'vue'
import { defaultRequirements } from '../CPasswordInput.types'
import type { CPasswordInputProps, CPasswordInputEmits } from '../CPasswordInput.types'

export function usePasswordInput(props: CPasswordInputProps, emit: CPasswordInputEmits) {
  const showPassword = ref(false)
  const isFocused = ref(false)

  const toggleVisibility = () => {
    showPassword.value = !showPassword.value
  }

  const handleInput = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
  }

  const activeRequirements = computed(() => {
    return props.requirements || defaultRequirements
  })

  const metRequirements = computed(() => {
    const val = props.modelValue || ''
    return activeRequirements.value.map(req => ({
      ...req,
      met: req.regex.test(val)
    }))
  })

  const strengthScore = computed(() => {
    if (!props.modelValue) return 0
    const metCount = metRequirements.value.filter(r => r.met).length
    const total = metRequirements.value.length
    return Math.round((metCount / total) * 100)
  })

  const strengthLabel = computed(() => {
    const score = strengthScore.value
    if (score === 0) return ''
    if (score < 40) return 'Weak'
    if (score < 80) return 'Fair'
    if (score < 100) return 'Good'
    return 'Strong'
  })

  return {
    showPassword,
    isFocused,
    toggleVisibility,
    handleInput,
    metRequirements,
    strengthScore,
    strengthLabel
  }
}
