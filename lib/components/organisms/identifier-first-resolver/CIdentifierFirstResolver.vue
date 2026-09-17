<template>
  <form class="cui-resolver-form" @submit.prevent="handleSubmit">
    <div class="cui-resolver-input-group">
      <label v-if="label" :for="inputId" class="cui-resolver-label">
        {{ label }}
      </label>
      
      <input
        :id="inputId"
        v-model="identifier"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled || loading"
        class="cui-resolver-input"
        :class="{ 'cui-resolver-input--error': !!displayError }"
        :aria-invalid="!!displayError"
        :aria-describedby="displayError ? `${inputId}-error` : undefined"
      />
      
      <div v-if="displayError" :id="`${inputId}-error`" class="cui-resolver-error" aria-live="polite">
        {{ displayError }}
      </div>
    </div>
    
    <CButton 
      type="submit" 
      :loading="loading" 
      :disabled="disabled"
      class="w-full justify-center"
    >
      Continue
    </CButton>
  </form>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { useIdentifierFirstResolver } from './composables/useIdentifierFirstResolver'
import type { CIdentifierFirstResolverProps, CIdentifierFirstResolverEmits } from './CIdentifierFirstResolver.types'
import { CButton } from '../../atoms/button'
import './styles/CIdentifierFirstResolver.css'

defineOptions({ name: 'CIdentifierFirstResolver' })

const props = withDefaults(defineProps<CIdentifierFirstResolverProps>(), {
  loading: false,
  disabled: false,
  label: 'Email or Phone',
  placeholder: 'Enter your email or phone number'
})

const emit = defineEmits<CIdentifierFirstResolverEmits>()

const inputId = useId()

const { identifier, displayError, handleSubmit } = useIdentifierFirstResolver(props, emit)
</script>
