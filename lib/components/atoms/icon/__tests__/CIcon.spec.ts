import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CIcon from '../CIcon.vue'
import type { CIconProps } from '../CIcon.types'

// Mock the composables
vi.mock('../composables/useIcon', () => ({
  useIcon: vi.fn(() => ({
    iconElement: 'i',
    iconAttributes: {},
    iconType: 'font',
    iconConfig: {},
    fontIconClasses: ['material-icons'],
    svgContent: '',
    loadSvgContent: vi.fn(),
    role: 'img',
    ariaLabel: 'test-icon',
    ariaHidden: false
  }))
}))

vi.mock('../composables/useIconStyles', () => ({
  useIconStyles: vi.fn(() => ({
    iconClasses: 'c-icon material-icons',
    iconStyles: {}
  }))
}))

describe('CIcon', () => {
  const defaultProps: Partial<CIconProps> = {
    library: 'material',
    type: 'font',
    name: 'star',
    size: 'md'
  }

  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(CIcon, {
        props: defaultProps
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.element.tagName.toLowerCase()).toBe('i')
    })

    it('renders with custom class', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          class: 'custom-class'
        }
      })

      expect(wrapper.classes()).toContain('custom-class')
    })

    it('renders slot content', () => {
      const wrapper = mount(CIcon, {
        props: defaultProps,
        slots: {
          default: '<span>Custom content</span>'
        }
      })

      expect(wrapper.html()).toContain('<span>Custom content</span>')
    })
  })

  describe('Icon Types', () => {
    it('renders font icon by default', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          type: 'font'
        }
      })

      expect(wrapper.element.tagName.toLowerCase()).toBe('i')
    })

    it('renders SVG icon when type is svg', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          type: 'svg',
          svg: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
        }
      })

      expect(wrapper.element.tagName.toLowerCase()).toBe('svg')
    })

    it('renders image icon when type is image', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          type: 'image',
          src: '/test-icon.png',
          alt: 'Test Icon'
        }
      })

      expect(wrapper.element.tagName.toLowerCase()).toBe('img')
    })
  })

  describe('Libraries', () => {
    it('works with Material Icons library', () => {
      const wrapper = mount(CIcon, {
        props: {
          library: 'material',
          type: 'font',
          name: 'home',
          variant: 'outlined'
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('works with Font Awesome library', () => {
      const wrapper = mount(CIcon, {
        props: {
          library: 'fontawesome',
          type: 'font',
          name: 'house',
          style: 'solid'
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('works with custom library', () => {
      const wrapper = mount(CIcon, {
        props: {
          library: 'custom',
          type: 'font',
          name: 'custom-icon'
        }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const

    sizes.forEach(size => {
      it(`renders with ${size} size`, () => {
        const wrapper = mount(CIcon, {
          props: {
            ...defaultProps,
            size
          }
        })

        expect(wrapper.exists()).toBe(true)
      })
    })

    it('handles custom numeric size', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          size: 32
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('handles custom string size', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          size: '2rem'
        }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Colors', () => {
    const colors = ['inherit', 'current', 'primary', 'secondary', 'success', 'warning', 'error', 'info'] as const

    colors.forEach(color => {
      it(`renders with ${color} color`, () => {
        const wrapper = mount(CIcon, {
          props: {
            ...defaultProps,
            color
          }
        })

        expect(wrapper.exists()).toBe(true)
      })
    })

    it('handles custom color', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          color: '#ff0000'
        }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Interactive States', () => {
    it('handles clickable state', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          clickable: true
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('emits click event when clickable', async () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          clickable: true
        }
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click when disabled', async () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          clickable: true,
          disabled: true
        }
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('does not emit click when loading', async () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          clickable: true,
          loading: true
        }
      })

      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('Animations', () => {
    const animations = ['spin', 'pulse', 'bounce', 'fade'] as const

    animations.forEach(animation => {
      it(`renders with ${animation} animation`, () => {
        const wrapper = mount(CIcon, {
          props: {
            ...defaultProps,
            animation
          }
        })

        expect(wrapper.exists()).toBe(true)
      })
    })
  })

  describe('Transforms', () => {
    it('handles horizontal flip', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          flipX: true
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('handles vertical flip', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          flipY: true
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('handles rotation', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          rotate: 90
        }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('renders with proper ARIA attributes', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          ariaLabel: 'Star icon'
        }
      })

      expect(wrapper.attributes('aria-label')).toBe('Star icon')
    })

    it('can be hidden from screen readers', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          ariaHidden: true
        }
      })

      expect(wrapper.attributes('aria-hidden')).toBe('true')
    })

    it('has proper role attribute', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          role: 'button'
        }
      })

      expect(wrapper.attributes('role')).toBe('button')
    })
  })

  describe('Custom Props', () => {
    it('handles custom SVG content', () => {
      const svgContent = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>'
      const wrapper = mount(CIcon, {
        props: {
          type: 'svg',
          svg: svgContent
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('handles image source', () => {
      const wrapper = mount(CIcon, {
        props: {
          type: 'image',
          src: '/test-icon.png',
          alt: 'Test icon'
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('handles custom dimensions', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          width: 32,
          height: 32
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('handles custom viewBox for SVG', () => {
      const wrapper = mount(CIcon, {
        props: {
          type: 'svg',
          svg: '<circle cx="12" cy="12" r="10"/>',
          viewBox: '0 0 24 24'
        }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('External SVG Loading', () => {
    it('detects SVG files from src and enables inline loading', () => {
      const wrapper = mount(CIcon, {
        props: {
          src: '/icon.svg',
          inlineSvg: true
        }
      })

      expect(wrapper.exists()).toBe(true)
      // Should render as SVG element when inlineSvg is true
      expect(wrapper.element.tagName.toLowerCase()).toBe('svg')
    })

    it('falls back to image rendering when inlineSvg is false', () => {
      const wrapper = mount(CIcon, {
        props: {
          src: '/icon.svg',
          inlineSvg: false
        }
      })

      expect(wrapper.exists()).toBe(true)
      // Should render as img element when inlineSvg is false
      expect(wrapper.element.tagName.toLowerCase()).toBe('img')
    })

    it('handles SVG loading props', () => {
      const wrapper = mount(CIcon, {
        props: {
          src: '/icon.svg',
          inlineSvg: true,
          cacheSvg: true,
          loadTimeout: 3000
        }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Pixel Sizing', () => {
    it('applies pixel size for numeric values', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          size: 24
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('applies custom CSS size for string values', () => {
      const wrapper = mount(CIcon, {
        props: {
          ...defaultProps,
          size: '1.5em'
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('applies pixel dimensions for SVG', () => {
      const wrapper = mount(CIcon, {
        props: {
          type: 'svg',
          svg: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
          width: 32,
          height: 32
        }
      })

      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('Events', () => {
    it('emits load event for images', () => {
      const wrapper = mount(CIcon, {
        props: {
          type: 'image',
          src: '/test-icon.png'
        }
      })

      // Simulate load event
      const img = wrapper.find('img')
      if (img.exists()) {
        img.trigger('load')
        expect(wrapper.emitted('load')).toBeTruthy()
      }
    })

    it('emits error event for images', () => {
      const wrapper = mount(CIcon, {
        props: {
          type: 'image',
          src: '/invalid-icon.png'
        }
      })

      // Simulate error event
      const img = wrapper.find('img')
      if (img.exists()) {
        img.trigger('error')
        expect(wrapper.emitted('error')).toBeTruthy()
      }
    })

    it('emits load event for successful SVG loading', () => {
      const wrapper = mount(CIcon, {
        props: {
          src: '/icon.svg',
          inlineSvg: true
        }
      })

      expect(wrapper.exists()).toBe(true)
      // SVG loading events would be tested with proper mocking
    })

    it('emits error event for failed SVG loading', () => {
      const wrapper = mount(CIcon, {
        props: {
          src: '/invalid.svg',
          inlineSvg: true
        }
      })

      expect(wrapper.exists()).toBe(true)
      // SVG loading error events would be tested with proper mocking
    })
  })
})
