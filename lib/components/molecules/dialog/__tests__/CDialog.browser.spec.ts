/// <reference types="@vitest/browser/providers/playwright" />
import { describe, it, expect, afterEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { mount, type VueWrapper } from '@vue/test-utils'
import CDialog from '../CDialog.vue'

describe('CDialog (browser)', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('exposes dialog ARIA when open', async () => {
    wrapper = mount(CDialog, {
      props: {
        modelValue: true,
        title: 'Confirm action',
        description: 'This cannot be undone',
      },
      slots: { default: '<p>Dialog body</p>' },
      attachTo: document.body,
    })

    const dialog = page.getByRole('dialog', { name: 'Confirm action' })
    await expect.element(dialog).toBeVisible()
    await expect.element(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('closes on Escape', async () => {
    wrapper = mount(CDialog, {
      props: {
        modelValue: true,
        title: 'Escapable dialog',
        closeOnEsc: true,
      },
      attachTo: document.body,
    })

    await expect.element(page.getByRole('dialog')).toBeVisible()
    await userEvent.keyboard('{Escape}')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])
  })
})
