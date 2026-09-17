# CAvatar Component

A versatile avatar component for displaying user profile images with fallback support, status indicators, and accessibility features.

## Features

- **Multiple Sizes**: xs, sm, md, lg, xl variants
- **Image Support**: Displays images with graceful error handling
- **Fallback Content**: Shows first letter of alt text or custom content when image fails
- **Status Indicators**: Online, offline, away, busy status with visual indicators
- **Clickable**: Optional clickable behavior with keyboard navigation
- **Accessibility**: Full WCAG 2.1 AA compliance with proper ARIA attributes
- **Customizable**: Custom colors, borders, and styling options
- **Loading States**: Built-in loading spinner support
- **Badge Support**: Optional badge slot for notifications or indicators

## Usage

### Basic Usage

```vue
<template>
  <CAvatar
    src="/path/to/image.jpg"
    alt="John Doe"
    size="md"
  />
</template>
```

### With Fallback

```vue
<template>
  <CAvatar
    alt="John Doe"
    size="lg"
    rounded
  />
</template>
```

### Clickable Avatar

```vue
<template>
  <CAvatar
    src="/path/to/image.jpg"
    alt="John Doe"
    clickable
    @click="handleAvatarClick"
  />
</template>
```

### With Status Indicator

```vue
<template>
  <CAvatar
    src="/path/to/image.jpg"
    alt="John Doe"
    status="online"
    rounded
  />
</template>
```

### Custom Fallback Content

```vue
<template>
  <CAvatar
    alt="John Doe"
    size="lg"
  >
    <template #fallback>
      <span class="font-bold">JD</span>
    </template>
  </CAvatar>
</template>
```

### With Badge

```vue
<template>
  <CAvatar
    src="/path/to/image.jpg"
    alt="John Doe"
    rounded
  >
    <template #badge>
      <span class="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        3
      </span>
    </template>
  </CAvatar>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL for the avatar |
| `alt` | `string` | - | Alt text for the avatar image (required for accessibility) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size variant |
| `rounded` | `boolean` | `false` | Whether the avatar should be rounded |
| `clickable` | `boolean` | `false` | Whether the avatar is clickable |
| `disabled` | `boolean` | `false` | Whether the avatar is disabled |
| `loading` | `boolean` | `false` | Loading state |
| `bordered` | `boolean` | `false` | Whether to show a border |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | - | Status indicator |
| `objectFit` | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | Object fit for the image |
| `backgroundColor` | `string` | - | Background color for fallback state |
| `textColor` | `string` | - | Text color for fallback state |
| `decorative` | `boolean` | `false` | Whether the avatar is decorative (no alt text needed) |
| `class` | `string` | - | Custom CSS class for the avatar container |
| `imageClass` | `string` | - | Custom CSS class for the avatar image |
| `fallbackClass` | `string` | - | Custom CSS class for the fallback content |
| `badgeClass` | `string` | - | Custom CSS class for the badge |
| `ariaLabel` | `string` | - | Accessibility label override |
| `width` | `number \| string` | - | Custom width override |
| `height` | `number \| string` | - | Custom height override |
| `borderColor` | `string` | - | Border color |
| `borderWidth` | `number \| string` | - | Border width |
| `statusColor` | `string` | - | Status indicator color |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted when the avatar is clicked (only if clickable) |
| `focus` | `FocusEvent` | Emitted when the avatar receives focus |
| `blur` | `FocusEvent` | Emitted when the avatar loses focus |
| `mouseenter` | `MouseEvent` | Emitted when mouse enters the avatar |
| `mouseleave` | `MouseEvent` | Emitted when mouse leaves the avatar |
| `keydown` | `KeyboardEvent` | Emitted when a key is pressed on the avatar |
| `load` | `Event` | Emitted when the image loads successfully |
| `error` | `Event` | Emitted when the image fails to load |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Default slot for custom content |
| `fallback` | Fallback content when image fails to load or no src provided |
| `badge` | Badge content for notifications or indicators |
| `loading` | Custom loading state content |

## Accessibility

The CAvatar component is fully accessible and follows WCAG 2.1 AA guidelines:

- **ARIA Labels**: Proper `aria-label` attributes for screen readers
- **Role Attributes**: Correct `role` attributes (`img` or `button`)
- **Keyboard Navigation**: Full keyboard support for clickable avatars
- **Focus Management**: Proper focus indicators and management
- **Status Indicators**: Accessible status information with `aria-label`
- **Error Handling**: Graceful fallback when images fail to load
- **Decorative Support**: Proper handling of decorative avatars

### Keyboard Navigation

- **Enter/Space**: Activates clickable avatars
- **Tab**: Focuses clickable avatars in tab order
- **Focus Indicators**: Clear visual focus indicators

## Styling

The component uses CSS classes that can be customized:

```css
.celestial-avatar {
  /* Base avatar styles */
}

