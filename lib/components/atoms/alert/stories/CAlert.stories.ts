import type { Meta, StoryObj } from '@storybook/vue3'
import CAlert from '../CAlert.vue'

const meta: Meta<typeof CAlert> = {
  title: 'Atoms/Alert',
  component: CAlert,
  parameters: {
    docs: {
      description: {
        component: `
# CAlert

A flexible and accessible alert component with multiple variants, states, and customization options. Built with WCAG 2.1 AA compliance and comprehensive keyboard navigation support.

## Features
- Multiple alert types (info, success, warning, error)
- Three size options (sm, md, lg)
- Dismissible with close button or keyboard (Escape)
- Auto-dismiss with optional progress bar
- Custom icons and content slots
- Loading state support
- Comprehensive accessibility features
- Smooth animations and transitions
- Responsive design

## Usage
\`\`\`vue
<template>
  <CAlert type="success" title="Success!" closable @close="handleClose">
    Your operation was completed successfully.
  </CAlert>
</template>
\`\`\`

## Accessibility
- ARIA roles and live regions for screen readers
- Keyboard navigation support (Escape to dismiss)
- High contrast mode support
- Reduced motion support
- Semantic HTML structure
        `,
      },
    },
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert type determining visual style and semantic meaning',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the alert',
    },
    title: {
      control: 'text',
      description: 'Optional title text displayed prominently',
    },
    closable: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed by the user',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed with keyboard (Escape)',
    },
    visible: {
      control: 'boolean',
      description: 'Whether the alert is visible (controlled visibility)',
    },
    autoDismiss: {
      control: 'number',
      description: 'Auto-dismiss timeout in milliseconds (0 = no auto-dismiss)',
    },
    showProgress: {
      control: 'boolean',
      description: 'Whether to show progress bar for auto-dismiss',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the icon',
    },
    icon: {
      control: 'text',
      description: 'Custom icon name to override default type-based icon',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether the alert has a border',
    },
    shadowed: {
      control: 'boolean',
      description: 'Whether the alert has a shadow',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the alert is in a loading state',
    },
    animation: {
      control: 'select',
      options: ['fade', 'slide', 'scale', 'none'],
      description: 'Animation variant for show/hide transitions',
    },
    ariaLive: {
      control: 'select',
      options: ['polite', 'assertive', 'off'],
      description: 'ARIA live region priority',
    },
    ariaLabel: {
      control: 'text',
      description: 'Custom ARIA label for the alert',
    },
    onClose: {
      action: 'close',
      description: 'Close event handler',
    },
    onShow: {
      action: 'show',
      description: 'Show event handler',
    },
    onClick: {
      action: 'click',
      description: 'Click event handler',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CAlert>

// Default story
export const Default: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  args: {
    type: 'info',
    size: 'md',
  },
  render: (args) => ({
    components: { CAlert },
    setup() {
      return { args }
    },
    template: '<CAlert v-bind="args">This is a default alert message.</CAlert>',
  }),
}

// Type variants
export const Types: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All available alert types with their distinct visual styles and semantic meanings.',
      },
    },
  },
  render: () => ({
    components: { CAlert },
    template: `
      <div class="space-y-4">
        <CAlert type="info" title="Information">
          This is an informational alert with helpful details.
        </CAlert>
        <CAlert type="success" title="Success!">
          Your operation was completed successfully.
        </CAlert>
        <CAlert type="warning" title="Warning">
          Please review the following information before proceeding.
        </CAlert>
        <CAlert type="error" title="Error">
          Something went wrong. Please try again.
        </CAlert>
      </div>
    `,
  }),
}

// Size variants
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Available alert sizes from small to large.',
      },
    },
  },
  render: () => ({
    components: { CAlert },
    template: `
      <div class="space-y-4">
        <CAlert type="info" size="sm" title="Small Alert">
          This is a small alert with compact spacing.
        </CAlert>
        <CAlert type="success" size="md" title="Medium Alert">
          This is a medium alert with standard spacing.
        </CAlert>
        <CAlert type="warning" size="lg" title="Large Alert">
          This is a large alert with generous spacing.
        </CAlert>
      </div>
    `,
  }),
}

