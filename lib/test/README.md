# Component Testing Guide

This guide covers best practices for testing Vue components with Vitest in the CelestialUI library.

## Table of Contents
- [Test Structure](#test-structure)
- [Testing Patterns](#testing-patterns)
- [Accessibility Testing](#accessibility-testing)
- [Mocking and Stubs](#mocking-and-stubs)
- [Common Test Scenarios](#common-test-scenarios)

## Test Structure

### File Naming Convention
```
ComponentName.spec.ts      # Unit tests
ComponentName.a11y.spec.ts # Accessibility tests
ComponentName.e2e.spec.ts  # End-to-end tests (future)
```

### Test Organization
```typescript
describe('ComponentName', () => {
  describe('Basic functionality', () => {
    // Basic rendering and props tests
  })

  describe('Props', () => {
    // Props validation and behavior tests
  })

  describe('Events', () => {
    // Event emission and handling tests
  })

  describe('Slots', () => {
    // Slot rendering and content tests
  })

  describe('Accessibility', () => {
    // ARIA attributes, keyboard navigation, screen reader tests
  })
})
```

## Testing Patterns

### 1. Basic Component Testing
```typescript
import { describe, it, expect } from 'vitest'
import { customMount } from '../test-utils'
import Component from './Component.vue'

describe('Component', () => {
  it('renders correctly with default props', () => {
    const wrapper = customMount(Component)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('component-class')
  })

  it('renders with custom props', () => {
    const wrapper = customMount(Component, {
      props: { variant: 'primary' }
    })

    expect(wrapper.classes()).toContain('component--primary')
  })
})
```

### 2. Event Testing
```typescript
it('emits event when clicked', async () => {
  const wrapper = customMount(Component)

  await wrapper.trigger('click')

  expect(wrapper.emitted('click')).toBeTruthy()
  expect(wrapper.emitted('click')?.[0]).toEqual([expectedPayload])
})
```

### 3. Slot Testing
```typescript
it('renders slot content', () => {
  const wrapper = customMount(Component, {
    slots: {
      default: '<div>Slot content</div>'
    }
  })

  expect(wrapper.text()).toContain('Slot content')
})
```

## Accessibility Testing

### Basic Accessibility Tests
```typescript
import { axe } from 'vitest-axe'

describe('Component Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const wrapper = customMount(Component)
    const results = await axe(wrapper.element)

    expect(results.violations).toHaveLength(0)
  })
})
```

### Keyboard Navigation Tests
```typescript
it('is keyboard accessible', async () => {
  const wrapper = customMount(Component, {
    props: { clickable: true }
  })

  // Focus the component
  await wrapper.trigger('focus')

  expect(wrapper.attributes('tabindex')).toBeDefined()

  // Test keyboard activation
  await wrapper.trigger('keydown.enter')
  expect(wrapper.emitted('click')).toBeTruthy()
})
```

## Mocking and Stubs

### API Calls
```typescript
import { vi } from 'vitest'

it('handles API errors gracefully', async () => {
  // Mock API call
  const mockApi = vi.fn().mockRejectedValue(new Error('API Error'))

  const wrapper = customMount(Component, {
    global: {
      mocks: {
        $api: { fetchData: mockApi }
      }
    }
  })

  // Trigger action that calls API
  await wrapper.find('button').trigger('click')

  expect(wrapper.text()).toContain('Error occurred')
})
```

### External Dependencies
```typescript
it('works without external dependencies', () => {
  const wrapper = customMount(Component, {
    global: {
      stubs: {
        ExternalComponent: true // Replace with stub
      }
    }
  })

  expect(wrapper.exists()).toBe(true)
})
```

## Common Test Scenarios

### 1. Form Components
- Test input validation
- Test error states
- Test form submission
- Test accessibility attributes

### 2. Interactive Components
- Test hover states
- Test focus management
- Test keyboard navigation
- Test click events

### 3. Data Components
- Test loading states
- Test error handling
- Test data rendering
- Test empty states

### 4. Layout Components
- Test responsive behavior
- Test spacing and alignment
- Test nested component interactions

## Best Practices

### 1. Test User Behavior, Not Implementation
```typescript
// Good: Test what user sees
expect(wrapper.text()).toContain('Error message')

// Avoid: Test internal implementation
expect(wrapper.vm.errorState).toBe(true)
```

### 2. Keep Tests Independent
```typescript
// Each test should be self-contained
beforeEach(() => {
  // Reset state
})
```

### 3. Use Descriptive Test Names
```typescript
// Good
it('displays validation error when email is invalid')

// Avoid
it('test validation')
```

### 4. Test Edge Cases
```typescript
it('handles empty data gracefully')
it('handles network errors')
it('handles invalid props')
```

### 5. Use Test Utilities
```typescript
// Create reusable test helpers
export function renderWithProps(Component, props) {
  return customMount(Component, { props })
}
```

## Running Tests

```bash
# Run all tests
pnpm test:unit

# Run specific test file
pnpm test:unit ComponentName.spec.ts

# Run tests in watch mode
pnpm test:unit --watch

# Run tests with coverage
pnpm test:unit --coverage
```

## Debugging Tests

### Common Issues
1. **Async operations**: Use `await` and `nextTick()`
2. **DOM updates**: Wait for Vue to update the DOM
3. **Event timing**: Ensure events are properly awaited
4. **Mock setup**: Verify mocks are properly configured

### Debug Helpers
```typescript
// Log component state
console.log(wrapper.vm.$data)

// Log DOM structure
console.log(wrapper.html())

// Debug event emissions
console.log(wrapper.emitted())
```

## Integration Testing

For component integration tests, consider:
- Component composition
- Data flow between components
- Event propagation
- Global state management

```typescript
describe('Component Integration', () => {
  it('works with parent component', () => {
    const Parent = {
      components: { ChildComponent },
      template: '<ChildComponent @event="handleEvent" />'
    }

    const wrapper = customMount(Parent)
    // Test interaction between components
  })
})
```

## Performance Testing

Consider performance implications:
- Component rendering time
- Memory usage
- Bundle size impact
- Re-rendering frequency

```typescript
it('renders efficiently', async () => {
  const startTime = performance.now()

  const wrapper = customMount(Component, {
    props: { largeDataset: true }
  })

  await nextTick()

  const endTime = performance.now()
  expect(endTime - startTime).toBeLessThan(100) // Less than 100ms
})
```
