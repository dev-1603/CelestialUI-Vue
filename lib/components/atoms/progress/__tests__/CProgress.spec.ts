import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CProgress from '../CProgress.vue'
import type { CProgressProps } from '../CProgress.types'

describe('CProgress', () => {
  const defaultProps: CProgressProps = {
    value: 50,
    max: 100,
  }

  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(CProgress, {
        props: defaultProps,
      })

      expect(wrapper.find('.celestial-progress').exists()).toBe(true)
      expect(wrapper.find('.celestial-progress__bar').exists()).toBe(true)
      expect(wrapper.find('.celestial-progress__fill').exists()).toBe(true)
    })

    it('applies size classes correctly', () => {
      const sizes = ['sm', 'md', 'lg'] as const

      sizes.forEach((size) => {
        const wrapper = mount(CProgress, {
          props: { ...defaultProps, size },
        })
        expect(wrapper.classes()).toContain(`celestial-progress--${size}`)
        expect(wrapper.find('.celestial-progress__bar').classes()).toContain(
          `celestial-progress__bar--${size}`,
        )
      })
    })

    it('renders label when provided', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, label: 'Test Progress' },
      })

      expect(wrapper.find('.celestial-progress__label').exists()).toBe(true)
      expect(wrapper.find('.celestial-progress__label').text()).toBe('Test Progress')
    })

    it('renders progress text when showPercentage is true', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, showPercentage: true },
      })

      expect(wrapper.find('.celestial-progress__text').exists()).toBe(true)
      expect(wrapper.find('.celestial-progress__text').text()).toBe('50%')
    })

    it('renders progress text when showValue is true', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, showValue: true },
      })

      expect(wrapper.find('.celestial-progress__text').exists()).toBe(true)
      expect(wrapper.find('.celestial-progress__text').text()).toBe('50')
    })

    it('renders both value and percentage when both are enabled', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, showValue: true, showPercentage: true },
      })

      expect(wrapper.find('.celestial-progress__text').text()).toBe('50 / 50%')
    })
  })

  describe('Progress Calculation', () => {
    it('calculates percentage correctly', () => {
      const wrapper = mount(CProgress, {
        props: { value: 25, max: 100, showPercentage: true },
      })

      expect(wrapper.find('.celestial-progress__text').text()).toBe('25%')
    })

    it('handles custom max value', () => {
      const wrapper = mount(CProgress, {
        props: { value: 50, max: 200, showPercentage: true },
      })

      expect(wrapper.find('.celestial-progress__text').text()).toBe('25%')
    })

    it('clamps value to max', () => {
      const wrapper = mount(CProgress, {
        props: { value: 150, max: 100, showPercentage: true },
      })

      expect(wrapper.find('.celestial-progress__text').text()).toBe('100%')
    })

    it('clamps value to minimum of 0', () => {
      const wrapper = mount(CProgress, {
        props: { value: -10, max: 100, showPercentage: true },
      })

      expect(wrapper.find('.celestial-progress__text').text()).toBe('0%')
    })

    it('sets correct progress width', () => {
      const wrapper = mount(CProgress, {
        props: { value: 30, max: 100 },
      })

      const fillElement = wrapper.find('.celestial-progress__fill')
      expect(fillElement.attributes('style')).toContain('width: 30%')
    })
  })

  describe('States', () => {
    it('handles indeterminate state', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, indeterminate: true },
      })

      expect(wrapper.find('.celestial-progress__bar').classes()).toContain(
        'celestial-progress__bar--indeterminate',
      )
      expect(wrapper.find('.celestial-progress__fill').classes()).toContain(
        'celestial-progress__fill--indeterminate',
      )
    })

    it('handles animated state', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, animated: true },
      })

      expect(wrapper.find('.celestial-progress__bar').classes()).toContain(
        'celestial-progress__bar--animated',
      )
      expect(wrapper.find('.celestial-progress__fill').classes()).toContain(
        'celestial-progress__fill--animated',
      )
    })

    it('handles striped state', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, striped: true },
      })

      expect(wrapper.find('.celestial-progress__bar').classes()).toContain(
        'celestial-progress__bar--striped',
      )
      expect(wrapper.find('.celestial-progress__fill').classes()).toContain(
        'celestial-progress__fill--striped',
      )
    })

    it('handles completion state', () => {
      const wrapper = mount(CProgress, {
        props: { value: 100, max: 100 },
      })

      const fillElement = wrapper.find('.celestial-progress__fill')
      expect(fillElement.attributes('style')).toContain('width: 100%')
    })
  })

  describe('Events', () => {
    it('emits complete event when progress reaches 100%', async () => {
      const wrapper = mount(CProgress, {
        props: { value: 100, max: 100 },
      })

      // Wait for next tick to allow watchers to run
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('complete')).toHaveLength(1)
    })

    it('emits change event when value changes', async () => {
      const wrapper = mount(CProgress, {
        props: { value: 50, max: 100 },
      })

      await wrapper.setProps({ value: 75 })
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('change')).toHaveLength(1)
      expect(wrapper.emitted('change')?.[0]).toEqual([75, 75])
    })

    it('emits focus event', async () => {
      const wrapper = mount(CProgress, {
        props: defaultProps,
      })

      await wrapper.find('.celestial-progress__bar').trigger('focus')
      expect(wrapper.emitted('focus')).toHaveLength(1)
    })

    it('emits blur event', async () => {
      const wrapper = mount(CProgress, {
        props: defaultProps,
      })

      await wrapper.find('.celestial-progress__bar').trigger('blur')
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })

    it('does not emit complete multiple times for same completion', async () => {
      const wrapper = mount(CProgress, {
        props: { value: 100, max: 100 },
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('complete')).toHaveLength(1)

      // Trigger another update that doesn't change completion state
      await wrapper.setProps({ value: 100 })
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('complete')).toHaveLength(1)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, label: 'Test Progress' },
      })

      const barElement = wrapper.find('.celestial-progress__bar')
      expect(barElement.attributes('role')).toBe('progressbar')
      expect(barElement.attributes('aria-valuenow')).toBe('50')
      expect(barElement.attributes('aria-valuemin')).toBe('0')
      expect(barElement.attributes('aria-valuemax')).toBe('100')
      expect(barElement.attributes('aria-label')).toBe('Test Progress')
    })

    it('uses custom aria-label when provided', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, ariaLabel: 'Custom Label' },
      })

      const barElement = wrapper.find('.celestial-progress__bar')
      expect(barElement.attributes('aria-label')).toBe('Custom Label')
    })

    it('sets aria-describedby when provided', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, ariaDescribedBy: 'description' },
      })

      const barElement = wrapper.find('.celestial-progress__bar')
      expect(barElement.attributes('aria-describedby')).toBe('description')
    })

    it('handles indeterminate ARIA attributes', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, indeterminate: true },
      })

      const barElement = wrapper.find('.celestial-progress__bar')
      expect(barElement.attributes('role')).toBe('progressbar')
      expect(barElement.attributes('aria-valuenow')).toBeUndefined()
      expect(barElement.attributes('aria-valuemin')).toBeUndefined()
      expect(barElement.attributes('aria-valuemax')).toBeUndefined()
      expect(barElement.attributes('aria-label')).toBe('Loading progress')
    })

    it('is focusable for keyboard navigation', () => {
      const wrapper = mount(CProgress, {
        props: defaultProps,
      })

      const barElement = wrapper.find('.celestial-progress__bar')
      expect(barElement.attributes('tabindex')).toBe('0')
    })
  })

  describe('Custom Formatting', () => {
    it('uses custom text format function', () => {
      const customFormat = (value: number, max: number, percentage: number) =>
        `${value}/${max} (${percentage}%)`

      const wrapper = mount(CProgress, {
        props: { ...defaultProps, textFormat: customFormat },
      })

      expect(wrapper.find('.celestial-progress__text').text()).toBe('50/100 (50%)')
    })
  })

  describe('Slots', () => {
    it('renders label slot', () => {
      const wrapper = mount(CProgress, {
        props: defaultProps,
        slots: {
          label: '<span class="custom-label">Custom Label</span>',
        },
      })

      expect(wrapper.find('.custom-label').exists()).toBe(true)
      expect(wrapper.find('.custom-label').text()).toBe('Custom Label')
    })

    it('renders text slot', () => {
      const wrapper = mount(CProgress, {
        props: defaultProps,
        slots: {
          text: '<span class="custom-text">Custom Text</span>',
        },
      })

      expect(wrapper.find('.custom-text').exists()).toBe(true)
      expect(wrapper.find('.custom-text').text()).toBe('Custom Text')
    })

    it('renders default slot', () => {
      const wrapper = mount(CProgress, {
        props: defaultProps,
        slots: {
          default: '<div class="custom-content">Custom Content</div>',
        },
      })

      expect(wrapper.find('.custom-content').exists()).toBe(true)
      expect(wrapper.find('.custom-content').text()).toBe('Custom Content')
    })

    it('prefers slot content over props', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, label: 'Prop Label', showPercentage: true },
        slots: {
          label: '<span class="slot-label">Slot Label</span>',
          text: '<span class="slot-text">Slot Text</span>',
        },
      })

      expect(wrapper.find('.slot-label').text()).toBe('Slot Label')
      expect(wrapper.find('.slot-text').text()).toBe('Slot Text')
      expect(wrapper.text()).not.toContain('Prop Label')
      expect(wrapper.text()).not.toContain('50%')
    })
  })

  describe('Custom Classes', () => {
    it('applies custom container class', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, customClass: 'custom-container' },
      })

      expect(wrapper.classes()).toContain('custom-container')
    })

    it('applies custom fill class', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, fillClass: 'custom-fill' },
      })

      expect(wrapper.find('.celestial-progress__fill').classes()).toContain('custom-fill')
    })

    it('applies custom text class', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, textClass: 'custom-text', showPercentage: true },
      })

      expect(wrapper.find('.celestial-progress__text').classes()).toContain('custom-text')
    })
  })

  describe('Animation Duration', () => {
    it('applies custom animation duration', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, animationDuration: 500 },
      })

      const barElement = wrapper.find('.celestial-progress__bar')
      const fillElement = wrapper.find('.celestial-progress__fill')

      expect(barElement.attributes('style')).toContain(
        '--celestial-progress-transition: 500ms ease-in-out',
      )
      expect(fillElement.attributes('style')).toContain(
        '--celestial-progress-transition: 500ms ease-in-out',
      )
    })
  })

  describe('Data Attributes', () => {
    it('sets data attributes on fill element', () => {
      const wrapper = mount(CProgress, {
        props: { value: 75, max: 100 },
      })

      const fillElement = wrapper.find('.celestial-progress__fill')
      expect(fillElement.attributes('data-value')).toBe('75')
      expect(fillElement.attributes('data-percentage')).toBe('75')
    })
  })

  describe('Color Scheme Variants', () => {
    it('applies colorScheme classes to fill element', () => {
      const schemes = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'blue', 'green', 'purple', 'red', 'amber']

      schemes.forEach((scheme) => {
        const wrapper = mount(CProgress, {
          props: { ...defaultProps, colorScheme: scheme },
        })

        expect(wrapper.find('.celestial-progress__fill').classes()).toContain(
          `celestial-progress__fill--${scheme}`,
        )
      })
    })
  })

  describe('Header Layout and Slots', () => {
    it('renders header container when label or progressText is provided', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, label: 'Task Progress', showPercentage: true },
      })

      const header = wrapper.find('.celestial-progress__header')
      expect(header.exists()).toBe(true)
      expect(header.classes()).toContain('flex')
      expect(header.classes()).toContain('justify-between')
      expect(wrapper.find('.celestial-progress__label').text()).toBe('Task Progress')
      expect(wrapper.find('.celestial-progress__text').text()).toBe('50%')
    })

    it('renders custom label and text slots inside header', () => {
      const wrapper = mount(CProgress, {
        props: defaultProps,
        slots: {
          label: '<span class="custom-label">Custom Label</span>',
          text: '<span class="custom-val">Custom 50%</span>',
        },
      })

      expect(wrapper.find('.custom-label').text()).toBe('Custom Label')
      expect(wrapper.find('.custom-val').text()).toBe('Custom 50%')
      expect(wrapper.find('.celestial-progress__header').exists()).toBe(true)
    })
  })

  describe('Theme Support', () => {
    it('renders correctly within light theme container', () => {
      const wrapper = mount({
        components: { CProgress },
        template: `
          <div data-theme="light">
            <CProgress :value="50" label="Light Progress" show-percentage />
          </div>
        `,
      })

      expect(wrapper.find('.celestial-progress__label').text()).toBe('Light Progress')
      expect(wrapper.find('.celestial-progress__text').text()).toBe('50%')
    })

    it('renders correctly within dark theme container', () => {
      const wrapper = mount({
        components: { CProgress },
        template: `
          <div data-theme="dark" class="dark cui-dark">
            <CProgress :value="75" label="Dark Progress" show-percentage />
          </div>
        `,
      })

      expect(wrapper.find('.celestial-progress__label').text()).toBe('Dark Progress')
      expect(wrapper.find('.celestial-progress__text').text()).toBe('75%')
    })

    it('renders correctly within celestial theme container', () => {
      const wrapper = mount({
        components: { CProgress },
        template: `
          <div data-theme="celestial">
            <CProgress :value="90" label="Celestial Progress" show-percentage />
          </div>
        `,
      })

      expect(wrapper.find('.celestial-progress__label').text()).toBe('Celestial Progress')
      expect(wrapper.find('.celestial-progress__text').text()).toBe('90%')
    })
  })
})

