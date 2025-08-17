import type { RouteRecordRaw } from 'vue-router'
import ComponentLayout from '@/pages/components/index.vue'
import ComponentDashboard from '@/pages/components/dashboard.vue'

const componentRoutes: RouteRecordRaw = {
  path: '/components',
  component: ComponentLayout,
  name: 'Components',
  // Add a redirect to make /components load the dashboard by default
  redirect: { name: 'ComponentsDashboard' },
  children: [
    {
      path: '',
      name: 'ComponentsDashboard',
      component: ComponentDashboard,
      meta: {
        title: 'Components Dashboard',
        description: 'Overview of all available components'
      }
    },
    {
      path: 'input',
      name: 'ComponentInput',
      component: () => import('@/pages/components/c-Input.vue'),
      meta: {
        title: 'CUI-Input',
        description: 'Input component documentation and examples'
      }
    },
    {
      path: 'radio',
      name: 'ComponentRadio',
      component: () => import('@/pages/components/c-radio.vue'),
      meta: {
        title: 'CUI-Radio',
        description: 'Radio component documentation and examples'
      }
    },
    {
      path: 'icon',
      name: 'ComponentIcon',
      component: () => import('@/pages/components/c-icon.vue'),
      meta: {
        title: 'CUI-Icon',
        description: 'Icon component documentation and examples'
      }
    }
  ]
}

export default [componentRoutes]

