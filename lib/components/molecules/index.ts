// Molecules - Component combinations
export { default as CCard } from './card/CCard.vue'
export { default as CModal } from './modal/CModal.vue'
export { default as CToast } from './toast/CToast.vue'
export { default as CFormField } from './form-field/CFormField.vue'
export { default as CDropdown } from './dropdown/CDropdown.vue'
export { default as CTabs } from './tabs/CTabs.vue'
export { default as CTabPanel } from './tabs/CTabPanel.vue'
export { default as CSelect } from './select/CSelect.vue'
export { default as CMultiSelect } from './multiselect/CMultiSelect.vue'
export { default as CTextarea } from './textarea/CTextarea.vue'
export { default as CFileUpload } from './file-upload/CFileUpload.vue'
export { default as CDatePicker } from './date-picker/CDatePicker.vue'
export { default as CTimePicker } from './time-picker/CTimePicker.vue'
export { default as CColorPicker } from './color-picker/CColorPicker.vue'
export { default as CNumberInput } from './number-input/CNumberInput.vue'
export { default as CSearchInput } from './search-input/CSearchInput.vue'
export { default as CPasswordInput } from './password-input/CPasswordInput.vue'
export { default as CPinInput } from './pin-input/CPinInput.vue'
export { default as CFormLabel } from './form-label/CFormLabel.vue'
export { default as CFormHelperText } from './form-helper-text/CFormHelperText.vue'
export { default as CFormErrorMessage } from './form-error-message/CFormErrorMessage.vue'
export { default as CFieldset } from './fieldset/CFieldset.vue'
export { default as CInputGroup } from './input-group/CInputGroup.vue'
export { default as CBreadcrumb } from './breadcrumb/CBreadcrumb.vue'
export { default as CPagination } from './pagination/CPagination.vue'
export { default as CSteps } from './steps/CSteps.vue'
export { default as CMenu } from './menu/CMenu.vue'
export { default as CContextMenu } from './context-menu/CContextMenu.vue'
export { default as CAlert } from './alert/CAlert.vue'
export { default as CNotification } from './notification/CNotification.vue'
export { default as CPopover } from './popover/CPopover.vue'
export { default as CTooltip } from './tooltip/CTooltip.vue'
export { default as CDialog } from './dialog/CDialog.vue'
export { default as CDrawer } from './drawer/CDrawer.vue'
export { default as CSheet } from './sheet/CSheet.vue'

// Type exports for molecules
export type * from './card/CCard.types'
export type * from './modal/CModal.types'
export type * from './toast/CToast.types'
export type * from './form-field/CFormField.types'
export type * from './dropdown/CDropdown.types'
export type * from './tabs/CTabs.types'
export type * from './select/CSelect.types'
export type * from './multiselect/CMultiSelect.types'
export type * from './textarea/CTextarea.types'
export type * from './file-upload/CFileUpload.types'
export type * from './date-picker/CDatePicker.types'
export type * from './time-picker/CTimePicker.types'
export type * from './color-picker/CColorPicker.types'
export type * from './number-input/CNumberInput.types'
export type * from './search-input/CSearchInput.types'
export type * from './password-input/CPasswordInput.types'
export type * from './pin-input/CPinInput.types'
export type * from './form-label/CFormLabel.types'
export type * from './form-helper-text/CFormHelperText.types'
export type * from './form-error-message/CFormErrorMessage.types'
export type * from './fieldset/CFieldset.types'
export type * from './input-group/CInputGroup.types'
export type * from './breadcrumb/CBreadcrumb.types'
export type * from './pagination/CPagination.types'
export type * from './steps/CSteps.types'
export type * from './menu/CMenu.types'
export type * from './context-menu/CContextMenu.types'
export type * from './alert/CAlert.types'
export type * from './notification/CNotification.types'
export type * from './popover/CPopover.types'
export type * from './tooltip/CTooltip.types'
export type * from './dialog/CDialog.types'
export type * from './drawer/CDrawer.types'
export type * from './sheet/CSheet.types'

// Molecules collection for bulk operations
export const MOLECULES = {
  CCard,
  CModal,
  CToast,
  CFormField,
  CDropdown,
  CTabs,
  CTabPanel,
  CSelect,
  CMultiSelect,
  CTextarea,
  CFileUpload,
  CDatePicker,
  CTimePicker,
  CColorPicker,
  CNumberInput,
  CSearchInput,
  CPasswordInput,
  CPinInput,
  CFormLabel,
  CFormHelperText,
  CFormErrorMessage,
  CFieldset,
  CInputGroup,
  CBreadcrumb,
  CPagination,
  CSteps,
  CMenu,
  CContextMenu,
  CAlert,
  CNotification,
  CPopover,
  CTooltip,
  CDialog,
  CDrawer,
  CSheet
} as const

// Molecule categories for better organization
export const FORM_MOLECULES = {
  CFormField,
  CSelect,
  CMultiSelect,
  CTextarea,
  CFileUpload,
  CDatePicker,
  CTimePicker,
  CColorPicker,
  CNumberInput,
  CSearchInput,
  CPasswordInput,
  CPinInput,
  CFormLabel,
  CFormHelperText,
  CFormErrorMessage,
  CFieldset,
  CInputGroup
} as const

export const NAVIGATION_MOLECULES = {
  CTabs,
  CTabPanel,
  CBreadcrumb,
  CPagination,
  CSteps,
  CMenu,
  CContextMenu
} as const

export const OVERLAY_MOLECULES = {
  CModal,
  CDialog,
  CDrawer,
  CSheet,
  CPopover,
  CTooltip,
  CDropdown
} as const

export const FEEDBACK_MOLECULES = {
  CToast,
  CAlert,
  CNotification
} as const

export const DISPLAY_MOLECULES = {
  CCard
} as const
