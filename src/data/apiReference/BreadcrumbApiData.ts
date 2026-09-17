// API Reference Data for CBreadcrumb Component
import type { ApiReferenceData } from './index'

export const breadcrumbApiData: ApiReferenceData = {
  title: 'CBreadcrumb Component API',
  componentProps: [
    {
      name: 'items',
      type: 'BreadcrumbItem[]',
      required: true,
      description: 'Array of breadcrumb items to display'
    },
    {
      name: 'separator',
      type: 'string',
      required: false,
      description: 'Separator between breadcrumb items',
      default: '/'
    },
    {
      name: 'maxItems',
      type: 'number',
      required: false,
      description: 'Maximum number of items to display before truncation'
    },
    {
      name: 'showHome',
      type: 'boolean',
      required: false,
      description: 'Whether to show a home item at the beginning',
      default: 'false'
    },
    {
      name: 'homeHref',
      type: 'string',
      required: false,
      description: 'URL for the home item when showHome is true',
      default: '/'
    },
    {
      name: 'homeLabel',
      type: 'string',
      required: false,
      description: 'Label for the home item',
      default: 'Home'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      required: false,
      description: 'ARIA label for the breadcrumb navigation',
      default: 'Breadcrumb navigation'
    },
    {
      name: 'truncateText',
      type: 'string',
      required: false,
      description: 'Text to show when items are truncated',
      default: '...'
    }
  ],
  componentEvents: [
    {
      name: 'navigate',
      description: 'Emitted when a breadcrumb item is clicked',
      payload: '{ item: BreadcrumbItem, index: number }',
      usage: '@navigate="handleBreadcrumbNavigate"'
    },
    {
      name: 'home-click',
      description: 'Emitted when the home item is clicked',
      payload: 'void',
      usage: '@home-click="handleHomeClick"'
    }
  ],
  componentSlots: [
    {
      name: 'default',
      description: 'Custom content for breadcrumb items',
      content: 'Override default item rendering with custom content'
    },
    {
      name: 'item',
      description: 'Custom rendering for individual breadcrumb items',
      content: 'Custom item content with access to item data'
    },
    {
      name: 'separator',
      description: 'Custom separator between items',
      content: 'Custom separator icon or text'
    },
    {
      name: 'home',
      description: 'Custom home item content',
      content: 'Custom home item rendering'
    }
  ],
  usageExamples: [
    {
      title: 'Basic Breadcrumb',
      code: `<CBreadcrumb :items="breadcrumbItems" />`
    },
    {
      title: 'Breadcrumb with Home',
      code: `<CBreadcrumb 
  :items="breadcrumbItems" 
  show-home 
  home-href="/dashboard"
  home-label="Dashboard"
/>`
    },
    {
      title: 'Breadcrumb with Custom Separator',
      code: `<CBreadcrumb 
  :items="breadcrumbItems" 
  separator="›"
/>`
    },
    {
      title: 'Breadcrumb with Truncation',
      code: `<CBreadcrumb 
  :items="breadcrumbItems" 
  :max-items="3"
  @navigate="handleNavigation"
/>`
    },
    {
      title: 'Custom Item Rendering',
      code: `<CBreadcrumb :items="breadcrumbItems">
  <template #item="{ item, index }">
    <span v-if="item.disabled" class="text-gray-400">
      {{ item.label }}
    </span>
    <router-link v-else :to="item.href" class="text-blue-600 hover:underline">
      {{ item.label }}
    </router-link>
  </template>
</CBreadcrumb>`
    }
  ]
}



