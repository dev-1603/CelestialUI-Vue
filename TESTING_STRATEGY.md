# 🧪 CelestialUI-Vue Testing Strategy

## 📊 Testing Pyramid Overview

```
                    /\
                   /  \
                  / E2E \
                 /______\
                /        \
               /   INTEG   \
              /__________\
             /            \
            /     UNIT      \
           /________________\
```

## 🎯 Testing Levels

### 1. 🔬 Unit Tests (70% coverage target)
**Purpose**: Test individual components and functions in isolation

#### Component Testing
```typescript
// tests/unit/components/atoms/CButton.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CButton from '@/components/atoms/button/CButton.vue'

describe('CButton', () => {
  it('renders with correct text', () => {
    const wrapper = mount(CButton, {
      props: { children: 'Click me' }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(CButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(CButton, {
      props: { variant: 'primary' }
    })
    expect(wrapper.classes()).toContain('btn-primary')
  })
})
```

#### Composable Testing
```typescript
// tests/unit/composables/useTheme.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useTheme } from '@/composables/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    // Reset theme state
    localStorage.clear()
  })

  it('returns default theme', () => {
    const { currentTheme } = useTheme()
    expect(currentTheme.value).toBe('light')
  })

  it('switches theme correctly', () => {
    const { setTheme, currentTheme } = useTheme()
    setTheme('dark')
    expect(currentTheme.value).toBe('dark')
  })
})
```

#### Utility Testing
```typescript
// tests/unit/utils/format/date.spec.ts
import { describe, it, expect } from 'vitest'
import { formatDate, isValidDate } from '@/utils/format/date'

describe('Date Utils', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15')
  })

  it('validates date correctly', () => {
    expect(isValidDate('2024-01-15')).toBe(true)
    expect(isValidDate('invalid')).toBe(false)
  })
})
```

### 2. 🔗 Integration Tests (20% coverage target)
**Purpose**: Test component interactions and feature workflows

#### Component Integration
```typescript
// tests/integration/features/form-validation.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import FormDemo from '@/demos/FormDemo.vue'

describe('Form Validation Integration', () => {
  it('validates form fields and shows errors', async () => {
    const wrapper = mount(FormDemo)
    
    // Try to submit empty form
    await wrapper.find('[data-testid="submit-btn"]').trigger('click')
    
    // Check validation errors appear
    expect(wrapper.find('[data-testid="email-error"]').isVisible()).toBe(true)
    expect(wrapper.find('[data-testid="password-error"]').isVisible()).toBe(true)
  })

  it('submits form with valid data', async () => {
    const wrapper = mount(FormDemo)
    
    // Fill form with valid data
    await wrapper.find('[data-testid="email-input"]').setValue('test@example.com')
    await wrapper.find('[data-testid="password-input"]').setValue('password123')
    
    // Submit form
    await wrapper.find('[data-testid="submit-btn"]').trigger('click')
    
    // Check success state
    expect(wrapper.find('[data-testid="success-message"]').isVisible()).toBe(true)
  })
})
```

#### Theme System Integration
```typescript
// tests/integration/plugins/theme-system.spec.ts
import { createApp } from 'vue'
import { describe, it, expect } from 'vitest'
import { createThemePlugin } from '@/plugins/theme'
import CButton from '@/components/atoms/button/CButton.vue'

describe('Theme System Integration', () => {
  it('applies theme to components correctly', () => {
    const app = createApp({})
    app.use(createThemePlugin({ defaultTheme: 'dark' }))
    
    const wrapper = mount(CButton, {
      global: { plugins: [app] }
    })
    
    expect(wrapper.classes()).toContain('theme-dark')
  })
})
```

### 3. 🌐 End-to-End Tests (10% coverage target)
**Purpose**: Test complete user journeys and real browser interactions

#### User Journey Testing
```typescript
// tests/e2e/specs/user-journey.cy.ts
describe('Component Library User Journey', () => {
  it('user can explore components and switch themes', () => {
    cy.visit('/')
    
    // Navigate to components
    cy.get('[data-testid="components-nav"]').click()
    cy.get('[data-testid="button-component"]').click()
    
    // View component examples
    cy.get('[data-testid="button-example"]').should('be.visible')
    
    // Switch theme
    cy.get('[data-testid="theme-switcher"]').click()
    cy.get('[data-testid="dark-theme"]').click()
    
    // Verify theme applied
    cy.get('body').should('have.class', 'theme-dark')
  })

  it('user can use playground to test components', () => {
    cy.visit('/playground')
    
    // Configure component
    cy.get('[data-testid="component-selector"]').select('Button')
    cy.get('[data-testid="variant-selector"]').select('primary')
    cy.get('[data-testid="size-selector"]').select('large')
    
    // View live preview
    cy.get('[data-testid="preview-button"]')
      .should('have.class', 'btn-primary')
      .should('have.class', 'btn-large')
    
    // Copy code
    cy.get('[data-testid="copy-code"]').click()
    cy.get('[data-testid="success-toast"]').should('be.visible')
  })
})
```

