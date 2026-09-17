/**
 * @fileoverview Storybook stories for CSwitch component
 *
 * This file contains comprehensive Storybook stories for the CSwitch component
 * including default stories, all variants, edge cases, and interactive examples.
 *
 * @author CelestialUI Team
 * @version 1.0.0
 */

import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import { within, userEvent, expect } from '@storybook/test'
import CSwitch from '../CSwitch.vue'

/**
 * Meta configuration for CSwitch stories
 */
const meta: Meta<typeof CSwitch> = {
  title: 'Atoms/CSwitch',
  component: CSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# CSwitch

A binary on/off toggle control component with full accessibility support, keyboard navigation, and customizable appearance.

## Features

- **v-model support** for two-way data binding
- **Keyboard navigation** (Space, Enter keys)
- **ARIA attributes** for screen readers
- **Customizable size and color variants**
- **Loading and disabled states**
- **Custom slots** for track and thumb content
- **Focus management** and visual feedback

## Usage

\`\`\`vue
<template>
  <CSwitch v-model="isEnabled" />
</template>

<script setup>
import { ref } from 'vue'
import { CSwitch } from '@lib/components/atoms/switch'

const isEnabled = ref(false)
</script>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'The current state of the switch (true = on, false = off)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the switch',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Color theme variant',
      table: {
        type: { summary: "'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'" },
        defaultValue: { summary: "'primary'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the switch is in a loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    focusable: {
      control: 'boolean',
      description: 'Whether the switch should be focusable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for accessibility',
      table: {
        type: { summary: 'string' },
      },
    },
    ariaDescribedBy: {
      control: 'text',
      description: 'ARIA described by for accessibility',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    modelValue: false,
    size: 'md',
    color: 'primary',
    disabled: false,
    loading: false,
    focusable: true,
    ariaLabel: 'Toggle switch',
    onUpdateModelValue: action('update:modelValue'),
    onChange: action('change'),
    onClick: action('click'),
    onFocus: action('focus'),
    onBlur: action('blur'),
    onKeydown: action('keydown'),
  },
}

export default meta

/**
 * Default story showing basic switch functionality
 */
export const Default: StoryObj<typeof CSwitch> = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  args: {
    modelValue: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchElement = canvas.getByRole('switch')

    // Test initial state
    await expect(switchElement).toHaveAttribute('aria-checked', 'false')

    // Test click interaction
    await userEvent.click(switchElement)
    await expect(switchElement).toHaveAttribute('aria-checked', 'true')
  },
}

/**
 * Story showing switch in the "on" state
 */
export const On: StoryObj<typeof CSwitch> = {
  args: {
    modelValue: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchElement = canvas.getByRole('switch')

    await expect(switchElement).toHaveAttribute('aria-checked', 'true')
  },
}

/**
 * Story showing disabled switch
 */
export const Disabled: StoryObj<typeof CSwitch> = {
  args: {
    modelValue: false,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchElement = canvas.getByRole('switch')

    await expect(switchElement).toHaveAttribute('aria-disabled', 'true')
    await expect(switchElement).toHaveAttribute('tabindex', '-1')
  },
}

/**
 * Story showing loading state
 */
export const Loading: StoryObj<typeof CSwitch> = {
  args: {
    modelValue: false,
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const switchElement = canvas.getByRole('switch')

    // Should not be clickable when loading
    await userEvent.click(switchElement)
    // No state change should occur
  },
}

/**
 * Story showing all size variants
 */
export const Sizes: StoryObj<typeof CSwitch> = {
  render: () => ({
    components: { CSwitch },
    template: `
      <div class="flex flex-col gap-4 items-center">
        <div class="flex items-center gap-2">
          <span class="w-16 text-sm">Small:</span>
          <CSwitch :model-value="false" size="sm" />
        </div>
        <div class="flex items-center gap-2">
          <span class="w-16 text-sm">Medium:</span>
          <CSwitch :model-value="false" size="md" />
        </div>
        <div class="flex items-center gap-2">
          <span class="w-16 text-sm">Large:</span>
          <CSwitch :model-value="false" size="lg" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants of the switch component.',
      },
    },
  },
}

