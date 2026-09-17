import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import CProgress from '../CProgress.vue'

const meta: Meta<typeof CProgress> = {
  title: 'Atoms/Progress',
  component: CProgress,
  parameters: {
    docs: {
      description: {
        component: `
# CProgress

A versatile progress indicator component with accessibility features, animations, and customizable styling. Supports both determinate and indeterminate progress states.

## Features
- Multiple size options (sm, md, lg)
- Determinate and indeterminate progress modes
- Animated and striped variants
- Custom text formatting
- Comprehensive accessibility support
- Keyboard navigation
- Custom styling options
- Slot support for labels and text

## Usage
\`\`\`vue
<template>
  <CProgress
    :value="progressValue"
    :max="100"
    size="md"
    label="Upload Progress"
    show-percentage
    @complete="handleComplete"
  />
</template>

<script setup>
import { ref } from 'vue'
import CProgress from '@/components/atoms/progress/CProgress.vue'

const progressValue = ref(0)

const handleComplete = () => {
  console.log('Progress complete!')
}
</script>
\`\`\`
        `,
      },
    },
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0 to max)',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum progress value',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the progress bar',
    },
    colorScheme: {
      control: 'select',
      options: ['primary', 'blue', 'green', 'success', 'purple', 'amber', 'warning', 'red', 'danger', 'secondary', 'info'],
      description: 'Color scheme of the progress bar fill',
    },
    label: {
      control: 'text',
      description: 'Progress label for accessibility',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Whether to show percentage text',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to show value text',
    },
    animated: {
      control: 'boolean',
      description: 'Whether the progress bar is animated',
    },
    striped: {
      control: 'boolean',
      description: 'Whether to show progress bar stripes',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the progress bar is indeterminate',
    },
    animationDuration: {
      control: { type: 'range', min: 100, max: 2000, step: 100 },
      description: 'Animation duration in milliseconds',
    },
    customClass: {
      control: 'text',
      description: 'Custom CSS class for the progress bar',
    },
    fillClass: {
      control: 'text',
      description: 'Custom CSS class for the progress fill',
    },
    textClass: {
      control: 'text',
      description: 'Custom CSS class for the progress text',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label override',
    },
    ariaDescribedBy: {
      control: 'text',
      description: 'Accessibility description',
    },
    onComplete: {
      action: 'complete',
      description: 'Emitted when progress reaches 100%',
    },
    onChange: {
      action: 'change',
      description: 'Emitted when progress value changes',
    },
    onFocus: {
      action: 'focus',
      description: 'Focus event handler',
    },
    onBlur: {
      action: 'blur',
      description: 'Blur event handler',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CProgress>

// Default story
export const Default: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  args: {
    value: 50,
    max: 100,
    size: 'md',
    label: 'Upload progress',
  },
  render: (args) => ({
    components: { CProgress },
    setup() {
      return { args }
    },
    template: '<CProgress v-bind="args" />',
  }),
}

// Basic progress with label
export const WithLabel: Story = {
  args: {
    value: 75,
    max: 100,
    size: 'md',
    label: 'Upload Progress',
  },
  render: (args) => ({
    components: { CProgress },
    setup() {
      return { args }
    },
    template: '<CProgress v-bind="args" />',
  }),
}

// Progress with percentage
export const WithPercentage: Story = {
  args: {
    value: 60,
    max: 100,
    size: 'md',
    label: 'Download Progress',
    showPercentage: true,
  },
  render: (args) => ({
    components: { CProgress },
    setup() {
      return { args }
    },
    template: '<CProgress v-bind="args" />',
  }),
}

// Progress with value and percentage
export const WithValueAndPercentage: Story = {
  args: {
    value: 40,
    max: 100,
    size: 'md',
    label: 'Processing',
    showValue: true,
    showPercentage: true,
  },
  render: (args) => ({
    components: { CProgress },
    setup() {
      return { args }
    },
    template: '<CProgress v-bind="args" />',
  }),
}

// Size variants
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Available progress bar sizes from small to large.',
      },
    },
  },
  render: () => ({
    components: { CProgress },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <CProgress
          :value="50"
          :max="100"
          size="sm"
          label="Small Progress"
          show-percentage
        />
        <CProgress
          :value="50"
          :max="100"
          size="md"
          label="Medium Progress"
          show-percentage
        />
        <CProgress
          :value="50"
          :max="100"
          size="lg"
          label="Large Progress"
          show-percentage
        />
      </div>
    `,
  }),
}

// Animated progress
export const Animated: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Animated progress bars with smooth transitions.',
      },
    },
  },
  render: () => ({
    components: { CProgress },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <CProgress
          :value="30"
          :max="100"
          size="md"
          label="Animated Progress"
          animated
          show-percentage
        />
        <CProgress
          :value="70"
          :max="100"
          size="md"
          label="Animated Striped"
          animated
          striped
          show-percentage
        />
      </div>
    `,
  }),
}

