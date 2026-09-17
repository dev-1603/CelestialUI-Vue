import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import CAvatar from '../CAvatar.vue'

describe('CAvatar Accessibility', () => {
  describe('Basic Accessibility', () => {
    it('should not have accessibility violations with basic avatar', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
        },
      })

      const results = await axe(wrapper.element, {
        rules: {
          region: { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with image avatar', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          src: 'https://example.com/avatar.jpg',
          alt: 'John Doe',
        },
      })

      const results = await axe(wrapper.element, {
        rules: {
          region: { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with clickable avatar', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          clickable: true,
        },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with status indicator', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          status: 'online',
        },
      })

      const results = await axe(wrapper.element, {
        rules: {
          region: { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })
  })

  describe('ARIA Attributes', () => {
    it('should have proper role attribute for non-clickable avatar', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
        },
      })

      expect(wrapper.attributes('role')).toBe('img')
    })

    it('should have proper role attribute for clickable avatar', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          clickable: true,
        },
      })

      expect(wrapper.attributes('role')).toBe('button')
    })

    it('should have aria-label attribute', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
        },
      })

      expect(wrapper.attributes('aria-label')).toBe('John Doe')
    })

    it('should use custom aria-label when provided', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          ariaLabel: 'Custom Label',
        },
      })

      expect(wrapper.attributes('aria-label')).toBe('Custom Label')
    })

    it('should not have aria-label when decorative', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          decorative: true,
        },
      })

      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })

    it('should have aria-disabled attribute when disabled', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          disabled: true,
        },
      })

      expect(wrapper.attributes('aria-disabled')).toBe('true')
    })

    it('should not have aria-disabled attribute when not disabled', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          disabled: false,
        },
      })

      expect(wrapper.attributes('aria-disabled')).toBe('false')
    })
  })

  describe('Keyboard Navigation', () => {
    it('should be focusable when clickable', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          clickable: true,
        },
      })

      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('should not be focusable when not clickable', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          clickable: false,
        },
      })

      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })

    it('should not be focusable when disabled', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          clickable: true,
          disabled: true,
        },
      })

      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })
  })

  describe('Image Accessibility', () => {
    it('should have alt attribute on image', () => {
      const wrapper = mount(CAvatar, {
        props: {
          src: 'https://example.com/avatar.jpg',
          alt: 'John Doe',
        },
      })

      const img = wrapper.find('img')
      expect(img.attributes('alt')).toBe('John Doe')
    })

    it('should handle image load errors gracefully', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          src: 'https://example.com/invalid.jpg',
          alt: 'John Doe',
        },
      })

      const img = wrapper.find('img')
      await img.trigger('error')

      // After error, should show fallback content
      expect(wrapper.find('.celestial-avatar__fallback').exists()).toBe(true)
    })
  })

  describe('Status Indicator Accessibility', () => {
    it('should have aria-label on status indicator', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          status: 'online',
        },
      })

      const status = wrapper.find('.celestial-avatar__status')
      expect(status.attributes('aria-label')).toBe('Status: online')
    })

    it('should have aria-label for different status types', () => {
      const statuses = ['online', 'offline', 'away', 'busy'] as const

      statuses.forEach((status) => {
        const wrapper = mount(CAvatar, {
          props: {
            alt: 'John Doe',
            status,
          },
        })

        const statusElement = wrapper.find('.celestial-avatar__status')
        expect(statusElement.attributes('aria-label')).toBe(`Status: ${status}`)
      })
    })
  })

  describe('Loading State Accessibility', () => {
    it('should have aria-hidden on loading spinner', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          loading: true,
        },
      })

      const loading = wrapper.find('.celestial-avatar__loading')
      expect(loading.attributes('aria-hidden')).toBe('true')
    })

    it('should not have accessibility violations in loading state', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          loading: true,
        },
      })

      const results = await axe(wrapper.element, {
        rules: {
          region: { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })
  })

  describe('Fallback Content Accessibility', () => {
    it('should have aria-hidden on fallback icon', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: '',
        },
      })

      const fallback = wrapper.find('.celestial-avatar__fallback')
      const icon = fallback.find('svg')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('should not have accessibility violations with fallback content', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
        },
      })

      const results = await axe(wrapper.element, {
        rules: {
          region: { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })
  })

  describe('Badge Accessibility', () => {
    it('should not have accessibility violations with badge', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
        },
        slots: {
          badge: '<span class="badge">3</span>',
        },
      })

      const results = await axe(wrapper.element, {
        rules: {
          region: { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })
  })

  describe('High Contrast Mode', () => {
    it('should maintain accessibility in high contrast scenarios', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          bordered: true,
          status: 'online',
        },
      })

      const results = await axe(wrapper.element, {
        rules: {
          region: { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })
  })

  describe('Screen Reader Support', () => {
    it('should provide meaningful information to screen readers', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          status: 'online',
          clickable: true,
        },
      })

      // Should have role, aria-label, and status information
      expect(wrapper.attributes('role')).toBe('button')
      expect(wrapper.attributes('aria-label')).toBe('John Doe')

      const status = wrapper.find('.celestial-avatar__status')
      expect(status.attributes('aria-label')).toBe('Status: online')
    })

    it('should handle decorative avatars appropriately', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
          decorative: true,
        },
      })

      // Should not have aria-label for decorative avatars
      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })
  })
})
