import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CCountdownTimer from '../CCountdownTimer.vue'
import { axe } from 'vitest-axe'

describe('CCountdownTimer Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const wrapper = mount(CCountdownTimer, {
      props: {
        initialSeconds: 60
      }
    })

    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })

  it('has proper aria attributes', () => {
    const wrapper = mount(CCountdownTimer, {
      props: {
        initialSeconds: 60
      }
    })

    const timer = wrapper.find('[role="timer"]')
    expect(timer.exists()).toBe(true)
    expect(timer.attributes('aria-live')).toBe('polite')
    expect(timer.attributes('aria-atomic')).toBe('true')
  })
})
