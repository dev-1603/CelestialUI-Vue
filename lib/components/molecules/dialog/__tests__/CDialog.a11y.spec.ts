import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import CDialog from '../CDialog.vue'

describe('CDialog Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const wrapper = mount(CDialog, {
      props: {
        modelValue: true,
        title: 'Accessible Dialog',
        description: 'This is a well formed dialog'
      },
      slots: {
        default: '<p>Dialog content</p>'
      },
      global: {
        stubs: {
          teleport: true
        }
      }
    })

    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })

  it('has proper ARIA attributes', () => {
    const wrapper = mount(CDialog, {
      props: {
        modelValue: true,
        title: 'Title',
        description: 'Desc'
      },
      global: {
        stubs: {
          teleport: true
        }
      }
    })

    const dialog = wrapper.find('.cui-dialog')
    expect(dialog.attributes('role')).toBe('dialog')
    expect(dialog.attributes('aria-modal')).toBe('true')
    expect(dialog.attributes('aria-labelledby')).toBe('cui-dialog-title')
    expect(dialog.attributes('aria-describedby')).toBe('cui-dialog-description')
    expect(dialog.attributes('tabindex')).toBe('-1')
  })
})
