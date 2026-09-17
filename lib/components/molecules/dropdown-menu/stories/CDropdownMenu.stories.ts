import type { Meta, StoryObj } from '@storybook/vue3'
import CDropdownMenu from '../CDropdownMenu.vue'
import CButton from '../../../atoms/button/CButton.vue'
import type { CDropdownItem } from '../CDropdownMenu.types'

const meta: Meta<typeof CDropdownMenu> = {
  title: 'Components/Molecules/DropdownMenu',
  component: CDropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    placement: { 
      control: 'select', 
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'] 
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover']
    },
    disabled: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof CDropdownMenu>

const sampleItems: CDropdownItem[][] = [
  [
    { id: 'profile', label: 'My Profile', icon: 'user' },
    { id: 'billing', label: 'Billing', icon: 'credit-card', shortcut: '⌘B' },
    { id: 'settings', label: 'Settings', icon: 'settings', shortcut: '⌘S' }
  ],
  [
    { id: 'team', label: 'Team', icon: 'users' },
    { id: 'invite', label: 'Invite users', icon: 'user-plus' }
  ],
  [
    { id: 'github', label: 'GitHub', icon: 'github', disabled: true },
    { id: 'support', label: 'Support', icon: 'life-buoy' }
  ],
  [
    { id: 'logout', label: 'Log out', icon: 'log-out', shortcut: '⇧⌘Q' }
  ]
]

export const Default: Story = {
  render: (args) => ({
    components: { CDropdownMenu, CButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center;">
        <CDropdownMenu v-bind="args" @select="onSelect">
          <template #trigger>
            <CButton>Open Menu</CButton>
          </template>
        </CDropdownMenu>
      </div>
    `,
    methods: {
      onSelect(item: any) {
        console.log('Selected:', item)
      }
    }
  }),
  args: {
    items: sampleItems,
    placement: 'bottom-start',
    trigger: 'click'
  }
}
