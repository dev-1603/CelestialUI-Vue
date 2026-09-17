import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CAuthMethodDispatcher from '../CAuthMethodDispatcher.vue'

describe('CAuthMethodDispatcher', () => {
  let wrapper: any

  const createWrapper = (props = {}) => {
    return mount(CAuthMethodDispatcher, {
      props: {
        identifier: 'test@example.com',
        availableMethods: ['password', 'magic_link', 'otp'],
        ...props
      }
    })
  }

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('renders identifier', () => {
    wrapper = createWrapper()
    expect(wrapper.text()).toContain('test@example.com')
  })

  it('renders available methods', () => {
    wrapper = createWrapper()
    const methodsText = wrapper.text()
    expect(methodsText).toContain('Password')
    expect(methodsText).toContain('Email Link')
    expect(methodsText).toContain('One-Time Passcode')
  })

  it('emits select-method when a method is clicked', async () => {
    wrapper = createWrapper()
    
    // Find the magic link button
    const buttons = wrapper.findAll('.cui-auth-dispatcher-method-btn')
    const magicLinkBtn = buttons.find(b => b.text().includes('Email Link'))
    
    await magicLinkBtn?.trigger('click')
    
    const emitted = wrapper.emitted('select-method')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toBe('magic_link')
  })

  it('emits back when back button is clicked', async () => {
    wrapper = createWrapper()
    
    await wrapper.find('.cui-auth-dispatcher-back-btn').trigger('click')
    
    expect(wrapper.emitted('back')).toBeTruthy()
  })

  it('renders social providers if provided', () => {
    wrapper = createWrapper({
      socialProviders: [
        { id: 'google', name: 'Google', icon: 'google' }
      ]
    })
    
    expect(wrapper.text()).toContain('Continue with Google')
  })
})
