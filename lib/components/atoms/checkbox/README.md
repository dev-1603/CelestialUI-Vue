# CCheckbox Component

A versatile checkbox component with support for indeterminate states, custom icons, and various sizes and color schemes. Built with accessibility and SSR-compatibility in mind.

## Features

- ✅ **SSR Friendly** - Works without JavaScript
- ✅ **Headless** - `useCheckbox` and `useCheckboxHeadless` hooks with state management
- ✅ **Accessible** - Full keyboard navigation and screen reader support
- ✅ **Customizable** - CSS custom properties, slots, and props
- ✅ **TypeScript** - Full type safety with TypeScript support
- ✅ **Indeterminate State** - Support for partial selection scenarios
- ✅ **Form Integration** - Works seamlessly with form libraries

## Basic Usage

```vue
<template>
  <CCheckbox
    :checked="isChecked"
    @change="handleChange"
    children="Accept terms and conditions"
  />
</template>

<script setup>
import { ref } from 'vue'
import { CCheckbox } from '@celestialui/vue'

const isChecked = ref(false)

const handleChange = (checked, event) => {
  isChecked.value = checked
}
</script>
```

## Props

### Mandatory Props

| Prop | Type | Description |
|------|------|-------------|
| `checked` | `boolean` | Checkbox checked state |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the checkbox |
| `colorScheme` | `string` | `'primary'` | Color scheme for styling |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `disabled` | `boolean` | `false` | Disabled state |
| `children` | `string` | - | Label text content |
| `id` | `string` | - | Unique identifier |
| `name` | `string` | - | Form field name |
| `value` | `string` | - | Form field value |
| `ariaDescribedBy` | `string` | - | Accessibility description |
| `tabIndex` | `number` | - | Tab order control |
| `form` | `string` | - | Associate with form element |
| `checkIcon` | `string` | `'✓'` | Custom check icon |
| `indeterminateIcon` | `string` | `'−'` | Custom indeterminate icon |

## Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(checked: boolean, event: Event)` | Fired when checkbox state changes |
| `focus` | `(event: FocusEvent)` | Fired when checkbox receives focus |
| `blur` | `(event: FocusEvent)` | Fired when checkbox loses focus |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Default label content |
| `icon` | Custom check/indeterminate icon |
| `label` | Custom label content |
| `description` | Additional description text |

## Examples

### Basic States

```vue
<template>
  <!-- Unchecked -->
  <CCheckbox :checked="false" children="Unchecked" />
  
  <!-- Checked -->
  <CCheckbox :checked="true" children="Checked" />
  
  <!-- Indeterminate -->
  <CCheckbox :indeterminate="true" children="Indeterminate" />
  
  <!-- Disabled -->
  <CCheckbox :disabled="true" :checked="false" children="Disabled" />
</template>
```

### Sizes

```vue
<template>
  <CCheckbox size="sm" :checked="true" children="Small" />
  <CCheckbox size="md" :checked="true" children="Medium" />
  <CCheckbox size="lg" :checked="true" children="Large" />
</template>
```

### Color Schemes

```vue
<template>
  <CCheckbox color-scheme="primary" :checked="true" children="Primary" />
  <CCheckbox color-scheme="success" :checked="true" children="Success" />
  <CCheckbox color-scheme="warning" :checked="true" children="Warning" />
  <CCheckbox color-scheme="danger" :checked="true" children="Danger" />
</template>
```

### With Description

```vue
<template>
  <CCheckbox :checked="false" children="Enable notifications">
    <template #description>
      Receive email updates about your account activity
    </template>
  </CCheckbox>
</template>
```

### Custom Icons

```vue
<template>
  <CCheckbox 
    :checked="true" 
    check-icon="✅" 
    children="Custom check icon" 
  />
  
  <CCheckbox 
    :indeterminate="true" 
    indeterminate-icon="◆" 
    children="Custom indeterminate icon" 
  />
</template>
```

### Form Integration

