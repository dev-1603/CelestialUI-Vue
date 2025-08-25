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
        <CCard :elevation="1" class="mx-4 p-4 min-w-0">
          <template #header>
            <h3 class="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Overview</h3>
          </template>
          <div class="flex flex-col gap-2 min-w-0">
            <CButton
              :variant="$route.path === '/' ? 'primary' : 'ghost'"
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
              :variant="$route.path === '/playground' ? 'primary' : 'ghost'"
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
              :variant="$route.path === '/themes' ? 'primary' : 'ghost'"
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
        </CCard>

        <!-- Components by Category Card -->
        <CCard :elevation="1" class="mx-4 p-4 flex-1 min-h-0 flex flex-col min-w-0">
          <template #header>
            <h3 class="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              Components by Category
            </h3>
          </template>

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
                    <span class="bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                      {{ getCategoryStatsForCategory(category).implemented }}/{{ getCategoryStatsForCategory(category).total }}
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
                      $route.path === component.docPath ? 'bg-primary-50 text-primary-600 font-semibold' : '',
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
        </CCard>

        <!-- Progress Overview Card -->
        <CCard :elevation="1" class="mx-4 mt-auto p-4 border-t border-border-base">
          <template #header>
            <h4 class="text-sm font-semibold text-text-primary mb-4">Progress Overview</h4>
          </template>
          <div v-for="stat in categoryStats" :key="stat.category" class="flex justify-between items-center py-1 text-xs">
            <span class="text-text-secondary font-medium">{{ stat.category }}</span>
            <span class="text-text-primary font-semibold">
              {{ stat.implemented }}/{{ stat.total }}
            </span>
          </div>
        </CCard>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineOptions } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getComponentsByCategory, getCategoryStats } from '../../data/components'
import { CButton, CCard } from '../../../lib/index'

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

const expandedCategories = ref<Record<string, boolean>>({
  ATOMIC: true,
  MOLECULAR: false,
  ORGANISM: false,
  TEMPLATE: false,
  ADVANCED: false,
})

const categoryIcons = {
  ATOMIC: 'atom',
  MOLECULAR: 'cubes',
  ORGANISM: 'sitemap',
  TEMPLATE: 'layer-group',
  ADVANCED: 'rocket',
}

const categoryDescriptions = {
  ATOMIC: 'Basic building blocks',
  MOLECULAR: 'Simple combinations',
  ORGANISM: 'Complex UI patterns',
  TEMPLATE: 'Layout patterns',
  ADVANCED: 'Complex interactions',
}

const componentsByCategory = computed(() => getComponentsByCategory())
const categoryStats = computed(() => getCategoryStats())

const toggleCategory = (category: string) => {
  expandedCategories.value[category] = !expandedCategories.value[category]
}

const navigateTo = (path: string) => {
  router.push(path)
  emit('close')
}

const getCategoryStatsForCategory = (category: string) => {
  return categoryStats.value.find(stat => stat.category === category) || { implemented: 0, total: 0 }
}
</script>

<style scoped>
/* Hide scrollbar but allow scrolling */
.overflow-y-auto {
  /* Hide scrollbar for Webkit browsers (Chrome, Safari, Edge) */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.overflow-y-auto::-webkit-scrollbar {
  display: none; /* Webkit browsers */
}

.max-h-80 {
  /* Hide scrollbar for Webkit browsers (Chrome, Safari, Edge) */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.max-h-80::-webkit-scrollbar {
  display: none; /* Webkit browsers */
}
</style>
