<template>
  <header class="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm shadow-md">
    <div class="flex items-center gap-4">
      <button
        @click="$emit('toggle-sidebar')"
        :aria-label="sidebarOpen ? 'Close sidebar' : 'Open sidebar'"
        class="btn btn-ghost btn-sm md:hidden"
      >
        {{ sidebarOpen ? '✕' : '☰' }}
      </button>
      <router-link
        to="/"
        class="flex items-baseline gap-2 text-decoration-none text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <h1 class="text-2xl font-bold m-0 bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent">
          CelestialUI
        </h1>
        <span class="text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900 px-1.5 py-0.5 rounded font-medium">
          v1.0.0
        </span>
      </router-link>
    </div>

    <!-- Center Navigation -->
    <nav class="hidden md:flex items-center gap-8">
      <button
        class="btn btn-ghost btn-sm font-medium text-sm"
        @click="$router.push('/')"
      >
        Components
      </button>
      <button
        class="btn btn-ghost btn-sm font-medium text-sm"
        @click="$router.push('/playground')"
      >
        Playground
      </button>
      <button
        class="btn btn-ghost btn-sm font-medium text-sm"
        @click="$router.push('/button-test')"
      >
        Button Test
      </button>
      <button
        class="btn btn-ghost btn-sm font-medium text-sm"
        @click="$router.push('/themes')"
      >
        Themes
      </button>
      <button
        class="btn btn-ghost btn-sm font-medium text-sm"
        @click="openStorybook"
      >
        Storybook ↗
      </button>
      <button
        class="btn btn-ghost btn-sm font-medium text-sm"
        @click="openDocs"
      >
        Docs ↗
      </button>
    </nav>

    <div class="flex items-center gap-3">
      <!-- Dark/Light Mode Toggle -->
      <button
        class="btn btn-outline btn-sm"
        @click="toggleTheme"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        {{ isDark ? '☀️ Light' : '🌙 Dark' }}
      </button>

      <button
        class="btn btn-outline btn-sm"
        @click="openGitHub"
      >
        📁 GitHub
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  sidebarOpen: boolean
}

interface Emits {
  (e: 'toggle-sidebar'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Simple theme toggle (will be replaced with proper theme system)
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  // Theme switching logic will be implemented with the theme system
  console.log('Theme toggle - to be implemented with theme system')
}

const openStorybook = () => {
  window.open('http://localhost:6006', '_blank')
}

const openDocs = () => {
  window.open('http://localhost:3000', '_blank')
}

const openGitHub = () => {
  window.open('https://github.com/dev-1603/celestialui-vue', '_blank')
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

.btn-ghost {
  background: transparent;
  color: #6b7280;
  border-color: transparent;
}

.btn-ghost:hover {
  background: #f3f4f6;
  color: #111827;
}

.btn-outline {
  background: transparent;
  color: #2563eb;
  border-color: #93c5fd;
}

.btn-outline:hover {
  background: #eff6ff;
  border-color: #60a5fa;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .btn-ghost {
    color: #9ca3af;
  }

  .btn-ghost:hover {
    background: #374151;
    color: #f9fafb;
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
</style>
