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

// Legacy component map for backward compatibility
const components = {
  // Core components that were previously exported
  CButton: ATOMS.CButton,
  CInput: ATOMS.CInput,
  CCard: MOLECULES.CCard,
  CIcon: ATOMS.CIcon,
  CModal: MOLECULES.CModal,
  CToast: MOLECULES.CToast
}

// Vue plugin install function
const CelestialUI = {
  install(app: App, options: CelestialUIOptions = {}) {
    // Install theme plugin
    if (options.theme) {
      console.trace('options.theme', options.theme)
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
