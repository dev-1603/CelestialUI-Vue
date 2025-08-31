<template>
  <div class="button-test-page">
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
      <h1 class="text-4xl font-bold mb-4">CButton Component</h1>
      <p class="text-lg text-gray-600 mb-8">
        CelestialUI has a component called CButton which is a button with comprehensive features.
        It comes in multiple variants, sizes, and states with full accessibility support and customization options.
      </p>

      <!-- API Reference -->
      <div class="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 class="text-xl font-semibold mb-4">API Reference</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div>
            <h3 class="font-semibold text-blue-800 mb-2">Props</h3>
            <ul class="text-sm space-y-1">
              <li><code>children</code> - string</li>
              <li><code>variant</code> - 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'</li>
              <li><code>size</code> - 'xs' | 'sm' | 'md' | 'lg' | 'xl'</li>
              <li><code>disabled</code> - boolean</li>
              <li><code>loading</code> - boolean</li>
              <li><code>fullWidth</code> - boolean</li>
              <li><code>leftIcon</code> - string</li>
              <li><code>rightIcon</code> - string</li>
              <li><code>type</code> - 'button' | 'submit' | 'reset'</li>
              <li><code>as</code> - 'button' | 'a' | 'div'</li>
              <li><code>href</code> - string</li>
              <li><code>target</code> - string</li>
              <li><code>download</code> - string | boolean</li>
              <li><code>rounded</code> - boolean | string</li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-green-800 mb-2">Events</h3>
            <ul class="text-sm space-y-1">
              <li><code>@click</code> - MouseEvent</li>
              <li><code>@focus</code> - FocusEvent</li>
              <li><code>@blur</code> - FocusEvent</li>
              <li><code>@mouseenter</code> - MouseEvent</li>
              <li><code>@mouseleave</code> - MouseEvent</li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-purple-800 mb-2">Slots</h3>
            <ul class="text-sm space-y-1">
              <li><code>default</code> - Main content</li>
              <li><code>leftIcon</code> - Custom left icon</li>
              <li><code>rightIcon</code> - Custom right icon</li>
              <li><code>loadingSpinner</code> - Custom loading</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Display -->
    <div class="bg-gray-100 p-4 rounded-lg mb-8">
      <h3 class="font-semibold mb-2">Last Event:</h3>
      <p class="text-sm font-mono">{{ lastEvent || 'No events yet...' }}</p>
    </div>

    <!-- Test Sections -->
    <div class="space-y-12">

      <!-- Standard Variants -->
      <section class="test-section">
        <h2 class="section-title">Standard Variants</h2>
        <p class="section-description">All available button variants with their distinct visual styles.</p>
        <div class="example-container">
          <div class="flex gap-3 flex-wrap">
            <CButton variant="primary" @click="handleEvent('Primary clicked')">Primary</CButton>
            <CButton variant="secondary" @click="handleEvent('Secondary clicked')">Secondary</CButton>
            <CButton variant="outline" @click="handleEvent('Outline clicked')">Outline</CButton>
            <CButton variant="ghost" @click="handleEvent('Ghost clicked')">Ghost</CButton>
            <CButton variant="link" @click="handleEvent('Link clicked')">Link</CButton>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="test-section">
        <h2 class="section-title">Button Sizes</h2>
        <p class="section-description">Available button sizes from extra small to extra large.</p>
        <div class="example-container">
          <div class="flex items-end gap-3 flex-wrap">
            <CButton size="xs" @click="handleEvent('XS clicked')">Extra Small</CButton>
            <CButton size="sm" @click="handleEvent('SM clicked')">Small</CButton>
            <CButton size="md" @click="handleEvent('MD clicked')">Medium</CButton>
            <CButton size="lg" @click="handleEvent('LG clicked')">Large</CButton>
            <CButton size="xl" @click="handleEvent('XL clicked')">Extra Large</CButton>
          </div>
        </div>
      </section>

      <!-- With Icons -->
      <section class="test-section">
        <h2 class="section-title">With Icons</h2>
        <p class="section-description">Buttons with left and right icons using props.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex gap-3 flex-wrap">
              <CButton leftIcon="+" variant="primary" @click="handleEvent('Add clicked')">Add Item</CButton>
              <CButton rightIcon="→" variant="primary" @click="handleEvent('Next clicked')">Next</CButton>
              <CButton leftIcon="↓" rightIcon="↗" variant="secondary" @click="handleEvent('Download clicked')">Download</CButton>
            </div>
            <div class="flex gap-3 flex-wrap">
              <CButton leftIcon="×" variant="outline" size="sm" @click="handleEvent('Delete clicked')">Delete</CButton>
              <CButton rightIcon="⚙" variant="ghost" size="lg" @click="handleEvent('Settings clicked')">Settings</CButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Custom Icon Slots -->
      <section class="test-section">
        <h2 class="section-title">Custom Icon Slots</h2>
        <p class="section-description">Buttons with custom icons using slots for complete control.</p>
        <div class="example-container">
          <div class="flex gap-3 flex-wrap">
            <CButton variant="primary" @click="handleEvent('Custom left icon clicked')">
              <template #leftIcon>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </template>
              Custom Plus
            </CButton>

            <CButton variant="outline" @click="handleEvent('Custom right icon clicked')">
              Custom Arrow
              <template #rightIcon>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </template>
            </CButton>

            <CButton variant="secondary" @click="handleEvent('Both custom icons clicked')">
              <template #leftIcon>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
                </svg>
              </template>
              Both Icons
              <template #rightIcon>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </template>
            </CButton>
          </div>
        </div>
      </section>

      <!-- Button States -->
      <section class="test-section">
        <h2 class="section-title">Button States</h2>
        <p class="section-description">Different button states including normal, disabled, loading, and full width.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex gap-3 flex-wrap">
              <CButton variant="primary" @click="handleEvent('Normal clicked')">Normal</CButton>
              <CButton variant="primary" disabled @click="handleEvent('Disabled clicked')">Disabled</CButton>
              <CButton variant="primary" :loading="isLoading" @click="handleLoadingDemo">
                {{ isLoading ? 'Loading...' : 'Click for Loading' }}
              </CButton>
            </div>
            <div class="max-w-md">
              <CButton variant="secondary" fullWidth @click="handleEvent('Full width clicked')">
                Full Width Button
              </CButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Loading States -->
      <section class="test-section">
        <h2 class="section-title">Loading States</h2>
        <p class="section-description">Loading state examples across different variants and with custom spinner.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex gap-3 flex-wrap items-center">
              <CButton variant="primary" loading size="xs">Loading XS</CButton>
              <CButton variant="secondary" loading size="sm">Loading SM</CButton>
              <CButton variant="outline" loading size="md">Loading MD</CButton>
              <CButton variant="ghost" loading size="lg">Loading LG</CButton>
              <CButton variant="link" loading size="xl">Loading XL</CButton>
            </div>

            <div class="flex gap-3 flex-wrap">
              <CButton variant="primary" loading leftIcon="+">With Left Icon</CButton>
              <CButton variant="secondary" loading rightIcon="→">With Right Icon</CButton>
            </div>

            <!-- Custom Loading Spinner -->
            <div class="flex gap-3">
              <CButton variant="primary" loading>
                <template #loadingSpinner>
                  <div class="animate-pulse w-4 h-4 bg-white rounded-full"></div>
                </template>
                Custom Spinner
              </CButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Rounded Variants -->
      <section class="test-section">
        <h2 class="section-title">Rounded Variants</h2>
        <p class="section-description">Different border radius options for button styling.</p>
        <div class="example-container">
          <div class="flex gap-3 flex-wrap items-center">
            <CButton variant="primary" @click="handleEvent('Default radius')">Default</CButton>
            <CButton variant="primary" rounded="sm" @click="handleEvent('Small rounded')">Small Rounded</CButton>
            <CButton variant="primary" rounded="md" @click="handleEvent('Medium rounded')">Medium Rounded</CButton>
            <CButton variant="primary" rounded="lg" @click="handleEvent('Large rounded')">Large Rounded</CButton>
            <CButton variant="primary" rounded="xl" @click="handleEvent('XL rounded')">XL Rounded</CButton>
            <CButton variant="primary" rounded="full" @click="handleEvent('Fully rounded')">Full Rounded</CButton>
          </div>
        </div>
      </section>

      <!-- Polymorphic Components -->
      <section class="test-section">
        <h2 class="section-title">Polymorphic Components</h2>
        <p class="section-description">Buttons rendered as different HTML elements using the 'as' prop.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex gap-3 flex-wrap">
              <CButton as="button" variant="primary" @click="handleEvent('Button element')">
                As Button
              </CButton>
              <CButton as="a" href="#test" variant="secondary" @click="handleEvent('Anchor element')">
                As Anchor
              </CButton>
              <CButton as="div" variant="outline" @click="handleEvent('Div element')">
                As Div
              </CButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Link Behavior -->
      <section class="test-section">
        <h2 class="section-title">Link Behavior</h2>
        <p class="section-description">Buttons that behave as links with href attributes and download functionality.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex gap-3 flex-wrap">
              <CButton href="https://github.com" target="_blank" variant="primary">
                External Link
              </CButton>
              <CButton href="#internal" variant="secondary">
                Internal Link
              </CButton>
              <CButton href="mailto:test@example.com" variant="link">
                Email Link
              </CButton>
            </div>

            <div class="flex gap-3 flex-wrap">
              <CButton href="#" download="file.txt" variant="outline">
                Download File
              </CButton>
              <CButton href="#" :download="true" variant="ghost">
                Download (Boolean)
              </CButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Event Handling -->
      <section class="test-section">
        <h2 class="section-title">Event Handling</h2>
        <p class="section-description">Comprehensive event handling including mouse and focus events.</p>
        <div class="example-container">
          <div class="flex gap-3 flex-wrap">
            <CButton
              variant="primary"
              @click="handleEvent('Click event')"
              @focus="handleEvent('Focus event')"
              @blur="handleEvent('Blur event')"
              @mouseenter="handleEvent('Mouse enter event')"
              @mouseleave="handleEvent('Mouse leave event')"
            >
              All Events
            </CButton>

            <CButton
              variant="secondary"
              @mouseenter="handleEvent('Hover started')"
              @mouseleave="handleEvent('Hover ended')"
            >
              Hover Me
            </CButton>
          </div>
        </div>
      </section>

      <!-- Children Prop -->
      <section class="test-section">
        <h2 class="section-title">Children Prop</h2>
        <p class="section-description">Using the explicit children prop instead of slots.</p>
        <div class="example-container">
          <div class="flex gap-3 flex-wrap">
            <CButton children="Children Prop" variant="primary" @click="handleEvent('Children prop used')" />
            <CButton children="With Icon" leftIcon="+" variant="secondary" @click="handleEvent('Children + icon')" />
            <CButton variant="outline" @click="handleEvent('Slot vs children')">
              Slot Content (takes priority over children prop)
            </CButton>
          </div>
        </div>
      </section>

      <!-- Form Integration -->
      <section class="test-section">
        <h2 class="section-title">Form Integration</h2>
        <p class="section-description">Button types for form submission and integration.</p>
        <div class="example-container">
          <form @submit.prevent="handleFormSubmit" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                v-model="formData.name"
                type="text"
                placeholder="Name"
                class="px-3 py-2 border rounded"
              />
              <input
                v-model="formData.email"
                type="email"
                placeholder="Email"
                class="px-3 py-2 border rounded"
              />
            </div>
            <div class="flex gap-3 flex-wrap">
              <CButton type="submit" variant="primary" :loading="isSubmitting">
                Submit Form
              </CButton>
              <CButton type="reset" variant="secondary" @click="handleFormReset">
                Reset Form
              </CButton>
              <CButton type="button" variant="outline" @click="handleEvent('Regular button in form')">
                Regular Button
              </CButton>
            </div>
          </form>
        </div>
      </section>

      <!-- Performance Test -->
      <section class="test-section">
        <h2 class="section-title">Performance Test</h2>
        <p class="section-description">Multiple buttons to test rendering performance.</p>
        <div class="example-container">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <CButton
              v-for="i in 24"
              :key="i"
              :variant="variants[i % variants.length]"
              :size="sizes[i % sizes.length]"
              @click="handleEvent(`Performance button ${i} clicked`)"
            >
              Btn {{ i }}
            </CButton>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { CButton } from '@lib/components/atoms/button'

