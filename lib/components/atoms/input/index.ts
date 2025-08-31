export { default as CInput } from './CInput.vue'
export { default as CInputHeadless } from './CInputHeadless.vue'
export type * from './CInput.types'
export * from './composables'

// Re-export composables for convenience
export { useInput, useInputHeadless, useInputStyles } from './composables'
