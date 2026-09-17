/// <reference types="@vitest/browser/providers/playwright" />
import { describe, it, expect, afterEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { mount, type VueWrapper } from '@vue/test-utils'
import CUserTenantDropdown from '../CUserTenantDropdown.vue'

const tenantA = { id: 'tenant-a', name: 'Acme Corp' }
const tenantB = { id: 'tenant-b', name: 'Globex Inc' }

const mockUser = {
  id: 'usr1',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
}

describe('CUserTenantDropdown (browser)', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('displays current tenant A and isolates selection to tenant B', async () => {
    wrapper = mount(CUserTenantDropdown, {
      props: {
        user: mockUser,
        tenants: [tenantA, tenantB],
        currentTenantId: tenantA.id,
      },
      attachTo: document.body,
    })

    await expect.element(page.getByText('Acme Corp')).toBeVisible()

    const trigger = page.getByText('Jane Doe')
    await userEvent.click(trigger)

    const tenantBOption = page.getByRole('menuitem', { name: 'Globex Inc' })
    await userEvent.click(tenantBOption)

    const emitted = wrapper.emitted('select-tenant')?.at(-1)?.[0]
    expect(emitted).toMatchObject({ id: 'tenant-b', name: 'Globex Inc' })
    expect(emitted).not.toMatchObject({ id: 'tenant-a' })
  })

  it('shows tenant B when mounted with tenant B context', async () => {
    wrapper = mount(CUserTenantDropdown, {
      props: {
        user: mockUser,
        tenants: [tenantA, tenantB],
        currentTenantId: tenantB.id,
      },
      attachTo: document.body,
    })

    await expect.element(page.getByText('Globex Inc')).toBeVisible()
    await expect.element(page.getByText('Acme Corp')).not.toBeInTheDocument()
  })
})
