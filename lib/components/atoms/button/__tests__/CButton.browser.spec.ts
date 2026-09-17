/// <reference types="@vitest/browser/providers/playwright" />
import { describe, it, expect, afterEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { mount, type VueWrapper } from '@vue/test-utils'
import CButton from '../CButton.vue'

describe('CButton (browser)', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('is visible and receives keyboard focus', async () => {
    wrapper = mount(CButton, {
      props: { variant: 'primary' },
      slots: { default: 'Click me' },
      attachTo: document.body,
    })

    const button = page.getByRole('button', { name: 'Click me' })
    await expect.element(button).toBeVisible()

    await userEvent.tab()
    await expect.element(button).toHaveFocus()
  })

  it('activates on click in a real browser', async () => {
    wrapper = mount(CButton, {
      props: { variant: 'primary' },
      slots: { default: 'Submit' },
      attachTo: document.body,
    })

    await userEvent.click(page.getByRole('button', { name: 'Submit' }))
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
