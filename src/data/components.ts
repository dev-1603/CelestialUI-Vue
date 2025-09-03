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
    docPath: '/playground/atomic/button',
    storybookPath: '/story/cui-button--default',
    props: ['variant', 'size', 'disabled', 'loading', 'icon'],
    examples: ['Variants', 'Sizes', 'With icons', 'Loading state']
  },
  {
    name: 'Input',
    category: 'ATOMIC',
    description: 'Text input field with validation and states',
    implemented: true,
    docPath: '/playground/atomic/input',
    storybookPath: '/story/cui-input--default',
    props: ['modelValue', 'type', 'placeholder', 'disabled', 'error'],
    examples: ['Basic', 'With validation', 'Disabled', 'Error state']
  },
  {
    name: 'Icon',
    category: 'ATOMIC',
    description: 'SVG icon component with size and color variants',
    implemented: true,
    docPath: '/playground/atomic/icon',
    storybookPath: '/story/cui-icon--default',
    props: ['name', 'size', 'color', 'spin'],
    examples: ['Basic', 'Sizes', 'Colors', 'Spinning']
  },
  {
    name: 'Checkbox',
    category: 'ATOMIC',
    description: 'Binary selection control',
    implemented: false,
    docPath: '/playground/atomic/checkbox'
  },
  {
    name: 'Radio',
    category: 'ATOMIC',
    description: 'Single selection from group',
    implemented: false,
    docPath: '/playground/atomic/radio'
  },
  {
    name: 'Switch',
    category: 'ATOMIC',
    description: 'Toggle control',
    implemented: false,
    docPath: '/playground/atomic/switch'
  },
  {
    name: 'Slider',
    category: 'ATOMIC',
    description: 'Range input control',
    implemented: false,
    docPath: '/playground/atomic/slider'
  },
  {
    name: 'Progress',
    category: 'ATOMIC',
    description: 'Progress indicator',
    implemented: false,
    docPath: '/playground/atomic/progress'
  },
  {
    name: 'Avatar',
    category: 'ATOMIC',
    description: 'User profile image display',
    implemented: false,
    docPath: '/playground/atomic/avatar'
  },
  {
    name: 'Badge',
    category: 'ATOMIC',
    description: 'Status indicator',
    implemented: false,
    docPath: '/playground/atomic/badge'
  },
  {
    name: 'Divider',
    category: 'ATOMIC',
    description: 'Section separator',
    implemented: false,
    docPath: '/playground/atomic/divider'
  },
  {
    name: 'Skeleton',
    category: 'ATOMIC',
    description: 'Loading placeholder',
    implemented: false,
    docPath: '/playground/atomic/skeleton'
  },
  {
    name: 'Spinner',
    category: 'ATOMIC',
    description: 'Loading indicator',
    implemented: false,
    docPath: '/playground/atomic/spinner'
  },
  {
    name: 'Heading',
    category: 'ATOMIC',
    description: 'Typography heading',
    implemented: false,
    docPath: '/playground/atomic/heading'
  },
  {
    name: 'Text',
    category: 'ATOMIC',
    description: 'Typography text component',
    implemented: false,
    docPath: '/playground/atomic/text'
  },
  {
    name: 'Code',
    category: 'ATOMIC',
    description: 'Code display component',
    implemented: false,
    docPath: '/playground/atomic/code'
  },
  {
    name: 'Link',
    category: 'ATOMIC',
    description: 'Navigation link',
    implemented: false,
    docPath: '/playground/atomic/link'
  },
  {
    name: 'IconButton',
    category: 'ATOMIC',
    description: 'Icon-only button',
    implemented: false,
    docPath: '/playground/atomic/icon-button'
  },
  {
    name: 'Kbd',
    category: 'ATOMIC',
    description: 'Keyboard key display',
    implemented: false,
    docPath: '/playground/atomic/kbd'
  },

  // MOLECULAR Components - Simple combinations
  {
    name: 'Card',
    category: 'MOLECULAR',
    description: 'Container component with header, content, and footer sections',
    implemented: true,
    docPath: '/playground/molecular/card',
    storybookPath: '/story/cui-card--default',
    props: ['title', 'subtitle', 'elevation', 'hoverable'],
    examples: ['Basic', 'With header', 'With footer', 'Interactive']
  },
  {
    name: 'Toast',
    category: 'MOLECULAR',
    description: 'Notification component with auto-dismiss and positioning',
    implemented: false,
    docPath: '/playground/molecular/toast'
  },
  {
    name: 'Select',
    category: 'MOLECULAR',
    description: 'Dropdown selection',
    implemented: false,
    docPath: '/playground/molecular/select'
  },
  {
    name: 'MultiSelect',
    category: 'MOLECULAR',
    description: 'Multiple selection dropdown',
    implemented: false,
    docPath: '/playground/molecular/multi-select'
  },
  {
    name: 'Textarea',
    category: 'MOLECULAR',
    description: 'Multi-line text input',
    implemented: false,
    docPath: '/playground/molecular/textarea'
  },
  {
    name: 'FileUpload',
    category: 'MOLECULAR',
    description: 'File selection component',
    implemented: false,
    docPath: '/playground/molecular/file-upload'
  },
  {
    name: 'DatePicker',
    category: 'MOLECULAR',
    description: 'Date selection',
    implemented: false,
    docPath: '/playground/molecular/date-picker'
  },
  {
    name: 'TimePicker',
    category: 'MOLECULAR',
    description: 'Time selection',
    implemented: false,
    docPath: '/playground/molecular/time-picker'
  },
  {
    name: 'ColorPicker',
    category: 'MOLECULAR',
    description: 'Color selection',
    implemented: false,
    docPath: '/playground/molecular/color-picker'
  },
  {
    name: 'NumberInput',
    category: 'MOLECULAR',
    description: 'Numeric input with controls',
    implemented: false,
    docPath: '/playground/molecular/number-input'
  },
  {
    name: 'SearchInput',
    category: 'MOLECULAR',
    description: 'Search input with suggestions',
    implemented: false,
    docPath: '/playground/molecular/search-input'
  },
  {
    name: 'PasswordInput',
    category: 'MOLECULAR',
    description: 'Password input with toggle',
    implemented: false,
    docPath: '/playground/molecular/password-input'
  },
  {
    name: 'PinInput',
    category: 'MOLECULAR',
    description: 'PIN/OTP input',
    implemented: false,
    docPath: '/playground/molecular/pin-input'
  },
  {
    name: 'FormField',
    category: 'MOLECULAR',
    description: 'Form field wrapper',
    implemented: false,
    docPath: '/playground/molecular/form-field'
  },
  {
    name: 'FormLabel',
    category: 'MOLECULAR',
    description: 'Form label component',
    implemented: false,
    docPath: '/playground/molecular/form-label'
  },
  {
    name: 'FormHelperText',
    category: 'MOLECULAR',
    description: 'Form helper text',
    implemented: false,
    docPath: '/playground/molecular/form-helper-text'
  },
  {
    name: 'FormErrorMessage',
    category: 'MOLECULAR',
    description: 'Form error display',
    implemented: false,
    docPath: '/playground/molecular/form-error-message'
  },
  {
    name: 'FieldSet',
    category: 'MOLECULAR',
    description: 'Form fieldset container',
    implemented: false,
    docPath: '/playground/molecular/fieldset'
  },
  {
    name: 'InputGroup',
    category: 'MOLECULAR',
    description: 'Grouped input elements',
    implemented: false,
    docPath: '/playground/molecular/input-group'
  },
  {
    name: 'Tabs',
    category: 'MOLECULAR',
    description: 'Tab navigation',
    implemented: false,
    docPath: '/playground/molecular/tabs'
  },
  {
    name: 'Breadcrumb',
    category: 'MOLECULAR',
    description: 'Navigation breadcrumb',
    implemented: false,
    docPath: '/playground/molecular/breadcrumb'
  },
  {
    name: 'Pagination',
    category: 'MOLECULAR',
    description: 'Page navigation',
    implemented: false,
    docPath: '/playground/molecular/pagination'
  },
  {
    name: 'Steps',
    category: 'MOLECULAR',
    description: 'Step indicator',
    implemented: false,
    docPath: '/playground/molecular/steps'
  },
  {
    name: 'Menu',
    category: 'MOLECULAR',
    description: 'Dropdown menu',
    implemented: false,
    docPath: '/playground/molecular/menu'
  },
  {
    name: 'ContextMenu',
    category: 'MOLECULAR',
    description: 'Right-click menu',
    implemented: false,
    docPath: '/playground/molecular/context-menu'
  },
  {
    name: 'Alert',
    category: 'MOLECULAR',
    description: 'Alert message',
    implemented: false,
    docPath: '/playground/molecular/alert'
  },
  {
    name: 'Notification',
    category: 'MOLECULAR',
    description: 'System notification',
    implemented: false,
    docPath: '/playground/molecular/notification'
  },
  {
    name: 'Popover',
    category: 'MOLECULAR',
    description: 'Contextual popup',
    implemented: false,
    docPath: '/playground/molecular/popover'
  },
  {
    name: 'Tooltip',
    category: 'MOLECULAR',
    description: 'Hover information',
    implemented: false,
    docPath: '/playground/molecular/tooltip'
  },
  {
    name: 'Dialog',
    category: 'MOLECULAR',
    description: 'Modal dialog',
    implemented: false,
    docPath: '/playground/molecular/dialog'
  },
  {
    name: 'Drawer',
    category: 'MOLECULAR',
    description: 'Side panel',
    implemented: false,
    docPath: '/playground/molecular/drawer'
  },
  {
    name: 'Sheet',
    category: 'MOLECULAR',
    description: 'Bottom sheet',
    implemented: false,
    docPath: '/playground/molecular/sheet'
  },

  // ORGANISM Components - Complex UI patterns
  {
    name: 'Modal',
    category: 'ORGANISM',
    description: 'Overlay dialog component with backdrop and focus management',
    implemented: true,
    docPath: '/playground/organism/modal',
    storybookPath: '/story/cui-modal--default',
    props: ['modelValue', 'title', 'persistent', 'maxWidth'],
    examples: ['Basic modal', 'With form', 'Persistent', 'Custom width']
  },
  {
    name: 'Table',
    category: 'ORGANISM',
    description: 'Data table',
    implemented: false,
    docPath: '/playground/organism/table'
  },
  {
    name: 'DataTable',
    category: 'ORGANISM',
    description: 'Enhanced data table',
    implemented: false,
    docPath: '/playground/organism/data-table'
  },
  {
    name: 'VirtualTable',
    category: 'ORGANISM',
    description: 'Virtualized table',
    implemented: false,
    docPath: '/playground/organism/virtual-table'
  },
  {
    name: 'List',
    category: 'ORGANISM',
    description: 'Item list',
    implemented: false,
    docPath: '/playground/organism/list'
  },
  {
    name: 'InfiniteScroll',
    category: 'ORGANISM',
    description: 'Infinite scrolling list',
    implemented: false,
    docPath: '/playground/organism/infinite-scroll'
  },
  {
    name: 'Image',
    category: 'ORGANISM',
    description: 'Enhanced image',
    implemented: false,
    docPath: '/playground/organism/image'
  },
  {
    name: 'Carousel',
    category: 'ORGANISM',
    description: 'Image/content carousel',
    implemented: false,
    docPath: '/playground/organism/carousel'
  },
  {
    name: 'Gallery',
    category: 'ORGANISM',
    description: 'Image gallery',
    implemented: false,
    docPath: '/playground/organism/gallery'
  },
  {
    name: 'VideoPlayer',
    category: 'ORGANISM',
    description: 'Video player',
    implemented: false,
    docPath: '/playground/organism/video-player'
  },
  {
    name: 'Container',
    category: 'ORGANISM',
    description: 'Layout container',
    implemented: false,
    docPath: '/playground/organism/container'
  },
  {
    name: 'Stack',
    category: 'ORGANISM',
    description: 'Vertical/horizontal stack',
    implemented: false,
    docPath: '/playground/organism/stack'
  },
  {
    name: 'Grid',
    category: 'ORGANISM',
    description: 'CSS Grid layout',
    implemented: false,
    docPath: '/playground/organism/grid'
  },
  {
    name: 'Flex',
    category: 'ORGANISM',
    description: 'Flexbox container',
    implemented: false,
    docPath: '/playground/organism/flex'
  },
  {
    name: 'Box',
    category: 'ORGANISM',
    description: 'Generic container',
    implemented: false,
    docPath: '/playground/organism/box'
  },
  {
    name: 'Center',
    category: 'ORGANISM',
    description: 'Centering container',
    implemented: false,
    docPath: '/playground/organism/center'
  },
  {
    name: 'Spacer',
    category: 'ORGANISM',
    description: 'Flexible space',
    implemented: false,
    docPath: '/playground/organism/spacer'
  },
  {
    name: 'Sidebar',
    category: 'ORGANISM',
    description: 'Application sidebar',
    implemented: false,
    docPath: '/playground/organism/sidebar'
  },
  {
    name: 'Header',
    category: 'ORGANISM',
    description: 'Application header',
    implemented: false,
    docPath: '/playground/organism/header'
  },
  {
    name: 'Footer',
    category: 'ORGANISM',
    description: 'Application footer',
    implemented: false,
    docPath: '/playground/organism/footer'
  },
  {
    name: 'AppShell',
    category: 'ORGANISM',
    description: 'Application layout shell',
    implemented: false,
    docPath: '/playground/organism/app-shell'
  },
  {
    name: 'FormWizard',
    category: 'ORGANISM',
    description: 'Multi-step form',
    implemented: false,
    docPath: '/playground/organism/form-wizard'
  },
  {
    name: 'FormBuilder',
    category: 'ORGANISM',
    description: 'Dynamic form builder',
    implemented: false,
    docPath: '/playground/organism/form-builder'
  },
  {
    name: 'Survey',
    category: 'ORGANISM',
    description: 'Survey form system',
    implemented: false,
    docPath: '/playground/organism/survey'
  },
  {
    name: 'AutoComplete',
    category: 'ORGANISM',
    description: 'Auto-completion input',
    implemented: false,
    docPath: '/playground/organism/auto-complete'
  },
  {
    name: 'ComboBox',
    category: 'ORGANISM',
    description: 'Combo box input',
    implemented: false,
    docPath: '/playground/organism/combo-box'
  },
  {
    name: 'Mention',
    category: 'ORGANISM',
    description: 'Mention/tag input',
    implemented: false,
    docPath: '/playground/organism/mention'
  },
  {
    name: 'TagInput',
    category: 'ORGANISM',
    description: 'Tag input system',
    implemented: false,
    docPath: '/playground/organism/tag-input'
  },

  // TEMPLATE Components - Layout patterns
  {
    name: 'DashboardLayout',
    category: 'TEMPLATE',
    description: 'Dashboard page layout',
    implemented: false,
    docPath: '/playground/template/dashboard-layout'
  },
  {
    name: 'AdminLayout',
    category: 'TEMPLATE',
    description: 'Admin page layout',
    implemented: false,
    docPath: '/playground/template/admin-layout'
  },
  {
    name: 'AuthLayout',
    category: 'TEMPLATE',
    description: 'Authentication layout',
    implemented: false,
    docPath: '/playground/template/auth-layout'
  },
  {
    name: 'LandingLayout',
    category: 'TEMPLATE',
    description: 'Landing page layout',
    implemented: false,
    docPath: '/playground/template/landing-layout'
  },
  {
    name: 'ErrorLayout',
    category: 'TEMPLATE',
    description: 'Error page layout',
    implemented: false,
    docPath: '/playground/template/error-layout'
  },
  {
    name: 'AppBar',
    category: 'TEMPLATE',
    description: 'Application bar',
    implemented: false,
    docPath: '/playground/template/app-bar'
  },
  {
    name: 'NavigationRail',
    category: 'TEMPLATE',
    description: 'Vertical navigation',
    implemented: false,
    docPath: '/playground/template/navigation-rail'
  },
  {
    name: 'BottomNavigation',
    category: 'TEMPLATE',
    description: 'Bottom navigation bar',
    implemented: false,
    docPath: '/playground/template/bottom-navigation'
  },
  {
    name: 'SideNavigation',
    category: 'TEMPLATE',
    description: 'Side navigation panel',
    implemented: false,
    docPath: '/playground/template/side-navigation'
  },

  // ADVANCED Components - Complex interactions
  {
    name: 'RichTextEditor',
    category: 'ADVANCED',
    description: 'Rich text editing',
    implemented: false,
    docPath: '/playground/advanced/rich-text-editor'
  },
  {
    name: 'CodeEditor',
    category: 'ADVANCED',
    description: 'Code editor',
    implemented: false,
    docPath: '/playground/advanced/code-editor'
  },
  {
    name: 'MarkdownEditor',
    category: 'ADVANCED',
    description: 'Markdown editor',
    implemented: false,
    docPath: '/playground/advanced/markdown-editor'
  },
  {
    name: 'Calendar',
    category: 'ADVANCED',
    description: 'Calendar component',
    implemented: false,
    docPath: '/playground/advanced/calendar'
  },
  {
    name: 'Timeline',
    category: 'ADVANCED',
    description: 'Timeline display',
    implemented: false,
    docPath: '/playground/advanced/timeline'
  },
  {
    name: 'Kanban',
    category: 'ADVANCED',
    description: 'Kanban board',
    implemented: false,
    docPath: '/playground/advanced/kanban'
  },
  {
    name: 'Chart',
    category: 'ADVANCED',
    description: 'Chart components',
    implemented: false,
    docPath: '/playground/advanced/chart'
  },
  {
    name: 'Graph',
    category: 'ADVANCED',
    description: 'Graph visualization',
    implemented: false,
    docPath: '/playground/advanced/graph'
  },
  {
    name: 'Sparkline',
    category: 'ADVANCED',
    description: 'Mini charts',
    implemented: false,
    docPath: '/playground/advanced/sparkline'
  },
  {
    name: 'Heatmap',
    category: 'ADVANCED',
    description: 'Heatmap visualization',
    implemented: false,
    docPath: '/playground/advanced/heatmap'
  },
  {
    name: 'Command',
    category: 'ADVANCED',
    description: 'Command palette',
    implemented: false,
    docPath: '/playground/advanced/command'
  },
  {
    name: 'Spotlight',
    category: 'ADVANCED',
    description: 'Spotlight search',
    implemented: false,
    docPath: '/playground/advanced/spotlight'
  },
  {
    name: 'TreeView',
    category: 'ADVANCED',
    description: 'Tree navigation',
    implemented: false,
    docPath: '/playground/advanced/tree-view'
  },
  {
    name: 'FileExplorer',
    category: 'ADVANCED',
    description: 'File system explorer',
    implemented: false,
    docPath: '/playground/advanced/file-explorer'
  },
  {
    name: 'VirtualList',
    category: 'ADVANCED',
    description: 'Virtualized list',
    implemented: false,
    docPath: '/playground/advanced/virtual-list'
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
