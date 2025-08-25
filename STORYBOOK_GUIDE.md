# 📚 CelestialUI-Vue Storybook Documentation Guide

## 🎯 Storybook Architecture

### Enhanced Configuration Structure
```
.storybook/
├── main.ts                    # Main configuration
├── preview.ts                 # Global preview settings
├── manager.ts                 # Manager customization
├── addons/                    # Custom addons
│   ├── theme-switcher/        # Theme switching addon
│   ├── design-tokens/         # Design tokens viewer
│   ├── accessibility/         # A11y testing addon
│   └── code-generator/        # Code generation addon
├── docs/                      # Documentation templates
│   ├── Introduction.mdx       # Library introduction
│   ├── GettingStarted.mdx     # Installation guide
│   ├── DesignSystem.mdx       # Design system docs
│   ├── Theming.mdx           # Theming guide
│   ├── Accessibility.mdx     # A11y guidelines
│   └── Components.mdx        # Component overview
├── theme/                     # Storybook theming
│   ├── celestial-light.ts    # Light theme
│   ├── celestial-dark.ts     # Dark theme
│   └── manager.css          # Manager styles
└── static/                   # Static assets
    ├── favicon.ico
    ├── logo.svg
    └── images/
```

## 🛠️ Enhanced Storybook Configuration

### Main Configuration
```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import path from 'path'

const config: StorybookConfig = {
  stories: [
    '../docs/**/*.mdx',
    '../lib/**/*.mdx',
    '../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    // Custom addons
    './addons/theme-switcher/register.js',
    './addons/design-tokens/register.js',
    './addons/code-generator/register.js'
  ],

  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: 'vue-component-meta'
    }
  },

  features: {
    buildStoriesJson: true,
    storyStoreV7: true,
    argTypeTargetsV7: true
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../lib'),
          '@src': path.resolve(__dirname, '../src'),
          '@tests': path.resolve(__dirname, '../tests')
        }
      },
      define: {
        global: 'globalThis'
      },
      optimizeDeps: {
        include: ['@storybook/vue3']
      }
    })
  },

  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation'
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  }
}

export default config
```

### Preview Configuration
```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createThemePlugin } from '../lib/plugins/theme'
import { createIconPlugin } from '../lib/plugins/icon'
import '../lib/themes/css/base.css'
import '../lib/themes/css/tokens.css'

// Setup Vue plugins
setup((app) => {
  app.use(createThemePlugin({ defaultTheme: 'light' }))
  app.use(createIconPlugin())
})

const preview: Preview = {
  parameters: {
    // Global parameters
    layout: 'centered',
    
    // Actions
    actions: {
      argTypesRegex: '^on[A-Z].*'
    },
    
    // Controls
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      },
      expanded: true,
      sort: 'requiredFirst'
    },
    
    // Docs
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: 'Table of Contents',
        unsafeTocbotOptions: {
          orderedList: false
        }
      }
    },
    
    // Viewport addon
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } },
        wide: { name: 'Wide', styles: { width: '1440px', height: '900px' } }
      }
    },
    
    // Backgrounds addon
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' }
      ]
    },
    
    // Accessibility addon
    a11y: {
      element: '#storybook-root',
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          },
          {
            id: 'keyboard-navigation',
            enabled: true
          }
        ]
      },
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true
      }
    }
  },

  // Global decorators
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light'
      return {
        template: `
          <div class="storybook-wrapper" :class="'theme-' + theme">
            <story />
          </div>
        `,
        data() {
          return { theme }
        }
      }
    }
  ],

  // Global args
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light Theme' },
          { value: 'dark', title: 'Dark Theme' },
          { value: 'high-contrast', title: 'High Contrast' }
        ],
        dynamicTitle: true
      }
    },
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'es', title: 'Español' },
          { value: 'fr', title: 'Français' }
        ]
      }
    }
  }
}

export default preview
```

## 📝 Story Templates & Patterns

### Component Story Template
```typescript
// lib/components/atoms/button/CButton.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import CButton from './CButton.vue'

const meta = {
  title: 'Atoms/Button',
  component: CButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The Button component is used to trigger actions and navigate through the application.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost'],
      description: 'Visual variant of the button'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button shows loading state'
    },
    leftIcon: {
      control: 'text',
      description: 'Icon to show on the left side'
    },
    rightIcon: {
      control: 'text',
      description: 'Icon to show on the right side'
    },
    onClick: {
      action: 'clicked',
      description: 'Callback fired when button is clicked'
    }
  },
  args: {
    children: 'Button Text',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false
  }
} satisfies Meta<typeof CButton>

export default meta
type Story = StoryObj<typeof meta>

// Primary story
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}

// All variants showcase
export const AllVariants: Story = {
  render: () => ({
    components: { CButton },
    template: `
      <div class="flex flex-wrap gap-4">
        <CButton variant="primary">Primary</CButton>
        <CButton variant="secondary">Secondary</CButton>
        <CButton variant="success">Success</CButton>
        <CButton variant="warning">Warning</CButton>
        <CButton variant="danger">Danger</CButton>
        <CButton variant="ghost">Ghost</CButton>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants in the design system.'
      }
    }
  }
}

