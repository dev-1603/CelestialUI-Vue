import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CQrSessionCanvas from '../CQrSessionCanvas.vue'
import { axe } from 'vitest-axe'

describe('CQrSessionCanvas Accessibility', () => {
  it('should not have accessibility violations in active state', async () => {
    const wrapper = mount(CQrSessionCanvas, {
      props: {
        status: 'active',
        qrData: 'data:image/png;base64,123'
      }
    })

    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })

  it('has proper aria attributes for polite live region', () => {
    const wrapper = mount(CQrSessionCanvas, {
      props: {
        status: 'loading'
      }
    })

    const display = wrapper.find('.cui-qr-canvas-display')
    expect(display.attributes('aria-live')).toBe('polite')
  })
})
