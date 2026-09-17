import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'

const root = fileURLToPath(new URL('./', import.meta.url))

const alias = {
  '@': fileURLToPath(new URL('./src', import.meta.url)),
  '@lib': fileURLToPath(new URL('./lib', import.meta.url)),
}

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['lib/**/*.{ts,vue}'],
      exclude: [
        'lib/**/__tests__/**',
        'lib/**/*.stories.ts',
        'lib/**/*.types.ts',
      ],
    },
    projects: [
      {
        plugins: [vue()],
        resolve: { alias },
        test: {
          name: 'unit',
          root,
          environment: 'jsdom',
          include: ['lib/**/__tests__/**/*.spec.ts'],
          exclude: ['**/*.browser.spec.ts', 'e2e/**'],
          setupFiles: ['./lib/test/setup.ts', './lib/test/setup.a11y.ts'],
        },
      },
      {
        plugins: [vue()],
        resolve: { alias },
        test: {
          name: 'browser',
          root,
          include: ['lib/**/__tests__/**/*.browser.spec.ts'],
          setupFiles: ['./lib/test/setup.browser.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
