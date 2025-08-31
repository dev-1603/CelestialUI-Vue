import type { Meta, StoryObj } from '@storybook/vue3'
import CButton from '../CButton.vue'

const meta: Meta<typeof CButton> = {
  title: 'Atoms/Button',
  component: CButton,
  parameters: {
    docs: {
      description: {
        component: `
# CButton

A versatile button component with multiple variants, sizes, and states. Built with accessibility in mind and fully customizable through props.

## Features
- Multiple visual variants (primary, secondary, success, warning, danger, ghost, link)
- Five size options (xs, sm, md, lg, xl)
- Loading and disabled states
- Icon support (left and right positioning)
- Full-width option
- Link behavior support
- Comprehensive accessibility features
- Keyboard navigation
- Custom styling options

## Usage
\`\`\`vue
<template>
  <CButton variant="primary" @click="handleClick">
    Click me
  </CButton>
</template>
\`\`\`
        `
      }
    },
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
      description: 'Visual style variant of the button'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of the button'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full-width button'
    },
    leftIcon: {
      control: 'text',
      description: 'Icon to display on the left side'
    },
    rightIcon: {
      control: 'text',
      description: 'Icon to display on the right side'
    },
    href: {
      control: 'text',
      description: 'URL for link behavior'
    },
    target: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top'],
      description: 'Link target attribute'
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type for forms'
    },
    rounded: {
      control: 'select',
      options: [false, true, 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius styling'
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler'
    },
    onFocus: {
      action: 'focused',
      description: 'Focus event handler'
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur event handler'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof CButton>

// Default story
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md'
  },
  render: (args) => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<CButton v-bind="args">Default Button</CButton>'
  })
}

// Variants showcase
export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All available button variants with their distinct visual styles.'
      }
    }
  },
  render: () => ({
    components: { CButton },
    template: `
      <div class="space-y-4">
        <div class="flex gap-3 flex-wrap items-center">
          <CButton variant="primary">Primary</CButton>
          <CButton variant="secondary">Secondary</CButton>
          <CButton variant="outline">Outline</CButton>
          <CButton variant="ghost">Ghost</CButton>
          <CButton variant="link">Link</CButton>
        </div>
      </div>
    `
  })
}

// Sizes showcase
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Available button sizes from extra small to extra large.'
      }
    }
  },
  render: () => ({
    components: { CButton },
    template: `
      <div class="flex items-end gap-3 flex-wrap">
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
  parameters: {
    docs: {
      description: {
        story: 'Buttons with left and right icons. Icons are placeholder text in this demo.'
      }
    }
  },
  render: () => ({
    components: { CButton },
    template: `
      <div class="space-y-3">
        <div class="flex gap-3 flex-wrap">
          <CButton leftIcon="+" variant="success">Add Item</CButton>
          <CButton rightIcon="→" variant="primary">Next</CButton>
          <CButton leftIcon="↓" rightIcon="↗" variant="secondary">Download</CButton>
        </div>
        <div class="flex gap-3 flex-wrap">
          <CButton leftIcon="×" variant="danger" size="sm">Delete</CButton>
          <CButton rightIcon="⚙" variant="ghost" size="lg">Settings</CButton>
        </div>
      </div>
    `
  })
}

// Button states
export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different button states including normal, disabled, loading, and block layout.'
      }
    }
  },
  render: () => ({
    components: { CButton },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <div class="flex gap-3 flex-wrap">
          <CButton variant="primary">Normal</CButton>
          <CButton variant="primary" disabled>Disabled</CButton>
          <CButton variant="primary" loading>Loading</CButton>
        </div>
        <div>
          <CButton variant="secondary" fullWidth>Full Width Button</CButton>
        </div>
      </div>
    `
  })
}

// Loading states
export const LoadingStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Loading state examples across different variants and sizes.'
      }
    }
  },
  render: () => ({
    components: { CButton },
    template: `
      <div class="space-y-4">
        <div class="flex gap-3 flex-wrap items-center">
          <CButton variant="primary" loading size="xs">Loading</CButton>
          <CButton variant="secondary" loading size="sm">Loading</CButton>
          <CButton variant="outline" loading size="md">Loading</CButton>
          <CButton variant="ghost" loading size="lg">Loading</CButton>
          <CButton variant="link" loading size="xl">Loading</CButton>
        </div>
        <div class="flex gap-3 flex-wrap">
          <CButton variant="primary" loading leftIcon="+">With Left Icon</CButton>
          <CButton variant="secondary" loading rightIcon="→">With Right Icon</CButton>
        </div>
      </div>
    `
  })
}

// Rounded variants
export const RoundedVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different border radius options for button styling.'
      }
    }
  },
  render: () => ({
    components: { CButton },
    template: `
      <div class="space-y-4">
        <div class="flex gap-3 flex-wrap items-center">
          <CButton variant="primary">Default</CButton>
          <CButton variant="primary" rounded="sm">Small Rounded</CButton>
          <CButton variant="primary" rounded="md">Medium Rounded</CButton>
          <CButton variant="primary" rounded="lg">Large Rounded</CButton>
          <CButton variant="primary" rounded="xl">XL Rounded</CButton>
          <CButton variant="primary" rounded="full">Full Rounded</CButton>
        </div>
      </div>
    `
  })
}

// As links
export const AsLinks: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Buttons that behave as links with href attributes.'
      }
    }
  },
  render: () => ({
    components: { CButton },
    template: `
      <div class="space-y-4">
        <div class="flex gap-3 flex-wrap">
          <CButton href="https://example.com" target="_blank" variant="primary">
            External Link
          </CButton>
          <CButton href="/internal-page" variant="secondary">
            Internal Link
          </CButton>
          <CButton href="mailto:test@example.com" variant="link">
            Email Link
          </CButton>
        </div>
      </div>
    `
  })
}

// Interactive playground
export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different button configurations.'
      }
    }
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    leftIcon: '',
    rightIcon: '',
    rounded: false,
    href: '',
    target: '_self',
    type: 'button'
  },
  render: (args) => ({
    components: { CButton },
    setup() {
      const handleClick = () => {
        console.log('Button clicked!')
      }
      return { args, handleClick }
    },
    template: `
      <div class="space-y-4">
        <CButton v-bind="args" @click="handleClick">
          Playground Button
        </CButton>
        <div class="text-sm text-gray-600">
          <p>Configure the button using the controls panel below.</p>
          <p>Click the button to see the click event in the Actions panel.</p>
        </div>
      </div>
    `
  })
}
