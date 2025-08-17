import type { ThemeConfig, ThemeTokens } from '../types'

// Default theme tokens
export const defaultTokens: ThemeTokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d'
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717'
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9'
    },
    surface: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      raised: '#ffffff'
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      disabled: '#94a3b8',
      inverse: '#ffffff'
    },
    border: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      focus: '#0ea5e9'
    }
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem'
  },
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    },
    fontWeight: {
      thin: '100',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    }
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
  },
  transitions: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '300ms ease',
    slower: '500ms ease'
  }
}

// Dark theme tokens
export const darkTokens: Partial<ThemeTokens> = {
  colors: {
    ...defaultTokens.colors,
    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155'
    },
    surface: {
      primary: '#1e293b',
      secondary: '#334155',
      raised: '#475569'
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
      disabled: '#64748b',
      inverse: '#0f172a'
    },
    border: {
      primary: '#334155',
      secondary: '#475569',
      focus: '#38bdf8'
    }
  }
}

// Theme configurations for different frameworks
export const tailwindTheme: ThemeConfig = {
  framework: 'tailwind',
  mode: 'light',
  tokens: defaultTokens
}

export const scssTheme: ThemeConfig = {
  framework: 'scss',
  mode: 'light',
  tokens: defaultTokens
}

export const materialTheme: ThemeConfig = {
  framework: 'material',
  mode: 'light',
  tokens: {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      primary: {
        50: '#e8f5e8',
        100: '#c8e6c9',
        200: '#a5d6a7',
        300: '#81c784',
        400: '#66bb6a',
        500: '#4caf50',
        600: '#43a047',
        700: '#388e3c',
        800: '#2e7d32',
        900: '#1b5e20'
      }
    }
  }
}

export const cssTheme: ThemeConfig = {
  framework: 'css',
  mode: 'light',
  tokens: defaultTokens,
  customProperties: {
    '--cui-primary': '#0ea5e9',
    '--cui-secondary': '#64748b',
    '--cui-success': '#22c55e',
    '--cui-warning': '#f59e0b',
    '--cui-error': '#ef4444',
    '--cui-background': '#ffffff',
    '--cui-surface': '#ffffff',
    '--cui-text': '#0f172a',
    '--cui-border': '#e2e8f0'
  }
}

// Theme utilities
export function createTheme(config: Partial<ThemeConfig> = {}): ThemeConfig {
  return {
    framework: config.framework || 'tailwind',
    mode: config.mode || 'light',
    tokens: config.tokens || defaultTokens,
    ...config
  }
}

export function getThemeTokens(theme: ThemeConfig): ThemeTokens {
  if (theme.mode === 'dark') {
    return {
      ...theme.tokens,
      colors: {
        ...theme.tokens.colors,
        ...darkTokens.colors
      }
    } as ThemeTokens
  }
  return theme.tokens as ThemeTokens
}

export function generateCSSVariables(tokens: ThemeTokens): Record<string, string> {
  const cssVars: Record<string, string> = {}

  // Generate color variables
  Object.entries(tokens.colors).forEach(([category, colors]) => {
    if (typeof colors === 'object') {
      Object.entries(colors).forEach(([shade, value]) => {
        cssVars[`--cui-color-${category}-${shade}`] = value
      })
    }
  })

  // Generate spacing variables
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    cssVars[`--cui-spacing-${key}`] = value
  })

  // Generate typography variables
  Object.entries(tokens.typography).forEach(([category, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      cssVars[`--cui-${category}-${key}`] = value
    })
  })

  // Generate other variables
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    cssVars[`--cui-radius-${key}`] = value
  })

  Object.entries(tokens.shadows).forEach(([key, value]) => {
    cssVars[`--cui-shadow-${key}`] = value
  })

  Object.entries(tokens.transitions).forEach(([key, value]) => {
    cssVars[`--cui-transition-${key}`] = value
  })

  return cssVars
}
