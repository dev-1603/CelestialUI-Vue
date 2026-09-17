<template>
  <CButton
    :class="wrapperClasses"
    :disabled="disabled || loading"
    :loading="loading"
    :variant="variant === 'solid' ? 'primary' : 'outline'"
    @click="handleClick"
  >
    <template #left-icon v-if="!loading">
      <CIcon :name="providerIcon" size="md" :class="iconClasses.join(' ')" />
    </template>
    
    <span v-if="!iconOnly">{{ buttonLabel }}</span>
  </CButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSocialLoginButtonProps, CSocialLoginButtonEmits, SocialProvider } from './CSocialLoginButton.types'
import { CButton } from '../../atoms/button'
import CIcon from '../../atoms/icon/CIcon.vue'
import './styles/CSocialLoginButton.css'

defineOptions({ name: 'CSocialLoginButton' })

const props = withDefaults(defineProps<CSocialLoginButtonProps>(), {
  loading: false,
  disabled: false,
  variant: 'outline',
  iconOnly: false,
  monochrome: false
})

const emit = defineEmits<CSocialLoginButtonEmits>()

const providerDetails: Record<SocialProvider, { name: string, icon: string, brandClass: string }> = {
  google: { name: 'Google', icon: 'chrome', brandClass: 'cui-social-google' }, // Using chrome as fallback for google
  github: { name: 'GitHub', icon: 'github', brandClass: 'cui-social-github' },
  apple: { name: 'Apple', icon: 'aperture', brandClass: 'cui-social-apple' }, // Using aperture as fallback for apple
  microsoft: { name: 'Microsoft', icon: 'grid', brandClass: 'cui-social-microsoft' }, // Using grid as fallback
  facebook: { name: 'Facebook', icon: 'facebook', brandClass: 'cui-social-facebook' },
  twitter: { name: 'Twitter', icon: 'twitter', brandClass: 'cui-social-twitter' }
}

const buttonLabel = computed(() => {
  if (props.label) return props.label
  return `Continue with ${providerDetails[props.provider]?.name || props.provider}`
})

const providerIcon = computed(() => {
  return providerDetails[props.provider]?.icon || 'hash'
})

const wrapperClasses = computed(() => [
  'cui-social-btn',
  `cui-social-btn--${props.provider}`,
  { 'cui-social-btn--icon-only': props.iconOnly },
  { 'cui-social-btn--monochrome': props.monochrome }
])

const iconClasses = computed(() => {
  const base = ['cui-social-icon']
  if (!props.monochrome) {
    base.push(providerDetails[props.provider]?.brandClass)
  }
  return base
})

const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', e)
}
</script>
