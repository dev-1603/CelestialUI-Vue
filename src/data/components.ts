export interface Component {
  name: string
  category: 'ATOMIC' | 'MOLECULAR' | 'ORGANISM' | 'TEMPLATE' | 'ADVANCED'
  description: string
  implemented: boolean
  docPath: string
  storybookPath?: string
  props?: string[]
  examples?: string[]
}

export const components: Component[] = [
  // ATOMIC Components - Basic building blocks
  {
    name: 'Button',
    category: 'ATOMIC',
    description: 'Primary action button with variants and states',
    implemented: true,
    docPath: '/components/atomic/button',
    storybookPath: '/story/cui-button--default',
    props: ['variant', 'size', 'disabled', 'loading', 'icon'],
    examples: ['Variants', 'Sizes', 'With icons', 'Loading state']
  },
  {
    name: 'Input',
    category: 'ATOMIC',
    description: 'Text input field with validation and states',
    implemented: true,
    docPath: '/components/atomic/input',
    storybookPath: '/story/cui-input--default',
    props: ['modelValue', 'type', 'placeholder', 'disabled', 'error'],
    examples: ['Basic', 'With validation', 'Disabled', 'Error state']
  },
  {
    name: 'Icon',
    category: 'ATOMIC',
    description: 'SVG icon component with size and color variants',
    implemented: true,
    docPath: '/components/atomic/icon',
    storybookPath: '/story/cui-icon--default',
    props: ['name', 'size', 'color', 'spin'],
    examples: ['Basic', 'Sizes', 'Colors', 'Spinning']
  },
  {
    name: 'Checkbox',
    category: 'ATOMIC',
    description: 'Binary selection control',
    implemented: false,
    docPath: '/components/atomic/checkbox'
  },
  {
    name: 'Radio',
    category: 'ATOMIC',
    description: 'Single selection from group',
    implemented: false,
    docPath: '/components/atomic/radio'
  },
  {
    name: 'Switch',
    category: 'ATOMIC',
    description: 'Toggle control',
    implemented: false,
    docPath: '/components/atomic/switch'
  },
  {
    name: 'Slider',
    category: 'ATOMIC',
    description: 'Range input control',
    implemented: false,
    docPath: '/components/atomic/slider'
  },
  {
    name: 'Progress',
    category: 'ATOMIC',
    description: 'Progress indicator',
    implemented: false,
    docPath: '/components/atomic/progress'
  },
  {
    name: 'Avatar',
    category: 'ATOMIC',
    description: 'User profile image display',
    implemented: false,
    docPath: '/components/atomic/avatar'
  },
  {
    name: 'Badge',
    category: 'ATOMIC',
    description: 'Status indicator',
    implemented: false,
    docPath: '/components/atomic/badge'
  },
  {
    name: 'Divider',
    category: 'ATOMIC',
    description: 'Section separator',
    implemented: false,
    docPath: '/components/atomic/divider'
  },
  {
    name: 'Skeleton',
    category: 'ATOMIC',
    description: 'Loading placeholder',
    implemented: false,
    docPath: '/components/atomic/skeleton'
  },
  {
    name: 'Spinner',
    category: 'ATOMIC',
    description: 'Loading indicator',
    implemented: false,
    docPath: '/components/atomic/spinner'
  },
  {
    name: 'Heading',
    category: 'ATOMIC',
    description: 'Typography heading',
    implemented: false,
    docPath: '/components/atomic/heading'
  },
  {
    name: 'Text',
    category: 'ATOMIC',
    description: 'Typography text component',
    implemented: false,
    docPath: '/components/atomic/text'
  },
  {
    name: 'Code',
    category: 'ATOMIC',
    description: 'Code display component',
    implemented: false,
    docPath: '/components/atomic/code'
  },
  {
    name: 'Link',
    category: 'ATOMIC',
    description: 'Navigation link',
    implemented: false,
    docPath: '/components/atomic/link'
  },
  {
    name: 'IconButton',
    category: 'ATOMIC',
    description: 'Icon-only button',
    implemented: false,
    docPath: '/components/atomic/icon-button'
  },
  {
    name: 'Kbd',
    category: 'ATOMIC',
    description: 'Keyboard key display',
    implemented: false,
    docPath: '/components/atomic/kbd'
  },

  // MOLECULAR Components - Simple combinations
  {
    name: 'Card',
    category: 'MOLECULAR',
    description: 'Container component with header, content, and footer sections',
    implemented: true,
    docPath: '/components/molecular/card',
    storybookPath: '/story/cui-card--default',
    props: ['title', 'subtitle', 'elevation', 'hoverable'],
    examples: ['Basic', 'With header', 'With footer', 'Interactive']
  },
  {
    name: 'Toast',
    category: 'MOLECULAR',
    description: 'Notification component with auto-dismiss and positioning',
    implemented: false,
    docPath: '/components/molecular/toast'
  },
  {
    name: 'Select',
    category: 'MOLECULAR',
    description: 'Dropdown selection',
    implemented: false,
    docPath: '/components/molecular/select'
  },
  {
    name: 'MultiSelect',
    category: 'MOLECULAR',
    description: 'Multiple selection dropdown',
    implemented: false,
    docPath: '/components/molecular/multi-select'
  },
  {
    name: 'Textarea',
    category: 'MOLECULAR',
    description: 'Multi-line text input',
    implemented: false,
    docPath: '/components/molecular/textarea'
  },
  {
    name: 'FileUpload',
    category: 'MOLECULAR',
    description: 'File selection component',
    implemented: false,
    docPath: '/components/molecular/file-upload'
  },
  {
    name: 'DatePicker',
    category: 'MOLECULAR',
    description: 'Date selection',
    implemented: false,
    docPath: '/components/molecular/date-picker'
  },
  {
    name: 'TimePicker',
    category: 'MOLECULAR',
    description: 'Time selection',
    implemented: false,
    docPath: '/components/molecular/time-picker'
  },
  {
    name: 'ColorPicker',
    category: 'MOLECULAR',
    description: 'Color selection',
    implemented: false,
    docPath: '/components/molecular/color-picker'
  },
  {
    name: 'NumberInput',
    category: 'MOLECULAR',
    description: 'Numeric input with controls',
    implemented: false,
    docPath: '/components/molecular/number-input'
  },
  {
    name: 'SearchInput',
    category: 'MOLECULAR',
    description: 'Search input with suggestions',
    implemented: false,
    docPath: '/components/molecular/search-input'
  },
  {
    name: 'PasswordInput',
    category: 'MOLECULAR',
    description: 'Password input with toggle',
    implemented: false,
    docPath: '/components/molecular/password-input'
  },
  {
    name: 'PinInput',
    category: 'MOLECULAR',
    description: 'PIN/OTP input',
    implemented: false,
    docPath: '/components/molecular/pin-input'
  },
  {
    name: 'FormField',
    category: 'MOLECULAR',
    description: 'Form field wrapper',
    implemented: false,
    docPath: '/components/molecular/form-field'
  },
  {
    name: 'FormLabel',
    category: 'MOLECULAR',
    description: 'Form label component',
    implemented: false,
    docPath: '/components/molecular/form-label'
  },
  {
    name: 'FormHelperText',
    category: 'MOLECULAR',
    description: 'Form helper text',
    implemented: false,
    docPath: '/components/molecular/form-helper-text'
  },
  {
    name: 'FormErrorMessage',
    category: 'MOLECULAR',
    description: 'Form error display',
    implemented: false,
    docPath: '/components/molecular/form-error-message'
  },
  {
    name: 'FieldSet',
    category: 'MOLECULAR',
    description: 'Form fieldset container',
    implemented: false,
    docPath: '/components/molecular/fieldset'
  },
  {
    name: 'InputGroup',
    category: 'MOLECULAR',
    description: 'Grouped input elements',
    implemented: false,
    docPath: '/components/molecular/input-group'
  },
  {
    name: 'Tabs',
    category: 'MOLECULAR',
    description: 'Tab navigation',
    implemented: false,
    docPath: '/components/molecular/tabs'
  },
  {
    name: 'Breadcrumb',
    category: 'MOLECULAR',
    description: 'Navigation breadcrumb',
    implemented: false,
    docPath: '/components/molecular/breadcrumb'
  },
  {
    name: 'Pagination',
    category: 'MOLECULAR',
    description: 'Page navigation',
    implemented: false,
    docPath: '/components/molecular/pagination'
  },
  {
    name: 'Steps',
    category: 'MOLECULAR',
    description: 'Step indicator',
    implemented: false,
    docPath: '/components/molecular/steps'
  },
  {
    name: 'Menu',
    category: 'MOLECULAR',
    description: 'Dropdown menu',
    implemented: false,
    docPath: '/components/molecular/menu'
  },
  {
    name: 'ContextMenu',
    category: 'MOLECULAR',
    description: 'Right-click menu',
    implemented: false,
    docPath: '/components/molecular/context-menu'
  },
  {
    name: 'Alert',
    category: 'MOLECULAR',
    description: 'Alert message',
    implemented: false,
    docPath: '/components/molecular/alert'
  },
  {
    name: 'Notification',
    category: 'MOLECULAR',
    description: 'System notification',
    implemented: false,
    docPath: '/components/molecular/notification'
  },
  {
    name: 'Popover',
    category: 'MOLECULAR',
    description: 'Contextual popup',
    implemented: false,
    docPath: '/components/molecular/popover'
  },
  {
    name: 'Tooltip',
    category: 'MOLECULAR',
    description: 'Hover information',
    implemented: false,
    docPath: '/components/molecular/tooltip'
  },
  {
    name: 'Dialog',
    category: 'MOLECULAR',
    description: 'Modal dialog',
    implemented: false,
    docPath: '/components/molecular/dialog'
  },
  {
    name: 'Drawer',
    category: 'MOLECULAR',
    description: 'Side panel',
    implemented: false,
    docPath: '/components/molecular/drawer'
  },
  {
    name: 'Sheet',
    category: 'MOLECULAR',
    description: 'Bottom sheet',
    implemented: false,
    docPath: '/components/molecular/sheet'
  },

  // ORGANISM Components - Complex UI patterns
  {
    name: 'Modal',
    category: 'ORGANISM',
    description: 'Overlay dialog component with backdrop and focus management',
    implemented: true,
    docPath: '/components/organism/modal',
    storybookPath: '/story/cui-modal--default',
    props: ['modelValue', 'title', 'persistent', 'maxWidth'],
    examples: ['Basic modal', 'With form', 'Persistent', 'Custom width']
  },
  {
    name: 'Table',
    category: 'ORGANISM',
    description: 'Data table',
    implemented: false,
    docPath: '/components/organism/table'
  },
  {
    name: 'DataTable',
    category: 'ORGANISM',
    description: 'Enhanced data table',
    implemented: false,
    docPath: '/components/organism/data-table'
  },
  {
    name: 'VirtualTable',
    category: 'ORGANISM',
    description: 'Virtualized table',
    implemented: false,
    docPath: '/components/organism/virtual-table'
  },
  {
    name: 'List',
    category: 'ORGANISM',
    description: 'Item list',
    implemented: false,
    docPath: '/components/organism/list'
  },
  {
    name: 'InfiniteScroll',
    category: 'ORGANISM',
    description: 'Infinite scrolling list',
    implemented: false,
    docPath: '/components/organism/infinite-scroll'
  },
  {
    name: 'Image',
    category: 'ORGANISM',
    description: 'Enhanced image',
    implemented: false,
    docPath: '/components/organism/image'
  },
  {
    name: 'Carousel',
    category: 'ORGANISM',
    description: 'Image/content carousel',
    implemented: false,
    docPath: '/components/organism/carousel'
  },
  {
    name: 'Gallery',
    category: 'ORGANISM',
    description: 'Image gallery',
    implemented: false,
    docPath: '/components/organism/gallery'
  },
  {
    name: 'VideoPlayer',
    category: 'ORGANISM',
    description: 'Video player',
    implemented: false,
    docPath: '/components/organism/video-player'
  },
  {
    name: 'Container',
    category: 'ORGANISM',
    description: 'Layout container',
    implemented: false,
    docPath: '/components/organism/container'
  },
  {
    name: 'Stack',
    category: 'ORGANISM',
    description: 'Vertical/horizontal stack',
    implemented: false,
    docPath: '/components/organism/stack'
  },
  {
    name: 'Grid',
    category: 'ORGANISM',
    description: 'CSS Grid layout',
    implemented: false,
    docPath: '/components/organism/grid'
  },
  {
    name: 'Flex',
    category: 'ORGANISM',
    description: 'Flexbox container',
    implemented: false,
    docPath: '/components/organism/flex'
  },
  {
    name: 'Box',
    category: 'ORGANISM',
    description: 'Generic container',
    implemented: false,
    docPath: '/components/organism/box'
  },
  {
    name: 'Center',
    category: 'ORGANISM',
    description: 'Centering container',
    implemented: false,
    docPath: '/components/organism/center'
  },
  {
    name: 'Spacer',
    category: 'ORGANISM',
    description: 'Flexible space',
    implemented: false,
    docPath: '/components/organism/spacer'
  },
  {
    name: 'Sidebar',
    category: 'ORGANISM',
    description: 'Application sidebar',
    implemented: false,
    docPath: '/components/organism/sidebar'
  },
  {
    name: 'Header',
    category: 'ORGANISM',
    description: 'Application header',
    implemented: false,
    docPath: '/components/organism/header'
  },
  {
    name: 'Footer',
    category: 'ORGANISM',
    description: 'Application footer',
    implemented: false,
    docPath: '/components/organism/footer'
  },
  {
    name: 'AppShell',
    category: 'ORGANISM',
    description: 'Application layout shell',
    implemented: false,
    docPath: '/components/organism/app-shell'
  },
  {
    name: 'FormWizard',
    category: 'ORGANISM',
    description: 'Multi-step form',
    implemented: false,
    docPath: '/components/organism/form-wizard'
  },
  {
    name: 'FormBuilder',
    category: 'ORGANISM',
    description: 'Dynamic form builder',
    implemented: false,
    docPath: '/components/organism/form-builder'
  },
  {
    name: 'Survey',
    category: 'ORGANISM',
    description: 'Survey form system',
    implemented: false,
    docPath: '/components/organism/survey'
  },
  {
    name: 'AutoComplete',
    category: 'ORGANISM',
    description: 'Auto-completion input',
    implemented: false,
    docPath: '/components/organism/auto-complete'
  },
  {
    name: 'ComboBox',
    category: 'ORGANISM',
    description: 'Combo box input',
    implemented: false,
    docPath: '/components/organism/combo-box'
  },
  {
    name: 'Mention',
    category: 'ORGANISM',
    description: 'Mention/tag input',
    implemented: false,
    docPath: '/components/organism/mention'
  },
  {
    name: 'TagInput',
    category: 'ORGANISM',
    description: 'Tag input system',
    implemented: false,
    docPath: '/components/organism/tag-input'
  },

  // TEMPLATE Components - Layout patterns
  {
    name: 'DashboardLayout',
    category: 'TEMPLATE',
    description: 'Dashboard page layout',
    implemented: false,
    docPath: '/components/template/dashboard-layout'
  },
  {
    name: 'AdminLayout',
    category: 'TEMPLATE',
    description: 'Admin page layout',
    implemented: false,
    docPath: '/components/template/admin-layout'
  },
  {
    name: 'AuthLayout',
    category: 'TEMPLATE',
    description: 'Authentication layout',
    implemented: false,
    docPath: '/components/template/auth-layout'
  },
  {
    name: 'LandingLayout',
    category: 'TEMPLATE',
    description: 'Landing page layout',
    implemented: false,
    docPath: '/components/template/landing-layout'
  },
  {
    name: 'ErrorLayout',
    category: 'TEMPLATE',
    description: 'Error page layout',
    implemented: false,
    docPath: '/components/template/error-layout'
  },
  {
    name: 'AppBar',
    category: 'TEMPLATE',
    description: 'Application bar',
    implemented: false,
    docPath: '/components/template/app-bar'
  },
  {
    name: 'NavigationRail',
    category: 'TEMPLATE',
    description: 'Vertical navigation',
    implemented: false,
    docPath: '/components/template/navigation-rail'
  },
  {
    name: 'BottomNavigation',
    category: 'TEMPLATE',
    description: 'Bottom navigation bar',
    implemented: false,
    docPath: '/components/template/bottom-navigation'
  },
  {
    name: 'SideNavigation',
    category: 'TEMPLATE',
    description: 'Side navigation panel',
    implemented: false,
    docPath: '/components/template/side-navigation'
  },

  // ADVANCED Components - Complex interactions
  {
    name: 'RichTextEditor',
    category: 'ADVANCED',
    description: 'Rich text editing',
    implemented: false,
    docPath: '/components/advanced/rich-text-editor'
  },
  {
    name: 'CodeEditor',
    category: 'ADVANCED',
    description: 'Code editor',
    implemented: false,
    docPath: '/components/advanced/code-editor'
  },
  {
    name: 'MarkdownEditor',
    category: 'ADVANCED',
    description: 'Markdown editor',
    implemented: false,
    docPath: '/components/advanced/markdown-editor'
  },
  {
    name: 'Calendar',
    category: 'ADVANCED',
    description: 'Calendar component',
    implemented: false,
    docPath: '/components/advanced/calendar'
  },
  {
    name: 'Timeline',
    category: 'ADVANCED',
    description: 'Timeline display',
    implemented: false,
    docPath: '/components/advanced/timeline'
  },
  {
    name: 'Kanban',
    category: 'ADVANCED',
    description: 'Kanban board',
    implemented: false,
    docPath: '/components/advanced/kanban'
  },
  {
    name: 'Chart',
    category: 'ADVANCED',
    description: 'Chart components',
    implemented: false,
    docPath: '/components/advanced/chart'
  },
  {
    name: 'Graph',
    category: 'ADVANCED',
    description: 'Graph visualization',
    implemented: false,
    docPath: '/components/advanced/graph'
  },
  {
    name: 'Sparkline',
    category: 'ADVANCED',
    description: 'Mini charts',
    implemented: false,
    docPath: '/components/advanced/sparkline'
  },
  {
    name: 'Heatmap',
    category: 'ADVANCED',
    description: 'Heatmap visualization',
    implemented: false,
    docPath: '/components/advanced/heatmap'
  },
  {
    name: 'Command',
    category: 'ADVANCED',
    description: 'Command palette',
    implemented: false,
    docPath: '/components/advanced/command'
  },
  {
    name: 'Spotlight',
    category: 'ADVANCED',
    description: 'Spotlight search',
    implemented: false,
    docPath: '/components/advanced/spotlight'
  },
  {
    name: 'TreeView',
    category: 'ADVANCED',
    description: 'Tree navigation',
    implemented: false,
    docPath: '/components/advanced/tree-view'
  },
  {
    name: 'FileExplorer',
    category: 'ADVANCED',
    description: 'File system explorer',
    implemented: false,
    docPath: '/components/advanced/file-explorer'
  },
  {
    name: 'VirtualList',
    category: 'ADVANCED',
    description: 'Virtualized list',
    implemented: false,
    docPath: '/components/advanced/virtual-list'
  }
]

export const getComponentsByCategory = () => {
  const grouped = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = []
    }
    acc[component.category].push(component)
    return acc
  }, {} as Record<string, Component[]>)

  return grouped
}

export const getCategoryStats = () => {
  const stats = Object.entries(getComponentsByCategory()).map(([category, components]) => ({
    category,
    total: components.length,
    implemented: components.filter(c => c.implemented).length
  }))

  return stats
}

export const getComponentByName = (name: string) => {
  return components.find(c => c.name.toLowerCase() === name.toLowerCase())
}

export const getComponentsByPath = (path: string) => {
  return components.filter(c => c.docPath.startsWith(path))
}