/**
 * Story showing all color variants
 */
export const Colors: StoryObj<typeof CSwitch> = {
  render: () => ({
    components: { CSwitch },
    template: `
      <div class="flex flex-col gap-4 items-center">
        <div class="flex items-center gap-2">
          <span class="w-20 text-sm">Primary:</span>
          <CSwitch :model-value="true" color="primary" />
        </div>
        <div class="flex items-center gap-2">
          <span class="w-20 text-sm">Secondary:</span>
          <CSwitch :model-value="true" color="secondary" />
        </div>
        <div class="flex items-center gap-2">
          <span class="w-20 text-sm">Success:</span>
          <CSwitch :model-value="true" color="success" />
        </div>
        <div class="flex items-center gap-2">
          <span class="w-20 text-sm">Warning:</span>
          <CSwitch :model-value="true" color="warning" />
        </div>
        <div class="flex items-center gap-2">
          <span class="w-20 text-sm">Error:</span>
          <CSwitch :model-value="true" color="error" />
        </div>
        <div class="flex items-center gap-2">
          <span class="w-20 text-sm">Info:</span>
          <CSwitch :model-value="true" color="info" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different color variants of the switch component.',
      },
    },
  },
}

/**
 * Story showing all states combination
 */
export const AllStates: StoryObj<typeof CSwitch> = {
  render: () => ({
    components: { CSwitch },
    template: `
      <div class="grid grid-cols-2 gap-6">
        <div class="flex flex-col gap-4">
          <h3 class="text-lg font-semibold">Normal States</h3>
          <div class="flex items-center gap-2">
            <span class="w-20 text-sm">Off:</span>
            <CSwitch :model-value="false" />
          </div>
          <div class="flex items-center gap-2">
            <span class="w-20 text-sm">On:</span>
            <CSwitch :model-value="true" />
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h3 class="text-lg font-semibold">Special States</h3>
          <div class="flex items-center gap-2">
            <span class="w-20 text-sm">Disabled:</span>
            <CSwitch :model-value="false" disabled />
          </div>
          <div class="flex items-center gap-2">
            <span class="w-20 text-sm">Loading:</span>
            <CSwitch :model-value="false" loading />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All possible states of the switch component.',
      },
    },
  },
}

/**
 * Story showing custom slots usage
 */
export const CustomSlots: StoryObj<typeof CSwitch> = {
  render: () => ({
    components: { CSwitch },
    template: `
      <div class="flex flex-col gap-6 items-center">
        <div class="flex items-center gap-2">
          <span class="w-24 text-sm">Custom Track:</span>
          <CSwitch :model-value="true" class="custom-switch">
            <template #track="{ isOn, disabled }">
              <div class="custom-track" :class="{ active: isOn, disabled }">
                {{ isOn ? 'ON' : 'OFF' }}
              </div>
            </template>
          </CSwitch>
        </div>

        <div class="flex items-center gap-2">
          <span class="w-24 text-sm">Custom Thumb:</span>
          <CSwitch :model-value="true" class="custom-switch">
            <template #thumb="{ isOn, disabled }">
              <div class="custom-thumb" :class="{ active: isOn, disabled }">
                {{ isOn ? '✓' : '✗' }}
              </div>
            </template>
          </CSwitch>
        </div>
      </div>
    `,
    styles: [
      `
      .custom-track {
        width: 100%;
        height: 100%;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        color: white;
        background: #d1d5db;
        transition: all 0.2s ease;
      }

      .custom-track.active {
        background: #3b82f6;
      }

      .custom-track.disabled {
        opacity: 0.5;
      }

      .custom-thumb {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        font-size: 12px;
        font-weight: bold;
        color: #3b82f6;
        transition: all 0.2s ease;
      }

      .custom-thumb.active {
        color: #10b981;
      }

      .custom-thumb.disabled {
        opacity: 0.5;
      }
    `,
    ],
  }),
  parameters: {
    docs: {
      description: {
        story: 'Examples of using custom slots to customize the switch appearance.',
      },
    },
  },
}

/**
 * Story showing interactive example with form
 */
