import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CIdentifierFirstResolver from '../CIdentifierFirstResolver.vue'
import { axe } from 'vitest-axe'

describe('CIdentifierFirstResolver Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const wrapper = mount(CIdentifierFirstResolver)

    const results = await axe(wrapper.element, {
      rules: { region: { enabled: false } }
    })
    expect(results).toHaveNoViolations()
  })

  it('has proper aria attributes for error state', () => {
    const wrapper = mount(CIdentifierFirstResolver, {
      props: {
        error: 'Invalid identifier'
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    
    const errorText = wrapper.find('.cui-resolver-error')
    expect(errorText.attributes('aria-live')).toBe('polite')
    
    expect(input.attributes('aria-describedby')).toBe(errorText.attributes('id'))
  })
})
