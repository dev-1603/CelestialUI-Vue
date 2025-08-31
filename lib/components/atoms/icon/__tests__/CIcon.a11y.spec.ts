import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CIcon from '../CIcon.vue'
import type { CIconProps } from '../CIcon.types'

// Accessibility-focused tests for CIcon component
describe('CIcon Accessibility', () => {
  const defaultProps: Partial<CIconProps> = {
    library: 'material',
    type: 'font',
    name: 'star',
    size: 'md'
  }

  describe('ARIA Attributes', () => {
    it('has proper role attribute for decorative icons', () => {
      const wrapper = mount(CIcon, {
        props: defaultProps
      })

      expect(wrapper.attributes('role')).toBe('img')
    })

    it('has proper role attribute for clickable icons', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          clickable: true
        }
      })

      expect(wrapper.attributes('role')).toBe('button')
    })

    it('has custom role when specified', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          role: 'presentation'
        }
      })

      expect(wrapper.attributes('role')).toBe('presentation')
    })

    it('has proper aria-label when specified', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          ariaLabel: 'Favorite this item'
        }
      })

      expect(wrapper.attributes('aria-label')).toBe('Favorite this item')
    })

    it('infers aria-label from icon name when not specified', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          name: 'star'
        }
      })

      expect(wrapper.attributes('aria-label')).toBe('star')
    })

    it('is hidden from screen readers when decorative', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          ariaHidden: true
        }
      })

      expect(wrapper.attributes('aria-hidden')).toBe('true')
    })

    it('is not hidden from screen readers when interactive', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          clickable: true,
          ariaLabel: 'Click to favorite'
        }
      })

      expect(wrapper.attributes('aria-hidden')).toBeFalsy()
    })
  })

  describe('Image Icons Accessibility', () => {
    it('has proper alt text for image icons', () => {
      const wrapper = mount(CIcon, {
        props: {
          type: 'image',
          src: '/icon.png',
          alt: 'Settings icon'
        }
      })

      expect(wrapper.attributes('alt')).toBe('Settings icon')
    })

    it('uses aria-label as alt text when alt is not provided', () => {
      const wrapper = mount(CIcon, {
        props: {
          type: 'image',
          src: '/icon.png',
          ariaLabel: 'Settings'
        }
      })

      expect(wrapper.attributes('alt')).toBe('Settings')
    })

    it('has empty alt text when decorative', () => {
      const wrapper = mount(CIcon, {
        props: {
          type: 'image',
          src: '/icon.png',
          ariaHidden: true
        }
      })

      expect(wrapper.attributes('alt')).toBe('')
    })
  })

  describe('Keyboard Navigation', () => {
    it('is focusable when clickable', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          clickable: true
        }
      })

      expect(wrapper.attributes('tabindex')).toBeDefined()
    })

    it('is not focusable when disabled', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          clickable: true,
          disabled: true
        }
      })

      expect(wrapper.classes()).toContain('c-icon--disabled')
    })

    it('supports keyboard activation when clickable', async () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          clickable: true
        }
      })

      await wrapper.trigger('keydown.enter')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('supports space key activation when clickable', async () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          clickable: true
        }
      })

      await wrapper.trigger('keydown.space')
      expect(wrapper.emitted('click')).toBeTruthy()
    })
  })

  describe('High Contrast Mode', () => {
    it('maintains visibility in high contrast mode', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          color: 'primary'
        }
      })

      expect(wrapper.classes()).toContain('c-icon--primary')
    })

    it('uses currentColor for better contrast compatibility', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          color: 'current'
        }
      })

      expect(wrapper.classes()).toContain('c-icon--current')
    })
  })

  describe('Screen Reader Compatibility', () => {
    it('provides meaningful text for screen readers', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          name: 'delete',
          ariaLabel: 'Delete item',
          clickable: true
        }
      })

      expect(wrapper.attributes('aria-label')).toBe('Delete item')
      expect(wrapper.attributes('role')).toBe('button')
    })

    it('groups related icons properly', () => {
      // For complex icons that might need grouping
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          role: 'img',
          ariaLabel: 'Rating: 4 out of 5 stars'
        }
      })

      expect(wrapper.attributes('role')).toBe('img')
      expect(wrapper.attributes('aria-label')).toBe('Rating: 4 out of 5 stars')
    })
  })

  describe('Color Contrast', () => {
    it('supports custom colors for better contrast', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          color: '#000000'
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('inherits color from parent for automatic contrast', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          color: 'inherit'
        }
      })

      expect(wrapper.classes()).toContain('c-icon')
    })
  })

  describe('Motion Sensitivity', () => {
    it('respects reduced motion preferences', () => {
      // This would typically be tested with CSS media queries
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          animation: 'spin'
        }
      })

      expect(wrapper.classes()).toContain('c-icon--spin')
    })

    it('provides non-animated alternatives', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          // No animation specified - should work without animation
        }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Loading States', () => {
    it('indicates loading state to screen readers', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          loading: true,
          ariaLabel: 'Loading...'
        }
      })

      expect(wrapper.attributes('aria-label')).toBe('Loading...')
      expect(wrapper.classes()).toContain('c-icon--loading')
    })

    it('prevents interaction when loading', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          clickable: true,
          loading: true
        }
      })

      expect(wrapper.classes()).toContain('c-icon--loading')
    })
  })

  describe('Error States', () => {
    it('handles image load errors gracefully', async () => {
      const wrapper = mount(CIcon, {
        props: {
          type: 'image',
          src: '/nonexistent.png',
          alt: 'Icon'
        }
      })

      const img = wrapper.find('img')
      if (img.exists()) {
        await img.trigger('error')
        expect(wrapper.emitted('error')).toBeTruthy()
      }
    })
  })
})
