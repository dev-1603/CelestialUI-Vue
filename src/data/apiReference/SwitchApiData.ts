// API Reference Data for CSwitch Component
import type { ApiReferenceData } from './index'

export const switchApiData: ApiReferenceData = {
  title: 'CSwitch Component API',
  componentProps: [
    {
      name: 'modelValue',
      type: 'boolean',
      required: false,
      description: 'Current state of the switch (v-model)',
      default: 'false'
    },
    {
      name: 'size',
      type: 'SwitchSize',
      required: false,
      description: 'Size of the switch component',
      default: 'md'
    },
    {
      name: 'colorScheme',
      type: 'SwitchColorScheme',
      required: false,
      description: 'Color scheme for the switch',
      default: 'blue'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      description: 'Whether the switch is disabled',
      default: 'false'
    },
    {
      name: 'readonly',
      type: 'boolean',
      required: false,
      description: 'Whether the switch is readonly',
      default: 'false'
    },
    {
      name: 'required',
      type: 'boolean',
      required: false,
      description: 'Whether the switch is required',
      default: 'false'
    },
    {
      name: 'name',
      type: 'string',
      required: false,
      description: 'Name attribute for form submission'
    },
    {
      name: 'value',
      type: 'string | number | boolean',
      required: false,
      description: 'Value attribute for form submission',
      default: 'true'
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Label text for the switch'
    },
    {
      name: 'description',
      type: 'string',
      required: false,
      description: 'Description text below the switch'
    },
    {
      name: 'id',
      type: 'string',
      required: false,
      description: 'Unique identifier for the switch'
    }
  ],
  componentEvents: [
    {
      name: 'update:modelValue',
      description: 'Emitted when the switch state changes (v-model)',
      payload: 'boolean',
      usage: 'v-model:modelValue="switchValue"'
    },
    {
      name: 'change',
      description: 'Emitted when the switch state changes',
      payload: 'boolean',
      usage: '@change="handleSwitchChange"'
    },
    {
      name: 'focus',
      description: 'Emitted when the switch receives focus',
      payload: 'FocusEvent',
      usage: '@focus="handleSwitchFocus"'
    },
    {
      name: 'blur',
      description: 'Emitted when the switch loses focus',
      payload: 'FocusEvent',
      usage: '@blur="handleSwitchBlur"'
    }
  ],
  componentSlots: [
    {
      name: 'default',
      description: 'Custom content for the switch label',
      content: 'Custom label content with access to switch state'
    },
    {
      name: 'label',
      description: 'Custom label content',
      content: 'Override default label rendering'
    },
    {
      name: 'description',
      description: 'Custom description content',
      content: 'Override default description rendering'
    }
  ],
  usageExamples: [
    {
      title: 'Basic Switch',
      code: `<CSwitch v-model:modelValue="isEnabled" />`
    },
    {
      title: 'Switch with Label',
      code: `<CSwitch 
  v-model:modelValue="notifications" 
  label="Enable notifications" 
/>`
    },
    {
      title: 'Switch with Description',
      code: `<CSwitch 
  v-model:modelValue="darkMode" 
  label="Dark mode" 
  description="Switch to dark theme"
/>`
    },
    {
      title: 'Disabled Switch',
      code: `<CSwitch 
  v-model:modelValue="disabledValue" 
  label="Disabled switch" 
  disabled 
/>`
    },
    {
      title: 'Custom Styled Switch',
      code: `<CSwitch 
  v-model:modelValue="customValue" 
  size="lg" 
  color-scheme="green"
  label="Custom switch"
/>`
    },
    {
      title: 'Switch in Form',
      code: `<form @submit.prevent="handleSubmit">
  <CSwitch 
    v-model:modelValue="formData.newsletter" 
    name="newsletter"
    label="Subscribe to newsletter"
    required
  />
  <CButton type="submit">Submit</CButton>
</form>`
    }
  ]
}



