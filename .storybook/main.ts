import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../lib/**/*.mdx', '../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  base: process.env.NODE_ENV === 'production' ? '/CelestialUI-Vue/storybook/' : '/',
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    config.build ??= {}
    // Storybook bundles axe, docs renderer, and CSwitch icon data — expected >500kB chunks.
    config.build.chunkSizeWarningLimit = 1600
    return config
  },
}

export default config
