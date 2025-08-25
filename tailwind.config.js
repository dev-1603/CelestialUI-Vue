/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CelestialUI Color System
        primary: {
          25: 'var(--cui-color-primary-25)',
          50: 'var(--cui-color-primary-50)',
          100: 'var(--cui-color-primary-100)',
          200: 'var(--cui-color-primary-200)',
          300: 'var(--cui-color-primary-300)',
          400: 'var(--cui-color-primary-400)',
          500: 'var(--cui-color-primary-500)',
          600: 'var(--cui-color-primary-600)',
          700: 'var(--cui-color-primary-700)',
          800: 'var(--cui-color-primary-800)',
          900: 'var(--cui-color-primary-900)',
        },
        secondary: {
          25: 'var(--cui-color-secondary-25)',
          50: 'var(--cui-color-secondary-50)',
          100: 'var(--cui-color-secondary-100)',
          200: 'var(--cui-color-secondary-200)',
          300: 'var(--cui-color-secondary-300)',
          400: 'var(--cui-color-secondary-400)',
          500: 'var(--cui-color-secondary-500)',
          600: 'var(--cui-color-secondary-600)',
          700: 'var(--cui-color-secondary-700)',
          800: 'var(--cui-color-secondary-800)',
          900: 'var(--cui-color-secondary-900)',
        },
        success: {
          25: 'var(--cui-color-success-25)',
          50: 'var(--cui-color-success-50)',
          100: 'var(--cui-color-success-100)',
          200: 'var(--cui-color-success-200)',
          300: 'var(--cui-color-success-300)',
          400: 'var(--cui-color-success-400)',
          500: 'var(--cui-color-success-500)',
          600: 'var(--cui-color-success-600)',
          700: 'var(--cui-color-success-700)',
          800: 'var(--cui-color-success-800)',
          900: 'var(--cui-color-success-900)',
        },
        warning: {
          25: 'var(--cui-color-warning-25)',
          50: 'var(--cui-color-warning-50)',
          100: 'var(--cui-color-warning-100)',
          200: 'var(--cui-color-warning-200)',
          300: 'var(--cui-color-warning-300)',
          400: 'var(--cui-color-warning-400)',
          500: 'var(--cui-color-warning-500)',
          600: 'var(--cui-color-warning-600)',
          700: 'var(--cui-color-warning-700)',
          800: 'var(--cui-color-warning-800)',
          900: 'var(--cui-color-warning-900)',
        },
        error: {
          25: 'var(--cui-color-error-25)',
          50: 'var(--cui-color-error-50)',
          100: 'var(--cui-color-error-100)',
          200: 'var(--cui-color-error-200)',
          300: 'var(--cui-color-error-300)',
          400: 'var(--cui-color-error-400)',
          500: 'var(--cui-color-error-500)',
          600: 'var(--cui-color-error-600)',
          700: 'var(--cui-color-error-700)',
          800: 'var(--cui-color-error-800)',
          900: 'var(--cui-color-error-900)',
        },
        info: {
          25: 'var(--cui-color-info-25)',
          50: 'var(--cui-color-info-50)',
          100: 'var(--cui-color-info-100)',
          200: 'var(--cui-color-info-200)',
          300: 'var(--cui-color-info-300)',
          400: 'var(--cui-color-info-400)',
          500: 'var(--cui-color-info-500)',
          600: 'var(--cui-color-info-600)',
          700: 'var(--cui-color-info-700)',
          800: 'var(--cui-color-info-800)',
          900: 'var(--cui-color-info-900)',
        },
        // Background colors
        background: {
          base: 'var(--cui-color-background-base)',
          surface: 'var(--cui-color-background-surface)',
          secondary: 'var(--cui-color-background-secondary)',
          tertiary: 'var(--cui-color-background-tertiary)',
        },
        // Text colors
        text: {
          primary: 'var(--cui-color-text-primary)',
          secondary: 'var(--cui-color-text-secondary)',
          muted: 'var(--cui-color-text-muted)',
          inverse: 'var(--cui-color-text-inverse)',
        },
        // Border colors
        border: {
          base: 'var(--cui-color-border-base)',
          light: 'var(--cui-color-border-light)',
          strong: 'var(--cui-color-border-strong)',
        },
      },
      spacing: {
        // CelestialUI Spacing System
        'cui-xs': 'var(--cui-spacing-xs)',
        'cui-sm': 'var(--cui-spacing-sm)',
        'cui-md': 'var(--cui-spacing-md)',
        'cui-lg': 'var(--cui-spacing-lg)',
        'cui-xl': 'var(--cui-spacing-xl)',
        'cui-2xl': 'var(--cui-spacing-2xl)',
        'cui-3xl': 'var(--cui-spacing-3xl)',
      },
      borderRadius: {
        // CelestialUI Border Radius System
        'cui-sm': 'var(--cui-border-radius-sm)',
        'cui-md': 'var(--cui-border-radius-md)',
        'cui-lg': 'var(--cui-border-radius-lg)',
        'cui-xl': 'var(--cui-border-radius-xl)',
        'cui-full': 'var(--cui-border-radius-full)',
      },
      fontSize: {
        // CelestialUI Typography System
        'cui-xs': ['var(--cui-font-size-xs)', { lineHeight: 'var(--cui-line-height-xs)' }],
        'cui-sm': ['var(--cui-font-size-sm)', { lineHeight: 'var(--cui-line-height-sm)' }],
        'cui-md': ['var(--cui-font-size-md)', { lineHeight: 'var(--cui-line-height-md)' }],
        'cui-lg': ['var(--cui-font-size-lg)', { lineHeight: 'var(--cui-line-height-lg)' }],
        'cui-xl': ['var(--cui-font-size-xl)', { lineHeight: 'var(--cui-line-height-xl)' }],
        'cui-2xl': ['var(--cui-font-size-2xl)', { lineHeight: 'var(--cui-line-height-2xl)' }],
        'cui-3xl': ['var(--cui-font-size-3xl)', { lineHeight: 'var(--cui-line-height-3xl)' }],
      },
      fontFamily: {
        // CelestialUI Font Family System
        'cui-sans': 'var(--cui-font-family-sans)',
        'cui-serif': 'var(--cui-font-family-serif)',
        'cui-mono': 'var(--cui-font-family-mono)',
      },
      fontWeight: {
        // CelestialUI Font Weight System
        'cui-light': 'var(--cui-font-weight-light)',
        'cui-normal': 'var(--cui-font-weight-normal)',
        'cui-medium': 'var(--cui-font-weight-medium)',
        'cui-semibold': 'var(--cui-font-weight-semibold)',
        'cui-bold': 'var(--cui-font-weight-bold)',
      },
      boxShadow: {
        // CelestialUI Shadow System
        'cui-sm': 'var(--cui-shadow-sm)',
        'cui-md': 'var(--cui-shadow-md)',
        'cui-lg': 'var(--cui-shadow-lg)',
        'cui-xl': 'var(--cui-shadow-xl)',
        'cui-2xl': 'var(--cui-shadow-2xl)',
      },
      zIndex: {
        // CelestialUI Z-Index System
        'cui-dropdown': 'var(--cui-z-index-dropdown)',
        'cui-sticky': 'var(--cui-z-index-sticky)',
        'cui-fixed': 'var(--cui-z-index-fixed)',
        'cui-modal': 'var(--cui-z-index-modal)',
        'cui-popover': 'var(--cui-z-index-popover)',
        'cui-tooltip': 'var(--cui-z-index-tooltip)',
        'cui-toast': 'var(--cui-z-index-toast)',
      },
    },
  },
  plugins: [],
  darkMode: ['class', '.cui-dark'],
}

