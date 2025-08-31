// Checkbox API data for the generic ApiReference component
export const checkboxApiData = {
  title: 'CCheckbox API Reference',
  componentProps: [
    {
      name: 'checked',
      type: 'boolean',
      required: true,
      description: 'Checkbox checked state'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      required: false,
      description: 'Checkbox size preset',
      default: 'md'
    },
    {
      name: 'colorScheme',
      type: 'string',
      required: false,
      description: 'Color scheme for styling',
      default: 'primary'
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      required: false,
      description: 'Indeterminate state for partial selection',
      default: 'false'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      description: 'Disable checkbox interaction',
      default: 'false'
    },
    {
      name: 'children',
      type: 'string',
      required: false,
      description: 'Label text content'
    },
    {
      name: 'id',
      type: 'string',
      required: false,
      description: 'Unique identifier for the checkbox'
    },
    {
      name: 'name',
      type: 'string',
      required: false,
      description: 'Form field name attribute'
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Form field value attribute'
    },
    {
      name: 'ariaDescribedBy',
      type: 'string',
      required: false,
      description: 'Accessibility description reference'
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
    },
    {
      name: 'checkIcon',
      type: 'string',
      required: false,
      description: 'Custom check icon character',
      default: '✓'
    },
    {
      name: 'indeterminateIcon',
      type: 'string',
      required: false,
      description: 'Custom indeterminate icon character',
      default: '−'
    }
  ],
  componentEvents: [
    {
      name: '@change',
      description: 'Fired when checkbox state changes',
      payload: '(checked: boolean, event: Event)',
      usage: '@change="handleChange"'
    },
    {
      name: '@focus',
      description: 'Fired when checkbox receives focus',
      payload: '(event: FocusEvent)',
      usage: '@focus="handleFocus"'
    },
    {
      name: '@blur',
      description: 'Fired when checkbox loses focus',
      payload: '(event: FocusEvent)',
      usage: '@blur="handleBlur"'
    }
  ],
  componentSlots: [
    {
      name: 'default',
      description: 'Default label content',
      content: 'VNode | string',
      example: '<template #default>Label text</template>'
    },
    {
      name: 'icon',
      description: 'Custom check/indeterminate icon',
      content: 'VNode',
      example: '<template #icon><CustomIcon /></template>'
    },
    {
      name: 'label',
      description: 'Custom label content with rich formatting',
      content: 'VNode',
      example: '<template #label><span class="font-bold">Rich Label</span></template>'
    },
    {
      name: 'description',
      description: 'Additional description text below label',
      content: 'VNode | string',
      example: '<template #description>Helper text</template>'
    }
  ],
  usageExamples: [
    {
      title: 'Basic Usage',
      code: `<CCheckbox
  :checked="isChecked"
  @change="handleChange"
  children="Accept terms"
/>`
    },
    {
      title: 'With Custom Icon',
      code: `<CCheckbox
  :checked="true"
  check-icon="⭐"
  children="Favorite item"
/>`
    },
    {
      title: 'Indeterminate State',
      code: `<CCheckbox
  :indeterminate="true"
  :checked="false"
  children="Select all items"
/>`
    },
    {
      title: 'Form Integration',
      code: `<CCheckbox
  v-model:checked="formData.newsletter"
  name="newsletter"
  value="yes"
  id="newsletter-checkbox"
  children="Subscribe to newsletter"
/>`
    },
    {
      title: 'Custom Label Slot',
      code: `<CCheckbox :checked="false">
  <template #label>
    <span class="font-semibold">Rich Label</span>
    <span class="text-blue-500 ml-2">Pro</span>
  </template>
  <template #description>
    Additional help text below the label
  </template>
</CCheckbox>`
    },
    {
      title: 'Accessibility',
      code: `<CCheckbox
  :checked="false"
  id="accessible-checkbox"
  aria-described-by="help-text"
  children="Accessible checkbox"
/>
<div id="help-text">This provides additional context</div>`
    },
    {
      title: 'Different Sizes',
      code: `<CCheckbox :checked="true" size="sm" children="Small" />
<CCheckbox :checked="true" size="md" children="Medium" />
<CCheckbox :checked="true" size="lg" children="Large" />`
    },
    {
      title: 'Color Schemes',
      code: `<CCheckbox :checked="true" color-scheme="success" children="Success" />
<CCheckbox :checked="true" color-scheme="warning" children="Warning" />
<CCheckbox :checked="true" color-scheme="danger" children="Danger" />`
    },
    {
      title: 'Select All Pattern',
      code: `<!-- Parent checkbox -->
<CCheckbox
  :checked="allSelected"
  :indeterminate="someSelected && !allSelected"
  @change="toggleAll"
  children="Select all"
/>

<!-- Child checkboxes -->
<CCheckbox
  v-for="item in items"
  :key="item.id"
  :checked="item.selected"
  @change="toggleItem(item.id, $event)"
  :children="item.name"
/>`
    },
    {
      title: 'Headless Usage',
      code: `<script setup>
import { useCheckboxHeadless } from '@celestialui/vue'

const { isChecked, toggle } = useCheckboxHeadless({
  defaultChecked: false,
  onChange: (checked) => console.log('Changed:', checked)
})
</script>

<template>
  <button @click="toggle()">
    {{ isChecked ? 'Checked' : 'Unchecked' }}
  </button>
</template>`
    }
  ]
}
