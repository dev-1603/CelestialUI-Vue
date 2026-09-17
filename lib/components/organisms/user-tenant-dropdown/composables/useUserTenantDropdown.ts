import { computed } from 'vue'
import type { CUserTenantDropdownProps, CUserTenantDropdownEmits, Tenant } from '../CUserTenantDropdown.types'
import type { CDropdownItem } from '../../../molecules/dropdown-menu/CDropdownMenu.types'

export function useUserTenantDropdown(props: CUserTenantDropdownProps, emit: CUserTenantDropdownEmits) {
  
  const currentTenant = computed(() => {
    return props.tenants.find(t => t.id === props.currentTenantId) || props.tenants[0]
  })

  const dropdownItems = computed<CDropdownItem[][]>(() => {
    // Group 1: User Info (rendered via custom slot usually, but defined here for structure)
    const userGroup: CDropdownItem[] = [
      { id: 'user-profile-header', label: props.user.name, disabled: true }
    ]

    // Group 2: Tenants
    const tenantGroup: CDropdownItem[] = props.tenants.map(t => ({
      id: `tenant_${t.id}`,
      label: t.name,
      icon: t.id === props.currentTenantId ? 'check' : undefined
    }))

    // Group 3: Actions
    const actionGroup: CDropdownItem[] = [
      { id: 'settings', label: 'Account Settings', icon: 'settings' },
      { id: 'logout', label: 'Log out', icon: 'log-out', shortcut: '⇧⌘Q' }
    ]

    return [userGroup, tenantGroup, actionGroup]
  })

  const handleSelect = (item: CDropdownItem) => {
    const id = item.id.toString()
    
    if (id.startsWith('tenant_')) {
      const tenantId = id.replace('tenant_', '')
      const tenant = props.tenants.find(t => t.id === tenantId)
      if (tenant) emit('select-tenant', tenant)
    } else if (id === 'settings') {
      emit('settings')
    } else if (id === 'logout') {
      emit('logout')
    }
  }

  return {
    currentTenant,
    dropdownItems,
    handleSelect
  }
}
