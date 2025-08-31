# CIcon Component

A headless, versatile icon component that supports multiple icon libraries and rendering methods.

## Features

- 🎯 **Headless Design**: Complete control over styling and behavior
- 📚 **Multiple Libraries**: Support for Material Icons, Font Awesome, and custom icons
- 🎨 **Multiple Types**: Font icons, SVG icons, and image icons
- ♿ **Accessibility**: Built-in ARIA support and keyboard navigation
- 🎭 **Customizable**: Extensive styling and theming options
- ✨ **Animations**: Built-in animation support (spin, pulse, bounce, fade)
- 📱 **Responsive**: Size variants and custom sizing
- 🔄 **Interactive**: Clickable icons with proper focus states
- 🔧 **TypeScript**: Full TypeScript support with comprehensive types

## Installation

```bash
npm install @celestialui/vue
```

## Basic Usage

```vue
<template>
  <!-- Material Icons -->
  <CIcon library="material" name="home" />
  <CIcon library="material" name="star" variant="outlined" />
  
  <!-- Font Awesome -->
  <CIcon library="fontawesome" name="house" style="solid" />
  <CIcon library="fontawesome" name="github" style="brands" />
  
  <!-- Inline SVG -->
  <CIcon 
    type="svg" 
    :svg="starSvg" 
    viewBox="0 0 24 24"
  />
  
  <!-- External SVG (loaded inline for customization) -->
  <CIcon 
    src="/icons/star.svg" 
    :size="32"
    color="primary"
    inline-svg
    cache-svg
  />
  
  <!-- Image Icons -->
  <CIcon 
    type="image" 
    src="/icon.png" 
    alt="Custom icon"
    :size="48"
  />
</template>

<script setup>
import { CIcon } from '@celestialui/vue'

const starSvg = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
</script>
```

## Icon Libraries

### Material Icons

```vue
<template>
  <!-- Different variants -->
  <CIcon library="material" variant="filled" name="star" />
  <CIcon library="material" variant="outlined" name="star" />
  <CIcon library="material" variant="round" name="star" />
  <CIcon library="material" variant="sharp" name="star" />
  <CIcon library="material" variant="two-tone" name="star" />
</template>
```

### Font Awesome

```vue
<template>
  <!-- Different styles -->
  <CIcon library="fontawesome" style="solid" name="star" />
  <CIcon library="fontawesome" style="regular" name="star" />
  <CIcon library="fontawesome" style="light" name="star" />
  <CIcon library="fontawesome" style="brands" name="github" />
</template>
```

## Sizes

```vue
<template>
  <!-- Predefined sizes -->
  <CIcon name="star" size="xs" />    <!-- 12px -->
  <CIcon name="star" size="sm" />    <!-- 14px -->
  <CIcon name="star" size="md" />    <!-- 16px -->
  <CIcon name="star" size="lg" />    <!-- 20px -->
  <CIcon name="star" size="xl" />    <!-- 24px -->
  <CIcon name="star" size="2xl" />   <!-- 32px -->
  <CIcon name="star" size="3xl" />   <!-- 48px -->
  
  <!-- Pixel sizes (numeric values) -->
  <CIcon name="star" :size="16" />   <!-- 16px -->
  <CIcon name="star" :size="24" />   <!-- 24px -->
  <CIcon name="star" :size="32" />   <!-- 32px -->
  <CIcon name="star" :size="48" />   <!-- 48px -->
  
  <!-- CSS sizes (string values) -->
  <CIcon name="star" size="1rem" />
  <CIcon name="star" size="1.5em" />
  <CIcon name="star" size="2rem" />
  <CIcon name="star" size="100%" />
</template>
```

## Colors

```vue
<template>
  <!-- Semantic colors -->
  <CIcon name="check" color="success" />
  <CIcon name="warning" color="warning" />
  <CIcon name="error" color="error" />
  <CIcon name="info" color="info" />
  
  <!-- Custom colors -->
  <CIcon name="star" color="#ff6b35" />
  <CIcon name="heart" color="rgb(255, 107, 53)" />
</template>
```

