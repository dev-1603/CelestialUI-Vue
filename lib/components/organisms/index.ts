// Organisms - Complex UI patterns
// Only export components that actually exist

// Type definitions for when components are implemented
export interface OrganismComponent {
  name: string
  implemented: boolean
  description: string
  category: 'data' | 'media' | 'layout' | 'form'
}

// Organism registry for development tracking
export const ORGANISM_REGISTRY: OrganismComponent[] = [
  { name: 'CTable', implemented: false, description: 'Data table', category: 'data' },
  { name: 'CDataTable', implemented: false, description: 'Advanced data table', category: 'data' },
  { name: 'CVirtualTable', implemented: false, description: 'Virtualized table', category: 'data' },
  { name: 'CList', implemented: false, description: 'List component', category: 'data' },
  { name: 'CInfiniteScroll', implemented: false, description: 'Infinite scroll list', category: 'data' },
  { name: 'CImage', implemented: false, description: 'Responsive image', category: 'media' },
  { name: 'CCarousel', implemented: false, description: 'Image carousel', category: 'media' },
  { name: 'CGallery', implemented: false, description: 'Image gallery', category: 'media' },
  { name: 'CVideoPlayer', implemented: false, description: 'Video player', category: 'media' },
  { name: 'CContainer', implemented: false, description: 'Layout container', category: 'layout' },
  { name: 'CStack', implemented: false, description: 'Stack layout', category: 'layout' },
  { name: 'CGrid', implemented: false, description: 'Grid layout', category: 'layout' },
  { name: 'CFlex', implemented: false, description: 'Flex layout', category: 'layout' },
  { name: 'CBox', implemented: false, description: 'Box component', category: 'layout' },
  { name: 'CCenter', implemented: false, description: 'Center alignment', category: 'layout' },
  { name: 'CSpacer', implemented: false, description: 'Spacing component', category: 'layout' },
  { name: 'CSidebar', implemented: false, description: 'Sidebar navigation', category: 'layout' },
  { name: 'CHeader', implemented: false, description: 'Page header', category: 'layout' },
  { name: 'CFooter', implemented: false, description: 'Page footer', category: 'layout' },
  { name: 'CAppShell', implemented: false, description: 'Application shell', category: 'layout' },
  { name: 'CFormWizard', implemented: false, description: 'Multi-step form', category: 'form' },
  { name: 'CFormBuilder', implemented: false, description: 'Dynamic form builder', category: 'form' },
  { name: 'CSurvey', implemented: false, description: 'Survey component', category: 'form' },
  { name: 'CAutocomplete', implemented: false, description: 'Autocomplete input', category: 'form' },
  { name: 'CComboBox', implemented: false, description: 'Combo box component', category: 'form' },
  { name: 'CMention', implemented: false, description: 'Mention input', category: 'form' },
  { name: 'CTagInput', implemented: false, description: 'Tag input field', category: 'form' }
]

// Empty collections for now - will be populated as components are implemented
export const ORGANISMS = {} as const

export const DATA_ORGANISMS = {} as const
export const MEDIA_ORGANISMS = {} as const
export const LAYOUT_ORGANISMS = {} as const
export const FORM_ORGANISMS = {} as const

// Helper functions
export function getOrganismStatus(name: string): OrganismComponent | undefined {
  return ORGANISM_REGISTRY.find(organism => organism.name === name)
}

export function getImplementedOrganisms(): OrganismComponent[] {
  return ORGANISM_REGISTRY.filter(organism => organism.implemented)
}

export function getPendingOrganisms(): OrganismComponent[] {
  return ORGANISM_REGISTRY.filter(organism => !organism.implemented)
}

export function getOrganismsByCategory(category: OrganismComponent['category']): OrganismComponent[] {
  return ORGANISM_REGISTRY.filter(organism => organism.category === category)
}
