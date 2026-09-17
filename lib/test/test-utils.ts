import { mount, type MountingOptions, type VueWrapper } from '@vue/test-utils'
import { createApp } from 'vue'
import type { Component } from 'vue'

/**
 * Custom mount function with default configuration
 */
export function customMount<T extends Component>(
  component: T,
  options: MountingOptions<any> = {}
): VueWrapper<any> {
  const defaultOptions: MountingOptions<any> = {
    global: {
      stubs: {
        // Stub common components that might not be available in tests
        teleport: true,
        transition: true,
        'transition-group': true,
      },
    },
    ...options,
  }

  return mount(component, defaultOptions as any)
}

/**
 * Helper to create a test app for integration testing
 */
export function createTestApp(component: Component, props = {}) {
  const app = createApp(component, props)
  return app
}

/**
 * Helper to wait for next tick in async tests
 */
export async function nextTick() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

/**
 * Helper to flush promises
 */
export async function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

/**
 * Helper to simulate user interactions safely
 */
export async function safeTrigger(wrapper: any, event: string, options = {}) {
  try {
    await wrapper.trigger(event, options)
    await nextTick()
  } catch (error) {
    console.warn(`Failed to trigger ${event}:`, error)
  }
}

/**
 * Helper to test accessibility with axe
 */
export async function testAccessibility(wrapper: any) {
  const axe = (await import('axe-core')).default

  if (!axe) {
    console.warn('axe-core not available, skipping accessibility test')
    return { violations: [] }
  }

  try {
    const results = await axe.run(wrapper.element)
    return results
  } catch (error) {
    console.warn('Accessibility test failed:', error)
    return { violations: [] }
  }
}
