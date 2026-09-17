import type { Meta, StoryObj } from '@storybook/vue3'
import CPinInput from '../CPinInput.vue'
import { ref } from 'vue'

const meta: Meta<typeof CPinInput> = {
  title: 'Components/Molecules/PinInput',
  component: CPinInput,
  tags: ['autodocs'],
  argTypes: {
    type: { 
      control: 'select', 
      options: ['text', 'password', 'number'] 
    },
    length: { control: { type: 'number', min: 1, max: 10 } },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    autofocus: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof CPinInput>

export const Default: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  render: (args) => ({
    components: { CPinInput },
    setup() {
      const pinValue = ref('')
      const onComplete = (val: string) => alert(`Completed: ${val}`)
      return { args, pinValue, onComplete }
    },
    template: `
      <div style="padding: 20px;">
        <CPinInput 
          v-bind="args" 
          v-model="pinValue"
          @complete="onComplete"
        />
        <div class="mt-4 text-sm text-gray-500">Current Value: {{ pinValue }}</div>
      </div>
    `
  }),
  args: {
    length: 4,
    type: 'text'
  }
}

export const SlackVariant: Story = {
  render: (args) => ({
    components: { CPinInput },
    setup() {
      const pinValue = ref('')
      return { args, pinValue }
    },
    template: `
      <div style="padding: 20px;">
        <h3 class="mb-4 text-lg font-bold">Slack Style</h3>
        <CPinInput 
          v-bind="args" 
          v-model="pinValue"
          variant="slack"
          :length="6"
        />
      </div>
    `
  })
}

export const AtlassianVariant: Story = {
  render: (args) => ({
    components: { CPinInput },
    setup() {
      const pinValue = ref('')
      return { args, pinValue }
    },
    template: `
      <div style="padding: 20px;">
        <h3 class="mb-4 text-lg font-bold">Atlassian Style</h3>
        <CPinInput 
          v-bind="args" 
          v-model="pinValue"
          variant="atlassian"
          :length="5"
        />
      </div>
    `
  })
}
