// Design tokens for CelestialUI
export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950?: string
}

export interface DesignTokens {
  colors: {
    primary: ColorScale
    gray: ColorScale
    success: ColorScale
    warning: ColorScale
    danger: ColorScale
    [key: string]: ColorScale
  }
  fonts: {
    sans: string
    serif: string
    mono: string
  }
  fontSizes: Record<string, string>
  fontWeights: Record<string, number>
  lineHeights: Record<string, number>
  space: Record<string, string>
  radii: Record<string, string>
  shadows: Record<string, string>
  zIndices: Record<string, number | string>
}

export interface SemanticTokens {
  colors: {
    background: Record<string, string>
    text: Record<string, string>
    border: Record<string, string>
  }
}








