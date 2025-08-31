import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, computed } from 'vue'
import CCheckbox from '../CCheckbox.vue'

const meta: Meta<typeof CCheckbox> = {
  title: 'Components/Atoms/CCheckbox',
  component: CCheckbox,
  parameters: {
    docs: {
      description: {
        component: 'A versatile checkbox component with support for indeterminate states, custom icons, and various sizes and color schemes. SSR-friendly and accessible by default.'
      }
    }
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checkbox checked state (mandatory)'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox'
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'purple', 'pink'],
      description: 'Color scheme for the checkbox'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state for partial selection'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    children: {
      control: 'text',
      description: 'Label text content'
    },
    id: {
      control: 'text',
      description: 'Unique identifier'
    },
    name: {
      control: 'text',
      description: 'Form field name'
    },
    value: {
      control: 'text',
      description: 'Form field value'
    },
    ariaDescribedBy: {
      control: 'text',
      description: 'Accessibility description reference'
    },
    tabIndex: {
      control: 'number',
      description: 'Tab order control'
    },
    form: {
      control: 'text',
      description: 'Associated form element'
    },
    checkIcon: {
      control: 'text',
      description: 'Custom check icon'
    },
    indeterminateIcon: {
      control: 'text',
      description: 'Custom indeterminate icon'
    },
    onChange: {
      action: 'change',
      description: 'Fired when checkbox state changes'
    },
    onFocus: {
      action: 'focus',
      description: 'Fired when checkbox receives focus'
    },
    onBlur: {
      action: 'blur',
      description: 'Fired when checkbox loses focus'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof CCheckbox>

// Default story
export const Default: Story = {
  args: {
    checked: false,
    children: 'Accept terms and conditions'
  }
}

// Checked state
export const Checked: Story = {
  args: {
    checked: true,
    children: 'Newsletter subscription'
  }
}

// Indeterminate state
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    children: 'Select all items'
  }
}

// Disabled states
export const Disabled: Story = {
  args: {
    disabled: true,
    checked: false,
    children: 'Disabled checkbox'
  }
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    children: 'Disabled checked'
  }
}

// Size variants
export const Sizes: Story = {
  render: () => ({
    components: { CCheckbox },
    template: `
      <div class="space-y-4">
        <CCheckbox :checked="true" size="sm" children="Small checkbox" />
        <CCheckbox :checked="true" size="md" children="Medium checkbox" />
        <CCheckbox :checked="true" size="lg" children="Large checkbox" />
      </div>
    `
  })
}

// Color schemes
export const ColorSchemes: Story = {
  render: () => ({
    components: { CCheckbox },
    template: `
      <div class="space-y-4">
        <CCheckbox :checked="true" color-scheme="primary" children="Primary" />
        <CCheckbox :checked="true" color-scheme="secondary" children="Secondary" />
        <CCheckbox :checked="true" color-scheme="success" children="Success" />
        <CCheckbox :checked="true" color-scheme="warning" children="Warning" />
        <CCheckbox :checked="true" color-scheme="danger" children="Danger" />
        <CCheckbox :checked="true" color-scheme="info" children="Info" />
        <CCheckbox :checked="true" color-scheme="purple" children="Purple" />
        <CCheckbox :checked="true" color-scheme="pink" children="Pink" />
      </div>
    `
  })
}

// Interactive example
export const Interactive: Story = {
  render: () => ({
    components: { CCheckbox },
    setup() {
      const isChecked = ref(false)
      const handleChange = (checked: boolean) => {
        isChecked.value = checked
      }
      return { isChecked, handleChange }
    },
    template: `
      <div class="space-y-4">
        <CCheckbox
          :checked="isChecked"
          @change="handleChange"
          children="Toggle me!"
        />
        <p>Checked: {{ isChecked ? 'Yes' : 'No' }}</p>
      </div>
    `
  })
}

// With custom icons
export const CustomIcons: Story = {
  args: {
    checked: true,
    checkIcon: '✅',
    children: 'Custom check icon'
  }
}