```vue
<template>
  <form @submit="handleSubmit">
    <CCheckbox
      v-model:checked="formData.newsletter"
      name="newsletter"
      value="yes"
      children="Subscribe to newsletter"
    />
    
    <CCheckbox
      v-model:checked="formData.terms"
      name="terms"
      value="accepted"
      children="I agree to the terms"
    />
    
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  newsletter: false,
  terms: false
})

const handleSubmit = (e) => {
  e.preventDefault()
  console.log('Form data:', formData.value)
}
</script>
```

### List Selection (Select All)

```vue
<template>
  <div>
    <!-- Select all checkbox -->
    <CCheckbox
      :checked="allSelected"
      :indeterminate="indeterminate"
      @change="toggleAll"
      children="Select all items"
    />
    
    <!-- Individual items -->
    <CCheckbox
      v-for="item in items"
      :key="item.id"
      :checked="item.selected"
      @change="() => toggleItem(item.id)"
      :children="item.name"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { id: 1, name: 'Item 1', selected: false },
  { id: 2, name: 'Item 2', selected: true },
  { id: 3, name: 'Item 3', selected: false }
])

const allSelected = computed(() => 
  items.value.every(item => item.selected)
)

const someSelected = computed(() => 
  items.value.some(item => item.selected)
)

const indeterminate = computed(() => 
  someSelected.value && !allSelected.value
)

const toggleAll = () => {
  const newState = !allSelected.value
  items.value.forEach(item => {
    item.selected = newState
  })
}

const toggleItem = (id) => {
  const item = items.value.find(item => item.id === id)
  if (item) {
    item.selected = !item.selected
  }
}
</script>
```

## Headless Usage

Use the composables for custom implementations:

```vue
<template>
  <div>
    <!-- Custom checkbox implementation -->
    <div 
      @click="toggle" 
      :class="{ 'checked': isChecked, 'disabled': isDisabled }"
    >
      Custom Checkbox: {{ isChecked ? 'ON' : 'OFF' }}
    </div>
  </div>
</template>

<script setup>
import { useCheckboxHeadless } from '@celestialui/vue'

const { isChecked, isDisabled, toggle } = useCheckboxHeadless({
  defaultChecked: false,
  onChange: (checked, event) => {
    console.log('Checkbox changed:', checked)
  }
})
</script>
```

## Accessibility

The checkbox component follows WAI-ARIA guidelines:

- **Keyboard Navigation**: Tab to focus, Space to toggle
- **Screen Reader Support**: Proper ARIA attributes and state announcements
- **Focus Management**: Visible focus indicators
- **Label Association**: Proper label-input relationships

### ARIA Attributes

- `aria-checked`: Announces checked/unchecked/mixed state
- `aria-describedby`: Links to description text
- `role="checkbox"`: Implicit from input type

### Keyboard Shortcuts

- `Tab`: Move focus to/from checkbox
- `Space`: Toggle checkbox state
- `Shift + Tab`: Move focus backward

## CSS Custom Properties

Customize appearance using CSS variables:

```css
.celestial-checkbox {
  --checkbox-size: 1.25rem;
  --checkbox-border-color: #d1d5db;
  --checkbox-bg-color: #ffffff;
  --checkbox-checked-bg: #3b82f6;
  --checkbox-checked-border: #3b82f6;
  --checkbox-focus-ring: #3b82f6;
  --checkbox-disabled-opacity: 0.5;
}
```

## TypeScript Support

Full TypeScript support with proper type definitions:

```typescript
import type { CCheckboxProps, CCheckboxEmits } from '@celestialui/vue'

// Component props typing
const props: CCheckboxProps = {
  checked: true,
  size: 'md',
  colorScheme: 'primary'
}

// Event handler typing
const handleChange: CCheckboxEmits['change'] = (checked, event) => {
  // TypeScript knows the exact types
}
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance

- Lightweight (~2KB gzipped)
- Zero dependencies
- Optimized for SSR
- Minimal re-renders with proper reactivity
