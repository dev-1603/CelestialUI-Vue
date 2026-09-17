/// <reference types="@vitest/browser/providers/playwright" />
import { describe, it, expect, afterEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { mount, type VueWrapper } from '@vue/test-utils'
import CPinInput from '../CPinInput.vue'

describe('CPinInput (browser)', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('moves focus to the next digit after typing', async () => {
    wrapper = mount(CPinInput, {
      props: { modelValue: '', length: 4 },
      attachTo: document.body,
    })

    const first = page.getByLabelText('Digit 1')
    const second = page.getByLabelText('Digit 2')

    await userEvent.click(first)
    await userEvent.keyboard('1')

    await expect.element(second).toHaveFocus()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['1'])
  })

  it('moves focus with arrow keys', async () => {
    wrapper = mount(CPinInput, {
      props: { modelValue: '12', length: 4 },
      attachTo: document.body,
    })

    await userEvent.click(page.getByLabelText('Digit 2'))
    await userEvent.keyboard('{ArrowLeft}')
    await expect.element(page.getByLabelText('Digit 1')).toHaveFocus()

    await userEvent.keyboard('{ArrowRight}')
    await expect.element(page.getByLabelText('Digit 2')).toHaveFocus()
  })
})
