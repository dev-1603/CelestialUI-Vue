<template>
  <div class="component-test-page">
    <div class="container mx-auto px-4 py-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Component Test Page
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          Test and demonstrate CelestialUI components in a controlled environment
        </p>
      </header>

      <!-- Navigation for Component Tests -->
      <nav class="mb-8">
        <div class="flex flex-wrap gap-4">
          <router-link
            to="/playground"
            exact-active-class="bg-blue-600 text-white"
            class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Overview
          </router-link>
          <router-link
            to="/playground/atomic/button"
            class="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            Button Test →
          </router-link>
          <router-link
            to="/playground/atomic/icon"
            class="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors"
          >
            Icon Test →
          </router-link>
                  <router-link
          to="/playground/atomic/checkbox"
          class="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          Checkbox Test →
        </router-link>
        <router-link
          to="/playground/atomic/input"
          class="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
        >
          Input Test →
        </router-link>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="grid gap-8">
        <!-- Quick Navigation Cards -->
        <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Available Component Tests
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Button Test Card -->
            <router-link
              to="/playground/atomic/button"
              class="group block p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm font-bold">B</span>
                </div>
                <h3 class="font-semibold text-blue-800 dark:text-blue-200">Button Component</h3>
              </div>
              <p class="text-sm text-blue-600 dark:text-blue-300">
                Test button variants, sizes, states, and interactions
              </p>
              <div class="mt-2 text-xs text-blue-500 dark:text-blue-400 group-hover:text-blue-600">
                Click to test →
              </div>
            </router-link>

            <!-- Icon Test Card -->
            <router-link
              to="/playground/atomic/icon"
              class="group block p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm font-bold">I</span>
                </div>
                <h3 class="font-semibold text-purple-800 dark:text-purple-200">Icon Component</h3>
              </div>
              <p class="text-sm text-purple-600 dark:text-purple-300">
                Test icon libraries, sizes, colors, and animations
              </p>
              <div class="mt-2 text-xs text-purple-500 dark:text-purple-400 group-hover:text-purple-600">
                Click to test →
              </div>
            </router-link>

            <!-- Checkbox Test Card -->
                    <router-link
          to="/playground/atomic/checkbox"
          class="group block p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span class="text-white text-sm font-bold">☑</span>
            </div>
            <h3 class="font-semibold text-orange-800 dark:text-orange-200">Checkbox Component</h3>
          </div>
          <p class="text-sm text-orange-600 dark:text-orange-300">
            Test checkbox states, sizes, colors, and form integration
          </p>
          <div class="mt-2 text-xs text-orange-500 dark:text-orange-400 group-hover:text-orange-600">
            Click to test →
          </div>
        </router-link>

        <router-link
          to="/playground/atomic/input"
          class="group block p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
        >
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span class="text-white text-sm font-bold">📝</span>
            </div>
            <h3 class="font-semibold text-green-800 dark:text-green-200">Input Component</h3>
          </div>
          <p class="text-sm text-green-600 dark:text-green-300">
            Test input types, validation, debouncing, and headless usage
          </p>
          <div class="mt-2 text-xs text-green-500 dark:text-green-400 group-hover:text-green-600">
            Click to test →
          </div>
        </router-link>

            <!-- Coming Soon Card -->
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 opacity-60">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                  <span class="text-white text-sm font-bold">+</span>
                </div>
                <h3 class="font-semibold text-gray-600 dark:text-gray-300">More Components</h3>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Additional component tests coming soon
              </p>
              <div class="mt-2 text-xs text-gray-400">
                Coming soon...
              </div>
            </div>
          </div>
        </section>

        <!-- Test Section 2: Interactive Components -->
        <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Interactive Components Test
          </h2>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Placeholder for interactive component tests -->
              <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <h3 class="font-medium mb-2 text-gray-800 dark:text-white">Modal Test</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Modal components will be tested here
                </p>
              </div>
              <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <h3 class="font-medium mb-2 text-gray-800 dark:text-white">Toast Test</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Toast notifications will be tested here
                </p>
              </div>
              <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <h3 class="font-medium mb-2 text-gray-800 dark:text-white">Form Test</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Form components will be tested here
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Test Section 3: Layout Components -->
        <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Layout Components Test
          </h2>
          <div class="space-y-4">
            <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
              <p class="text-center text-gray-500 dark:text-gray-400">
                Layout components (Grid, Container, Stack, etc.) will be tested here
              </p>
            </div>
          </div>
        </section>

        <!-- Test Section 4: Data Display -->
        <section class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Data Display Components Test
          </h2>
          <div class="space-y-4">
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">Component</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                    <th scope="col" class="px-6 py-3">Test Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Table
                    </th>
                    <td class="px-6 py-4">Pending</td>
                    <td class="px-6 py-4">Not Tested</td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Card
                    </th>
                    <td class="px-6 py-4">Pending</td>
                    <td class="px-6 py-4">Not Tested</td>
                  </tr>
                  <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Badge
                    </th>
                    <td class="px-6 py-4">Pending</td>
                    <td class="px-6 py-4">Not Tested</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- Test Controls -->
        <section class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">
            Test Controls
          </h2>
          <div class="flex flex-wrap gap-4">
            <button
              @click="runAllTests"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Run All Tests
            </button>
            <button
              @click="clearTests"
              class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Clear Results
            </button>
            <button
              @click="toggleTheme"
              class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Toggle Theme
            </button>
          </div>

          <!-- Test Results Display -->
          <div v-if="testResults.length > 0" class="mt-6">
            <h3 class="text-lg font-medium mb-3 text-blue-800 dark:text-blue-200">Test Results</h3>
            <div class="space-y-2">
              <div
                v-for="result in testResults"
                :key="result.id"
                class="p-3 rounded bg-white dark:bg-blue-800/50 border border-blue-200 dark:border-blue-700"
              >
                <div class="flex justify-between items-center">
                  <span class="font-medium text-blue-900 dark:text-blue-100">{{ result.test }}</span>
                  <span
                    :class="result.passed ? 'text-green-600' : 'text-red-600'"
                    class="font-semibold"
                  >
                    {{ result.passed ? 'PASS' : 'FAIL' }}
                  </span>
                </div>
                <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">{{ result.message }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// Router
const route = useRoute()

// Test state
const testResults = ref<Array<{
  id: string
  test: string
  passed: boolean
  message: string
}>>([])

// Test functions - simplified
const runAllTests = () => {
  testResults.value = [
    {
      id: '1',
      test: 'Basic Setup',
      passed: true,
      message: 'Vue app is running correctly'
    },
    {
      id: '2',
      test: 'Component Library',
      passed: false,
      message: 'Components ready to be built from scratch'
    }
  ]
}

const clearTests = () => {
  testResults.value = []
}

const toggleTheme = () => {
  console.log('Theme system to be implemented')
}
</script>

<style scoped>
.component-test-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.dark .component-test-page {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

/* Animation for test results */
.space-y-2 > div {
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








