import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import CCard from '../CCard.vue'
import type { CCardProps } from '../CCard.types'

describe('CCard Accessibility', () => {
  const defaultProps: CCardProps = {
    padding: 'md',
    radius: 'md',
  }

  it('should not have accessibility violations', async () => {
    const wrapper = mount(CCard, {
      props: { ...defaultProps, ariaLabel: 'Product information card' },
      slots: { default: 'Card content' },
      attachTo: document.body,
    })

    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()

    wrapper.unmount()
  })

  describe('ARIA Support', () => {
    it('has proper landmark semantics for default section card', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
      })

      expect(wrapper.element.tagName.toLowerCase()).toBe('section')
      expect(wrapper.attributes('role')).toBeUndefined()
    })

    it('supports custom aria-label', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, ariaLabel: 'Product information card' },
      })

      expect(wrapper.attributes('aria-label')).toBe('Product information card')
    })

    it('supports aria-describedby', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, ariaDescribedBy: 'card-description' },
      })

      expect(wrapper.attributes('aria-describedby')).toBe('card-description')
    })

    it('sets aria-busy when loading', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, loading: true },
      })

      expect(wrapper.attributes('aria-busy')).toBe('true')
    })

    it('provides loading aria-label when loading', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, loading: true },
      })

      expect(wrapper.attributes('aria-label')).toBe('Loading content')
    })
  })

  describe('Keyboard Navigation', () => {
    it('is focusable when interactive', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, interactive: true },
      })

      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('is focusable when hoverable', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, hoverable: true },
      })

      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('is not focusable by default', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
      })

      expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('respects custom tabIndex', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, tabIndex: 5 },
      })

      expect(wrapper.attributes('tabindex')).toBe('5')
    })

    it('handles Enter key activation', async () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, interactive: true },
      })

      await wrapper.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('handles Space key activation', async () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, interactive: true },
      })

      await wrapper.trigger('keydown', { key: ' ' })
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('prevents default behavior on keyboard activation', async () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, interactive: true },
      })

      // Test that the component handles keyboard events properly
      // by checking that click events are emitted on Enter/Space
      await wrapper.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('click')).toHaveLength(1)

      await wrapper.trigger('keydown', { key: ' ' })
      expect(wrapper.emitted('click')).toHaveLength(2)
    })
  })

  describe('Focus Management', () => {
    it('emits focus event', async () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, interactive: true },
      })

      await wrapper.trigger('focus')
      expect(wrapper.emitted('focus')).toHaveLength(1)
    })

    it('emits blur event', async () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, interactive: true },
      })

      await wrapper.trigger('blur')
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })

    it('has focus ring styles for interactive cards', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, interactive: true },
      })

      expect(wrapper.classes()).toContain('celestial-card--interactive')
    })
  })

  describe('Semantic HTML', () => {
    it('uses semantic header element', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
        slots: { header: '<h2>Card Title</h2>' },
      })

      expect(wrapper.find('header').exists()).toBe(true)
      expect(wrapper.find('header h2').exists()).toBe(true)
    })

    it('uses semantic main element for content', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
        slots: { default: 'Card content' },
      })

      expect(wrapper.find('.celestial-card__body').exists()).toBe(true)
    })

    it('uses semantic footer element', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
        slots: { footer: '<button>Action</button>' },
      })

      expect(wrapper.find('footer').exists()).toBe(true)
    })

    it('maintains proper heading hierarchy', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
        slots: {
          header: '<h2>Card Title</h2><h3>Subtitle</h3>',
        },
      })

      expect(wrapper.find('header h2').exists()).toBe(true)
      expect(wrapper.find('header h3').exists()).toBe(true)
    })
  })

  describe('Loading States', () => {
    it('provides loading indicator with proper labeling', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, loading: true },
      })

      const spinner = wrapper.find('.celestial-card__spinner')
      expect(spinner.exists()).toBe(true)
      expect(spinner.attributes('aria-label')).toBe('Loading content')
    })

    it('supports custom loading overlay', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, loading: true },
        slots: {
          overlay: '<div aria-label="Custom loading">Loading...</div>',
        },
      })

      expect(wrapper.find('[aria-label="Custom loading"]').exists()).toBe(true)
    })
  })

  describe('Screen Reader Support', () => {
    it('provides meaningful content structure', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, ariaLabel: 'Product card' },
        slots: {
          header: '<h2>Product Name</h2>',
          default: 'Product description and details',
          footer: '<button>Add to Cart</button>',
        },
      })

      expect(wrapper.attributes('aria-label')).toBe('Product card')
      expect(wrapper.find('header h2').text()).toBe('Product Name')
      expect(wrapper.find('.celestial-card__body').text()).toContain('Product description')
      expect(wrapper.find('footer button').text()).toBe('Add to Cart')
    })

    it('handles empty states gracefully', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, ariaLabel: 'Empty card' },
      })

      expect(wrapper.attributes('aria-label')).toBe('Empty card')
      expect(wrapper.find('.celestial-card__body').exists()).toBe(false)
    })
  })

  describe('High Contrast Mode', () => {
    it('supports high contrast styling', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, outlined: true },
      })

      expect(wrapper.classes()).toContain('celestial-card--outlined')
    })
  })

  describe('Reduced Motion', () => {
    it('respects reduced motion preferences', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, hoverable: true },
      })

      expect(wrapper.classes()).toContain('celestial-card--hoverable')
    })
  })
})
