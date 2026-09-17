import { computed, ref, watch } from 'vue'
import type { CProgressProps, CProgressEmits, UseProgressReturn } from '../CProgress.types'

/**
 * Composable for progress bar behavior and logic
 * Handles progress calculations, accessibility, and event management
 */
export function useProgress(props: CProgressProps, emit: CProgressEmits): UseProgressReturn {
  // Track if completion has been emitted to avoid duplicate emissions
  const hasEmittedComplete = ref(false)

  /**
   * Compute percentage value based on current value and max
   */
  const percentage = computed(() => {
    if (props.indeterminate) return 0
    const max = props.max || 100
    const value = Math.max(0, Math.min(props.value, max))
    return Math.round((value / max) * 100)
  })

  /**
   * Compute progress bar width as CSS percentage
   */
  const progressWidth = computed(() => {
    if (props.indeterminate) return '100%'
    return `${percentage.value}%`
  })

  /**
   * Check if progress is complete
   */
  const isComplete = computed(() => {
    if (props.indeterminate) return false
    const max = props.max || 100
    return props.value >= max
  })

  /**
   * Check if progress is indeterminate
   */
  const isIndeterminate = computed(() => {
    return Boolean(props.indeterminate)
  })

  /**
   * Format progress text based on props
   */
  const progressText = computed(() => {
    if (props.textFormat) {
      return props.textFormat(props.value, props.max || 100, percentage.value)
    }

    const parts: string[] = []

    if (props.showValue) {
      parts.push(`${props.value}`)
    }

    if (props.showPercentage) {
      parts.push(`${percentage.value}%`)
    }

    return parts.join(' / ')
  })

  /**
   * Generate ARIA attributes for accessibility
   */
  const ariaAttributes = computed(() => {
    const attrs: Record<string, string | number> = {
      role: 'progressbar',
      'aria-valuenow': props.value,
      'aria-valuemin': 0,
      'aria-valuemax': props.max || 100,
    }

    if (props.ariaDescribedBy) {
      attrs['aria-describedby'] = props.ariaDescribedBy
    }

    if (progressText.value) {
      attrs['aria-valuetext'] = progressText.value
    }

    if (props.indeterminate) {
      delete attrs['aria-valuenow']
      delete attrs['aria-valuemin']
      delete attrs['aria-valuemax']
      delete attrs['aria-valuetext']
      attrs['aria-label'] = props.ariaLabel || props.label || 'Loading progress'
    } else {
      attrs['aria-label'] = props.ariaLabel || props.label || 'Progress'
    }

    return attrs
  })

  /**
   * Handle progress completion
   */
  const handleComplete = () => {
    if (isComplete.value && !hasEmittedComplete.value) {
      hasEmittedComplete.value = true
      emit('complete')
    }
  }

  /**
   * Handle progress change
   */
  const handleChange = (newValue: number) => {
    emit('change', newValue, percentage.value)

    // Check for completion
    if (isComplete.value) {
      handleComplete()
    }
  }

  /**
   * Handle focus events
   */
  const handleFocus = (event: FocusEvent) => {
    emit('focus', event)
  }

  /**
   * Handle blur events
   */
  const handleBlur = (event: FocusEvent) => {
    emit('blur', event)
  }

  // Watch for value changes to emit change event
  watch(
    () => props.value,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        handleChange(newValue)
      }
    },
  )

  // Watch for completion state
  watch(isComplete, (complete) => {
    if (complete) {
      handleComplete()
    } else {
      // Reset completion flag when progress is no longer complete
      hasEmittedComplete.value = false
    }
  }, { immediate: true })

  return {
    percentage,
    progressWidth,
    isComplete,
    isIndeterminate,
    progressText,
    ariaAttributes,
    handleComplete,
    handleChange,
    handleFocus,
    handleBlur,
  }
}
