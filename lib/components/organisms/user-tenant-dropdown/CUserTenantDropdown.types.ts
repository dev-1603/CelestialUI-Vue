export interface Tenant {
  id: string
  name: string
  avatar?: string
  role?: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface CUserTenantDropdownProps {
  user: UserProfile
  tenants: Tenant[]
  currentTenantId?: string
  loading?: boolean
  disabled?: boolean
  trigger?: 'click' | 'hover'
}

export interface CUserTenantDropdownEmits {
  (e: 'select-tenant', tenant: Tenant): void
  (e: 'logout'): void
  (e: 'settings'): void
}
