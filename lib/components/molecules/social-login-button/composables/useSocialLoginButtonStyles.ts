import { computed } from 'vue'
import type { CSocialLoginButtonProps } from '../CSocialLoginButton.types'

export function useSocialLoginButtonStyles(props: CSocialLoginButtonProps) {
  const wrapperClasses = computed(() => ['cui-socialloginbutton'])
  return { wrapperClasses }
}
