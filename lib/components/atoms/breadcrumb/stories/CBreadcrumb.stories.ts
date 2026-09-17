import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import CBreadcrumb from '../CBreadcrumb.vue'
import type { BreadcrumbItem, CBreadcrumbProps } from '../CBreadcrumb.types'

/**
 * CBreadcrumb Component Stories
 *
 * Demonstrates various breadcrumb configurations including:
 * - Basic usage with different separators
 * - Truncation behavior
 * - Home item support
 * - Custom slots
 * - Accessibility features
 * - Edge cases and error states
 */

const meta: Meta<CBreadcrumbProps> = {
  title: 'Atoms/CBreadcrumb',
  component: CBreadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A responsive, accessible breadcrumb navigation component that supports custom separators,
item truncation, and home item functionality. Built with WCAG 2.1 AA compliance in mind.

## Features
- **Responsive Design**: Adapts to different screen sizes with mobile-first approach
- **Accessibility**: Full ARIA support with keyboard navigation
- **Customizable**: Support for custom separators, slots, and styling
- **Truncation**: Automatic truncation for long breadcrumb trails
- **Home Support**: Optional home item with custom configuration
- **TypeScript**: Full type safety with comprehensive interfaces

## Usage
\`\`\`vue
<template>
  <CBreadcrumb
    :items="breadcrumbItems"
    separator="/"
    :max-items="5"
    show-home
    @navigate="handleNavigation"
  />
</template>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    items: {
      description: 'Array of breadcrumb items to display',
      control: { type: 'object' },
    },
    separator: {
      description: 'Separator between breadcrumb items (string or VNode)',
      control: { type: 'text' },
    },
    maxItems: {
      description: 'Maximum number of items to show before truncation',
      control: { type: 'number', min: 1, max: 20 },
    },
    showHome: {
      description: 'Whether to show the home/root item',
      control: { type: 'boolean' },
    },
    compact: {
      description: 'Whether to use compact spacing',
      control: { type: 'boolean' },
    },
    ariaLabel: {
      description: 'ARIA label for the breadcrumb navigation',
      control: { type: 'text' },
    },
    class: {
      description: 'CSS class for the breadcrumb container',
      control: { type: 'text' },
    },
  },
  args: {},
}

export default meta
type Story = StoryObj<CBreadcrumbProps>

// Sample breadcrumb data
const basicItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'category', label: 'Electronics', href: '/products/electronics' },
  { id: 'product', label: 'Smartphone', href: '/products/electronics/smartphone' },
]

const longItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'category', label: 'Electronics', href: '/products/electronics' },
  { id: 'subcategory', label: 'Mobile Phones', href: '/products/electronics/mobile' },
  { id: 'brand', label: 'Apple', href: '/products/electronics/mobile/apple' },
  { id: 'series', label: 'iPhone', href: '/products/electronics/mobile/apple/iphone' },
  { id: 'model', label: 'iPhone 15 Pro', href: '/products/electronics/mobile/apple/iphone/15-pro' },
  {
    id: 'variant',
    label: '256GB Space Black',
    href: '/products/electronics/mobile/apple/iphone/15-pro/256gb-space-black',
  },
]

const itemsWithDisabled: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'category', label: 'Electronics', href: '/products/electronics' },
  { id: 'product', label: 'Smartphone', href: '/products/electronics/smartphone' },
  { id: 'disabled', label: 'Coming Soon', disabled: true },
]

/**
 * Basic breadcrumb with default separator
 */
export const Default: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  args: {
    items: basicItems,
  },
}

/**
 * Breadcrumb with custom separator
 */
export const CustomSeparator: Story = {
  args: {
    items: basicItems,
    separator: '>',
  },
}

/**
 * Breadcrumb with arrow separator
 */
export const ArrowSeparator: Story = {
  args: {
    items: basicItems,
    separator: '→',
  },
}

/**
 * Breadcrumb with home item
 */
export const WithHome: Story = {
  args: {
    items: basicItems,
    showHome: true,
  },
}

/**
 * Breadcrumb with custom home item
 */
export const CustomHome: Story = {
  args: {
    items: basicItems,
    showHome: true,
    homeItem: {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/dashboard',
    },
  },
}

/**
 * Breadcrumb with truncation
 */
export const Truncated: Story = {
  args: {
    items: longItems,
    maxItems: 4,
  },
}

/**
 * Compact breadcrumb
 */
export const Compact: Story = {
  args: {
    items: basicItems,
    compact: true,
  },
}

/**
 * Breadcrumb with disabled items
 */
export const WithDisabled: Story = {
  args: {
    items: itemsWithDisabled,
  },
}

/**
 * Single item breadcrumb
 */
export const SingleItem: Story = {
  args: {
    items: [{ id: 'home', label: 'Home', href: '/' }],
  },
}

/**
 * Breadcrumb with external links
 */
export const WithExternalLinks: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'docs', label: 'Documentation', href: 'https://docs.example.com' },
      { id: 'support', label: 'Support', href: 'https://support.example.com' },
      { id: 'current', label: 'Current Page' },
    ],
  },
}

/**
 * Breadcrumb with custom ARIA label
 */
export const CustomAriaLabel: Story = {
  args: {
    items: basicItems,
    ariaLabel: 'Product navigation breadcrumb',
  },
}

/**
 * Breadcrumb with custom CSS class
 */
export const CustomClass: Story = {
  args: {
    items: basicItems,
    class: 'custom-breadcrumb-style',
  },
  decorators: [
    () => ({
      template: `
        <div>
          <style>
            .custom-breadcrumb-style {
              background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
              padding: 1rem;
              border-radius: 0.5rem;
              color: white;
            }
            .custom-breadcrumb-style .c-breadcrumb__link {
              color: white;
            }
            .custom-breadcrumb-style .c-breadcrumb__separator {
              color: rgba(255, 255, 255, 0.7);
            }
          </style>
          <story />
        </div>
      `,
    }),
  ],
}

/**
 * Breadcrumb with custom item slot
 */
export const CustomItemSlot: Story = {
  args: {
    items: basicItems,
  },
  render: (args) => ({
    components: { CBreadcrumb },
    setup() {
      return { args }
    },
    template: `
      <CBreadcrumb v-bind="args">
        <template #item="{ item, index, isLast, isActive }">
          <span
            class="custom-item"
            :class="{ 'active': isActive, 'last': isLast }"
          >
            {{ index + 1 }}. {{ item.label }}
            <span v-if="isActive" class="current-indicator">(current)</span>
          </span>
        </template>
      </CBreadcrumb>
    `,
  }),
  decorators: [
    () => ({
      template: `
        <div>
          <style>
            .custom-item {
              padding: 0.5rem;
              border-radius: 0.25rem;
              transition: all 0.2s ease;
            }
            .custom-item:hover {
              background-color: rgba(0, 0, 0, 0.05);
            }
            .custom-item.active {
              font-weight: bold;
              color: #3b82f6;
            }
            .current-indicator {
              font-size: 0.75rem;
              color: #6b7280;
            }
          </style>
          <story />
        </div>
      `,
    }),
  ],
}

/**
 * Breadcrumb with custom separator slot
 */
export const CustomSeparatorSlot: Story = {
  args: {
    items: basicItems,
  },
  render: (args) => ({
    components: { CBreadcrumb },
    setup() {
      return { args }
    },
    template: `
      <CBreadcrumb v-bind="args">
        <template #separator>
          <span class="custom-separator">✨</span>
        </template>
      </CBreadcrumb>
    `,
  }),
}

/**
 * Empty breadcrumb (edge case)
 */
export const Empty: Story = {
  args: {
    items: [],
  },
}

/**
 * Very long breadcrumb trail
 */
export const VeryLong: Story = {
  args: {
    items: [
      { id: '1', label: 'Level 1', href: '/1' },
      { id: '2', label: 'Level 2', href: '/1/2' },
      { id: '3', label: 'Level 3', href: '/1/2/3' },
      { id: '4', label: 'Level 4', href: '/1/2/3/4' },
      { id: '5', label: 'Level 5', href: '/1/2/3/4/5' },
      { id: '6', label: 'Level 6', href: '/1/2/3/4/5/6' },
      { id: '7', label: 'Level 7', href: '/1/2/3/4/5/6/7' },
      { id: '8', label: 'Level 8', href: '/1/2/3/4/5/6/7/8' },
      { id: '9', label: 'Level 9', href: '/1/2/3/4/5/6/7/8/9' },
      { id: '10', label: 'Level 10', href: '/1/2/3/4/5/6/7/8/9/10' },
    ],
    maxItems: 5,
  },
}

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    items: longItems,
    separator: '/',
    maxItems: 6,
    showHome: true,
    compact: false,
    ariaLabel: 'Breadcrumb navigation',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different breadcrumb configurations.',
      },
    },
  },
}
