# 🧩 CelestialUI-Vue Component Specifications

## 📋 Component Overview

Based on modern component library standards and atomic design principles, here's the comprehensive component specification for CelestialUI-Vue.

## 🔬 Atomic Components (Building Blocks)

### 1. Button (CButton)
**Purpose**: Trigger actions and navigate through the application

#### Props
```typescript
interface CButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  leftIcon?: string
  rightIcon?: string
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  type?: 'button' | 'submit' | 'reset'
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full'
}
```

#### Features
- ✅ Multiple visual variants
- ✅ Size variations
- ✅ Loading state with spinner
- ✅ Icon support (left/right)
- ✅ Disabled state
- ✅ Full-width option
- ✅ Link behavior
- ✅ Keyboard navigation
- ✅ ARIA attributes

### 2. Input (CInput)
**Purpose**: Text input field with validation support

#### Props
```typescript
interface CInputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'url' | 'tel' | 'search'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled'
  leftIcon?: string
  rightIcon?: string
  leftAddon?: string
  rightAddon?: string
  maxLength?: number
  minLength?: number
  pattern?: string
  autocomplete?: string
  clearable?: boolean
}
```

#### Features
- ✅ Multiple input types
- ✅ Validation states
- ✅ Icon support
- ✅ Addon support
- ✅ Clear functionality
- ✅ Character counter
- ✅ ARIA support

### 3. Icon (CIcon)
**Purpose**: Display SVG icons with consistent styling

#### Props
```typescript
interface CIconProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  color?: string
  spin?: boolean
  pulse?: boolean
  flip?: 'horizontal' | 'vertical' | 'both'
  rotate?: 90 | 180 | 270
}
```

#### Features
- ✅ SVG icon library
- ✅ Size variations
- ✅ Color customization
- ✅ Animation support
- ✅ Transformations
- ✅ Tree-shakeable icons

### 4. Badge (CBadge)
**Purpose**: Display status, count, or label information

#### Props
```typescript
interface CBadgeProps {
  variant?: 'solid' | 'subtle' | 'outline'
  colorScheme?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  dot?: boolean
  max?: number
  count?: number
}
```

### 5. Avatar (CAvatar)
**Purpose**: Display user profile images or initials

#### Props
```typescript
interface CAvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  shape?: 'circle' | 'square'
  showBorder?: boolean
  borderColor?: string
  loading?: 'eager' | 'lazy'
  crossorigin?: 'anonymous' | 'use-credentials'
}
```

### 6. Spinner (CSpinner)
**Purpose**: Loading indicator

#### Props
```typescript
interface CSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  thickness?: string
  speed?: string
  label?: string
}
```

### 7. Progress (CProgress)
**Purpose**: Show completion progress

#### Props
```typescript
interface CProgressProps {
  value?: number
  max?: number
  min?: number
  size?: 'xs' | 'sm' | 'md' | 'lg'
  colorScheme?: string
  hasStripe?: boolean
  isAnimated?: boolean
  isIndeterminate?: boolean
  label?: string
}
```

### 8. Checkbox (CCheckbox)
**Purpose**: Boolean selection with indeterminate state

#### Props
```typescript
interface CCheckboxProps {
  modelValue?: boolean | 'indeterminate'
  value?: any
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  colorScheme?: string
}
```

### 9. Radio (CRadio)
**Purpose**: Single selection from a group

#### Props
```typescript
interface CRadioProps {
  modelValue?: any
  value: any
  name?: string
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  colorScheme?: string
}
```

### 10. Switch (CSwitch)
**Purpose**: Toggle between two states

#### Props
```typescript
interface CSwitchProps {
  modelValue?: boolean
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  colorScheme?: string
  trackColor?: string
  thumbColor?: string
}
```

## 🧬 Molecular Components (Combinations)

### 1. Card (CCard)
**Purpose**: Container for related content

#### Props
```typescript
interface CCardProps {
  variant?: 'elevated' | 'outline' | 'filled' | 'unstyled'
  size?: 'sm' | 'md' | 'lg'
  direction?: 'row' | 'column'
  overflow?: 'hidden' | 'visible'
}
```

#### Slots
- `header` - Card header content
- `body` - Main card content
- `footer` - Card footer content
- `media` - Media content (image/video)

### 2. Modal (CModal)
**Purpose**: Overlay dialog for important information

#### Props
```typescript
interface CModalProps {
  isOpen: boolean
  onClose?: () => void
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  isCentered?: boolean
  scrollBehavior?: 'inside' | 'outside'
  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
  trapFocus?: boolean
  returnFocusOnClose?: boolean
  blockScrollOnMount?: boolean
}
```

### 3. Dropdown (CDropdown)
**Purpose**: Contextual menu overlay

#### Props
```typescript
interface CDropdownProps {
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
  trigger?: 'click' | 'hover' | 'focus'
  offset?: [number, number]
  closeOnBlur?: boolean
  closeOnSelect?: boolean
  boundary?: Element | string
}
```

