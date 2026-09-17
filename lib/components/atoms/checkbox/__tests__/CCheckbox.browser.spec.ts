/// <reference types="@vitest/browser/providers/playwright" />
import { describe, it, expect, afterEach } from 'vitest'
import { page } from 'vitest/browser'
import { mount, type VueWrapper } from '@vue/test-utils'
import CCheckbox from '../CCheckbox.vue'

describe('CCheckbox (browser)', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('is visible and can receive focus', async () => {
    wrapper = mount(CCheckbox, {
      props: { checked: false, children: 'Accept terms' },
      attachTo: document.body,
    })

    const checkbox = page.getByRole('checkbox', { name: 'Accept terms' })
    await expect.element(checkbox).toBeVisible()
    await expect.element(checkbox).not.toBeChecked()

    await checkbox.element().focus()
    await expect.element(checkbox).toHaveFocus()
  })

  it('reflects checked state via aria-checked', async () => {
    wrapper = mount(CCheckbox, {
      props: { checked: true, children: 'Subscribe to newsletter' },
      attachTo: document.body,
    })

    const checkbox = page.getByRole('checkbox', { name: 'Subscribe to newsletter' })
    await expect.element(checkbox).toBeChecked()
  })
})
