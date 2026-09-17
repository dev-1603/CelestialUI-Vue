<template>
  <div class="breadcrumb-test-page">
    <!-- Back Button -->
    <div class="back-button-section mb-6">
      <button
        @click="goBack"
        class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Component Testing
      </button>
    </div>

    <!-- Header -->
    <div class="header-section">
      <h1 class="text-4xl font-bold mb-4">CBreadcrumb Component</h1>
      <p class="text-lg text-gray-600 mb-8">
        CelestialUI has a component called CBreadcrumb which is a navigation breadcrumb component with comprehensive features.
        It supports navigation, truncation, custom separators, and accessibility options.
      </p>

      <!-- API Reference -->
      <ApiReference v-bind="breadcrumbApiData" />
    </div>

    <!-- Event Display -->
    <div class="bg-gray-100 p-4 rounded-lg mb-8">
      <h3 class="font-semibold mb-2">Last Event:</h3>
      <p class="text-sm font-mono">{{ lastEvent || 'No events yet...' }}</p>
    </div>

    <!-- Test Sections -->
    <div class="space-y-12">

      <!-- Basic Breadcrumb -->
      <section class="test-section">
        <h2 class="section-title">Basic Breadcrumb</h2>
        <p class="section-description">Simple breadcrumb navigation.</p>
        <div class="example-container">
          <CBreadcrumb :items="basicItems" @navigate="handleEvent('Basic breadcrumb navigation')" />
        </div>
      </section>

      <!-- With Home -->
      <section class="test-section">
        <h2 class="section-title">With Home Item</h2>
        <p class="section-description">Breadcrumb with home item at the beginning.</p>
        <div class="example-container">
          <CBreadcrumb
            :items="itemsWithoutHome"
            show-home
            home-href="/dashboard"
            home-label="Dashboard"
            @navigate="handleEvent('Breadcrumb with home navigation')"
            @home-click="handleEvent('Home clicked')"
          />
        </div>
      </section>

      <!-- Custom Separator -->
      <section class="test-section">
        <h2 class="section-title">Custom Separator</h2>
        <p class="section-description">Breadcrumb with custom text separator.</p>
        <div class="example-container">
          <CBreadcrumb
            :items="basicItems"
            separator="›"
            @navigate="handleEvent('Custom separator breadcrumb navigation')"
          />
        </div>
      </section>

      <!-- Icon Separator -->
      <section class="test-section">
        <h2 class="section-title">Icon Separator</h2>
        <p class="section-description">Breadcrumb with custom icon separator via slot.</p>
        <div class="example-container">
          <CBreadcrumb
            :items="basicItems"
            @navigate="handleEvent('Icon separator breadcrumb navigation')"
          >
            <template #separator>
              <CIcon name="chevron-right" size="xs" class="text-gray-400" />
            </template>
          </CBreadcrumb>
        </div>
      </section>

      <!-- Truncation -->
      <section class="test-section">
        <h2 class="section-title">Truncation</h2>
        <p class="section-description">Breadcrumb with item truncation.</p>
        <div class="example-container">
          <CBreadcrumb
            :items="longItems"
            :max-items="3"
            @navigate="handleEvent('Truncated breadcrumb navigation')"
          />
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { CBreadcrumb } from '@lib/components/atoms/breadcrumb'
import { CIcon } from '@lib/components/atoms/icon'
import ApiReference from '@/components/Common/ApiReference/apiReference.vue'
import { breadcrumbApiData } from '@/data/apiReference'

// Router
const router = useRouter()

// Back button functionality
const goBack = () => {
  router.push('/playground')
}

// Event tracking
const lastEvent = ref<string>('')

// Breadcrumb items
const basicItems = ref([
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'category', label: 'Electronics', href: '/products/electronics' },
  { id: 'product', label: 'Smartphone', href: '/products/electronics/smartphone' }
])

const itemsWithoutHome = ref([
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'category', label: 'Electronics', href: '/products/electronics' },
  { id: 'product', label: 'Smartphone', href: '/products/electronics/smartphone' }
])

const longItems = ref([
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'category', label: 'Electronics', href: '/products/electronics' },
  { id: 'subcategory', label: 'Mobile Phones', href: '/products/electronics/mobile' },
  { id: 'brand', label: 'Apple', href: '/products/electronics/mobile/apple' },
  { id: 'product', label: 'iPhone 15 Pro', href: '/products/electronics/mobile/apple/iphone-15-pro' }
])

// Event handlers
const handleEvent = (message: string) => {
  lastEvent.value = `${new Date().toLocaleTimeString()}: ${message}`
}
</script>

<style scoped>
.breadcrumb-test-page {
  max-width: 72rem;
  margin: 0 auto;
  padding: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.section-description {
  color: #4b5563;
  margin-bottom: 1rem;
}

.example-container {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.test-section {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 2rem;
}

.test-section:last-child {
  border-bottom: none;
}

.space-y-12 > * + * {
  margin-top: 3rem;
}
</style>



