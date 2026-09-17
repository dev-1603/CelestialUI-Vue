import type { Meta, StoryObj } from '@storybook/vue3'
import CTabs from '../CTabs.vue'
import { ref } from 'vue'
import type { CTabItem } from '../CTabs.types'

const meta: Meta<typeof CTabs> = {
  title: 'Components/Molecules/Tabs',
  component: CTabs,
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['line', 'enclosed', 'pills'] 
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical']
    }
  }
}

export default meta
type Story = StoryObj<typeof CTabs>

const sampleItems: CTabItem[] = [
  { id: 'account', label: 'Account', icon: 'user' },
  { id: 'password', label: 'Password', icon: 'lock' },
  { id: 'team', label: 'Team', icon: 'users' },
  { id: 'billing', label: 'Billing', icon: 'credit-card', disabled: true }
]

export const Default: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  render: (args) => ({
    components: { CTabs },
    setup() {
      const activeTab = ref(args.modelValue || 'account')
      return { args, activeTab }
    },
    template: `
      <div style="max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <CTabs v-bind="args" v-model="activeTab">
          <template #panel-account>
            <div class="p-4 bg-gray-50 rounded">
              <h3 class="text-lg font-bold mb-2">Account Settings</h3>
              <p>Make changes to your account here. Click save when you're done.</p>
            </div>
          </template>
          <template #panel-password>
            <div class="p-4 bg-gray-50 rounded">
              <h3 class="text-lg font-bold mb-2">Password</h3>
              <p>Change your password here. After saving, you'll be logged out.</p>
            </div>
          </template>
          <template #panel-team>
            <div class="p-4 bg-gray-50 rounded">
              <h3 class="text-lg font-bold mb-2">Team Members</h3>
              <p>Manage your team members and their permissions.</p>
            </div>
          </template>
        </CTabs>
      </div>
    `
  }),
  args: {
    items: sampleItems,
    modelValue: 'account',
    variant: 'line',
    orientation: 'horizontal'
  }
}

export const PillsVariant: Story = {
  ...Default,
  args: {
    items: sampleItems,
    modelValue: 'account',
    variant: 'pills'
  }
}

export const EnclosedVariant: Story = {
  ...Default,
  args: {
    items: sampleItems,
    modelValue: 'account',
    variant: 'enclosed'
  }
}

export const VerticalOrientation: Story = {
  ...Default,
  args: {
    items: sampleItems,
    modelValue: 'account',
    orientation: 'vertical'
  }
}

export const ScrollableHeaders: Story = {
  render: (args) => ({
    components: { CTabs },
    setup() {
      const activeTab = ref('1')
      const manyItems = Array.from({ length: 15 }, (_, i) => ({
        id: `${i + 1}`,
        label: `Tab Item ${i + 1}`
      }))
      return { args, activeTab, manyItems }
    },
    template: `
      <div style="max-width: 400px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <CTabs v-bind="args" :items="manyItems" v-model="activeTab" scrollable>
          <template #panel="{ isActive, item }">
            <div v-if="isActive" class="p-4 bg-gray-50 rounded mt-4">
              <h3 class="text-lg font-bold mb-2">Content for {{ item.label }}</h3>
              <p>This tab header list is scrollable horizontally.</p>
            </div>
          </template>
        </CTabs>
      </div>
    `
  }),
  args: {
    items: [],
    modelValue: '1'
  }
}

export const RTLLayout: Story = {
  ...Default,
  render: (args) => ({
    components: { CTabs },
    setup() {
      const activeTab = ref(args.modelValue || 'account')
      return { args, activeTab }
    },
    template: `
      <div style="max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;" dir="rtl">
        <CTabs v-bind="args" v-model="activeTab" rtl>
          <template #panel-account>
            <div class="p-4 bg-gray-50 rounded text-right">
              <h3 class="text-lg font-bold mb-2">إعدادات الحساب</h3>
              <p>قم بإجراء تغييرات على حسابك هنا. انقر فوق حفظ عند الانتهاء.</p>
            </div>
          </template>
          <template #panel-password>
            <div class="p-4 bg-gray-50 rounded text-right">
              <h3 class="text-lg font-bold mb-2">كلمة المرور</h3>
              <p>قم بتغيير كلمة المرور الخاصة بك هنا.</p>
            </div>
          </template>
        </CTabs>
      </div>
    `
  }),
  args: {
    items: [
      { id: 'account', label: 'الحساب', icon: 'user' },
      { id: 'password', label: 'كلمة المرور', icon: 'lock' }
    ],
    modelValue: 'account',
    variant: 'line'
  }
}

export const ProgrammaticSwitching: Story = {
  render: (args) => ({
    components: { CTabs },
    setup() {
      const activeTab = ref('account')
      const switchTab = (id: string) => { activeTab.value = id }
      return { args, activeTab, switchTab }
    },
    template: `
      <div style="max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <div class="mb-4 flex gap-2">
          <button @click="switchTab('account')" class="px-3 py-1 bg-gray-200 rounded">Go to Account</button>
          <button @click="switchTab('team')" class="px-3 py-1 bg-gray-200 rounded">Go to Team</button>
        </div>
        <CTabs v-bind="args" v-model="activeTab">
          <template #panel-account><div class="p-4 bg-gray-50 rounded mt-4">Account Panel</div></template>
          <template #panel-password><div class="p-4 bg-gray-50 rounded mt-4">Password Panel</div></template>
          <template #panel-team><div class="p-4 bg-gray-50 rounded mt-4">Team Panel</div></template>
        </CTabs>
      </div>
    `
  }),
  args: {
    items: sampleItems,
    modelValue: 'account'
  }
}
