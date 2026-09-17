import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CUserTenantDropdown from '../CUserTenantDropdown.vue'
import { axe } from 'vitest-axe'

describe('CUserTenantDropdown Accessibility', () => {
  const mockUser = {
    id: 'usr1',
    name: 'Jane Doe',
    email: 'jane@example.com'
  }

  const mockTenants = [
    { id: 't1', name: 'Acme Corp' }
  ]

  it('should not have accessibility violations', async () => {
    const wrapper = mount(CUserTenantDropdown, {
      props: {
        user: mockUser,
        tenants: mockTenants,
        currentTenantId: 't1'
      }
    })

    const results = await axe(wrapper.element, {
      rules: { region: { enabled: false } }
    })
    expect(results).toHaveNoViolations()
  })
})
