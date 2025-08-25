<template>
  <header class="flex items-center justify-between h-16 px-6 bg-background-surface border-b border-border-base sticky top-0 z-50 backdrop-blur-sm shadow-md">
    <div class="flex items-center gap-4">
      <CButton
        variant="ghost"
        size="sm"
        icon-only
        :left-icon="sidebarOpen ? 'times' : 'bars'"
        @click="$emit('toggle-sidebar')"
        :aria-label="sidebarOpen ? 'Close sidebar' : 'Open sidebar'"
        class="md:hidden"
      />
      <router-link
        to="/"
        class="flex items-baseline gap-2 text-decoration-none text-text-primary hover:text-text-secondary transition-colors"
      >
        <h1 class="text-2xl font-bold m-0 bg-gradient-to-br from-primary-500 to-secondary-500 bg-clip-text text-transparent">
          CelestialUI
        </h1>
        <span class="text-xs text-text-secondary bg-primary-50 px-1.5 py-0.5 rounded font-medium">
          v1.0.0
        </span>
      </router-link>
    </div>

    <!-- Center Navigation -->
    <nav class="hidden md:flex items-center gap-8">
      <CButton
        variant="ghost"
        size="sm"
        class="font-medium text-sm"
        @click="$router.push('/')"
      >
        Components
      </CButton>
      <CButton
        variant="ghost"
        size="sm"
        class="font-medium text-sm"
        @click="$router.push('/playground')"
      >
        Playground
      </CButton>
      <CButton
        variant="ghost"
        size="sm"
        class="font-medium text-sm"
        @click="$router.push('/themes')"
      >
        Themes
      </CButton>
      <CButton
        variant="ghost"
        size="sm"
        right-icon="external-link"
        class="font-medium text-sm"
        @click="openStorybook"
      >
        Storybook
      </CButton>
      <CButton
        variant="ghost"
        size="sm"
        right-icon="external-link"
        class="font-medium text-sm"
        @click="openDocs"
      >
        Docs
      </CButton>
    </nav>

    <div class="flex items-center gap-3">
      <!-- Dark/Light Mode Toggle -->
      <CButton
        variant="outline"
        size="sm"
        :left-icon="isDark ? 'sun' : 'moon'"
        @click="toggleTheme"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        {{ isDark ? 'Light' : 'Dark' }}
      </CButton>

      <CButton
        variant="outline"
        size="sm"
        left-icon="github"
        @click="openGitHub"
      >
        GitHub
      </CButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useTheme, CButton } from '../../../lib/index'

interface Props {
  sidebarOpen: boolean
}

interface Emits {
  (e: 'toggle-sidebar'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { isDark, toggleTheme } = useTheme()

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
/* Additional styles can be added here if needed */
</style>
