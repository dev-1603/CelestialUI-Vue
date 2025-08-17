<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = ref<Array<{
  path: string,
  name: string,
  description: string,
  icon: string
}>>([])

onMounted(() => {
  // Get all routes from router
  const allRoutes = router.getRoutes()

  // Map routes to display format, excluding utility routes
  routes.value = allRoutes
    .filter(route =>
      // Filter out routes that start with / and have a name
      route.path.startsWith('/') &&
      route.name &&
      !route.path.includes(':') && // Exclude dynamic routes
      route.path !== '/' // Exclude root route
    )
    .map(route => ({
      path: route.path,
      name: route.name?.toString() || '',
      // Get description from route meta if available
      description: (route.meta?.description as string) || 'No description available',
      // Get icon from route meta if available, otherwise use default
      icon: (route.meta?.icon as string) || 'i-mdi-web'
    }))
})

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <main class="w-screen h-screen p-10">
    <h1 class="text-3xl font-bold mb-8">Available Routes</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="route in routes"
        :key="route.path"
        class="p-6 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer transition-all"
        @click="navigateTo(route.path)"
      >
        <div class="flex items-center gap-3 mb-3">
          <i :class="route.icon" class="text-2xl text-blue-500"></i>
          <h2 class="text-xl font-semibold">{{ route.name }}</h2>
        </div>
        <p class="text-gray-600">
          <span class="text-sm text-gray-400 block mb-1">{{ route.path }}</span>
          {{ route.description }}
        </p>
      </div>
    </div>

    <div v-if="routes.length === 0" class="text-center text-gray-500 mt-10">
      No routes available or routes are not properly configured with meta data
    </div>
  </main>
</template>
