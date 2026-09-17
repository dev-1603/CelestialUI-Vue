import type { Meta, StoryObj } from '@storybook/vue3'
import CAuthMethodDispatcher from '../CAuthMethodDispatcher.vue'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof CAuthMethodDispatcher> = {
  title: 'Components/Organisms/AuthMethodDispatcher',
  component: CAuthMethodDispatcher,
  tags: ['autodocs'],
  argTypes: {
    identifier: { control: 'text' },
    availableMethods: { control: 'object' },
    socialProviders: { control: 'object' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    defaultMethod: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof CAuthMethodDispatcher>

export const Default: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  render: (args) => ({
    components: { CAuthMethodDispatcher },
    setup() {
      return { 
        args,
        onSelectMethod: action('select-method'),
        onSelectSocial: action('select-social'),
        onBack: action('back')
      }
    },
    template: `
      <div style="padding: 20px; max-width: 400px;">
        <CAuthMethodDispatcher 
          v-bind="args" 
          @select-method="onSelectMethod"
          @select-social="onSelectSocial"
          @back="onBack"
        />
      </div>
    `
  }),
  args: {
    identifier: 'jane.doe@example.com',
    availableMethods: ['password', 'magic_link', 'otp'],
    defaultMethod: 'password'
  }
}

export const WithSocialProviders: Story = {
  render: (args) => ({
    components: { CAuthMethodDispatcher },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px; max-width: 400px;">
        <CAuthMethodDispatcher v-bind="args" />
      </div>
    `
  }),
  args: {
    identifier: 'jane.doe@example.com',
    availableMethods: ['password', 'magic_link'],
    socialProviders: [
      { id: 'google', name: 'Google', icon: 'google' },
      { id: 'github', name: 'GitHub', icon: 'github' }
    ]
  }
}
