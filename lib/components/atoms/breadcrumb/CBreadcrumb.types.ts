import type { VNode, ComputedRef } from 'vue'

/**
 * Represents a single breadcrumb item
 */
export interface BreadcrumbItem {
  /** Unique identifier for the breadcrumb item */
  id: string | number
  /** Display text for the breadcrumb item */
  label: string
  /** URL or route path for navigation */
  href?: string
  /** Whether this item is disabled */
  disabled?: boolean
  /** Additional data associated with the item */
  data?: Record<string, any>
}

/**
 * Props for the CBreadcrumb component
 */
export interface CBreadcrumbProps {
  /** Array of breadcrumb items to display */
  items: BreadcrumbItem[]
  /** Separator between breadcrumb items (string or Vue VNode) */
  separator?: string | VNode
  /** Maximum number of items to show before truncation */
  maxItems?: number
  /** Whether to show the home/root item */
  showHome?: boolean
  /** Custom home item configuration */
  homeItem?: BreadcrumbItem
  /** CSS class for the breadcrumb container */
  class?: string
  /** Whether to use compact spacing */
  compact?: boolean
  /** ARIA label for the breadcrumb navigation */
  ariaLabel?: string
}

/**
 * Events emitted by the CBreadcrumb component
 */
export interface CBreadcrumbEmits {
  /** Emitted when a breadcrumb item is clicked */
  (e: 'navigate', item: BreadcrumbItem, index: number): void
  /** Emitted when the home item is clicked */
  (e: 'home', item: BreadcrumbItem): void
}

/**
 * Slots available in the CBreadcrumb component
 */
export interface CBreadcrumbSlots {
  /** Custom content for individual breadcrumb items */
  item: (props: { item: BreadcrumbItem; index: number; isLast: boolean; isActive: boolean }) => any
  /** Custom separator between breadcrumb items */
  separator: () => any
  /** Custom home item content */
  home: (props: { item: BreadcrumbItem }) => any
}

/**
 * Return type for the useBreadcrumb composable
 */
export interface UseBreadcrumbReturn {
  /** Processed breadcrumb items with truncation logic applied */
  processedItems: ComputedRef<BreadcrumbItem[]>
  /** Whether items are truncated */
  isTruncated: ComputedRef<boolean>
  /** Handle navigation to a breadcrumb item */
  handleNavigate: (item: BreadcrumbItem, index: number) => void
  /** Handle home navigation */
  handleHome: (item: BreadcrumbItem) => void
  /** Get ARIA attributes for accessibility */
  getAriaAttributes: () => Record<string, string>
}

/**
 * Options for the useBreadcrumb composable
 */
export interface UseBreadcrumbOptions {
  /** Maximum number of items to show before truncation */
  maxItems?: number
  /** Whether to show the home/root item */
  showHome?: boolean
  /** Custom home item configuration */
  homeItem?: BreadcrumbItem
  /** Callback for navigation events */
  onNavigate?: (item: BreadcrumbItem, index: number) => void
  /** Callback for home navigation events */
  onHome?: (item: BreadcrumbItem) => void
}
