// Molecules - Component combinations
// Only export components that actually exist

// Import existing components
// CToast component exists but temporarily disabled for clean build
// export { default as CToast } from './toast/CToast.vue'

// Type definitions for when components are implemented
export interface MolecularComponent {
  name: string
  implemented: boolean
  description: string
  category: 'form' | 'navigation' | 'overlay' | 'feedback' | 'display'
}

// Molecule registry for development tracking
export const MOLECULE_REGISTRY: MolecularComponent[] = [
  { name: 'CCard', implemented: false, description: 'Content container', category: 'display' },
  { name: 'CModal', implemented: false, description: 'Modal dialog', category: 'overlay' },
  { name: 'CToast', implemented: false, description: 'Toast notification', category: 'feedback' },
  { name: 'CFormField', implemented: false, description: 'Complete form field', category: 'form' },
  { name: 'CDropdown', implemented: false, description: 'Dropdown menu', category: 'overlay' },
  { name: 'CTabs', implemented: false, description: 'Tab navigation', category: 'navigation' },
  { name: 'CTabPanel', implemented: false, description: 'Tab content panel', category: 'navigation' },
  { name: 'CSelect', implemented: false, description: 'Selection dropdown', category: 'form' },
  { name: 'CMultiSelect', implemented: false, description: 'Multiple selection', category: 'form' },
  { name: 'CTextarea', implemented: false, description: 'Multi-line text input', category: 'form' },
  { name: 'CFileUpload', implemented: false, description: 'File upload component', category: 'form' },
  { name: 'CDatePicker', implemented: false, description: 'Date selection', category: 'form' },
  { name: 'CTimePicker', implemented: false, description: 'Time selection', category: 'form' },
  { name: 'CColorPicker', implemented: false, description: 'Color selection', category: 'form' },
  { name: 'CNumberInput', implemented: false, description: 'Numeric input', category: 'form' },
  { name: 'CSearchInput', implemented: false, description: 'Search input field', category: 'form' },
  { name: 'CPasswordInput', implemented: false, description: 'Password input field', category: 'form' },
  { name: 'CPinInput', implemented: false, description: 'PIN code input', category: 'form' },
  { name: 'CFormLabel', implemented: false, description: 'Form field label', category: 'form' },
  { name: 'CFormHelperText', implemented: false, description: 'Form help text', category: 'form' },
  { name: 'CFormErrorMessage', implemented: false, description: 'Form error message', category: 'form' },
  { name: 'CFieldset', implemented: false, description: 'Form fieldset', category: 'form' },
  { name: 'CInputGroup', implemented: false, description: 'Input group container', category: 'form' },
  { name: 'CBreadcrumb', implemented: false, description: 'Navigation breadcrumb', category: 'navigation' },
  { name: 'CPagination', implemented: false, description: 'Page navigation', category: 'navigation' },
  { name: 'CSteps', implemented: false, description: 'Step indicator', category: 'navigation' },
  { name: 'CMenu', implemented: false, description: 'Menu component', category: 'navigation' },
  { name: 'CContextMenu', implemented: false, description: 'Context menu', category: 'overlay' },
  { name: 'CAlert', implemented: false, description: 'Alert message', category: 'feedback' },
  { name: 'CNotification', implemented: false, description: 'Notification message', category: 'feedback' },
  { name: 'CPopover', implemented: false, description: 'Popover overlay', category: 'overlay' },
  { name: 'CTooltip', implemented: false, description: 'Tooltip overlay', category: 'overlay' },
  { name: 'CDialog', implemented: false, description: 'Dialog component', category: 'overlay' },
  { name: 'CDrawer', implemented: false, description: 'Drawer panel', category: 'overlay' },
  { name: 'CSheet', implemented: false, description: 'Bottom sheet', category: 'overlay' }
]

// Collections - only include implemented components
export const MOLECULES = {
  // No components implemented yet
} as const

// Category collections
export const FORM_MOLECULES = {} as const
export const NAVIGATION_MOLECULES = {} as const
export const OVERLAY_MOLECULES = {} as const
export const FEEDBACK_MOLECULES = {
  // No feedback components implemented yet
} as const
export const DISPLAY_MOLECULES = {} as const

// Helper functions
export function getMoleculeStatus(name: string): MolecularComponent | undefined {
  return MOLECULE_REGISTRY.find(molecule => molecule.name === name)
}

export function getImplementedMolecules(): MolecularComponent[] {
  return MOLECULE_REGISTRY.filter(molecule => molecule.implemented)
}

export function getPendingMolecules(): MolecularComponent[] {
  return MOLECULE_REGISTRY.filter(molecule => !molecule.implemented)
}

export function getMoleculesByCategory(category: MolecularComponent['category']): MolecularComponent[] {
  return MOLECULE_REGISTRY.filter(molecule => molecule.category === category)
}
