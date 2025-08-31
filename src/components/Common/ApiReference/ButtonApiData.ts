// Button API data for the generic ApiReference component
export const buttonApiData = {
  title: 'CButton API Reference',
  componentProps: [
    {
      name: 'children',
      type: 'string',
      required: false,
      description: 'Button text content'
    },
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'link'",
      required: false,
      description: 'Visual style variant',
      default: 'primary'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      required: false,
      description: 'Button size preset',
      default: 'md'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      description: 'Disable button interaction',
      default: 'false'
    },
    {
      name: 'loading',
      type: 'boolean',
      required: false,
      description: 'Show loading spinner',
      default: 'false'
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      required: false,
      description: 'Take full container width',
      default: 'false'
    },
    {
      name: 'leftIcon',
      type: 'string',
      required: false,
      description: 'Icon displayed on the left'
    },
    {
      name: 'rightIcon',
      type: 'string',
      required: false,
      description: 'Icon displayed on the right'
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      required: false,
      description: 'HTML button type',
      default: 'button'
    },
    {
      name: 'as',
      type: "'button' | 'a' | 'div'",
      required: false,
      description: 'HTML element to render as'
    },
    {
      name: 'href',
      type: 'string',
      required: false,
      description: 'Link URL (renders as anchor)'
    },
    {
      name: 'target',
      type: "'_blank' | '_self' | '_parent' | '_top'",
      required: false,
      description: 'Link target attribute'
    },
    {
      name: 'download',
      type: 'string | boolean',
      required: false,
      description: 'Download attribute for links'
    },
    {
      name: 'rounded',
      type: "boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
      required: false,
      description: 'Border radius style',
      default: 'false'
    }
  ],
  componentEvents: [
    {
      name: '@click',
      description: 'Triggered when button is clicked',
      payload: 'MouseEvent',
      usage: '@click="handleClick"'
    },
    {
      name: '@focus',
      description: 'Triggered when button receives focus',
      payload: 'FocusEvent',
      usage: '@focus="onFocus"'
    },
    {
      name: '@blur',
      description: 'Triggered when button loses focus',
      payload: 'FocusEvent',
      usage: '@blur="onBlur"'
    },
    {
      name: '@mouseenter',
      description: 'Triggered when mouse enters button area',
      payload: 'MouseEvent',
      usage: '@mouseenter="onHover"'
    },
    {
      name: '@mouseleave',
      description: 'Triggered when mouse leaves button area',
      payload: 'MouseEvent',
      usage: '@mouseleave="onLeave"'
    }
  ],
  componentSlots: [
    {
      name: 'default',
      description: 'Main button content (text or elements)',
      content: 'Button text or custom elements',
      example: '<CButton>\n  Click Me\n</CButton>'
    },
    {
      name: 'leftIcon',
      description: 'Custom icon on the left side',
      content: 'SVG, icon component, or text',
      example: '<template #leftIcon>\n  <PlusIcon />\n</template>'
    },
    {
      name: 'rightIcon',
      description: 'Custom icon on the right side',
      content: 'SVG, icon component, or text',
      example: '<template #rightIcon>\n  <ArrowIcon />\n</template>'
    },
    {
      name: 'loadingSpinner',
      description: 'Custom loading spinner content',
      content: 'Custom spinner component',
      example: '<template #loadingSpinner>\n  <CustomSpinner />\n</template>'
    }
  ],
  usageExamples: [
    {
      title: 'Basic Button',
      code: '<CButton variant="primary">Click Me</CButton>'
    },
    {
      title: 'With Icon',
      code: '<CButton leftIcon="+" variant="primary">Add</CButton>'
    },
    {
      title: 'Loading State',
      code: '<CButton :loading="true">Saving...</CButton>'
    },
    {
      title: 'Link Button',
      code: '<CButton href="/about">Learn More</CButton>'
    }
  ]
}
