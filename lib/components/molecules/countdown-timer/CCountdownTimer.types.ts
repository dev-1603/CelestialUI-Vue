export interface CCountdownTimerProps {
  initialSeconds: number
  autoStart?: boolean
  format?: 'mm:ss' | 'ss' | 'text'
  disabled?: boolean
}

export interface CCountdownTimerEmits {
  (e: 'tick', secondsLeft: number): void
  (e: 'complete'): void
}

export interface CCountdownTimerExposed {
  start: () => void
  pause: () => void
  reset: () => void
  getSecondsLeft: () => number
}
