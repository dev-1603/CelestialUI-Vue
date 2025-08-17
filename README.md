# 🌟 CelestialUI Vue

A comprehensive **Vue 3 component library** with multi-framework styling support and full compatibility with Vue 3 ecosystem and Nuxt 3/4 applications.

[![npm version](https://badge.fury.io/js/@celestial-ui%2Fvue.svg)](https://badge.fury.io/js/@celestial-ui%2Fvue)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Multi-Framework Styling**: Support for Tailwind CSS, SCSS, Material Design, and pure CSS
- 🔧 **Vue 3 & Nuxt Ready**: Built specifically for Vue 3 with full Nuxt 3/4 compatibility
- 🎯 **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- ♿ **Accessibility Focused**: WCAG compliant components with keyboard navigation
- 🎭 **Universal Icon System**: Support for FontAwesome, Material Icons, Heroicons, Lucide, and custom SVGs
- 📱 **Responsive Design**: Mobile-first approach with responsive utilities
- 🌓 **Dark Mode**: Built-in theme switching capabilities
- 🧪 **Well Tested**: Comprehensive unit, integration, and E2E tests
- 📖 **Storybook Integration**: Interactive component documentation
- 🔥 **Tree Shakeable**: Optimized bundle sizes with selective imports

## 🚀 Quick Start

### Installation

```bash
# npm
npm install @celestial-ui/vue

# yarn
yarn add @celestial-ui/vue

# pnpm
pnpm add @celestial-ui/vue
```

### Basic Usage

```typescript
// main.ts - Vue 3 setup
import { createApp } from 'vue'
import App from './App.vue'
import CelestialUI from '@celestial-ui/vue'
import '@celestial-ui/vue/style.css'

const app = createApp(App)

// Register CelestialUI Vue components globally
app.use(CelestialUI, {
  theme: {
    framework: 'tailwind', // 'tailwind' | 'scss' | 'material' | 'css'
    mode: 'light' // 'light' | 'dark' | 'auto'
  },
  icons: {
    provider: 'fontawesome', // 'fontawesome' | 'material' | 'heroicons' | 'lucide'
    format: 'font' // 'font' | 'svg' | 'img'
  }
})

app.mount('#app')
```

### Vue Component Usage

```vue
<template>
  <div>
    <!-- Vue Button Components -->
    <CButton variant="primary" size="lg" left-icon="star">
      Primary Button
    </CButton>
    
    <!-- Vue Input Component with v-model -->
    <CInput
      v-model="email"
      label="Email Address"
      type="email"
      prefix-icon="envelope"
      clearable
    />
    
    <!-- Vue Card Component with slots -->
    <CCard title="Card Title" subtitle="Card subtitle" hoverable>
      <p>Card content goes here...</p>
      <template #footer>
        <CButton size="sm">Action</CButton>
      </template>
    </CCard>
    
    <!-- Vue Modal with v-model binding -->
    <CModal v-model="showModal" title="Modal Title">
      <p>Modal content...</p>
      <template #footer>
        <CButton @click="showModal = false">Close</CButton>
      </template>
    </CModal>
  </div>
</template>

<script setup lang="ts">
// Vue 3 Composition API
import { ref } from 'vue'

const email = ref('')
const showModal = ref(false)
</script>
```

## 🎨 Styling Frameworks

### Tailwind CSS

```typescript
app.use(CelestialUI, {
  theme: {
    framework: 'tailwind',
    mode: 'light'
  }
})
```

### SCSS

```typescript
app.use(CelestialUI, {
  theme: {
    framework: 'scss',
    mode: 'light'
  }
})
```

### Material Design

```typescript
app.use(CelestialUI, {
  theme: {
    framework: 'material',
    mode: 'light'
  }
})
```

### Pure CSS

```typescript
app.use(CelestialUI, {
  theme: {
    framework: 'css',
    mode: 'light',
    customProperties: {
      '--cui-primary': '#0ea5e9',
      '--cui-secondary': '#64748b'
    }
  }
})
```

## 🔧 Nuxt 3/4 Integration

### Installation

```bash
npm install @celestial-ui/vue
```

### Nuxt Plugin

```typescript
// plugins/celestialui.client.ts
import CelestialUI from '@celestial-ui/vue'
import '@celestial-ui/vue/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(CelestialUI, {
    theme: {
      framework: 'tailwind',
      mode: 'auto'
    },
    icons: {
      provider: 'fontawesome',
      format: 'font'
    }
  })
})
```

### Nuxt Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@celestialui/vue/style.css'],
  
  components: [
    {
      path: '@celestialui/vue/components',
      global: true
    }
  ]
})
```

## 🧩 Components

### Core Components

- **CButton** - Versatile button with multiple variants
- **CInput** - Enhanced input with validation and icons
- **CCard** - Flexible card component with slots
- **CIcon** - Universal icon component
- **CModal** - Accessible modal dialog
- **CToast** - Toast notification system

### Layout Components

- **CContainer** - Responsive container
- **CGrid** - CSS Grid layout
- **CStack** - Flexbox stack layout

### Form Components

- **CCheckbox** - Styled checkbox input
- **CRadio** - Radio button group
- **CSelect** - Enhanced select dropdown
- **CTextarea** - Multi-line text input
- **CSwitch** - Toggle switch component

### Feedback Components

- **CAlert** - Alert messages
- **CProgress** - Progress indicators
- **CSpinner** - Loading spinners
- **CBadge** - Status badges

## 🎭 Icon System

CelestialUI supports multiple icon providers:

### FontAwesome

```vue
<CIcon name="star" provider="fontawesome" />
<CIcon name="heart" provider="fontawesome" spin />
```

### Material Icons

```vue
<CIcon name="favorite" provider="material" />
<CIcon name="star" provider="material" />
```

### Heroicons

```vue
<CIcon name="star" provider="heroicons" />
<CIcon name="heart" provider="heroicons" />
```

### Custom Icons

```typescript
app.use(CelestialUI, {
  icons: {
    provider: 'custom',
    customIcons: {
      'my-icon': '/path/to/icon.svg',
      'logo': MyLogoComponent
    }
  }
})
```

## 🌓 Theme System

### Using Composables

```vue
<script setup lang="ts">
import { useTheme } from '@celestialui/vue'