// Router
const router = useRouter()

// Back button functionality
const goBack = () => {
  router.push('/test')
}

// Event tracking
const lastEvent = ref<string>('')

// Loading states
const isLoading = ref(false)
const isSubmitting = ref(false)

// Form data
const formData = reactive({
  name: '',
  email: ''
})

// Performance test data
const variants = ['primary', 'secondary', 'outline', 'ghost', 'link'] as const
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

// Event handlers
const handleEvent = (message: string) => {
  lastEvent.value = `${new Date().toLocaleTimeString()}: ${message}`
}

const handleLoadingDemo = () => {
  isLoading.value = true
  handleEvent('Loading demo started')

  setTimeout(() => {
    isLoading.value = false
    handleEvent('Loading demo completed')
  }, 3000)
}

const handleFormSubmit = () => {
  isSubmitting.value = true
  handleEvent(`Form submitted with: ${JSON.stringify(formData)}`)

  setTimeout(() => {
    isSubmitting.value = false
    handleEvent('Form submission completed')
  }, 2000)
}

const handleFormReset = () => {
  formData.name = ''
  formData.email = ''
  handleEvent('Form reset')
}
</script>

<style scoped>
.button-test-page {
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

code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
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

.gap-2 {
  gap: 0.5rem;
}

.gap-6 {
  gap: 1.5rem;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-center {
  align-items: center;
}

.items-end {
  align-items: flex-end;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.max-w-md {
  max-width: 28rem;
}

@media (min-width: 768px) {
  .md\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .md\\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
</style>
