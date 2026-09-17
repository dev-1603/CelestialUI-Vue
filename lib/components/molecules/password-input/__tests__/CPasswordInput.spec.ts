import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CPasswordInput from '../CPasswordInput.vue'

describe('CPasswordInput', () => {
  let wrapper: any

  const createWrapper = (props = {}) => {
    return mount(CPasswordInput, {
      props: {
        modelValue: '',
        ...props
      }
    })
  }

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('renders correctly', () => {
    wrapper = createWrapper({ label: 'Password' })
    expect(wrapper.find('label').text()).toBe('Password')
    expect(wrapper.find('input').attributes('type')).toBe('password')
  })

  it('emits update:modelValue when typing', async () => {
    wrapper = createWrapper()
    const input = wrapper.find('input')
    await input.setValue('secret')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['secret'])
  })

  it('toggles password visibility', async () => {
    wrapper = createWrapper()
    const toggleBtn = wrapper.find('.cui-password-toggle-btn')
    const input = wrapper.find('input')
    
    expect(input.attributes('type')).toBe('password')
    
    await toggleBtn.trigger('click')
    expect(input.attributes('type')).toBe('text')
    
    await toggleBtn.trigger('click')
    expect(input.attributes('type')).toBe('password')
  })

  it('shows strength indicator when prop is true and has value', async () => {
    wrapper = createWrapper({ showStrengthIndicator: true, modelValue: 'Pass123!' })
    const indicator = wrapper.find('.cui-password-strength')
    expect(indicator.exists()).toBe(true)
    expect(indicator.text()).toContain('Strong') // All requirements met
  })

  it('does not show strength indicator if empty, even if prop is true', () => {
    wrapper = createWrapper({ showStrengthIndicator: true, modelValue: '' })
    expect(wrapper.find('.cui-password-strength').exists()).toBe(false)
  })

  it('shows requirements list when prop is true', () => {
    wrapper = createWrapper({ showRequirements: true, modelValue: '123' })
    const reqs = wrapper.findAll('.cui-password-req-item')
    expect(reqs.length).toBe(5) // default 5 requirements
    
    // Check if number requirement is met
    const numberReq = reqs.find(r => r.text().includes('One number'))
    expect(numberReq?.classes()).toContain('cui-password-req-item--met')
    
    // Check if uppercase requirement is not met
    const uppercaseReq = reqs.find(r => r.text().includes('One uppercase letter'))
    expect(uppercaseReq?.classes()).not.toContain('cui-password-req-item--met')
  })
})
