import type { Meta, StoryObj } from '@storybook/vue3'
import CCountdownTimer from '../CCountdownTimer.vue'
import { CButton } from '../../../atoms/button'
import { ref } from 'vue'

const meta: Meta<typeof CCountdownTimer> = {
  title: 'Components/Molecules/CountdownTimer',
  component: CCountdownTimer,
  tags: ['autodocs'],
  argTypes: {
    initialSeconds: { control: 'number' },
    autoStart: { control: 'boolean' },
    format: { control: 'select', options: ['mm:ss', 'ss', 'text'] },
    disabled: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof CCountdownTimer>

export const Default: Story = {
  render: (args) => ({
    components: { CCountdownTimer },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 20px;">
        <CCountdownTimer v-bind="args" />
      </div>
    `
  }),
  args: {
    initialSeconds: 60,
    autoStart: true
  }
}

export const Controlled: Story = {
  render: (args) => ({
    components: { CCountdownTimer, CButton },
    setup() {
      const timerRef = ref<any>(null)
      return { args, timerRef }
    },
    template: `
      <div style="padding: 20px; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <CCountdownTimer ref="timerRef" v-bind="args" />
        <div style="display: flex; gap: 0.5rem;">
          <CButton @click="timerRef?.start()" size="sm">Start</CButton>
          <CButton @click="timerRef?.pause()" size="sm" variant="outline">Pause</CButton>
          <CButton @click="timerRef?.reset()" size="sm" variant="ghost">Reset</CButton>
        </div>
      </div>
    `
  }),
  args: {
    initialSeconds: 120,
    autoStart: false
  }
}
