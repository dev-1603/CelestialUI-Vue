/// <reference types="@vitest/browser/providers/playwright" />
import { describe, it, expect, afterEach } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { mount, type VueWrapper } from '@vue/test-utils'
import CMfaChallengePanel from '../CMfaChallengePanel.vue'

describe('CMfaChallengePanel (browser)', () => {
  let wrapper: VueWrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  it('renders pin inputs and verify button', async () => {
    wrapper = mount(CMfaChallengePanel, {
      props: { method: 'totp' },
      attachTo: document.body,
    })

    await expect.element(page.getByRole('button', { name: 'Verify' })).toBeVisible()
    await expect.element(page.getByRole('button', { name: 'Cancel' })).toBeVisible()

    const firstPinInput = page.getByLabelText('Digit 1')
    await expect.element(firstPinInput).toBeVisible()
  })

  it('disables verify until code is complete', async () => {
    wrapper = mount(CMfaChallengePanel, {
      props: { method: 'totp' },
      attachTo: document.body,
    })

    const verifyButton = page.getByRole('button', { name: 'Verify' })
    await expect.element(verifyButton).toHaveAttribute('disabled', '')
  })
})
