import type { Meta, StoryObj } from '@storybook/vue3'
import CInput from './CInput.vue'

const meta = {
  title: 'Components/Input',
  component: CInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile input component with floating labels, validation, icons, and multiple variants.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: 'Input value'
    },
    label: {
      control: { type: 'text' },
      description: 'Input label'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text'
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type'
    },
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'underlined'],
      description: 'Visual variant'
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Input size'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled'
    },
    readonly: {
      control: { type: 'boolean' },
      description: 'Whether the input is readonly'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required'
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Whether the input can be cleared'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the input is in loading state'
    },
    prefixIcon: {
      control: { type: 'text' },
      description: 'Icon to display at the start'
    },
    suffixIcon: {
      control: { type: 'text' },
      description: 'Icon to display at the end'
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text below the input'
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message to display'
    }
  },
  args: {
    variant: 'outlined',
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
    clearable: false,
    loading: false
  }
} satisfies Meta<typeof CInput>

export default meta
type Story = StoryObj<typeof meta>

// Basic input
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email'
  }
}

export const WithValue: Story = {
  args: {
    label: 'Email Address',
    modelValue: 'user@example.com',
    placeholder: 'Enter your email'
  }
}

export const WithIcon: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    prefixIcon: 'envelope'
  }
}

export const Clearable: Story = {
  args: {
    label: 'Search',
    modelValue: 'Search query',
    placeholder: 'Enter search term',
    prefixIcon: 'search',
    clearable: true
  }
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    prefixIcon: 'lock'
  }
}

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Must be at least 3 characters long'
  }
}

export const WithError: Story = {
  args: {
    label: 'Email Address',
    modelValue: 'invalid-email',
    placeholder: 'Enter your email',
    prefixIcon: 'envelope',
    errorMessage: 'Please enter a valid email address'
  }
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    modelValue: 'Cannot edit this',
    disabled: true
  }
}

export const Loading: Story = {
  args: {
    label: 'Loading Input',
    placeholder: 'Please wait...',
    loading: true
  }
}

// Size variants
export const Sizes: Story = {
  render: () => ({
    components: { CInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <CInput label="Extra Small" size="xs" placeholder="xs size" />
        <CInput label="Small" size="sm" placeholder="sm size" />
        <CInput label="Medium" size="md" placeholder="md size" />
        <CInput label="Large" size="lg" placeholder="lg size" />
        <CInput label="Extra Large" size="xl" placeholder="xl size" />
      </div>
    `
  })
}

// Variant styles
export const Variants: Story = {
  render: () => ({
    components: { CInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <CInput label="Outlined" variant="outlined" placeholder="Outlined input" />
        <CInput label="Filled" variant="filled" placeholder="Filled input" />
        <CInput label="Underlined" variant="underlined" placeholder="Underlined input" />
      </div>
    `
  })
}

// Interactive playground
export const Playground: Story = {
  args: {
    label: 'Playground Input',
    placeholder: 'Try different props',
    prefixIcon: 'star',
    clearable: true,
    helperText: 'Customize this input using the controls panel'
  }
}
