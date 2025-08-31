import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CInput from '../CInput.vue'

const meta: Meta<typeof CInput> = {
  title: 'Components/Atoms/CInput',
  component: CInput,
  parameters: {
    docs: {
      description: {
        component: 'A versatile input component with validation, states, and accessibility support. Features debouncing, multiple variants, and comprehensive form integration.'
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Input value (mandatory)'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url', 'tel', 'search'],
      description: 'Input type'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size'
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'unstyled'],
      description: 'Visual variant'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state'
    },
    required: {
      control: 'boolean',
      description: 'Required field'
    },
    invalid: {
      control: 'boolean',
      description: 'Invalid/error state'
    },
    debounceMs: {
      control: 'number',
      description: 'Debounce delay in milliseconds'
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input'
    },
    errorMessage: {
      control: 'text',
      description: 'Error message when invalid'
    },
    minLength: {
      control: 'number',
      description: 'Minimum character length'
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length'
    },
    onChange: {
      action: 'change',
      description: 'Fired when input value changes'
    },
    onInput: {
      action: 'input',
      description: 'Fired on real-time input'
    },
    onFocus: {
      action: 'focus',
      description: 'Fired when input receives focus'
    },
    onBlur: {
      action: 'blur',
      description: 'Fired when input loses focus'
    },
    onEnter: {
      action: 'enter',
      description: 'Fired when Enter key is pressed'
    },
    onEscape: {
      action: 'escape',
      description: 'Fired when Escape key is pressed'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof CInput>

// Default story
export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Enter text here'
  }
}

// Different input types
export const InputTypes: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const values = ref({
        text: '',
        email: '',
        password: '',
        number: '',
        url: '',
        tel: '',
        search: ''
      })
      return { values }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Text</label>
          <CInput v-model:value="values.text" type="text" placeholder="Enter text" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <CInput v-model:value="values.email" type="email" placeholder="Enter email address" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <CInput v-model:value="values.password" type="password" placeholder="Enter password" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Number</label>
          <CInput v-model:value="values.number" type="number" placeholder="Enter number" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">URL</label>
          <CInput v-model:value="values.url" type="url" placeholder="https://example.com" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Telephone</label>
          <CInput v-model:value="values.tel" type="tel" placeholder="+1 (555) 123-4567" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Search</label>
          <CInput v-model:value="values.search" type="search" placeholder="Search..." />
        </div>
      </div>
    `
  })
}

// Sizes
export const Sizes: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const values = ref({ sm: '', md: '', lg: '' })
      return { values }
    },
    template: `
      <div class="space-y-4">
        <CInput v-model:value="values.sm" size="sm" placeholder="Small input" />
        <CInput v-model:value="values.md" size="md" placeholder="Medium input" />
        <CInput v-model:value="values.lg" size="lg" placeholder="Large input" />
      </div>
    `
  })
}

// Variants
export const Variants: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const values = ref({ outline: '', filled: '', unstyled: '' })
      return { values }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Outline (default)</label>
          <CInput v-model:value="values.outline" variant="outline" placeholder="Outline variant" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Filled</label>
          <CInput v-model:value="values.filled" variant="filled" placeholder="Filled variant" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Unstyled</label>
          <CInput v-model:value="values.unstyled" variant="unstyled" placeholder="Unstyled variant" />
        </div>
      </div>
    `
  })
}

// States
export const States: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const values = ref({
        normal: 'Normal state',
        disabled: 'Disabled state',
        readonly: 'Readonly state',
        required: '',
        invalid: 'Invalid value'
      })
      return { values }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Normal</label>
          <CInput v-model:value="values.normal" placeholder="Normal input" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Disabled</label>
          <CInput v-model:value="values.disabled" disabled placeholder="Disabled input" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Readonly</label>
          <CInput v-model:value="values.readonly" readonly placeholder="Readonly input" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Required</label>
          <CInput v-model:value="values.required" required placeholder="Required input" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Invalid</label>
          <CInput
            v-model:value="values.invalid"
            invalid
            error-message="This field contains an error"
            placeholder="Invalid input"
          />
        </div>
      </div>
    `
  })
}

// With helper text and error messages
export const WithHelperText: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const values = ref({
        withHelper: '',
        withError: 'invalid@email'
      })
      return { values }
    },
    template: `
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-1">With Helper Text</label>
          <CInput
            v-model:value="values.withHelper"
            type="password"
            placeholder="Enter password"
            helper-text="Password must be at least 8 characters long with one uppercase letter"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">With Error Message</label>
          <CInput
            v-model:value="values.withError"
            type="email"
            invalid
            placeholder="Enter email"
            error-message="Please enter a valid email address"
          />
        </div>
      </div>
    `
  })
}

// With elements (icons, addons)
export const WithElements: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const values = ref({
        search: '',
        price: '',
        website: '',
        email: ''
      })
      return { values }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Search with icon</label>
          <CInput v-model:value="values.search" placeholder="Search products">
            <template #leftElement>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </template>
          </CInput>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Price with currency</label>
          <CInput v-model:value="values.price" type="number" placeholder="0.00">
            <template #leftElement>
              <span class="text-gray-500">$</span>
            </template>
            <template #rightElement>
              <span class="text-gray-500">USD</span>
            </template>
          </CInput>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Website URL</label>
          <CInput v-model:value="values.website" type="url" placeholder="example">
            <template #prepend>
              <span class="text-gray-500">https://</span>
            </template>
            <template #append>
              <span class="text-gray-500">.com</span>
            </template>
          </CInput>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Email with validation</label>
          <CInput v-model:value="values.email" type="email" placeholder="Enter email">
            <template #rightElement>
              <svg v-if="values.email && values.email.includes('@')" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <svg v-else-if="values.email" class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </template>
          </CInput>
        </div>
      </div>
    `
  })
}

