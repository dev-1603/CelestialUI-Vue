import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CButton from '../CButton.vue'
import type { CButtonProps } from '../CButton.types'

describe('CButton', () => {
  const defaultProps: CButtonProps = {
    variant: 'primary',
    size: 'md'
  }

  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(CButton, {
        props: defaultProps,
        slots: { default: 'Click me' }
      })

      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.text()).toBe('Click me')
      expect(wrapper.classes()).toContain('celestial-button--primary')
      expect(wrapper.classes()).toContain('celestial-button--md')
    })

    it('renders as anchor when href is provided', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, href: 'https://example.com' },
        slots: { default: 'Link' }
      })

      expect(wrapper.find('a').exists()).toBe(true)
      expect(wrapper.attributes('href')).toBe('https://example.com')
    })

    it('applies variant classes correctly', () => {
      const variants = ['primary', 'secondary', 'outline', 'ghost', 'link'] as const

      variants.forEach(variant => {
        const wrapper = mount(CButton, {
          props: { ...defaultProps, variant }
        })
        expect(wrapper.classes()).toContain(`celestial-button--${variant}`)
      })
    })

    it('applies size classes correctly', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

      sizes.forEach(size => {
        const wrapper = mount(CButton, {
          props: { ...defaultProps, size }
        })
        expect(wrapper.classes()).toContain(`celestial-button--${size}`)
      })
    })

    it('applies rounded classes correctly', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, rounded: true }
      })
      expect(wrapper.classes()).toContain('celestial-button--rounded')

      const roundedVariants = ['sm', 'md', 'lg', 'xl', 'full'] as const
      roundedVariants.forEach(rounded => {
        const wrapper = mount(CButton, {
          props: { ...defaultProps, rounded }
        })
        expect(wrapper.classes()).toContain(`celestial-button--rounded-${rounded}`)
      })
    })
  })

  describe('States', () => {
    it('handles disabled state', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, disabled: true }
      })

      expect(wrapper.attributes('disabled')).toBeDefined()
      expect(wrapper.classes()).toContain('celestial-button--disabled')
    })

    it('handles loading state', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, loading: true }
      })

      expect(wrapper.find('[data-loading="true"]').exists()).toBe(true)
      expect(wrapper.classes()).toContain('celestial-button--loading')
    })

        it('handles fullWidth state', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, fullWidth: true }
      })

      expect(wrapper.classes()).toContain('celestial-button--block')
    })

    it('shows loading icon when loading', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, loading: true, leftIcon: 'test' }
      })

      // Loading icon should be shown
      expect(wrapper.find('[data-loading="true"]').exists()).toBe(true)
      // Left icon should not be shown when loading
      expect(wrapper.text()).not.toContain('test')
    })
  })

  describe('Icons', () => {
    it('displays left icon', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, leftIcon: 'test-icon' }
      })

      expect(wrapper.text()).toContain('test-icon')
    })

    it('displays right icon', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, rightIcon: 'test-icon' }
      })

      expect(wrapper.text()).toContain('test-icon')
    })

    it('hides right icon when loading', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, rightIcon: 'test-icon', loading: true }
      })

      // Loading icon should be present
      expect(wrapper.find('[data-loading="true"]').exists()).toBe(true)
      // Right icon text should not be present when loading
      const iconSpans = wrapper.findAll('span').filter(span => span.text() === 'test-icon')
      expect(iconSpans).toHaveLength(0)
    })
  })

    describe('Events', () => {
    it('emits click event', async () => {
      const wrapper = mount(CButton, {
        props: defaultProps
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('emits mouse events', async () => {
      const wrapper = mount(CButton, {
        props: defaultProps
      })

      await wrapper.trigger('mouseenter')
      expect(wrapper.emitted('mouseenter')).toHaveLength(1)

      await wrapper.trigger('mouseleave')
      expect(wrapper.emitted('mouseleave')).toHaveLength(1)
    })

    it('does not emit click when disabled', async () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, disabled: true }
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('does not emit click when loading', async () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, loading: true }
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('emits focus and blur events', async () => {
      const wrapper = mount(CButton, {
        props: defaultProps
      })

      await wrapper.trigger('focus')
      expect(wrapper.emitted('focus')).toHaveLength(1)

      await wrapper.trigger('blur')
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const wrapper = mount(CButton, {
        props: {
          ...defaultProps,
          ariaLabel: 'Custom label',
          ariaDescribedBy: 'description'
        }
      })

      expect(wrapper.attributes('aria-label')).toBe('Custom label')
      expect(wrapper.attributes('aria-describedby')).toBe('description')
    })

    it('sets aria-label to "Loading" when loading', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, loading: true }
      })

      expect(wrapper.attributes('aria-label')).toBe('Loading')
    })

    it('sets aria-disabled when disabled', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, disabled: true }
      })

      expect(wrapper.attributes('aria-disabled')).toBe('true')
    })

    it('handles keyboard navigation for buttons', async () => {
      const wrapper = mount(CButton, {
        props: defaultProps
      })

      await wrapper.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('click')).toHaveLength(1)

      await wrapper.trigger('keydown', { key: ' ' })
      expect(wrapper.emitted('click')).toHaveLength(2)
    })

    it('does not handle keyboard events for links', async () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, href: 'https://example.com' }
      })

      await wrapper.trigger('keydown', { key: 'Enter' })
      // Links should not emit click events on keyboard interaction
      // (browser handles this natively)
      expect(wrapper.emitted('click')).toBeUndefined()
    })
  })

  describe('Button Types', () => {
    it('sets correct button type', () => {
      const types = ['button', 'submit', 'reset'] as const

      types.forEach(type => {
        const wrapper = mount(CButton, {
          props: { ...defaultProps, type }
        })
        expect(wrapper.attributes('type')).toBe(type)
      })
    })

    it('sets target attribute for links', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, href: 'https://example.com', target: '_blank' }
      })

      expect(wrapper.attributes('target')).toBe('_blank')
    })
  })

    describe('Children Prop', () => {
    it('renders children prop content', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, children: 'Children Prop Text' }
      })

      expect(wrapper.text()).toContain('Children Prop Text')
    })

    it('prefers slot content over children prop', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, children: 'Children Prop' },
        slots: { default: 'Slot Content' }
      })

      expect(wrapper.text()).toContain('Slot Content')
      expect(wrapper.text()).not.toContain('Children Prop')
    })
  })

  describe('Polymorphic Support', () => {
    it('renders as specified component via as prop', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, as: 'div' }
      })

      expect(wrapper.find('div').exists()).toBe(true)
      expect(wrapper.find('button').exists()).toBe(false)
    })

    it('prefers as prop over href logic', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, href: 'https://example.com', as: 'button' }
      })

      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('a').exists()).toBe(false)
    })
  })

  describe('Download Attribute', () => {
    it('sets download attribute when provided', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, download: 'file.pdf' }
      })

      expect(wrapper.attributes('download')).toBe('file.pdf')
    })

    it('sets download attribute as boolean', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, download: true }
      })

      expect(wrapper.attributes('download')).toBeDefined()
    })
  })

  describe('Slot Content', () => {
    it('renders slot content', () => {
      const wrapper = mount(CButton, {
        props: defaultProps,
        slots: { default: '<strong>Bold text</strong>' }
      })

      expect(wrapper.html()).toContain('<strong>Bold text</strong>')
    })

    it('supports custom icon slots', () => {
      const wrapper = mount(CButton, {
        props: defaultProps,
        slots: {
          leftIcon: '<svg class="custom-left-icon">Left</svg>',
          rightIcon: '<svg class="custom-right-icon">Right</svg>'
        }
      })

      expect(wrapper.html()).toContain('custom-left-icon')
      expect(wrapper.html()).toContain('custom-right-icon')
    })

    it('supports custom loading spinner slot', () => {
      const wrapper = mount(CButton, {
        props: { ...defaultProps, loading: true },
        slots: {
          loadingSpinner: '<div class="custom-spinner">Loading...</div>'
        }
      })

      expect(wrapper.html()).toContain('custom-spinner')
    })

    it('handles empty slot', () => {
      const wrapper = mount(CButton, {
        props: defaultProps
      })

      // Should still render but without text content
      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.text().trim()).toBe('')
    })
  })
})
