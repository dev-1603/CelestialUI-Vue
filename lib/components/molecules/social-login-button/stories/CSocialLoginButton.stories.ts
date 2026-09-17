import type { Meta, StoryObj } from '@storybook/vue3'
import CSocialLoginButton from '../CSocialLoginButton.vue'

const meta: Meta<typeof CSocialLoginButton> = {
  title: 'Components/Molecules/SocialLoginButton',
  component: CSocialLoginButton,
  tags: ['autodocs'],
  argTypes: {
    provider: { 
      control: 'select', 
      options: ['google', 'github', 'apple', 'microsoft', 'facebook', 'twitter'] 
    },
    label: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    variant: { control: 'select', options: ['outline', 'solid'] }
  }
}

export default meta
type Story = StoryObj<typeof CSocialLoginButton>

export const Default: Story = {
  render: (args) => ({
    components: { CSocialLoginButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px; max-width: 300px;">
        <CSocialLoginButton v-bind="args" />
      </div>
    `
  }),
  args: {
    provider: 'google'
  }
}

export const AllProviders: Story = {
  render: (args) => ({
    components: { CSocialLoginButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px; max-width: 300px; display: flex; flex-direction: column; gap: 1rem;">
        <CSocialLoginButton provider="google" />
        <CSocialLoginButton provider="github" />
        <CSocialLoginButton provider="apple" />
        <CSocialLoginButton provider="microsoft" />
      </div>
    `
  })
}

export const SolidVariant: Story = {
  render: (args) => ({
    components: { CSocialLoginButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px; max-width: 300px; display: flex; flex-direction: column; gap: 1rem;">
        <CSocialLoginButton provider="google" variant="solid" />
        <CSocialLoginButton provider="github" variant="solid" />
      </div>
    `
  })
}

export const IconOnly: Story = {
  render: (args) => ({
    components: { CSocialLoginButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px; display: flex; gap: 1rem;">
        <CSocialLoginButton provider="google" icon-only />
        <CSocialLoginButton provider="github" icon-only />
        <CSocialLoginButton provider="apple" icon-only />
        <CSocialLoginButton provider="microsoft" icon-only />
      </div>
    `
  })
}

export const Monochrome: Story = {
  render: (args) => ({
    components: { CSocialLoginButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px; max-width: 300px; display: flex; flex-direction: column; gap: 1rem;">
        <CSocialLoginButton provider="google" monochrome />
        <CSocialLoginButton provider="github" monochrome />
      </div>
    `
  })
}
