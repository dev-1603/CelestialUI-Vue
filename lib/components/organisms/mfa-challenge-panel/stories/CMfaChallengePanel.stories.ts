import type { Meta, StoryObj } from '@storybook/vue3'
import CMfaChallengePanel from '../CMfaChallengePanel.vue'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof CMfaChallengePanel> = {
  title: 'Components/Organisms/MfaChallengePanel',
  component: CMfaChallengePanel,
  tags: ['autodocs'],
  argTypes: {
    method: { control: 'select', options: ['totp', 'sms', 'email'] },
    destination: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    resendDisabled: { control: 'boolean' },
    resendCooldown: { control: 'number' }
  }
}

export default meta
type Story = StoryObj<typeof CMfaChallengePanel>

export const TOTP: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  render: (args) => ({
    components: { CMfaChallengePanel },
    setup() {
      return { 
        args,
        onVerify: action('verify'),
        onCancel: action('cancel')
      }
    },
    template: `
      <div style="padding: 20px; max-width: 400px;">
        <CMfaChallengePanel 
          v-bind="args" 
          @verify="onVerify"
          @cancel="onCancel"
        />
      </div>
    `
  }),
  args: {
    method: 'totp'
  }
}

export const SMS: Story = {
  render: (args) => ({
    components: { CMfaChallengePanel },
    setup() {
      return { 
        args,
        onVerify: action('verify'),
        onCancel: action('cancel'),
        onResend: action('resend')
      }
    },
    template: `
      <div style="padding: 20px; max-width: 400px;">
        <CMfaChallengePanel 
          v-bind="args" 
          @verify="onVerify"
          @cancel="onCancel"
          @resend="onResend"
        />
      </div>
    `
  }),
  args: {
    method: 'sms',
    destination: '+1 (555) 123-4567'
  }
}

export const WithError: Story = {
  render: (args) => ({
    components: { CMfaChallengePanel },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px; max-width: 400px;">
        <CMfaChallengePanel v-bind="args" />
      </div>
    `
  }),
  args: {
    method: 'totp',
    error: 'The code is invalid or has expired.'
  }
}
