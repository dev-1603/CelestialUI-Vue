// TODO: Implement these components in phase 1
// Atoms - Basic building blocks
export { default as CButton } from './button/CButton.vue'
export { default as CIcon } from './icon/CIcon.vue'
export { default as CCheckbox } from './checkbox/CCheckbox.vue'
export { default as CInput } from './input/CInput.vue'
export { default as CInputHeadless } from './input/CInputHeadless.vue'
// export { default as CBadge } from './badge/CBadge.vue'
// export { default as CAvatar } from './avatar/CAvatar.vue'
// export { default as CSpinner } from './spinner/CSpinner.vue'
// export { default as CDivider } from './divider/CDivider.vue'
// export { default as CRadio } from './radio/CRadio.vue'
// export { default as CSwitch } from './switch/CSwitch.vue'
// export { default as CSlider } from './slider/CSlider.vue'
// export { default as CProgress } from './progress/CProgress.vue'
// export { default as CHeading } from './heading/CHeading.vue'
// export { default as CText } from './text/CText.vue'
// export { default as CCode } from './code/CCode.vue'
// export { default as CLink } from './link/CLink.vue'
// export { default as CKbd } from './kbd/CKbd.vue'

// Type exports for atoms
export type * from './button/CButton.types'
export type * from './icon/CIcon.types'
export type * from './checkbox/CCheckbox.types'
export type * from './input/CInput.types'
// export type * from './badge/CBadge.types'
// export type * from './avatar/CAvatar.types'
// export type * from './spinner/CSpinner.types'
// export type * from './divider/CDivider.types'
// export type * from './radio/CRadio.types'
// export type * from './switch/CSwitch.types'
// export type * from './slider/CSlider.types'
// export type * from './progress/CProgress.types'
// export type * from './heading/CHeading.types'
// export type * from './text/CText.types'
// export type * from './code/CCode.types'
// export type * from './link/CLink.types'
// export type * from './kbd/CKbd.types'

// Type definitions for when components are implemented
export interface AtomicComponent {
  name: string
  implemented: boolean
  description: string
}

// Atom registry for development tracking
export const ATOM_REGISTRY: AtomicComponent[] = [
  { name: 'CButton', implemented: true, description: 'Action trigger component' },
  { name: 'CInput', implemented: true, description: 'Text input field' },
  { name: 'CIcon', implemented: true, description: 'SVG icon component' },
  { name: 'CBadge', implemented: false, description: 'Status indicator' },
  { name: 'CAvatar', implemented: false, description: 'User profile image' },
  { name: 'CSpinner', implemented: false, description: 'Loading indicator' },
  { name: 'CDivider', implemented: false, description: 'Visual separator' },
  { name: 'CCheckbox', implemented: true, description: 'Boolean selection' },
  { name: 'CRadio', implemented: false, description: 'Single selection' },
  { name: 'CSwitch', implemented: false, description: 'Toggle control' },
  { name: 'CSlider', implemented: false, description: 'Range selection' },
  { name: 'CProgress', implemented: false, description: 'Progress indicator' },
  { name: 'CHeading', implemented: false, description: 'Semantic heading' },
  { name: 'CText', implemented: false, description: 'Body text' },
  { name: 'CCode', implemented: false, description: 'Code snippet' },
  { name: 'CLink', implemented: false, description: 'Navigation link' },
  { name: 'CKbd', implemented: false, description: 'Keyboard shortcut' }// Atoms collection for bulk operations
]
// export const ATOMS = {
//   CButton,
//   CInput,
//   CIcon,
//   CBadge,
//   CAvatar,
//   CSpinner,
//   CDivider,
//   CCheckbox,
//   CRadio,
//   CSwitch,
//   CSlider,
//   CProgress,
//   CHeading,
//   CText,
//   CCode,
//   CLink,
//   CKbd
// } as const

// Import implemented components
import CButton from './button/CButton.vue'
import CIcon from './icon/CIcon.vue'
import CCheckbox from './checkbox/CCheckbox.vue'
import CInput from './input/CInput.vue'
import CInputHeadless from './input/CInputHeadless.vue'

// Collections for implemented components
export const ATOMS = {
  CButton,
  CIcon,
  CCheckbox,
  CInput,
  CInputHeadless
} as const

export const FORM_ATOMS = {
  CCheckbox,
  CInput,
  CInputHeadless
} as const
export const DISPLAY_ATOMS = {} as const
export const FEEDBACK_ATOMS = {} as const
export const LAYOUT_ATOMS = {} as const
export const INTERACTIVE_ATOMS = {} as const

// Helper function to get component status
export function getAtomStatus(name: string): AtomicComponent | undefined {
  return ATOM_REGISTRY.find(atom => atom.name === name)
}

// Helper function to get implemented atoms
export function getImplementedAtoms(): AtomicComponent[] {
  return ATOM_REGISTRY.filter(atom => atom.implemented)
}

// Helper function to get pending atoms
export function getPendingAtoms(): AtomicComponent[] {
  return ATOM_REGISTRY.filter(atom => !atom.implemented)
}
