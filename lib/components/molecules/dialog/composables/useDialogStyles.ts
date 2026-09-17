import { computed } from 'vue'
import type { CDialogProps } from '../CDialog.types'

export function useDialogStyles(props: CDialogProps) {
  const wrapperClasses = computed(() => [
    'cui-dialog-backdrop',
  ])
  
  const dialogClasses = computed(() => [
    'cui-dialog',
    `cui-dialog--${props.size || 'md'}`
  ])

  return { wrapperClasses, dialogClasses }
}
