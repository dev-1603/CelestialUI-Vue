/// <reference types="@vitest/browser/providers/playwright" />
import { describe, it, expect, afterEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { mount, type VueWrapper } from '@vue/test-utils'
import CInput from '../CInput.vue'

describe('CInput (browser)', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('is visible and receives keyboard focus', async () => {
    wrapper = mount(CInput, {
      props: { value: '', ariaLabel: 'Email address', placeholder: 'Enter email' },
      attachTo: document.body,
    })

    const input = page.getByRole('textbox', { name: 'Email address' })
    await expect.element(input).toBeVisible()

    await userEvent.tab()
    await expect.element(input).toHaveFocus()
  })

  it('accepts typed input in a real browser', async () => {
    wrapper = mount(CInput, {
      props: { value: '', ariaLabel: 'Username' },
      attachTo: document.body,
    })

    const input = page.getByRole('textbox', { name: 'Username' })
    await userEvent.click(input)
    await userEvent.keyboard('jane.doe')

    expect(wrapper.emitted('update:value')?.length).toBeGreaterThan(0)
  })
})
