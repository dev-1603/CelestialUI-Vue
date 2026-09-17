import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CAvatar from '../CAvatar.vue'

describe('CAvatar', () => {
  beforeEach(() => {
    // Mock console.warn to avoid noise in tests
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  describe('Rendering', () => {
    it('renders with default props', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
        },
      })

      expect(wrapper.find('.celestial-avatar').exists()).toBe(true)
      expect(wrapper.find('.celestial-avatar--md').exists()).toBe(true)
    })

    it('renders with image when src is provided', () => {
      const wrapper = mount(CAvatar, {
        props: {
          src: 'https://example.com/avatar.jpg',
          alt: 'Test User',
        },
      })

      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('https://example.com/avatar.jpg')
      expect(img.attributes('alt')).toBe('Test User')
    })

    it('renders fallback content when no src is provided', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'John Doe',
        },
      })

      const fallback = wrapper.find('.celestial-avatar__fallback')
      expect(fallback.exists()).toBe(true)
      expect(fallback.text()).toBe('J')
    })

    it('renders custom fallback slot', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
        },
        slots: {
          fallback: 'Custom Fallback',
        },
      })

      const fallback = wrapper.find('.celestial-avatar__fallback')
      expect(fallback.text()).toBe('Custom Fallback')
    })

    it('renders badge slot', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
        },
        slots: {
          badge: '<span class="badge">3</span>',
        },
      })

      const badge = wrapper.find('.celestial-avatar__badge')
      expect(badge.exists()).toBe(true)
      expect(badge.find('.badge').text()).toBe('3')
    })

    it('renders loading state', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          loading: true,
        },
      })

      expect(wrapper.find('.celestial-avatar--loading').exists()).toBe(true)
      expect(wrapper.find('.celestial-avatar__loading').exists()).toBe(true)
    })

    it('renders custom loading slot', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          loading: true,
        },
        slots: {
          loading: '<div class="custom-loading">Loading...</div>',
        },
      })

      const loading = wrapper.find('.celestial-avatar__loading')
      expect(loading.find('.custom-loading').text()).toBe('Loading...')
    })
  })

  describe('Size Variants', () => {
    it('applies xs size class', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          size: 'xs',
        },
      })

      expect(wrapper.find('.celestial-avatar--xs').exists()).toBe(true)
    })

    it('applies sm size class', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          size: 'sm',
        },
      })

      expect(wrapper.find('.celestial-avatar--sm').exists()).toBe(true)
    })

    it('applies md size class', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          size: 'md',
        },
      })

      expect(wrapper.find('.celestial-avatar--md').exists()).toBe(true)
    })

    it('applies lg size class', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          size: 'lg',
        },
      })

      expect(wrapper.find('.celestial-avatar--lg').exists()).toBe(true)
    })

    it('applies xl size class', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          size: 'xl',
        },
      })

      expect(wrapper.find('.celestial-avatar--xl').exists()).toBe(true)
    })
  })

  describe('Rounded Variant', () => {
    it('applies rounded class when rounded prop is true', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          rounded: true,
        },
      })

      expect(wrapper.find('.celestial-avatar--rounded').exists()).toBe(true)
    })

    it('does not apply rounded class when rounded prop is false', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          rounded: false,
        },
      })

      expect(wrapper.find('.celestial-avatar--rounded').exists()).toBe(false)
    })
  })

  describe('Clickable State', () => {
    it('applies clickable class when clickable prop is true', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          clickable: true,
        },
      })

      expect(wrapper.find('.celestial-avatar--clickable').exists()).toBe(true)
    })

    it('sets tabindex to 0 when clickable', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          clickable: true,
        },
      })

      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('sets role to button when clickable', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          clickable: true,
        },
      })

      expect(wrapper.attributes('role')).toBe('button')
    })

    it('does not set tabindex when not clickable', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          clickable: false,
        },
      })

      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })

    it('sets role to img when not clickable', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          clickable: false,
        },
      })

      expect(wrapper.attributes('role')).toBe('img')
    })
  })

  describe('Disabled State', () => {
    it('applies disabled class when disabled prop is true', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          disabled: true,
        },
      })

      expect(wrapper.find('.celestial-avatar--disabled').exists()).toBe(true)
    })

    it('sets aria-disabled when disabled', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          disabled: true,
        },
      })

      expect(wrapper.attributes('aria-disabled')).toBe('true')
    })
  })

  describe('Status Indicator', () => {
    it('renders status indicator when status prop is provided', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          status: 'online',
        },
      })

      const status = wrapper.find('.celestial-avatar__status')
      expect(status.exists()).toBe(true)
      expect(status.classes()).toContain('celestial-avatar__status--online')
    })

    it('applies correct status class for online', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          status: 'online',
        },
      })

      expect(wrapper.find('.celestial-avatar__status--online').exists()).toBe(true)
    })

    it('applies correct status class for offline', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          status: 'offline',
        },
      })

      expect(wrapper.find('.celestial-avatar__status--offline').exists()).toBe(true)
    })

    it('applies correct status class for away', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          status: 'away',
        },
      })

      expect(wrapper.find('.celestial-avatar__status--away').exists()).toBe(true)
    })

    it('applies correct status class for busy', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          status: 'busy',
        },
      })

      expect(wrapper.find('.celestial-avatar__status--busy').exists()).toBe(true)
    })
  })

  describe('Bordered Variant', () => {
    it('applies bordered class when bordered prop is true', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          bordered: true,
        },
      })

      expect(wrapper.find('.celestial-avatar--bordered').exists()).toBe(true)
    })
  })

  describe('Custom Styling', () => {
    it('applies custom class', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          class: 'custom-avatar',
        },
      })

      expect(wrapper.classes()).toContain('custom-avatar')
    })

    it('applies custom width and height', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          width: '100px',
          height: '100px',
        },
      })

      expect(wrapper.attributes('style')).toContain('width: 100px')
      expect(wrapper.attributes('style')).toContain('height: 100px')
    })

    it('applies custom background and text colors to fallback', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          backgroundColor: '#ff0000',
          textColor: '#ffffff',
        },
      })

      const fallback = wrapper.find('.celestial-avatar__fallback')
      expect(fallback.attributes('style')).toContain('background-color: rgb(255, 0, 0)')
      expect(fallback.attributes('style')).toContain('color: rgb(255, 255, 255)')
    })
  })

  describe('Events', () => {
    it('emits click event when clicked and clickable', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          clickable: true,
        },
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click event when not clickable', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          clickable: false,
        },
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('does not emit click event when disabled', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          clickable: true,
          disabled: true,
        },
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('emits focus event', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          clickable: true,
        },
      })

      await wrapper.trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('emits blur event', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          clickable: true,
        },
      })

      await wrapper.trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('emits mouseenter event', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
        },
      })

      await wrapper.trigger('mouseenter')
      expect(wrapper.emitted('mouseenter')).toBeTruthy()
    })

    it('emits mouseleave event', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
        },
      })

      await wrapper.trigger('mouseleave')
      expect(wrapper.emitted('mouseleave')).toBeTruthy()
    })

    it('emits keydown event', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          clickable: true,
        },
      })

      await wrapper.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('keydown')).toBeTruthy()
    })
  })

  describe('Image Events', () => {
    it('emits load event when image loads', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          src: 'https://example.com/avatar.jpg',
          alt: 'Test User',
        },
      })

      const img = wrapper.find('img')
      await img.trigger('load')
      expect(wrapper.emitted('load')).toBeTruthy()
    })

    it('emits error event when image fails to load', async () => {
      const wrapper = mount(CAvatar, {
        props: {
          src: 'https://example.com/avatar.jpg',
          alt: 'Test User',
        },
      })

      const img = wrapper.find('img')
      await img.trigger('error')
      expect(wrapper.emitted('error')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('uses provided aria-label', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          ariaLabel: 'Custom Label',
        },
      })

      expect(wrapper.attributes('aria-label')).toBe('Custom Label')
    })

    it('falls back to alt text for aria-label', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
        },
      })

      expect(wrapper.attributes('aria-label')).toBe('Test User')
    })

    it('does not set aria-label when decorative', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          decorative: true,
        },
      })

      expect(wrapper.attributes('aria-label')).toBeUndefined()
    })

    it('sets aria-label for status indicator', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Test User',
          status: 'online',
        },
      })

      const status = wrapper.find('.celestial-avatar__status')
      expect(status.attributes('aria-label')).toBe('Status: online')
    })
  })

  describe('Object Fit', () => {
    it('applies object-fit style to image', () => {
      const wrapper = mount(CAvatar, {
        props: {
          src: 'https://example.com/avatar.jpg',
          alt: 'Test User',
          objectFit: 'contain',
        },
      })

      const img = wrapper.find('img')
      expect(img.attributes('style')).toContain('object-fit: contain')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty alt text gracefully', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: '',
        },
      })

      const fallback = wrapper.find('.celestial-avatar__fallback')
      expect(fallback.find('svg').exists()).toBe(true)
    })

    it('handles very long alt text', () => {
      const longAlt = 'This is a very long alt text that should be handled gracefully'
      const wrapper = mount(CAvatar, {
        props: {
          alt: longAlt,
        },
      })

      const fallback = wrapper.find('.celestial-avatar__fallback')
      expect(fallback.text()).toBe('T')
    })

    it('handles special characters in alt text', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'José María',
        },
      })

      const fallback = wrapper.find('.celestial-avatar__fallback')
      expect(fallback.text()).toBe('J')
    })
  })

  describe('Online and Status Indicator Enhancements', () => {
    it('renders online status indicator when online prop is true', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Online User',
          online: true,
        },
      })

      const status = wrapper.find('.celestial-avatar__status')
      expect(status.exists()).toBe(true)
      expect(status.classes()).toContain('celestial-avatar__status--online')
      expect(status.attributes('aria-label')).toBe('Status: online')
    })

    it('applies custom statusColor when provided', () => {
      const wrapper = mount(CAvatar, {
        props: {
          alt: 'Custom Status User',
          online: true,
          statusColor: '#10b981',
        },
      })

      const status = wrapper.find('.celestial-avatar__status')
      expect(status.attributes('style')).toContain('background-color: rgb(16, 185, 129)')
    })
  })
})
