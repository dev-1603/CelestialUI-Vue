/// <reference types="@vitest/browser/providers/playwright" />
import { describe, it, expect, afterEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { mount, type VueWrapper } from '@vue/test-utils'
import CIdentifierFirstResolver from '../CIdentifierFirstResolver.vue'

describe('CIdentifierFirstResolver (browser)', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('focuses identifier input and submits on Continue click', async () => {
    wrapper = mount(CIdentifierFirstResolver, {
      props: { label: 'Email or Phone', placeholder: 'Enter identifier' },
      attachTo: document.body,
    })

    const input = page.getByLabelText('Email or Phone')
    await expect.element(input).toBeVisible()

    await userEvent.click(input)
    await userEvent.keyboard('jane@example.com')

    const continueButton = page.getByRole('button', { name: 'Continue' })
    await userEvent.click(continueButton)

    expect(wrapper.emitted('resolve')?.at(-1)?.[0]).toBe('jane@example.com')
  })
})
