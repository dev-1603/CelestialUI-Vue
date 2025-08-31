import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CInput from '../CInput.vue'
import type { CInputProps } from '../CInput.types'

describe('CInput', () => {
  // Helper function to create wrapper
  const createWrapper = (props: Partial<CInputProps> = {}) => {
    return mount(CInput, {
      props: {
        value: '',
        ...props
      } as CInputProps
    })
  }

  describe('Basic functionality', () => {
    it('renders correctly', () => {
      const wrapper = createWrapper()
      expect(wrapper.find('.celestial-input').exists()).toBe(true)
      expect(wrapper.find('input.celestial-input__field').exists()).toBe(true)
    })

    it('renders with placeholder', () => {
      const wrapper = createWrapper({
        placeholder: 'Enter text here'
      })
      const input = wrapper.find('input')
      expect(input.attributes('placeholder')).toBe('Enter text here')
    })

    it('renders with initial value', () => {
      const wrapper = createWrapper({
        value: 'Initial value'
      })
      const input = wrapper.find('input')
      expect(input.element.value).toBe('Initial value')
    })
  })

  describe('Props', () => {
    it('handles different input types', () => {
      const types = ['text', 'email', 'password', 'number', 'url', 'tel', 'search'] as const
      types.forEach(type => {
        const wrapper = createWrapper({ type })
        const input = wrapper.find('input')
        expect(input.attributes('type')).toBe(type)
      })
    })

    it('handles different sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const
      sizes.forEach(size => {
        const wrapper = createWrapper({ size })
        expect(wrapper.classes()).toContain(`celestial-input--${size}`)
      })
    })

    it('handles different variants', () => {
      const variants = ['outline', 'filled', 'unstyled'] as const
      variants.forEach(variant => {
        const wrapper = createWrapper({ variant })
        expect(wrapper.classes()).toContain(`celestial-input--${variant}`)
      })
    })

    it('handles disabled state', () => {
      const wrapper = createWrapper({ disabled: true })
      const input = wrapper.find('input')
      expect(input.element.disabled).toBe(true)
      expect(wrapper.classes()).toContain('celestial-input--disabled')
    })

    it('handles readonly state', () => {
      const wrapper = createWrapper({ readonly: true })
      const input = wrapper.find('input')
      expect(input.element.readOnly).toBe(true)
      expect(wrapper.classes()).toContain('celestial-input--readonly')
    })

    it('handles required state', () => {
      const wrapper = createWrapper({ required: true })
      const input = wrapper.find('input')
      expect(input.element.required).toBe(true)
      expect(wrapper.classes()).toContain('celestial-input--required')
    })

    it('handles invalid state', () => {
      const wrapper = createWrapper({ invalid: true })
      const input = wrapper.find('input')
      expect(input.attributes('aria-invalid')).toBe('true')
      expect(wrapper.classes()).toContain('celestial-input--invalid')
    })

    it('handles id prop', () => {
      const wrapper = createWrapper({ id: 'test-input' })
      const input = wrapper.find('input')
      expect(input.attributes('id')).toBe('test-input')
    })

    it('handles name prop', () => {
      const wrapper = createWrapper({ name: 'test-name' })
      const input = wrapper.find('input')
      expect(input.attributes('name')).toBe('test-name')
    })

    it('handles autocomplete prop', () => {
      const wrapper = createWrapper({ autocomplete: 'email' })
      const input = wrapper.find('input')
      expect(input.attributes('autocomplete')).toBe('email')
    })

    it('handles pattern prop', () => {
      const wrapper = createWrapper({ pattern: '[0-9]+' })
      const input = wrapper.find('input')
      expect(input.attributes('pattern')).toBe('[0-9]+')
    })

    it('handles minLength and maxLength props', () => {
      const wrapper = createWrapper({ minLength: 3, maxLength: 10 })
      const input = wrapper.find('input')
      expect(input.attributes('minlength')).toBe('3')
      expect(input.attributes('maxlength')).toBe('10')
    })

    it('handles min, max, and step props for number type', () => {
      const wrapper = createWrapper({
        type: 'number',
        min: 0,
        max: 100,
        step: 5
      })
      const input = wrapper.find('input')
      expect(input.attributes('min')).toBe('0')
      expect(input.attributes('max')).toBe('100')
      expect(input.attributes('step')).toBe('5')
    })
  })

  describe('Events', () => {
    it('emits input event when typing', async () => {
      const wrapper = createWrapper({ value: '' })
      const input = wrapper.find('input')

      await input.setValue('test')

      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')?.[0]).toEqual(['test', expect.any(Event)])
    })

    it('emits change event on blur', async () => {
      const wrapper = createWrapper({ value: '' })
      const input = wrapper.find('input')

      await input.setValue('test')
      await input.trigger('blur')

      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')?.[0]).toEqual(['test', expect.any(Event)])
    })

    it('emits focus event', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      await input.trigger('focus')

      expect(wrapper.emitted('focus')).toBeTruthy()
      expect(wrapper.emitted('focus')?.[0]).toEqual([expect.any(Event)])
    })

    it('emits blur event', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      await input.trigger('blur')

      expect(wrapper.emitted('blur')).toBeTruthy()
      expect(wrapper.emitted('blur')?.[0]).toEqual([expect.any(Event)])
    })

    it('emits keydown event', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      await input.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted('keydown')).toBeTruthy()
      expect(wrapper.emitted('keydown')?.[0]).toEqual([expect.any(KeyboardEvent)])
    })

    it('emits enter event on Enter key', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      await input.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted('enter')).toBeTruthy()
      expect(wrapper.emitted('enter')?.[0]).toEqual([expect.any(KeyboardEvent)])
    })

    it('emits escape event on Escape key', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      await input.trigger('keydown', { key: 'Escape' })

      expect(wrapper.emitted('escape')).toBeTruthy()
      expect(wrapper.emitted('escape')?.[0]).toEqual([expect.any(KeyboardEvent)])
    })

    it('does not emit events when disabled', async () => {
      const wrapper = createWrapper({ disabled: true, value: '' })
      const input = wrapper.find('input')

      await input.setValue('test')
      await input.trigger('focus')
      await input.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted('input')).toBeFalsy()
      expect(wrapper.emitted('focus')).toBeFalsy()
      expect(wrapper.emitted('keydown')).toBeFalsy()
    })

    it('does not emit input/change events when readonly', async () => {
      const wrapper = createWrapper({ readonly: true, value: '' })
      const input = wrapper.find('input')

      await input.setValue('test')
      await input.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted('input')).toBeFalsy()
      expect(wrapper.emitted('change')).toBeFalsy()
      expect(wrapper.emitted('keydown')).toBeFalsy()
    })
  })

  describe('Debouncing', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('debounces change events when debounceMs is set', async () => {
      const wrapper = createWrapper({
        value: '',
        debounceMs: 300
      })
      const input = wrapper.find('input')

      await input.setValue('a')
      await input.setValue('ab')
      await input.setValue('abc')

      // Change should not be emitted immediately
      expect(wrapper.emitted('change')).toBeFalsy()

      // Fast forward time
      vi.advanceTimersByTime(300)

      // Now change should be emitted
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')?.[0]).toEqual(['abc', expect.any(Event)])
    })

    it('flushes debounced change on blur', async () => {
      const wrapper = createWrapper({
        value: '',
        debounceMs: 300
      })
      const input = wrapper.find('input')

      await input.setValue('test')
      await input.trigger('blur')

      // Change should be emitted immediately on blur
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')?.[0]).toEqual(['test', expect.any(Event)])
    })
  })

  describe('Helper text and error messages', () => {
    it('shows helper text when provided', () => {
      const wrapper = createWrapper({
        helperText: 'This is helper text'
      })

      expect(wrapper.find('.celestial-input__helper-text').exists()).toBe(true)
      expect(wrapper.find('.celestial-input__helper-text').text()).toBe('This is helper text')
    })

    it('shows error message when invalid', () => {
      const wrapper = createWrapper({
        invalid: true,
        errorMessage: 'This is an error'
      })

      expect(wrapper.find('.celestial-input__error-message').exists()).toBe(true)
      expect(wrapper.find('.celestial-input__error-message').text()).toBe('This is an error')
    })

    it('hides helper text when error message is shown', () => {
      const wrapper = createWrapper({
        invalid: true,
        helperText: 'Helper text',
        errorMessage: 'Error message'
      })

      expect(wrapper.find('.celestial-input__helper-text').exists()).toBe(false)
      expect(wrapper.find('.celestial-input__error-message').exists()).toBe(true)
    })

    it('associates helper text with input via aria-describedby', () => {
      const wrapper = createWrapper({
        id: 'test-input',
        helperText: 'Helper text'
      })

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('test-input-helper-text')
    })

    it('associates error message with input via aria-describedby', () => {
      const wrapper = createWrapper({
        id: 'test-input',
        invalid: true,
        errorMessage: 'Error message'
      })

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('test-input-error-message')
    })
  })

  describe('Slots', () => {
    it('renders left element slot', () => {
      const wrapper = mount(CInput, {
        props: { value: '' },
        slots: {
          leftElement: '<span class="left-icon">🔍</span>'
        }
      })

      expect(wrapper.find('.celestial-input__left-element').exists()).toBe(true)
      expect(wrapper.find('.left-icon').exists()).toBe(true)
    })

    it('renders right element slot', () => {
      const wrapper = mount(CInput, {
        props: { value: '' },
        slots: {
          rightElement: '<span class="right-icon">✉️</span>'
        }
      })

      expect(wrapper.find('.celestial-input__right-element').exists()).toBe(true)
      expect(wrapper.find('.right-icon').exists()).toBe(true)
    })

    it('renders prepend and append slots', () => {
      const wrapper = mount(CInput, {
        props: { value: '' },
        slots: {
          prepend: '<span class="prepend">$</span>',
          append: '<span class="append">.com</span>'
        }
      })

      expect(wrapper.find('.celestial-input__prepend').exists()).toBe(true)
      expect(wrapper.find('.celestial-input__append').exists()).toBe(true)
      expect(wrapper.find('.prepend').exists()).toBe(true)
      expect(wrapper.find('.append').exists()).toBe(true)
    })

    it('renders helper text slot', () => {
      const wrapper = mount(CInput, {
        props: { value: '' },
        slots: {
          helperText: '<span class="custom-helper">Custom helper</span>'
        }
      })

      expect(wrapper.find('.celestial-input__helper-text').exists()).toBe(true)
      expect(wrapper.find('.custom-helper').exists()).toBe(true)
    })

    it('renders error message slot', () => {
      const wrapper = mount(CInput, {
        props: { value: '', invalid: true },
        slots: {
          errorMessage: '<span class="custom-error">Custom error</span>'
        }
      })

      expect(wrapper.find('.celestial-input__error-message').exists()).toBe(true)
      expect(wrapper.find('.custom-error').exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      const wrapper = createWrapper({
        required: true,
        invalid: true,
        ariaLabel: 'Test input'
      })

      const input = wrapper.find('input')
      expect(input.attributes('required')).toBeDefined()
      expect(input.attributes('aria-invalid')).toBe('true')
      expect(input.attributes('aria-label')).toBe('Test input')
    })

    it('error message has proper ARIA attributes', () => {
      const wrapper = createWrapper({
        invalid: true,
        errorMessage: 'Error message'
      })

      const errorMessage = wrapper.find('.celestial-input__error-message')
      expect(errorMessage.attributes('role')).toBe('alert')
      expect(errorMessage.attributes('aria-live')).toBe('polite')
    })

    it('handles tabIndex prop', () => {
      const wrapper = createWrapper({ tabIndex: 5 })
      const input = wrapper.find('input')
      expect(input.attributes('tabindex')).toBe('5')
    })

    it('associates with form when form prop is provided', () => {
      const wrapper = createWrapper({ form: 'test-form' })
      const input = wrapper.find('input')
      expect(input.attributes('form')).toBe('test-form')
    })
  })

  describe('Exposed methods', () => {
    it('exposes focus method', async () => {
      const wrapper = createWrapper()
      const vm = wrapper.vm as any

      expect(typeof vm.focus).toBe('function')
      // Note: Can't test actual focus in jsdom, but method should exist
    })

    it('exposes blur method', async () => {
      const wrapper = createWrapper()
      const vm = wrapper.vm as any

      expect(typeof vm.blur).toBe('function')
    })

    it('exposes clear method', async () => {
      const wrapper = createWrapper({ value: 'test' })
      const vm = wrapper.vm as any

      expect(typeof vm.clear).toBe('function')

      // Test clear functionality
      vm.clear()

      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('change')).toBeTruthy()
    })

    it('exposes inputRef', () => {
      const wrapper = createWrapper()
      const vm = wrapper.vm as any

      expect(vm.inputRef).toBeDefined()
    })
  })
})
