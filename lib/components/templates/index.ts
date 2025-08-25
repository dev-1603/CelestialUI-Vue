// Templates - Layout patterns
export { default as CDashboardLayout } from './dashboard-layout/CDashboardLayout.vue'
export { default as CAdminLayout } from './admin-layout/CAdminLayout.vue'
export { default as CAuthLayout } from './auth-layout/CAuthLayout.vue'
export { default as CLandingLayout } from './landing-layout/CLandingLayout.vue'
export { default as CErrorLayout } from './error-layout/CErrorLayout.vue'
export { default as CAppBar } from './app-bar/CAppBar.vue'
export { default as CNavigationRail } from './navigation-rail/CNavigationRail.vue'
export { default as CBottomNavigation } from './bottom-navigation/CBottomNavigation.vue'
export { default as CSideNavigation } from './side-navigation/CSideNavigation.vue'

// Type exports for templates
export type * from './dashboard-layout/CDashboardLayout.types'
export type * from './admin-layout/CAdminLayout.types'
export type * from './auth-layout/CAuthLayout.types'
export type * from './landing-layout/CLandingLayout.types'
export type * from './error-layout/CErrorLayout.types'
export type * from './app-bar/CAppBar.types'
export type * from './navigation-rail/CNavigationRail.types'
export type * from './bottom-navigation/CBottomNavigation.types'
export type * from './side-navigation/CSideNavigation.types'

// Templates collection for bulk operations
export const TEMPLATES = {
  CDashboardLayout,
  CAdminLayout,
  CAuthLayout,
  CLandingLayout,
  CErrorLayout,
  CAppBar,
  CNavigationRail,
  CBottomNavigation,
  CSideNavigation
} as const

// Template categories for better organization
export const PAGE_LAYOUTS = {
  CDashboardLayout,
  CAdminLayout,
  CAuthLayout,
  CLandingLayout,
  CErrorLayout
} as const

export const NAVIGATION_TEMPLATES = {
  CAppBar,
  CNavigationRail,
  CBottomNavigation,
  CSideNavigation
} as const
