import { ref, watch } from 'vue'
import type { CTabsProps, CTabsEmits, CTabItem } from '../CTabs.types'

export function useTabs(props: CTabsProps, emit: CTabsEmits) {
  const activeTab = ref(props.modelValue)

  watch(() => props.modelValue, (newVal) => {
    activeTab.value = newVal
  })

  const selectTab = (item: CTabItem) => {
    if (item.disabled) return
    activeTab.value = item.id
    emit('update:modelValue', item.id)
    emit('change', item.id)
  }

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    const isVertical = props.orientation === 'vertical'
    let targetIndex = index

    if (
      (e.key === 'ArrowRight' && !isVertical) || 
      (e.key === 'ArrowDown' && isVertical)
    ) {
      e.preventDefault()
      targetIndex = findNextEnabledTab(index, 1)
    } else if (
      (e.key === 'ArrowLeft' && !isVertical) || 
      (e.key === 'ArrowUp' && isVertical)
    ) {
      e.preventDefault()
      targetIndex = findNextEnabledTab(index, -1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      targetIndex = findNextEnabledTab(-1, 1)
    } else if (e.key === 'End') {
      e.preventDefault()
      targetIndex = findNextEnabledTab(props.items.length, -1)
    }

    if (targetIndex !== index && targetIndex !== -1) {
      // Focus on the new tab
      const tabs = document.querySelectorAll(`[role="tab"]`)
      if (tabs[targetIndex]) {
        ;(tabs[targetIndex] as HTMLElement).focus()
      }
    }
  }

  const findNextEnabledTab = (currentIndex: number, direction: 1 | -1): number => {
    let nextIndex = currentIndex + direction
    
    // Wrap around
    if (nextIndex >= props.items.length) {
      nextIndex = 0
    } else if (nextIndex < 0) {
      nextIndex = props.items.length - 1
    }

    // Stop if we loop all the way around
    const startIndex = nextIndex
    while (props.items[nextIndex].disabled) {
      nextIndex += direction
      if (nextIndex >= props.items.length) nextIndex = 0
      if (nextIndex < 0) nextIndex = props.items.length - 1
      if (nextIndex === startIndex) return -1 // All disabled
    }

    return nextIndex
  }

  return {
    activeTab,
    selectTab,
    handleKeyDown
  }
}
