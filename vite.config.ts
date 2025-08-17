import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

/**
 AutoImport({
  // targets to transform
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/,
    /\.vue\?vue/, // .vue
    /\.md$/, // .md
  ],

  // global imports to register
  imports: [
    // presets
    'vue',
    'vue-router',
    // custom
    {
      '@vueuse/core': [
        // named imports
        'useMouse', // import { useMouse } from '@vueuse/core',
        // alias
        ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
      ],
      'axios': [
        // default imports
        ['default', 'axios'], // import { default as axios } from 'axios',
      ],
      '[package-name]': [
        '[import-names]',
        // alias
        ['[from]', '[alias]'],
      ],
    },
    // example type import
    {
      from: 'vue-router',
      imports: ['RouteLocationRaw'],
      type: true,
    },
  ],

  // Array of strings of regexes that contains imports meant to be filtered out.
  ignore: [
    'useMouse',
    'useFetch'
  ],

  // Enable auto import by filename for default module exports under directories
  defaultExportByFilename: false,

  // Options for scanning directories for auto import
  dirsScanOptions: {
    types: true // Enable auto import the types under the directories
  },

  // Auto import for module exports under directories
  // by default it only scan one level of modules under the directory
  dirs: [
    './hooks',
    './composables', // only root modules
    './composables/**', // all nested modules
    // ...

    {
      glob: './hooks',
      types: true // enable import the types
    },
    {
      glob: './composables',
      types: false // If top level dirsScanOptions.types importing enabled, just only disable this directory
    }
    // ...
  ],

  // Filepath to generate corresponding .d.ts file.
  // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
  // Set `false` to disable.
  dts: './auto-imports.d.ts',

  // Array of strings of regexes that contains imports meant to be ignored during
  // the declaration file generation. You may find this useful when you need to provide
  // a custom signature for a function.
  ignoreDts: [
    'ignoredFunction',
    /^ignore_/
  ],

  // Auto import inside Vue template
  // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
  vueTemplate: false,

  // Auto import directives inside Vue template
  // see https://github.com/unjs/unimport/pull/374
  vueDirectives: undefined,

  // Custom resolvers, compatible with `unplugin-vue-components`
  // see https://github.com/antfu/unplugin-auto-import/pull/23/
  resolvers: [
    ...
  ],

  // Include auto-imported packages in Vite's `optimizeDeps` options
  // Recommend to enable
  viteOptimizeDeps: true,

  // Inject the imports at the end of other imports
  injectAtEnd: true,

  // Generate corresponding .eslintrc-auto-import.json file.
  // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
  eslintrc: {
    enabled: false, // Default `false`
    // provide path ending with `.mjs` or `.cjs` to generate the file with the respective format
    filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
    globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
  },

  // Generate corresponding .biomelintrc-auto-import.json file.
  // biomejs extends Docs - https://biomejs.dev/guides/how-biome-works/#the-extends-option
  biomelintrc: {
    enabled: false, // Default `false`
    filepath: './.biomelintrc-auto-import.json', // Default `./.biomelintrc-auto-import.json`
  },

  // Save unimport items into a JSON file for other tools to consume
  dumpUnimportItems: './auto-imports.json', // Default `false`
})
 */
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({ dumpUnimportItems: './auto-imports.json',
      // Include auto-imported packages in Vite's `optimizeDeps` options
      // Recommend to enable
      viteOptimizeDeps: true,
      imports: [
        'vue'
      ],

      // Inject the imports at the end of other imports
      injectAtEnd: true, }),
    Components({
      // relative paths to the directory to search for components.
      dirs: ['src/components'],

      // valid file extensions for components.
      extensions: ['vue'],

      // Glob patterns to match file names to be detected as components.
      // When specified, the `dirs`, `extensions`, and `directoryAsNamespace` options will be ignored.
      // If you want to exclude components being registered, use negative globs with leading `!`.
      globs: ['src/components/*.{vue}'],

      // search for subdirectories
      deep: true,

      // resolvers for custom components
      resolvers: [],

      // generate `components.d.ts` global declarations,
      // also accepts a path for custom filename
      // default: `true` if package typescript is installed
      dts: false,

      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: false,

      // Collapse same prefixes (camel-sensitive) of folders and components
      // to prevent duplication inside namespaced component name.
      // works when `directoryAsNamespace: true`
      collapseSamePrefixes: false,

      // Subdirectory paths for ignoring namespace prefixes.
      // works when `directoryAsNamespace: true`
      globalNamespaces: [],

      // auto import for directives
      // default: `true` for Vue 3, `false` for Vue 2
      // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
      // To install Babel, run: `npm install -D @babel/parser`
      directives: true,

      // Transform path before resolving
      importPathTransform: v => v,

      // Allow for components to override other components with the same name
      allowOverrides: false,

      // Filters for transforming targets (components to insert the auto import)
      // Note these are NOT about including/excluding components registered - use `globs` or `excludeNames` for that
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],

      // Filters for component names that will not be imported
      // Use for globally imported async components or other conflicts that the plugin cannot detect
      excludeNames: [/^Async.+/],

      // Vue version of project. It will detect automatically if not specified.
      // Acceptable value: 2 | 2.7 | 3
      // version: 2.7,

      // Only provide types of components in library (registered globally)
      types: []
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
