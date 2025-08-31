// Input API data for the generic ApiReference component
export const inputApiData = {
  title: 'CInput API Reference',
  componentProps: [
    {
      name: 'value',
      type: 'string',
      required: true,
      description: 'Input value'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: 'Placeholder text'
    },
    {
      name: 'type',
      type: "'text' | 'email' | 'password' | 'number' | 'url' | 'tel' | 'search'",
      required: false,
      description: 'Input type',
      default: 'text'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      description: 'Input size',
      default: 'md'
    },
    {
      name: 'variant',
      type: "'outline' | 'filled' | 'unstyled'",
      required: false,
      description: 'Visual variant',
      default: 'outline'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      description: 'Disabled state',
      default: 'false'
    },
    {
      name: 'readonly',
      type: 'boolean',
      required: false,
      description: 'Readonly state',
      default: 'false'
    },
    {
      name: 'required',
      type: 'boolean',
      required: false,
      description: 'Required field',
      default: 'false'
    },
    {
      name: 'invalid',
      type: 'boolean',
      required: false,
      description: 'Invalid/error state',
      default: 'false'
    },
    {
      name: 'debounceMs',
      type: 'number',
      required: false,
      description: 'Debounce delay in milliseconds',
      default: '0'
    },
    {
      name: 'helperText',
      type: 'string',
      required: false,
      description: 'Helper text below input'
    },
    {
      name: 'errorMessage',
      type: 'string',
      required: false,
      description: 'Error message when invalid'
    },
    {
      name: 'minLength',
      type: 'number',
      required: false,
      description: 'Minimum character length'
    },
    {
      name: 'maxLength',
      type: 'number',
      required: false,
      description: 'Maximum character length'
    },
    {
      name: 'min',
      type: 'number | string',
      required: false,
      description: 'Minimum value (number type)'
    },
    {
      name: 'max',
      type: 'number | string',
      required: false,
      description: 'Maximum value (number type)'
    },
    {
      name: 'step',
      type: 'number | string',
      required: false,
      description: 'Step value (number type)'
    },
    {
      name: 'pattern',
      type: 'string',
      required: false,
      description: 'Validation pattern (regex)'
    },
    {
      name: 'autocomplete',
      type: 'string',
      required: false,
      description: 'Autocomplete attribute'
    },
    {
      name: 'id',
      type: 'string',
      required: false,
      description: 'Unique identifier'
    },
    {
      name: 'name',
      type: 'string',
      required: false,
      description: 'Form field name'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      required: false,
      description: 'Accessibility label'
    },
    {
      name: 'ariaDescribedBy',
      type: 'string',
      required: false,
      description: 'Accessibility description'
    },
    {
      name: 'tabIndex',
      type: 'number',
      required: false,
      description: 'Tab order control'
    },
    {
      name: 'form',
      type: 'string',
      required: false,
      description: 'Associate with form element'
    }
  ],
  componentEvents: [
    {
      name: '@change',
      description: 'Fired when input value changes',
      payload: '(value: string, event: Event)',
      usage: '@change="handleChange"'
    },
    {
      name: '@input',
      description: 'Fired on real-time input',
      payload: '(value: string, event: Event)',
      usage: '@input="handleInput"'
    },
    {
      name: '@focus',
      description: 'Fired when input receives focus',
      payload: '(event: FocusEvent)',
      usage: '@focus="handleFocus"'
    },
    {
      name: '@blur',
      description: 'Fired when input loses focus',
      payload: '(event: FocusEvent)',
      usage: '@blur="handleBlur"'
    },
    {
      name: '@keydown',
      description: 'Fired on key press',
      payload: '(event: KeyboardEvent)',
      usage: '@keydown="handleKeydown"'
    },
    {
      name: '@keyup',
      description: 'Fired on key release',
      payload: '(event: KeyboardEvent)',
      usage: '@keyup="handleKeyup"'
    },
    {
      name: '@enter',
      description: 'Fired when Enter key is pressed',
      payload: '(event: KeyboardEvent)',
      usage: '@enter="handleEnter"'
    },
    {
      name: '@escape',
      description: 'Fired when Escape key is pressed',
      payload: '(event: KeyboardEvent)',
      usage: '@escape="handleEscape"'
    }
  ],
  componentSlots: [
    {
      name: 'leftElement',
      description: 'Element displayed on the left side',
      content: 'VNode',
      example: '<template #leftElement><SearchIcon /></template>'
    },
    {
      name: 'rightElement',
      description: 'Element displayed on the right side',
      content: 'VNode',
      example: '<template #rightElement><CheckIcon /></template>'
    },
    {
      name: 'prepend',
      description: 'Content prepended before input',
      content: 'VNode',
      example: '<template #prepend><span>https://</span></template>'
    },
    {
      name: 'append',
      description: 'Content appended after input',
      content: 'VNode',
      example: '<template #append><span>.com</span></template>'
    },
    {
      name: 'helperText',
      description: 'Custom helper text content',
      content: 'VNode | string',
      example: '<template #helperText>Custom helper</template>'
    },
    {
      name: 'errorMessage',
      description: 'Custom error message content',
      content: 'VNode | string',
      example: '<template #errorMessage>Custom error</template>'
    },
    {
      name: 'clearIcon',
      description: 'Custom clear button icon',
      content: 'VNode',
      example: '<template #clearIcon><XIcon /></template>'
    }
  ],
  usageExamples: [
    {
      title: 'Basic Usage',
      code: `<CInput
  :value="inputValue"
  @change="handleChange"
  placeholder="Enter text"
/>`
    },
    {
      title: 'Different Types',
      code: `<CInput type="email" placeholder="Email" />
<CInput type="password" placeholder="Password" />
<CInput type="number" placeholder="Number" />`
    },
    {
      title: 'Sizes and Variants',
      code: `<CInput size="sm" variant="outline" />
<CInput size="md" variant="filled" />
<CInput size="lg" variant="unstyled" />`
    },
    {
      title: 'With Elements',
      code: `<CInput placeholder="Search">
  <template #leftElement>
    <SearchIcon class="w-4 h-4" />
  </template>
</CInput>

<CInput placeholder="Amount">
  <template #leftElement>$</template>
  <template #rightElement>USD</template>
</CInput>`
    },
    {
      title: 'Validation States',
      code: `<CInput
  :invalid="hasError"
  :error-message="errorMsg"
  helper-text="Helper text here"
/>`
    },
    {
      title: 'Debounced Input',
      code: `<CInput
  :value="searchQuery"
  :debounce-ms="500"
  @change="performSearch"
  placeholder="Search with debounce"
/>`
    },
    {
      title: 'Form Integration',
      code: `<CInput
  v-model:value="formData.email"
  type="email"
  name="email"
  required
  autocomplete="email"
/>`
    },
    {
      title: 'Advanced Validation',
      code: `<CInput
  :value="password"
  type="password"
  :min-length="8"
  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)"
  helper-text="8+ chars, uppercase, lowercase, number"
/>`
    },
    {
      title: 'Headless Usage',
      code: `<script setup>
import { useInputHeadless } from '@celestialui/vue'

const { inputValue, setValue, isValid } = useInputHeadless({
  defaultValue: '',
  validate: (value) => value.length >= 3,
  onChange: (value) => console.log('Changed:', value)
})
</script>

<template>
  <input
    :value="inputValue"
    @input="setValue($event.target.value, $event)"
    :class="{ error: !isValid }"
  />
</template>`
    }
  ]
}
