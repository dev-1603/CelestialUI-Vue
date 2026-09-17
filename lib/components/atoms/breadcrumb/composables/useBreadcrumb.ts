import { computed, type ComputedRef } from 'vue'
import type {
  BreadcrumbItem,
  UseBreadcrumbOptions,
  UseBreadcrumbReturn,
} from '../CBreadcrumb.types'

/**
 * Default home item configuration
 */
const DEFAULT_HOME_ITEM: BreadcrumbItem = {
  id: 'home',
  label: 'Home',
  href: '/',
}

/**
 * Composable for breadcrumb functionality
 *
 * @param items - Array of breadcrumb items
 * @param options - Configuration options for the breadcrumb
 * @returns Breadcrumb state and methods
 *
 * @example
 * ```typescript
 * const { processedItems, handleNavigate, getAriaAttributes } = useBreadcrumb(
 *   breadcrumbItems,
 *   {
 *     maxItems: 5,
 *     showHome: true,
 *     onNavigate: (item, index) => console.log('Navigate to:', item)
 *   }
 * )
 * ```
 */
export function useBreadcrumb(
  items: ComputedRef<BreadcrumbItem[]> | BreadcrumbItem[],
  options: UseBreadcrumbOptions = {},
): UseBreadcrumbReturn {
  const {
    maxItems = 10,
    showHome = false,
    homeItem = DEFAULT_HOME_ITEM,
    onNavigate,
    onHome,
  } = options

  // Convert items to computed ref if it's not already
  const itemsRef = computed(() => (Array.isArray(items) ? items : items.value))

  /**
   * Process breadcrumb items with truncation logic
   */
  const processedItems = computed(() => {
    const allItems = [...itemsRef.value]

    // Add home item if enabled
    if (showHome) {
      allItems.unshift(homeItem)
    }

    // Apply truncation if needed
    if (allItems.length <= maxItems) {
      return allItems
    }

    // Truncate items in the middle, keeping first and last items
    const firstItem = allItems[0]
    const numLastItems = Math.max(1, maxItems - 2)
    const lastItems = allItems.slice(-numLastItems)

    // Create truncated middle section
    const truncatedMiddle: BreadcrumbItem = {
      id: 'truncated',
      label: '...',
      disabled: true,
    }

    return [firstItem, truncatedMiddle, ...lastItems]
  })

  /**
   * Check if items are truncated
   */
  const isTruncated = computed(() => {
    return itemsRef.value.length > maxItems
  })

  /**
   * Handle navigation to a breadcrumb item
   */
  const handleNavigate = (item: BreadcrumbItem, index: number): void => {
    if (item.disabled || item.id === 'truncated') {
      return
    }

    // Call the navigation callback
    onNavigate?.(item, index)

    // Emit navigation event
    if (item.href) {
      // Handle external links
      if (item.href.startsWith('http')) {
        window.open(item.href, '_blank', 'noopener,noreferrer')
      } else {
        // Handle internal navigation (could be router.push in a real app)
        window.location.href = item.href
      }
    }
  }

  /**
   * Handle home navigation
   */
  const handleHome = (item: BreadcrumbItem): void => {
    onHome?.(item)
    handleNavigate(item, 0)
  }

  /**
   * Get ARIA attributes for accessibility
   */
  const getAriaAttributes = (): Record<string, string> => {
    return {
      role: 'navigation',
      'aria-label': 'Breadcrumb navigation',
      'aria-current': 'page',
    }
  }

  return {
    processedItems,
    isTruncated,
    handleNavigate,
    handleHome,
    getAriaAttributes,
  }
}

/**
 * Utility function to create breadcrumb items from a path string
 *
 * @param path - Path string (e.g., '/users/123/profile')
 * @param basePath - Base path to prepend to all items
 * @returns Array of breadcrumb items
 *
 * @example
 * ```typescript
 * const items = createBreadcrumbFromPath('/users/123/profile', '/app')
 * // Returns: [
 * //   { id: 'users', label: 'Users', href: '/app/users' },
 * //   { id: '123', label: '123', href: '/app/users/123' },
 * //   { id: 'profile', label: 'Profile', href: '/app/users/123/profile' }
 * // ]
 * ```
 */
export function createBreadcrumbFromPath(path: string, basePath: string = ''): BreadcrumbItem[] {
  const segments = path.split('/').filter(Boolean)

  return segments.map((segment, index) => {
    const href = basePath + '/' + segments.slice(0, index + 1).join('/')
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)

    return {
      id: segment,
      label,
      href,
    }
  })
}

/**
 * Utility function to create breadcrumb items from route metadata
 *
 * @param routes - Array of route objects with path and meta information
 * @returns Array of breadcrumb items
 *
 * @example
 * ```typescript
 * const items = createBreadcrumbFromRoutes([
 *   { path: '/users', meta: { title: 'Users', breadcrumb: 'User Management' } },
 *   { path: '/users/123', meta: { title: 'User Details' } }
 * ])
 * ```
 */
export function createBreadcrumbFromRoutes(
  routes: Array<{ path: string; meta?: { title?: string; breadcrumb?: string } }>,
): BreadcrumbItem[] {
  return routes.map((route, index) => ({
    id: route.path,
    label: route.meta?.breadcrumb || route.meta?.title || route.path,
    href: route.path,
  }))
}