export const CustomIndeterminateIcon: Story = {
  args: {
    indeterminate: true,
    indeterminateIcon: '◆',
    children: 'Custom indeterminate icon'
  }
}

// With description slot
export const WithDescription: Story = {
  render: () => ({
    components: { CCheckbox },
    template: `
      <CCheckbox :checked="false" children="Enable notifications">
        <template #description>
          <span class="text-sm text-gray-600">
            Receive email updates about your account activity
          </span>
        </template>
      </CCheckbox>
    `
  })
}

// Form integration
export const FormIntegration: Story = {
  render: () => ({
    components: { CCheckbox },
    setup() {
      const formData = ref({
        newsletter: false,
        terms: false,
        marketing: true
      })

      const handleSubmit = (e: Event) => {
        e.preventDefault()
        console.log('Form data:', formData.value)
      }

      return { formData, handleSubmit }
    },
    template: `
      <form @submit="handleSubmit" class="space-y-4 p-4 border rounded">
        <h3 class="text-lg font-semibold mb-4">User Preferences</h3>

        <CCheckbox
          v-model:checked="formData.newsletter"
          name="newsletter"
          value="yes"
          children="Subscribe to newsletter"
        />

        <CCheckbox
          v-model:checked="formData.terms"
          name="terms"
          value="accepted"
          children="I agree to the terms and conditions"
        />

        <CCheckbox
          v-model:checked="formData.marketing"
          name="marketing"
          value="yes"
          children="Receive marketing emails"
        />

        <button
          type="submit"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Preferences
        </button>

        <pre class="mt-4 p-2 bg-gray-100 rounded text-sm">{{ JSON.stringify(formData, null, 2) }}</pre>
      </form>
    `
  })
}

// Accessibility example
export const AccessibilityExample: Story = {
  render: () => ({
    components: { CCheckbox },
    template: `
      <div class="space-y-4">
        <div>
          <CCheckbox
            :checked="false"
            id="a11y-checkbox"
            aria-described-by="help-text"
            children="Accessible checkbox"
          />
          <div id="help-text" class="text-sm text-gray-600 mt-1">
            This checkbox demonstrates proper accessibility attributes
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-700 mb-2">
            Navigation: Use Tab to focus, Space to toggle
          </p>
          <CCheckbox
            :checked="false"
            tab-index="0"
            children="Focus me with Tab key"
          />
        </div>
      </div>
    `
  })
}

// List selection example
export const ListSelection: Story = {
  render: () => ({
    components: { CCheckbox },
    setup() {
      const items = ref([
        { id: 1, name: 'Item 1', selected: false },
        { id: 2, name: 'Item 2', selected: true },
        { id: 3, name: 'Item 3', selected: false },
        { id: 4, name: 'Item 4', selected: true }
      ])

      const allSelected = computed(() => items.value.every(item => item.selected))
      const someSelected = computed(() => items.value.some(item => item.selected))
      const indeterminate = computed(() => someSelected.value && !allSelected.value)

      const toggleAll = () => {
        const newState = !allSelected.value
        items.value.forEach(item => {
          item.selected = newState
        })
      }

      const toggleItem = (id: number) => {
        const item = items.value.find(item => item.id === id)
        if (item) {
          item.selected = !item.selected
        }
      }

      return { items, allSelected, indeterminate, toggleAll, toggleItem }
    },
    template: `
      <div class="p-4 border rounded space-y-3">
        <CCheckbox
          :checked="allSelected"
          :indeterminate="indeterminate"
          @change="toggleAll"
          children="Select all items"
          class="font-semibold border-b pb-2"
        />

        <div class="space-y-2 ml-4">
          <CCheckbox
            v-for="item in items"
            :key="item.id"
            :checked="item.selected"
            @change="() => toggleItem(item.id)"
            :children="item.name"
          />
        </div>

        <div class="mt-4 p-2 bg-gray-50 rounded text-sm">
          Selected: {{ items.filter(item => item.selected).length }} of {{ items.length }}
        </div>
      </div>
    `
  })
}
