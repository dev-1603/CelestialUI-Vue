import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    // Temporarily disable DTS generation
    // dts({
    //   include: ['lib/**/*'],
    //   exclude: ['src/**/*', 'tests/**/*'],
    //   insertTypesEntry: true,
    //   rollupTypes: false
    // }),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'CelestialUI',
      formats: ['es', 'umd'],
      fileName: (format) => `celestial-ui.${format}.js`
    },

        rollupOptions: {
      // Externalize deps that shouldn't be bundled into the library
      external: ['vue', 'vue-router'],

      output: {
        // Fix named/default export issue
        exports: 'named',

        // Provide global variables for externalized deps in UMD build
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter'
        },

        // Ensure CSS is extracted
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'style.css'
          }
          return assetInfo.name || 'assets/[name].[ext]'
        }
      }
    },

    // Generate source maps
    sourcemap: true,

    // Disable minification for now
    minify: false,

    // Target modern browsers
    target: 'esnext',

    // Clear output directory
    emptyOutDir: true
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib')
    }
  },

  // CSS configuration
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
