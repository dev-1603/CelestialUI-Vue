import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import PlaygroundPage from '../pages/PlaygroundPage.vue'
import ComponentDocPage from '../pages/ComponentDocPage.vue'
import PlaceholderPage from '../pages/PlaceholderPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'CelestialUI Components'
    }
  },
  {
    path: '/playground',
    name: 'playground',
    component: PlaygroundPage,
    meta: {
      title: 'Component Playground'
    }
  },
  {
    path: '/themes',
    name: 'themes',
    component: () => import('../pages/ThemesPage.vue'),
    meta: {
      title: 'Themes'
    }
  },
  // Component documentation routes
  {
    path: '/components/:category/:componentName',
    name: 'component-doc',
    component: ComponentDocPage,
    meta: {
      title: 'Component Documentation'
    }
  },
  // Placeholder routes for undeveloped components
  {
    path: '/components/atomic/:componentName',
    name: 'atomic-component',
    component: PlaceholderPage,
    meta: {
      title: 'Component - Coming Soon'
    }
  },
  {
    path: '/components/molecular/:componentName',
    name: 'molecular-component',
    component: PlaceholderPage,
    meta: {
      title: 'Component - Coming Soon'
    }
  },
  {
    path: '/components/organism/:componentName',
    name: 'organism-component',
    component: PlaceholderPage,
    meta: {
      title: 'Component - Coming Soon'
    }
  },
  {
    path: '/components/template/:componentName',
    name: 'template-component',
    component: PlaceholderPage,
    meta: {
      title: 'Component - Coming Soon'
    }
  },
  {
    path: '/components/advanced/:componentName',
    name: 'advanced-component',
    component: PlaceholderPage,
    meta: {
      title: 'Component - Coming Soon'
    }
  },
  // Legacy routes for backward compatibility
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: 'About'
    }
  },
  {
    path: '/component-test',
    name: 'component-test',
    component: () => import('../views/component-test.vue'),
    meta: {
      title: 'Component Test'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Add global navigation guard for document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'CelestialUI'} - Vue Component Library`
  next()
})

export default router
