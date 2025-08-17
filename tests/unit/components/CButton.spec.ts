import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CButton from '../../../lib/components/ui/button/CButton.vue'

// Mock the icon component
vi.mock('../../../lib/components/ui/icon/CIcon.vue', () => ({
  default: {
    name: 'CIcon',
    props: ['name', 'spin'],
    template: '<i :class="name" :data-spin="spin"></i>'
  }
}))

describe('CButton', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(CButton, {
      slots: {
        default: 'Test Button'
      }
    })

    expect(wrapper.text()).toContain('Test Button')
    expect(wrapper.classes()).toContain('cui-button')
    expect(wrapper.classes()).toContain('cui-button--primary')
    expect(wrapper.classes()).toContain('cui-button--md')
  })

  it('applies variant classes correctly', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive']

    variants.forEach(variant => {
      const wrapper = mount(CButton, {
        props: { variant },
        slots: { default: 'Test' }
      })

      expect(wrapper.classes()).toContain(`cui-button--${variant}`)
    })
  })

  it('applies size classes correctly', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

    sizes.forEach(size => {
      const wrapper = mount(CButton, {
        props: { size },
        slots: { default: 'Test' }
      })

      expect(wrapper.classes()).toContain(`cui-button--${size}`)
    })
  })

  it('handles disabled state', () => {
    const wrapper = mount(CButton, {
      props: { disabled: true },
      slots: { default: 'Test' }
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('cui-button--disabled')
  })

  it('handles loading state', () => {
    const wrapper = mount(CButton, {
      props: { loading: true },
      slots: { default: 'Test' }
    })

    expect(wrapper.classes()).toContain('cui-button--loading')
    expect(wrapper.find('.cui-button__loading').exists()).toBe(true)
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('renders left icon when provided', () => {
    const wrapper = mount(CButton, {
      props: { leftIcon: 'star' },
      slots: { default: 'Test' }
    })

    const leftIcon = wrapper.find('.cui-button__icon--left')
    expect(leftIcon.exists()).toBe(true)
    expect(wrapper.classes()).toContain('cui-button--with-left-icon')
  })

  it('renders right icon when provided', () => {
    const wrapper = mount(CButton, {
      props: { rightIcon: 'chevron-right' },
      slots: { default: 'Test' }
    })

    const rightIcon = wrapper.find('.cui-button__icon--right')
    expect(rightIcon.exists()).toBe(true)
    expect(wrapper.classes()).toContain('cui-button--with-right-icon')
  })

  it('handles icon-only mode', () => {
    const wrapper = mount(CButton, {
      props: {
        iconOnly: true,
        leftIcon: 'star'
      }
    })

    expect(wrapper.classes()).toContain('cui-button--icon-only')
    expect(wrapper.find('.cui-button__content').exists()).toBe(false)
  })

  it('handles full-width mode', () => {
    const wrapper = mount(CButton, {
      props: { fullWidth: true },
      slots: { default: 'Test' }
    })

    expect(wrapper.classes()).toContain('cui-button--full-width')
  })

  it('handles rounded mode', () => {
    const wrapper = mount(CButton, {
      props: { rounded: true },
      slots: { default: 'Test' }
    })

    expect(wrapper.classes()).toContain('cui-button--rounded')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(CButton, {
      slots: { default: 'Test' }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(CButton, {
      props: { disabled: true },
      slots: { default: 'Test' }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(CButton, {
      props: { loading: true },
      slots: { default: 'Test' }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('emits focus and blur events', async () => {
    const wrapper = mount(CButton, {
      slots: { default: 'Test' }
    })

    await wrapper.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await wrapper.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('renders as different tag when specified', () => {
    const wrapper = mount(CButton, {
      props: { tag: 'a', href: 'https://example.com' },
      slots: { default: 'Link' }
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('a')
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('applies custom class and style', () => {
    const wrapper = mount(CButton, {
      props: {
        class: 'custom-class',
        style: { backgroundColor: 'red' }
      },
      slots: { default: 'Test' }
    })

    expect(wrapper.classes()).toContain('custom-class')
    expect(wrapper.attributes('style')).toContain('background-color: red')
  })

  it('sets correct button type', () => {
    const wrapper = mount(CButton, {
      props: { type: 'submit' },
      slots: { default: 'Submit' }
    })

    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('hides icons when loading', () => {
    const wrapper = mount(CButton, {
      props: {
        loading: true,
        leftIcon: 'star',
        rightIcon: 'chevron-right'
      },
      slots: { default: 'Loading' }
    })

    expect(wrapper.find('.cui-button__icon--left').exists()).toBe(false)
    expect(wrapper.find('.cui-button__icon--right').exists()).toBe(false)
    expect(wrapper.find('.cui-button__loading').exists()).toBe(true)
  })

  it('renders slot content correctly', () => {
    const wrapper = mount(CButton, {
      slots: {
        default: '<span>Custom Content</span>'
      }
    })

    expect(wrapper.html()).toContain('<span>Custom Content</span>')
  })
})
