import type { Meta, StoryObj } from '@storybook/vue3'
import CButton from './CButton.vue'

const meta = {
  title: 'Components/Button',
  component: CButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states. Supports icons, loading states, and accessibility features.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
      description: 'Visual style variant of the button'
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the button'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in loading state'
    },
    leftIcon: {
      control: { type: 'text' },
      description: 'Icon to display on the left side'
    },
    rightIcon: {
      control: { type: 'text' },
      description: 'Icon to display on the right side'
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Whether the button only contains an icon'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the button takes full width'
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Whether the button has rounded corners'
    },
    onClick: { action: 'clicked' }
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    iconOnly: false,
    fullWidth: false,
    rounded: false
  }
} satisfies Meta<typeof CButton>

export default meta
type Story = StoryObj<typeof meta>

// Basic button
export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  render: (args) => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<CButton v-bind="args">Primary Button</CButton>'
  })
}

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },
  render: (args) => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<CButton v-bind="args">Secondary Button</CButton>'
  })
}

export const Outline: Story = {
  args: {
    variant: 'outline'
  },
  render: (args) => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<CButton v-bind="args">Outline Button</CButton>'
  })
}

export const Ghost: Story = {
  args: {
    variant: 'ghost'
  },
  render: (args) => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<CButton v-bind="args">Ghost Button</CButton>'
  })
}

export const Link: Story = {
  args: {
    variant: 'link'
  },
  render: (args) => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<CButton v-bind="args">Link Button</CButton>'
  })
}

export const Destructive: Story = {
  args: {
    variant: 'destructive'
  },
  render: (args) => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<CButton v-bind="args">Delete</CButton>'
  })
}

// Size variants
export const Sizes: Story = {
  render: () => ({
    components: { CButton },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
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
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <CButton left-icon="plus">Add Item</CButton>
        <CButton right-icon="chevron-right">Continue</CButton>
        <CButton left-icon="download" right-icon="chevron-down">Download</CButton>
      </div>
    `
  })
}

// Icon only buttons
export const IconOnly: Story = {
  render: () => ({
    components: { CButton },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <CButton left-icon="heart" icon-only aria-label="Like" />
        <CButton left-icon="star" icon-only variant="outline" aria-label="Favorite" />
        <CButton left-icon="share" icon-only variant="ghost" aria-label="Share" />
        <CButton left-icon="settings" icon-only rounded aria-label="Settings" />
      </div>
    `
  })
}

// Loading states
export const Loading: Story = {
  render: () => ({
    components: { CButton },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <CButton loading>Loading...</CButton>
        <CButton loading variant="outline">Please wait</CButton>
        <CButton loading icon-only aria-label="Loading" />
      </div>
    `
  })
}

// Disabled states
export const Disabled: Story = {
  render: () => ({
    components: { CButton },
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <CButton disabled>Disabled</CButton>
        <CButton disabled variant="outline">Disabled Outline</CButton>
        <CButton disabled variant="ghost">Disabled Ghost</CButton>
      </div>
    `
  })
}

// Full width
export const FullWidth: Story = {
  render: () => ({
    components: { CButton },
    template: `
      <div style="width: 300px;">
        <CButton full-width>Full Width Button</CButton>
      </div>
    `
  })
}

// Interactive playground
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    leftIcon: 'star',
    disabled: false,
    loading: false
  },
  render: (args) => ({
    components: { CButton },
    setup() {
      return { args }
    },
    template: '<CButton v-bind="args">Playground Button</CButton>'
  })
}
