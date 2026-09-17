import type { Meta, StoryObj } from '@storybook/vue3'
import CIdentifierFirstResolver from '../CIdentifierFirstResolver.vue'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof CIdentifierFirstResolver> = {
  title: 'Components/Organisms/IdentifierFirstResolver',
  component: CIdentifierFirstResolver,
  tags: ['autodocs'],
  argTypes: {
    initialIdentifier: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof CIdentifierFirstResolver>

export const Default: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  render: (args) => ({
    components: { CIdentifierFirstResolver },
    setup() {
      return { 
        args,
        onResolve: action('resolve')
      }
    },
    template: `
      <div style="padding: 20px; max-width: 400px;">
        <CIdentifierFirstResolver v-bind="args" @resolve="onResolve" />
      </div>
    `
  })
}

export const Loading: Story = {
  render: (args) => ({
    components: { CIdentifierFirstResolver },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px; max-width: 400px;">
        <CIdentifierFirstResolver v-bind="args" />
      </div>
    `
  }),
  args: {
    loading: true,
    initialIdentifier: 'user@example.com'
  }
}

export const WithError: Story = {
  render: (args) => ({
    components: { CIdentifierFirstResolver },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px; max-width: 400px;">
        <CIdentifierFirstResolver v-bind="args" />
      </div>
    `
  }),
  args: {
    error: 'Account not found. Please check your email.',
    initialIdentifier: 'unknown@example.com'
  }
}
