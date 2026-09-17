import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CMfaChallengePanel from '../CMfaChallengePanel.vue'

describe('CMfaChallengePanel', () => {
  let wrapper: any

  const createWrapper = (props = {}) => {
    return mount(CMfaChallengePanel, {
      props: {
        method: 'totp',
        ...props
      }
    })
  }

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('renders correct title and description for totp', () => {
    wrapper = createWrapper()
    expect(wrapper.text()).toContain('Authenticator App')
    expect(wrapper.text()).toContain('Enter the 6-digit code from your authenticator app')
  })

  it('renders correct title and description for sms with destination', () => {
    wrapper = createWrapper({ method: 'sms', destination: '+1234567890' })
    expect(wrapper.text()).toContain('Check your phone')
    expect(wrapper.text()).toContain('We sent a 6-digit code to +1234567890')
  })

  it('shows resend option for sms and email, but not totp', () => {
    const totpWrapper = createWrapper({ method: 'totp' })
    expect(totpWrapper.text()).not.toContain('Didn\'t receive a code?')
    
    const smsWrapper = createWrapper({ method: 'sms' })
    expect(smsWrapper.text()).toContain('Didn\'t receive a code?')
    
    const emailWrapper = createWrapper({ method: 'email' })
    expect(emailWrapper.text()).toContain('Didn\'t receive a code?')
  })

  it('emits verify with code when verify is clicked', async () => {
    wrapper = createWrapper()
    
    // Simulate typing 6 digits. CPinInput update:modelValue is what we want.
    // Instead of deep diving, let's just use vm.
    wrapper.vm.code = '123456'
    await wrapper.vm.$nextTick()
    
    await wrapper.findAll('button').find(b => b.text() === 'Verify')?.trigger('click')
    
    expect(wrapper.emitted('verify')?.[0]).toEqual(['123456'])
  })

  it('emits resend when resend is clicked', async () => {
    wrapper = createWrapper({ method: 'sms' })
    await wrapper.find('.cui-mfa-panel-resend-btn').trigger('click')
    expect(wrapper.emitted('resend')).toBeTruthy()
  })

  it('emits cancel when cancel is clicked', async () => {
    wrapper = createWrapper()
    await wrapper.findAll('button').find(b => b.text() === 'Cancel')?.trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('displays error prop', () => {
    wrapper = createWrapper({ error: 'Invalid code' })
    expect(wrapper.find('.cui-mfa-panel-error').text()).toBe('Invalid code')
  })
})