## Interactive Icons

```vue
<template>
  <!-- Clickable icons -->
  <CIcon 
    name="favorite" 
    color="error" 
    clickable 
    @click="handleFavorite"
  />
  
  <!-- With accessibility -->
  <CIcon 
    name="delete" 
    color="error" 
    clickable 
    aria-label="Delete item"
    @click="handleDelete"
  />
</template>

<script setup>
const handleFavorite = () => {
  console.log('Favorited!')
}

const handleDelete = () => {
  console.log('Deleted!')
}
</script>
```

## Animations

```vue
<template>
  <!-- Loading spinner -->
  <CIcon name="refresh" animation="spin" />
  
  <!-- Pulsing heart -->
  <CIcon name="favorite" color="error" animation="pulse" />
  
  <!-- Bouncing arrow -->
  <CIcon name="arrow_upward" animation="bounce" />
  
  <!-- Fading lightbulb -->
  <CIcon name="lightbulb" animation="fade" />
</template>
```

## Transforms

```vue
<template>
  <!-- Rotation -->
  <CIcon name="arrow_forward" :rotate="90" />
  <CIcon name="arrow_forward" :rotate="180" />
  
  <!-- Flipping -->
  <CIcon name="arrow_forward" flip-x />
  <CIcon name="arrow_forward" flip-y />
</template>
```

## States

```vue
<template>
  <!-- Disabled -->
  <CIcon name="settings" disabled />
  
  <!-- Loading -->
  <CIcon name="settings" loading />
  
  <!-- Clickable with states -->
  <CIcon 
    name="download" 
    clickable 
    :disabled="isDownloading"
    :loading="isDownloading"
    @click="startDownload"
  />
</template>
```

## SVG Icons

```vue
<template>
  <!-- Inline SVG content -->
  <CIcon 
    type="svg" 
    :svg="customIcon" 
    size="xl"
    color="primary"
    viewBox="0 0 24 24"
  />
  
  <!-- External SVG loaded inline (allows customization) -->
  <CIcon 
    src="/icons/star.svg"
    :size="32"
    color="warning"
    inline-svg
    cache-svg
  />
  
  <!-- External SVG as image (no customization) -->
  <CIcon 
    type="image"
    src="/icons/logo.svg"
    :width="48"
    :height="48"
    alt="Logo"
  />
  
  <!-- External SVG with error handling -->
  <CIcon 
    src="/icons/icon.svg"
    :size="32"
    inline-svg
    :load-timeout="3000"
    @load="handleSvgLoad"
    @error="handleSvgError"
  />
</template>

<script setup>
const customIcon = `
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
`
</script>
```

## Image Icons

```vue
<template>
  <!-- Basic image icon -->
  <CIcon 
    type="image" 
    src="/icons/logo.png" 
    alt="Company logo"
    size="lg"
  />
  
  <!-- With custom dimensions -->
  <CIcon 
    type="image" 
    src="/icons/avatar.jpg" 
    alt="User avatar"
    :width="48"
    :height="48"
    @load="handleImageLoad"
    @error="handleImageError"
  />
</template>
```

## Accessibility

