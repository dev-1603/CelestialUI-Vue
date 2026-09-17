<template>
  <div class="progress-test-page">
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
      <h1 class="text-4xl font-bold mb-4">CProgress Component</h1>
      <p class="text-lg text-gray-600 mb-8">
        CelestialUI has a component called CProgress which is a versatile progress component with comprehensive features.
        It supports different types, animations, colors, and indeterminate states with full customization support.
      </p>

      <!-- API Reference -->
      <ApiReference v-bind="progressApiData" />
    </div>

    <!-- Event Display -->
    <div class="bg-gray-100 p-4 rounded-lg mb-8">
      <h3 class="font-semibold mb-2">Last Event:</h3>
      <p class="text-sm font-mono">{{ lastEvent || 'No events yet...' }}</p>
    </div>

    <!-- Test Sections -->
    <div class="space-y-12">

      <!-- Basic Progress -->
      <section class="test-section">
        <h2 class="section-title">Basic Progress</h2>
        <p class="section-description">Simple progress bars with different values.</p>
        <div class="example-container">
          <div class="space-y-4">
            <CProgress :value="25" @change="handleEvent('Progress changed to 25%')" />
            <CProgress :value="50" @change="handleEvent('Progress changed to 50%')" />
            <CProgress :value="75" @change="handleEvent('Progress changed to 75%')" />
            <CProgress :value="100" @complete="handleEvent('Progress completed!')" />
          </div>
        </div>
      </section>

      <!-- Progress with Labels -->
      <section class="test-section">
        <h2 class="section-title">Progress with Labels & Values</h2>
        <p class="section-description">Progress bars with labels and percentage/value display in the top header row.</p>
        <div class="example-container">
          <div class="space-y-4">
            <CProgress
              :value="60"
              label="Upload Progress"
              show-percentage
              @change="handleEvent('Upload progress changed')"
            />
            <CProgress
              :value="85"
              label="Download Progress"
              show-value
              show-percentage
              color-scheme="green"
              @change="handleEvent('Download progress changed')"
            />
          </div>
        </div>
      </section>

      <!-- Indeterminate Progress -->
      <section class="test-section">
        <h2 class="section-title">Indeterminate Progress</h2>
        <p class="section-description">Progress bars in indeterminate state.</p>
        <div class="example-container">
          <div class="space-y-4">
            <CProgress
              indeterminate
              label="Loading assets..."
              @change="handleEvent('Indeterminate progress')"
            />
            <CProgress
              indeterminate
              label="Processing data..."
              color-scheme="purple"
              @change="handleEvent('Processing progress')"
            />
          </div>
        </div>
      </section>

      <!-- Color Schemes -->
      <section class="test-section">
        <h2 class="section-title">Color Schemes</h2>
        <p class="section-description">Progress bars with different color schemes.</p>
        <div class="example-container">
          <div class="space-y-4">
            <CProgress :value="70" color-scheme="blue" label="Blue Progress" show-percentage />
            <CProgress :value="80" color-scheme="green" label="Green Progress" show-percentage />
            <CProgress :value="65" color-scheme="red" label="Red / Danger Progress" show-percentage />
            <CProgress :value="90" color-scheme="purple" label="Purple Progress" show-percentage />
            <CProgress :value="50" color-scheme="amber" label="Amber / Warning Progress" show-percentage />
          </div>
        </div>
      </section>

      <!-- Different Sizes -->
      <section class="test-section">
        <h2 class="section-title">Different Sizes</h2>
        <p class="section-description">Progress bars in different sizes.</p>
        <div class="example-container">
          <div class="space-y-4">
            <CProgress :value="60" size="sm" label="Small Progress" />
            <CProgress :value="60" size="md" label="Medium Progress" />
            <CProgress :value="60" size="lg" label="Large Progress" />
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { CProgress } from '@lib/components/atoms/progress'
import ApiReference from '@/components/Common/ApiReference/apiReference.vue'
import { progressApiData } from '@/data/apiReference'

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
.progress-test-page {
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

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-12 > * + * {
  margin-top: 3rem;
}
</style>



