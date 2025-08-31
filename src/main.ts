import './assets/main.css'
import '../lib/themes/base.css'
import 'tailwindcss/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import CelestialUI
import CelestialUI from '../lib/index'
import { defaultTokens } from '../lib/themes'

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
