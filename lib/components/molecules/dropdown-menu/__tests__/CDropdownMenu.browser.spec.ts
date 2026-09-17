/// <reference types="@vitest/browser/providers/playwright" />
import { describe, it, expect, afterEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { mount, type VueWrapper } from '@vue/test-utils'
import CDropdownMenu from '../CDropdownMenu.vue'
import type { CDropdownItem } from '../CDropdownMenu.types'

const menuItems: CDropdownItem[][] = [
  [
    { id: 'profile', label: 'My Profile', icon: 'user' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ],
  [{ id: 'logout', label: 'Log out', icon: 'log-out' }],
]

describe('CDropdownMenu (browser)', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('opens menu on trigger click and selects an item', async () => {
    wrapper = mount(CDropdownMenu, {
      props: { items: menuItems, trigger: 'click' },
      slots: { trigger: '<span data-testid="menu-trigger">Open Menu</span>' },
      attachTo: document.body,
    })

    const trigger = page.getByTestId('menu-trigger')
    await userEvent.click(trigger)

    const settingsItem = page.getByRole('menuitem', { name: 'Settings' })
    await expect.element(settingsItem).toBeVisible()

    await userEvent.click(settingsItem)
    expect(wrapper.emitted('select')?.at(-1)?.[0]).toMatchObject({ id: 'settings' })
  })

  it('exposes aria-expanded on trigger when open', async () => {
    wrapper = mount(CDropdownMenu, {
      props: { items: menuItems, trigger: 'click' },
      slots: { trigger: '<span>Open</span>' },
      attachTo: document.body,
    })

    const trigger = page.getByRole('button', { name: 'Open' })
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(trigger)
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'true')
  })
})
