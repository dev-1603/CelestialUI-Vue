<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Component Playground</h1>
      <p class="text-gray-600 dark:text-gray-300 text-lg">
        Interactive examples and demonstrations of CelestialUI components.
      </p>
    </div>

    <!-- Development Notice -->
    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
      <div class="flex items-start gap-3">
        <div class="text-blue-500 text-2xl">🚧</div>
        <div>
          <h3 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
            Components Under Development
          </h3>
          <p class="text-blue-700 dark:text-blue-300 mb-4">
            The CelestialUI component library is currently in active development.
            Components will be implemented according to the roadmap and will appear here as they become available.
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm rounded-full">
              ⏳ Button
            </span>
            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm rounded-full">
              ⏳ Input
            </span>
            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm rounded-full">
              ⏳ Card
            </span>
            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm rounded-full">
              ⏳ Modal
            </span>
            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm rounded-full">
              ⏳ Icon
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Playground Preview -->
    <div class="space-y-8">
      <!-- Sample Component Preview -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Component Preview Area
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Once components are implemented, they will be showcased here with interactive controls.
        </p>

        <!-- Mock Component Preview -->
        <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
          <div class="text-center">
            <div class="text-6xl mb-4">🎨</div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Interactive Component Demo
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
              Live component examples will appear here as they are developed
            </p>
          </div>
        </div>
      </div>

      <!-- Code Examples -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Code Examples
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Sample usage patterns and API examples for CelestialUI components.
        </p>

        <!-- Example Code Block -->
        <div class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm"><code class="text-gray-800 dark:text-gray-200"><!-- Future component examples -->
&lt;template&gt;
  &lt;div&gt;
    &lt;!-- Button Examples --&gt;
    &lt;CButton variant="primary"&gt;Primary Button&lt;/CButton&gt;
    &lt;CButton variant="outline"&gt;Outline Button&lt;/CButton&gt;

    &lt;!-- Input Examples --&gt;
    &lt;CInput
      v-model="value"
      placeholder="Enter text..."
      label="Example Input"
    /&gt;

    &lt;!-- Card Examples --&gt;
    &lt;CCard&gt;
      &lt;template #header&gt;
        &lt;h3&gt;Card Title&lt;/h3&gt;
      &lt;/template&gt;
      Card content goes here
    &lt;/CCard&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
      </div>

      <!-- Theme Testing -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Theme Testing
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Test components across different themes and color schemes.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="theme in themes"
            :key="theme.name"
            class="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-400 transition-colors"
            @click="selectTheme(theme)"
          >
            <div class="flex items-center gap-2 mb-2">
              <div
                class="w-4 h-4 rounded-full"
                :style="{ backgroundColor: theme.primary }"
              ></div>
              <span class="font-medium text-gray-900 dark:text-white">{{ theme.name }}</span>
            </div>
            <div class="flex gap-1">
              <div
                v-for="color in [theme.primary, theme.secondary, theme.accent]"
                :key="color"
                class="w-6 h-6 rounded"
                :style="{ backgroundColor: color }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Component Status -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Development Status
        </h2>
        <div class="space-y-3">
          <div
            v-for="component in componentStatus"
            :key="component.name"
            class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div class="flex items-center gap-3">
              <span class="text-lg">{{ component.icon }}</span>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">{{ component.name }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ component.description }}</div>
              </div>
            </div>
            <span
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                component.status === 'ready'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : component.status === 'development'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              ]"
            >
              {{ component.status === 'ready' ? '✅ Ready' : component.status === 'development' ? '🚧 In Progress' : '⏳ Planned' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Theme options for testing
const themes = ref([
  {
    name: 'Default',
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#06b6d4'
  },
  {
    name: 'Dark',
    primary: '#1d4ed8',
    secondary: '#7c3aed',
    accent: '#0891b2'
  },
  {
    name: 'Forest',
    primary: '#059669',
    secondary: '#0d9488',
    accent: '#84cc16'
  },
  {
    name: 'Sunset',
    primary: '#dc2626',
    secondary: '#ea580c',
    accent: '#f59e0b'
  }
])

// Component development status
const componentStatus = ref([
  {
    name: 'Button',
    description: 'Action trigger component',
    icon: '🔘',
    status: 'planned'
  },
  {
    name: 'Input',
    description: 'Text input field',
    icon: '📝',
    status: 'planned'
  },
  {
    name: 'Card',
    description: 'Content container',
    icon: '🗃️',
    status: 'planned'
  },
  {
    name: 'Modal',
    description: 'Overlay dialog',
    icon: '🪟',
    status: 'planned'
  },
  {
    name: 'Icon',
    description: 'SVG icon system',
    icon: '⭐',
    status: 'planned'
  },
  {
    name: 'Toast',
    description: 'Notification system',
    icon: '🔔',
    status: 'development'
  }
])

// Theme selection
const selectTheme = (theme: any) => {
  console.log('Selected theme:', theme.name)
  // Theme switching logic will be implemented with the theme system
}
</script>

<style scoped>
/* Component-specific styles */
.theme-preview {
  transition: all 0.2s ease;
}

.theme-preview:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Code block styling */
pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.5;
}

/* Animation for status cards */
.space-y-3 > div {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
