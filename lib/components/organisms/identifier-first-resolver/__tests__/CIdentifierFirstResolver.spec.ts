import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CIdentifierFirstResolver from '../CIdentifierFirstResolver.vue'

describe('CIdentifierFirstResolver', () => {
  let wrapper: any

  const createWrapper = (props = {}) => {
    return mount(CIdentifierFirstResolver, {
      props
    })
  }

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('renders correctly', () => {
    wrapper = createWrapper()
    expect(wrapper.find('label').text()).toBe('Email or Phone')
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Continue')
  })

  it('shows validation error when empty on submit', async () => {
    wrapper = createWrapper()
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.text()).toContain('Email or phone number is required')
    expect(wrapper.emitted('resolve')).toBeFalsy()
  })

  it('shows validation error for invalid email/phone', async () => {
    wrapper = createWrapper({ initialIdentifier: 'invalid' })
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.text()).toContain('Please enter a valid email or phone number')
    expect(wrapper.emitted('resolve')).toBeFalsy()
  })

  it('emits resolve with valid email on submit', async () => {
    wrapper = createWrapper({ initialIdentifier: 'test@example.com' })
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.emitted('resolve')?.[0]).toEqual(['test@example.com'])
  })

  it('emits resolve with valid phone on submit', async () => {
    wrapper = createWrapper({ initialIdentifier: '+1234567890' })
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.emitted('resolve')?.[0]).toEqual(['+1234567890'])
  })

  it('displays external error prop', () => {
    wrapper = createWrapper({ error: 'User not found' })
    expect(wrapper.text()).toContain('User not found')
  })
})