// Validation example
export const Validation: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const formData = ref({
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      })

      const errors = ref({
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      })

      const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email) {
          errors.value.email = 'Email is required'
        } else if (!emailRegex.test(email)) {
          errors.value.email = 'Please enter a valid email address'
        } else {
          errors.value.email = ''
        }
      }

      const validatePassword = (password: string) => {
        if (!password) {
          errors.value.password = 'Password is required'
        } else if (password.length < 8) {
          errors.value.password = 'Password must be at least 8 characters'
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
          errors.value.password = 'Password must contain lowercase, uppercase, and number'
        } else {
          errors.value.password = ''
        }
      }

      const validateConfirmPassword = (confirmPassword: string) => {
        if (!confirmPassword) {
          errors.value.confirmPassword = 'Please confirm your password'
        } else if (confirmPassword !== formData.value.password) {
          errors.value.confirmPassword = 'Passwords do not match'
        } else {
          errors.value.confirmPassword = ''
        }
      }

      const validatePhone = (phone: string) => {
        const phoneRegex = /^\+?[\d\s\-()]+$/
        if (!phone) {
          errors.value.phone = 'Phone number is required'
        } else if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
          errors.value.phone = 'Please enter a valid phone number'
        } else {
          errors.value.phone = ''
        }
      }

      return {
        formData,
        errors,
        validateEmail,
        validatePassword,
        validateConfirmPassword,
        validatePhone
      }
    },
    template: `
      <form class="space-y-6 max-w-md">
        <div>
          <label class="block text-sm font-medium mb-1">Email Address *</label>
          <CInput
            v-model:value="formData.email"
            type="email"
            required
            :invalid="!!errors.email"
            :error-message="errors.email"
            placeholder="Enter your email"
            @blur="validateEmail(formData.email)"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password *</label>
          <CInput
            v-model:value="formData.password"
            type="password"
            required
            :invalid="!!errors.password"
            :error-message="errors.password"
            placeholder="Enter password"
            helper-text="Must be 8+ characters with uppercase, lowercase, and number"
            @input="validatePassword(formData.password)"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Confirm Password *</label>
          <CInput
            v-model:value="formData.confirmPassword"
            type="password"
            required
            :invalid="!!errors.confirmPassword"
            :error-message="errors.confirmPassword"
            placeholder="Confirm password"
            @input="validateConfirmPassword(formData.confirmPassword)"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Phone Number *</label>
          <CInput
            v-model:value="formData.phone"
            type="tel"
            required
            :invalid="!!errors.phone"
            :error-message="errors.phone"
            placeholder="+1 (555) 123-4567"
            @blur="validatePhone(formData.phone)"
          />
        </div>
      </form>
    `
  })
}

// Debounced input
export const DebouncedInput: Story = {
  render: () => ({
    components: { CInput },
    setup() {
      const searchValue = ref('')
      const changeCount = ref(0)
      const inputCount = ref(0)

      const handleChange = () => {
        changeCount.value++
      }

      const handleInput = () => {
        inputCount.value++
      }

      return { searchValue, changeCount, inputCount, handleChange, handleInput }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Debounced Search (500ms)</label>
          <CInput
            v-model:value="searchValue"
            :debounce-ms="500"
            placeholder="Type to search..."
            helper-text="Change events are debounced by 500ms"
            @change="handleChange"
            @input="handleInput"
          >
            <template #leftElement>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </template>
          </CInput>
        </div>

        <div class="p-4 bg-gray-50 rounded-lg">
          <p><strong>Value:</strong> "{{ searchValue }}"</p>
          <p><strong>Input events:</strong> {{ inputCount }}</p>
          <p><strong>Change events:</strong> {{ changeCount }}</p>
          <p class="text-sm text-gray-600 mt-2">
            Input events fire immediately, change events are debounced
          </p>
        </div>
      </div>
    `
  })
}

// Interactive playground
export const Playground: Story = {
  args: {
    value: '',
    placeholder: 'Playground input',
    type: 'text',
    size: 'md',
    variant: 'outline',
    disabled: false,
    readonly: false,
    required: false,
    invalid: false,
    helperText: '',
    errorMessage: '',
    debounceMs: 0
  }
}
