import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CDialog from '../CDialog.vue'

describe('CDialog', () => {
  let wrapper: any

  const createWrapper = (props = {}, slots = {}) => {
    return mount(CDialog, {
      props: {
        modelValue: true,
        ...props
      },
      slots,
      global: {
        stubs: {
          teleport: true
        }
      }
    })
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    if (wrapper) wrapper.unmount()
    vi.restoreAllMocks()
    document.body.style.overflow = ''
  })

  it('renders correctly when modelValue is true', () => {
    wrapper = createWrapper({ title: 'Test Dialog' }, { default: '<p>Dialog content</p>' })
    expect(wrapper.find('.cui-dialog').exists()).toBe(true)
    expect(wrapper.find('.cui-dialog-title').text()).toBe('Test Dialog')
    expect(wrapper.find('.cui-dialog-body').text()).toContain('Dialog content')
  })

  it('does not render when modelValue is false', () => {
    wrapper = createWrapper({ modelValue: false })
    expect(wrapper.find('.cui-dialog').exists()).toBe(false)
  })

  it('emits update:modelValue and close when close button is clicked', async () => {
    wrapper = createWrapper({ closable: true })
    const closeBtn = wrapper.find('.cui-dialog-close')
    await closeBtn.trigger('click')
    
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits close when clicking on backdrop if closeOnOutsideClick is true', async () => {
    wrapper = createWrapper({ closeOnOutsideClick: true })
    const backdrop = wrapper.find('.cui-dialog-backdrop')
    await backdrop.trigger('click')
    
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('does not emit close when clicking inside the dialog', async () => {
    wrapper = createWrapper({ closeOnOutsideClick: true })
    const dialog = wrapper.find('.cui-dialog')
    await dialog.trigger('click')
    
    expect(wrapper.emitted('close')).toBeFalsy()
  })

  it('emits close on Escape key if closeOnEsc is true', async () => {
    wrapper = createWrapper({ closeOnEsc: true })
    const event = new KeyboardEvent('keydown', { key: 'Escape' })
    document.dispatchEvent(event)
    
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('locks body scroll when opened and unlocks when closed', async () => {
    wrapper = createWrapper({ modelValue: false })
    expect(document.body.style.overflow).not.toBe('hidden')
    
    await wrapper.setProps({ modelValue: true })
    expect(document.body.style.overflow).toBe('hidden')
    
    await wrapper.setProps({ modelValue: false })
    expect(document.body.style.overflow).toBe('')
  })
})
