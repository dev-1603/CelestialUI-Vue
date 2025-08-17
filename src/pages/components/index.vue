<template>
  <section class="components-dashboard">
    <!-- Show dashboard content only when on parent route -->
    <div v-if="isParentRoute">
      <header class="dashboard-header">
        <h1>Celestial UI Components</h1>
        <p class="description">Explore our collection of beautiful and functional components</p>
      </header>

      <div class="card-container">
        <div
          v-for="component in componentRoutes"
          :key="component.path"
          class="card"
          v-show="component.path !== ''"
        >
          <router-link
            :to="{ name: component.name }"
            class="card-link"
          >
            <div class="card-content">
              <h2>{{ component.meta?.title }}</h2>
              <p class="card-description">{{ component.meta?.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Router view for component pages -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import type { RouteRecordNormalized } from 'vue-router'

const route = useRoute()

const componentRoutes = computed(() => {
  const componentsRoute = route.matched.find(r => r.path === '/components')
  return componentsRoute?.children.filter(route => route.path !== '') || []
})

// Check if we're on the parent route
const isParentRoute = computed(() => {
  return route.name === 'ComponentsDashboard'
})
</script>

<style scoped>
.components-dashboard {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.description {
  color: var(--color-text-light);
  font-size: 1.1rem;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: var(--color-background-soft, #ffffff);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card-content {
  padding: 1.5rem;
}

.card-content h2 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--color-heading);
}

.card-description {
  color: var(--color-text-light);
  font-size: 0.95rem;
  line-height: 1.5;
}

.component-detail {
  width: 100%;
}

.back-link {
  margin-bottom: 2rem;
}

.back-link a {
  display: inline-flex;
  align-items: center;
  color: var(--color-text-light);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;
}

.back-link a:hover {
  color: var(--color-heading);
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
