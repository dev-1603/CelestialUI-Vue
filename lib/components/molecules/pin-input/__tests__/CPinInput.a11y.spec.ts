import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import CPinInput from '../CPinInput.vue'

describe('CPinInput Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const wrapper = mount(CPinInput, {
      props: {
        modelValue: ''
      }
    })

    const results = await axe(wrapper.element, {
      rules: { region: { enabled: false } }
    })
    expect(results).toHaveNoViolations()
  })

  it('sets aria-label correctly on inputs', () => {
    const wrapper = mount(CPinInput, {
      props: {
        modelValue: '',
        length: 4
      }
    })

    const inputs = wrapper.findAll('input')
    expect(inputs[0].attributes('aria-label')).toBe('Digit 1')
    expect(inputs[1].attributes('aria-label')).toBe('Digit 2')
    expect(inputs[2].attributes('aria-label')).toBe('Digit 3')
    expect(inputs[3].attributes('aria-label')).toBe('Digit 4')
  })
})
