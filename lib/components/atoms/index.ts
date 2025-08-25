// Atoms - Basic building blocks
export { default as CButton } from './button/CButton.vue'
export { default as CInput } from './input/CInput.vue'
export { default as CIcon } from './icon/CIcon.vue'
export { default as CBadge } from './badge/CBadge.vue'
export { default as CAvatar } from './avatar/CAvatar.vue'
export { default as CSpinner } from './spinner/CSpinner.vue'
export { default as CDivider } from './divider/CDivider.vue'
export { default as CCheckbox } from './checkbox/CCheckbox.vue'
export { default as CRadio } from './radio/CRadio.vue'
export { default as CSwitch } from './switch/CSwitch.vue'
export { default as CSlider } from './slider/CSlider.vue'
export { default as CProgress } from './progress/CProgress.vue'
export { default as CHeading } from './heading/CHeading.vue'
export { default as CText } from './text/CText.vue'
export { default as CCode } from './code/CCode.vue'
export { default as CLink } from './link/CLink.vue'
export { default as CKbd } from './kbd/CKbd.vue'

// Type exports for atoms
export type * from './button/CButton.types'
export type * from './input/CInput.types'
export type * from './icon/CIcon.types'
export type * from './badge/CBadge.types'
export type * from './avatar/CAvatar.types'
export type * from './spinner/CSpinner.types'
export type * from './divider/CDivider.types'
export type * from './checkbox/CCheckbox.types'
export type * from './radio/CRadio.types'
export type * from './switch/CSwitch.types'
export type * from './slider/CSlider.types'
export type * from './progress/CProgress.types'
export type * from './heading/CHeading.types'
export type * from './text/CText.types'
export type * from './code/CCode.types'
export type * from './link/CLink.types'
export type * from './kbd/CKbd.types'

// Atoms collection for bulk operations
export const ATOMS = {
  CButton,
  CInput,
  CIcon,
  CBadge,
  CAvatar,
  CSpinner,
  CDivider,
  CCheckbox,
  CRadio,
  CSwitch,
  CSlider,
  CProgress,
  CHeading,
  CText,
  CCode,
  CLink,
  CKbd
} as const

// Atom categories for better organization
export const FORM_ATOMS = {
  CInput,
  CCheckbox,
  CRadio,
  CSwitch,
  CSlider
} as const

export const DISPLAY_ATOMS = {
  CHeading,
  CText,
  CCode,
  CBadge,
  CAvatar,
  CIcon
} as const

export const FEEDBACK_ATOMS = {
  CSpinner,
  CProgress
} as const

export const LAYOUT_ATOMS = {
  CDivider
} as const

export const INTERACTIVE_ATOMS = {
  CButton,
  CLink,
  CKbd
} as const
