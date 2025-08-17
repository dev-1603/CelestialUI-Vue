import { ref, computed, watch, inject, type Ref } from 'vue'
import type { ThemeConfig, ThemeTokens } from '../types'
import { getThemeTokens, generateCSSVariables, defaultTokens, darkTokens } from '../themes'

// Global theme state
const currentTheme = ref<ThemeConfig>({
  framework: 'tailwind',
  mode: 'light',
  tokens: defaultTokens
})

const isDark = ref(false)

export function useTheme() {
  // Inject global options if available
  const options = inject('celestialui-options', {})

  // Computed theme tokens
  const tokens = computed(() => getThemeTokens(currentTheme.value))

  // CSS variables
  const cssVariables = computed(() => generateCSSVariables(tokens.value))

  // Theme mode management
  const toggleTheme = () => {
    isDark.value = !isDark.value
    currentTheme.value.mode = isDark.value ? 'dark' : 'light'
    updateTheme(currentTheme.value)
  }

  const setTheme = (theme: Partial<ThemeConfig>) => {
    currentTheme.value = {
      ...currentTheme.value,
      ...theme
    }
    isDark.value = currentTheme.value.mode === 'dark'
    updateTheme(currentTheme.value)
  }

  const setMode = (mode: 'light' | 'dark' | 'auto') => {
    if (mode === 'auto') {
      // Detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = prefersDark
      currentTheme.value.mode = prefersDark ? 'dark' : 'light'
    } else {
      isDark.value = mode === 'dark'
      currentTheme.value.mode = mode
    }
    updateTheme(currentTheme.value)
  }

  // Apply theme to DOM
  const updateTheme = (theme: ThemeConfig) => {
    const root = document.documentElement

    // Remove existing theme classes
    root.classList.remove('cui-light', 'cui-dark', 'cui-tailwind', 'cui-scss', 'cui-material', 'cui-css')

    // Add new theme classes
    root.classList.add(`cui-${theme.mode}`)
    root.classList.add(`cui-${theme.framework}`)

    // Apply CSS variables
    const vars = generateCSSVariables(getThemeTokens(theme))
    Object.entries(vars).forEach(([property, value]) => {
      root.style.setProperty(property, value as string)
    })

    // Emit theme change event
    window.dispatchEvent(new CustomEvent('cui-theme-change', {
      detail: { theme, tokens: getThemeTokens(theme) }
    }))
  }

  // Get color utility
  const getColor = (path: string): string => {
    const keys = path.split('.')
    let value: any = tokens.value.colors

    for (const key of keys) {
      value = value?.[key]
    }

    return value || '#000000'
  }

  // Get token utility
  const getToken = (category: keyof ThemeTokens, key: string): string => {
    const categoryTokens = tokens.value[category] as Record<string, any>
    return categoryTokens?.[key] || ''
  }

  // Responsive utilities
  const getBreakpoint = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string => {
    const breakpoints = {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
    return breakpoints[size]
  }

  // Watch for system theme changes
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (currentTheme.value.mode === 'auto') {
        isDark.value = e.matches
        currentTheme.value.mode = e.matches ? 'dark' : 'light'
        updateTheme(currentTheme.value)
      }
    })
  }

  // Initialize theme on first use
  if (typeof window !== 'undefined' && !document.documentElement.classList.contains('cui-light') && !document.documentElement.classList.contains('cui-dark')) {
    updateTheme(currentTheme.value)
  }

  return {
    // State
    theme: currentTheme,
    tokens,
    cssVariables,
    isDark: computed(() => isDark.value),

    // Methods
    setTheme,
    setMode,
    toggleTheme,
    updateTheme,
    getColor,
    getToken,
    getBreakpoint
  }
}

// Composable for component theming
export function useComponentTheme(componentName: string, props: any = {}) {
  const { theme, tokens, getColor, getToken } = useTheme()

  const componentClasses = computed(() => {
    const classes = [`cui-${componentName}`]

    if (props.variant) {
      classes.push(`cui-${componentName}--${props.variant}`)
    }

    if (props.size) {
      classes.push(`cui-${componentName}--${props.size}`)
    }

    if (props.disabled) {
      classes.push(`cui-${componentName}--disabled`)
    }

    if (props.loading) {
      classes.push(`cui-${componentName}--loading`)
    }

    return classes
  })

  const componentStyles = computed(() => {
    const styles: Record<string, string> = {}

    // Apply custom styles if provided
    if (props.style) {
      Object.assign(styles, props.style)
    }

    return styles
  })

  return {
    theme,
    tokens,
    componentClasses,
    componentStyles,
    getColor,
    getToken
  }
}
