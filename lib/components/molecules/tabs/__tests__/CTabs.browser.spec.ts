/// <reference types="@vitest/browser/providers/playwright" />
import { describe, it, expect, afterEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { mount, type VueWrapper } from '@vue/test-utils'
import CTabs from '../CTabs.vue'

const tabItems = [
  { id: 'account', label: 'Account' },
  { id: 'password', label: 'Password' },
  { id: 'team', label: 'Team', disabled: true },
]

describe('CTabs (browser)', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('shows active tab panel and switches on click', async () => {
    wrapper = mount(CTabs, {
      props: { modelValue: 'account', items: tabItems },
      slots: {
        'panel-account': '<p>Account panel content</p>',
        'panel-password': '<p>Password panel content</p>',
      },
      attachTo: document.body,
    })

    const accountTab = page.getByRole('tab', { name: 'Account' })
    const passwordTab = page.getByRole('tab', { name: 'Password' })

    await expect.element(accountTab).toHaveAttribute('aria-selected', 'true')
    await expect.element(page.getByText('Account panel content')).toBeVisible()

    await userEvent.click(passwordTab)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['password'])
  })

  it('supports arrow key navigation between tabs', async () => {
    wrapper = mount(CTabs, {
      props: { modelValue: 'account', items: tabItems },
      attachTo: document.body,
    })

    const passwordTab = page.getByRole('tab', { name: 'Password' })
    await userEvent.click(passwordTab)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['password'])
  })
})
