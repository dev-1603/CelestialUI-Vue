# CButton Component

A versatile button component for the CelestialUI-Vue library with comprehensive styling options, accessibility features, and flexible behavior.

## Overview

The `CButton` component provides a consistent, accessible, and customizable button implementation that can serve as both a traditional button and a link. Built with Vue 3 Composition API and TypeScript, it follows atomic design principles and modern accessibility standards.

## Features

- ✅ **Multiple Variants**: 7 visual styles (primary, secondary, success, warning, danger, ghost, link)
- ✅ **Flexible Sizing**: 5 size options (xs, sm, md, lg, xl)
- ✅ **State Management**: Loading, disabled, and interactive states
- ✅ **Icon Support**: Left and right icon positioning
- ✅ **Link Behavior**: Can function as anchor element with href
- ✅ **Accessibility**: Full ARIA support, keyboard navigation, screen reader friendly
- ✅ **Customizable**: Rounded corners, full-width option, custom styling
- ✅ **Type Safety**: Complete TypeScript support
- ✅ **Composable Architecture**: Reusable logic via composables

## Installation

The component is part of the CelestialUI-Vue library. Import it directly:

```typescript
import { CButton } from '@celestial-ui/vue/atoms'
```

Or import from the main package:

```typescript
import { CButton } from '@celestial-ui/vue'
```

## Basic Usage

```vue
<template>
  <div>
    <!-- Basic button -->
    <CButton @click="handleClick">
      Click me
    </CButton>

    <!-- Button with variant and size -->
    <CButton variant="success" size="lg" @click="handleSubmit">
      Submit
    </CButton>

    <!-- Loading button -->
    <CButton variant="primary" :loading="isLoading" @click="asyncAction">
      Save Changes
    </CButton>

    <!-- Button with icons -->
    <CButton leftIcon="+" variant="success">
      Add Item
    </CButton>

    <!-- Link button -->
    <CButton href="https://example.com" target="_blank" variant="link">
      External Link
    </CButton>
  </div>
</template>

<script setup>
import { CButton } from '@celestial-ui/vue/atoms'

const handleClick = () => {
  console.log('Button clicked!')
}

const handleSubmit = () => {
  // Handle form submission
}

const asyncAction = async () => {
  // Handle async operation
}
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'ghost' \| 'link'` | `'primary'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state with spinner |
| `block` | `boolean` | `false` | Full-width button |
| `leftIcon` | `string` | `undefined` | Left icon identifier |
| `rightIcon` | `string` | `undefined` | Right icon identifier |
| `href` | `string` | `undefined` | URL for link behavior |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | `undefined` | Link target |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type for forms |
| `rounded` | `boolean \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `false` | Border radius styling |
| `ariaLabel` | `string` | `undefined` | Accessibility label |
| `ariaDescribedBy` | `string` | `undefined` | Accessibility description reference |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted when button is clicked |
| `focus` | `FocusEvent` | Emitted when button receives focus |
| `blur` | `FocusEvent` | Emitted when button loses focus |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Button content (text, HTML elements) |

## Styling

The component uses CSS classes with the `celestial-button` prefix. Key classes include:

- `.celestial-button` - Base button styles
- `.celestial-button--{variant}` - Variant-specific styles
- `.celestial-button--{size}` - Size-specific styles
- `.celestial-button--loading` - Loading state styles
- `.celestial-button--disabled` - Disabled state styles
- `.celestial-button--block` - Full-width styles

### Custom CSS Variables

The component respects CSS custom properties for theming:

```css
.celestial-button {
  --button-primary-bg: #3b82f6;
  --button-primary-text: #ffffff;
  --button-focus-ring: #60a5fa;
}
```

## Accessibility

The component implements comprehensive accessibility features:

- **ARIA Attributes**: Proper `aria-label`, `aria-describedby`, `aria-disabled`
- **Keyboard Navigation**: Enter and Space key support for buttons
- **Focus Management**: Visible focus indicators and proper tab order
- **Screen Reader Support**: Loading states and disabled states announced
- **Semantic HTML**: Uses appropriate `button` or `a` elements

### Accessibility Best Practices

```vue
<template>
  <!-- Icon-only button with accessible label -->
  <CButton
    leftIcon="close"
    aria-label="Close dialog"
    variant="ghost"
    @click="closeDialog"
  />

  <!-- Button with description -->
  <CButton
    aria-describedby="save-description"
    @click="saveDocument"
  >
    Save Document
  </CButton>
  <p id="save-description">Saves the current document to your account</p>
</template>
```

## Advanced Examples

### Form Integration

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <CButton type="submit" variant="primary" :loading="isSubmitting">
      Submit Form
    </CButton>
    <CButton type="reset" variant="secondary" @click="resetForm">
      Reset
    </CButton>
  </form>
</template>
```

### Conditional Rendering

```vue
<template>
  <CButton
    :variant="isSuccess ? 'success' : 'primary'"
    :disabled="!isValid"
    :loading="isProcessing"
    @click="processAction"
  >
    {{ isSuccess ? 'Success!' : 'Process' }}
  </CButton>
</template>
```

### Custom Styling

```vue
<template>
  <CButton
    class="my-custom-button"
    variant="primary"
    rounded="full"
  >
    Custom Styled Button
  </CButton>
</template>

<style scoped>
.my-custom-button {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border: none;
}
</style>
```

## Composables

The component uses two main composables that can be reused:

### useButton

Handles component logic, event handling, and element type determination.

```typescript
import { useButton } from '@celestial-ui/vue/atoms/button'

const { buttonComponent, isDisabled, handleClick, handleKeydown } = useButton(props, emit)
```

### useButtonStyles

Computes CSS classes based on props.

```typescript
import { useButtonStyles } from '@celestial-ui/vue/atoms/button'

const { buttonClasses, iconClasses, textClasses } = useButtonStyles(props)
```

## Testing

The component includes comprehensive tests:

- **Unit Tests**: Component behavior, props, events, states
- **Accessibility Tests**: ARIA attributes, keyboard navigation, screen reader support
- **Integration Tests**: Form integration, routing behavior
- **Visual Tests**: Styling, responsive behavior

Run tests with:

```bash
npm run test:unit
npm run test:a11y
```

## Browser Support

- Modern browsers with ES2020+ support
- Vue 3.0+
- TypeScript 4.5+

## Related Components

- **CIconButton**: Icon-only button variant
- **CButtonGroup**: Multiple button grouping
- **CLink**: Text-based link component

## Migration Guide

### From v1.x to v2.x

- `color` prop renamed to `variant`
- `fullWidth` prop renamed to `block`
- Icon props now accept string identifiers instead of components

## Contributing

When contributing to this component:

1. Follow the existing TypeScript interfaces
2. Add tests for new functionality
3. Update documentation and stories
4. Ensure accessibility compliance
5. Follow the atomic design principles