const { isDark, toggleTheme, setTheme } = useTheme()

// Toggle between light and dark
const handleToggle = () => {
  toggleTheme()
}

// Set specific theme
const setLightTheme = () => {
  setTheme({
    mode: 'light',
    framework: 'tailwind'
  })
}
</script>
```

### Custom Theme Tokens

```typescript
app.use(CelestialUI, {
  theme: {
    framework: 'css',
    tokens: {
      colors: {
        primary: {
          500: '#your-primary-color'
        }
      },
      spacing: {
        custom: '2.5rem'
      }
    }
  }
})
```

## 🧪 Testing

### Unit Tests

```bash
# Run unit tests
npm run test:unit

# Run with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in development
npm run test:e2e:dev
```

## 📖 Development

### Setup

```bash
# Clone the repository
git clone https://github.com/dev-1603/CelestialUI-Vue.git

# Install dependencies
cd CelestialUI-Vue
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Building

```bash
# Build library
npm run build-lib

# Build demo
npm run build-demo

# Build both
npm run build
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Compatibility

### Vue 3 Ecosystem
- **Vue 3.x**: Full compatibility with Vue 3 Composition API and Options API
- **Vite**: Optimized for Vite build system with fast HMR
- **TypeScript**: Complete TypeScript support with type definitions
- **Vue DevTools**: Full integration with Vue DevTools for debugging

### Nuxt Framework
- **Nuxt 3**: Native support for Nuxt 3 with auto-imports and SSR
- **Nuxt 4**: Forward compatibility with upcoming Nuxt 4 features
- **Server-Side Rendering**: Components work seamlessly with SSR/SSG
- **Auto-imports**: Automatic component registration in Nuxt projects

### Styling Systems
- **Tailwind CSS**: Native Tailwind integration with utility classes
- **SCSS/Sass**: Full SCSS support with CSS modules
- **Material Design**: Material Design 3 theming system
- **Pure CSS**: Custom CSS properties and variables support

### Build Tools
- **Vite**: Primary build tool with optimized bundling
- **Webpack**: Compatible with Webpack-based projects
- **Rollup**: ES modules and UMD builds
- **Tree Shaking**: Optimized for bundle size reduction

## 📞 Support

- 📖 [Documentation](https://github.com/dev-1603/CelestialUI-Vue#readme)
- 🐛 [Issues](https://github.com/dev-1603/CelestialUI-Vue/issues)
- 💬 [Discussions](https://github.com/dev-1603/CelestialUI-Vue/discussions)
- 📧 [Email](mailto:support@celestialui.dev)

---

Made with ❤️ by the CelestialUI team