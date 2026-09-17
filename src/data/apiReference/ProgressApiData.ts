// API Reference Data for CProgress Component
import type { ApiReferenceData } from './index'

export const progressApiData: ApiReferenceData = {
  title: 'CProgress Component API',
  componentProps: [
    {
      name: 'value',
      type: 'number',
      required: false,
      description: 'Current progress value (0-100)',
      default: '0'
    },
    {
      name: 'max',
      type: 'number',
      required: false,
      description: 'Maximum progress value',
      default: '100'
    },
    {
      name: 'variant',
      type: 'ProgressVariant',
      required: false,
      description: 'Visual style variant of the progress bar',
      default: 'default'
    },
    {
      name: 'size',
      type: 'ProgressSize',
      required: false,
      description: 'Size of the progress component',
      default: 'md'
    },
    {
      name: 'colorScheme',
      type: 'ProgressColorScheme',
      required: false,
      description: 'Color scheme for the progress bar',
      default: 'blue'
    },
    {
      name: 'animated',
      type: 'boolean',
      required: false,
      description: 'Whether the progress bar has animation',
      default: 'true'
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      required: false,
      description: 'Whether the progress bar is in indeterminate state',
      default: 'false'
    },
    {
      name: 'showValue',
      type: 'boolean',
      required: false,
      description: 'Whether to show the progress value as text',
      default: 'false'
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Label text for the progress bar'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      required: false,
      description: 'ARIA label for accessibility'
    }
  ],
  componentEvents: [
    {
      name: 'complete',
      description: 'Emitted when progress reaches 100%',
      payload: 'void',
      usage: '@complete="handleProgressComplete"'
    },
    {
      name: 'change',
      description: 'Emitted when progress value changes',
      payload: '{ value: number, percentage: number }',
      usage: '@change="handleProgressChange"'
    }
  ],
  componentSlots: [
    {
      name: 'default',
      description: 'Custom content inside the progress bar',
      content: 'Custom text, icons, or other content'
    },
    {
      name: 'label',
      description: 'Custom label content',
      content: 'Custom label rendering with access to progress data'
    },
    {
      name: 'value',
      description: 'Custom value display',
      content: 'Custom value formatting or display'
    }
  ],
  usageExamples: [
    {
      title: 'Basic Progress Bar',
      code: `<CProgress :value="75" />`
    },
    {
      title: 'Progress with Label',
      code: `<CProgress 
  :value="60" 
  label="Upload Progress" 
  show-value 
/>`
    },
    {
      title: 'Indeterminate Progress',
      code: `<CProgress 
  indeterminate 
  label="Loading..." 
  color-scheme="purple"
/>`
    },
    {
      title: 'Custom Styled Progress',
      code: `<CProgress 
  :value="85" 
  variant="rounded" 
  size="lg" 
  color-scheme="green"
  animated
/>`
    },
    {
      title: 'Progress with Custom Content',
      code: `<CProgress :value="90" size="lg">
  <template #default>
    <span class="text-white font-semibold">90% Complete</span>
  </template>
</CProgress>`
    },
    {
      title: 'Circular Progress',
      code: `<CProgress 
  :value="65" 
  variant="circular" 
  size="xl"
  color-scheme="orange"
  show-value
/>`
    }
  ]
}



