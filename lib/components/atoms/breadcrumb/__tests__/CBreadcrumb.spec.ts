import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import CBreadcrumb from '../CBreadcrumb.vue'
import type { BreadcrumbItem } from '../CBreadcrumb.types'

/**
 * Test suite for CBreadcrumb component
 *
 * Tests cover:
 * - Rendering and props
 * - Navigation events
 * - Accessibility features
 * - Truncation logic
 * - Custom slots
 * - Edge cases
 */

describe('CBreadcrumb', () => {
  let wrapper: VueWrapper<any>

  const mockItems: BreadcrumbItem[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'products', label: 'Products', href: '/products' },
    { id: 'category', label: 'Electronics', href: '/products/electronics' },
    { id: 'product', label: 'Smartphone', href: '/products/electronics/smartphone' },
  ]

  const originalLocation = window.location

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: { href: 'http://localhost/' },
      writable: true
    })
  })

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true
    })
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Rendering', () => {
    it('renders breadcrumb items correctly', () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: mockItems },
      })

      expect(wrapper.find('.c-breadcrumb').exists()).toBe(true)
      expect(wrapper.findAll('.c-breadcrumb__item')).toHaveLength(4)
      expect(wrapper.text()).toContain('Home')
      expect(wrapper.text()).toContain('Products')
      expect(wrapper.text()).toContain('Electronics')
      expect(wrapper.text()).toContain('Smartphone')
    })

    it('renders with custom separator', () => {
      wrapper = mount(CBreadcrumb, {
        props: {
          items: mockItems,
          separator: '>',
        },
      })

      expect(wrapper.text()).toContain('>')
      expect(wrapper.findAll('.c-breadcrumb__separator')).toHaveLength(3)
    })

    it('applies compact class when compact prop is true', () => {
      wrapper = mount(CBreadcrumb, {
        props: {
          items: mockItems,
          compact: true,
        },
      })

      expect(wrapper.find('.c-breadcrumb-container--compact').exists()).toBe(true)
    })

    it('applies custom class', () => {
      wrapper = mount(CBreadcrumb, {
        props: {
          items: mockItems,
          class: 'custom-breadcrumb',
        },
      })

      expect(wrapper.find('.custom-breadcrumb').exists()).toBe(true)
    })
  })

  describe('Navigation', () => {
    it('emits navigate event when item is clicked', async () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: mockItems },
      })

      const productLink = wrapper.find('a[href="/products"]')
      await productLink.trigger('click')

      expect(wrapper.emitted('navigate')).toBeTruthy()
      expect(wrapper.emitted('navigate')?.[0]).toEqual([
        mockItems[1], // products item
        1, // index
      ])
    })

    it('emits home event when home item is clicked', async () => {
      wrapper = mount(CBreadcrumb, {
        props: {
          items: mockItems,
          showHome: true,
        },
      })

      const homeLink = wrapper.find('a[href="/"]')
      await homeLink.trigger('click')

      expect(wrapper.emitted('home')).toBeTruthy()
    })

    it('does not emit navigate for disabled items', async () => {
      const itemsWithDisabled: BreadcrumbItem[] = [
        ...mockItems,
        { id: 'disabled', label: 'Disabled', disabled: true },
      ]

      wrapper = mount(CBreadcrumb, {
        props: { items: itemsWithDisabled },
      })

      const disabledItem = wrapper.find('.c-breadcrumb__link--disabled')
      await disabledItem.trigger('click')

      expect(wrapper.emitted('navigate')).toBeFalsy()
    })

    it('handles keyboard navigation', async () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: mockItems },
      })

      const productLink = wrapper.find('a[href="/products"]')
      await productLink.trigger('keydown.enter')

      expect(wrapper.emitted('navigate')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: mockItems },
      })

      const nav = wrapper.find('nav')
      expect(nav.attributes('role')).toBe('navigation')
      expect(nav.attributes('aria-label')).toBe('Breadcrumb navigation')
    })

    it('uses custom aria-label when provided', () => {
      wrapper = mount(CBreadcrumb, {
        props: {
          items: mockItems,
          ariaLabel: 'Custom breadcrumb',
        },
      })

      const nav = wrapper.find('nav')
      expect(nav.attributes('aria-label')).toBe('Custom breadcrumb')
    })

    it('marks last item as current page', () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: mockItems },
      })

      const lastItem = wrapper.findAll('.c-breadcrumb__item').at(-1)
      const lastLink = lastItem?.find('.c-breadcrumb__link')

      expect(lastLink?.attributes('aria-current')).toBe('page')
    })

    it('has proper semantic structure with ol/li', () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: mockItems },
      })

      expect(wrapper.find('ol.c-breadcrumb').exists()).toBe(true)
      expect(wrapper.findAll('li.c-breadcrumb__item')).toHaveLength(4)
    })

    it('separators have aria-hidden attribute', () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: mockItems },
      })

      const separators = wrapper.findAll('.c-breadcrumb__separator')
      separators.forEach((separator) => {
        expect(separator.attributes('aria-hidden')).toBe('true')
      })
    })
  })

  describe('Truncation', () => {
    it('truncates items when maxItems is exceeded', () => {
      wrapper = mount(CBreadcrumb, {
        props: {
          items: mockItems,
          maxItems: 2,
        },
      })

      // Should show first item, truncated indicator, and last item
      expect(wrapper.findAll('.c-breadcrumb__item')).toHaveLength(3)
      expect(wrapper.text()).toContain('...')
    })

    it('shows all items when within maxItems limit', () => {
      wrapper = mount(CBreadcrumb, {
        props: {
          items: mockItems,
          maxItems: 10,
        },
      })

      expect(wrapper.findAll('.c-breadcrumb__item')).toHaveLength(4)
      expect(wrapper.text()).not.toContain('...')
    })

    it('truncated items are not clickable', async () => {
      wrapper = mount(CBreadcrumb, {
        props: {
          items: mockItems,
          maxItems: 2,
        },
      })

      const truncatedItem = wrapper.find('.c-breadcrumb__link--truncated')
      await truncatedItem.trigger('click')

      expect(wrapper.emitted('navigate')).toBeFalsy()
    })
  })

  describe('Home Item', () => {
    it('shows home item when showHome is true', () => {
      wrapper = mount(CBreadcrumb, {
        props: {
          items: mockItems,
          showHome: true,
        },
      })

      expect(wrapper.findAll('.c-breadcrumb__item')).toHaveLength(5) // 4 items + home
      expect(wrapper.text()).toContain('Home')
    })

    it('uses custom home item when provided', () => {
      const customHome: BreadcrumbItem = {
        id: 'custom-home',
        label: 'Dashboard',
        href: '/dashboard',
      }

      wrapper = mount(CBreadcrumb, {
        props: {
          items: mockItems,
          showHome: true,
          homeItem: customHome,
        },
      })

      expect(wrapper.text()).toContain('Dashboard')
      expect(wrapper.find('a[href="/dashboard"]').exists()).toBe(true)
    })
  })

  describe('Slots', () => {
    it('renders custom item slot', () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: mockItems },
        slots: {
          item: `<template #item="{ item, index }">
            <span class="custom-item">{{ item.label }} ({{ index }})</span>
          </template>`,
        },
      })

      expect(wrapper.find('.custom-item').exists()).toBe(true)
      expect(wrapper.text()).toContain('Home (0)')
    })

    it('renders custom separator slot', () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: mockItems },
        slots: {
          separator: '<span class="custom-separator">→</span>',
        },
      })

      expect(wrapper.findAll('.custom-separator')).toHaveLength(3)
      expect(wrapper.text()).toContain('→')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty items array', () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: [] },
      })

      expect(wrapper.findAll('.c-breadcrumb__item')).toHaveLength(0)
    })

    it('handles single item', () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: [mockItems[0]] },
      })

      expect(wrapper.findAll('.c-breadcrumb__item')).toHaveLength(1)
      expect(wrapper.findAll('.c-breadcrumb__separator')).toHaveLength(0)
    })

    it('handles items without href', () => {
      const itemsWithoutHref: BreadcrumbItem[] = [
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2' },
      ]

      wrapper = mount(CBreadcrumb, {
        props: { items: itemsWithoutHref },
      })

      // Should render as buttons instead of links
      expect(wrapper.findAll('button.c-breadcrumb__link')).toHaveLength(1) // Last item is span
      expect(wrapper.findAll('a.c-breadcrumb__link')).toHaveLength(0)
    })

    it('handles external links', () => {
      const itemsWithExternal: BreadcrumbItem[] = [
        { id: 'external', label: 'External', href: 'https://example.com' },
        { id: 'current', label: 'Current' },
      ]

      wrapper = mount(CBreadcrumb, {
        props: { items: itemsWithExternal },
      })

      const externalLink = wrapper.find('a[href="https://example.com"]')
      expect(externalLink.exists()).toBe(true)
    })
  })

  describe('Component Structure', () => {
    it('renders correct HTML structure', () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: mockItems },
      })

      // Check for proper nesting
      expect(wrapper.find('nav > ol.c-breadcrumb').exists()).toBe(true)
      expect(wrapper.findAll('ol.c-breadcrumb > li.c-breadcrumb__item')).toHaveLength(4)
    })

    it('applies correct CSS classes', () => {
      wrapper = mount(CBreadcrumb, {
        props: { items: mockItems },
      })

      expect(wrapper.find('.c-breadcrumb-container').exists()).toBe(true)
      expect(wrapper.find('.c-breadcrumb').exists()).toBe(true)
      expect(wrapper.findAll('.c-breadcrumb__item')).toHaveLength(4)
      expect(wrapper.findAll('.c-breadcrumb__link')).toHaveLength(4)
      expect(wrapper.findAll('.c-breadcrumb__separator')).toHaveLength(3)
    })
  })
})
