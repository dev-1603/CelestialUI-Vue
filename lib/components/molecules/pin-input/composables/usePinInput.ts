import { ref, watch, nextTick, type Ref } from 'vue'
import type { CPinInputProps, CPinInputEmits } from '../CPinInput.types'

export function usePinInput(props: CPinInputProps, emit: CPinInputEmits, inputRefs: Ref<HTMLInputElement[]>) {
  const values = ref<string[]>(Array(props.length).fill(''))

  // Initialize values from modelValue
  watch(() => props.modelValue, (newVal) => {
    if (newVal === values.value.join('')) return
    
    const chars = newVal.split('').slice(0, props.length)
    const newValues = Array(props.length).fill('')
    chars.forEach((char, i) => {
      newValues[i] = char
    })
    values.value = newValues
  }, { immediate: true })

  const focusInput = (index: number) => {
    if (index >= 0 && index < (props.length || 0) && inputRefs.value[index]) {
      inputRefs.value[index].focus()
    }
  }

  const updateValue = () => {
    const combined = values.value.join('')
    emit('update:modelValue', combined)
    if (combined.length === props.length) {
      emit('complete', combined)
    }
  }

  const handleInput = (e: Event, index: number) => {
    const input = e.target as HTMLInputElement
    const val = input.value
    
    // Only take the last character if multiple are inputted
    const lastChar = val.slice(-1)
    
    // Check type constraints
    if (props.type === 'number' && !/^\d*$/.test(lastChar)) {
      values.value[index] = ''
      input.value = ''
      return
    }

    values.value[index] = lastChar
    
    if (lastChar) {
      updateValue()
      focusInput(index + 1)
    } else {
      updateValue()
    }
  }

  const handleKeydown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'Backspace') {
      if (!values.value[index] && index > 0) {
        // If empty and backspace is pressed, focus previous and clear it
        values.value[index - 1] = ''
        updateValue()
        focusInput(index - 1)
      } else {
        // If not empty, let it clear naturally (handled by input event)
        // or clear it here and emit
        values.value[index] = ''
        updateValue()
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focusInput(index - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      focusInput(index + 1)
    }
  }

  const handlePaste = (e: ClipboardEvent, startIndex: number) => {
    e.preventDefault()
    const pastedData = e.clipboardData?.getData('text/plain')
    if (!pastedData) return

    let chars = pastedData.split('')
    if (props.type === 'number') {
      chars = chars.filter(c => /^\d$/.test(c))
    }

    if (chars.length === 0) return

    let currentIndex = startIndex
    for (const char of chars) {
      if (currentIndex >= (props.length || 0)) break
      values.value[currentIndex] = char
      currentIndex++
    }

    updateValue()
    focusInput(Math.min(currentIndex, (props.length || 0) - 1))
  }

  return {
    values,
    handleInput,
    handleKeydown,
    handlePaste,
    focusInput
  }
}
