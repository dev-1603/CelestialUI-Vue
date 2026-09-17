import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import CProgress from '../CProgress.vue'
import type { CProgressProps } from '../CProgress.types'

describe('CProgress Accessibility', () => {
  const defaultProps: CProgressProps = {
    value: 50,
    max: 100,
  }

  it('should not have accessibility violations', async () => {
    const wrapper = mount(CProgress, {
      props: { ...defaultProps, label: 'Upload progress' },
      attachTo: document.body,
    })

    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()

    wrapper.unmount()
  })

  describe('ARIA Attributes & Roles', () => {
    it('has proper progressbar role and min/max/now attributes', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, label: 'Upload progress' },
      })

      const barElement = wrapper.find('.celestial-progress__bar')
      expect(barElement.attributes('role')).toBe('progressbar')
      expect(barElement.attributes('aria-valuenow')).toBe('50')
      expect(barElement.attributes('aria-valuemin')).toBe('0')
      expect(barElement.attributes('aria-valuemax')).toBe('100')
      expect(barElement.attributes('aria-label')).toBe('Upload progress')
    })

    it('sets aria-valuetext when showPercentage is enabled', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, showPercentage: true },
      })

      const barElement = wrapper.find('.celestial-progress__bar')
      expect(barElement.attributes('aria-valuetext')).toBe('50%')
    })

    it('sets aria-valuetext when showValue is enabled', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, showValue: true },
      })

      const barElement = wrapper.find('.celestial-progress__bar')
      expect(barElement.attributes('aria-valuetext')).toBe('50')
    })

    it('sets indeterminate ARIA attributes when indeterminate is true', () => {
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

    it('supports custom aria-describedby', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, ariaDescribedBy: 'progress-help-text' },
      })

      const barElement = wrapper.find('.celestial-progress__bar')
      expect(barElement.attributes('aria-describedby')).toBe('progress-help-text')
    })
  })

  describe('Keyboard Navigation', () => {
    it('is keyboard focusable with tabindex 0', () => {
      const wrapper = mount(CProgress, {
        props: defaultProps,
      })

      const barElement = wrapper.find('.celestial-progress__bar')
      expect(barElement.attributes('tabindex')).toBe('0')
    })

    it('handles focus and blur interactions', async () => {
      const wrapper = mount(CProgress, {
        props: defaultProps,
      })

      const barElement = wrapper.find('.celestial-progress__bar')
      await barElement.trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()

      await barElement.trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })
  })

  describe('Semantic Contrast & Labels', () => {
    it('renders accessible label element with text content', () => {
      const wrapper = mount(CProgress, {
        props: { ...defaultProps, label: 'Download Progress', showPercentage: true },
      })

      const label = wrapper.find('.celestial-progress__label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('Download Progress')

      const text = wrapper.find('.celestial-progress__text')
      expect(text.exists()).toBe(true)
      expect(text.text()).toBe('50%')
    })
  })
})
