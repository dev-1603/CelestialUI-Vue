import type { Component, ComputedRef } from 'vue'
import type { VNode } from 'vue'

export interface CCardProps {
  /** Card content - explicit children prop */
  children?: string

  /** Whether card has elevated shadow */
  elevated?: boolean

  /** Whether card has outlined border */
  outlined?: boolean

  /** Whether card is hoverable */
  hoverable?: boolean

  /** Semantic HTML tag to render as */
  as?: 'section' | 'article' | 'div' | 'aside' | 'main' | 'header' | 'footer'

  /** Tab index for keyboard navigation */
  tabIndex?: number

  /** Accessibility label */
  ariaLabel?: string

  /** Accessibility description */
  ariaDescribedBy?: string

  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg'

  /** Border radius */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'

  /** Maximum width */
  maxWidth?: string | number

  /** Height */
  height?: string | number

  /** Loading state */
  loading?: boolean

  /** Whether card is interactive (clickable/focusable) */
  interactive?: boolean

  /** Custom CSS class */
  class?: string

  /** Custom CSS styles */
  style?: string | Record<string, any>
}

export interface CCardEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'mouseenter', event: MouseEvent): void
  (e: 'mouseleave', event: MouseEvent): void
}

export interface CCardSlots {
  /** Header slot for title, subtitle, avatar, actions */
  header(): VNode | VNode[] | undefined
  /** Main content/body slot */
  default(): VNode | VNode[] | undefined
  /** Media slot for images, videos, etc. */
  media(): VNode | VNode[] | undefined
  /** Footer slot for buttons, links, CTA */
  footer(): VNode | VNode[] | undefined
  /** Overlay slot for skeleton, loader */
  overlay(): VNode | VNode[] | undefined
  /** Actions slot for secondary actions */
  actions(): VNode | VNode[] | undefined
}

export interface UseCardReturn {
  cardComponent: Component | string
  isInteractive: ComputedRef<boolean>
  handleClick: (event: MouseEvent) => void
  handleKeydown: (event: KeyboardEvent) => void
  computedTabIndex: ComputedRef<number>
  computedAriaLabel: ComputedRef<string | undefined>
}

export interface UseCardStylesReturn {
  cardClasses: ComputedRef<string[]>
  headerClasses: ComputedRef<string[]>
  bodyClasses: ComputedRef<string[]>
  footerClasses: ComputedRef<string[]>
  mediaClasses: ComputedRef<string[]>
  overlayClasses: ComputedRef<string[]>
}

// Theme-specific card variants
export type CardPadding = CCardProps['padding']
export type CardRadius = CCardProps['radius']
export type CardAs = CCardProps['as']

// Component registry entry
export interface CardComponentInfo {
  name: 'CCard'
  category: 'atoms'
  description: 'Highly composable, accessible container with header, body, footer, and media regions'
  props: CCardProps
  emits: CCardEmits
  slots: CCardSlots
}
