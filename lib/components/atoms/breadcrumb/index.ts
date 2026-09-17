/**
 * CBreadcrumb Component Export
 *
 * Exports the breadcrumb component and its related types and utilities.
 * This is the main entry point for the breadcrumb component package.
 */

export { default as CBreadcrumb } from './CBreadcrumb.vue'
export {
  useBreadcrumb,
  createBreadcrumbFromPath,
  createBreadcrumbFromRoutes,
} from './composables/useBreadcrumb'
export type {
  BreadcrumbItem,
  CBreadcrumbProps,
  CBreadcrumbEmits,
  CBreadcrumbSlots,
  UseBreadcrumbReturn,
  UseBreadcrumbOptions,
} from './CBreadcrumb.types'
