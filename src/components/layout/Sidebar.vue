<template>
  <div>
    <!-- Mobile Overlay -->
    <div
      v-if="isOpen"
      class="fixed md:hidden top-16 left-0 w-screen h-[calc(100vh-4rem)] bg-black bg-opacity-50 z-40"
      @click="$emit('close')"
    />

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed md:static top-16 left-0 w-80 h-[calc(100vh-4rem)] bg-background-surface border-r border-border-base shadow-lg z-50 transform transition-transform duration-300 overflow-hidden',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <div class="h-full flex flex-col py-6 gap-4">
        <!-- Overview Card -->
        <div class="mx-4 p-4 min-w-0 bg-white rounded-lg shadow-md border">
          <h3 class="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Overview</h3>
          <div class="flex flex-col gap-2 min-w-0">
            <CButton
              :variant="route.path === '/' ? 'primary' : 'ghost'"
              size="sm"
              left-icon="home"
              class="font-medium"
              @click="navigateTo('/')"
              full-width
              justify="start"
            >
              All Components
            </CButton>
            <CButton
              :variant="route.path === '/playground' ? 'primary' : 'ghost'"
              size="sm"
              left-icon="gamepad"
              class="font-medium "
              @click="navigateTo('/playground')"
              full-width
              justify="start"
            >
              Playground
            </CButton>
            <CButton
              :variant="route.path === '/themes' ? 'primary' : 'ghost'"
              size="sm"
              left-icon="palette"
              class="font-medium justify-start"
              @click="navigateTo('/themes')"
              full-width
              justify="start"
            >
              Themes
            </CButton>
          </div>
        </div>

        <!-- Components by Category Card -->
        <div class="mx-4 p-4 flex-1 min-h-0 flex flex-col min-w-0">
          <h3 class="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
            Components by Category
          </h3>

          <div class=" overflow-y-auto space-y-3 min-w-0 max-h-[820px]" style="min-height: 0;">
            <div v-for="(components, category) in componentsByCategory" :key="category" class="space-y-2 flex-shrink-0">
              <div
                class="w-full p-3 rounded-lg hover:bg-background-hover transition-colors duration-200 cursor-pointer"
                @click="toggleCategory(category)"
              >
                <div class="flex items-center justify-between w-full min-w-0">
                  <div class="flex items-center gap-3 min-w-0 flex-1">
                    <span class="text-lg w-6 h-6 flex items-center justify-center text-primary-500 flex-shrink-0">
                      <i :class="`fas fa-${categoryIcons[category as keyof typeof categoryIcons]}`" />
                    </span>
                    <div class="text-left min-w-0 flex-1">
                      <div class="font-semibold text-sm text-text-primary truncate">{{ category }}</div>
                      <div class="text-xs text-text-secondary truncate">
                        {{ categoryDescriptions[category as keyof typeof categoryDescriptions] }}
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 flex-shrink-0">
                    <span class="bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap" v-if="getCategoryStatsForCategory(category)">
                      {{ getCategoryStatsForCategory(category)?.implemented }}/{{ getCategoryStatsForCategory(category)?.total }}
                    </span>
                    <i :class="`fas fa-chevron-${expandedCategories[category] ? 'up' : 'down'} text-xs text-text-secondary`" />
                  </div>
                </div>
              </div>

              <div v-if="expandedCategories[category]" class="ml-6 mt-3 border-l-2 border-border-light pl-3 max-h-80 overflow-y-auto">
                <div class="space-y-1">
                  <router-link
                    v-for="component in components"
                    :key="component.name"
                    :to="component.docPath"
                    :class="[
                      'flex items-center justify-between py-2 px-3 text-text-secondary no-underline rounded-md transition-all duration-200 hover:bg-background-hover group',
                      route.path === component.docPath ? 'bg-primary-50 text-primary-600 font-semibold' : '',
                      component.implemented ? '' : 'opacity-60 cursor-not-allowed'
                    ]"
                    @click="$emit('close')"
                  >
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 text-sm mb-1">
                        {{ component.name }}
                        <span
                          v-if="component.implemented"
                          class="bg-success-100 text-success-700 text-xs px-1.5 py-0.5 rounded-full font-semibold"
                        >
                          ✓
                        </span>
                      </div>
                      <div class="text-xs text-text-muted truncate leading-relaxed">
                        {{ component.description }}
                      </div>
                    </div>
                    <a
                      v-if="component.implemented && component.storybookPath"
                      :href="`http://localhost:6006${component.storybookPath}`"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-text-secondary text-xs p-1.5 rounded transition-all duration-200 opacity-0 group-hover:opacity-100"
                      @click.stop
                      title="View in Storybook"
                    >
                      <i class="fas fa-external-link-alt" />
                    </a>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Overview Card -->
        <!-- <CCard :elevation="1" class="mx-4 mt-auto p-4 border-t border-border-base">
          <template #header>
            <h4 class="text-sm font-semibold text-text-primary mb-4">Progress Overview</h4>
          </template>
          <div v-for="stat in categoryStats" :key="stat.category" class="flex justify-between items-center py-1 text-xs">
            <span class="text-text-secondary font-medium">{{ stat.category }}</span>
            <span class="text-text-primary font-semibold">
              {{ stat.implemented }}/{{ stat.total }}
            </span>
          </div>
        </CCard> -->
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
// SIDEBAR COMPONENT LOGIC (COMMENTED FOR STRUCTURE ONLY)
import { CButton } from '@lib/components/atoms/button'