.celestial-avatar--xs {
  /* Extra small size */
}

.celestial-avatar--sm {
  /* Small size */
}

.celestial-avatar--md {
  /* Medium size (default) */
}

.celestial-avatar--lg {
  /* Large size */
}

.celestial-avatar--xl {
  /* Extra large size */
}

.celestial-avatar--rounded {
  /* Rounded variant */
}

.celestial-avatar--clickable {
  /* Clickable state */
}

.celestial-avatar--disabled {
  /* Disabled state */
}

.celestial-avatar--loading {
  /* Loading state */
}

.celestial-avatar--bordered {
  /* Bordered variant */
}

.celestial-avatar__image {
  /* Image styles */
}

.celestial-avatar__fallback {
  /* Fallback content styles */
}

.celestial-avatar__badge {
  /* Badge styles */
}

.celestial-avatar__status {
  /* Status indicator styles */
}
```

## Composables

### useAvatar

Provides avatar behavior and state management:

```typescript
import { useAvatar } from '@/components/atoms/avatar'

const {
  hasError,
  isLoading,
  isClickable,
  handleImageLoad,
  handleImageError,
  handleClick,
  handleKeydown,
  handleFocus,
  handleBlur,
  handleMouseEnter,
  handleMouseLeave
} = useAvatar(props, emit)
```

### useAvatarStyles

Provides avatar styling utilities:

```typescript
import { useAvatarStyles } from '@/components/atoms/avatar'

const {
  avatarClasses,
  imageClasses,
  fallbackClasses,
  badgeClasses,
  statusClasses,
  avatarStyles,
  fallbackStyles
} = useAvatarStyles(props)
```

## Examples

### User Profile Card

```vue
<template>
  <div class="flex items-center gap-3 p-4 bg-white rounded-lg shadow">
    <CAvatar
      :src="user.avatar"
      :alt="user.name"
      size="lg"
      rounded
      status="online"
      clickable
      @click="goToProfile"
    />
    <div>
      <h3 class="font-semibold">{{ user.name }}</h3>
      <p class="text-sm text-gray-600">{{ user.role }}</p>
    </div>
  </div>
</template>
```

### User List with Notifications

```vue
<template>
  <div class="space-y-2">
    <div
      v-for="user in users"
      :key="user.id"
      class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
    >
      <CAvatar
        :src="user.avatar"
        :alt="user.name"
        size="md"
        rounded
        :status="user.status"
      >
        <template #badge>
          <span
            v-if="user.unreadCount > 0"
            class="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ user.unreadCount }}
          </span>
        </template>
      </CAvatar>
      <div class="flex-1">
        <p class="font-medium">{{ user.name }}</p>
        <p class="text-sm text-gray-600">{{ user.lastMessage }}</p>
      </div>
    </div>
  </div>
</template>
```

### Loading State

```vue
<template>
  <CAvatar
    :src="user.avatar"
    :alt="user.name"
    :loading="isLoading"
    size="lg"
    rounded
  >
    <template #loading>
      <div class="animate-spin">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" class="opacity-75" />
        </svg>
      </div>
    </template>
  </CAvatar>
</template>
```

## Testing

The component includes comprehensive tests covering:

- Rendering with different props
- Event handling
- Accessibility compliance
- Error handling
- Edge cases

Run tests with:

```bash
npm test CAvatar
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT
