import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import type { CCountdownTimerProps, CCountdownTimerEmits } from '../CCountdownTimer.types'

export function useCountdownTimer(props: CCountdownTimerProps, emit: CCountdownTimerEmits) {
  const secondsLeft = ref(props.initialSeconds)
  const isRunning = ref(false)
  let timerId: ReturnType<typeof setInterval> | null = null

  const start = () => {
    if (isRunning.value || secondsLeft.value <= 0 || props.disabled) return
    
    isRunning.value = true
    timerId = setInterval(() => {
      secondsLeft.value--
      emit('tick', secondsLeft.value)
      
      if (secondsLeft.value <= 0) {
        clearInterval(timerId!)
        isRunning.value = false
        emit('complete')
      }
    }, 1000)
  }

  const pause = () => {
    if (!isRunning.value) return
    if (timerId) clearInterval(timerId)
    isRunning.value = false
  }

  const reset = () => {
    pause()
    secondsLeft.value = props.initialSeconds
  }

  const formattedTime = computed(() => {
    if (props.format === 'ss') {
      return secondsLeft.value.toString()
    }
    
    const m = Math.floor(secondsLeft.value / 60)
    const s = secondsLeft.value % 60
    
    if (props.format === 'text') {
      if (m > 0) return `${m}m ${s}s`
      return `${s}s`
    }
    
    // mm:ss
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  })

  // Watch for disabled state
  watch(() => props.disabled, (newVal) => {
    if (newVal && isRunning.value) {
      pause()
    }
  })

  // Auto start
  onMounted(() => {
    if (props.autoStart && !props.disabled) {
      start()
    }
  })

  onUnmounted(() => {
    if (timerId) clearInterval(timerId)
  })

  return {
    secondsLeft,
    isRunning,
    formattedTime,
    start,
    pause,
    reset
  }
}
