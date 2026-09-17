// API Reference Data for CAvatar Component
import type { ApiReferenceData } from './index'

export const avatarApiData: ApiReferenceData = {
  title: 'CAvatar Component API',
  componentProps: [
    {
      name: 'src',
      type: 'string',
      required: false,
      description: 'Image source URL for the avatar'
    },
    {
      name: 'alt',
      type: 'string',
      required: false,
      description: 'Alternative text for the avatar image'
    },
    {
      name: 'name',
      type: 'string',
      required: false,
      description: 'Name used to generate initials when no image is provided'
    },
    {
      name: 'size',
      type: 'AvatarSize',
      required: false,
      description: 'Size of the avatar component',
      default: 'md'
    },
    {
      name: 'variant',
      type: 'AvatarVariant',
      required: false,
      description: 'Visual style variant of the avatar',
      default: 'circle'
    },
    {
      name: 'colorScheme',
      type: 'AvatarColorScheme',
      required: false,
      description: 'Color scheme for the avatar background',
      default: 'gray'
    },
    {
      name: 'fallbackIcon',
      type: 'string',
      required: false,
      description: 'Icon name to display as fallback when no image or name is provided',
      default: 'person'
    },
    {
      name: 'loading',
      type: 'boolean',
      required: false,
      description: 'Whether the avatar is in a loading state',
      default: 'false'
    },
    {
      name: 'online',
      type: 'boolean',
      required: false,
      description: 'Whether to show online status indicator',
      default: 'false'
    },
    {
      name: 'statusColor',
      type: 'string',
      required: false,
      description: 'Color for the online status indicator',
      default: 'green'
    }
  ],
  componentEvents: [
    {
      name: 'load',
      description: 'Emitted when the avatar image loads successfully',
      payload: 'Event',
      usage: '@load="handleImageLoad"'
    },
    {
      name: 'error',
      description: 'Emitted when the avatar image fails to load',
      payload: 'Event',
      usage: '@error="handleImageError"'
    },
    {
      name: 'click',
      description: 'Emitted when the avatar is clicked',
      payload: 'MouseEvent',
      usage: '@click="handleAvatarClick"'
    }
  ],
  componentSlots: [
    {
      name: 'default',
      description: 'Custom content to display in the avatar',
      content: 'Any custom content like icons, text, or components'
    },
    {
      name: 'fallback',
      description: 'Custom fallback content when image fails to load',
      content: 'Custom fallback icon or content'
    },
    {
      name: 'badge',
      description: 'Badge or indicator overlay',
      content: 'Notification badge, status indicator, or other overlay content'
    }
  ],
  usageExamples: [
    {
      title: 'Basic Avatar with Image',
      code: `<CAvatar 
  src="https://example.com/avatar.jpg" 
  alt="User avatar" 
  name="John Doe" 
/>`
    },
    {
      title: 'Avatar with Initials',
      code: `<CAvatar 
  name="Jane Smith" 
  size="lg" 
  colorScheme="blue" 
/>`
    },
    {
      title: 'Avatar with Online Status',
      code: `<CAvatar 
  src="https://example.com/avatar.jpg" 
  name="John Doe"
  online 
  statusColor="green"
/>`
    },
    {
      title: 'Custom Avatar with Badge',
      code: `<CAvatar name="Admin User" size="xl">
  <template #badge>
    <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
      <span class="text-white text-xs">3</span>
    </div>
  </template>
</CAvatar>`
    },
    {
      title: 'Loading Avatar',
      code: `<CAvatar 
  src="https://example.com/avatar.jpg" 
  name="Loading User"
  loading 
/>`
    }
  ]
}



