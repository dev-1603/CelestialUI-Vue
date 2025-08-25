// Organisms - Complex UI patterns
export { default as CTable } from './table/CTable.vue'
export { default as CDataTable } from './data-table/CDataTable.vue'
export { default as CVirtualTable } from './virtual-table/CVirtualTable.vue'
export { default as CList } from './list/CList.vue'
export { default as CInfiniteScroll } from './infinite-scroll/CInfiniteScroll.vue'
export { default as CImage } from './image/CImage.vue'
export { default as CCarousel } from './carousel/CCarousel.vue'
export { default as CGallery } from './gallery/CGallery.vue'
export { default as CVideoPlayer } from './video-player/CVideoPlayer.vue'
export { default as CContainer } from './container/CContainer.vue'
export { default as CStack } from './stack/CStack.vue'
export { default as CGrid } from './grid/CGrid.vue'
export { default as CFlex } from './flex/CFlex.vue'
export { default as CBox } from './box/CBox.vue'
export { default as CCenter } from './center/CCenter.vue'
export { default as CSpacer } from './spacer/CSpacer.vue'
export { default as CSidebar } from './sidebar/CSidebar.vue'
export { default as CHeader } from './header/CHeader.vue'
export { default as CFooter } from './footer/CFooter.vue'
export { default as CAppShell } from './app-shell/CAppShell.vue'
export { default as CFormWizard } from './form-wizard/CFormWizard.vue'
export { default as CFormBuilder } from './form-builder/CFormBuilder.vue'
export { default as CSurvey } from './survey/CSurvey.vue'
export { default as CAutocomplete } from './autocomplete/CAutocomplete.vue'
export { default as CComboBox } from './combo-box/CComboBox.vue'
export { default as CMention } from './mention/CMention.vue'
export { default as CTagInput } from './tag-input/CTagInput.vue'

// Type exports for organisms
export type * from './table/CTable.types'
export type * from './data-table/CDataTable.types'
export type * from './virtual-table/CVirtualTable.types'
export type * from './list/CList.types'
export type * from './infinite-scroll/CInfiniteScroll.types'
export type * from './image/CImage.types'
export type * from './carousel/CCarousel.types'
export type * from './gallery/CGallery.types'
export type * from './video-player/CVideoPlayer.types'
export type * from './container/CContainer.types'
export type * from './stack/CStack.types'
export type * from './grid/CGrid.types'
export type * from './flex/CFlex.types'
export type * from './box/CBox.types'
export type * from './center/CCenter.types'
export type * from './spacer/CSpacer.types'
export type * from './sidebar/CSidebar.types'
export type * from './header/CHeader.types'
export type * from './footer/CFooter.types'
export type * from './app-shell/CAppShell.types'
export type * from './form-wizard/CFormWizard.types'
export type * from './form-builder/CFormBuilder.types'
export type * from './survey/CSurvey.types'
export type * from './autocomplete/CAutocomplete.types'
export type * from './combo-box/CComboBox.types'
export type * from './mention/CMention.types'
export type * from './tag-input/CTagInput.types'

// Organisms collection for bulk operations
export const ORGANISMS = {
  CTable,
  CDataTable,
  CVirtualTable,
  CList,
  CInfiniteScroll,
  CImage,
  CCarousel,
  CGallery,
  CVideoPlayer,
  CContainer,
  CStack,
  CGrid,
  CFlex,
  CBox,
  CCenter,
  CSpacer,
  CSidebar,
  CHeader,
  CFooter,
  CAppShell,
  CFormWizard,
  CFormBuilder,
  CSurvey,
  CAutocomplete,
  CComboBox,
  CMention,
  CTagInput
} as const

// Organism categories for better organization
export const DATA_ORGANISMS = {
  CTable,
  CDataTable,
  CVirtualTable,
  CList,
  CInfiniteScroll
} as const

export const MEDIA_ORGANISMS = {
  CImage,
  CCarousel,
  CGallery,
  CVideoPlayer
} as const

export const LAYOUT_ORGANISMS = {
  CContainer,
  CStack,
  CGrid,
  CFlex,
  CBox,
  CCenter,
  CSpacer,
  CSidebar,
  CHeader,
  CFooter,
  CAppShell
} as const

export const FORM_ORGANISMS = {
  CFormWizard,
  CFormBuilder,
  CSurvey,
  CAutocomplete,
  CComboBox,
  CMention,
  CTagInput
} as const
