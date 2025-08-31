<template>
  <div class="p-6">
    <div class="text-center py-12">
      <div class="mb-8">
        <div class="text-6xl text-blue-500 mx-auto mb-4 animate-spin">⚙️</div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ componentName }}</h1>
        <p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          This component is currently under development. We're working hard to bring you the best possible implementation.
        </p>
      </div>

      <!-- Planned Features -->
      <div class="max-w-4xl mx-auto mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Planned Features</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="feature in plannedFeatures" :key="feature.title" class="flex items-start gap-3">
            <div class="text-green-500 mt-1 flex-shrink-0">✅</div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{{ feature.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Development Roadmap -->
      <div class="max-w-4xl mx-auto mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Development Roadmap</h2>
        </div>
        <div class="space-y-4">
          <div v-for="(phase, index) in developmentPhases" :key="phase.name" class="flex items-start gap-4">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold text-sm">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{{ phase.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ phase.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="task in phase.tasks"
                  :key="task"
                  class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                >
                  {{ task }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Want to Contribute?</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Help us build this component faster by contributing to the development or providing feedback.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            @click="openGitHub"
            class="btn btn-primary"
          >
            📁 View on GitHub
          </button>
          <button
            @click="openStorybook"
            class="btn btn-outline"
          >
            📖 View Storybook
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Get component name from route parameters
const componentName = computed(() => {
  const name = route.params.componentName as string
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Component'
})

// Generic planned features
const plannedFeatures = [
  {
    title: 'Accessibility First',
    description: 'Built with ARIA labels, keyboard navigation, and screen reader support.'
  },
  {
    title: 'Customizable Themes',
    description: 'Supports multiple themes and custom color schemes.'
  },
  {
    title: 'TypeScript Support',
    description: 'Full TypeScript definitions for better development experience.'
  },
  {
    title: 'Responsive Design',
    description: 'Works seamlessly across all device sizes and orientations.'
  },
  {
    title: 'Animation Ready',
    description: 'Smooth transitions and animations built-in.'
  },
  {
    title: 'Test Coverage',
    description: 'Comprehensive unit and integration tests included.'
  }
]

// Development phases
const developmentPhases = [
  {
    name: 'Design & Planning',
    description: 'Define component API, props, and behavior specifications.',
    tasks: ['API Design', 'Props Definition', 'Behavior Specs', 'Design Tokens']
  },
  {
    name: 'Core Implementation',
    description: 'Build the base component with essential functionality.',
    tasks: ['Vue Component', 'TypeScript Types', 'Basic Styling', 'Event Handling']
  },
  {
    name: 'Enhanced Features',
    description: 'Add advanced features, animations, and customization options.',
    tasks: ['Animations', 'Variants', 'Slots', 'Advanced Props']
  },
  {
    name: 'Testing & Documentation',
    description: 'Comprehensive testing and documentation creation.',
    tasks: ['Unit Tests', 'E2E Tests', 'Storybook Stories', 'API Docs']
  }
]

// Action handlers
const openGitHub = () => {
  window.open('https://github.com/dev-1603/celestialui-vue', '_blank')
}

const openStorybook = () => {
  window.open('http://localhost:6006', '_blank')
}
</script>

<style scoped>
/* Button Styles - Temporary until CButton is implemented */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  outline: none;
  font-family: inherit;
}

.btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.btn-primary:hover {
  background: #2563eb;
  border-color: #2563eb;
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  color: #2563eb;
  border-color: #93c5fd;
}

.btn-outline:hover {
  background: #eff6ff;
  border-color: #60a5fa;
  transform: translateY(-1px);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .btn-primary {
    background: #2563eb;
    border-color: #2563eb;
  }

  .btn-primary:hover {
    background: #1d4ed8;
    border-color: #1d4ed8;
  }

  .btn-outline {
    color: #60a5fa;
    border-color: #2563eb;
  }

  .btn-outline:hover {
    background: #172554;
    border-color: #3b82f6;
  }
}

/* Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 2s linear infinite;
}
</style>
