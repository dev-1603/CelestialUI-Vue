<template>
  <div class="alert-test-page">
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
      <h1 class="text-4xl font-bold mb-4">CAlert Component</h1>
      <p class="text-lg text-gray-600 mb-8">
        CelestialUI has a component called CAlert which is a versatile alert component with comprehensive features.
        It supports multiple variants, sizes, states, and accessibility options with full customization support.
      </p>

      <!-- API Reference -->
      <ApiReference v-bind="alertApiData" />
    </div>

    <!-- Event Display -->
    <div class="bg-gray-100 p-4 rounded-lg mb-8">
      <h3 class="font-semibold mb-2">Last Event:</h3>
      <p class="text-sm font-mono">{{ lastEvent || 'No events yet...' }}</p>
    </div>

    <!-- Test Sections -->
    <div class="space-y-12">

      <!-- Basic Variants -->
      <section class="test-section">
        <h2 class="section-title">Basic Variants</h2>
        <p class="section-description">All available alert variants with their distinct visual styles.</p>
        <div class="example-container">
          <div class="space-y-4">
            <CAlert
              variant="info"
              title="Information"
              description="This is an informational alert message."
            />
            <CAlert
              variant="success"
              title="Success"
              description="Operation completed successfully!"
            />
            <CAlert
              variant="warning"
              title="Warning"
              description="Please review the following information."
            />
            <CAlert
              variant="error"
              title="Error"
              description="Something went wrong. Please try again."
            />
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="test-section">
        <h2 class="section-title">Alert Sizes</h2>
        <p class="section-description">Available alert sizes from small to large.</p>
        <div class="example-container">
          <div class="space-y-4">
            <CAlert
              variant="info"
              size="sm"
              title="Small Alert"
              description="This is a small alert message."
            />
            <CAlert
              variant="info"
              size="md"
              title="Medium Alert"
              description="This is a medium alert message."
            />
            <CAlert
              variant="info"
              size="lg"
              title="Large Alert"
              description="This is a large alert message."
            />
          </div>
        </div>
      </section>

      <!-- Closable Alerts -->
      <section class="test-section">
        <h2 class="section-title">Closable Alerts</h2>
        <p class="section-description">Alerts that can be dismissed by the user.</p>
        <div class="example-container">
          <div class="space-y-4">
            <CAlert
              variant="info"
              title="Closable Info"
              description="This alert can be closed."
              closable
              @close="handleEvent('Info alert closed')"
            />
            <CAlert
              variant="warning"
              title="Closable Warning"
              description="This warning can be dismissed."
              closable
              @close="handleEvent('Warning alert closed')"
            />
            <CAlert
              variant="error"
              title="Closable Error"
              description="This error can be closed."
              closable
              @close="handleEvent('Error alert closed')"
            />
          </div>
        </div>
      </section>

      <!-- Custom Icons -->
      <section class="test-section">
        <h2 class="section-title">Custom Icons</h2>
        <p class="section-description">Alerts with custom icons using slots.</p>
        <div class="example-container">
          <div class="space-y-4">
            <CAlert
              variant="success"
              title="Custom Success Icon"
              description="This alert has a custom success icon."
            >
              <template #icon>
                <CIcon name="check_circle" library="material" variant="filled" size="md" />
              </template>
            </CAlert>

            <CAlert
              variant="warning"
              title="Custom Warning Icon"
              description="This alert has a custom warning icon."
            >
              <template #icon>
                <CIcon name="warning" library="material" variant="filled" size="md" />
              </template>
            </CAlert>

            <CAlert
              variant="error"
              title="Custom Error Icon"
              description="This alert has a custom error icon."
            >
              <template #icon>
                <CIcon name="error" library="material" variant="filled" size="md" />
              </template>
            </CAlert>
          </div>
        </div>
      </section>

      <!-- Alerts with Actions -->
      <section class="test-section">
        <h2 class="section-title">Alerts with Actions</h2>
        <p class="section-description">Alerts with action buttons in the footer.</p>
        <div class="example-container">
          <div class="space-y-4">
            <CAlert
              variant="info"
              title="Update Available"
              description="A new version of the application is available."
            >
              <template #actions>
                <CButton size="sm" variant="primary" @click="handleEvent('Update clicked')">
                  Update Now
                </CButton>
                <CButton size="sm" variant="ghost" @click="handleEvent('Later clicked')">
                  Later
                </CButton>
              </template>
            </CAlert>

            <CAlert
              variant="warning"
              title="Unsaved Changes"
              description="You have unsaved changes that will be lost."
            >
              <template #actions>
                <CButton size="sm" variant="primary" @click="handleEvent('Save clicked')">
                  Save Changes
                </CButton>
                <CButton size="sm" variant="outline" @click="handleEvent('Discard clicked')">
                  Discard
                </CButton>
              </template>
            </CAlert>

            <CAlert
              variant="error"
              title="Connection Failed"
              description="Unable to connect to the server."
            >
              <template #actions>
                <CButton size="sm" variant="primary" @click="handleEvent('Retry clicked')">
                  Retry
                </CButton>
                <CButton size="sm" variant="ghost" @click="handleEvent('Cancel clicked')">
                  Cancel
                </CButton>
              </template>
            </CAlert>
          </div>
        </div>
      </section>

      <!-- Custom Content -->
      <section class="test-section">
        <h2 class="section-title">Custom Content</h2>
        <p class="section-description">Alerts with custom content using slots.</p>
        <div class="example-container">
          <div class="space-y-4">
            <CAlert variant="info" title="Rich Content Alert">
              <template #default>
                <div class="space-y-2">
                  <p>This alert contains rich content with multiple elements:</p>
                  <ul class="list-disc list-inside ml-4 space-y-1">
                    <li>Custom formatting</li>
                    <li>Multiple paragraphs</li>
                    <li>Interactive elements</li>
                  </ul>
                  <p class="text-sm text-gray-600">
                    You can include any HTML content in the alert body.
                  </p>
                </div>
              </template>
            </CAlert>

            <CAlert variant="success" title="Custom Title">
              <template #title>
                <div class="flex items-center gap-2">
                  <CIcon name="celebration" library="material" variant="filled" size="sm" />
                  <span class="font-bold">Custom Title with Icon</span>
                </div>
              </template>
              <template #default>
                <p>This alert has a completely custom title with an icon.</p>
              </template>
            </CAlert>
          </div>
        </div>
      </section>

      <!-- Dynamic Alerts -->
      <section class="test-section">
        <h2 class="section-title">Dynamic Alerts</h2>
        <p class="section-description">Alerts that can be added and removed dynamically.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex gap-3 flex-wrap">
              <CButton variant="primary" @click="addAlert('info')">
                Add Info Alert
              </CButton>
              <CButton variant="secondary" @click="addAlert('success')">
                Add Success Alert
              </CButton>
              <CButton variant="outline" @click="addAlert('warning')">
                Add Warning Alert
              </CButton>
              <CButton variant="ghost" @click="addAlert('error')">
                Add Error Alert
              </CButton>
              <CButton variant="outline" @click="clearAlerts">
                Clear All
              </CButton>
            </div>

            <div class="space-y-3">
              <CAlert
                v-for="(alert, index) in dynamicAlerts"
                :key="alert.id"
                :variant="alert.variant"
                :title="alert.title"
                :description="alert.description"
                closable
                @close="removeAlert(alert.id)"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Accessibility Features -->
      <section class="test-section">
        <h2 class="section-title">Accessibility Features</h2>
        <p class="section-description">Comprehensive accessibility support and ARIA attributes.</p>
        <div class="example-container">
          <div class="space-y-4">
            <CAlert
              variant="info"
              title="Accessible Alert"
              description="This alert has proper ARIA attributes for screen readers."
              role="alert"
              aria-live="polite"
            />

            <CAlert
              variant="warning"
              title="Assertive Alert"
              description="This alert uses assertive politeness for urgent messages."
              role="alert"
              aria-live="assertive"
            />

            <CAlert
              variant="error"
              title="Status Alert"
              description="This alert uses status role for status updates."
              role="status"
              aria-live="polite"
            />
          </div>
        </div>
      </section>

      <!-- Performance Test -->
      <section class="test-section">
        <h2 class="section-title">Performance Test</h2>
        <p class="section-description">Multiple alerts to test rendering performance.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <CButton
                @click="generatePerformanceAlerts"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Generate {{ performanceCount }} Alerts
              </CButton>
              <label for="alert-performance-count" class="text-sm text-gray-600">
                Count
              </label>
              <input
                id="alert-performance-count"
                v-model.number="performanceCount"
                type="number"
                min="5"
                max="50"
                class="px-3 py-2 border rounded-lg w-20"
              />
            </div>

            <div class="space-y-2 max-h-64 overflow-y-auto">
              <CAlert
                v-for="(alert, index) in performanceAlerts"
                :key="index"
                :variant="alert.variant"
                :title="alert.title"
                :description="alert.description"
                size="sm"
              />
            </div>

            <div class="text-sm text-gray-600" v-if="performanceAlerts.length > 0">
              Rendered {{ performanceAlerts.length }} alerts
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { CAlert } from '@lib/components/atoms/alert'
import { CButton } from '@lib/components/atoms/button'
import { CIcon } from '@lib/components/atoms/icon'
import ApiReference from '@/components/Common/ApiReference/apiReference.vue'
import { alertApiData } from '@/data/apiReference'

