# CAlert Component

A flexible and accessible alert component with multiple variants, states, and customization options. Built with Vue 3 Composition API, TypeScript, and comprehensive accessibility features.

## Features

- **Multiple Types**: Info, success, warning, and error variants
- **Size Options**: Small, medium, and large sizes
- **Dismissible**: Close button and keyboard (Escape) dismissal
- **Auto-dismiss**: Configurable timeout with optional progress bar
- **Custom Icons**: Support for custom icons via props or slots
- **Loading State**: Visual loading indicator with shimmer effect
- **Accessibility**: WCAG 2.1 AA compliant with ARIA support
- **Animations**: Smooth transitions with multiple animation types
- **Responsive**: Mobile-first design with responsive breakpoints
- **Theming**: CSS custom properties for easy customization

## Installation

```bash
# Import the component
import { CAlert } from '@celestial-ui/vue'

# Or import individual parts
import CAlert from '@celestial-ui/vue/components/atoms/alert/CAlert.vue'
import { useAlert } from '@celestial-ui/vue/components/atoms/alert/composables'
```

## Basic Usage

```vue
<template>
  <!-- Simple alert -->
  <CAlert type="info"> This is an informational message. </CAlert>

  <!-- Alert with title -->
  <CAlert type="success" title="Success!"> Your operation was completed successfully. </CAlert>

  <!-- Dismissible alert -->
  <CAlert type="warning" title="Warning" closable @close="handleClose">
    Please review this information.
  </CAlert>
</template>

<script setup>
const handleClose = () => {
  console.log('Alert closed')
}
</script>
```

## Props

| Prop              | Type                                          | Default       | Description                                   |
| ----------------- | --------------------------------------------- | ------------- | --------------------------------------------- |
| `type`            | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'`      | Alert type determining visual style           |
| `size`            | `'sm' \| 'md' \| 'lg'`                        | `'md'`        | Size of the alert                             |
| `title`           | `string`                                      | `undefined`   | Optional title text                           |
| `closable`        | `boolean`                                     | `false`       | Whether the alert can be dismissed            |
| `visible`         | `boolean`                                     | `undefined`   | Controlled visibility state                   |
| `dismissible`     | `boolean`                                     | `true`        | Whether alert can be dismissed with keyboard  |
| `autoDismiss`     | `number`                                      | `0`           | Auto-dismiss timeout in milliseconds          |
| `showProgress`    | `boolean`                                     | `false`       | Whether to show progress bar for auto-dismiss |
| `showIcon`        | `boolean`                                     | `true`        | Whether to show the icon                      |
| `icon`            | `string`                                      | `undefined`   | Custom icon name                              |
| `bordered`        | `boolean`                                     | `false`       | Whether the alert has a border                |
| `shadowed`        | `boolean`                                     | `false`       | Whether the alert has a shadow                |
| `loading`         | `boolean`                                     | `false`       | Whether the alert is in loading state         |
| `animation`       | `'fade' \| 'slide' \| 'scale' \| 'none'`      | `'fade'`      | Animation type for transitions                |
| `ariaLive`        | `'polite' \| 'assertive' \| 'off'`            | `'assertive'` | ARIA live region priority                     |
| `ariaLabel`       | `string`                                      | `undefined`   | Custom ARIA label                             |
| `ariaDescribedBy` | `string`                                      | `undefined`   | ARIA described by reference                   |
| `class`           | `string`                                      | `undefined`   | Custom CSS class                              |
| `style`           | `string \| object`                            | `undefined`   | Custom CSS styles                             |

## Events

| Event                 | Payload                       | Description                                  |
| --------------------- | ----------------------------- | -------------------------------------------- |
| `close`               | `MouseEvent \| KeyboardEvent` | Emitted when alert is closed                 |
| `show`                | `void`                        | Emitted when alert becomes visible           |
| `hide`                | `void`                        | Emitted when alert becomes hidden            |
| `click`               | `MouseEvent`                  | Emitted when alert is clicked                |
| `focus`               | `FocusEvent`                  | Emitted when alert receives focus            |
| `blur`                | `FocusEvent`                  | Emitted when alert loses focus               |
| `mouseenter`          | `MouseEvent`                  | Emitted when mouse enters alert              |
| `mouseleave`          | `MouseEvent`                  | Emitted when mouse leaves alert              |
| `autoDismissStart`    | `void`                        | Emitted when auto-dismiss timer starts       |
| `autoDismissCancel`   | `void`                        | Emitted when auto-dismiss timer is cancelled |
| `autoDismissComplete` | `void`                        | Emitted when auto-dismiss timer completes    |

## Slots

| Slot      | Description                                   |
| --------- | --------------------------------------------- |
| `default` | Main alert content                            |
| `title`   | Custom title content (overrides `title` prop) |
| `icon`    | Custom icon content (overrides default icons) |
| `action`  | Action buttons or interactive elements        |
| `close`   | Custom close button content                   |

