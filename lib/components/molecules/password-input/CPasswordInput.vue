<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="inputId" class="cui-password-label">
      {{ label }}
    </label>

    <div :class="inputContainerClasses">
      <input
        :id="inputId"
        :type="showPassword ? 'text' : 'password'"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="cui-password-input-field"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${inputId}-error` : undefined"
        @input="handleInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      
      <button
        type="button"
        class="cui-password-toggle-btn"
        :disabled="disabled"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        @click="toggleVisibility"
      >
        <CIcon :name="showPassword ? 'eye-off' : 'eye'" size="sm" />
      </button>
    </div>

    <div v-if="error" :id="`${inputId}-error`" class="cui-password-error-text" aria-live="polite">
      {{ error }}
    </div>

    <!-- Strength Indicator -->
    <div v-if="showStrengthIndicator && modelValue" class="cui-password-strength">
      <div class="cui-password-strength-header">
        <span>Password strength</span>
        <strong>{{ strengthLabel }}</strong>
      </div>
      <div class="cui-password-strength-bar">
        <div 
          :class="strengthBarClasses" 
          :style="{ width: `${strengthScore}%` }"
        ></div>
      </div>
    </div>

    <!-- Requirements List -->
    <div v-if="showRequirements && (isFocused || modelValue)" class="cui-password-requirements">
      <div 
        v-for="req in metRequirements" 
        :key="req.id"
        class="cui-password-req-item"
        :class="{ 'cui-password-req-item--met': req.met }"
      >
        <CIcon :name="req.met ? 'check-circle' : 'circle'" size="xs" />
        <span>{{ req.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import { usePasswordInput } from './composables/usePasswordInput'
import { usePasswordInputStyles } from './composables/usePasswordInputStyles'
import type { CPasswordInputProps, CPasswordInputEmits } from './CPasswordInput.types'
import CIcon from '../../atoms/icon/CIcon.vue'
import './styles/CPasswordInput.css'

defineOptions({ name: 'CPasswordInput' })

const props = withDefaults(defineProps<CPasswordInputProps>(), {
  disabled: false,
  showStrengthIndicator: false,
  showRequirements: false
})

const emit = defineEmits<CPasswordInputEmits>()

const inputId = useId()

const { 
  showPassword, 
  isFocused,
  toggleVisibility, 
  handleInput, 
  metRequirements, 
  strengthScore, 
  strengthLabel 
} = usePasswordInput(props, emit)

const { wrapperClasses, inputContainerClasses, strengthBarClasses } = usePasswordInputStyles(props, strengthScore)
</script>
