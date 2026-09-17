import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import pluginPlaywright from 'eslint-plugin-playwright'
import { configs as storybookConfigs } from 'eslint-plugin-storybook'
import oxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/storybook-static/**',
      '**/.lostpixel/**',
      '**/lost-pixel/**',
      '**/test-results/**',
      '**/playwright-report/**',
      '**/blob-report/**',
    ],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['lib/**/__tests__/**/*.{ts,tsx}', 'src/**/__tests__/**'],
  },

  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.ts'],
  },

  ...storybookConfigs['flat/recommended'],
  {
    name: 'storybook/existing-vue3-imports',
    files: ['**/*.stories.ts'],
    rules: {
      // Stories already import Meta/StoryObj from @storybook/vue3 (SB 10 renderer).
      'storybook/no-renderer-packages': 'off',
    },
  },

  oxlint.configs['flat/recommended'],
  skipFormatting,
]
