import { defineNuxtPlugin } from '#app'
import type { CelestialUIOptions } from '../types'
import CelestialUI from '../index'

export default defineNuxtPlugin((nuxtApp) => {
  // Get options from runtime config or module options
  const options: CelestialUIOptions = nuxtApp.$config?.public?.celestialui || {}

  // Install CelestialUI
  nuxtApp.vueApp.use(CelestialUI, options)
})

// Nuxt module configuration
export interface ModuleOptions extends CelestialUIOptions {
  /**
   * Prefix for component registration
   * @default 'C'
   */
  prefix?: string

  /**
   * Components to auto-import
   * @default true (import all components)
   */
  components?: boolean | string[]

  /**
   * Whether to include CSS
   * @default true
   */
  css?: boolean

  /**
   * Theme configuration
   */
  theme?: CelestialUIOptions['theme']

  /**
   * Icon configuration
   */
  icons?: CelestialUIOptions['icons']
}

export const defaults: ModuleOptions = {
  prefix: 'C',
  components: true,
  css: true,
  globalComponents: true,
  theme: {
    framework: 'tailwind',
    mode: 'light',
    tokens: {}
  },
  icons: {
    provider: 'fontawesome',
    format: 'font'
  }
}
