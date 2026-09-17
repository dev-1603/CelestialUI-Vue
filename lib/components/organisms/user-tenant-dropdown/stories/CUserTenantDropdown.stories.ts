import type { Meta, StoryObj } from '@storybook/vue3'
import CUserTenantDropdown from '../CUserTenantDropdown.vue'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof CUserTenantDropdown> = {
  title: 'Components/Organisms/UserTenantDropdown',
  component: CUserTenantDropdown,
  tags: ['autodocs'],
  argTypes: {
    user: { control: 'object' },
    tenants: { control: 'object' },
    currentTenantId: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    trigger: { control: 'select', options: ['click', 'hover'] }
  }
}

export default meta
type Story = StoryObj<typeof CUserTenantDropdown>

const mockUser = {
  id: 'usr1',
  name: 'Jane Doe',
  email: 'jane.doe@example.com'
}

const mockTenants = [
  { id: 't1', name: 'Acme Corp' },
  { id: 't2', name: 'Globex Inc' },
  { id: 't3', name: 'Stark Industries' }
]

export const Default: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  render: (args) => ({
    components: { CUserTenantDropdown },
    setup() {
      return { 
        args,
        onLogout: action('logout'),
        onSettings: action('settings'),
        onSelectTenant: action('select-tenant')
      }
    },
    template: `
      <div style="padding: 20px; display: flex; justify-content: flex-end; width: 100%;">
        <CUserTenantDropdown 
          v-bind="args" 
          @logout="onLogout"
          @settings="onSettings"
          @select-tenant="onSelectTenant"
        />
      </div>
    `
  }),
  args: {
    user: mockUser,
    tenants: mockTenants,
    currentTenantId: 't1'
  }
}
