import { computed } from 'vue'
import type { CPinInputProps } from '../CPinInput.types'

export function usePinInputStyles(props: CPinInputProps) {
  const wrapperClasses = computed(() => [
    'cui-pin-input-wrapper',
    `cui-pin-input--${props.variant || 'default'}`,
    {
      'cui-pin-input--disabled': props.disabled,
      'cui-pin-input--error': props.error
    }
  ])

  const inputClasses = computed(() => [
    'cui-pin-input-field'
  ])

  return { wrapperClasses, inputClasses }
}
