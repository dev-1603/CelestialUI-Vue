<template>
  <div class="cui-mfa-panel">
    <div class="cui-mfa-panel-header">
      <h3 class="cui-mfa-panel-title">{{ title }}</h3>
      <p class="cui-mfa-panel-desc">{{ description }}</p>
    </div>

    <div class="cui-mfa-panel-body">
      <CPinInput 
        v-model="code"
        :length="6"
        type="number"
        :disabled="disabled || loading"
        :error="!!error"
        autofocus
      />

      <div v-if="error" class="cui-mfa-panel-error" aria-live="polite">
        {{ error }}
      </div>
    </div>

    <div class="cui-mfa-panel-actions">
      <CButton 
        class="w-full justify-center" 
        :loading="loading" 
        :disabled="disabled || code.length < 6"
        @click="handleVerify"
      >
        Verify
      </CButton>
      
      <CButton 
        class="w-full justify-center" 
        variant="ghost" 
        :disabled="disabled || loading"
        @click="handleCancel"
      >
        Cancel
      </CButton>
    </div>

    <div v-if="isResendVisible" class="cui-mfa-panel-resend">
      <span class="cui-mfa-panel-resend-text">Didn't receive a code?</span>
      <button 
        type="button" 
        class="cui-mfa-panel-resend-btn"
        :disabled="disabled || loading || resendDisabled"
        @click="handleResend"
      >
        Resend code <span v-if="resendCooldown && resendCooldown > 0">in {{ resendCooldown }}s</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMfaChallengePanel } from './composables/useMfaChallengePanel'
import type { CMfaChallengePanelProps, CMfaChallengePanelEmits } from './CMfaChallengePanel.types'
import { CPinInput } from '../../molecules/pin-input'
import { CButton } from '../../atoms/button'
import './styles/CMfaChallengePanel.css'

defineOptions({ name: 'CMfaChallengePanel' })

const props = withDefaults(defineProps<CMfaChallengePanelProps>(), {
  loading: false,
  disabled: false,
  resendDisabled: false
})

const emit = defineEmits<CMfaChallengePanelEmits>()

const { 
  code, 
  title, 
  description, 
  isResendVisible, 
  handleVerify, 
  handleResend, 
  handleCancel 
} = useMfaChallengePanel(props, emit)
</script>
