// Type definitions for CelestialUI

export interface CelestialUIOptions {
  theme?: {
    framework?: 'css' | 'tailwind'
    mode?: 'light' | 'dark' | 'system'
    tokens?: any
  }
  icons?: {
    provider?: 'fontawesome' | 'lucide' | 'heroicons' | 'custom'
    format?: 'font' | 'svg'
  }
  globalComponents?: boolean
}

// Component prop types
export interface BaseComponentProps {
  class?: string
  style?: string | object
  id?: string
}

// Common size type
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Common variant type
export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost'

// Export theme types
export type * from '../themes/tokens'