// Striped progress
export const Striped: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Striped progress bars for visual appeal.',
      },
    },
  },
  render: () => ({
    components: { CProgress },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <CProgress
          :value="25"
          :max="100"
          size="md"
          label="Striped Progress"
          striped
          show-percentage
        />
        <CProgress
          :value="50"
          :max="100"
          size="md"
          label="Striped Progress"
          striped
          show-percentage
        />
        <CProgress
          :value="75"
          :max="100"
          size="md"
          label="Striped Progress"
          striped
          show-percentage
        />
      </div>
    `,
  }),
}

// Indeterminate progress
export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate progress bars for unknown completion times.',
      },
    },
  },
  render: () => ({
    components: { CProgress },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <CProgress
          :value="0"
          :max="100"
          size="sm"
          label="Loading..."
          indeterminate
        />
        <CProgress
          :value="0"
          :max="100"
          size="md"
          label="Processing..."
          indeterminate
        />
        <CProgress
          :value="0"
          :max="100"
          size="lg"
          label="Uploading..."
          indeterminate
        />
      </div>
    `,
  }),
}

// Custom max value
export const CustomMax: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Progress bars with custom maximum values.',
      },
    },
  },
  render: () => ({
    components: { CProgress },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <CProgress
          :value="25"
          :max="50"
          size="md"
          label="Steps (25/50)"
          show-value
          show-percentage
        />
        <CProgress
          :value="150"
          :max="200"
          size="md"
          label="Points (150/200)"
          show-value
          show-percentage
        />
        <CProgress
          :value="3"
          :max="10"
          size="md"
          label="Items (3/10)"
          show-value
          show-percentage
        />
      </div>
    `,
  }),
}

// Interactive progress
export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive progress bar that can be controlled with buttons.',
      },
    },
  },
  render: () => ({
    components: { CProgress },
    setup() {
      const progress = ref(0)

      const increment = () => {
        if (progress.value < 100) {
          progress.value += 10
        }
      }

      const decrement = () => {
        if (progress.value > 0) {
          progress.value -= 10
        }
      }

      const reset = () => {
        progress.value = 0
      }

      const complete = () => {
        progress.value = 100
      }

      const handleComplete = () => {
        console.log('Progress completed!')
      }

      return {
        progress,
        increment,
        decrement,
        reset,
        complete,
        handleComplete,
      }
    },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <CProgress
          :value="progress"
          :max="100"
          size="md"
          label="Interactive Progress"
          show-percentage
          animated
          @complete="handleComplete"
        />
        <div class="flex gap-2 flex-wrap">
          <button
            @click="decrement"
            :disabled="progress <= 0"
            class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            -10
          </button>
          <button
            @click="increment"
            :disabled="progress >= 100"
            class="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            +10
          </button>
          <button
            @click="reset"
            class="px-3 py-1 bg-gray-200 rounded"
          >
            Reset
          </button>
          <button
            @click="complete"
            class="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Complete
          </button>
        </div>
      </div>
    `,
  }),
}

// Color schemes
export const ColorSchemes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Progress bars with various semantic color scheme variants.',
      },
    },
  },
  render: () => ({
    components: { CProgress },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <CProgress :value="75" color-scheme="primary" label="Primary (Blue)" show-percentage />
        <CProgress :value="85" color-scheme="success" label="Success (Green)" show-percentage />
        <CProgress :value="60" color-scheme="amber" label="Amber / Warning" show-percentage />
        <CProgress :value="40" color-scheme="danger" label="Danger (Red)" show-percentage />
        <CProgress :value="90" color-scheme="purple" label="Purple" show-percentage />
        <CProgress :value="50" color-scheme="secondary" label="Secondary" show-percentage />
      </div>
    `,
  }),
}

// Custom formatting
export const CustomFormatting: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Progress bars with custom text formatting.',
      },
    },
  },
  render: () => ({
    components: { CProgress },
    setup() {
      const customFormat = (value: number, max: number, percentage: number) =>
        `${value}/${max} (${percentage}%)`

      const fileFormat = (value: number, max: number, _percentage: number) =>
        `${Math.round((value / max) * 100)}% uploaded`

      return { customFormat, fileFormat }
    },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <CProgress
          :value="75"
          :max="100"
          size="md"
          label="Custom Format"
          :text-format="customFormat"
        />
        <CProgress
          :value="60"
          :max="100"
          size="md"
          label="File Upload"
          :text-format="fileFormat"
        />
      </div>
    `,
  }),
}

