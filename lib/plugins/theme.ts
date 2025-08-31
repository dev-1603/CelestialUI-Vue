// Theme plugin for CelestialUI
import type { App, Plugin } from 'vue'

export interface ThemePluginOptions {
  framework?: 'css' | 'tailwind'
  mode?: 'light' | 'dark' | 'system'
  tokens?: Record<string, string | number>
  cssVarPrefix?: string
}

export function createThemePlugin(options: ThemePluginOptions = {}): Plugin {
  return {
    install(app: App) {
      const {
        framework = 'css',
        mode = 'light',
        tokens = {},
        cssVarPrefix = 'cui'
      } = options

      // Create theme manager
      const themeManager = {
        currentTheme: mode as 'light' | 'dark' | 'system',
        framework,
        tokens,
        cssVarPrefix,

        setTheme(theme: 'light' | 'dark' | 'system') {
          this.currentTheme = theme
          document.documentElement.setAttribute('data-theme', theme)

          // Apply CSS variables if using CSS framework
          if (framework === 'css') {
            this.applyCSSVariables(theme)
          }
        },

        getTheme() {
          return this.currentTheme
        },

        applyCSSVariables(theme: string) {
          const root = document.documentElement

          // Apply theme-specific CSS variables
          if (theme === 'dark') {
            root.style.setProperty('--cui-color-background-base', '#111827')
            root.style.setProperty('--cui-color-text-primary', '#f9fafb')
            // Add more dark theme variables as needed
          } else {
            root.style.setProperty('--cui-color-background-base', '#ffffff')
            root.style.setProperty('--cui-color-text-primary', '#111827')
            // Add more light theme variables as needed
          }
        },

        detectSystemTheme() {
          if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
          }
          return 'light'
        }
      }

      // Set initial theme
      if (mode === 'system') {
        themeManager.setTheme(themeManager.detectSystemTheme())
      } else {
        themeManager.setTheme(mode)
      }

      // Watch for system theme changes
      if (typeof window !== 'undefined' && mode === 'system') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          themeManager.setTheme(e.matches ? 'dark' : 'light')
        })
      }

      // Provide theme manager
      app.provide('celestialui-theme', themeManager)
      app.config.globalProperties.$theme = themeManager
    }
  }
}






