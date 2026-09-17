import type { Meta, StoryObj } from '@storybook/vue3'
import CDialog from '../CDialog.vue'
import CButton from '../../../atoms/button/CButton.vue'
import { ref } from 'vue'

const meta: Meta<typeof CDialog> = {
  title: 'Components/Molecules/Dialog',
  component: CDialog,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
    closable: { control: 'boolean' },
    closeOnOutsideClick: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof CDialog>

export const Default: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  render: (args) => ({
    components: { CDialog, CButton },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <CButton @click="isOpen = true">Open Dialog</CButton>
        <CDialog v-bind="args" v-model="isOpen">
          <div class="p-4">
            <p>This is the main content of the dialog. You can place any components or text here.</p>
          </div>
          <template #footer>
            <CButton variant="outline" @click="isOpen = false" class="mr-2">Cancel</CButton>
            <CButton @click="isOpen = false">Confirm</CButton>
          </template>
        </CDialog>
      </div>
    `
  }),
  args: {
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed with this action?',
    size: 'md',
    closable: true,
    closeOnOutsideClick: true,
    closeOnEsc: true
  }
}
