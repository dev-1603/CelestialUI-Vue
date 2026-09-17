<template>
  <div :class="wrapperClasses" role="group" aria-label="PIN Input">
    <input
      v-for="(val, index) in values"
      :key="index"
      :ref="el => { if (el) inputRefs[index] = el as HTMLInputElement }"
      :value="val"
      :type="type === 'password' ? 'password' : 'text'"
      :inputmode="type === 'number' ? 'numeric' : 'text'"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      maxlength="1"
      :aria-label="`Digit ${index + 1}`"
      :autofocus="autofocus && index === 0"
      @input="handleInput($event, index)"
      @keydown="handleKeydown($event, index)"
      @paste="handlePaste($event, index)"
      @focus="($event.target as HTMLInputElement).select()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePinInput } from './composables/usePinInput'
import { usePinInputStyles } from './composables/usePinInputStyles'
import type { CPinInputProps, CPinInputEmits } from './CPinInput.types'
import './styles/CPinInput.css'

defineOptions({ name: 'CPinInput' })

const props = withDefaults(defineProps<CPinInputProps>(), {
  length: 4,
  type: 'text',
  disabled: false,
  error: false,
  autofocus: false
})

const emit = defineEmits<CPinInputEmits>()

const inputRefs = ref<HTMLInputElement[]>([])

const { values, handleInput, handleKeydown, handlePaste } = usePinInput(props, emit, inputRefs)
const { wrapperClasses, inputClasses } = usePinInputStyles(props)
</script>
