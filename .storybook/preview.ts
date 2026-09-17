import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createThemePlugin } from '../lib/plugins/theme'
import { createIconPlugin } from '../lib/plugins/icon'
import '../lib/themes/base.css'
import '../src/assets/main.css'
import 'tailwindcss/tailwind.css'

setup((app) => {
  app.use(createThemePlugin({ mode: 'light' }))
  app.use(createIconPlugin())
})

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#111827' },
        { name: 'celestial', value: '#0f0f23' },
        { name: 'gray', value: '#f3f4f6' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Global default: report in UI only. CI gates axe on stories tagged `a11y-smoke`.
      test: 'todo',
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light Theme', icon: 'sun' },
          { value: 'dark', title: 'Dark Theme', icon: 'moon' },
          { value: 'celestial', title: 'Celestial Theme', icon: 'star' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light'

      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme)
        if (theme === 'dark' || theme === 'celestial') {
          document.documentElement.classList.add('dark', 'cui-dark')
          document.documentElement.classList.remove('light')
        } else {
          document.documentElement.classList.remove('dark', 'cui-dark')
          document.documentElement.classList.add('light')
        }
      }

      return {
        template: `
          <div 
            class="celestial-storybook-preview min-h-[60px] w-full p-4 rounded transition-colors duration-200"
            :class="[
              theme === 'dark' ? 'dark cui-dark bg-gray-900 text-gray-100' : 
              theme === 'celestial' ? 'dark cui-dark bg-[#0f0f23] text-gray-100' : 
              'bg-white text-gray-900'
            ]"
            :data-theme="theme"
          >
            <story />
          </div>
        `,
        setup() {
          return { theme }
        },
      }
    },
  ],
}

export default preview

