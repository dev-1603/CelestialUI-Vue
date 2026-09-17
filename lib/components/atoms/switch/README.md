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
- **TypeScript support** with full type definitions

## Installation

```bash
# The component is part of the CelestialUI library
npm install @celestialui/vue
```

## Basic Usage

```vue
<template>
  <CSwitch v-model="isEnabled" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CSwitch } from '@lib/components/atoms/switch'

const isEnabled = ref(false)
</script>
```

## Props

| Prop              | Type                                                                      | Default     | Description                                              |
| ----------------- | ------------------------------------------------------------------------- | ----------- | -------------------------------------------------------- |
| `modelValue`      | `boolean`                                                                 | `false`     | The current state of the switch (true = on, false = off) |
| `size`            | `'sm' \| 'md' \| 'lg'`                                                    | `'md'`      | Size variant of the switch                               |
| `color`           | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Color theme variant                                      |
| `disabled`        | `boolean`                                                                 | `false`     | Whether the switch is disabled                           |
| `loading`         | `boolean`                                                                 | `false`     | Whether the switch is in a loading state                 |
| `focusable`       | `boolean`                                                                 | `true`      | Whether the switch should be focusable                   |
| `ariaLabel`       | `string`                                                                  | -           | ARIA label for accessibility                             |
| `ariaDescribedBy` | `string`                                                                  | -           | ARIA described by for accessibility                      |
| `tabIndex`        | `number`                                                                  | `0`         | Custom tab index                                         |

## Events

| Event               | Payload         | Description                                 |
| ------------------- | --------------- | ------------------------------------------- |
| `update:modelValue` | `boolean`       | Emitted when the switch value changes       |
| `change`            | `boolean`       | Emitted when the switch state changes       |
| `click`             | `MouseEvent`    | Emitted when the switch is clicked          |
| `focus`             | `FocusEvent`    | Emitted when the switch receives focus      |
| `blur`              | `FocusEvent`    | Emitted when the switch loses focus         |
| `keydown`           | `KeyboardEvent` | Emitted when a key is pressed on the switch |

## Slots

| Slot      | Props                                                    | Description          |
| --------- | -------------------------------------------------------- | -------------------- |
| `default` | `{ isOn: boolean, disabled: boolean, loading: boolean }` | Main content slot    |
| `track`   | `{ isOn: boolean, disabled: boolean, loading: boolean }` | Custom track content |
| `thumb`   | `{ isOn: boolean, disabled: boolean, loading: boolean }` | Custom thumb content |

## Examples

### Basic Usage

```vue
<template>
  <div class="space-y-4">
    <CSwitch v-model="notifications" />
    <CSwitch v-model="darkMode" color="secondary" />
    <CSwitch v-model="autoSave" color="success" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CSwitch } from '@lib/components/atoms/switch'

const notifications = ref(false)
const darkMode = ref(true)
const autoSave = ref(false)
</script>
```

### With Labels

```vue
<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <label class="text-sm font-medium">Enable notifications</label>
      <CSwitch v-model="notifications" />
    </div>

    <div class="flex items-center justify-between">
      <label class="text-sm font-medium">Dark mode</label>
      <CSwitch v-model="darkMode" color="secondary" />
    </div>
  </div>
</template>
```

### Different Sizes

```vue
<template>
  <div class="flex items-center gap-4">
    <CSwitch v-model="value" size="sm" />
    <CSwitch v-model="value" size="md" />
    <CSwitch v-model="value" size="lg" />
  </div>
</template>
```

### Custom Slots

```vue
<template>
  <CSwitch v-model="isEnabled">
    <template #track="{ isOn, disabled }">
      <div class="custom-track" :class="{ active: isOn, disabled }">
        {{ isOn ? 'ON' : 'OFF' }}
      </div>
    </template>

    <template #thumb="{ isOn, disabled }">
      <div class="custom-thumb" :class="{ active: isOn, disabled }">
        {{ isOn ? '✓' : '✗' }}
      </div>
    </template>
  </CSwitch>
</template>

<style scoped>
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

.custom-thumb {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  font-weight: bold;
  color: #3b82f6;
  transition: all 0.2s ease;
}

.custom-thumb.active {
  color: #10b981;
}
</style>
```