// With slots
export const WithSlots: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Progress bars with custom slot content.',
      },
    },
  },
  render: () => ({
    components: { CProgress },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <CProgress
          :value="80"
          :max="100"
          size="md"
        >
          <template #label>
            <span class="font-bold text-blue-600">Custom Label</span>
          </template>
          <template #text>
            <span class="text-green-600 font-semibold">Almost done!</span>
          </template>
        </CProgress>

        <CProgress
          :value="45"
          :max="100"
          size="md"
        >
          <template #label>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>In Progress</span>
            </div>
          </template>
          <template #text>
            <div class="text-right">
              <div class="text-sm text-gray-500">ETA: 2 minutes</div>
              <div class="font-medium">45%</div>
            </div>
          </template>
        </CProgress>
      </div>
    `,
  }),
}

// Edge cases
export const EdgeCases: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge cases and boundary conditions.',
      },
    },
  },
  render: () => ({
    components: { CProgress },
    template: `
      <div class="space-y-4 w-full max-w-md">
        <CProgress
          :value="0"
          :max="100"
          size="md"
          label="Zero Progress"
          show-percentage
        />
        <CProgress
          :value="100"
          :max="100"
          size="md"
          label="Complete Progress"
          show-percentage
        />
        <CProgress
          :value="150"
          :max="100"
          size="md"
          label="Over Max (clamped)"
          show-percentage
        />
        <CProgress
          :value="-10"
          :max="100"
          size="md"
          label="Negative (clamped)"
          show-percentage
        />
      </div>
    `,
  }),
}

// Theme support showcase
export const ThemeSupport: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Progress bars rendered under Light, Dark, and Celestial theme containers.',
      },
    },
  },
  render: () => ({
    components: { CProgress },
    template: `
      <div class="space-y-6 w-full max-w-xl">
        <!-- Light Theme Box -->
        <div data-theme="light" class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm space-y-3">
          <div class="text-xs font-bold uppercase tracking-wider text-gray-500">Light Mode (Default)</div>
          <CProgress :value="65" label="Uploading Assets" show-percentage />
          <CProgress :value="40" color-scheme="success" label="Building Package" show-percentage />
        </div>

        <!-- Dark Theme Box -->
        <div data-theme="dark" class="dark cui-dark p-4 bg-gray-900 rounded-lg border border-gray-800 shadow-sm space-y-3">
          <div class="text-xs font-bold uppercase tracking-wider text-gray-400">Dark Mode</div>
          <CProgress :value="65" label="Uploading Assets" show-percentage />
          <CProgress :value="40" color-scheme="success" label="Building Package" show-percentage />
        </div>

        <!-- Celestial Theme Box -->
        <div data-theme="celestial" class="dark cui-dark p-4 bg-[#0f0f23] rounded-lg border border-purple-900/40 shadow-sm space-y-3">
          <div class="text-xs font-bold uppercase tracking-wider text-purple-300">Celestial Mode</div>
          <CProgress :value="65" label="Uploading Assets" show-percentage />
          <CProgress :value="40" color-scheme="purple" label="Building Package" show-percentage />
        </div>
      </div>
    `,
  }),
}

// Playground
export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different progress configurations.',
      },
    },
  },
  args: {
    value: 50,
    max: 100,
    size: 'md',
    label: 'Progress',
    showPercentage: false,
    showValue: false,
    animated: false,
    striped: false,
    indeterminate: false,
    animationDuration: 300,
    customClass: '',
    fillClass: '',
    textClass: '',
    ariaLabel: '',
    ariaDescribedBy: '',
  },
  render: (args) => ({
    components: { CProgress },
    setup() {
      const handleComplete = () => {
        console.log('Progress completed!')
      }

      const handleChange = (value: number, percentage: number) => {
        console.log(`Progress changed: ${value} (${percentage}%)`)
      }

      return { args, handleComplete, handleChange }
    },
    template: `
      <div class="space-y-4">
        <CProgress
          v-bind="args"
          @complete="handleComplete"
          @change="handleChange"
        />
        <div class="text-sm text-gray-600">
          <p>Configure the progress bar using the controls panel below.</p>
          <p>Check the Actions panel for event logs.</p>
        </div>
      </div>
    `,
  }),
}

