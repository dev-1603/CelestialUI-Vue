<template>
  <div 
    :class="wrapperClasses"
    role="timer"
    aria-live="polite"
    :aria-atomic="true"
  >
    <slot 
      :seconds-left="secondsLeft" 
      :formatted-time="formattedTime"
      :is-running="isRunning"
    >
      {{ formattedTime }}
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useCountdownTimer } from './composables/useCountdownTimer'
import { useCountdownTimerStyles } from './composables/useCountdownTimerStyles'
import type { CCountdownTimerProps, CCountdownTimerEmits } from './CCountdownTimer.types'
import './styles/CCountdownTimer.css'

defineOptions({ name: 'CCountdownTimer' })

const props = withDefaults(defineProps<CCountdownTimerProps>(), {
  autoStart: false,
  format: 'mm:ss',
  disabled: false
})

const emit = defineEmits<CCountdownTimerEmits>()

const { 
  secondsLeft, 
  isRunning, 
  formattedTime, 
  start, 
  pause, 
  reset 
} = useCountdownTimer(props, emit)

const { wrapperClasses } = useCountdownTimerStyles(props, isRunning)

defineExpose({
  start,
  pause,
  reset,
  getSecondsLeft: () => secondsLeft.value
})
</script>
