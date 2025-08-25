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
        <CButton
          left-icon="book"
          @click="openStorybook('')"
        >
          View Storybook
        </CButton>
        <CButton
          variant="outline"
          left-icon="github"
          @click="openGitHub"
        >
          GitHub
        </CButton>
      </div>
    </div>

    <!-- Content Section -->
    <div class="home-content">
      <section
        v-for="(components, category) in componentsByCategory"
        :key="category"
        class="category-section"
      >
        <div class="category-header">
          <div class="category-title-group">
            <h2 class="category-title">
              {{ category }} Components
              <span class="category-count">({{ getCategoryStatsForCategory(category).total }})</span>
            </h2>
            <p class="category-description">
              {{ categoryDescriptions[category as keyof typeof categoryDescriptions] }}
            </p>
          </div>
          <div class="category-progress">
            <div class="progress-stats">
              <span class="progress-text">
                {{ getCategoryStatsForCategory(category).implemented }} of {{ getCategoryStatsForCategory(category).total }} implemented
              </span>
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{ width: `${(getCategoryStatsForCategory(category).implemented / getCategoryStatsForCategory(category).total) * 100}%` }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="components-table-container">
          <table class="components-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="component in components"
                :key="component.name"
                :class="component.implemented ? '' : 'component-row--pending'"
              >
                <td>
                  <router-link
                    :to="component.docPath"
                    class="component-name-link"
                  >
                    {{ component.name }}
                  </router-link>
                </td>
                <td class="component-description">
                  {{ component.description }}
                </td>
                <td>
                  <span
                    :class="[
                      'status-badge',
                      component.implemented ? 'status-badge--ready' : 'status-badge--pending'
                    ]"
                  >
                    {{ component.implemented ? '✓ Ready' : '⏳ Planned' }}
                  </span>
                </td>
                <td>
                  <div class="component-actions">
                    <router-link :to="component.docPath">
                      <CButton size="sm" variant="ghost">
                        Docs
                      </CButton>
                    </router-link>
                    <CButton
                      v-if="component.implemented && component.storybookPath"
                      size="sm"
                      variant="outline"
                      left-icon="external-link"
                      @click="openStorybook(component.storybookPath)"
                    >
                      Storybook
                    </CButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getComponentsByCategory, getCategoryStats } from '../data/components'
import { CButton } from '../../lib/index'
import './HomePage.css'

const componentsByCategory = computed(() => getComponentsByCategory())
const categoryStats = computed(() => getCategoryStats())

const totalImplemented = computed(() =>
  categoryStats.value.reduce((sum, stat) => sum + stat.implemented, 0)
)
const totalComponents = computed(() =>
  categoryStats.value.reduce((sum, stat) => sum + stat.total, 0)
)

const categoryDescriptions = {
  ATOMIC: 'Basic building blocks - fundamental components that cannot be broken down further',
  MOLECULAR: 'Simple combinations - components built by combining atomic components',
  ORGANISM: 'Complex UI patterns - sophisticated components with multiple features',
  TEMPLATE: 'Layout patterns - page-level structure and navigation components',
  ADVANCED: 'Complex interactions - feature-rich components with advanced functionality'
}

const getCategoryStatsForCategory = (category: string) => {
  return categoryStats.value?.find(stat => stat.category === category) || { implemented: 0, total: 0 }
}

const openStorybook = (path: string) => {
  window.open(`http://localhost:6006${path}`, '_blank')
}

const openGitHub = () => {
  window.open('https://github.com/dev-1603/celestialui-vue', '_blank')
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
