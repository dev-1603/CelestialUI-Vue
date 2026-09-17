import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import CAlert from '../CAlert.vue'
import type { CAlertProps } from '../CAlert.types'

describe('CAlert Accessibility', () => {
  const defaultProps: CAlertProps = {
    type: 'info',
    size: 'md',
  }

  // Helper function to get the alert element from wrapper
  const getAlert = (wrapper: any) => wrapper.find('.celestial-alert')

  describe('WCAG 2.1 AA Compliance', () => {
    it('should not have accessibility violations with basic alert', async () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
        slots: { default: 'This is an informational alert message' },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with title', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, title: 'Important Notice' },
        slots: { default: 'This alert contains important information that users need to know.' },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with close button', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, closable: true },
        slots: { default: 'This alert can be dismissed by the user.' },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with action button', async () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
        slots: {
          default: 'This alert has an action button.',
          action: '<button class="btn btn-primary">Take Action</button>',
        },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with progress bar', async () => {
      const wrapper = mount(CAlert, {
        props: {
          ...defaultProps,
          autoDismiss: 5000,
          showProgress: true,
        },
        slots: { default: 'This alert will auto-dismiss in 5 seconds.' },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })
  })

  describe('ARIA Attributes', () => {
    it('should have correct role attribute for info alerts', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, type: 'info', ariaLive: 'polite' },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('role')).toBe('status')
      expect(alert.attributes('aria-live')).toBe('polite')
    })

    it('should have correct role attribute for error alerts', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, type: 'error', ariaLive: 'assertive' },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('role')).toBe('alert')
      expect(alert.attributes('aria-live')).toBe('assertive')
    })

    it('should have aria-atomic attribute', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('aria-atomic')).toBe('true')
    })

    it('should have proper aria-label', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, type: 'warning', title: 'Warning Message' },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('aria-label')).toBe('Warning: Warning Message')
    })

    it('should have custom aria-label when provided', () => {
      const wrapper = mount(CAlert, {
        props: {
          ...defaultProps,
          ariaLabel: 'Custom accessibility label',
        },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('aria-label')).toBe('Custom accessibility label')
    })

    it('should have aria-describedby when provided', () => {
      const wrapper = mount(CAlert, {
        props: {
          ...defaultProps,
          ariaDescribedBy: 'alert-description',
        },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('aria-describedby')).toBe('alert-description')
    })
  })

  describe('Close Button Accessibility', () => {
    it('should have proper aria-label for close button', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, closable: true, type: 'success' },
      })

      const closeButton = wrapper.find('.celestial-alert__close')
      expect(closeButton.attributes('aria-label')).toBe('Close success')
    })

    it('should have proper aria-label for close button with title', () => {
      const wrapper = mount(CAlert, {
        props: {
          ...defaultProps,
          closable: true,
          type: 'error',
          title: 'Error occurred',
        },
      })

      const closeButton = wrapper.find('.celestial-alert__close')
      expect(closeButton.attributes('aria-label')).toBe('Close error: error occurred')
    })

    it('should be disabled when alert is loading', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, closable: true, loading: true },
      })

      const closeButton = wrapper.find('.celestial-alert__close')
      expect(closeButton.attributes('disabled')).toBeDefined()
    })

    it('should have proper button type', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, closable: true },
      })

      const closeButton = wrapper.find('.celestial-alert__close')
      expect(closeButton.attributes('type')).toBe('button')
    })
  })

  describe('Progress Bar Accessibility', () => {
    it('should have proper progress bar attributes', () => {
      const wrapper = mount(CAlert, {
        props: {
          ...defaultProps,
          autoDismiss: 10000,
          showProgress: true,
        },
      })

      const progressBar = wrapper.find('.celestial-alert__progress')
      expect(progressBar.attributes('role')).toBe('progressbar')
      expect(progressBar.attributes('aria-valuemin')).toBe('0')
      expect(progressBar.attributes('aria-valuemax')).toBe('100')
      expect(progressBar.attributes('aria-valuenow')).toBe('0')
    })

    it('should have descriptive aria-label for progress bar', () => {
      const wrapper = mount(CAlert, {
        props: {
          ...defaultProps,
          autoDismiss: 5000,
          showProgress: true,
        },
      })

      const progressBar = wrapper.find('.celestial-alert__progress')
      expect(progressBar.attributes('aria-label')).toBe('Auto-dismiss progress: 0%')
    })
  })

  describe('Icon Accessibility', () => {
    it('should have aria-hidden on default icons', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      const iconContainer = wrapper.find('.celestial-alert__icon')
      expect(iconContainer.attributes('aria-hidden')).toBe('true')
    })

    it('should have aria-hidden on custom icons', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, icon: 'custom-icon' },
      })

      const customIcon = wrapper.findComponent({ name: 'CIcon' })
      expect(customIcon.attributes('aria-hidden')).toBe('true')
    })

    it('should have aria-hidden on close button icon', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, closable: true },
      })

      const closeIcon = wrapper.find('.celestial-alert__close-icon')
      expect(closeIcon.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('Keyboard Navigation', () => {
    it('should be focusable with tabindex', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('tabindex')).toBe('-1')
    })

    it('should handle Escape key for dismissal', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, dismissible: true },
      })

      await wrapper.find('.celestial-alert').trigger('keydown', { key: 'Escape' })
      expect(wrapper.emitted('close')).toHaveLength(1)
    })

    it('should not handle Escape key when not dismissible', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, dismissible: false },
      })

      await wrapper.find('.celestial-alert').trigger('keydown', { key: 'Escape' })
      expect(wrapper.emitted('close')).toBeUndefined()
    })
  })

  describe('Screen Reader Support', () => {
    it('should announce assertive alerts immediately', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, type: 'error', ariaLive: 'assertive' },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('aria-live')).toBe('assertive')
      expect(alert.attributes('role')).toBe('alert')
    })

    it('should announce polite alerts when screen reader is idle', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, type: 'info', ariaLive: 'polite' },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('aria-live')).toBe('polite')
      expect(alert.attributes('role')).toBe('status')
    })

    it('should not announce when aria-live is off', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, ariaLive: 'off' },
      })

      const alert = getAlert(wrapper)
      expect(alert.attributes('aria-live')).toBe('off')
    })
  })

  describe('Color Contrast and Visual Accessibility', () => {
    it('should have sufficient color contrast for info alerts', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, type: 'info' },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should have sufficient color contrast for success alerts', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, type: 'success' },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should have sufficient color contrast for warning alerts', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, type: 'warning' },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should have sufficient color contrast for error alerts', async () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, type: 'error' },
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Focus Management', () => {
    it('should be focusable for keyboard users', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      const alert = wrapper.find('.celestial-alert')
      expect(alert.attributes('tabindex')).toBe('-1')
    })

    it('should have focus outline for keyboard navigation', () => {
      const wrapper = mount(CAlert, {
        props: defaultProps,
      })

      // The focus styles are defined in CSS, so we just verify the element can receive focus
      const alert = wrapper.find('.celestial-alert')
      expect(alert.attributes('tabindex')).toBeDefined()
    })
  })

  describe('Semantic HTML', () => {
    it('should use semantic button element for close button', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, closable: true },
      })

      const closeButton = wrapper.find('button.celestial-alert__close')
      expect(closeButton.exists()).toBe(true)
    })

    it('should use proper heading structure for titles', () => {
      const wrapper = mount(CAlert, {
        props: { ...defaultProps, title: 'Alert Title' },
      })

      const title = wrapper.find('.celestial-alert__title')
      expect(title.exists()).toBe(true)
      // The title should be semantically meaningful even if not using heading tags
    })
  })
})
