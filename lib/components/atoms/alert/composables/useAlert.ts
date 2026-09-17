import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { CAlertProps, CAlertEmits, UseAlertReturn } from '../CAlert.types'

/**
 * Composable for alert behavior and state management
 * Handles visibility, auto-dismiss, keyboard interactions, and styling
 */
export function useAlert(props: CAlertProps, emit: CAlertEmits): UseAlertReturn {
  // Internal state
  const internalVisible = ref(true)
  const autoDismissTimer = ref<NodeJS.Timeout | null>(null)
  const progressTimer = ref<NodeJS.Timeout | null>(null)
  const progressValue = ref(0)

  /**
   * Computed visibility state
   * Uses internalVisible if visible prop is not provided (uncontrolled)
   * Otherwise uses the visible prop (controlled)
   */
  const isVisible = computed(() => {
    return props.visible !== undefined ? props.visible : internalVisible.value
  })

  /**
   * Computed loading state
   */
  const isLoading = computed(() => {
    return Boolean(props.loading)
  })

  /**
   * Computed dismissible state
   */
  const canDismiss = computed(() => {
    return Boolean(props.closable || props.dismissible)
  })

  /**
   * Main alert CSS classes
   */
  const alertClasses = computed(() => {
    const classes = ['celestial-alert']

    // Type variant
    if (props.type) {
      classes.push(`celestial-alert--${props.type}`)
    }

    // Size variant
    if (props.size) {
      classes.push(`celestial-alert--${props.size}`)
    }

    // State classes
    if (isLoading.value) {
      classes.push('celestial-alert--loading')
    }

    if (props.bordered) {
      classes.push('celestial-alert--bordered')
    }

    if (props.shadowed) {
      classes.push('celestial-alert--shadowed')
    }

    if (props.animation && props.animation !== 'none') {
      classes.push(`celestial-alert--${props.animation}`)
    }

    // Custom class
    if (props.class) {
      classes.push(props.class)
    }

    return classes
  })

  /**
   * Icon CSS classes
   */
  const iconClasses = computed(() => {
    const classes = ['celestial-alert__icon']

    if (props.showIcon === false) {
      classes.push('celestial-alert__icon--hidden')
    }

    return classes
  })

  /**
   * Content CSS classes
   */
  const contentClasses = computed(() => {
    const classes = ['celestial-alert__content']

    if (props.title) {
      classes.push('celestial-alert__content--with-title')
    }

    return classes
  })

  /**
   * Close button CSS classes
   */
  const closeClasses = computed(() => {
    const classes = ['celestial-alert__close']

    if (!canDismiss.value) {
      classes.push('celestial-alert__close--hidden')
    }

    return classes
  })

  /**
   * Progress bar CSS classes
   */
  const progressClasses = computed(() => {
    const classes = ['celestial-alert__progress']

    if (!props.showProgress || !props.autoDismiss) {
      classes.push('celestial-alert__progress--hidden')
    }

    return classes
  })

  /**
   * Handle close button click
   */
  const handleClose = (event?: MouseEvent | KeyboardEvent | Event) => {
    if (!canDismiss.value) return

    // Cancel auto-dismiss if active
    cancelAutoDismiss()

    // Emit close event
    emit('close', event as any)

    // Hide alert if uncontrolled
    if (props.visible === undefined) {
      hide()
    }
  }

  /**
   * Handle keyboard events
   */
  const handleKeydown = (event: KeyboardEvent) => {
    // Handle Escape key for dismissal
    if (event.key === 'Escape' && props.dismissible) {
      event.preventDefault()
      handleClose(event)
    }
  }

  /**
   * Handle click events
   */
  const handleClick = (event: MouseEvent) => {
    emit('click', event)
  }

  /**
   * Start auto-dismiss timer
   */
  const startAutoDismiss = () => {
    if (!props.autoDismiss || props.autoDismiss <= 0) return

    // Clear existing timer
    cancelAutoDismiss()

    // Emit start event
    emit('autoDismissStart')

    // Start progress animation if enabled
    if (props.showProgress) {
      progressValue.value = 0
      const progressInterval = 50 // Update every 50ms
      const progressStep = (progressInterval / props.autoDismiss) * 100

      progressTimer.value = setInterval(() => {
        progressValue.value += progressStep
        if (progressValue.value >= 100) {
          progressValue.value = 100
          clearInterval(progressTimer.value!)
        }
      }, progressInterval)
    }

    // Set main timer
    autoDismissTimer.value = setTimeout(() => {
      emit('autoDismissComplete')
      handleClose()
    }, props.autoDismiss)
  }

  /**
   * Cancel auto-dismiss timer
   */
  const cancelAutoDismiss = () => {
    let hadActiveTimer = false

    if (autoDismissTimer.value) {
      clearTimeout(autoDismissTimer.value)
      autoDismissTimer.value = null
      hadActiveTimer = true
    }

    if (progressTimer.value) {
      clearInterval(progressTimer.value)
      progressTimer.value = null
    }

    progressValue.value = 0

    // Only emit cancel event if there was actually a timer to cancel
    if (hadActiveTimer) {
      emit('autoDismissCancel')
    }
  }

  /**
   * Show the alert
   */
  const show = () => {
    if (props.visible === undefined) {
      internalVisible.value = true
    }
    emit('show')

    // Start auto-dismiss if configured
    nextTick(() => {
      if (props.autoDismiss && props.autoDismiss > 0) {
        startAutoDismiss()
      }
    })
  }

  /**
   * Hide the alert
   */
  const hide = () => {
    if (props.visible === undefined) {
      internalVisible.value = false
    }
    cancelAutoDismiss()
    emit('hide')
  }

  /**
   * Toggle alert visibility
   */
  const toggle = () => {
    if (isVisible.value) {
      hide()
    } else {
      show()
    }
  }

  // Lifecycle hooks
  onMounted(() => {
    // Auto-dismiss is handled by the watch function with immediate: true
    // No need to duplicate the logic here
  })

  onUnmounted(() => {
    // Clean up timers
    cancelAutoDismiss()
  })

  return {
    isVisible,
    isLoading,
    canDismiss,
    alertClasses,
    iconClasses,
    contentClasses,
    closeClasses,
    progressClasses,
    handleClose,
    handleKeydown,
    handleClick,
    startAutoDismiss,
    cancelAutoDismiss,
    show,
    hide,
    toggle,
  }
}
