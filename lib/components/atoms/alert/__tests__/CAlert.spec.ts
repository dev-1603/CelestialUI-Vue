import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import CAlert from '../CAlert.vue'
import type { CAlertProps } from '../CAlert.types'

// Mock timers for auto-dismiss tests
vi.useFakeTimers()

describe('CAlert', () => {
  const defaultProps: CAlertProps = {
    type: 'info',
    size: 'md',
  }

  // Helper function to get the alert element from wrapper
  const getAlert = (wrapper: any) => wrapper.find('.celestial-alert')

  beforeEach(() => {
    vi.clearAllTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
  })

  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
        slots: { default: 'This is an alert message' },
      })

      const alert = getAlert(wrapper)
      expect(alert.exists()).toBe(true)
      expect(wrapper.text()).toContain('This is an alert message')
      expect(alert.classes()).toContain('celestial-alert--info')
      expect(alert.classes()).toContain('celestial-alert--md')
    })

    it('renders with children prop', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, children: 'Children prop content' },
      })

      expect(wrapper.text()).toContain('Children prop content')
    })

    it('prefers slot content over children prop', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, children: 'Children prop' },
        slots: { default: 'Slot content' },
      })

      expect(wrapper.text()).toContain('Slot content')
      expect(wrapper.text()).not.toContain('Children prop')
    })

    it('applies type classes correctly', () => {
      const types = ['info', 'success', 'warning', 'error'] as const

      types.forEach((type) => {
        const wrapper = mount(CAlert, {
          props: { ...defaultProps, type },
        })
        const alert = getAlert(wrapper)
        expect(alert.classes()).toContain(`celestial-alert--${type}`)
      })
    })

    it('applies size classes correctly', () => {
      const sizes = ['sm', 'md', 'lg'] as const

      sizes.forEach((size) => {
        const wrapper = mount(CAlert, {
          props: { ...defaultProps, size },
        })
        const alert = getAlert(wrapper)
        expect(alert.classes()).toContain(`celestial-alert--${size}`)
      })
    })

    it('applies visual variant classes correctly', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, bordered: true, shadowed: true },
      })

      const alert = getAlert(wrapper)
      expect(alert.classes()).toContain('celestial-alert--bordered')
      expect(alert.classes()).toContain('celestial-alert--shadowed')
    })

    it('applies animation classes correctly', () => {
      const animations = ['fade', 'slide', 'scale'] as const

      animations.forEach((animation) => {
        const wrapper = mount(CAlert, {
          props: { ...defaultProps, animation },
        })
        const alert = getAlert(wrapper)
        expect(alert.classes()).toContain(`celestial-alert--${animation}`)
      })
    })

    it('applies custom class', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, class: 'custom-alert-class' },
      })

      const alert = getAlert(wrapper)
      expect(alert.classes()).toContain('custom-alert-class')
    })
  })

  describe('Title and Content', () => {
    it('displays title prop', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, title: 'Alert Title' },
      })

      expect(wrapper.find('.celestial-alert__title').exists()).toBe(true)
      expect(wrapper.text()).toContain('Alert Title')
    })

    it('displays title slot', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
        slots: { title: 'Custom Title' },
      })

      expect(wrapper.find('.celestial-alert__title').exists()).toBe(true)
      expect(wrapper.text()).toContain('Custom Title')
    })

    it('prefers title slot over title prop', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, title: 'Title Prop' },
        slots: { title: 'Title Slot' },
      })

      expect(wrapper.text()).toContain('Title Slot')
      expect(wrapper.text()).not.toContain('Title Prop')
    })

    it('applies content classes when title is present', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, title: 'Alert Title' },
      })

      expect(wrapper.find('.celestial-alert__content--with-title').exists()).toBe(true)
    })
  })

  describe('Icons', () => {
    it('shows default icon by default', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      expect(wrapper.find('.celestial-alert__icon').exists()).toBe(true)
      expect(wrapper.find('.celestial-alert__default-icon').exists()).toBe(true)
    })

    it('hides icon when showIcon is false', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, showIcon: false },
      })

      expect(wrapper.find('.celestial-alert__icon--hidden').exists()).toBe(true)
    })

    it('shows custom icon when provided', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, icon: 'custom-icon' },
      })

      expect(wrapper.findComponent({ name: 'CIcon' }).exists()).toBe(true)
    })

    it('shows icon slot when provided', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
        slots: { icon: '<span class="custom-icon">Custom</span>' },
      })

      expect(wrapper.find('.custom-icon').exists()).toBe(true)
    })

    it('prefers icon slot over icon prop', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, icon: 'prop-icon' },
        slots: { icon: '<span class="slot-icon">Slot</span>' },
      })

      expect(wrapper.find('.slot-icon').exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'CIcon' }).exists()).toBe(false)
    })
  })

  describe('Close Button', () => {
    it('shows close button when closable is true', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, closable: true },
      })

      expect(wrapper.find('.celestial-alert__close').exists()).toBe(true)
      expect(wrapper.find('.celestial-alert__close--hidden').exists()).toBe(false)
    })

    it('hides close button when closable is false', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, closable: false, dismissible: false },
      })

      expect(wrapper.find('.celestial-alert__close--hidden').exists()).toBe(true)
    })

    it('shows close button when dismissible is true', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, dismissible: true },
      })

      expect(wrapper.find('.celestial-alert__close').exists()).toBe(true)
    })

    it('shows custom close button slot', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, closable: true },
        slots: { close: '<button class="custom-close">×</button>' },
      })

      expect(wrapper.find('.custom-close').exists()).toBe(true)
    })

    it('disables close button when loading', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, closable: true, loading: true },
      })

      const closeButton = wrapper.find('.celestial-alert__close')
      expect(closeButton.attributes('disabled')).toBeDefined()
    })
  })

  describe('States', () => {
    it('handles loading state', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, loading: true },
      })

      const alert = getAlert(wrapper)
      expect(alert.classes()).toContain('celestial-alert--loading')
    })

    it('handles controlled visibility', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, visible: false },
      })

      expect(getAlert(wrapper).exists()).toBe(false)
    })

    it('handles uncontrolled visibility', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      expect(getAlert(wrapper).exists()).toBe(true)
    })
  })

  describe('Events', () => {
    it('emits close event when close button is clicked', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, closable: true },
      })

      await wrapper.find('.celestial-alert__close').trigger('click')
      expect(wrapper.emitted('close')).toHaveLength(1)
    })

    it('emits click event when alert is clicked', async () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      await getAlert(wrapper).trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
    })

    it('emits mouse events', async () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      await getAlert(wrapper).trigger('mouseenter')
      expect(wrapper.emitted('mouseenter')).toHaveLength(1)

      await getAlert(wrapper).trigger('mouseleave')
      expect(wrapper.emitted('mouseleave')).toHaveLength(1)
    })

    it('emits focus and blur events', async () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      await getAlert(wrapper).trigger('focus')
      expect(wrapper.emitted('focus')).toHaveLength(1)

      await getAlert(wrapper).trigger('blur')
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })

    it('emits show and hide events', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, visible: false },
      })

      await wrapper.setProps({ visible: true })
      expect(wrapper.emitted('show')).toHaveLength(1)

      await wrapper.setProps({ visible: false })
      expect(wrapper.emitted('hide')).toHaveLength(1)
    })
  })

  describe('Auto-dismiss', () => {
    it('starts auto-dismiss timer when autoDismiss is set', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, autoDismiss: 5000 },
      })

      expect(wrapper.emitted('autoDismissStart')).toHaveLength(1)
    })

    it('emits auto-dismiss complete event', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, autoDismiss: 1000 },
      })

      vi.advanceTimersByTime(1000)
      expect(wrapper.emitted('autoDismissComplete')).toHaveLength(1)
    })

    it('cancels auto-dismiss when close button is clicked', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, autoDismiss: 5000, closable: true },
      })

      await wrapper.find('.celestial-alert__close').trigger('click')
      expect(wrapper.emitted('autoDismissCancel')).toHaveLength(1)
    })

    it('shows progress bar when showProgress is true', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, autoDismiss: 5000, showProgress: true },
      })

      expect(wrapper.find('.celestial-alert__progress').exists()).toBe(true)
      expect(wrapper.find('.celestial-alert__progress--hidden').exists()).toBe(false)
    })

    it('hides progress bar when showProgress is false', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, autoDismiss: 5000, showProgress: false },
      })

      expect(wrapper.find('.celestial-alert__progress--hidden').exists()).toBe(true)
    })
  })

  describe('Keyboard Navigation', () => {
    it('handles Escape key for dismissal', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, dismissible: true },
      })

      await getAlert(wrapper).trigger('keydown', { key: 'Escape' })
      expect(wrapper.emitted('close')).toHaveLength(1)
    })

    it('does not handle Escape key when not dismissible', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, dismissible: false },
      })

      await getAlert(wrapper).trigger('keydown', { key: 'Escape' })
      expect(wrapper.emitted('close')).toBeUndefined()
    })

    it('ignores other keys', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, dismissible: true },
      })

      await getAlert(wrapper).trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('close')).toBeUndefined()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const wrapper = mount(CAlert, {
        props: {
          ...defaultProps,
          ariaLabel: 'Custom alert',
          ariaDescribedBy: 'description',
          ariaLive: 'polite',
        },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('role')).toBe('status')
      expect(alert.attributes('aria-live')).toBe('polite')
      expect(alert.attributes('aria-label')).toBe('Custom alert')
      expect(alert.attributes('aria-describedby')).toBe('description')
      expect(alert.attributes('aria-atomic')).toBe('true')
    })

    it('uses alert role for assertive aria-live', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, ariaLive: 'assertive' },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('role')).toBe('alert')
    })

    it('generates default aria-label based on type and title', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, type: 'success', title: 'Operation successful' },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('aria-label')).toBe('Success: Operation successful')
    })

    it('has proper close button aria-label', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, closable: true, type: 'warning' },
      })

      const closeButton = wrapper.find('.celestial-alert__close')
      expect(closeButton.attributes('aria-label')).toBe('Close warning')
    })

    it('has progress bar accessibility attributes', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, autoDismiss: 5000, showProgress: true },
      })

      const progressBar = wrapper.find('.celestial-alert__progress')
      expect(progressBar.attributes('role')).toBe('progressbar')
      expect(progressBar.attributes('aria-valuemin')).toBe('0')
      expect(progressBar.attributes('aria-valuemax')).toBe('100')
    })

    it('has tabindex for focus management', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('tabindex')).toBe('-1')
    })
  })

  describe('Action Slot', () => {
    it('renders action slot content', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
        slots: { action: '<button class="action-btn">Action</button>' },
      })

      expect(wrapper.find('.action-btn').exists()).toBe(true)
    })

    it('does not render action container when slot is empty', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      expect(wrapper.find('.celestial-alert__action').exists()).toBe(false)
    })
  })

  describe('Custom Styles', () => {
    it('applies custom style object', () => {
      const wrapper = mount(CAlert, {
        props: {
          ...defaultProps,
          style: { backgroundColor: 'red', color: 'white' },
        },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('style')).toContain('background-color: red')
      expect(alert.attributes('style')).toContain('color: white')
    })

    it('applies custom style string', () => {
      const wrapper = mount(CAlert, {
        props: {
          ...defaultProps,
          style: 'background-color: blue; color: white;',
        },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('style')).toContain('background-color: blue')
      expect(alert.attributes('style')).toContain('color: white')
    })
  })

  describe('Component Methods', () => {
    it('exposes show, hide, and toggle methods', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      const vm = wrapper.vm as any
      expect(typeof vm.show).toBe('function')
      expect(typeof vm.hide).toBe('function')
      expect(typeof vm.toggle).toBe('function')
      expect(typeof vm.startAutoDismiss).toBe('function')
      expect(typeof vm.cancelAutoDismiss).toBe('function')
    })
  })

  describe('Transition Integration', () => {
    it('renders with transition wrapper', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, animation: 'fade' },
      })

      expect(wrapper.findComponent({ name: 'Transition' }).exists()).toBe(true)
    })

    it('does not render transition when animation is none', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, animation: 'none' },
      })

      // The transition should still be there but with no name
      const transition = wrapper.findComponent({ name: 'Transition' })
      expect(transition.exists()).toBe(true)
      expect(transition.attributes('name')).toBe('')
    })
  })
})
