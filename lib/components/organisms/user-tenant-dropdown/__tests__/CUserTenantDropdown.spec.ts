import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CUserTenantDropdown from '../CUserTenantDropdown.vue'

describe('CUserTenantDropdown', () => {
  let wrapper: any

  const mockUser = {
    id: 'usr1',
    name: 'Jane Doe',
    email: 'jane@example.com'
  }

  const mockTenants = [
    { id: 't1', name: 'Acme Corp' },
    { id: 't2', name: 'Globex Inc' }
  ]

  const createWrapper = (props = {}) => {
    return mount(CUserTenantDropdown, {
      props: {
        user: mockUser,
        tenants: mockTenants,
        currentTenantId: 't1',
        ...props
      }
    })
  }

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('renders trigger with user and tenant name', () => {
    wrapper = createWrapper()
    const trigger = wrapper.find('.cui-user-tenant-trigger')
    expect(trigger.text()).toContain('Jane Doe')
    expect(trigger.text()).toContain('Acme Corp')
  })

  it('emits logout when logout action is selected', () => {
    wrapper = createWrapper()
    // The dropdown menu component emits 'select' which the wrapper maps to handleSelect
    wrapper.vm.handleSelect({ id: 'logout', label: 'Logout' })
    expect(wrapper.emitted('logout')).toBeTruthy()
  })

  it('emits settings when settings action is selected', () => {
    wrapper = createWrapper()
    wrapper.vm.handleSelect({ id: 'settings', label: 'Settings' })
    expect(wrapper.emitted('settings')).toBeTruthy()
  })

  it('emits select-tenant when a tenant is selected', () => {
    wrapper = createWrapper()
    wrapper.vm.handleSelect({ id: 'tenant_t2', label: 'Globex Inc' })
    const emitted = wrapper.emitted('select-tenant')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toEqual(mockTenants[1])
  })
})
