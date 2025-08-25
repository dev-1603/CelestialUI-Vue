import './assets/main.css'
import '../lib/themes/base.css'
import 'tailwindcss/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import CelestialUI
import CelestialUI from '../lib/index'
import { createThemePlugin } from '../lib/plugins/theme'
import { createIconPlugin } from '../lib/plugins/icon'
import { defaultTokens } from '../lib/themes'
// Import toast container
import CToastContainer from '../lib/components/feedback/toast/CToastContainer.vue'

const app = createApp(App)

// Configure CelestialUI
app.use(CelestialUI, {
  theme: {
    framework: 'css',
    mode: 'light',
    tokens: defaultTokens
  },
  icons: {
    provider: 'fontawesome',
    format: 'font'
  },
  globalComponents: true
})

// Add router
app.use(router)

app.mount('#app')
