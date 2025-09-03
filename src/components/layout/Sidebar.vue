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
              class="font-medium py-2 items-center"
              @click="navigateTo('/')"
              full-width
              justify="start"
            >
              <template #leftIcon>
                <CIcon name="home" library="material" variant="filled" size="25px" />
              </template>
              All Components
            </CButton>
            <CButton
              :variant="route.path === '/playground' ? 'primary' : 'ghost'"
              size="sm"
              left-icon="gamepad"
              class="font-medium"
              @click="navigateTo('/playground')"
              full-width
              justify="start"
            >
              <template #leftIcon>
                <CIcon name="gamepad" library="material" variant="filled" size="25px" />
              </template>
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
              <template #leftIcon>
                <CIcon name="palette" library="material" variant="filled" size="25px" />
              </template>
              Themes
            </CButton>
          </div>
        </div>

        <!-- Components by Category Card -->
        <div class=" flex-1 min-h-0 flex flex-col min-w-0">
          <h3 class="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider px-4">
            Components by Category
          </h3>

          <div class="flex-1 overflow-y-auto space-y-3 min-w-0 px-4">
            <div
              v-for="(components, category) in componentsByCategory"
              :key="category"
              class="space-y-2 flex-shrink-0"
            >
              <!-- Category Header -->
              <div
                class="w-full p-3 rounded-lg hover:bg-background-hover transition-colors duration-200 cursor-pointer border border-transparent hover:border-border-light"
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
                    <span
                      v-if="getCategoryStatsForCategory(category)"
                      class="bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap"
                    >
                      {{ getCategoryStatsForCategory(category)?.implemented }}/{{ getCategoryStatsForCategory(category)?.total }}
                    </span>
                    <i
                      :class="[
                        'fas text-xs text-text-secondary transition-transform duration-200',
                        expandedCategories[category] ? 'fa-chevron-up' : 'fa-chevron-down'
                      ]"
                    />
                  </div>
                </div>
              </div>

              <!-- Category Content -->
              <Transition
                name="category-expand"
                mode="out-in"
              >
                <div
                  v-if="expandedCategories[category]"
                  class="ml-6 mt-3 border-l-2 border-border-light pl-3 space-y-1"
                >
                  <router-link
                    v-for="component in components"
                    :key="component.name"
                    :to="component.implemented ? component.docPath : ''"
                    :class="[
                      'flex items-center justify-between py-2 px-3 text-text-secondary no-underline rounded-md transition-all duration-200 hover:bg-background-hover group',
                      route.path === component.docPath ? 'bg-primary-50 text-primary-600 font-semibold border border-primary-200' : '',
                      component.implemented ? 'hover:text-text-primary' : 'opacity-60 cursor-not-allowed'
                    ]"
                    @click="component.implemented ? $emit('close') : undefined"
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
                      class="text-text-secondary text-xs p-1.5 rounded transition-all duration-200 opacity-0 group-hover:opacity-100 hover:bg-background-hover"
                      @click.stop
                      title="View in Storybook"
                    >
                      <i class="fas fa-external-link-alt" />
                    </a>
                  </router-link>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Progress Overview Card -->
        <div class="mx-4 mt-auto p-4 border-t border-border-base bg-background-surface rounded-lg shadow-sm">
          <h4 class="text-sm font-semibold text-text-primary mb-4">Progress Overview</h4>
          <div v-for="stat in categoryStats" :key="stat.category" class="flex justify-between items-center py-1 text-xs">
            <span class="text-text-secondary font-medium">{{ stat.category }}</span>
            <span class="text-text-primary font-semibold">
              {{ stat.implemented }}/{{ stat.total }}
            </span>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { CButton } from '@lib/components/atoms/button'
import { CIcon } from '@lib/components/atoms/icon'

import { ref, computed, defineOptions, onMounted } from 'vue'
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

const route = useRoute()
const router = useRouter()

// Category expansion state management
const expandedCategories = ref<Record<string, boolean>>({})

// Initialize with all categories expanded by default
onMounted(() => {
  const categories = Object.keys(getComponentsByCategory())
  categories.forEach(category => {
    expandedCategories.value[category] = true
  })
})

const categoryIcons = {
  'ATOMIC': 'atom',
  'MOLECULAR': 'molecule',
  'ORGANISM': 'sitemap',
  'TEMPLATE': 'layer-group',
  'ADVANCED': 'cogs'
} as const

const categoryDescriptions = {
  'ATOMIC': 'Basic building blocks',
  'MOLECULAR': 'Simple combinations',
  'ORGANISM': 'Complex components',
  'TEMPLATE': 'Page layouts',
  'ADVANCED': 'Advanced features'
} as const

const componentsByCategory = computed(() => getComponentsByCategory())
const categoryStats = computed(() => getCategoryStats())

// Toggle category expansion with smooth animation
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
/* Smooth transitions for category expansions */
.category-expand-enter-active,
.category-expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.category-expand-enter-from {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.category-expand-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.category-expand-enter-to,
.category-expand-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}

/* Custom scrollbar styling */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

/* Hover effects */
.hover\:bg-background-hover:hover {
  background-color: #f3f4f6;
}

.hover\:border-border-light:hover {
  border-color: #e5e7eb;
}

/* Focus states for accessibility */
.router-link-active:focus,
.router-link-active:hover {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Smooth icon rotation for chevron */
.fa-chevron-up,
.fa-chevron-down {
  transition: transform 0.2s ease;
}

/* Enhanced button states */
.cursor-not-allowed {
  cursor: not-allowed;
  pointer-events: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .w-80 {
    width: 100vw;
  }
}
</style>
