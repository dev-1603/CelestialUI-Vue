<template>
  <div class="card-test-page">
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
      <h1 class="text-4xl font-bold mb-4">CCard Component</h1>
      <p class="text-lg text-gray-600 mb-8">
        CelestialUI has a component called CCard which is a versatile card component with comprehensive features.
        It supports different layouts, variants, elevations, and content regions with full customization support.
      </p>

      <!-- API Reference -->
      <ApiReference v-bind="cardApiData" />
    </div>

    <!-- Event Display -->
    <div class="bg-gray-100 p-4 rounded-lg mb-8">
      <h3 class="font-semibold mb-2">Last Event:</h3>
      <p class="text-sm font-mono">{{ lastEvent || 'No events yet...' }}</p>
    </div>

    <!-- Test Sections -->
    <div class="space-y-12">

      <!-- Basic Card -->
      <section class="test-section">
        <h2 class="section-title">Basic Card</h2>
        <p class="section-description">Simple card with header, body, and footer.</p>
        <div class="example-container">
          <CCard>
            <template #header>
              <h3>Card Title</h3>
            </template>
            <template #default>
              <p>This is the card content. It can contain any HTML elements.</p>
            </template>
            <template #footer>
              <CButton variant="primary" @click="handleEvent('Card action clicked')">Action</CButton>
            </template>
          </CCard>
        </div>
      </section>

      <!-- Card with Media -->
      <section class="test-section">
        <h2 class="section-title">Card with Media</h2>
        <p class="section-description">Card with media content in the header.</p>
        <div class="example-container">
          <CCard hoverable>
            <template #media>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=200&fit=crop" alt="Card image" class="w-full h-48 object-cover" />
            </template>
            <template #header>
              <h3>Media Card</h3>
            </template>
            <template #default>
              <p>Card with image content in the media slot.</p>
            </template>
          </CCard>
        </div>
      </section>

      <!-- Clickable Card -->
      <section class="test-section">
        <h2 class="section-title">Clickable Card</h2>
        <p class="section-description">Card that can be clicked.</p>
        <div class="example-container">
          <CCard
            clickable
            hoverable
            @click="handleEvent('Clickable card clicked')"
          >
            <template #default>
              <h3>Clickable Card</h3>
              <p>Click anywhere on this card to trigger an event.</p>
            </template>
          </CCard>
        </div>
      </section>

      <!-- Card Variants -->
      <section class="test-section">
        <h2 class="section-title">Card Variants</h2>
        <p class="section-description">Different card visual variants.</p>
        <div class="example-container">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CCard variant="default">
              <template #default>
                <h3>Default Card</h3>
                <p>Standard card variant.</p>
              </template>
            </CCard>
            <CCard variant="outlined">
              <template #default>
                <h3>Outlined Card</h3>
                <p>Card with border outline.</p>
              </template>
            </CCard>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { CCard } from '@lib/components/atoms/card'
import { CButton } from '@lib/components/atoms/button'
import ApiReference from '@/components/Common/ApiReference/apiReference.vue'
import { cardApiData } from '@/data/apiReference'

// Router
const router = useRouter()

// Back button functionality
const goBack = () => {
  router.push('/playground')
}

// Event tracking
const lastEvent = ref<string>('')

// Event handlers
const handleEvent = (message: string) => {
  lastEvent.value = `${new Date().toLocaleTimeString()}: ${message}`
}
</script>

<style scoped>
.card-test-page {
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

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.gap-4 {
  gap: 1rem;
}

@media (min-width: 768px) {
  .md\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>



