import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CCard from '../CCard.vue'
import type { CCardProps } from '../CCard.types'

describe('CCard', () => {
  const defaultProps: CCardProps = {
    padding: 'md',
    radius: 'md',
  }

  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
        slots: { default: 'Card content' },
      })

      expect(wrapper.find('section').exists()).toBe(true)
      expect(wrapper.text()).toBe('Card content')
      expect(wrapper.classes()).toContain('celestial-card')
      expect(wrapper.classes()).toContain('celestial-card--padding-md')
      expect(wrapper.classes()).toContain('celestial-card--radius-md')
    })

    it('renders as specified component via as prop', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, as: 'article' },
        slots: { default: 'Article content' },
      })

      expect(wrapper.find('article').exists()).toBe(true)
      expect(wrapper.find('section').exists()).toBe(false)
    })

    it('applies padding classes correctly', () => {
      const paddingVariants = ['none', 'sm', 'md', 'lg'] as const

      paddingVariants.forEach((padding) => {
        const wrapper = mount(CCard, {
          props: { ...defaultProps, padding },
        })
        expect(wrapper.classes()).toContain(`celestial-card--padding-${padding}`)
      })
    })

    it('applies radius classes correctly', () => {
      const radiusVariants = ['none', 'sm', 'md', 'lg', 'full'] as const

      radiusVariants.forEach((radius) => {
        const wrapper = mount(CCard, {
          props: { ...defaultProps, radius },
        })
        expect(wrapper.classes()).toContain(`celestial-card--radius-${radius}`)
      })
    })

    it('applies visual variant classes correctly', () => {
      const wrapper = mount(CCard, {
        props: {
          ...defaultProps,
          elevated: true,
          outlined: true,
          hoverable: true,
        },
      })

      expect(wrapper.classes()).toContain('celestial-card--elevated')
      expect(wrapper.classes()).toContain('celestial-card--outlined')
      expect(wrapper.classes()).toContain('celestial-card--hoverable')
    })
  })

  describe('Slots', () => {
    it('renders header slot', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
        slots: {
          header: '<h2>Card Title</h2>',
          default: 'Card content',
        },
      })

      expect(wrapper.find('header').exists()).toBe(true)
      expect(wrapper.find('h2').text()).toBe('Card Title')
      expect(wrapper.find('header').classes()).toContain('celestial-card__header')
    })

    it('renders media slot', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
        slots: {
          media: '<img src="test.jpg" alt="Test" />',
          default: 'Card content',
        },
      })

      expect(wrapper.find('.celestial-card__media').exists()).toBe(true)
      expect(wrapper.find('img').exists()).toBe(true)
    })

    it('renders footer slot', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
        slots: {
          default: 'Card content',
          footer: '<button>Action</button>',
        },
      })

      expect(wrapper.find('footer').exists()).toBe(true)
      expect(wrapper.find('button').text()).toBe('Action')
      expect(wrapper.find('footer').classes()).toContain('celestial-card__footer')
    })

    it('renders actions slot', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
        slots: {
          default: 'Card content',
          actions: '<button>Secondary Action</button>',
        },
      })

      expect(wrapper.find('.celestial-card__actions').exists()).toBe(true)
      expect(wrapper.find('button').text()).toBe('Secondary Action')
    })

    it('renders overlay slot', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
        slots: {
          default: 'Card content',
          overlay: '<div class="skeleton">Loading...</div>',
        },
      })

      expect(wrapper.find('.celestial-card__overlay').exists()).toBe(true)
      expect(wrapper.find('.skeleton').text()).toBe('Loading...')
    })

    it('renders children prop content', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, children: 'Children Prop Text' },
      })

      expect(wrapper.text()).toContain('Children Prop Text')
    })

    it('prefers slot content over children prop', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, children: 'Children Prop' },
        slots: { default: 'Slot Content' },
      })

      expect(wrapper.text()).toContain('Slot Content')
      expect(wrapper.text()).not.toContain('Children Prop')
    })
  })

  describe('States', () => {
    it('handles loading state', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, loading: true },
      })

      expect(wrapper.classes()).toContain('celestial-card--loading')
      expect(wrapper.attributes('aria-busy')).toBe('true')
      expect(wrapper.find('.celestial-card__spinner').exists()).toBe(true)
    })

    it('handles interactive state', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, interactive: true },
      })

      expect(wrapper.classes()).toContain('celestial-card--interactive')
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('handles hoverable state', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, hoverable: true },
      })

      expect(wrapper.classes()).toContain('celestial-card--hoverable')
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('sets custom tab index', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, tabIndex: 5 },
      })

      expect(wrapper.attributes('tabindex')).toBe('5')
    })
  })

  describe('Events', () => {
    it('emits click event when interactive', async () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, interactive: true },
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('emits click event when hoverable', async () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, hoverable: true },
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('does not emit click when not interactive', async () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeUndefined()
    })

    it('emits mouse events', async () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
      })

      await wrapper.trigger('mouseenter')
      expect(wrapper.emitted('mouseenter')).toHaveLength(1)

      await wrapper.trigger('mouseleave')
      expect(wrapper.emitted('mouseleave')).toHaveLength(1)
    })

    it('emits focus and blur events', async () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
      })

      await wrapper.trigger('focus')
      expect(wrapper.emitted('focus')).toHaveLength(1)

      await wrapper.trigger('blur')
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })

    it('handles keyboard events for interactive cards', async () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, interactive: true },
      })

      await wrapper.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('click')).toHaveLength(1)
      expect(wrapper.emitted('keydown')).toHaveLength(1)

      await wrapper.trigger('keydown', { key: ' ' })
      expect(wrapper.emitted('click')).toHaveLength(2)
      expect(wrapper.emitted('keydown')).toHaveLength(2)
    })

    it('does not handle keyboard events for non-interactive cards', async () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
      })

      await wrapper.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('click')).toBeUndefined()
      expect(wrapper.emitted('keydown')).toBeUndefined()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const wrapper = mount(CCard, {
        props: {
          ...defaultProps,
          ariaLabel: 'Custom card label',
          ariaDescribedBy: 'description',
        },
      })

      expect(wrapper.attributes('aria-label')).toBe('Custom card label')
      expect(wrapper.attributes('aria-describedby')).toBe('description')
      expect(wrapper.element.tagName.toLowerCase()).toBe('section')
      expect(wrapper.attributes('role')).toBeUndefined()
    })

    it('sets aria-label to "Loading content" when loading', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, loading: true },
      })

      expect(wrapper.attributes('aria-label')).toBe('Loading content')
    })

    it('sets aria-busy when loading', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, loading: true },
      })

      expect(wrapper.attributes('aria-busy')).toBe('true')
    })

    it('sets tabindex to -1 for non-interactive cards', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
      })

      expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('sets tabindex to 0 for interactive cards', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, interactive: true },
      })

      expect(wrapper.attributes('tabindex')).toBe('0')
    })
  })

  describe('Styling', () => {
    it('applies custom class', () => {
      const wrapper = mount(CCard, {
        props: { ...defaultProps, class: 'custom-card-class' },
      })

      expect(wrapper.classes()).toContain('custom-card-class')
    })

    it('applies custom styles as object', () => {
      const wrapper = mount(CCard, {
        props: {
          ...defaultProps,
          style: { backgroundColor: 'red', color: 'white' },
        },
      })

      expect(wrapper.attributes('style')).toContain('background-color: red')
      expect(wrapper.attributes('style')).toContain('color: white')
    })

    it('applies custom styles as string', () => {
      const wrapper = mount(CCard, {
        props: {
          ...defaultProps,
          style: 'background-color: blue; color: white;',
        },
      })

      expect(wrapper.attributes('style')).toContain('background-color: blue')
      expect(wrapper.attributes('style')).toContain('color: white')
    })

    it('applies maxWidth and height styles', () => {
      const wrapper = mount(CCard, {
        props: {
          ...defaultProps,
          maxWidth: 300,
          height: '200px',
        },
      })

      expect(wrapper.attributes('style')).toContain('max-width: 300px')
      expect(wrapper.attributes('style')).toContain('height: 200px')
    })
  })

  describe('Semantic Structure', () => {
    it('uses semantic HTML elements', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
        slots: {
          header: '<h2>Title</h2>',
          default: 'Content',
          footer: '<button>Action</button>',
        },
      })

      expect(wrapper.find('header').exists()).toBe(true)
      expect(wrapper.find('.celestial-card__body').exists()).toBe(true)
      expect(wrapper.find('footer').exists()).toBe(true)
    })

    it('maintains proper heading hierarchy in header', () => {
      const wrapper = mount(CCard, {
        props: defaultProps,
        slots: {
          header: '<h2>Card Title</h2><p>Subtitle</p>',
        },
      })

      expect(wrapper.find('header h2').exists()).toBe(true)
      expect(wrapper.find('header p').exists()).toBe(true)
    })
  })
})
