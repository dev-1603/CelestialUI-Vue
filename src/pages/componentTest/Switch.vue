<template>
  <div class="switch-test-page">
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
      <h1 class="text-4xl font-bold mb-4">CSwitch Component</h1>
      <p class="text-lg text-gray-600 mb-8">
        CelestialUI has a component called CSwitch which is a versatile switch component with comprehensive features.
        It supports different states, sizes, colors, and form integration with full customization support.
      </p>

      <!-- API Reference -->
      <ApiReference v-bind="switchApiData" />
    </div>

    <!-- Event Display -->
    <div class="bg-gray-100 p-4 rounded-lg mb-8">
      <h3 class="font-semibold mb-2">Last Event:</h3>
      <p class="text-sm font-mono">{{ lastEvent || 'No events yet...' }}</p>
    </div>

    <!-- Test Sections -->
    <div class="space-y-12">

      <!-- Basic Switch -->
      <section class="test-section">
        <h2 class="section-title">Basic Switch</h2>
        <p class="section-description">Simple switches with different states.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <CSwitch
                v-model="switchValue1"
                @change="handleEvent('Switch 1 changed')"
              />
              <span>Switch 1: {{ switchValue1 ? 'ON' : 'OFF' }}</span>
            </div>
            <div class="flex items-center gap-4">
              <CSwitch
                v-model="switchValue2"
                @change="handleEvent('Switch 2 changed')"
              />
              <span>Switch 2: {{ switchValue2 ? 'ON' : 'OFF' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Switch with Labels -->
      <section class="test-section">
        <h2 class="section-title">Switch with Labels</h2>
        <p class="section-description">Switches with labels and descriptions.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label class="font-medium">Enable Notifications</label>
                <p class="text-sm text-gray-600">Receive email notifications</p>
              </div>
              <CSwitch
                v-model="notificationsEnabled"
                @change="handleEvent('Notifications switch changed')"
              />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <label class="font-medium">Dark Mode</label>
                <p class="text-sm text-gray-600">Switch to dark theme</p>
              </div>
              <CSwitch
                v-model="darkModeEnabled"
                @change="handleEvent('Dark mode switch changed')"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Different Sizes -->
      <section class="test-section">
        <h2 class="section-title">Different Sizes</h2>
        <p class="section-description">Switches in different sizes.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <CSwitch
                v-model="sizeSwitch1"
                size="sm"
                @change="handleEvent('Small switch changed')"
              />
              <span>Small Switch</span>
            </div>
            <div class="flex items-center gap-4">
              <CSwitch
                v-model="sizeSwitch2"
                size="md"
                @change="handleEvent('Medium switch changed')"
              />
              <span>Medium Switch</span>
            </div>
            <div class="flex items-center gap-4">
              <CSwitch
                v-model="sizeSwitch3"
                size="lg"
                @change="handleEvent('Large switch changed')"
              />
              <span>Large Switch</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Color Schemes -->
      <section class="test-section">
        <h2 class="section-title">Color Schemes</h2>
        <p class="section-description">Switches with different color schemes.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <CSwitch
                v-model="colorSwitch1"
                color-scheme="blue"
                @change="handleEvent('Blue switch changed')"
              />
              <span>Blue Switch</span>
            </div>
            <div class="flex items-center gap-4">
              <CSwitch
                v-model="colorSwitch2"
                color-scheme="green"
                @change="handleEvent('Green switch changed')"
              />
              <span>Green Switch</span>
            </div>
            <div class="flex items-center gap-4">
              <CSwitch
                v-model="colorSwitch3"
                color-scheme="purple"
                @change="handleEvent('Purple switch changed')"
              />
              <span>Purple Switch</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Disabled States -->
      <section class="test-section">
        <h2 class="section-title">Disabled States</h2>
        <p class="section-description">Switches in disabled states.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <CSwitch
                v-model="disabledSwitch1"
                disabled
                @change="handleEvent('Disabled switch 1 changed')"
              />
              <span>Disabled (OFF)</span>
            </div>
            <div class="flex items-center gap-4">
              <CSwitch
                v-model="disabledSwitch2"
                disabled
                @change="handleEvent('Disabled switch 2 changed')"
              />
              <span>Disabled (ON)</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { CSwitch } from '@lib/components/atoms/switch'
import ApiReference from '@/components/Common/ApiReference/apiReference.vue'
import { switchApiData } from '@/data/apiReference'

// Router
const router = useRouter()

// Back button functionality
const goBack = () => {
  router.push('/playground')
}

// Event tracking
const lastEvent = ref<string>('')

// Switch values
const switchValue1 = ref(false)
const switchValue2 = ref(true)
const notificationsEnabled = ref(false)
const darkModeEnabled = ref(true)
const sizeSwitch1 = ref(false)
const sizeSwitch2 = ref(true)
const sizeSwitch3 = ref(false)
const colorSwitch1 = ref(false)
const colorSwitch2 = ref(true)
const colorSwitch3 = ref(false)
const disabledSwitch1 = ref(false)
const disabledSwitch2 = ref(true)

// Event handlers
const handleEvent = (message: string) => {
  lastEvent.value = `${new Date().toLocaleTimeString()}: ${message}`
}
</script>

<style scoped>
.switch-test-page {
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

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-4 {
  gap: 1rem;
}
</style>