// With close button
export const Closable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Alerts with close buttons that can be dismissed by the user.',
      },
    },
  },
  render: () => ({
    components: { CAlert },
    setup() {
      const handleClose = () => {
        console.log('Alert closed!')
      }
      return { handleClose }
    },
    template: `
      <div class="space-y-4">
        <CAlert type="info" closable @close="handleClose">
          This alert can be closed by clicking the X button.
        </CAlert>
        <CAlert type="success" closable title="Dismissible Success">
          This success alert has a title and can be dismissed.
        </CAlert>
        <CAlert type="warning" closable title="Warning" bordered>
          This warning alert has a border and can be closed.
        </CAlert>
      </div>
    `,
  }),
}

// Auto-dismiss
export const AutoDismiss: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Alerts that automatically dismiss after a specified time with optional progress bar.',
      },
    },
  },
  render: () => ({
    components: { CAlert },
    setup() {
      const handleAutoDismissStart = () => {
        console.log('Auto-dismiss started')
      }
      const handleAutoDismissComplete = () => {
        console.log('Auto-dismiss completed')
      }
      return { handleAutoDismissStart, handleAutoDismissComplete }
    },
    template: `
      <div class="space-y-4">
        <CAlert
          type="info"
          :autoDismiss="5000"
          @autoDismissStart="handleAutoDismissStart"
          @autoDismissComplete="handleAutoDismissComplete"
        >
          This alert will auto-dismiss in 5 seconds.
        </CAlert>
        <CAlert
          type="success"
          :autoDismiss="3000"
          :showProgress="true"
          title="Auto-dismiss with Progress"
        >
          This alert shows a progress bar and auto-dismisses in 3 seconds.
        </CAlert>
        <CAlert
          type="warning"
          :autoDismiss="7000"
          :showProgress="true"
          closable
          title="Dismissible with Progress"
        >
          This alert can be closed manually or will auto-dismiss in 7 seconds.
        </CAlert>
      </div>
    `,
  }),
}

// With actions
export const WithActions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Alerts with action buttons or interactive elements in the action slot.',
      },
    },
  },
  render: () => ({
    components: { CAlert },
    setup() {
      const handleAction = () => {
        console.log('Action clicked!')
      }
      const handleUndo = () => {
        console.log('Undo clicked!')
      }
      return { handleAction, handleUndo }
    },
    template: `
      <div class="space-y-4">
        <CAlert type="success" title="File Uploaded">
          Your file has been uploaded successfully.
          <template #action>
            <button
              class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              @click="handleAction"
            >
              View File
            </button>
          </template>
        </CAlert>
        <CAlert type="info" title="New Feature Available">
          Check out our latest feature that might interest you.
          <template #action>
            <div class="flex gap-2">
              <button
                class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                @click="handleAction"
              >
                Learn More
              </button>
              <button
                class="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                @click="handleUndo"
              >
                Dismiss
              </button>
            </div>
          </template>
        </CAlert>
        <CAlert type="warning" closable title="Storage Warning">
          You're running low on storage space.
          <template #action>
            <button
              class="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700"
              @click="handleAction"
            >
              Upgrade Plan
            </button>
          </template>
        </CAlert>
      </div>
    `,
  }),
}

// Custom icons
export const CustomIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Alerts with custom icons using the icon slot or icon prop.',
      },
    },
  },
  render: () => ({
    components: { CAlert },
    template: `
      <div class="space-y-4">
        <CAlert type="info" title="Custom Icon">
          This alert uses a custom icon in the slot.
          <template #icon>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </template>
        </CAlert>
        <CAlert type="success" title="No Icon">
          This alert has the icon hidden.
          <template #icon>
            <!-- Empty slot to hide icon -->
          </template>
        </CAlert>
        <CAlert type="warning" title="Emoji Icon">
          This alert uses an emoji as the icon.
          <template #icon>
            <span class="text-lg">⚠️</span>
          </template>
        </CAlert>
      </div>
    `,
  }),
}