```vue
<template>
  <!-- Decorative icon (hidden from screen readers) -->
  <CIcon name="star" aria-hidden />
  
  <!-- Meaningful icon with label -->
  <CIcon 
    name="favorite" 
    aria-label="Add to favorites"
    clickable
  />
  
  <!-- Button icon with proper semantics -->
  <CIcon 
    name="delete" 
    role="button"
    aria-label="Delete this item"
    clickable
    @click="deleteItem"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `library` | `'material' \| 'fontawesome' \| 'custom'` | `'material'` | Icon library to use |
| `type` | `'font' \| 'svg' \| 'image'` | `'font'` | Type of icon rendering |
| `name` | `string` | - | Icon name/identifier |
| `size` | `IconSize \| number \| string` | `'md'` | Icon size (predefined, pixels, or CSS) |
| `color` | `IconColor \| string` | `'inherit'` | Icon color |
| `variant` | `MaterialIconVariant` | - | Material Icons variant |
| `style` | `FontAwesomeStyle` | - | Font Awesome style |
| `svg` | `string` | - | Custom SVG content |
| `src` | `string` | - | Image/SVG source URL |
| `alt` | `string` | - | Image alt text |
| `clickable` | `boolean` | `false` | Whether the icon is clickable |
| `disabled` | `boolean` | `false` | Whether the icon is disabled |
| `loading` | `boolean` | `false` | Whether the icon is in loading state |
| `animation` | `'spin' \| 'pulse' \| 'bounce' \| 'fade'` | - | Icon animation |
| `flipX` | `boolean` | `false` | Flip horizontally |
| `flipY` | `boolean` | `false` | Flip vertically |
| `rotate` | `number` | - | Rotation angle in degrees |
| `ariaLabel` | `string` | - | ARIA label for accessibility |
| `ariaHidden` | `boolean` | - | Whether to hide from screen readers |
| `role` | `string` | - | Custom role attribute |
| `inlineSvg` | `boolean` | `true` | Load external SVG files inline (allows customization) |
| `cacheSvg` | `boolean` | `true` | Cache loaded SVG content |
| `loadTimeout` | `number` | `5000` | Timeout for SVG loading in milliseconds |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted when icon is clicked (if clickable) |
| `load` | `Event` | Emitted when image loads (image type only) |
| `error` | `Event` | Emitted when image fails to load (image type only) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Custom content to render inside the icon |

## CSS Variables

```css
:root {
  /* Colors */
  --cui-color-primary-500: #3b82f6;
  --cui-color-secondary-500: #6b7280;
  --cui-color-success-500: #10b981;
  --cui-color-warning-500: #f59e0b;
  --cui-color-error-500: #ef4444;
  --cui-color-info-500: #06b6d4;
  
  /* Interactive states */
  --cui-color-background-hover: rgba(0, 0, 0, 0.05);
  --cui-color-background-hover-dark: rgba(255, 255, 255, 0.1);
}
```

## Examples

### Icon Button Component

```vue
<template>
  <button :class="buttonClasses" @click="handleClick">
    <CIcon 
      :name="icon" 
      :library="iconLibrary"
      :size="iconSize"
      :animation="loading ? 'spin' : undefined"
    />
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<script setup>
import { CIcon } from '@celestialui/vue'

defineProps({
  icon: String,
  iconLibrary: { type: String, default: 'material' },
  iconSize: { type: String, default: 'md' },
  loading: Boolean
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  emit('click', event)
}
</script>
```

### Status Indicator

```vue
<template>
  <div class="status-indicator">
    <CIcon 
      :name="statusIcon" 
      :color="statusColor"
      :animation="status === 'loading' ? 'spin' : undefined"
      size="sm"
    />
    <span>{{ statusText }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CIcon } from '@celestialui/vue'

const props = defineProps({
  status: {
    type: String,
    validator: (value) => ['success', 'error', 'warning', 'loading'].includes(value)
  }
})

const statusIcon = computed(() => {
  switch (props.status) {
    case 'success': return 'check_circle'
    case 'error': return 'error'
    case 'warning': return 'warning'
    case 'loading': return 'refresh'
    default: return 'help'
  }
})

const statusColor = computed(() => {
  switch (props.status) {
    case 'success': return 'success'
    case 'error': return 'error'
    case 'warning': return 'warning'
    default: return 'secondary'
  }
})

const statusText = computed(() => {
  switch (props.status) {
    case 'success': return 'Success'
    case 'error': return 'Error'
    case 'warning': return 'Warning'
    case 'loading': return 'Loading...'
    default: return 'Unknown'
  }
})
</script>
```

## Browser Support

- Modern browsers with CSS custom properties support
- Material Icons: Requires Material Icons font or CSS
- Font Awesome: Requires Font Awesome CSS/fonts
- SVG: All modern browsers
- Images: All browsers

## Contributing

See the main [Contributing Guide](../../../../CONTRIBUTING.md) for details.
