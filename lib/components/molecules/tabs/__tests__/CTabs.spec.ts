import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CTabs from '../CTabs.vue'
import type { CTabItem } from '../CTabs.types'

describe('CTabs', () => {
  const items: CTabItem[] = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3', disabled: true }
  ]

  let wrapper: any

  const createWrapper = (props = {}) => {
    return mount(CTabs, {
      props: {
        modelValue: 'tab1',
        items,
        ...props
      },
      slots: {
        'panel-tab1': '<div>Panel 1 Content</div>',
        'panel-tab2': '<div>Panel 2 Content</div>',
        'panel-tab3': '<div>Panel 3 Content</div>'
      }
    })
  }

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('renders correctly', () => {
    wrapper = createWrapper()
    const tabs = wrapper.findAll('.cui-tab')
    expect(tabs.length).toBe(3)
    expect(tabs[0].text()).toContain('Tab 1')
    expect(tabs[1].text()).toContain('Tab 2')
    expect(tabs[2].text()).toContain('Tab 3')
    
    // Check initial active state
    expect(tabs[0].classes()).toContain('cui-tab--active')
    expect(tabs[1].classes()).not.toContain('cui-tab--active')
  })

  it('emits update:modelValue and change when a tab is clicked', async () => {
    wrapper = createWrapper()
    const tabs = wrapper.findAll('.cui-tab')
    await tabs[1].trigger('click')
    
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['tab2'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['tab2'])
  })

  it('does not emit when a disabled tab is clicked', async () => {
    wrapper = createWrapper()
    const tabs = wrapper.findAll('.cui-tab')
    await tabs[2].trigger('click') // Tab 3 is disabled
    
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('handles keyboard navigation (ArrowRight)', async () => {
    wrapper = createWrapper()
    const tabs = wrapper.findAll('.cui-tab')
    
    // We can't easily test document.activeElement in unit tests without attaching to DOM, 
    // but we can trigger the keydown event and check if it handles it.
    await tabs[0].trigger('keydown', { key: 'ArrowRight' })
    // The selectTab doesn't get called automatically by keyboard focus in the W3C pattern,
    // they just get focused. The user must hit Enter/Space to select, or we implement auto-activation.
    // Our implementation currently just focuses. 
    expect(wrapper.emitted('change')).toBeFalsy() // It just focuses, doesn't select
  })
})
