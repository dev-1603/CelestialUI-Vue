import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import CBreadcrumb from '../CBreadcrumb.vue'
import type { BreadcrumbItem } from '../CBreadcrumb.types'

describe('CBreadcrumb Accessibility', () => {
  const items: BreadcrumbItem[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'products', label: 'Products', href: '/products' },
    { id: 'current', label: 'Electronics' },
  ]

  it('should not have accessibility violations', async () => {
    const wrapper = mount(CBreadcrumb, {
      props: { items },
      attachTo: document.body,
    })

    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()

    wrapper.unmount()
  })

  it('should use navigation landmark with accessible label', () => {
    const wrapper = mount(CBreadcrumb, {
      props: { items, ariaLabel: 'Breadcrumb navigation' },
    })

    const nav = wrapper.find('nav')
    expect(nav.exists()).toBe(true)
    expect(nav.attributes('aria-label')).toBe('Breadcrumb navigation')
  })
})
