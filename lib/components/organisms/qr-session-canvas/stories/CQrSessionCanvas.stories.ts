import type { Meta, StoryObj } from '@storybook/vue3'
import CQrSessionCanvas from '../CQrSessionCanvas.vue'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof CQrSessionCanvas> = {
  title: 'Components/Organisms/QrSessionCanvas',
  component: CQrSessionCanvas,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['loading', 'active', 'scanned', 'expired', 'error'] },
    error: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    expiresIn: { control: 'number' }
  }
}

export default meta
type Story = StoryObj<typeof CQrSessionCanvas>

// Placeholder URL to encode as QR
const mockQr = 'otpauth://totp/CelestialUI:alice@example.com?secret=JBSWY3DPEHPK3PXP&issuer=CelestialUI'

export const Active: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  render: (args) => ({
    components: { CQrSessionCanvas },
    setup() {
      return { 
        args,
        onRefresh: action('refresh'),
        onCancel: action('cancel')
      }
    },
    template: `
      <div style="padding: 20px; max-width: 400px; display: flex; justify-content: center;">
        <CQrSessionCanvas 
          v-bind="args" 
          @refresh="onRefresh"
          @cancel="onCancel"
        />
      </div>
    `
  }),
  args: {
    status: 'active',
    qrData: mockQr,
    expiresIn: 60
  }
}

export const Loading: Story = {
  render: (args) => ({
    components: { CQrSessionCanvas },
    setup() { return { args } },
    template: '<div style="padding: 20px; max-width: 400px;"><CQrSessionCanvas v-bind="args" /></div>'
  }),
  args: {
    status: 'loading'
  }
}

export const Scanned: Story = {
  render: (args) => ({
    components: { CQrSessionCanvas },
    setup() { return { args } },
    template: '<div style="padding: 20px; max-width: 400px;"><CQrSessionCanvas v-bind="args" /></div>'
  }),
  args: {
    status: 'scanned',
    qrData: mockQr
  }
}

export const Expired: Story = {
  render: (args) => ({
    components: { CQrSessionCanvas },
    setup() { return { args } },
    template: '<div style="padding: 20px; max-width: 400px;"><CQrSessionCanvas v-bind="args" /></div>'
  }),
  args: {
    status: 'expired'
  }
}
