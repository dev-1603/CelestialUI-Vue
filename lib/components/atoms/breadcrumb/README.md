# CBreadcrumb Component

A responsive, accessible breadcrumb navigation component for Vue 3 with TypeScript support.

## Features

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: WCAG 2.1 AA compliant with full ARIA support
- **Customizable**: Support for custom separators, slots, and styling
- **Truncation**: Automatic truncation for long breadcrumb trails
- **Home Support**: Optional home item with custom configuration
- **TypeScript**: Full type safety with comprehensive interfaces
- **Keyboard Navigation**: Full keyboard support for accessibility

## Installation

```bash
# The component is part of the CelestialUI library
npm install @celestial-ui/vue
```

## Basic Usage

```vue
<template>
  <CBreadcrumb :items="breadcrumbItems" separator="/" @navigate="handleNavigation" />
</template>

<script setup lang="ts">
import { CBreadcrumb } from '@celestial-ui/vue'
import type { BreadcrumbItem } from '@celestial-ui/vue'

const breadcrumbItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'category', label: 'Electronics', href: '/products/electronics' },
  { id: 'product', label: 'Smartphone', href: '/products/electronics/smartphone' },
]

const handleNavigation = (item: BreadcrumbItem, index: number) => {
  console.log('Navigate to:', item.label)
}
</script>
```

## Props

| Prop        | Type               | Default                                    | Description                               |
| ----------- | ------------------ | ------------------------------------------ | ----------------------------------------- |
| `items`     | `BreadcrumbItem[]` | `[]`                                       | Array of breadcrumb items to display      |
| `separator` | `string \| VNode`  | `'/'`                                      | Separator between breadcrumb items        |
| `maxItems`  | `number`           | `10`                                       | Maximum number of items before truncation |
| `showHome`  | `boolean`          | `false`                                    | Whether to show the home/root item        |
| `homeItem`  | `BreadcrumbItem`   | `{ id: 'home', label: 'Home', href: '/' }` | Custom home item configuration            |
| `compact`   | `boolean`          | `false`                                    | Whether to use compact spacing            |
| `ariaLabel` | `string`           | `'Breadcrumb navigation'`                  | ARIA label for accessibility              |
| `class`     | `string`           | `undefined`                                | CSS class for the breadcrumb container    |

## Events

| Event      | Payload                                 | Description                               |
| ---------- | --------------------------------------- | ----------------------------------------- |
| `navigate` | `(item: BreadcrumbItem, index: number)` | Emitted when a breadcrumb item is clicked |
| `home`     | `(item: BreadcrumbItem)`                | Emitted when the home item is clicked     |

## Slots

| Slot        | Props                               | Description                                    |
| ----------- | ----------------------------------- | ---------------------------------------------- |
| `item`      | `{ item, index, isLast, isActive }` | Custom content for individual breadcrumb items |
| `separator` | `{}`                                | Custom separator between breadcrumb items      |
| `home`      | `{ item }`                          | Custom home item content                       |

## BreadcrumbItem Interface

```typescript
interface BreadcrumbItem {
  id: string | number // Unique identifier
  label: string // Display text
  href?: string // URL or route path
  disabled?: boolean // Whether this item is disabled
  data?: Record<string, any> // Additional data
}
```

## Advanced Usage

### Custom Separator

```vue
<template>
  <CBreadcrumb :items="items" separator="→" />
</template>
```

### With Home Item

```vue
<template>
  <CBreadcrumb
    :items="items"
    show-home
    :home-item="{ id: 'dashboard', label: 'Dashboard', href: '/dashboard' }"
  />
</template>
```

### Truncation

```vue
<template>
  <CBreadcrumb :items="longItems" :max-items="4" />
</template>
```

### Custom Slots

```vue
<template>
  <CBreadcrumb :items="items">
    <template #item="{ item, index, isActive }">
      <span :class="{ active: isActive }"> {{ index + 1 }}. {{ item.label }} </span>
    </template>

    <template #separator>
      <span class="custom-separator">✨</span>
    </template>
  </CBreadcrumb>
</template>
```

## Composable Usage

The component also exports a `useBreadcrumb` composable for advanced use cases:

```typescript
import { useBreadcrumb } from '@celestial-ui/vue'

const { processedItems, handleNavigate, getAriaAttributes } = useBreadcrumb(items, {
  maxItems: 5,
  showHome: true,
  onNavigate: (item, index) => {
    // Custom navigation logic
  },
})
```

## Utility Functions

### createBreadcrumbFromPath

Create breadcrumb items from a path string:

```typescript
import { createBreadcrumbFromPath } from '@celestial-ui/vue'

const items = createBreadcrumbFromPath('/users/123/profile', '/app')
// Returns: [
//   { id: 'users', label: 'Users', href: '/app/users' },
//   { id: '123', label: '123', href: '/app/users/123' },
//   { id: 'profile', label: 'Profile', href: '/app/users/123/profile' }
// ]
```

### createBreadcrumbFromRoutes

Create breadcrumb items from route metadata:

```typescript
import { createBreadcrumbFromRoutes } from '@celestial-ui/vue'

const items = createBreadcrumbFromRoutes([
  { path: '/users', meta: { title: 'Users', breadcrumb: 'User Management' } },
  { path: '/users/123', meta: { title: 'User Details' } },
])
```

## Accessibility

The component is built with accessibility in mind:

- **ARIA Navigation**: Uses `role="navigation"` and proper ARIA labels
- **Current Page**: Marks the last item with `aria-current="page"`
- **Keyboard Support**: Full keyboard navigation with Enter and Space keys
- **Screen Readers**: Proper semantic structure with `ol`/`li` elements
- **Focus Management**: Visible focus indicators for keyboard users

## Styling

The component uses CSS custom properties for easy customization:

```css
.c-breadcrumb {
  --breadcrumb-separator-color: rgba(0, 0, 0, 0.4);
  --breadcrumb-item-padding: 0.5rem;
  --breadcrumb-separator-margin: 0.5rem;
  --breadcrumb-font-size: 0.875rem;
  --breadcrumb-line-height: 1.25rem;
  --breadcrumb-border-radius: 0.25rem;
  --breadcrumb-transition: all 0.15s ease;
}
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT License - see LICENSE file for details.
