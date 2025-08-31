# CInput Component

A versatile input component with validation, states, and accessibility support. Features debouncing, multiple variants, and comprehensive form integration.

## Features

- ✅ **SSR Friendly** - Server-side rendering compatible
- ✅ **Headless** - `useInput` and `useInputHeadless` hooks with validation logic
- ✅ **Accessible** - Full ARIA support and keyboard navigation
- ✅ **Customizable** - CSS custom properties, slots, and variants
- ✅ **TypeScript** - Complete type safety with TypeScript support
- ✅ **Validation** - Built-in validation with custom validation support
- ✅ **Debouncing** - Configurable debounce timing for change events
- ✅ **Form Integration** - Native form support with proper attributes

## Basic Usage

```vue
<template>
  <CInput
    :value="inputValue"
    @change="handleChange"
    placeholder="Enter text here"
  />
</template>

<script setup>
import { ref } from 'vue'
import { CInput } from '@celestialui/vue'

const inputValue = ref('')

const handleChange = (value, event) => {
  inputValue.value = value
}
</script>
```

## Props

### Mandatory Props

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Input value |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | Placeholder text |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'url' \| 'tel' \| 'search'` | `'text'` | Input type |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `variant` | `'outline' \| 'filled' \| 'unstyled'` | `'outline'` | Visual variant |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |
| `required` | `boolean` | `false` | Required field |
| `invalid` | `boolean` | `false` | Invalid/error state |
| `debounceMs` | `number` | `0` | Debounce delay in milliseconds |
| `helperText` | `string` | - | Helper text below input |
| `errorMessage` | `string` | - | Error message when invalid |
| `minLength` | `number` | - | Minimum character length |
| `maxLength` | `number` | - | Maximum character length |
| `min` | `number \| string` | - | Minimum value (number type) |
| `max` | `number \| string` | - | Maximum value (number type) |
| `step` | `number \| string` | - | Step value (number type) |
| `pattern` | `string` | - | Validation pattern (regex) |
| `autocomplete` | `string` | - | Autocomplete attribute |
| `id` | `string` | - | Unique identifier |
| `name` | `string` | - | Form field name |
| `ariaLabel` | `string` | - | Accessibility label |
| `ariaDescribedBy` | `string` | - | Accessibility description |
| `tabIndex` | `number` | - | Tab order control |
| `form` | `string` | - | Associate with form element |

## Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `change` | `(value: string, event: Event)` | Fired when input value changes |
| `input` | `(value: string, event: Event)` | Fired on real-time input |
| `focus` | `(event: FocusEvent)` | Fired when input receives focus |
| `blur` | `(event: FocusEvent)` | Fired when input loses focus |
| `keydown` | `(event: KeyboardEvent)` | Fired on key press |
| `keyup` | `(event: KeyboardEvent)` | Fired on key release |
| `enter` | `(event: KeyboardEvent)` | Fired when Enter key is pressed |
| `escape` | `(event: KeyboardEvent)` | Fired when Escape key is pressed |

## Slots

| Slot | Description |
|------|-------------|
| `leftElement` | Element displayed on the left side |
| `rightElement` | Element displayed on the right side |
| `prepend` | Content prepended before input |
| `append` | Content appended after input |
| `helperText` | Custom helper text content |
| `errorMessage` | Custom error message content |
| `clearIcon` | Custom clear button icon |

## Examples

### Basic Input Types

```vue
<template>
  <!-- Text input -->
  <CInput v-model:value="textValue" type="text" placeholder="Enter text" />
  
  <!-- Email input -->
  <CInput v-model:value="emailValue" type="email" placeholder="Enter email" />
  
  <!-- Password input -->
  <CInput v-model:value="passwordValue" type="password" placeholder="Enter password" />
  
  <!-- Number input -->
  <CInput v-model:value="numberValue" type="number" placeholder="Enter number" />
</template>
```

### Sizes and Variants

```vue
<template>
  <!-- Sizes -->
  <CInput size="sm" placeholder="Small input" />
  <CInput size="md" placeholder="Medium input" />
  <CInput size="lg" placeholder="Large input" />
  
  <!-- Variants -->
  <CInput variant="outline" placeholder="Outline variant" />
  <CInput variant="filled" placeholder="Filled variant" />
  <CInput variant="unstyled" placeholder="Unstyled variant" />
</template>
```

### With Elements and Addons

```vue
<template>
  <!-- Search with icon -->
  <CInput placeholder="Search products">
    <template #leftElement>
      <SearchIcon class="w-4 h-4" />
    </template>
  </CInput>
  
  <!-- Price with currency -->
  <CInput type="number" placeholder="0.00">
    <template #leftElement>
      <span>$</span>
    </template>
    <template #rightElement>
      <span>USD</span>
    </template>
  </CInput>
  
  <!-- URL with prepend/append -->
  <CInput type="url" placeholder="example">
    <template #prepend>
      <span>https://</span>
    </template>
    <template #append>
      <span>.com</span>
    </template>
  </CInput>
