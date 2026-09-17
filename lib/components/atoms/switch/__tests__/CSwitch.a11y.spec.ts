import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import CSwitch from '../CSwitch.vue'

describe('CSwitch Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const wrapper = mount(CSwitch, {
      props: { modelValue: false, ariaLabel: 'Enable notifications' },
      attachTo: document.body,
    })

    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()

    wrapper.unmount()
  })

  it('should have switch role and aria-checked', () => {
    const wrapper = mount(CSwitch, {
      props: { modelValue: true, ariaLabel: 'Enable notifications' },
    })

    const switchEl = wrapper.find('[role="switch"]')
    expect(switchEl.exists()).toBe(true)
    expect(switchEl.attributes('aria-checked')).toBe('true')
  })

  it('should reflect disabled state', () => {
    const wrapper = mount(CSwitch, {
      props: { modelValue: false, disabled: true, ariaLabel: 'Disabled switch' },
    })

    const switchEl = wrapper.find('[role="switch"]')
    expect(switchEl.attributes('aria-disabled')).toBe('true')
  })
})
