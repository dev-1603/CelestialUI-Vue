import { defineNuxtConfig } from 'nuxt/config'
import type { ModuleOptions } from './lib/plugins/nuxt'

export default defineNuxtConfig({
  // Module definition for CelestialUI
  modules: [
    // Add the module inline for development
    async (options, nuxt) => {
      const moduleOptions: ModuleOptions = {
        ...options,
        prefix: 'C',
        components: true,
        css: true
      }

      // Add plugin
      nuxt.options.plugins = nuxt.options.plugins || []
      nuxt.options.plugins.push({
        src: '~/lib/plugins/nuxt.ts',
        mode: 'all'
      })

      // Add CSS if enabled
      if (moduleOptions.css) {
        nuxt.options.css = nuxt.options.css || []
        nuxt.options.css.push('~/lib/themes/index.css')
      }

      // Auto-import components
      if (moduleOptions.components) {
        const { addComponent } = await import('@nuxt/kit')

        const components = [
          'CButton',
          'CInput',
          'CCard',
          'CIcon',
          'CModal',
          'CToast'
        ]

        components.forEach(name => {
          addComponent({
            name,
            filePath: `~/lib/components/ui/${name.toLowerCase().slice(1)}/${name}.vue`
          })
        })
      }

      // Add runtime config
      nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || {}
      nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
      nuxt.options.runtimeConfig.public.celestialui = moduleOptions
    }
  ],

  // Development configuration
  devtools: { enabled: true },

  // CSS configuration
  css: [
    '~/lib/themes/base.css'
  ],

  // Vite configuration
  vite: {
    resolve: {
      alias: {
        '@celestialui': './lib'
      }
    }
  },

  // TypeScript configuration
  typescript: {
    typeCheck: true
  }
})
