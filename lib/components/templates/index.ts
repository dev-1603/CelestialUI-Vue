// Templates - Layout patterns
// Only export components that actually exist

// Type definitions for when components are implemented
export interface TemplateComponent {
  name: string
  implemented: boolean
  description: string
  category: 'page-layout' | 'navigation'
}

// Template registry for development tracking
export const TEMPLATE_REGISTRY: TemplateComponent[] = [
  { name: 'CDashboardLayout', implemented: false, description: 'Dashboard page layout', category: 'page-layout' },
  { name: 'CAdminLayout', implemented: false, description: 'Admin panel layout', category: 'page-layout' },
  { name: 'CAuthLayout', implemented: false, description: 'Authentication layout', category: 'page-layout' },
  { name: 'CLandingLayout', implemented: false, description: 'Landing page layout', category: 'page-layout' },
  { name: 'CErrorLayout', implemented: false, description: 'Error page layout', category: 'page-layout' },
  { name: 'CAppBar', implemented: false, description: 'Application bar', category: 'navigation' },
  { name: 'CNavigationRail', implemented: false, description: 'Navigation rail', category: 'navigation' },
  { name: 'CBottomNavigation', implemented: false, description: 'Bottom navigation', category: 'navigation' },
  { name: 'CSideNavigation', implemented: false, description: 'Side navigation', category: 'navigation' }
]

// Empty collections for now - will be populated as components are implemented
export const TEMPLATES = {} as const

export const PAGE_LAYOUTS = {} as const
export const NAVIGATION_TEMPLATES = {} as const

// Helper functions
export function getTemplateStatus(name: string): TemplateComponent | undefined {
  return TEMPLATE_REGISTRY.find(template => template.name === name)
}

export function getImplementedTemplates(): TemplateComponent[] {
  return TEMPLATE_REGISTRY.filter(template => template.implemented)
}

export function getPendingTemplates(): TemplateComponent[] {
  return TEMPLATE_REGISTRY.filter(template => !template.implemented)
}

export function getTemplatesByCategory(category: TemplateComponent['category']): TemplateComponent[] {
  return TEMPLATE_REGISTRY.filter(template => template.category === category)
}
