import type { App } from 'vue'
import type { CelestialUIOptions } from './types'

// Modular component exports
export * from './components/atoms'
export * from './components/molecules'
export * from './components/organisms'
export * from './components/templates'

// Composable exports
export * from './composables'

// Plugin exports
export * from './plugins'

// Theme exports
export * from './themes'

// Utility exports
export * from './utils'

// Type exports
export type * from './types'

// Import plugins directly
import { createThemePlugin } from './plugins/theme'
import { createIconPlugin } from './plugins/icon'

// Collections for easy access
import { ATOMS } from './components/atoms'
import { MOLECULES } from './components/molecules'
import { ORGANISMS } from './components/organisms'
import { TEMPLATES } from './components/templates'

// All components collection
export const ALL_COMPONENTS = {
  ...ATOMS,
  ...MOLECULES,
  ...ORGANISMS,
  ...TEMPLATES
} as const

// Component categories
export const COMPONENT_CATEGORIES = {
  atoms: ATOMS,
  molecules: MOLECULES,
  organisms: ORGANISMS,
  templates: TEMPLATES
} as const

// Import existing components for backward compatibility
import CToast from './components/molecules/toast/CToast.vue'

// Legacy component map for backward compatibility
const components = {
  CToast
}

// Vue plugin install function
const CelestialUI = {
  install(app: App, options: CelestialUIOptions = {}) {
    // Install theme plugin
    if (options.theme) {
      app.use(createThemePlugin(options.theme))
    }

    // Install icon plugin
    if (options.icons) {
      app.use(createIconPlugin(options.icons))
    }

    // Register all components globally if specified
    if (options.globalComponents !== false) {
      Object.entries(components).forEach(([name, component]) => {
        app.component(name, component)
      })
    }

    // Provide global options
    app.provide('celestialui-options', options)
  }
}

export default CelestialUI
