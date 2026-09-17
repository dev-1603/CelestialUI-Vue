import type { Meta, StoryObj } from '@storybook/vue3'
import CPasswordInput from '../CPasswordInput.vue'
import { ref } from 'vue'

const meta: Meta<typeof CPasswordInput> = {
  title: 'Components/Molecules/PasswordInput',
  component: CPasswordInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    showStrengthIndicator: { control: 'boolean' },
    showRequirements: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof CPasswordInput>

export const Default: Story = {
  render: (args) => ({
    components: { CPasswordInput },
    setup() {
      const password = ref('')
      return { args, password }
    },
    template: `
      <div style="padding: 20px; max-width: 400px;">
        <CPasswordInput 
          v-bind="args" 
          v-model="password"
        />
      </div>
    `
  }),
  args: {
    label: 'Password',
    placeholder: 'Enter your password'
  }
}

export const WithStrengthAndRequirements: Story = {
  render: (args) => ({
    components: { CPasswordInput },
    setup() {
      const password = ref('')
      return { args, password }
    },
    template: `
      <div style="padding: 20px; max-width: 400px;">
        <CPasswordInput 
          v-bind="args" 
          v-model="password"
        />
      </div>
    `
  }),
  args: {
    label: 'Create Password',
    showStrengthIndicator: true,
    showRequirements: true
  }
}
