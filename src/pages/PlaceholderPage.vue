<template>
  <div class="p-6">
    <div class="text-center py-12">
      <div class="mb-8">
        <CIcon name="cog" class="text-6xl text-primary-500 mx-auto mb-4 animate-spin" />
        <h1 class="text-3xl font-bold text-text-primary mb-4">{{ componentName }}</h1>
        <p class="text-text-secondary text-lg max-w-2xl mx-auto">
          This component is currently under development. We're working hard to bring you the best possible implementation.
        </p>
      </div>

      <!-- Planned Features -->
      <CCard class="max-w-4xl mx-auto mb-8">
        <template #header>
          <h2 class="text-xl font-semibold text-text-primary">Planned Features</h2>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="feature in plannedFeatures" :key="feature.title" class="flex items-start gap-3">
            <CIcon name="check-circle" class="text-success-500 mt-1 flex-shrink-0" />
            <div>
              <h3 class="font-semibold text-text-primary mb-1">{{ feature.title }}</h3>
              <p class="text-sm text-text-secondary">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </CCard>

      <!-- Development Roadmap -->
      <CCard class="max-w-4xl mx-auto mb-8">
        <template #header>
          <h2 class="text-xl font-semibold text-text-primary">Development Roadmap</h2>
        </template>
        <div class="space-y-4">
          <div v-for="(phase, index) in developmentPhases" :key="phase.name" class="flex items-start gap-4">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-sm">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-text-primary mb-1">{{ phase.name }}</h3>
              <p class="text-sm text-text-secondary mb-2">{{ phase.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="task in phase.tasks"
                  :key="task"
                  class="text-xs bg-background-secondary text-text-secondary px-2 py-1 rounded"
                >
                  {{ task }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CCard>

      <!-- Related Components -->
      <CCard class="max-w-4xl mx-auto mb-8">
        <template #header>
          <h2 class="text-xl font-semibold text-text-primary">Related Components</h2>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CCard
            v-for="related in relatedComponents"
            :key="related.name"
            class="p-4 hover:shadow-md transition-shadow cursor-pointer"
            @click="$router.push(related.docPath)"
          >
            <div class="flex items-center gap-3">
              <span class="text-lg text-primary-500">
                <i class="fas fa-cube" />
              </span>
              <div>
                <h3 class="font-semibold text-text-primary">{{ related.name }}</h3>
                <p class="text-sm text-text-secondary">{{ related.description }}</p>
                <span
                  :class="[
                    'inline-block mt-2 text-xs px-2 py-1 rounded-full',
                    related.implemented
                      ? 'bg-success-100 text-success-700'
                      : 'bg-warning-100 text-warning-700'
                  ]"
                >
                  {{ related.implemented ? 'Implemented' : 'Planned' }}
                </span>
              </div>
            </div>
          </CCard>
        </div>
      </CCard>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <CButton @click="$router.push('/')" variant="outline">
          Back to Components
        </CButton>
        <CButton @click="$router.push('/playground')">
          View Playground
        </CButton>
        <CButton
          variant="ghost"
          right-icon="external-link"
          @click="openGitHub"
        >
          View on GitHub
        </CButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getComponentByName, getComponentsByCategory } from '../data/components'
import { CButton, CCard, CIcon } from '../../lib/index'

const route = useRoute()
const router = useRouter()

const componentName = computed(() => route.params.componentName as string)
const component = computed(() => getComponentByName(componentName.value))

const plannedFeatures = [
  {
    title: 'Full Accessibility Support',
    description: 'WCAG 2.1 AA compliance with keyboard navigation and screen reader support'
  },
  {
    title: 'TypeScript Integration',
    description: 'Complete TypeScript definitions with proper type safety'
  },
  {
    title: 'Customizable Theming',
    description: 'Support for custom themes and design system integration'
  },
  {
    title: 'Comprehensive Documentation',
    description: 'Detailed API documentation with examples and best practices'
  },
  {
    title: 'Unit Testing',
    description: 'Full test coverage with Vitest and Vue Test Utils'
  },
  {
    title: 'Storybook Integration',
    description: 'Interactive component documentation and development environment'
  }
]

const developmentPhases = [
  {
    name: 'Core Implementation',
    description: 'Basic component functionality and core features',
    tasks: ['Component structure', 'Basic props', 'Event handling', 'Styling']
  },
  {
    name: 'Enhanced Features',
    description: 'Advanced features and customization options',
    tasks: ['Variants', 'Sizes', 'States', 'Animations']
  },
  {
    name: 'Accessibility & Testing',
    description: 'Accessibility improvements and comprehensive testing',
    tasks: ['ARIA attributes', 'Keyboard navigation', 'Unit tests', 'E2E tests']
  },
  {
    name: 'Documentation & Polish',
    description: 'Documentation, examples, and final polish',
    tasks: ['API documentation', 'Examples', 'Storybook stories', 'Performance optimization']
  }
]

const relatedComponents = computed(() => {
  if (!component.value) return []

  const componentsByCategory = getComponentsByCategory()
  const categoryComponents = componentsByCategory[component.value.category] || []

  return categoryComponents
    .filter(c => c.name !== component.value?.name)
    .slice(0, 6)
})

const openGitHub = () => {
  window.open('https://github.com/dev-1603/celestialui-vue', '_blank')
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
