<template>
  <div class="home-page mx-auto">
    <!-- Header Section -->
    <div class="home-header">
      <h1>CelestialUI Components</h1>
      <p class="home-description">
        A comprehensive Vue 3 component library with multi-framework styling support.
        Build beautiful, accessible interfaces with our growing collection of components.
      </p>

      <div class="home-stats">
        <div class="stat-card">
          <div class="stat-number">{{ totalImplemented }}</div>
          <div class="stat-label">Components Ready</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ totalComponents }}</div>
          <div class="stat-label">Total Planned</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ Math.round((totalImplemented / totalComponents) * 100) }}%</div>
          <div class="stat-label">Progress</div>
        </div>
      </div>

      <div class="home-actions">
        <button
          @click="openStorybook"
          class="btn btn-primary"
        >
          📖 View Storybook
        </button>
        <button
          @click="openGitHub"
          class="btn btn-outline"
        >
          📁 GitHub
        </button>
      </div>
    </div>

    <!-- Content Section -->
    <div class="home-content">
      <section class="category-section">
        <div class="category-header">
          <div class="category-title-group">
            <h2 class="category-title">
              Component Library
              <span class="category-count">(Coming Soon)</span>
            </h2>
            <p class="category-description">
              Components will be built and displayed here as development progresses.
            </p>
          </div>
        </div>

        <div class="components-table-container">
          <div class="text-center py-8 text-gray-500">
            <div class="text-6xl mb-4">🚧</div>
            <h3 class="text-xl font-semibold mb-2">Components Under Development</h3>
            <p>This section will be populated as components are implemented.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// HOMEPAGE COMPONENT LOGIC (COMMENTED FOR STRUCTURE ONLY)

import { ref } from 'vue'
import './HomePage.css'

// Basic demo data for structure display
const totalImplemented = ref(3)
const totalComponents = ref(10)

// All complex functionality commented out - showing structure only
// import { getComponentsByCategory, getCategoryStats } from '../data/components'
// const componentsByCategory = computed(() => getComponentsByCategory())
// const categoryStats = computed(() => getCategoryStats())
// const totalImplemented = computed(() => /* calculation logic */)
// const totalComponents = computed(() => /* calculation logic */)
// const categoryDescriptions = { /* category descriptions */ }
// const getCategoryStatsForCategory = (category: string) => { /* stats logic */ }

const openStorybook = () => {
  // window.open('http://localhost:6006', '_blank')
  console.log('Would open Storybook')
}

const openGitHub = () => {
  // window.open('https://github.com/dev-1603/celestialui-vue', '_blank')
  console.log('Would open GitHub')
}
</script>

<style scoped>
/* Temporary button styles until components are built */
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

.btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