// Router
const router = useRouter()

// Back button functionality
const goBack = () => {
  router.push('/playground')
}

// Event tracking
const lastEvent = ref<string>('')

// Dynamic alerts
const dynamicAlerts = ref<Array<{
  id: number
  variant: 'info' | 'success' | 'warning' | 'error'
  title: string
  description: string
}>>([])

let alertIdCounter = 0

// Performance testing
const performanceCount = ref(10)
const performanceAlerts = ref<Array<{
  variant: 'info' | 'success' | 'warning' | 'error'
  title: string
  description: string
}>>([])

// Event handlers
const handleEvent = (message: string) => {
  lastEvent.value = `${new Date().toLocaleTimeString()}: ${message}`
}

const addAlert = (variant: 'info' | 'success' | 'warning' | 'error') => {
  const alert = {
    id: ++alertIdCounter,
    variant,
    title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Alert ${alertIdCounter}`,
    description: `This is a dynamically added ${variant} alert.`
  }
  dynamicAlerts.value.push(alert)
  handleEvent(`Added ${variant} alert`)
}

const removeAlert = (id: number) => {
  const index = dynamicAlerts.value.findIndex(alert => alert.id === id)
  if (index > -1) {
    const alert = dynamicAlerts.value[index]
    dynamicAlerts.value.splice(index, 1)
    handleEvent(`Removed ${alert.variant} alert`)
  }
}

const clearAlerts = () => {
  dynamicAlerts.value = []
  handleEvent('Cleared all alerts')
}

const generatePerformanceAlerts = () => {
  const variants: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning', 'error']
  const titles = ['Performance Test', 'Load Test', 'Render Test', 'Stress Test']
  const descriptions = [
    'Testing alert rendering performance.',
    'Measuring component load times.',
    'Evaluating render efficiency.',
    'Stress testing the alert system.'
  ]

  performanceAlerts.value = []

  for (let i = 0; i < performanceCount.value; i++) {
    const variant = variants[i % variants.length]
    const title = titles[i % titles.length]
    const description = descriptions[i % descriptions.length]

    performanceAlerts.value.push({
      variant,
      title: `${title} ${i + 1}`,
      description: `${description} (Alert ${i + 1})`
    })
  }

  handleEvent(`Generated ${performanceCount.value} performance alerts`)
}
</script>

<style scoped>
.alert-test-page {
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

/* Utility classes for spacing and layout */
.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-12 > * + * {
  margin-top: 3rem;
}

.flex {
  display: flex;
}

.gap-3 {
  gap: 0.75rem;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-center {
  align-items: center;
}

.max-h-64 {
  max-height: 16rem;
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>



