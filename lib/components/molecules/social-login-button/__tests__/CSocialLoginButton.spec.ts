import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CSocialLoginButton from '../CSocialLoginButton.vue'

describe('CSocialLoginButton', () => {
  let wrapper: any

  const createWrapper = (props = {}) => {
    return mount(CSocialLoginButton, {
      props: {
        provider: 'google',
        ...props
      }
    })
  }

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('renders correctly with default label', () => {
    wrapper = createWrapper()
    expect(wrapper.text()).toContain('Continue with Google')
    expect(wrapper.classes()).toContain('cui-social-btn--google')
  })

  it('renders custom label when provided', () => {
    wrapper = createWrapper({ provider: 'github', label: 'Sign in with GitHub' })
    expect(wrapper.text()).toContain('Sign in with GitHub')
    expect(wrapper.classes()).toContain('cui-social-btn--github')
  })

  it('emits click event when clicked', async () => {
    wrapper = createWrapper()
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    wrapper = createWrapper({ disabled: true })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('does not emit click when loading', async () => {
    wrapper = createWrapper({ loading: true })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
