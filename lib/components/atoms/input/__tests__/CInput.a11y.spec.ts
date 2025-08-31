import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe, toHaveNoViolations } from 'jest-axe'
import CInput from '../CInput.vue'
import type { CInputProps } from '../CInput.types'

// Extend expect to include accessibility matchers
expect.extend(toHaveNoViolations)

describe('CInput Accessibility', () => {
  // Helper function to create wrapper
  const createWrapper = (props: Partial<CInputProps> = {}) => {
    return mount(CInput, {
      props: {
        value: '',
        ...props
      } as CInputProps
    })
  }

  describe('Basic accessibility', () => {
    it('should not have accessibility violations', async () => {
      const wrapper = createWrapper({
        placeholder: 'Enter your email address'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with label', async () => {
      const wrapper = mount('div', {
        template: `
          <div>
            <label for="email-input">Email Address</label>
            <CInput
              id="email-input"
              value=""
              type="email"
              placeholder="Enter your email"
            />
          </div>
        `,
        components: { CInput }
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when invalid', async () => {
      const wrapper = createWrapper({
        invalid: true,
        errorMessage: 'Please enter a valid email address',
        ariaLabel: 'Email address'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when disabled', async () => {
      const wrapper = createWrapper({
        disabled: true,
        value: 'disabled value',
        ariaLabel: 'Disabled input'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with helper text', async () => {
      const wrapper = createWrapper({
        id: 'password-input',
        type: 'password',
        helperText: 'Password must be at least 8 characters long',
        ariaLabel: 'Password'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })
  })

  describe('ARIA attributes', () => {
    it('should have proper role and type', () => {
      const wrapper = createWrapper({
        type: 'email'
      })

      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe('email')
      // Input elements don't need explicit role as type provides semantic meaning
    })

    it('should associate with helper text via aria-describedby', () => {
      const wrapper = createWrapper({
        id: 'test-input',
        helperText: 'This is helper text'
      })

      const input = wrapper.find('input')
      const helperText = wrapper.find('.celestial-input__helper-text')

      expect(input.attributes('aria-describedby')).toBe('test-input-helper-text')
      expect(helperText.attributes('id')).toBe('test-input-helper-text')
    })

    it('should associate with error message via aria-describedby', () => {
      const wrapper = createWrapper({
        id: 'test-input',
        invalid: true,
        errorMessage: 'This field is required'
      })

      const input = wrapper.find('input')
      const errorMessage = wrapper.find('.celestial-input__error-message')

      expect(input.attributes('aria-describedby')).toBe('test-input-error-message')
      expect(errorMessage.attributes('id')).toBe('test-input-error-message')
    })

    it('should combine multiple aria-describedby references', () => {
      const wrapper = createWrapper({
        id: 'test-input',
        ariaDescribedBy: 'external-description',
        helperText: 'Helper text'
      })

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('external-description test-input-helper-text')
    })

    it('should set aria-invalid when invalid', () => {
      const wrapper = createWrapper({
        invalid: true
      })

      const input = wrapper.find('input')
      expect(input.attributes('aria-invalid')).toBe('true')
    })

    it('should set aria-invalid to false when valid', () => {
      const wrapper = createWrapper({
        invalid: false
      })

      const input = wrapper.find('input')
      expect(input.attributes('aria-invalid')).toBe('false')
    })

    it('should have aria-label when provided', () => {
      const wrapper = createWrapper({
        ariaLabel: 'Search products'
      })

      const input = wrapper.find('input')
      expect(input.attributes('aria-label')).toBe('Search products')
    })

    it('should indicate required fields', () => {
      const wrapper = createWrapper({
        required: true
      })

      const input = wrapper.find('input')
      expect(input.attributes('required')).toBeDefined()
    })
  })

  describe('Error message accessibility', () => {
    it('should have role="alert" on error message', () => {
      const wrapper = createWrapper({
        invalid: true,
        errorMessage: 'This field is required'
      })

      const errorMessage = wrapper.find('.celestial-input__error-message')
      expect(errorMessage.attributes('role')).toBe('alert')
    })

    it('should have aria-live="polite" on error message', () => {
      const wrapper = createWrapper({
        invalid: true,
        errorMessage: 'Invalid input'
      })

      const errorMessage = wrapper.find('.celestial-input__error-message')
      expect(errorMessage.attributes('aria-live')).toBe('polite')
    })
  })

  describe('Keyboard navigation', () => {
    it('should be focusable when not disabled', () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      expect(input.element.tabIndex).not.toBe(-1)
    })

    it('should respect custom tabIndex', () => {
      const wrapper = createWrapper({
        tabIndex: 5
      })

      const input = wrapper.find('input')
      expect(input.attributes('tabindex')).toBe('5')
    })

    it('should handle keyboard interaction when not disabled', async () => {
      const wrapper = createWrapper()
      const input = wrapper.find('input')

      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('keydown')).toBeTruthy()
      expect(wrapper.emitted('enter')).toBeTruthy()
    })

    it('should not handle keyboard interaction when disabled', async () => {
      const wrapper = createWrapper({
        disabled: true
      })
      const input = wrapper.find('input')

      await input.trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('keydown')).toBeFalsy()
      expect(wrapper.emitted('enter')).toBeFalsy()
    })

    it('should not handle input when readonly', async () => {
      const wrapper = createWrapper({
        readonly: true
      })
      const input = wrapper.find('input')

      await input.trigger('keydown', { key: 'a' })
      expect(wrapper.emitted('keydown')).toBeFalsy()
    })
  })

  describe('Form integration accessibility', () => {
    it('should work with form labels', async () => {
      const wrapper = mount('form', {
        template: `
          <form>
            <label for="username">Username</label>
            <CInput
              id="username"
              name="username"
              value=""
              required
            />
          </form>
        `,
        components: { CInput }
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()

      const input = wrapper.find('input')
      expect(input.attributes('id')).toBe('username')
      expect(input.attributes('name')).toBe('username')
      expect(input.attributes('required')).toBeDefined()
    })

    it('should associate with form when form attribute is used', () => {
      const wrapper = createWrapper({
        form: 'registration-form'
      })

      const input = wrapper.find('input')
      expect(input.attributes('form')).toBe('registration-form')
    })
  })

  describe('Screen reader support', () => {
    it('should announce validation errors', async () => {
      const wrapper = createWrapper({
        id: 'email-input',
        invalid: true,
        errorMessage: 'Please enter a valid email address'
      })

      const errorMessage = wrapper.find('.celestial-input__error-message')
      expect(errorMessage.attributes('role')).toBe('alert')
      expect(errorMessage.attributes('aria-live')).toBe('polite')
      expect(errorMessage.text()).toBe('Please enter a valid email address')

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('email-input-error-message')
      expect(input.attributes('aria-invalid')).toBe('true')
    })

    it('should provide helpful context with helper text', () => {
      const wrapper = createWrapper({
        id: 'password-input',
        type: 'password',
        helperText: 'Must be at least 8 characters with one uppercase letter'
      })

      const helperText = wrapper.find('.celestial-input__helper-text')
      expect(helperText.text()).toBe('Must be at least 8 characters with one uppercase letter')

      const input = wrapper.find('input')
      expect(input.attributes('aria-describedby')).toBe('password-input-helper-text')
    })
  })

  describe('Input type accessibility', () => {
    it('should not have violations with email type', async () => {
      const wrapper = createWrapper({
        type: 'email',
        value: 'test@example.com',
        ariaLabel: 'Email address'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with password type', async () => {
      const wrapper = createWrapper({
        type: 'password',
        ariaLabel: 'Password'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with number type', async () => {
      const wrapper = createWrapper({
        type: 'number',
        min: 0,
        max: 100,
        ariaLabel: 'Age'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with search type', async () => {
      const wrapper = createWrapper({
        type: 'search',
        placeholder: 'Search products',
        ariaLabel: 'Search'
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Complex input scenarios', () => {
    it('should not have violations with left and right elements', async () => {
      const wrapper = mount(CInput, {
        props: {
          value: '',
          ariaLabel: 'Amount in USD'
        },
        slots: {
          leftElement: '<span>$</span>',
          rightElement: '<span>USD</span>'
        }
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with prepend and append', async () => {
      const wrapper = mount(CInput, {
        props: {
          value: '',
          ariaLabel: 'Website URL'
        },
        slots: {
          prepend: '<span>https://</span>',
          append: '<span>.com</span>'
        }
      })

      const results = await axe(wrapper.element)
      expect(results).toHaveNoViolations()
    })
  })
})
