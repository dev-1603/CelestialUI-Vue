import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CDropdownMenu from '../CDropdownMenu.vue'
import { axe } from 'vitest-axe'

describe('CDropdownMenu Accessibility', () => {
  it('should not have accessibility violations when closed', async () => {
    const wrapper = mount(CDropdownMenu, {
      props: {
        items: [{ id: 1, label: 'Test' }]
      },
      slots: {
        trigger: '<span>Menu</span>'
      }
    })

    const results = await axe(wrapper.element, {
      rules: {
        region: { enabled: false }
      }
    })
    expect(results).toHaveNoViolations()
  })

  it('should not have accessibility violations when open', async () => {
    const wrapper = mount(CDropdownMenu, {
      props: {
        items: [
          { id: 1, label: 'Profile' },
          { id: 2, label: 'Settings' }
        ]
      },
      slots: {
        trigger: '<span>Menu</span>'
      }
    })

    await wrapper.find('.cui-dropdown-trigger').trigger('click')

    const results = await axe(wrapper.element, {
      rules: {
        region: { enabled: false }
      }
    })
    expect(results).toHaveNoViolations()
  })
})
