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
      title: 'Component Testing Overview',
    },
  },
  // Standalone atomic button test page
  {
    path: '/playground/atomic/button',
    name: 'test-atomic-button',
    component: () => import('../pages/componentTest/Button.vue'),
    meta: {
      title: 'Button Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
  // Standalone atomic icon test page
  {
    path: '/playground/atomic/icon',
    name: 'test-atomic-icon',
    component: () => import('../pages/componentTest/Icon.vue'),
    meta: {
      title: 'Icon Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
  // Standalone atomic checkbox test page
  {
    path: '/playground/atomic/checkbox',
    name: 'test-atomic-checkbox',
    component: () => import('../pages/componentTest/Checkbox.vue'),
    meta: {
      title: 'Checkbox Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },

  // Standalone atomic input test page
  {
    path: '/playground/atomic/input',
    name: 'test-atomic-input',
    component: () => import('../pages/componentTest/Input.vue'),
    meta: {
      title: 'Input Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },

  // Input customization examples
  {
    path: '/playground/atomic/input/customization',
    name: 'test-input-customization',
    component: () => import('../pages/componentTest/InputCustomization.vue'),
    meta: {
      title: 'Input Customization Examples',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },

  // Standalone atomic alert test page
  {
    path: '/playground/atomic/alert',
    name: 'test-atomic-alert',
    component: () => import('../pages/componentTest/Alert.vue'),
    meta: {
      title: 'Alert Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },

  // Standalone atomic avatar test page
  {
    path: '/playground/atomic/avatar',
    name: 'test-atomic-avatar',
    component: () => import('../pages/componentTest/Avatar.vue'),
    meta: {
      title: 'Avatar Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },

  // Standalone atomic breadcrumb test page
  {
    path: '/playground/atomic/breadcrumb',
    name: 'test-atomic-breadcrumb',
    component: () => import('../pages/componentTest/Breadcrumb.vue'),
    meta: {
      title: 'Breadcrumb Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },

  // Standalone atomic card test page
  {
    path: '/playground/atomic/card',
    name: 'test-atomic-card',
    component: () => import('../pages/componentTest/Card.vue'),
    meta: {
      title: 'Card Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },

  // Standalone atomic progress test page
  {
    path: '/playground/atomic/progress',
    name: 'test-atomic-progress',
    component: () => import('../pages/componentTest/Progress.vue'),
    meta: {
      title: 'Progress Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },

  // Standalone atomic switch test page
  {
    path: '/playground/atomic/switch',
    name: 'test-atomic-switch',
    component: () => import('../pages/componentTest/Switch.vue'),
    meta: {
      title: 'Switch Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
  // Standalone molecular dialog test page
  {
    path: '/playground/molecular/dialog',
    name: 'test-molecular-dialog',
    component: () => import('../pages/componentTest/Dialog.vue'),
    meta: {
      title: 'Dialog Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
  
  // Standalone molecular dropdown-menu test page
  {
    path: '/playground/molecular/dropdown-menu',
    name: 'test-molecular-dropdown-menu',
    component: () => import('../pages/componentTest/DropdownMenu.vue'),
    meta: {
      title: 'DropdownMenu Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },

  // Standalone molecular tabs test page
  {
    path: '/playground/molecular/tabs',
    name: 'test-molecular-tabs',
    component: () => import('../pages/componentTest/Tabs.vue'),
    meta: {
      title: 'Tabs Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
  // Standalone molecular pin-input test page
  {
    path: '/playground/molecular/pin-input',
    name: 'test-molecular-pin-input',
    component: () => import('../pages/componentTest/PinInput.vue'),
    meta: {
      title: 'PinInput Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },

  // Standalone molecular password-input test page
  {
    path: '/playground/molecular/password-input',
    name: 'test-molecular-password-input',
    component: () => import('../pages/componentTest/PasswordInput.vue'),
    meta: {
      title: 'PasswordInput Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
  // Standalone molecular social-login-button test page
  {
    path: '/playground/molecular/social-login-button',
    name: 'test-molecular-social-login-button',
    component: () => import('../pages/componentTest/SocialLoginButton.vue'),
    meta: {
      title: 'SocialLoginButton Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
  // Standalone molecular countdown-timer test page
  {
    path: '/playground/molecular/countdown-timer',
    name: 'test-molecular-countdown-timer',
    component: () => import('../pages/componentTest/CountdownTimer.vue'),
    meta: {
      title: 'CountdownTimer Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
  // Standalone organism user-tenant-dropdown test page
  {
    path: '/playground/organism/user-tenant-dropdown',
    name: 'test-organism-user-tenant-dropdown',
    component: () => import('../pages/componentTest/UserTenantDropdown.vue'),
    meta: {
      title: 'UserTenantDropdown Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
  // Standalone organism identifier-first-resolver test page
  {
    path: '/playground/organism/identifier-first-resolver',
    name: 'test-organism-identifier-first-resolver',
    component: () => import('../pages/componentTest/IdentifierFirstResolver.vue'),
    meta: {
      title: 'IdentifierFirstResolver Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
  // Standalone organism auth-method-dispatcher test page
  {
    path: '/playground/organism/auth-method-dispatcher',
    name: 'test-organism-auth-method-dispatcher',
    component: () => import('../pages/componentTest/AuthMethodDispatcher.vue'),
    meta: {
      title: 'AuthMethodDispatcher Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
  // Standalone organism mfa-challenge-panel test page
  {
    path: '/playground/organism/mfa-challenge-panel',
    name: 'test-organism-mfa-challenge-panel',
    component: () => import('../pages/componentTest/MfaChallengePanel.vue'),
    meta: {
      title: 'MfaChallengePanel Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
  // Standalone organism qr-session-canvas test page
  {
    path: '/playground/organism/qr-session-canvas',
    name: 'test-organism-qr-session-canvas',
    component: () => import('../pages/componentTest/QrSessionCanvas.vue'),
    meta: {
      title: 'QrSessionCanvas Component Test',
      parentRoute: '/playground',
      parentTitle: 'Component Testing',
    },
  },
]

export default testingRoutes
