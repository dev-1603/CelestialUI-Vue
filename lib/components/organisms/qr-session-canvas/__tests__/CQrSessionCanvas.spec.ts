import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CQrSessionCanvas from '../CQrSessionCanvas.vue'

describe('CQrSessionCanvas', () => {
  let wrapper: any

  const createWrapper = (props = {}) => {
    return mount(CQrSessionCanvas, {
      props: {
        qrData: 'data:image/png;base64,placeholder',
        ...props
      }
    })
  }

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('renders active state with QR code', () => {
    wrapper = createWrapper({ status: 'active' })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('.cui-qr-canvas-overlay').exists()).toBe(false)
  })

  it('renders loading state', () => {
    wrapper = createWrapper({ status: 'loading' })
    expect(wrapper.find('.cui-qr-canvas-overlay').exists()).toBe(true)
    expect(wrapper.text()).toContain('Generating QR code')
  })

  it('renders scanned state', () => {
    wrapper = createWrapper({ status: 'scanned' })
    expect(wrapper.find('.cui-qr-canvas-overlay').exists()).toBe(true)
    expect(wrapper.text()).toContain('Code scanned!')
  })

  it('renders expired state with refresh button', () => {
    wrapper = createWrapper({ status: 'expired' })
    expect(wrapper.find('.cui-qr-canvas-overlay').exists()).toBe(true)
    expect(wrapper.text()).toContain('expired')
    expect(wrapper.text()).toContain('Refresh QR Code')
  })

  it('emits refresh when refresh button is clicked', async () => {
    wrapper = createWrapper({ status: 'expired' })
    await wrapper.findAll('button').find(b => b.text() === 'Refresh QR Code')?.trigger('click')
    expect(wrapper.emitted('refresh')).toBeTruthy()
  })

  it('emits cancel when cancel button is clicked', async () => {
    wrapper = createWrapper()
    await wrapper.findAll('button').find(b => b.text() === 'Cancel')?.trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })
})
