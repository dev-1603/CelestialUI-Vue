import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CPasswordInput from '../CPasswordInput.vue'
import { axe } from 'vitest-axe'

describe('CPasswordInput Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const wrapper = mount(CPasswordInput, {
      props: {
        modelValue: '',
        label: 'Password'
      }
    })

    const results = await axe(wrapper.element, {
      rules: { region: { enabled: false } }
    })
    expect(results).toHaveNoViolations()
  })

  it('has proper aria attributes for error state', () => {
    const wrapper = mount(CPasswordInput, {
      props: {
        modelValue: '',
        label: 'Password',
        error: 'Password is required'
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toBeTruthy()
    
    const errorText = wrapper.find('.cui-password-error-text')
    expect(errorText.exists()).toBe(true)
    expect(errorText.attributes('aria-live')).toBe('polite')
    
    // Ensure aria-describedby matches error ID
    expect(input.attributes('aria-describedby')).toBe(errorText.attributes('id'))
  })
})
