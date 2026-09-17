// API Reference Data for CAlert Component
import type { ApiReferenceData } from './index'

export const alertApiData: ApiReferenceData = {
  title: 'CAlert Component API',
  componentProps: [
    {
      name: 'variant',
      type: 'AlertVariant',
      required: false,
      description: 'Visual style variant of the alert',
      default: 'info'
    },
    {
      name: 'size',
      type: 'AlertSize',
      required: false,
      description: 'Size of the alert component',
      default: 'md'
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      description: 'Title text displayed in the alert header'
    },
    {
      name: 'description',
      type: 'string',
      required: false,
      description: 'Description text displayed in the alert body'
    },
    {
      name: 'closable',
      type: 'boolean',
      required: false,
      description: 'Whether the alert can be closed by the user',
      default: 'false'
    },
    {
      name: 'icon',
      type: 'string | boolean',
      required: false,
      description: 'Icon to display in the alert. Set to false to hide icon',
      default: 'true'
    },
    {
      name: 'dismissible',
      type: 'boolean',
      required: false,
      description: 'Whether the alert can be dismissed (deprecated, use closable)',
      default: 'false'
    },
    {
      name: 'role',
      type: 'string',
      required: false,
      description: 'ARIA role for accessibility',
      default: 'alert'
    },
    {
      name: 'aria-live',
      type: 'string',
      required: false,
      description: 'ARIA live region politeness level',
      default: 'polite'
    }
  ],
  componentEvents: [
    {
      name: 'close',
      description: 'Emitted when the alert is closed by the user',
      payload: 'void',
      usage: '@close="handleAlertClose"'
    },
    {
      name: 'dismiss',
      description: 'Emitted when the alert is dismissed (deprecated, use close)',
      payload: 'void',
      usage: '@dismiss="handleAlertDismiss"'
    }
  ],
  componentSlots: [
    {
      name: 'default',
      description: 'Main content of the alert',
      content: 'Alert description text or custom content'
    },
    {
      name: 'title',
      description: 'Custom title content',
      content: 'Override the default title display'
    },
    {
      name: 'icon',
      description: 'Custom icon content',
      content: 'Override the default icon with custom content'
    },
    {
      name: 'actions',
      description: 'Action buttons or controls',
      content: 'Buttons or other interactive elements'
    }
  ],
  usageExamples: [
    {
      title: 'Basic Alert',
      code: `<CAlert title="Information" description="This is a basic alert message." />`
    },
    {
      title: 'Closable Alert',
      code: `<CAlert 
  variant="warning" 
  title="Warning" 
  description="This alert can be closed."
  closable 
  @close="handleClose" 
/>`
    },
    {
      title: 'Custom Icon Alert',
      code: `<CAlert variant="success" title="Success">
  <template #icon>
    <CIcon name="check_circle" />
  </template>
  <template #default>
    Operation completed successfully!
  </template>
</CAlert>`
    },
    {
      title: 'Alert with Actions',
      code: `<CAlert variant="error" title="Error occurred">
  <template #default>
    Something went wrong. Please try again.
  </template>
  <template #actions>
    <CButton size="sm" variant="outline">Retry</CButton>
    <CButton size="sm" variant="ghost">Dismiss</CButton>
  </template>
</CAlert>`
    }
  ]
}