### 4. Tabs (CTabs)
**Purpose**: Navigate between related content sections

#### Props
```typescript
interface CTabsProps {
  modelValue?: string | number
  orientation?: 'horizontal' | 'vertical'
  variant?: 'line' | 'enclosed' | 'enclosed-colored' | 'soft-rounded' | 'solid-rounded'
  size?: 'sm' | 'md' | 'lg'
  align?: 'start' | 'center' | 'end'
  isFitted?: boolean
  isLazy?: boolean
}
```

### 5. Toast (CToast)
**Purpose**: Temporary notification messages

#### Props
```typescript
interface CToastProps {
  id?: string
  title?: string
  description?: string
  status?: 'success' | 'error' | 'warning' | 'info'
  duration?: number | null
  isClosable?: boolean
  position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'
  variant?: 'solid' | 'subtle' | 'left-accent' | 'top-accent'
}
```

### 6. Alert (CAlert)
**Purpose**: Important messages and status information

#### Props
```typescript
interface CAlertProps {
  status?: 'error' | 'success' | 'warning' | 'info'
  variant?: 'subtle' | 'left-accent' | 'top-accent' | 'solid'
  closable?: boolean
  icon?: boolean
}
```

### 7. Breadcrumb (CBreadcrumb)
**Purpose**: Navigation hierarchy indicator

#### Props
```typescript
interface CBreadcrumbProps {
  separator?: string
  spacing?: string | number
}
```

### 8. Pagination (CPagination)
**Purpose**: Navigate through pages of content

#### Props
```typescript
interface CPaginationProps {
  currentPage: number
  totalPages: number
  siblingCount?: number
  boundaryCount?: number
  disabled?: boolean
  hideNextButton?: boolean
  hidePrevButton?: boolean
  showFirstButton?: boolean
  showLastButton?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'ghost' | 'solid'
}
```

### 9. Select (CSelect)
**Purpose**: Choose from a list of options

#### Props
```typescript
interface CSelectProps {
  modelValue?: any
  options: Array<{ label: string; value: any; disabled?: boolean }>
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  multiple?: boolean
  searchable?: boolean
  clearable?: boolean
  creatable?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled'
}
```

### 10. Form Field (CFormField)
**Purpose**: Complete form input with label, help text, and error

#### Props
```typescript
interface CFormFieldProps {
  label?: string
  helpText?: string
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  orientation?: 'horizontal' | 'vertical'
}
```

## 🦠 Organism Components (Complex Patterns)

### 1. Table (CTable)
**Purpose**: Display tabular data

#### Props
```typescript
interface CTableProps {
  data: Array<Record<string, any>>
  columns: Array<{
    key: string
    label: string
    sortable?: boolean
    width?: string | number
    render?: (value: any, row: any) => any
  }>
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  loading?: boolean
  selectable?: boolean
  selectedRows?: Array<any>
  stickyHeader?: boolean
  striped?: boolean
  bordered?: boolean
  hoverable?: boolean
  dense?: boolean
  caption?: string
}
```

### 2. Data Table (CDataTable)
**Purpose**: Advanced table with filtering, sorting, pagination

#### Props
```typescript
interface CDataTableProps extends CTableProps {
  filterable?: boolean
  searchable?: boolean
  pagination?: {
    enabled: boolean
    pageSize: number
    pageSizeOptions: number[]
  }
  toolbar?: boolean
  exportable?: boolean
  resizableColumns?: boolean
  reorderableColumns?: boolean
}
```

### 3. Navigation (CNavigation)
**Purpose**: Primary site navigation

#### Props
```typescript
interface CNavigationProps {
  items: Array<{
    label: string
    href?: string
    icon?: string
    children?: Array<any>
    badge?: string | number
  }>
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'pills' | 'tabs'
  collapsible?: boolean
  activeKey?: string
}
```

### 4. Sidebar (CSidebar)
**Purpose**: Side navigation panel

#### Props
```typescript
interface CSidebarProps {
  isOpen?: boolean
  placement?: 'left' | 'right'
  variant?: 'drawer' | 'sidebar'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  overlay?: boolean
  closeOnOverlayClick?: boolean
  preserveScrollBarGap?: boolean
}
```

### 5. Header (CHeader)
**Purpose**: Application header with navigation

#### Props
```typescript
interface CHeaderProps {
  sticky?: boolean
  height?: string | number
  borderBottom?: boolean
  shadow?: boolean
  variant?: 'default' | 'ghost' | 'solid'
}
```

### 6. Footer (CFooter)
**Purpose**: Application footer

#### Props
```typescript
interface CFooterProps {
  sticky?: boolean
  height?: string | number
  borderTop?: boolean
  variant?: 'default' | 'solid'
}
```

### 7. Carousel (CCarousel)
**Purpose**: Image/content slider

#### Props
```typescript
interface CCarouselProps {
  items: Array<any>
  autoplay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  infinite?: boolean
  slidesToShow?: number
  slidesToScroll?: number
  responsive?: Array<{
    breakpoint: number
    settings: Partial<CCarouselProps>
  }>
}
```

