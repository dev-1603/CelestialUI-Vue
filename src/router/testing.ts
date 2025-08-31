// Component Testing Routes Configuration
// Child routes that open as separate pages but maintain logical relationship

import type { RouteRecordRaw } from 'vue-router'

export const testingRoutes: RouteRecordRaw[] = [
  // Main test overview page
  {
    path: '/playground',
    name: 'playground',
    component: () => import('../pages/component-test.vue'),
    meta: {
      title: 'Component Testing Overview'
    }
  },
  // Standalone atomic button test page
  {
    path: '/playground/atomic/button',
    name: 'test-atomic-button',
    component: () => import('../pages/componentTest/Button.vue'),
    meta: {
      title: 'Button Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing'
    }
  },
  // Standalone atomic icon test page
  {
    path: '/playground/atomic/icon',
    name: 'test-atomic-icon',
    component: () => import('../pages/componentTest/Icon.vue'),
    meta: {
      title: 'Icon Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing'
    }
  },
  // Standalone atomic checkbox test page
  {
    path: '/playground/atomic/checkbox',
    name: 'test-atomic-checkbox',
    component: () => import('../pages/componentTest/Checkbox.vue'),
    meta: {
      title: 'Checkbox Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing'
    }
  },

  // Standalone atomic input test page
  {
    path: '/playground/atomic/input',
    name: 'test-atomic-input',
    component: () => import('../pages/componentTest/Input.vue'),
    meta: {
      title: 'Input Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing'
    }
  },

  // Input customization examples
  {
    path: '/playground/atomic/input/customization',
    name: 'test-input-customization',
    component: () => import('../pages/componentTest/InputCustomization.vue'),
    meta: {
      title: 'Input Customization Examples',
      parentRoute: '/playground',
      parentTitle: 'Component Testing'
    }
  }
]

export default testingRoutes