// Visual variants
export const VisualVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different visual styling options including borders, shadows, and loading states.',
      },
    },
  },
  render: () => ({
    components: { CAlert },
    template: `
      <div class="space-y-4">
        <CAlert type="info" bordered title="Bordered Alert">
          This alert has a border for enhanced visual separation.
        </CAlert>
        <CAlert type="success" shadowed title="Shadowed Alert">
          This alert has a subtle shadow for depth.
        </CAlert>
        <CAlert type="warning" bordered shadowed title="Bordered & Shadowed">
          This alert combines both border and shadow effects.
        </CAlert>
        <CAlert type="error" loading title="Loading Alert">
          This alert is in a loading state with shimmer animation.
        </CAlert>
      </div>
    `,
  }),
}

// Animations
export const Animations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different animation variants for alert appearance and disappearance.',
      },
    },
  },
  render: () => ({
    components: { CAlert },
    template: `
      <div class="space-y-4">
        <CAlert type="info" animation="fade" title="Fade Animation">
          This alert uses a fade animation.
        </CAlert>
        <CAlert type="success" animation="slide" title="Slide Animation">
          This alert uses a slide animation.
        </CAlert>
        <CAlert type="warning" animation="scale" title="Scale Animation">
          This alert uses a scale animation.
        </CAlert>
        <CAlert type="error" animation="none" title="No Animation">
          This alert has no animation.
        </CAlert>
      </div>
    `,
  }),
}

// Accessibility features
export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Accessibility features including ARIA attributes, keyboard navigation, and screen reader support.',
      },
    },
  },
  render: () => ({
    components: { CAlert },
    template: `
      <div class="space-y-4">
        <CAlert
          type="error"
          title="Critical Error"
          ariaLive="assertive"
          ariaLabel="Critical system error requiring immediate attention"
        >
          This is a critical error that will be announced immediately to screen readers.
        </CAlert>
        <CAlert
          type="info"
          title="Information"
          ariaLive="polite"
          dismissible
        >
          This information will be announced when screen readers are idle. Press Escape to dismiss.
        </CAlert>
        <CAlert
          type="success"
          title="Success"
          ariaLive="off"
        >
          This success message will not be announced to screen readers.
        </CAlert>
      </div>
    `,
  }),
}

// Long content
export const LongContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Alerts with longer content to demonstrate text wrapping and layout behavior.',
      },
    },
  },
  render: () => ({
    components: { CAlert },
    template: `
      <div class="space-y-4 max-w-2xl">
        <CAlert type="info" title="Detailed Information">
          This is a longer alert message that demonstrates how the component handles extended content.
          The text should wrap properly and maintain good readability. The alert should expand vertically
          to accommodate the content while maintaining proper spacing and visual hierarchy.
        </CAlert>
        <CAlert type="warning" title="Important Notice" closable>
          This is another example of a longer alert message. It includes multiple sentences and
          demonstrates the component's ability to handle substantial amounts of text content.
          The close button should remain properly positioned and accessible.
          <template #action>
            <button class="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700">
              Read More
            </button>
          </template>
        </CAlert>
      </div>
    `,
  }),
}

// Interactive playground
export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different alert configurations and behaviors.',
      },
    },
  },
  args: {
    type: 'info',
    size: 'md',
    title: 'Alert Title',
    closable: false,
    dismissible: true,
    visible: true,
    autoDismiss: 0,
    showProgress: false,
    showIcon: true,
    icon: '',
    bordered: false,
    shadowed: false,
    loading: false,
    animation: 'fade',
    ariaLive: 'assertive',
    ariaLabel: '',
  },
  render: (args) => ({
    components: { CAlert },
    setup() {
      const handleClose = () => {
        console.log('Alert closed!')
      }
      const handleShow = () => {
        console.log('Alert shown!')
      }
      const handleClick = () => {
        console.log('Alert clicked!')
      }
      return { args, handleClose, handleShow, handleClick }
    },
    template: `
      <div class="space-y-4">
        <CAlert
          v-bind="args"
          @close="handleClose"
          @show="handleShow"
          @click="handleClick"
        >
          This is a configurable alert message. Use the controls below to customize its appearance and behavior.
        </CAlert>
        <div class="text-sm text-gray-600">
          <p>Configure the alert using the controls panel below.</p>
          <p>Check the Actions panel to see emitted events.</p>
        </div>
      </div>
    `,
  }),
}
