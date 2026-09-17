# CProgress

A versatile progress indicator component with accessibility features, animations, and customizable styling. Supports both determinate and indeterminate progress states.

## Features

- **Multiple sizes**: Small, medium, and large variants
- **Progress modes**: Determinate and indeterminate progress
- **Visual variants**: Animated and striped progress bars
- **Custom formatting**: Flexible text display options
- **Accessibility**: Full WCAG 2.1 AA compliance with ARIA support
- **Keyboard navigation**: Focusable progress bars
- **Custom styling**: Extensive customization options
- **Slot support**: Customizable labels and text content
- **Responsive design**: Mobile-first approach with fluid layouts

## Installation

```bash
# The component is part of the CelestialUI library
npm install @celestial-ui/vue
```

## Basic Usage

```vue
<template>
  <CProgress
    :value="progressValue"
    :max="100"
    size="md"
    label="Upload Progress"
    show-percentage
    @complete="handleComplete"
  />
</template>

<script setup>
import { ref } from 'vue'
import { CProgress } from '@celestial-ui/vue'

const progressValue = ref(0)

const handleComplete = () => {
  console.log('Progress complete!')
}
</script>
```

## Props

| Prop                | Type                   | Default     | Description                                            |
| ------------------- | ---------------------- | ----------- | ------------------------------------------------------ |
| `value`             | `number`               | `0`         | Current progress value (0 to max)                      |
| `max`               | `number`               | `100`       | Maximum progress value                                 |
| `size`              | `'sm' \| 'md' \| 'lg'` | `'md'`      | Size of the progress bar                               |
| `label`             | `string`               | `''`        | Progress label for accessibility                       |
| `showPercentage`    | `boolean`              | `false`     | Whether to show percentage text                        |
| `showValue`         | `boolean`              | `false`     | Whether to show value text                             |
| `textFormat`        | `function`             | `undefined` | Custom text format function                            |
| `animated`          | `boolean`              | `false`     | Whether the progress bar is animated                   |
| `animationDuration` | `number`               | `300`       | Animation duration in milliseconds                     |
| `striped`           | `boolean`              | `false`     | Whether to show progress bar stripes                   |
| `customClass`       | `string`               | `''`        | Custom CSS class for the progress bar                  |
| `fillClass`         | `string`               | `''`        | Custom CSS class for the progress fill                 |
| `textClass`         | `string`               | `''`        | Custom CSS class for the progress text                 |
| `indeterminate`     | `boolean`              | `false`     | Whether the progress bar is indeterminate              |
| `ariaLabel`         | `string`               | `''`        | Accessibility label override                           |
| `ariaDescribedBy`   | `string`               | `''`        | Accessibility description                              |
| `announceChanges`   | `boolean`              | `false`     | Whether to announce progress changes to screen readers |

## Events

| Event      | Payload                               | Description                           |
| ---------- | ------------------------------------- | ------------------------------------- |
| `complete` | -                                     | Emitted when progress reaches 100%    |
| `change`   | `(value: number, percentage: number)` | Emitted when progress value changes   |
| `focus`    | `(event: FocusEvent)`                 | Emitted when progress bar is focused  |
| `blur`     | `(event: FocusEvent)`                 | Emitted when progress bar loses focus |

## Slots

| Slot      | Description          |
| --------- | -------------------- |
| `default` | Custom content       |
| `label`   | Custom label content |
| `text`    | Custom progress text |

## Examples

### Basic Progress

```vue
<template>
  <CProgress :value="50" :max="100" />
</template>
```

### With Label and Percentage

```vue
<template>
  <CProgress :value="75" :max="100" label="Download Progress" show-percentage />
</template>
```

### Animated Striped Progress

```vue
<template>
  <CProgress :value="60" :max="100" label="Processing" animated striped show-percentage />
</template>
```

### Indeterminate Progress

```vue
<template>
  <CProgress :value="0" :max="100" label="Loading..." indeterminate />
</template>
```

### Custom Formatting

```vue
<template>
  <CProgress :value="40" :max="100" label="File Upload" :text-format="customFormat" />
</template>

<script setup>
const customFormat = (value, max, percentage) => `${value}/${max} (${percentage}%)`
</script>
```

### With Slots

```vue
<template>
  <CProgress :value="80" :max="100">
    <template #label>
      <span class="font-bold text-blue-600">Custom Label</span>
    </template>
    <template #text>
      <span class="text-green-600 font-semibold">Almost done!</span>
    </template>
  </CProgress>
</template>
```

### Interactive Progress

```vue
<template>
  <div>
    <CProgress
      :value="progress"
      :max="100"
      label="Interactive Progress"
      show-percentage
      animated
      @complete="handleComplete"
    />
    <div class="mt-4 space-x-2">
      <button @click="progress = Math.max(0, progress - 10)">-10</button>
      <button @click="progress = Math.min(100, progress + 10)">+10</button>
      <button @click="progress = 0">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const progress = ref(0)

const handleComplete = () => {
  console.log('Progress completed!')
}
</script>
```

## Accessibility

The CProgress component follows WCAG 2.1 AA guidelines and includes:

- **ARIA attributes**: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Keyboard navigation**: Progress bar is focusable with Tab key
- **Screen reader support**: Proper labeling and value announcements
- **High contrast support**: Enhanced visibility in high contrast mode
- **Reduced motion support**: Respects user's motion preferences

## Styling

The component uses CSS custom properties for easy theming:

```css
.celestial-progress {
  --celestial-progress-bg: #e5e7eb;
  --celestial-progress-fill: #3b82f6;
  --celestial-progress-text: #374151;
  --celestial-progress-label: #111827;
  --celestial-progress-border-radius: 9999px;
  --celestial-progress-transition: 300ms ease-in-out;
}
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT License - see LICENSE file for details.