export const InteractiveExample: StoryObj<typeof CSwitch> = {
  render: () => ({
    components: { CSwitch },
    data() {
      return {
        notifications: true,
        darkMode: false,
        autoSave: false,
        analytics: true,
      }
    },
    template: `
      <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Settings</h2>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium">Push Notifications</label>
              <p class="text-xs text-gray-500">Receive notifications on your device</p>
            </div>
            <CSwitch v-model="notifications" />
          </div>

          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium">Dark Mode</label>
              <p class="text-xs text-gray-500">Switch to dark theme</p>
            </div>
            <CSwitch v-model="darkMode" color="secondary" />
          </div>

          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium">Auto Save</label>
              <p class="text-xs text-gray-500">Automatically save your work</p>
            </div>
            <CSwitch v-model="autoSave" color="success" />
          </div>

          <div class="flex items-center justify-between">
            <div>
              <label class="text-sm font-medium">Analytics</label>
              <p class="text-xs text-gray-500">Help us improve by sharing usage data</p>
            </div>
            <CSwitch v-model="analytics" color="info" />
          </div>
        </div>

        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 class="text-sm font-medium mb-2">Current Settings:</h3>
          <ul class="text-xs space-y-1">
            <li>Notifications: {{ notifications ? 'On' : 'Off' }}</li>
            <li>Dark Mode: {{ darkMode ? 'On' : 'Off' }}</li>
            <li>Auto Save: {{ autoSave ? 'On' : 'Off' }}</li>
            <li>Analytics: {{ analytics ? 'On' : 'Off' }}</li>
          </ul>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'An interactive example showing how switches might be used in a settings form.',
      },
    },
  },
}

/**
 * Story showing accessibility features
 */
export const Accessibility: StoryObj<typeof CSwitch> = {
  render: () => ({
    components: { CSwitch },
    template: `
      <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Accessibility Demo</h2>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <label for="switch-1" class="text-sm font-medium">Enable notifications</label>
            <CSwitch
              id="switch-1"
              :model-value="false"
              aria-label="Enable push notifications"
              aria-describedby="notifications-desc"
            />
          </div>
          <p id="notifications-desc" class="text-xs text-gray-500">
            You will receive push notifications when new messages arrive.
          </p>

          <div class="flex items-center justify-between">
            <label for="switch-2" class="text-sm font-medium">Dark mode</label>
            <CSwitch
              id="switch-2"
              :model-value="true"
              aria-label="Toggle dark mode"
            />
          </div>

          <div class="flex items-center justify-between">
            <label for="switch-3" class="text-sm font-medium">Disabled option</label>
            <CSwitch
              id="switch-3"
              :model-value="false"
              disabled
              aria-label="This option is currently disabled"
            />
          </div>
        </div>

        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 class="text-sm font-medium mb-2">Accessibility Features:</h3>
          <ul class="text-xs space-y-1">
            <li>• Proper ARIA roles and attributes</li>
            <li>• Keyboard navigation (Space/Enter)</li>
            <li>• Focus management</li>
            <li>• Screen reader support</li>
            <li>• High contrast mode support</li>
          </ul>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test keyboard navigation
    const firstSwitch = canvas.getByLabelText('Enable push notifications')
    await userEvent.tab()
    await expect(firstSwitch).toHaveFocus()

    // Test space key activation
    await userEvent.keyboard(' ')
    await expect(firstSwitch).toHaveAttribute('aria-checked', 'true')
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of accessibility features including ARIA attributes, keyboard navigation, and screen reader support.',
      },
    },
  },
}

/**
 * Story showing edge cases and error states
 */
export const EdgeCases: StoryObj<typeof CSwitch> = {
  render: () => ({
    components: { CSwitch },
    template: `
      <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Edge Cases</h2>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm">Loading state:</span>
            <CSwitch :model-value="true" loading />
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm">Disabled + Loading:</span>
            <CSwitch :model-value="false" disabled loading />
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm">Not focusable:</span>
            <CSwitch :model-value="true" :focusable="false" />
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm">Custom tab index:</span>
            <CSwitch :model-value="false" :tab-index="5" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases and special configurations of the switch component.',
      },
    },
  },
}
