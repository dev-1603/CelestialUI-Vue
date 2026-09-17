import { computed } from 'vue'
import type { CPasswordInputProps } from '../CPasswordInput.types'

export function usePasswordInputStyles(props: CPasswordInputProps, strengthScore: { value: number }) {
  const wrapperClasses = computed(() => [
    'cui-password-input-wrapper',
    { 'cui-password-input--disabled': props.disabled }
  ])

  const inputContainerClasses = computed(() => [
    'cui-password-input-container',
    { 'cui-password-input-container--error': !!props.error }
  ])

  const strengthBarClasses = computed(() => {
    const score = strengthScore.value
    return [
      'cui-password-strength-bar-fill',
      {
        'cui-password-strength--weak': score > 0 && score < 40,
        'cui-password-strength--fair': score >= 40 && score < 80,
        'cui-password-strength--good': score >= 80 && score < 100,
        'cui-password-strength--strong': score === 100
      }
    ]
  })

  return { wrapperClasses, inputContainerClasses, strengthBarClasses }
}
