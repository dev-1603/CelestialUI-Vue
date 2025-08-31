import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CCheckbox from '../CCheckbox.vue'
import type { CCheckboxProps } from '../CCheckbox.types'

describe('CCheckbox', () => {
  // Helper function to create wrapper
  const createWrapper = (props: Partial<CCheckboxProps> = {}) => {
    return mount(CCheckbox, {
      props: {
        checked: false,
        ...props
      } as CCheckboxProps
    })
  }

  describe('Basic functionality', () => {
    it('renders correctly', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.celestial-checkbox').exists()).toBe(true)
      expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    })

    it('renders with label', () => {
      const wrapper = createWrapper({
        children: 'Test Label'
      })
      expect(wrapper.text()).toContain('Test Label')
    })

    it('renders with slot content', () => {
      const wrapper = mount(CCheckbox, {
        props: { checked: false },
        slots: {
          default: 'Slot Label'
        }
      })
      expect(wrapper.text()).toContain('Slot Label')
    })
  })

  describe('Props', () => {
    it('handles checked prop', () => {
      const wrapper = createWrapper({ checked: true })
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.element.checked).toBe(true)
    })

    it('handles unchecked prop', () => {
      const wrapper = createWrapper({ checked: false })
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.element.checked).toBe(false)
    })

    it('handles disabled prop', () => {
      const wrapper = createWrapper({ disabled: true })
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.element.disabled).toBe(true)
      expect(wrapper.classes()).toContain('celestial-checkbox--disabled')
    })

    it('handles indeterminate prop', () => {
      const wrapper = createWrapper({ indeterminate: true })
      expect(wrapper.classes()).toContain('celestial-checkbox--indeterminate')
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('aria-checked')).toBe('mixed')
    })

    it('handles size prop', () => {
      const sizes = ['sm', 'md', 'lg'] as const
      sizes.forEach(size => {
        const wrapper = createWrapper({ size })
        expect(wrapper.classes()).toContain(`celestial-checkbox--${size}`)
      })
    })

    it('handles colorScheme prop', () => {
      const wrapper = createWrapper({ colorScheme: 'success' })
      expect(wrapper.classes()).toContain('celestial-checkbox--success')
    })

    it('handles id prop', () => {
      const wrapper = createWrapper({ id: 'test-checkbox' })
      const input = wrapper.find('input[type="checkbox"]')
      const label = wrapper.find('label')
      expect(input.attributes('id')).toBe('test-checkbox')
      expect(label.attributes('for')).toBe('test-checkbox')
    })

    it('handles name prop', () => {
      const wrapper = createWrapper({ name: 'test-name' })
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('name')).toBe('test-name')
    })

    it('handles value prop', () => {
      const wrapper = createWrapper({ value: 'test-value' })
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('value')).toBe('test-value')
    })

    it('handles ariaDescribedBy prop', () => {
      const wrapper = createWrapper({ ariaDescribedBy: 'description-id' })
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('aria-describedby')).toBe('description-id')
    })

    it('handles tabIndex prop', () => {
      const wrapper = createWrapper({ tabIndex: 0 })
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('tabindex')).toBe('0')
    })

    it('handles form prop', () => {
      const wrapper = createWrapper({ form: 'test-form' })
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('form')).toBe('test-form')
    })
  })

  describe('Events', () => {
    it('emits change event when clicked', async () => {
      const onChange = vi.fn()
      const wrapper = createWrapper({
        checked: false,
        onChange
      })

      const input = wrapper.find('input[type="checkbox"]')
      await input.trigger('change')

      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')?.[0]).toEqual([true, expect.any(Event)])
    })

    it('emits focus event', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input[type="checkbox"]')

      await input.trigger('focus')

      expect(wrapper.emitted('focus')).toBeTruthy()
      expect(wrapper.emitted('focus')?.[0]).toEqual([expect.any(Event)])
    })

    it('emits blur event', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input[type="checkbox"]')

      await input.trigger('blur')

      expect(wrapper.emitted('blur')).toBeTruthy()
      expect(wrapper.emitted('blur')?.[0]).toEqual([expect.any(Event)])
    })

    it('does not emit change when disabled', async () => {
      const wrapper = createWrapper({
        disabled: true,
        checked: false
      })

      const input = wrapper.find('input[type="checkbox"]')
      await input.trigger('change')

      // Should not emit change event when disabled
      expect(wrapper.emitted('change')).toBeFalsy()
    })

    it('handles space key press', async () => {
      const wrapper = createWrapper({ checked: false })
      const input = wrapper.find('input[type="checkbox"]')

      await input.trigger('keydown', { key: ' ' })

      expect(wrapper.emitted('change')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const wrapper = createWrapper({
        checked: true,
        ariaDescribedBy: 'help-text'
      })

      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('aria-checked')).toBe('true')
      expect(input.attributes('aria-describedby')).toBe('help-text')
    })

    it('sets aria-checked to mixed when indeterminate', () => {
      const wrapper = createWrapper({
        indeterminate: true
      })

      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('aria-checked')).toBe('mixed')
    })

    it('associates label with input via for/id', () => {
      const wrapper = createWrapper({
        id: 'checkbox-1',
        children: 'Test Label'
      })

      const input = wrapper.find('input[type="checkbox"]')
      const label = wrapper.find('label')

      expect(input.attributes('id')).toBe('checkbox-1')
      expect(label.attributes('for')).toBe('checkbox-1')
    })
  })

  describe('Custom icons', () => {
    it('renders custom check icon', () => {
      const wrapper = createWrapper({
        checked: true,
        checkIcon: '✅'
      })

      expect(wrapper.text()).toContain('✅')
    })

    it('renders custom indeterminate icon', () => {
      const wrapper = createWrapper({
        indeterminate: true,
        indeterminateIcon: '◆'
      })

      expect(wrapper.text()).toContain('◆')
    })

    it('renders custom icon slot', () => {
      const wrapper = mount(CCheckbox, {
        props: { checked: true },
        slots: {
          icon: '<span class="custom-icon">★</span>'
        }
      })

      expect(wrapper.find('.custom-icon').exists()).toBe(true)
      expect(wrapper.text()).toContain('★')
    })
  })

  describe('Slots', () => {
    it('renders label slot', () => {
      const wrapper = mount(CCheckbox, {
        props: { checked: false },
        slots: {
          label: '<span class="custom-label">Custom Label</span>'
        }
      })

      expect(wrapper.find('.custom-label').exists()).toBe(true)
      expect(wrapper.text()).toContain('Custom Label')
    })

    it('renders description slot', () => {
      const wrapper = mount(CCheckbox, {
        props: { checked: false },
        slots: {
          default: 'Main Label',
          description: '<span class="help-text">Helper text</span>'
        }
      })

      expect(wrapper.find('.help-text').exists()).toBe(true)
      expect(wrapper.text()).toContain('Helper text')
    })
  })

  describe('Form integration', () => {
    it('works with form submission', () => {
      const wrapper = createWrapper({
        checked: true,
        name: 'agreement',
        value: 'yes'
      })

      const input = wrapper.find('input[type="checkbox"]')
      expect(input.attributes('name')).toBe('agreement')
      expect(input.attributes('value')).toBe('yes')
      expect(input.element.checked).toBe(true)
    })
  })
})