</template>
```

### Validation and Error Handling

```vue
<template>
  <!-- With helper text -->
  <CInput
    v-model:value="password"
    type="password"
    helper-text="Password must be at least 8 characters"
    placeholder="Enter password"
  />
  
  <!-- With error message -->
  <CInput
    v-model:value="email"
    type="email"
    :invalid="emailError"
    :error-message="emailErrorMessage"
    placeholder="Enter email"
  />
  
  <!-- With validation -->
  <CInput
    v-model:value="username"
    :min-length="3"
    :max-length="20"
    pattern="[a-zA-Z0-9]+"
    placeholder="Username"
  />
</template>
```

### Debounced Input

```vue
<template>
  <CInput
    v-model:value="searchQuery"
    :debounce-ms="500"
    placeholder="Search with 500ms debounce"
    @change="performSearch"
  />
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const performSearch = (query) => {
  // This will be called 500ms after user stops typing
  console.log('Searching for:', query)
}
</script>
```

### Form Integration

```vue
<template>
  <form @submit="handleSubmit">
    <CInput
      v-model:value="formData.email"
      type="email"
      name="email"
      required
      placeholder="Email address"
    />
    
    <CInput
      v-model:value="formData.password"
      type="password"
      name="password"
      required
      :min-length="8"
      placeholder="Password"
    />
    
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  email: '',
  password: ''
})

const handleSubmit = (e) => {
  e.preventDefault()
  console.log('Form data:', formData.value)
}
</script>
```

### States

```vue
<template>
  <!-- Normal -->
  <CInput v-model:value="normal" placeholder="Normal input" />
  
  <!-- Disabled -->
  <CInput v-model:value="disabled" disabled placeholder="Disabled input" />
  
  <!-- Readonly -->
  <CInput v-model:value="readonly" readonly placeholder="Readonly input" />
  
  <!-- Required -->
  <CInput v-model:value="required" required placeholder="Required input" />
  
  <!-- Invalid -->
  <CInput 
    v-model:value="invalid" 
    invalid 
    error-message="This field has an error"
    placeholder="Invalid input" 
  />
</template>
```

## Headless Usage

Use the composables for custom implementations:

```vue
<template>
  <div class="custom-input-wrapper">
    <input
      :value="inputValue"
      @input="setValue($event.target.value, $event)"
      @focus="handleFocus"
      @blur="handleBlur"
      :disabled="isDisabled"
      :class="{ 'error': isInvalid }"
    />
    <div v-if="!isValid" class="error-message">
      {{ validationMessage }}
    </div>
  </div>
</template>

<script setup>
import { useInputHeadless } from '@celestialui/vue'

const {
  inputValue,
  isDisabled,
  isInvalid,
  isValid,
  validationMessage,
  setValue,
  handleFocus,
  handleBlur
} = useInputHeadless({
  defaultValue: '',
  validate: (value) => {
    if (!value) return 'This field is required'
    if (value.length < 3) return 'Minimum 3 characters required'
    return true
  },
  onChange: (value) => {
    console.log('Value changed:', value)
  }
})
</script>
```

## Accessibility

The input component follows WAI-ARIA guidelines:

- **Keyboard Navigation**: Full keyboard support with Tab navigation
- **Screen Reader Support**: Proper ARIA attributes and announcements
- **Error Handling**: Live regions for error messages
- **Label Association**: Proper label-input relationships

### ARIA Attributes

- `aria-invalid`: Indicates validation state
- `aria-describedby`: Links to helper text and error messages
- `aria-label`: Provides accessible name when no visible label
- `role="alert"`: For error messages

### Keyboard Shortcuts

- `Tab`: Move focus to/from input
- `Enter`: Submit form or trigger enter event
- `Escape`: Clear input or trigger escape event

## CSS Custom Properties

Customize appearance using CSS variables:

```css
.celestial-input {
  --input-border-color: #d1d5db;
  --input-border-radius: 0.375rem;
  --input-bg-color: #ffffff;
  --input-text-color: #111827;
  --input-placeholder-color: #6b7280;
  --input-focus-border-color: #3b82f6;
  --input-focus-ring-color: #3b82f6;
  --input-invalid-border-color: #ef4444;
  --input-disabled-bg-color: #f3f4f6;
  --input-disabled-text-color: #6b7280;
}
```

## TypeScript Support

Full TypeScript support with proper type definitions:

```typescript
import type { CInputProps, CInputEmits } from '@celestialui/vue'

// Component props typing
const props: CInputProps = {
  value: 'test',
  type: 'email',
  size: 'lg',
  variant: 'filled'
}

// Event handler typing
const handleChange: CInputEmits['change'] = (value, event) => {
  // TypeScript knows the exact types
}
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance

- Lightweight (~3KB gzipped)
- Optimized re-renders with proper reactivity
- Debouncing support for performance optimization
- SSR compatible
