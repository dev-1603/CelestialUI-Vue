import type { App } from 'vue'
import type { CelestialUIOptions } from './types'

// Import core components
import CButton from './components/ui/button/CButton.vue'
import CInput from './components/ui/input/CInput.vue'
import CCard from './components/ui/card/CCard.vue'
import CIcon from './components/ui/icon/CIcon.vue'
import CModal from './components/ui/modal/CModal.vue'
import CToast from './components/feedback/toast/CToast.vue'

// Import composables
import { useTheme } from './composables/useTheme'
import { useToast } from './composables/useToast'
import { useModal } from './composables/useModal'

// Import plugins
import { createThemePlugin } from './plugins/theme'
import { createIconPlugin } from './plugins/icon'

// Component exports
export {
  CButton,
  CInput,
  CCard,
  CIcon,
  CModal,
  CToast
}

// Composable exports
export {
  useTheme,
  useToast,
  useModal
}

// Plugin exports
export {
  createThemePlugin,
  createIconPlugin
}

// Type exports
export type * from './types'

// Default components map
const components = {
  CButton,
  CInput,
  CCard,
  CIcon,
  CModal,
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