### Form Integration

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <label for="notifications" class="text-sm font-medium"> Push Notifications </label>
        <CSwitch
          id="notifications"
          v-model="form.notifications"
          aria-label="Enable push notifications"
        />
      </div>

      <div class="flex items-center justify-between">
        <label for="darkMode" class="text-sm font-medium"> Dark Mode </label>
        <CSwitch
          id="darkMode"
          v-model="form.darkMode"
          color="secondary"
          aria-label="Toggle dark mode"
        />
      </div>
    </div>

    <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      Save Settings
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { CSwitch } from '@lib/components/atoms/switch'

const form = reactive({
  notifications: false,
  darkMode: false,
})

const handleSubmit = () => {
  console.log('Form submitted:', form)
}
</script>
```

## Using the Composable

The `useSwitch` composable provides programmatic control over switch state:

```vue
<template>
  <div class="space-y-4">
    <CSwitch v-model="isOn" />

    <div class="flex gap-2">
      <button @click="turnOn">Turn On</button>
      <button @click="turnOff">Turn Off</button>
      <button @click="toggle">Toggle</button>
    </div>

    <p>Current state: {{ isOn ? 'On' : 'Off' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CSwitch, useSwitch } from '@lib/components/atoms/switch'

const isOn = ref(false)

const { turnOn, turnOff, toggle } = useSwitch({
  initialValue: false,
  onChange: (value) => {
    console.log('Switch changed to:', value)
  },
})
</script>
```

## Accessibility

The CSwitch component is built with accessibility in mind:

- **ARIA Support**: Uses `role="switch"` with proper `aria-checked` and `aria-disabled` attributes
- **Keyboard Navigation**: Supports Space and Enter keys for activation
- **Focus Management**: Proper focus indicators and tab order
- **Screen Reader Support**: Descriptive labels and state announcements
- **High Contrast**: Supports high contrast mode
- **Reduced Motion**: Respects user's motion preferences

### Accessibility Best Practices

```vue
<template>
  <!-- Good: Use descriptive labels -->
  <div class="flex items-center justify-between">
    <label for="notifications" class="text-sm font-medium"> Push Notifications </label>
    <CSwitch
      id="notifications"
      v-model="notifications"
      aria-label="Enable push notifications"
      aria-describedby="notifications-desc"
    />
  </div>
  <p id="notifications-desc" class="text-xs text-gray-500">
    You will receive push notifications when new messages arrive.
  </p>
</template>
```

## Styling

The component uses CSS custom properties for easy theming:

```css
.custom-switch {
  --color-on: #10b981;
  --color-off: #e5e7eb;
  --color-thumb: #ffffff;
  --animation-duration: 300ms;
}
```

### CSS Custom Properties

| Property               | Default   | Description                          |
| ---------------------- | --------- | ------------------------------------ |
| `--switch-width`       | `44px`    | Width of the switch track            |
| `--switch-height`      | `24px`    | Height of the switch track           |
| `--thumb-size`         | `20px`    | Size of the switch thumb             |
| `--thumb-offset`       | `2px`     | Offset of the thumb from track edges |
| `--color-on`           | `#3b82f6` | Color when switch is on              |
| `--color-off`          | `#d1d5db` | Color when switch is off             |
| `--color-thumb`        | `#ffffff` | Color of the switch thumb            |
| `--animation-duration` | `200ms`   | Duration of transition animations    |

## TypeScript Support

The component is fully typed with TypeScript:

```typescript
import type {
  CSwitchProps,
  CSwitchEmits,
  SwitchSize,
  SwitchColor,
} from '@lib/components/atoms/switch'

// Type-safe props
const props: CSwitchProps = {
  modelValue: false,
  size: 'md',
  color: 'primary',
  disabled: false,
}

// Type-safe events
const handleChange = (value: boolean) => {
  console.log('Switch changed to:', value)
}
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

When contributing to the CSwitch component:

1. Follow the existing code style and patterns
2. Add tests for new features
3. Update documentation
4. Ensure accessibility compliance
5. Test across different browsers and devices

## License

This component is part of the CelestialUI library and is licensed under the MIT License.
