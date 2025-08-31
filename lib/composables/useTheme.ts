// Theme composable
import { ref, computed, inject } from 'vue'

export function useTheme() {
  const themeManager = inject('celestialui-theme', null) as any

  const currentTheme = ref(themeManager?.currentTheme || 'light')

  const setTheme = (theme: string) => {
    currentTheme.value = theme
    if (themeManager && typeof themeManager.setTheme === 'function') {
      themeManager.setTheme(theme)
    }
  }

  const getTheme = () => {
    return currentTheme.value
  }

  const isDark = computed(() => {
    return currentTheme.value === 'dark'
  })

  const isLight = computed(() => {
    return currentTheme.value === 'light'
  })

  return {
    currentTheme,
    setTheme,
    getTheme,
    isDark,
    isLight
  }
}








