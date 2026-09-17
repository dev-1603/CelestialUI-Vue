import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CSocialLoginButton from '../CSocialLoginButton.vue'
import { axe } from 'vitest-axe'

describe('CSocialLoginButton Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const wrapper = mount(CSocialLoginButton, {
      props: {
        provider: 'google'
      }
    })

    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })

  it('maintains a11y when loading', async () => {
    const wrapper = mount(CSocialLoginButton, {
      props: {
        provider: 'github',
        loading: true
      }
    })

    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
