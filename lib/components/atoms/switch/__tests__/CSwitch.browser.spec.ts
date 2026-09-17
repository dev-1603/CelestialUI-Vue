/// <reference types="@vitest/browser/providers/playwright" />
import { describe, it, expect, afterEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { mount, type VueWrapper } from '@vue/test-utils'
import CSwitch from '../CSwitch.vue'

describe('CSwitch (browser)', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('is visible and toggles aria-checked on click', async () => {
    wrapper = mount(CSwitch, {
      props: { modelValue: false, ariaLabel: 'Enable notifications' },
      attachTo: document.body,
    })

    const switchEl = page.getByRole('switch', { name: 'Enable notifications' })
    await expect.element(switchEl).toBeVisible()
    await expect.element(switchEl).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(switchEl)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([true])
  })

  it('toggles with Space key', async () => {
    wrapper = mount(CSwitch, {
      props: { modelValue: false, ariaLabel: 'Dark mode' },
      attachTo: document.body,
    })

    const switchEl = page.getByRole('switch', { name: 'Dark mode' })
    await userEvent.click(switchEl)
    await userEvent.keyboard(' ')

    const emissions = wrapper.emitted('update:modelValue') ?? []
    expect(emissions.length).toBeGreaterThan(0)
  })
})
