import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CDropdownMenu from '../CDropdownMenu.vue'
import type { CDropdownItem } from '../CDropdownMenu.types'

describe('CDropdownMenu', () => {
  const items: CDropdownItem[] = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Settings', disabled: true },
    { id: 3, label: 'Divider', divider: true },
    { id: 4, label: 'Logout', shortcut: '⌘L' }
  ]

  let wrapper: any

  const createWrapper = (props = {}) => {
    return mount(CDropdownMenu, {
      props: {
        items,
        ...props
      },
      slots: {
        trigger: '<button class="trigger-btn">Trigger</button>'
      }
    })
  }

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('renders trigger correctly', () => {
    wrapper = createWrapper()
    expect(wrapper.find('.trigger-btn').exists()).toBe(true)
    expect(wrapper.find('.cui-dropdown-menu').exists()).toBe(false)
  })

  it('opens menu on click when trigger="click"', async () => {
    wrapper = createWrapper({ trigger: 'click' })
    await wrapper.find('.cui-dropdown-trigger').trigger('click')
    
    expect(wrapper.find('.cui-dropdown-menu').exists()).toBe(true)
    expect(wrapper.emitted('open')).toBeTruthy()
  })

  it('opens menu on hover when trigger="hover"', async () => {
    wrapper = createWrapper({ trigger: 'hover' })
    await wrapper.find('.cui-dropdown-wrapper').trigger('mouseenter')
    
    expect(wrapper.find('.cui-dropdown-menu').exists()).toBe(true)
    expect(wrapper.emitted('open')).toBeTruthy()
  })

  it('renders normalized items correctly', async () => {
    wrapper = createWrapper()
    await wrapper.find('.cui-dropdown-trigger').trigger('click')
    
    const menuItems = wrapper.findAll('.cui-dropdown-item')
    expect(menuItems.length).toBe(3) // Excludes divider which is a separate div
    expect(menuItems[0].text()).toContain('Profile')
    expect(menuItems[1].classes()).toContain('cui-dropdown-item--disabled')
    expect(menuItems[2].text()).toContain('Logout')
    expect(menuItems[2].text()).toContain('⌘L')
  })

  it('emits select when clicking a valid item and closes menu', async () => {
    wrapper = createWrapper()
    await wrapper.find('.cui-dropdown-trigger').trigger('click')
    
    const menuItems = wrapper.findAll('.cui-dropdown-item')
    await menuItems[0].trigger('click')
    
    expect(wrapper.emitted('select')?.[0]).toEqual([items[0]])
    expect(wrapper.emitted('close')).toBeTruthy()
    // Should close
    expect(wrapper.find('.cui-dropdown-menu').exists()).toBe(false)
  })

  it('does not emit select when clicking a disabled item', async () => {
    wrapper = createWrapper()
    await wrapper.find('.cui-dropdown-trigger').trigger('click')
    
    const menuItems = wrapper.findAll('.cui-dropdown-item')
    await menuItems[1].trigger('click') // Settings is disabled
    
    expect(wrapper.emitted('select')).toBeFalsy()
    expect(wrapper.find('.cui-dropdown-menu').exists()).toBe(true) // Should stay open
  })
})
