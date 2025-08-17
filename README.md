# 🌟 CelestialUI Vue

A comprehensive Vue 3 component library with multi-framework styling support, inspired by [shadcn/ui](https://ui.shadcn.com/) and [Aceternity UI](https://ui.aceternity.com/).

[![npm version](https://badge.fury.io/js/@celestialui%2Fvue.svg)](https://badge.fury.io/js/@celestialui%2Fvue)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Multi-Framework Styling**: Support for Tailwind CSS, SCSS, Material Design, and pure CSS
- 🔧 **Vue 3 & Nuxt 3/4 Compatible**: Full compatibility with Vue 3 and Nuxt 3/4
- 🎯 **TypeScript First**: Comprehensive type definitions included
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
npm install @celestialui/vue

# yarn
yarn add @celestialui/vue

# pnpm
pnpm add @celestialui/vue
```

### Basic Usage

```typescript
// main.ts
import { createApp } from 'vue'
import CelestialUI from '@celestialui/vue'
import '@celestialui/vue/style.css'

const app = createApp(App)

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

### Component Usage

```vue
<template>
  <div>
    <!-- Buttons -->
    <CButton variant="primary" size="lg" left-icon="star">
      Primary Button
    </CButton>
    
    <!-- Input -->
    <CInput
      v-model="email"
      label="Email Address"
      type="email"
      prefix-icon="envelope"
      clearable
    />
    
    <!-- Card -->
    <CCard title="Card Title" subtitle="Card subtitle" hoverable>
      <p>Card content goes here...</p>
      <template #footer>
        <CButton size="sm">Action</CButton>
      </template>
    </CCard>
    
    <!-- Modal -->
    <CModal v-model="showModal" title="Modal Title">
      <p>Modal content...</p>
      <template #footer>
        <CButton @click="showModal = false">Close</CButton>
      </template>
    </CModal>
  </div>
</template>

<script setup lang="ts">
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
npm install @celestialui/vue
```

### Nuxt Plugin

```typescript
// plugins/celestialui.client.ts
import CelestialUI from '@celestialui/vue'
import '@celestialui/vue/style.css'

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
git clone https://github.com/your-username/celestialui-vue.git

# Install dependencies
cd celestialui-vue
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

## 🙏 Acknowledgments

- Inspired by [shadcn/ui](https://ui.shadcn.com/)
- Design patterns from [Aceternity UI](https://ui.aceternity.com/)
- Built with [Vue 3](https://vuejs.org/)
- Powered by [Vite](https://vitejs.dev/)

## 📞 Support

- 📖 [Documentation](https://celestialui-vue.netlify.app)
- 🐛 [Issues](https://github.com/your-username/celestialui-vue/issues)
- 💬 [Discussions](https://github.com/your-username/celestialui-vue/discussions)
- 📧 [Email](mailto:support@celestialui.dev)

---

Made with ❤️ by the CelestialUI team