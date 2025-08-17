import type { Component } from 'vue'

// Base component props that all components should extend
export interface BaseComponentProps {
  variant?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  theme?: 'light' | 'dark' | 'auto'
  disabled?: boolean
  loading?: boolean
  class?: string
  style?: Record<string, any>
}

// Theme configuration types
export interface ThemeConfig {
  framework: 'tailwind' | 'scss' | 'css' | 'material'
  mode: 'light' | 'dark' | 'auto'
  tokens: Record<string, any>
  customProperties?: Record<string, string>
}

export interface ThemeTokens {
  colors: {
    primary: Record<string, string>
    secondary: Record<string, string>
    success: Record<string, string>
    warning: Record<string, string>
    error: Record<string, string>
    neutral: Record<string, string>
    background: Record<string, string>
    surface: Record<string, string>
    text: Record<string, string>
    border: Record<string, string>
  }
  spacing: Record<string, string>
  typography: {
    fontFamily: Record<string, string>
    fontSize: Record<string, string>
    fontWeight: Record<string, string>
    lineHeight: Record<string, string>
  }
  borderRadius: Record<string, string>
  shadows: Record<string, string>
  transitions: Record<string, string>
}

// Icon system types
export type IconProvider = 'fontawesome' | 'material' | 'heroicons' | 'lucide' | 'custom'
export type IconFormat = 'svg' | 'font' | 'img'

export interface IconConfig {
  provider: IconProvider
  format: IconFormat
  prefix?: string
  customIcons?: Record<string, string | Component>
}

// Component-specific types
export interface ButtonProps extends BaseComponentProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  leftIcon?: string
  rightIcon?: string
  iconOnly?: boolean
  fullWidth?: boolean
  rounded?: boolean
}

export interface InputProps extends BaseComponentProps {
  modelValue?: string | number
  type?: string
  placeholder?: string
  label?: string
  helperText?: string
  errorMessage?: string
  required?: boolean
  readonly?: boolean
  clearable?: boolean
  prefixIcon?: string
  suffixIcon?: string
  debounce?: number
}

export interface CardProps extends BaseComponentProps {
  variant?: 'elevated' | 'outlined' | 'filled'
  padding?: boolean | string
  hoverable?: boolean
  clickable?: boolean
}

export interface ModalProps extends BaseComponentProps {
  modelValue?: boolean
  title?: string
  persistent?: boolean
  fullscreen?: boolean
  maxWidth?: string
  scrollable?: boolean
  closeOnEscape?: boolean
  closeOnClickOutside?: boolean
}

// Toast system types
export interface ToastOptions {
  id?: string
  title?: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  persistent?: boolean
  action?: {
    label: string
    handler: () => void
  }
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

// Plugin configuration
export interface CelestialUIOptions {
  theme?: ThemeConfig
  icons?: IconConfig
  globalComponents?: boolean
  prefix?: string
  toast?: {
    position?: ToastOptions['position']
    duration?: number
  }
}

// Utility types
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ComponentVariant = string
export type ComponentTheme = 'light' | 'dark' | 'auto'

// Animation types
export interface AnimationConfig {
  duration?: number
  easing?: string
  delay?: number
}

// Responsive types
export interface ResponsiveValue<T> {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
}

// Form validation types
export interface ValidationRule {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  custom?: (value: any) => boolean | string
}

export interface FormFieldProps extends BaseComponentProps {
  name?: string
  rules?: ValidationRule[]
  validateOn?: 'input' | 'blur' | 'submit'
}
