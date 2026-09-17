// API Reference Data
// Centralized export for all component API data

export { buttonApiData } from './ButtonApiData'
export { iconApiData } from './IconApiData'
export { checkboxApiData } from './CheckboxApiData'
export { inputApiData } from './InputApiData'
export { alertApiData } from './AlertApiData'
export { avatarApiData } from './AvatarApiData'
export { breadcrumbApiData } from './BreadcrumbApiData'
export { cardApiData } from './CardApiData'
export { progressApiData } from './ProgressApiData'
export { switchApiData } from './SwitchApiData'

// Types for API Reference component
export interface PropDefinition {
  name: string
  type: string
  required?: boolean
  description: string
  default?: string
}

export interface EventDefinition {
  name: string
  description: string
  payload: string
  usage: string
}

export interface SlotDefinition {
  name: string
  description: string
  content: string
  example?: string
}

export interface UsageExample {
  title: string
  code: string
}

export interface ApiReferenceData {
  title: string
  componentProps: PropDefinition[]
  componentEvents: EventDefinition[]
  componentSlots: SlotDefinition[]
  usageExamples?: UsageExample[]
}