## Advanced Usage

### Auto-dismiss with Progress Bar

```vue
<template>
  <CAlert
    type="success"
    :autoDismiss="5000"
    :showProgress="true"
    @autoDismissComplete="handleAutoDismiss"
  >
    This alert will auto-dismiss in 5 seconds.
  </CAlert>
</template>

<script setup>
const handleAutoDismiss = () => {
  console.log('Alert auto-dismissed')
}
</script>
```

### Custom Icons

```vue
<template>
  <!-- Using icon prop -->
  <CAlert type="info" icon="custom-icon"> Alert with custom icon. </CAlert>

  <!-- Using icon slot -->
  <CAlert type="warning">
    Alert with custom icon slot.
    <template #icon>
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2L3 7v11h14V7l-7-5z" />
      </svg>
    </template>
  </CAlert>
</template>
```

### With Actions

```vue
<template>
  <CAlert type="success" title="File Uploaded">
    Your file has been uploaded successfully.
    <template #action>
      <button
        class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
        @click="viewFile"
      >
        View File
      </button>
    </template>
  </CAlert>
</template>

<script setup>
const viewFile = () => {
  // Handle action
}
</script>
```

### Controlled Visibility

```vue
<template>
  <div>
    <button @click="showAlert = !showAlert">Toggle Alert</button>

    <CAlert v-model:visible="showAlert" type="info" @show="handleShow" @hide="handleHide">
      This alert's visibility is controlled by a parent component.
    </CAlert>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showAlert = ref(false)

const handleShow = () => {
  console.log('Alert shown')
}

const handleHide = () => {
  console.log('Alert hidden')
}
</script>
```

### Loading State

```vue
<template>
  <CAlert type="info" :loading="isLoading" title="Processing">
    Please wait while we process your request...
  </CAlert>
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(true)

// Simulate loading
setTimeout(() => {
  isLoading.value = false
}, 3000)
</script>
```

## Accessibility

The CAlert component is built with accessibility in mind and includes:

- **ARIA Roles**: Uses `alert` or `status` roles based on `ariaLive` prop
- **Live Regions**: Supports `polite`, `assertive`, and `off` announcements
- **Keyboard Navigation**: Escape key dismissal when `dismissible` is true
- **Screen Reader Support**: Proper labeling and descriptions
- **Focus Management**: Focusable with `tabindex="-1"`
- **High Contrast**: Supports high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

### ARIA Attributes

```vue
<template>
  <CAlert
    type="error"
    title="Critical Error"
    ariaLive="assertive"
    ariaLabel="Critical system error requiring immediate attention"
    ariaDescribedBy="error-description"
  >
    A critical error has occurred.
  </CAlert>
</template>
```

## Styling

### CSS Custom Properties

The component uses CSS custom properties for easy theming:

```css
.celestial-alert {
  --celestial-alert-bg: #f8fafc;
  --celestial-alert-color: #1e293b;
  --celestial-alert-border: transparent;
  --celestial-alert-radius: 0.375rem;
  --celestial-alert-padding: 1rem;
  --celestial-alert-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --celestial-alert-icon-size: 1.25rem;
  --celestial-alert-close-size: 1.5rem;
}
```

### Custom Classes

```vue
<template>
  <CAlert type="info" class="my-custom-alert" :style="{ '--celestial-alert-bg': '#e0f2fe' }">
    Custom styled alert.
  </CAlert>
</template>

<style>
.my-custom-alert {
  border-left: 4px solid #0288d1;
}
</style>
```

## Composables

### useAlert

The `useAlert` composable provides reactive state and methods for alert behavior:

```vue
<script setup>
import { useAlert } from '@celestial-ui/vue/components/atoms/alert/composables'

const props = defineProps({
  type: { type: String, default: 'info' },
  closable: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const { isVisible, canDismiss, alertClasses, handleClose, show, hide, toggle } = useAlert(
  props,
  emit,
)
</script>
```

### useAlertStyles

The `useAlertStyles` composable provides computed CSS classes:

```vue
<script setup>
import { useAlertStyles } from '@celestial-ui/vue/components/atoms/alert/composables'

const props = defineProps({
  type: { type: String, default: 'info' },
  size: { type: String, default: 'md' },
})

const { alertClasses, iconClasses, contentClasses, titleClasses, closeClasses } =
  useAlertStyles(props)
</script>
```

## Testing

The component includes comprehensive tests covering:

- Rendering and props
- Event handling
- Accessibility compliance
- Keyboard navigation
- Auto-dismiss functionality
- Visual variants and states

Run tests with:

```bash
npm test CAlert
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

When contributing to the CAlert component:

1. Follow the existing code style and patterns
2. Add tests for new features
3. Update documentation
4. Ensure accessibility compliance
5. Test across different browsers and devices

## License

MIT License - see LICENSE file for details.
