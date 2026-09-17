import { computed } from 'vue'
import type { CCountdownTimerProps } from '../CCountdownTimer.types'

export function useCountdownTimerStyles(props: CCountdownTimerProps, isRunning: { value: boolean }) {
  const wrapperClasses = computed(() => [
    'cui-countdown',
    {
      'cui-countdown--disabled': props.disabled,
      'cui-countdown--running': isRunning.value
    }
  ])

  return { wrapperClasses }
}
