<template>
  <div class="app-layout">
    <Header :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />

    <div class="app-body">
      <Sidebar :is-open="sidebarOpen" @close="closeSidebar" />

      <main class="app-main">
        <div class="app-content ">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineOptions } from 'vue'
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import './Layout.css'

defineOptions({
  name: 'AppLayout'
})

const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
