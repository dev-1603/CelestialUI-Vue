import './assets/main.css'
import '../lib/themes/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import CelestialUI
import CelestialUI from '../lib/index'
import { createThemePlugin } from '../lib/plugins/theme'
import { createIconPlugin } from '../lib/plugins/icon'

// Import toast container
import CToastContainer from '../lib/components/feedback/toast/CToastContainer.vue'

const app = createApp(App)

// Configure CelestialUI
app.use(CelestialUI, {
  theme: {
    framework: 'css',
    mode: 'light',
    tokens: {}
  },
  icons: {
    provider: 'fontawesome',
    format: 'font'
  },
  globalComponents: true
})

// Add router
app.use(router)

// Mount toast container
const toastContainer = createApp(CToastContainer)
const toastDiv = document.createElement('div')
toastDiv.id = 'cui-toast-container'
document.body.appendChild(toastDiv)
toastContainer.mount(toastDiv)

app.mount('#app')