import { ref, computed, defineOptions } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getComponentsByCategory, getCategoryStats } from '../../data/components'

defineOptions({
  name: 'SidebarLayout'
})

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// All functionality commented out - showing structure only
const route = useRoute()
const router = useRouter()
const expandedCategories = ref<Record<string, boolean>>({})

const categoryIcons = {
  'ATOMIC': 'atom',
  'MOLECULAR': 'molecule',
  'ORGANISM': 'sitemap',
  'TEMPLATE': 'layer-group',
  'ADVANCED': 'cogs'
}

const categoryDescriptions = {
  'ATOMIC': 'Basic building blocks',
  'MOLECULAR': 'Simple combinations',
  'ORGANISM': 'Complex components',
  'TEMPLATE': 'Page layouts',
  'ADVANCED': 'Advanced features'
}

const componentsByCategory = computed(() => getComponentsByCategory())
const categoryStats = computed(() => getCategoryStats())

const toggleCategory = (category: string) => {
  expandedCategories.value[category] = !expandedCategories.value[category]
}

const navigateTo = (path: string) => {
  router.push(path)
}

const getCategoryStatsForCategory = (category: string) => {
  const stats = categoryStats.value.find(stat => stat.category === category)
  return stats || null
}
</script>

<style scoped>
/* SIDEBAR STYLES (BASIC STRUCTURE) */

.mobile-overlay {
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100vw;
  height: calc(100vh - 4rem);
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: block;
}

@media (min-width: 768px) {
  .mobile-overlay {
    display: none;
  }
}

.sidebar {
  position: fixed;
  top: 4rem;
  left: 0;
  width: 20rem;
  height: calc(100vh - 4rem);
  background: white;
  border-right: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 50;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow: hidden;
}

@media (min-width: 768px) {
  .sidebar {
    position: static;
    transform: translateX(0);
  }
}

.sidebar--open {
  transform: translateX(0);
}

.sidebar--closed {
  transform: translateX(-100%);
}

@media (min-width: 768px) {
  .sidebar--closed {
    transform: translateX(0);
  }
}

.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  gap: 1rem;
}

.sidebar-section {
  margin: 0 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.sidebar-section--flex {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.sidebar-section--footer {
  margin-top: auto;
  border-top: 1px solid #e5e7eb;
  background: #f3f4f6;
}

.section-title {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #374151;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #e5e7eb;
  color: #111827;
}

.categories-list {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding-right: 0.5rem;
}

.category-group {
  margin-bottom: 0.75rem;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
}

.category-header:hover {
  background: #f9fafb;
}

.category-icon {
  font-size: 1.125rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-info {
  flex: 1;
  min-width: 0;
}

.category-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: #111827;
}

.category-desc {
  font-size: 0.75rem;
  color: #6b7280;
}

.category-count {
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  white-space: nowrap;
}

.category-toggle {
  font-size: 0.75rem;
  color: #6b7280;
}

.progress-stats {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  font-size: 0.75rem;
}

.stat-item span:first-child {
  color: #6b7280;
  font-weight: 500;
}

.stat-item span:last-child {
  color: #111827;
  font-weight: 600;
}

/* Hide scrollbars */
.categories-list {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.categories-list::-webkit-scrollbar {
  display: none;
}
</style>
