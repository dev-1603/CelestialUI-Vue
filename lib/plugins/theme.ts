import type { App } from 'vue'
import type { ThemeConfig } from '../types'
import { createTheme, generateCSSVariables, getThemeTokens } from '../themes'

export function createThemePlugin(config: Partial<ThemeConfig> = {}) {
  return {
    install(app: App) {
      // Create theme instance
      const theme = createTheme(config)

      // Provide theme globally
      app.provide('cui-theme', theme)

      // Apply initial theme
      applyTheme(theme)

      // Setup theme switching functionality
      app.config.globalProperties.$theme = {
        current: theme,
        setTheme: (newTheme: Partial<ThemeConfig>) => {
          Object.assign(theme, newTheme)
          applyTheme(theme)
        },
        setMode: (mode: 'light' | 'dark' | 'auto') => {
          theme.mode = mode
          applyTheme(theme)
        },
        toggleMode: () => {
          theme.mode = theme.mode === 'light' ? 'dark' : 'light'
          applyTheme(theme)
        }
      }
    }
  }
}

function applyTheme(theme: ThemeConfig) {
  const root = document.documentElement
  const tokens = getThemeTokens(theme)

  // Remove existing theme classes
  root.classList.remove('cui-light', 'cui-dark', 'cui-tailwind', 'cui-scss', 'cui-material', 'cui-css')

  // Add new theme classes
  root.classList.add(`cui-${theme.mode}`)
  root.classList.add(`cui-${theme.framework}`)

  // Apply CSS variables
  const cssVars = generateCSSVariables(tokens)
  Object.entries(cssVars).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })

  // Apply custom properties if provided
  if (theme.customProperties) {
    Object.entries(theme.customProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })
  }

  // Framework-specific setup
  switch (theme.framework) {
    case 'tailwind':
      setupTailwindTheme(theme, tokens)
      break
    case 'scss':
      setupScssTheme(theme, tokens)
      break
    case 'material':
      setupMaterialTheme(theme, tokens)
      break
    case 'css':
      setupCssTheme(theme, tokens)
      break
  }

  // Emit theme change event
  window.dispatchEvent(new CustomEvent('cui-theme-change', {
    detail: { theme, tokens }
  }))
}

function setupTailwindTheme(theme: ThemeConfig, tokens: any) {
  // Tailwind-specific theme setup
  // This would integrate with Tailwind's CSS variables
  const tailwindColors = {
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    success: tokens.colors.success,
    warning: tokens.colors.warning,
    error: tokens.colors.error,
    neutral: tokens.colors.neutral
  }

  // Apply Tailwind color variables
  Object.entries(tailwindColors).forEach(([name, shades]) => {
    if (typeof shades === 'object') {
      Object.entries(shades).forEach(([shade, value]) => {
        document.documentElement.style.setProperty(`--tw-color-${name}-${shade}`, value as string)
      })
    }
  })
}

function setupScssTheme(theme: ThemeConfig, tokens: any) {
  // SCSS-specific theme setup
  // Generate SCSS variables as CSS custom properties
  const scssVars = {
    // Colors
    '$primary': tokens.colors.primary[500],
    '$secondary': tokens.colors.secondary[500],
    '$success': tokens.colors.success[500],
    '$warning': tokens.colors.warning[500],
    '$error': tokens.colors.error[500],

    // Typography
    '$font-family-base': tokens.typography.fontFamily.sans,
    '$font-size-base': tokens.typography.fontSize.base,
    '$font-weight-normal': tokens.typography.fontWeight.normal,
    '$font-weight-bold': tokens.typography.fontWeight.bold,

    // Spacing
    '$spacing-xs': tokens.spacing[1],
    '$spacing-sm': tokens.spacing[2],
    '$spacing-md': tokens.spacing[4],
    '$spacing-lg': tokens.spacing[6],
    '$spacing-xl': tokens.spacing[8],

    // Border radius
    '$border-radius-sm': tokens.borderRadius.sm,
    '$border-radius-base': tokens.borderRadius.base,
    '$border-radius-lg': tokens.borderRadius.lg,

    // Shadows
    '$shadow-sm': tokens.shadows.sm,
    '$shadow-base': tokens.shadows.base,
    '$shadow-lg': tokens.shadows.lg
  }

  Object.entries(scssVars).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--cui-scss-${name.replace('$', '')}`, value)
  })
}

function setupMaterialTheme(theme: ThemeConfig, tokens: any) {
  // Material Design theme setup
  const materialVars = {
    '--md-sys-color-primary': tokens.colors.primary[500],
    '--md-sys-color-on-primary': tokens.colors.text.inverse,
    '--md-sys-color-primary-container': tokens.colors.primary[100],
    '--md-sys-color-on-primary-container': tokens.colors.primary[900],

    '--md-sys-color-secondary': tokens.colors.secondary[500],
    '--md-sys-color-on-secondary': tokens.colors.text.inverse,
    '--md-sys-color-secondary-container': tokens.colors.secondary[100],
    '--md-sys-color-on-secondary-container': tokens.colors.secondary[900],

    '--md-sys-color-surface': tokens.colors.surface.primary,
    '--md-sys-color-on-surface': tokens.colors.text.primary,
    '--md-sys-color-surface-variant': tokens.colors.surface.secondary,
    '--md-sys-color-on-surface-variant': tokens.colors.text.secondary,

    '--md-sys-color-background': tokens.colors.background.primary,
    '--md-sys-color-on-background': tokens.colors.text.primary,

    '--md-sys-color-error': tokens.colors.error[500],
    '--md-sys-color-on-error': tokens.colors.text.inverse,
    '--md-sys-color-error-container': tokens.colors.error[100],
    '--md-sys-color-on-error-container': tokens.colors.error[900]
  }

  Object.entries(materialVars).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value)
  })
}

function setupCssTheme(theme: ThemeConfig, tokens: any) {
  // Pure CSS theme setup - already handled by CSS variables
  // Additional CSS-specific customizations can go here

  // Apply CSS Grid and Flexbox utilities
  const cssUtilities = {
    '--cui-grid-cols-1': 'repeat(1, minmax(0, 1fr))',
    '--cui-grid-cols-2': 'repeat(2, minmax(0, 1fr))',
    '--cui-grid-cols-3': 'repeat(3, minmax(0, 1fr))',
    '--cui-grid-cols-4': 'repeat(4, minmax(0, 1fr))',
    '--cui-grid-cols-6': 'repeat(6, minmax(0, 1fr))',
    '--cui-grid-cols-12': 'repeat(12, minmax(0, 1fr))'
  }

  Object.entries(cssUtilities).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value)
  })
}

// Auto-detect system theme preference
export function detectSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

// Watch for system theme changes
export function watchSystemTheme(callback: (isDark: boolean) => void) {
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handler = (e: MediaQueryListEvent) => {
      callback(e.matches)
    }

    mediaQuery.addEventListener('change', handler)

    // Return cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }

  return () => {}
}
