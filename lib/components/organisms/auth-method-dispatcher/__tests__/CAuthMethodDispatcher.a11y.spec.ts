import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CAuthMethodDispatcher from '../CAuthMethodDispatcher.vue'
import { axe } from 'vitest-axe'

describe('CAuthMethodDispatcher Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const wrapper = mount(CAuthMethodDispatcher, {
      props: {
        identifier: 'test@example.com',
        availableMethods: ['password', 'magic_link']
      }
    })

    const results = await axe(wrapper.element, {
      rules: { region: { enabled: false } }
    })
    expect(results).toHaveNoViolations()
  })

  it('has proper aria attributes', () => {
    const wrapper = mount(CAuthMethodDispatcher, {
      props: {
        identifier: 'test@example.com',
        availableMethods: ['password', 'magic_link'],
        defaultMethod: 'password'
      }
    })

    const group = wrapper.find('[role="group"]')
    expect(group.exists()).toBe(true)
    expect(group.attributes('aria-label')).toBe('Authentication methods')

    const buttons = wrapper.findAll('.cui-auth-dispatcher-method-btn')
    expect(buttons[0].attributes('aria-pressed')).toBe('true') // defaultMethod is 'password'
    expect(buttons[1].attributes('aria-pressed')).toBe('false') // 'magic_link'
  })
})