### 8. Calendar (CCalendar)
**Purpose**: Date selection and display

#### Props
```typescript
interface CCalendarProps {
  modelValue?: Date | Date[]
  mode?: 'single' | 'multiple' | 'range'
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[] | ((date: Date) => boolean)
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  showWeekNumbers?: boolean
  showOtherMonths?: boolean
  locale?: string
  format?: string
}
```

## 📄 Template Components (Layout Patterns)

### 1. Dashboard Layout (CDashboardLayout)
**Purpose**: Standard dashboard page structure

#### Props
```typescript
interface CDashboardLayoutProps {
  sidebarCollapsed?: boolean
  headerHeight?: string | number
  sidebarWidth?: string | number
  footerHeight?: string | number
}
```

### 2. Auth Layout (CAuthLayout)
**Purpose**: Authentication pages layout

#### Props
```typescript
interface CAuthLayoutProps {
  centered?: boolean
  maxWidth?: string | number
  showLogo?: boolean
  backgroundImage?: string
}
```

### 3. Landing Layout (CLandingLayout)
**Purpose**: Marketing/landing pages

#### Props
```typescript
interface CLandingLayoutProps {
  transparentHeader?: boolean
  stickyHeader?: boolean
  showFooter?: boolean
}
```

## 🚀 Advanced Components

### 1. Rich Text Editor (CRichTextEditor)
**Purpose**: WYSIWYG content editing

#### Props
```typescript
interface CRichTextEditorProps {
  modelValue?: string
  toolbar?: string[] | boolean
  placeholder?: string
  readonly?: boolean
  autofocus?: boolean
  spellcheck?: boolean
  maxLength?: number
  uploadHandler?: (file: File) => Promise<string>
}
```

### 2. File Upload (CFileUpload)
**Purpose**: File upload with drag & drop

#### Props
```typescript
interface CFileUploadProps {
  modelValue?: File[]
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxSize?: number
  disabled?: boolean
  dragAndDrop?: boolean
  showPreview?: boolean
  uploadHandler?: (files: File[]) => Promise<any>
}
```

### 3. Color Picker (CColorPicker)
**Purpose**: Color selection tool

#### Props
```typescript
interface CColorPickerProps {
  modelValue?: string
  format?: 'hex' | 'rgb' | 'hsl' | 'hsv'
  alpha?: boolean
  swatches?: string[]
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}
```

### 4. Date Picker (CDatePicker)
**Purpose**: Date and time selection

#### Props
```typescript
interface CDatePickerProps {
  modelValue?: Date | string
  format?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  showTime?: boolean
  timeFormat?: string
  minDate?: Date | string
  maxDate?: Date | string
  disabledDates?: Date[] | ((date: Date) => boolean)
}
```

## 🎨 Theme System Specifications

### Design Tokens
```typescript
interface DesignTokens {
  colors: {
    primary: ColorScale
    secondary: ColorScale
    success: ColorScale
    warning: ColorScale
    danger: ColorScale
    gray: ColorScale
  }
  fonts: {
    heading: string
    body: string
    mono: string
  }
  fontSizes: Record<string, string>
  fontWeights: Record<string, number>
  lineHeights: Record<string, number>
  space: Record<string, string>
  sizes: Record<string, string>
  radii: Record<string, string>
  shadows: Record<string, string>
  zIndices: Record<string, number>
  breakpoints: Record<string, string>
}
```

### Theme Configuration
```typescript
interface ThemeConfig {
  initialColorMode: 'light' | 'dark' | 'system'
  useSystemColorMode: boolean
  cssVarPrefix: string
  tokens: DesignTokens
  semanticTokens: SemanticTokens
  globalStyles: GlobalStyles
  componentStyles: ComponentStyles
}
```

## 🧪 Component Testing Requirements

### Test Coverage Requirements
- **Unit Tests**: 90%+ line coverage
- **Integration Tests**: 80%+ feature coverage  
- **E2E Tests**: 100% critical path coverage
- **Accessibility Tests**: WCAG 2.1 AA compliance

### Testing Patterns
```typescript
// Component test template
describe('ComponentName', () => {
  it('renders correctly with default props', () => {})
  it('handles prop changes correctly', () => {})
  it('emits events properly', () => {})
  it('supports keyboard navigation', () => {})
  it('meets accessibility standards', () => {})
  it('works with different themes', () => {})
})
```

## 📚 Documentation Requirements

### Storybook Stories
Each component must include:
- **Default**: Basic usage example
- **Variants**: All visual variants
- **Sizes**: All size options
- **States**: All interactive states
- **Playground**: Interactive prop testing
- **Accessibility**: A11y examples
- **API**: Complete prop documentation

### Component Documentation
- Purpose and use cases
- API reference with TypeScript types
- Examples and code snippets
- Accessibility guidelines
- Best practices
- Migration notes (if applicable)

This specification provides a comprehensive foundation for building a world-class Vue.js component library with excellent developer experience and accessibility compliance.






