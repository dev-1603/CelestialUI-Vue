// Component Testing Routes Configuration
// Child routes that open as separate pages but maintain logical relationship

import type { RouteRecordRaw } from 'vue-router'

export const testingRoutes: RouteRecordRaw[] = [
  // Main test overview page
  {
    path: '/test',
    name: 'test',
    component: () => import('../pages/component-test.vue'),
    meta: {
      title: 'Component Testing Overview'
    }
  },
  // Standalone atomic button test page
  {
    path: '/test/atomic/button',
    name: 'test-atomic-button',
    component: () => import('../pages/componentTest/Button.vue'),
    meta: {
      title: 'Button Component Test',
      parentRoute: '/test',
      parentTitle: 'Component Testing'
    }
  },
  // Standalone atomic icon test page
  {
    path: '/test/atomic/icon',
    name: 'test-atomic-icon',
    component: () => import('../pages/componentTest/Icon.vue'),
    meta: {
      title: 'Icon Component Test',
      parentRoute: '/test',
      parentTitle: 'Component Testing'
    }
  }
]

export default testingRoutes
