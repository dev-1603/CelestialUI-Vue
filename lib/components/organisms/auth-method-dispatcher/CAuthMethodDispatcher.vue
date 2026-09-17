<template>
  <div class="cui-auth-dispatcher">
    <!-- Header with Back Button and Identifier -->
    <div class="cui-auth-dispatcher-header">
      <button 
        type="button" 
        class="cui-auth-dispatcher-back-btn" 
        :disabled="disabled || loading"
        aria-label="Go back"
        @click="goBack"
      >
        <CIcon name="arrow-left" size="sm" />
      </button>
      <div class="cui-auth-dispatcher-identifier">
        {{ identifier }}
      </div>
    </div>

    <div class="cui-auth-dispatcher-content">
      <h3 class="text-lg font-semibold mb-2">Choose how to sign in</h3>
      
      <!-- Authentication Methods -->
      <div class="cui-auth-dispatcher-methods" role="group" aria-label="Authentication methods">
        <button
          v-for="method in availableMethods.filter(m => m !== 'social')"
          :key="method"
          type="button"
          class="cui-auth-dispatcher-method-btn"
          :class="{ 'cui-auth-dispatcher-method-btn--active': currentMethod === method }"
          :disabled="disabled || loading"
          :aria-pressed="currentMethod === method"
          @click="selectMethod(method)"
        >
          <CIcon :name="getMethodIcon(method)" size="sm" />
          <span>{{ getMethodLabel(method) }}</span>
          <CIcon 
            v-if="currentMethod === method" 
            name="check" 
            size="sm" 
            class="ml-auto text-primary-600" 
          />
        </button>
      </div>

      <!-- Social Providers -->
      <template v-if="socialProviders && socialProviders.length > 0">
        <div class="cui-auth-dispatcher-divider">or sign in with</div>
        <div class="flex flex-col gap-2">
          <CSocialLoginButton
            v-for="provider in socialProviders"
            :key="provider.id"
            :provider="provider.id as any"
            :label="`Continue with ${provider.name}`"
            :disabled="disabled || loading"
            @click="selectSocial(provider.id)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthMethodDispatcher } from './composables/useAuthMethodDispatcher'
import type { CAuthMethodDispatcherProps, CAuthMethodDispatcherEmits } from './CAuthMethodDispatcher.types'
import CIcon from '../../atoms/icon/CIcon.vue'
import { CSocialLoginButton } from '../../molecules/social-login-button'
import './styles/CAuthMethodDispatcher.css'

defineOptions({ name: 'CAuthMethodDispatcher' })

const props = withDefaults(defineProps<CAuthMethodDispatcherProps>(), {
  loading: false,
  disabled: false
})

const emit = defineEmits<CAuthMethodDispatcherEmits>()

const { 
  currentMethod, 
  getMethodLabel, 
  getMethodIcon, 
  selectMethod, 
  selectSocial, 
  goBack 
} = useAuthMethodDispatcher(props, emit)
</script>
