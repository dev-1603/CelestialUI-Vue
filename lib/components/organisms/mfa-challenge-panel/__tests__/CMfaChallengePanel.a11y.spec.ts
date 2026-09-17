import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CMfaChallengePanel from '../CMfaChallengePanel.vue'
import { axe } from 'vitest-axe'

describe('CMfaChallengePanel Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const wrapper = mount(CMfaChallengePanel, {
      props: {
        method: 'sms',
        destination: '+1234567890'
      }
    })

    const results = await axe(wrapper.element, {
      rules: { region: { enabled: false } }
    })
    expect(results).toHaveNoViolations()
  })
})
