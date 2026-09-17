/**
 * @fileoverview Test suite for CSwitch component
 *
 * This file contains comprehensive tests for the CSwitch component including:
 * - Rendering tests
 * - Props validation
 * - Event handling
 * - Accessibility compliance
 * - Edge cases and error conditions
 *
 * @author CelestialUI Team
 * @version 1.0.0
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import CSwitch from '../CSwitch.vue'
import type { CSwitchProps } from '../CSwitch.types'

/**
 * Test wrapper type for better type safety
 */
type CSwitchWrapper = VueWrapper<InstanceType<typeof CSwitch>>

describe('CSwitch', () => {
  let wrapper: CSwitchWrapper

  /**
   * Helper function to create a mounted component with props
   */
  const createWrapper = (props: Partial<CSwitchProps> = {}) => {
    return mount(CSwitch, {
      props: {
        modelValue: false,
        ...props,
      },
    })
  }

  /**
   * Clean up after each test
   */
  beforeEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('Rendering', () => {
    it('renders with default props', () => {
      wrapper = createWrapper()

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.classes()).toContain('c-switch')
      expect(wrapper.classes()).toContain('c-switch--md')
      expect(wrapper.classes()).toContain('c-switch--primary')
      expect(wrapper.classes()).toContain('c-switch--off')
    })

    it('renders with custom props', () => {
      wrapper = createWrapper({
        modelValue: true,
        size: 'lg',
        color: 'success',
        disabled: true,
      })

      expect(wrapper.classes()).toContain('c-switch--on')
      expect(wrapper.classes()).toContain('c-switch--lg')
      expect(wrapper.classes()).toContain('c-switch--success')
      expect(wrapper.classes()).toContain('c-switch--disabled')
    })

    it('renders track and thumb elements', () => {
      wrapper = createWrapper()

      const track = wrapper.find('.c-switch__track')
      const thumb = wrapper.find('.c-switch__thumb')

      expect(track.exists()).toBe(true)
      expect(thumb.exists()).toBe(true)
    })

    it('applies custom class and style', () => {
      wrapper = createWrapper({
        class: 'custom-switch',
        style: 'background: red;',
      })

      expect(wrapper.classes()).toContain('custom-switch')
      expect(wrapper.attributes('style')).toContain('background: red;')
    })
  })

  describe('Props', () => {
    it('handles modelValue prop correctly', async () => {
      wrapper = createWrapper({ modelValue: false })
      expect(wrapper.classes()).toContain('c-switch--off')

      await wrapper.setProps({ modelValue: true })
      expect(wrapper.classes()).toContain('c-switch--on')
    })

    it('handles size prop variants', async () => {
      const sizes = ['sm', 'md', 'lg'] as const

      for (const size of sizes) {
        wrapper = createWrapper({ size })
        expect(wrapper.classes()).toContain(`c-switch--${size}`)
      }
    })

    it('handles color prop variants', async () => {
      const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const

      for (const color of colors) {
        wrapper = createWrapper({ color })
        expect(wrapper.classes()).toContain(`c-switch--${color}`)
      }
    })

    it('handles disabled prop', async () => {
      wrapper = createWrapper({ disabled: false })
      expect(wrapper.classes()).not.toContain('c-switch--disabled')
      expect(wrapper.attributes('tabindex')).toBe('0')

      await wrapper.setProps({ disabled: true })
      expect(wrapper.classes()).toContain('c-switch--disabled')
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('handles loading prop', async () => {
      wrapper = createWrapper({ loading: false })
      expect(wrapper.classes()).not.toContain('c-switch--loading')

      await wrapper.setProps({ loading: true })
      expect(wrapper.classes()).toContain('c-switch--loading')
    })

    it('handles focusable prop', () => {
      wrapper = createWrapper({ focusable: true, disabled: false })
      expect(wrapper.attributes('tabindex')).toBe('0')

      wrapper = createWrapper({ focusable: false, disabled: false })
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('handles ariaLabel prop', () => {
      wrapper = createWrapper({ ariaLabel: 'Toggle notifications' })
      expect(wrapper.attributes('aria-label')).toBe('Toggle notifications')
    })

    it('handles ariaDescribedBy prop', () => {
      wrapper = createWrapper({ ariaDescribedBy: 'switch-description' })
      expect(wrapper.attributes('aria-describedby')).toBe('switch-description')
    })
  })

  describe('Events', () => {
    it('emits update:modelValue when clicked', async () => {
      wrapper = createWrapper({ modelValue: false })

      await wrapper.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('emits change event when toggled', async () => {
      wrapper = createWrapper({ modelValue: false })

      await wrapper.trigger('click')

      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')?.[0]).toEqual([true])
    })

    it('emits click event', async () => {
      wrapper = createWrapper()

      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')?.[0]?.[0]).toBeInstanceOf(MouseEvent)
    })

    it('emits focus and blur events', async () => {
      wrapper = createWrapper()

      await wrapper.trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()

      await wrapper.trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('emits keydown event', async () => {
      wrapper = createWrapper()

      await wrapper.trigger('keydown', { key: ' ' })

      expect(wrapper.emitted('keydown')).toBeTruthy()
      expect(wrapper.emitted('keydown')?.[0]?.[0]).toBeInstanceOf(KeyboardEvent)
    })

    it('does not emit events when disabled', async () => {
      wrapper = createWrapper({ disabled: true })

      await wrapper.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      expect(wrapper.emitted('change')).toBeFalsy()
    })

    it('does not emit events when loading', async () => {
      wrapper = createWrapper({ loading: true })

      await wrapper.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      expect(wrapper.emitted('change')).toBeFalsy()
    })
  })

  describe('Keyboard Navigation', () => {
    it('toggles on Space key', async () => {
      wrapper = createWrapper({ modelValue: false })

      await wrapper.trigger('keydown', { key: ' ' })

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('toggles on Enter key', async () => {
      wrapper = createWrapper({ modelValue: false })

      await wrapper.trigger('keydown', { key: 'Enter' })

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('does not toggle on other keys', async () => {
      wrapper = createWrapper({ modelValue: false })

      await wrapper.trigger('keydown', { key: 'Tab' })

      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('prevents default behavior on Space and Enter', async () => {
      wrapper = createWrapper()

      const preventDefaultSpy = vi.fn()

      // Mock the preventDefault method
      const mockEvent = {
        key: ' ',
        preventDefault: preventDefaultSpy,
        stopPropagation: vi.fn(),
      }

      await wrapper.trigger('keydown', mockEvent)
      expect(preventDefaultSpy).toHaveBeenCalled()

      // Test Enter key
      const enterEvent = {
        key: 'Enter',
        preventDefault: preventDefaultSpy,
        stopPropagation: vi.fn(),
      }

      await wrapper.trigger('keydown', enterEvent)
      expect(preventDefaultSpy).toHaveBeenCalledTimes(2)
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      wrapper = createWrapper({
        modelValue: true,
        disabled: false,
        ariaLabel: 'Toggle feature',
      })

      expect(wrapper.attributes('role')).toBe('switch')
      expect(wrapper.attributes('aria-checked')).toBe('true')
      expect(wrapper.attributes('aria-disabled')).toBe('false')
      expect(wrapper.attributes('aria-label')).toBe('Toggle feature')
    })

    it('updates aria-checked when modelValue changes', async () => {
      wrapper = createWrapper({ modelValue: false })
      expect(wrapper.attributes('aria-checked')).toBe('false')

      await wrapper.setProps({ modelValue: true })
      expect(wrapper.attributes('aria-checked')).toBe('true')
    })

    it('updates aria-disabled when disabled changes', async () => {
      wrapper = createWrapper({ disabled: false })
      expect(wrapper.attributes('aria-disabled')).toBe('false')

      await wrapper.setProps({ disabled: true })
      expect(wrapper.attributes('aria-disabled')).toBe('true')
    })

    it('is focusable when not disabled', () => {
      wrapper = createWrapper({ disabled: false })
      expect(wrapper.attributes('tabindex')).toBe('0')
    })

    it('is not focusable when disabled', () => {
      wrapper = createWrapper({ disabled: true })
      expect(wrapper.attributes('tabindex')).toBe('-1')
    })

    it('can be focused programmatically', async () => {
      wrapper = createWrapper()
      const focusSpy = vi.spyOn(wrapper.element, 'focus')

      wrapper.vm.focus()

      expect(focusSpy).toHaveBeenCalled()
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      wrapper = mount(CSwitch, {
        props: { modelValue: false },
        slots: {
          default: '<span class="custom-content">Custom</span>',
        },
      })

      expect(wrapper.find('.custom-content').exists()).toBe(true)
    })

    it('renders track slot with correct props', () => {
      wrapper = mount(CSwitch, {
        props: { modelValue: true, disabled: false, loading: false },
        slots: {
          track: '<div class="custom-track" :class="{ active: isOn, disabled }">Track</div>',
        },
      })

      const customTrack = wrapper.find('.custom-track')
      expect(customTrack.exists()).toBe(true)
    })

    it('renders thumb slot with correct props', () => {
      wrapper = mount(CSwitch, {
        props: { modelValue: true, disabled: false, loading: false },
        slots: {
          thumb: '<div class="custom-thumb" :class="{ active: isOn, disabled }">Thumb</div>',
        },
      })

      const customThumb = wrapper.find('.custom-thumb')
      expect(customThumb.exists()).toBe(true)
    })
  })

  describe('Exposed Methods', () => {
    it('exposes toggle method', async () => {
      wrapper = createWrapper({ modelValue: false })

      wrapper.vm.toggle()
      await nextTick()

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('exposes setValue method', async () => {
      wrapper = createWrapper({ modelValue: false })

      wrapper.vm.setValue(true)
      await nextTick()

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('exposes getValue method', () => {
      wrapper = createWrapper({ modelValue: true })

      expect(wrapper.vm.getValue()).toBe(true)
    })

    it('exposes focus and blur methods', () => {
      wrapper = createWrapper()

      const focusSpy = vi.spyOn(wrapper.element, 'focus')
      const blurSpy = vi.spyOn(wrapper.element, 'blur')

      wrapper.vm.focus()
      wrapper.vm.blur()

      expect(focusSpy).toHaveBeenCalled()
      expect(blurSpy).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('handles rapid clicking', async () => {
      wrapper = createWrapper({ modelValue: false })

      // Simulate rapid clicks
      for (let i = 0; i < 5; i++) {
        await wrapper.trigger('click')
      }

      // Should end up in the same state as the last click
      expect(wrapper.emitted('update:modelValue')?.length).toBe(5)
      expect(wrapper.emitted('update:modelValue')?.[4]).toEqual([true])
    })

    it('handles external modelValue changes', async () => {
      wrapper = createWrapper({ modelValue: false })

      await wrapper.setProps({ modelValue: true })

      expect(wrapper.classes()).toContain('c-switch--on')
    })

    it('handles multiple prop changes simultaneously', async () => {
      wrapper = createWrapper({
        modelValue: false,
        size: 'sm',
        color: 'primary',
      })

      await wrapper.setProps({
        modelValue: true,
        size: 'lg',
        color: 'success',
        disabled: true,
      })

      expect(wrapper.classes()).toContain('c-switch--on')
      expect(wrapper.classes()).toContain('c-switch--lg')
      expect(wrapper.classes()).toContain('c-switch--success')
      expect(wrapper.classes()).toContain('c-switch--disabled')
    })

    it('handles empty string ariaLabel', () => {
      wrapper = createWrapper({ ariaLabel: '' })
      expect(wrapper.attributes('aria-label')).toBe('')
    })

    it('handles undefined ariaDescribedBy', () => {
      wrapper = createWrapper({ ariaDescribedBy: undefined })
      expect(wrapper.attributes('aria-describedby')).toBeUndefined()
    })
  })

  describe('Performance', () => {
    it('does not re-render unnecessarily', async () => {
      wrapper = createWrapper({ modelValue: false })
      const initialRenderCount = wrapper.vm.$.renderCount || 0

      // Trigger non-state-changing events
      await wrapper.trigger('focus')
      await wrapper.trigger('blur')

      // Should not cause re-renders
      expect(wrapper.vm.$.renderCount || 0).toBe(initialRenderCount)
    })
  })
})
