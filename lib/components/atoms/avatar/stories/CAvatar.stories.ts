import type { Meta, StoryObj } from '@storybook/vue3'
import CAvatar from '../CAvatar.vue'

/**
 * Avatar component stories
 *
 * The CAvatar component is a versatile user profile image component that supports
 * multiple sizes, fallback content, status indicators, and accessibility features.
 *
 * @example
 * ```vue
 * <CAvatar
 *   src="/path/to/image.jpg"
 *   alt="John Doe"
 *   size="md"
 *   rounded
 *   status="online"
 * />
 * ```
 */
const meta: Meta<typeof CAvatar> = {
  title: 'Atoms/CAvatar',
  component: CAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile avatar component for displaying user profile images with fallback support, status indicators, and accessibility features.'
      }
    }
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL for the avatar'
    },
    alt: {
      control: 'text',
      description: 'Alt text for the avatar image (required for accessibility)'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Avatar size variant'
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the avatar should be rounded'
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the avatar is clickable'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the avatar is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state'
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to show a border'
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Status indicator'
    },
    online: {
      control: 'boolean',
      description: 'Shortcut to display online status indicator'
    },
    statusColor: {
      control: 'color',
      description: 'Custom color for status indicator dot'
    },
    objectFit: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
      description: 'Object fit for the image'
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color for fallback state'
    },
    textColor: {
      control: 'color',
      description: 'Text color for fallback state'
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the avatar is decorative (no alt text needed)'
    }
  },
  args: {
    alt: 'John Doe',
    size: 'md',
    rounded: false,
    clickable: false,
    disabled: false,
    loading: false,
    bordered: false,
    objectFit: 'cover',
    decorative: false
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default avatar with fallback content
 * Shows the first letter of the alt text when no image is provided
 */
export const Default: Story = {
  tags: ['a11y-smoke'],
  parameters: {
    a11y: { test: 'error' },
  },
  args: {
    alt: 'John Doe'
  }
}

/**
 * Avatar with image source
 * Displays an image when src is provided
 */
export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe'
  }
}

/**
 * Rounded avatar
 * Applies rounded styling to the avatar
 */
export const Rounded: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    rounded: true
  }
}

/**
 * Size variants
 * Different sizes available for the avatar
 */
export const Sizes: Story = {
  render: () => ({
    components: { CAvatar },
    template: `
      <div class="flex items-center gap-4">
        <CAvatar alt="XS" size="xs" />
        <CAvatar alt="SM" size="sm" />
        <CAvatar alt="MD" size="md" />
        <CAvatar alt="LG" size="lg" />
        <CAvatar alt="XL" size="xl" />
      </div>
    `
  })
}

/**
 * Clickable avatar
 * Avatar that can be clicked and receives focus
 */
export const Clickable: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    clickable: true,
    rounded: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Clickable avatar with hover effects and keyboard navigation support.'
      }
    }
  }
}

/**
 * Status indicators
 * Different status states for the avatar
 */
export const StatusIndicators: Story = {
  render: () => ({
    components: { CAvatar },
    template: `
      <div class="flex items-center gap-6">
        <div class="flex flex-col items-center gap-2">
          <CAvatar alt="Online" status="online" rounded size="lg" />
          <span class="text-xs text-gray-500">Online</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <CAvatar alt="Offline" status="offline" rounded size="lg" />
          <span class="text-xs text-gray-500">Offline</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <CAvatar alt="Away" status="away" rounded size="lg" />
          <span class="text-xs text-gray-500">Away</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <CAvatar alt="Busy" status="busy" rounded size="lg" />
          <span class="text-xs text-gray-500">Busy</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <CAvatar alt="Custom Color" online status-color="#a855f7" rounded size="lg" />
          <span class="text-xs text-gray-500">Custom Color</span>
        </div>
      </div>
    `
  })
}

/**
 * Bordered avatar
 * Avatar with border styling
 */
export const Bordered: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    bordered: true,
    rounded: true
  }
}

/**
 * Loading state
 * Avatar in loading state with spinner
 */
export const Loading: Story = {
  args: {
    alt: 'John Doe',
    loading: true,
    rounded: true
  }
}

/**
 * Disabled state
 * Avatar in disabled state
 */
export const Disabled: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    disabled: true,
    rounded: true
  }
}

/**
 * Custom fallback content
 * Avatar with custom fallback slot content
 */
export const CustomFallback: Story = {
  render: () => ({
    components: { CAvatar },
    template: `
      <div class="flex items-center gap-4">
        <CAvatar alt="Custom" size="lg" rounded>
          <template #fallback>
            <span class="text-lg font-bold">JD</span>
          </template>
        </CAvatar>
        <CAvatar alt="Icon" size="lg" rounded>
          <template #fallback>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </template>
        </CAvatar>
      </div>
    `
  })
}

/**
 * Badge slot
 * Avatar with badge content
 */
export const WithBadge: Story = {
  render: () => ({
    components: { CAvatar },
    template: `
      <div class="flex items-center gap-4">
        <CAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="John Doe" rounded>
          <template #badge>
            <span class="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </template>
        </CAvatar>
        <CAvatar alt="Jane" rounded>
          <template #badge>
            <span class="bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">✓</span>
          </template>
        </CAvatar>
      </div>
    `
  })
}

/**
 * Custom colors
 * Avatar with custom background and text colors
 */
export const CustomColors: Story = {
  render: () => ({
    components: { CAvatar },
    template: `
      <div class="flex items-center gap-4">
        <CAvatar alt="Blue" backgroundColor="#3B82F6" textColor="#FFFFFF" rounded />
        <CAvatar alt="Green" backgroundColor="#10B981" textColor="#FFFFFF" rounded />
        <CAvatar alt="Purple" backgroundColor="#8B5CF6" textColor="#FFFFFF" rounded />
        <CAvatar alt="Pink" backgroundColor="#EC4899" textColor="#FFFFFF" rounded />
      </div>
    `
  })
}

/**
 * Object fit variants
 * Different object-fit values for the image
 */
export const ObjectFit: Story = {
  render: () => ({
    components: { CAvatar },
    template: `
      <div class="flex items-center gap-4">
        <div class="text-center">
          <CAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Cover" objectFit="cover" rounded />
          <p class="text-xs mt-2">Cover</p>
        </div>
        <div class="text-center">
          <CAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Contain" objectFit="contain" rounded />
          <p class="text-xs mt-2">Contain</p>
        </div>
        <div class="text-center">
          <CAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Fill" objectFit="fill" rounded />
          <p class="text-xs mt-2">Fill</p>
        </div>
      </div>
    `
  })
}

/**
 * Error handling
 * Avatar that handles image loading errors gracefully
 */
export const ErrorHandling: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'John Doe',
    rounded: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar gracefully handles image loading errors by showing fallback content.'
      }
    }
  }
}

/**
 * Decorative avatar
 * Avatar marked as decorative for accessibility
 */
export const Decorative: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    decorative: true,
    rounded: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Decorative avatar that does not require alt text for accessibility.'
      }
    }
  }
}

/**
 * Complete example
 * Avatar with all features combined
 */
export const Complete: Story = {
  render: () => ({
    components: { CAvatar },
    template: `
      <div class="flex items-center gap-4">
        <CAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
          size="lg"
          rounded
          clickable
          status="online"
          bordered
        >
          <template #badge>
            <span class="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
          </template>
        </CAvatar>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete avatar example with image, status indicator, badge, and all interactive features.'
      }
    }
  }
}