#### Accessibility Testing
```typescript
// tests/e2e/specs/accessibility.cy.ts
describe('Accessibility Compliance', () => {
  it('passes WCAG AA standards', () => {
    cy.visit('/')
    cy.injectAxe()
    cy.checkA11y(null, {
      rules: {
        'color-contrast': { enabled: true },
        'keyboard-navigation': { enabled: true },
        'focus-management': { enabled: true }
      }
    })
  })

  it('supports keyboard navigation', () => {
    cy.visit('/components/button')
    
    // Tab through interactive elements
    cy.get('body').tab()
    cy.focused().should('have.attr', 'data-testid', 'first-button')
    
    cy.tab()
    cy.focused().should('have.attr', 'data-testid', 'second-button')
    
    // Activate with keyboard
    cy.focused().type('{enter}')
    cy.get('[data-testid="button-clicked"]').should('be.visible')
  })
})
```

### 4. 📊 Performance Tests
**Purpose**: Ensure components perform well under various conditions

```typescript
// tests/performance/rendering.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { performance } from 'perf_hooks'
import CTable from '@/components/organisms/table/CTable.vue'

describe('Performance Tests', () => {
  it('renders large table efficiently', () => {
    const start = performance.now()
    
    const wrapper = mount(CTable, {
      props: {
        data: Array.from({ length: 1000 }, (_, i) => ({
          id: i,
          name: `Item ${i}`,
          value: Math.random()
        }))
      }
    })
    
    const end = performance.now()
    const renderTime = end - start
    
    expect(renderTime).toBeLessThan(100) // Should render in under 100ms
    expect(wrapper.findAll('[data-testid="table-row"]')).toHaveLength(1000)
  })
})
```

### 5. 👁️ Visual Regression Tests
**Purpose**: Catch visual changes and ensure UI consistency

```typescript
// tests/visual/components/button.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Button Visual Tests', () => {
  test('button variants match design system', async ({ page }) => {
    await page.goto('/storybook/iframe.html?id=atoms-button--all-variants')
    
    // Wait for components to load
    await page.waitForSelector('[data-testid="button-variants"]')
    
    // Take screenshot
    await expect(page).toHaveScreenshot('button-variants.png')
  })

  test('button states are visually correct', async ({ page }) => {
    await page.goto('/storybook/iframe.html?id=atoms-button--interactive-states')
    
    // Test hover state
    await page.hover('[data-testid="primary-button"]')
    await expect(page.locator('[data-testid="primary-button"]')).toHaveScreenshot('button-hover.png')
    
    // Test focus state
    await page.focus('[data-testid="primary-button"]')
    await expect(page.locator('[data-testid="primary-button"]')).toHaveScreenshot('button-focus.png')
  })
})
```

## 🛠️ Testing Tools & Configuration

### Testing Stack
- **Unit/Integration**: Vitest + Vue Test Utils
- **E2E**: Cypress + Testing Library
- **Visual**: Playwright + Chromatic
- **Performance**: Lighthouse CI
- **Accessibility**: axe-core + cypress-axe

### Configuration Files

#### Vitest Configuration
```typescript
// config/testing/vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      threshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../../lib'),
      '@tests': resolve(__dirname, '../../tests')
    }
  }
})
```

#### Cypress Configuration
```typescript
// config/testing/cypress.config.ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'tests/e2e/support/e2e.ts',
    specPattern: 'tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    },
    supportFile: 'tests/e2e/support/component.ts',
    specPattern: 'lib/**/*.cy.{js,jsx,ts,tsx}'
  }
})
```

## 📈 Testing Metrics & Reporting

### Coverage Targets
- **Unit Tests**: 80% line coverage
- **Integration Tests**: 70% feature coverage
- **E2E Tests**: 90% critical path coverage
- **Accessibility**: 100% WCAG AA compliance

### Test Reporting
- **Coverage Reports**: HTML + LCOV
- **Visual Regression**: Chromatic + Percy
- **Performance**: Lighthouse CI
- **Accessibility**: axe reports

### CI/CD Integration
```yaml
# .github/workflows/test.yml
name: Testing Pipeline

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:coverage

  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:integration

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - run: npm run test:e2e

  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run chromatic
```

## 🎯 Testing Best Practices

### 1. Test Structure (AAA Pattern)
- **Arrange**: Set up test conditions
- **Act**: Execute the functionality
- **Assert**: Verify the results

### 2. Test Naming Convention
```typescript
// Good: descriptive and specific
it('should display error message when email is invalid')

// Bad: vague and unclear
it('should work correctly')
```

### 3. Test Data Management
```typescript
// Use factories for consistent test data
const createMockUser = (overrides = {}) => ({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  ...overrides
})
```

### 4. Component Testing Patterns
```typescript
// Test props, events, slots, and behavior
describe('CButton', () => {
  it('renders with props', () => {})
  it('emits events', () => {})
  it('renders slots', () => {})
  it('handles user interactions', () => {})
})
```

This comprehensive testing strategy ensures high-quality, reliable components with excellent test coverage across all levels.
