import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CTabs from '../CTabs.vue'
import { axe } from 'vitest-axe'

describe('CTabs Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const wrapper = mount(CTabs, {
      props: {
        modelValue: '1',
        items: [
          { id: '1', label: 'Tab 1' },
          { id: '2', label: 'Tab 2' }
        ]
      },
      slots: {
        'panel-1': '<p>Panel 1</p>',
        'panel-2': '<p>Panel 2</p>'
      }
    })

    const results = await axe(wrapper.element, {
      rules: { region: { enabled: false } }
    })
    expect(results).toHaveNoViolations()
  })

  it('has proper ARIA attributes', () => {
    const wrapper = mount(CTabs, {
      props: {
        modelValue: '1',
        items: [
          { id: '1', label: 'Tab 1' },
          { id: '2', label: 'Tab 2' }
        ]
      }
    })

    const tablist = wrapper.find('[role="tablist"]')
    expect(tablist.exists()).toBe(true)
    
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs.length).toBe(2)
    expect(tabs[0].attributes('aria-selected')).toBe('true')
    expect(tabs[0].attributes('tabindex')).toBe('0')
    expect(tabs[1].attributes('aria-selected')).toBe('false')
    expect(tabs[1].attributes('tabindex')).toBe('-1')
    
    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(panels.length).toBe(2)
    expect(panels[0].attributes('aria-labelledby')).toBe('tab-1')
  })
})
