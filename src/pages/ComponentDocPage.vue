<template>
  <div class="p-6">
    <div class="text-center py-12">
      <div class="text-6xl mb-4">📄</div>
      <h1 class="text-3xl font-bold mb-4">Component Documentation</h1>
      <h2 class="text-xl font-semibold text-blue-600 mb-4">{{ componentName }}</h2>
      <p class="text-gray-600 mb-6">
        Component documentation will be available once {{ componentName }} is implemented.
      </p>
      <div class="space-y-4">
        <p class="text-sm text-gray-500">
          This page will contain:
        </p>
        <div class="text-left max-w-md mx-auto bg-gray-50 p-4 rounded-lg">
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Component API documentation</li>
            <li>• Usage examples</li>
            <li>• Props and events reference</li>
            <li>• Live interactive demos</li>
          </ul>
        </div>
      </div>
      <button class="btn btn-primary mt-6" @click="$router.push('/')">
        Back to Components
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const componentName = computed(() => {
  const name = route.params.componentName as string
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Component'
})
</script>

<style scoped>
/* Temporary component styles until actual components are built */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  padding: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  outline: none;
}

.btn-primary {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.btn-primary:hover {
  background: #2563eb;
  border-color: #2563eb;
}

.btn-outline {
  background: transparent;
  color: #3b82f6;
  border-color: #93c5fd;
}

.btn-outline:hover {
  background: #eff6ff;
  border-color: #60a5fa;
}

.btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
}
</style>