// Sizes showcase
export const Sizes: Story = {
  render: () => ({
    components: { CButton },
    template: `
      <div class="flex items-center gap-4">
        <CButton size="xs">Extra Small</CButton>
        <CButton size="sm">Small</CButton>
        <CButton size="md">Medium</CButton>
        <CButton size="lg">Large</CButton>
        <CButton size="xl">Extra Large</CButton>
      </div>
    `
  })
}

// With icons
export const WithIcons: Story = {
  render: () => ({
    components: { CButton },
    template: `
      <div class="flex gap-4">
        <CButton left-icon="plus">Add Item</CButton>
        <CButton right-icon="arrow-right">Next</CButton>
        <CButton left-icon="download" right-icon="external-link">Download</CButton>
      </div>
    `
  })
}

// Interactive states
export const InteractiveStates: Story = {
  render: () => ({
    components: { CButton },
    template: `
      <div class="space-y-4">
        <div class="flex gap-4">
          <CButton>Normal</CButton>
          <CButton disabled>Disabled</CButton>
          <CButton loading>Loading</CButton>
        </div>
        <div class="flex gap-4">
          <CButton class="hover:scale-105">Hover Me</CButton>
          <CButton class="focus:ring-4">Focus Me</CButton>
          <CButton class="active:scale-95">Press Me</CButton>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Interactive states including disabled, loading, hover, focus, and active states.'
      }
    }
  }
}

// Playground story for testing
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Playground Button',
    disabled: false,
    loading: false,
    leftIcon: '',
    rightIcon: ''
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different button configurations.'
      }
    }
  }
}
```

### Documentation Page Template
```mdx
<!-- docs/Introduction.mdx -->
import { Meta } from '@storybook/blocks'

<Meta title="Documentation/Introduction" />

# 🌟 CelestialUI-Vue

Welcome to CelestialUI-Vue, a comprehensive Vue 3 component library built with modern web standards and accessibility in mind.

## ✨ Features

- **🎨 Beautiful Design**: Modern, clean aesthetics with multiple themes
- **♿ Accessible**: WCAG 2.1 AA compliant components
- **🚀 Performance**: Optimized for speed and efficiency
- **📱 Responsive**: Mobile-first design approach
- **🌙 Dark Mode**: Built-in dark mode support
- **🔧 Customizable**: Extensive theming and configuration options
- **📚 Well Documented**: Comprehensive documentation and examples
- **🧪 Well Tested**: High test coverage with multiple testing strategies

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

```vue
<template>
  <div>
    <CButton @click="handleClick">
      Click me!
    </CButton>
  </div>
</template>

<script setup>
import { CButton } from '@celestial-ui/vue'
import '@celestial-ui/vue/style.css'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

### Plugin Installation

```typescript
// main.ts
import { createApp } from 'vue'
import CelestialUI from '@celestial-ui/vue'
import '@celestial-ui/vue/style.css'

const app = createApp(App)

app.use(CelestialUI, {
  theme: 'light',
  globalComponents: true
})

app.mount('#app')
```

## 🏗️ Architecture

CelestialUI-Vue follows atomic design principles:

- **⚛️ Atoms**: Basic building blocks (Button, Input, Icon)
- **🧬 Molecules**: Simple combinations (FormField, Card, Modal)
- **🦠 Organisms**: Complex patterns (Table, Navigation, Sidebar)
- **📄 Templates**: Page layouts (Dashboard, Auth, Landing)

## 🎨 Design System

Our design system provides:

- **Design Tokens**: Consistent spacing, colors, typography
- **Component Library**: Reusable, accessible components
- **Theme System**: Multiple themes with runtime switching
- **Icon Library**: Comprehensive icon set
- **Utilities**: Helper functions and composables

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/dev-1603/CelestialUI-Vue/blob/main/CONTRIBUTING.md) for details.

## 📄 License

CelestialUI-Vue is MIT licensed. See [LICENSE](https://github.com/dev-1603/CelestialUI-Vue/blob/main/LICENSE) for details.
```

## 🎨 Custom Storybook Addons

### Theme Switcher Addon
```typescript
// .storybook/addons/theme-switcher/register.ts
import { addons, types } from '@storybook/manager-api'
import { ADDON_ID, PANEL_ID } from './constants'
import { ThemePanel } from './ThemePanel'

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Theme Switcher',
    match: ({ viewMode }) => viewMode === 'story',
    render: ThemePanel
  })
})
```

### Design Tokens Viewer
```typescript
// .storybook/addons/design-tokens/register.ts
import { addons, types } from '@storybook/manager-api'
import { ADDON_ID, PANEL_ID } from './constants'
import { TokensPanel } from './TokensPanel'

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Design Tokens',
    match: ({ viewMode }) => viewMode === 'story',
    render: TokensPanel
  })
})
```

## 📊 Storybook Best Practices

### 1. Story Organization
- Use atomic design structure in story titles
- Group related stories together
- Use descriptive story names

### 2. Documentation
- Include component descriptions
- Document all props and events
- Provide usage examples
- Add design system context

### 3. Controls & Args
- Set appropriate control types
- Provide meaningful default values
- Group related controls
- Use validation where appropriate

### 4. Accessibility
- Include accessibility tests
- Document accessibility features
- Provide keyboard navigation examples
- Test with screen readers

### 5. Visual Testing
- Create comprehensive visual stories
- Test all component states
- Include responsive examples
- Cover edge cases

This enhanced Storybook setup provides comprehensive documentation, interactive testing, and development tools for your component library.
