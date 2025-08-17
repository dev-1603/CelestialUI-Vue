<template>
  <section class="components-dashboard">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isParentRoute = computed(() => {
  return route.name === 'ComponentsDashboard'
})
</script>


