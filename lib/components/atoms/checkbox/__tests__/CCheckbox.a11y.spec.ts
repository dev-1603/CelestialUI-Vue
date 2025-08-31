import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe, toHaveNoViolations } from 'jest-axe'
import CCheckbox from '../CCheckbox.vue'
import type { CCheckboxProps } from '../CCheckbox.types'

// Extend expect to include accessibility matchers
expect.extend(toHaveNoViolations)

describe('CCheckbox Accessibility', () => {
  // Helper function to create wrapper
  const createWrapper = (props: Partial<CCheckboxProps> = {}) => {
    return mount(CCheckbox, {
      props: {
        checked: false,
        ...props
      } as CCheckboxProps
    })
  }

  describe('Basic accessibility', () => {
    it('should not have accessibility violations', async () => {
      const wrapper = createWrapper({
        checked: false,
        children: 'Accept terms and conditions'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when checked', async () => {
      const wrapper = createWrapper({
        checked: true,
        children: 'Newsletter subscription'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when indeterminate', async () => {
      const wrapper = createWrapper({
        indeterminate: true,
        children: 'Select all items'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when disabled', async () => {
      const wrapper = createWrapper({
        disabled: true,
        checked: false,
        children: 'Disabled option'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Keyboard navigation', () => {
    it('should be focusable', () => {
      const wrapper = createWrapper({
        children: 'Focusable checkbox'
      })

      const input = wrapper.find('input[type="checkbox"]')
      expect(input.element.tabIndex).not.toBe(-1)
    })

    it('should respect custom tabIndex', () => {
      const wrapper = createWrapper({
        tabIndex: 5,
        children: 'Custom tab order'
      })

      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('tabindex')).toBe('5')
    })

    it('should handle Space key activation', async () => {
      const wrapper = createWrapper({
        checked: false,
        children: 'Space key test'
      })

      const input = wrapper.find('input[type="checkbox"]')
      await input.trigger('keydown', { key: ' ' })

      expect(wrapper.emitted('change')).toBeTruthy()
    })

    it('should not respond to keyboard when disabled', async () => {
      const wrapper = createWrapper({
        disabled: true,
        checked: false,
        children: 'Disabled keyboard test'
      })

      const input = wrapper.find('input[type="checkbox"]')
      await input.trigger('keydown', { key: ' ' })

      expect(wrapper.emitted('change')).toBeFalsy()
    })
  })

  describe('Screen reader support', () => {
    it('should have proper role', () => {
      const wrapper = createWrapper({
        children: 'Screen reader test'
      })

      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('type')).toBe('checkbox')
    })

    it('should announce checked state', () => {
      const wrapper = createWrapper({
        checked: true,
        children: 'Checked state test'
      })

      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('aria-checked')).toBe('true')
    })

    it('should announce unchecked state', () => {
      const wrapper = createWrapper({
        checked: false,
        children: 'Unchecked state test'
      })

      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('aria-checked')).toBe('false')
    })

    it('should announce mixed state when indeterminate', () => {
      const wrapper = createWrapper({
        indeterminate: true,
        children: 'Mixed state test'
      })

      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('aria-checked')).toBe('mixed')
    })

    it('should associate with description', () => {
      const wrapper = createWrapper({
        ariaDescribedBy: 'help-text',
        children: 'Described checkbox'
      })

      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('aria-describedby')).toBe('help-text')
    })

    it('should have accessible name from label', () => {
      const wrapper = createWrapper({
        id: 'test-checkbox',
        children: 'Accessible label text'
      })

      const input = wrapper.find('input[type="checkbox"]')
      const label = wrapper.find('label')

      expect(input.attributes('id')).toBe('test-checkbox')
      expect(label.attributes('for')).toBe('test-checkbox')
      expect(label.text()).toContain('Accessible label text')
    })
  })

  describe('High contrast mode', () => {
    it('should not have violations with description slot', async () => {
      const wrapper = mount(CCheckbox, {
        props: {
          checked: false,
          id: 'checkbox-with-desc'
        },
        slots: {
          default: 'Main label',
          description: 'Additional description text'
        }
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Focus management', () => {
    it('should have focus indicator', async () => {
      const wrapper = createWrapper({
        children: 'Focus test'
      })

      const input = wrapper.find('input[type="checkbox"]')
      await input.trigger('focus')

      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('should lose focus properly', async () => {
      const wrapper = createWrapper({
        children: 'Blur test'
      })

      const input = wrapper.find('input[type="checkbox"]')
      await input.trigger('focus')
      await input.trigger('blur')

      expect(wrapper.emitted('blur')).toBeTruthy()
    })
  })

  describe('Form integration accessibility', () => {
    it('should work with form labels', async () => {
      const wrapper = createWrapper({
        id: 'form-checkbox',
        name: 'agreement',
        value: 'accepted',
        children: 'I agree to the terms'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()

      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('name')).toBe('agreement')
      expect(input.attributes('value')).toBe('accepted')
    })

    it('should associate with form', () => {
      const wrapper = createWrapper({
        form: 'registration-form',
        children: 'Form association test'
      })

      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('form')).toBe('registration-form')
    })
  })

  describe('Color and contrast', () => {
    it('should not have violations with different color schemes', async () => {
      const colorSchemes = ['primary', 'secondary', 'success', 'warning', 'danger']

      for (const colorScheme of colorSchemes) {
        const wrapper = createWrapper({
          colorScheme,
          checked: true,
          children: `${colorScheme} colored checkbox`
        })

        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
      }
    })

    it('should not have violations with different sizes', async () => {
      const sizes = ['sm', 'md', 'lg'] as const

      for (const size of sizes) {
        const wrapper = createWrapper({
          size,
          checked: true,
          children: `${size} sized checkbox`
        })

        const results = await axe(wrapper.element)
        expect(results).toHaveNoViolations()
      }
    })
  })
})
