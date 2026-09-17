<template>
  <div class="avatar-test-page">
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
      <h1 class="text-4xl font-bold mb-4">CAvatar Component</h1>
      <p class="text-lg text-gray-600 mb-8">
        CelestialUI has a component called CAvatar which is a versatile avatar component with comprehensive features.
        It supports different sizes, sources, fallback states, and accessibility options with full customization support.
      </p>

      <!-- API Reference -->
      <ApiReference v-bind="avatarApiData" />
    </div>

    <!-- Event Display -->
    <div class="bg-gray-100 p-4 rounded-lg mb-8">
      <h3 class="font-semibold mb-2">Last Event:</h3>
      <p class="text-sm font-mono">{{ lastEvent || 'No events yet...' }}</p>
    </div>

    <!-- Test Sections -->
    <div class="space-y-12">

      <!-- Basic Sizes -->
      <section class="test-section">
        <h2 class="section-title">Basic Sizes</h2>
        <p class="section-description">All available avatar sizes with consistent scaling.</p>
        <div class="example-container">
          <div class="flex items-center gap-6 flex-wrap">
            <div class="flex flex-col items-center">
              <CAvatar
                name="John Doe"
                size="xs"
                @click="handleEvent('XS avatar clicked')"
              />
              <span class="text-sm mt-2">XS</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Jane Smith"
                size="sm"
                @click="handleEvent('SM avatar clicked')"
              />
              <span class="text-sm mt-2">SM</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Bob Johnson"
                size="md"
                @click="handleEvent('MD avatar clicked')"
              />
              <span class="text-sm mt-2">MD</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Alice Brown"
                size="lg"
                @click="handleEvent('LG avatar clicked')"
              />
              <span class="text-sm mt-2">LG</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Charlie Wilson"
                size="xl"
                @click="handleEvent('XL avatar clicked')"
              />
              <span class="text-sm mt-2">XL</span>
            </div>
          </div>
        </div>
      </section>

      <!-- With Images -->
      <section class="test-section">
        <h2 class="section-title">With Images</h2>
        <p class="section-description">Avatars with image sources and fallback handling.</p>
        <div class="example-container">
          <div class="flex items-center gap-6 flex-wrap">
            <div class="flex flex-col items-center">
              <CAvatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="User avatar"
                name="John Doe"
                size="lg"
                @load="handleEvent('Image loaded successfully')"
                @error="handleEvent('Image failed to load')"
              />
              <span class="text-sm mt-2">Valid Image</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                src="https://invalid-url.com/avatar.jpg"
                alt="Invalid avatar"
                name="Jane Smith"
                size="lg"
                @load="handleEvent('Invalid image loaded')"
                @error="handleEvent('Invalid image failed to load')"
              />
              <span class="text-sm mt-2">Invalid Image</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Bob Johnson"
                size="lg"
                @click="handleEvent('Fallback avatar clicked')"
              />
              <span class="text-sm mt-2">No Image (Fallback)</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Color Schemes -->
      <section class="test-section">
        <h2 class="section-title">Color Schemes</h2>
        <p class="section-description">Different color schemes for avatar backgrounds.</p>
        <div class="example-container">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="flex flex-col items-center">
              <CAvatar
                name="Primary User"
                color-scheme="primary"
                size="lg"
                @click="handleEvent('Primary avatar clicked')"
              />
              <span class="text-sm mt-2">Primary</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Secondary User"
                color-scheme="secondary"
                size="lg"
                @click="handleEvent('Secondary avatar clicked')"
              />
              <span class="text-sm mt-2">Secondary</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Success User"
                color-scheme="success"
                size="lg"
                @click="handleEvent('Success avatar clicked')"
              />
              <span class="text-sm mt-2">Success</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Warning User"
                color-scheme="warning"
                size="lg"
                @click="handleEvent('Warning avatar clicked')"
              />
              <span class="text-sm mt-2">Warning</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Danger User"
                color-scheme="danger"
                size="lg"
                @click="handleEvent('Danger avatar clicked')"
              />
              <span class="text-sm mt-2">Danger</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Info User"
                color-scheme="info"
                size="lg"
                @click="handleEvent('Info avatar clicked')"
              />
              <span class="text-sm mt-2">Info</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Purple User"
                color-scheme="purple"
                size="lg"
                @click="handleEvent('Purple avatar clicked')"
              />
              <span class="text-sm mt-2">Purple</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Pink User"
                color-scheme="pink"
                size="lg"
                @click="handleEvent('Pink avatar clicked')"
              />
              <span class="text-sm mt-2">Pink</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="test-section">
        <h2 class="section-title">Variants</h2>
        <p class="section-description">Different avatar shape variants.</p>
        <div class="example-container">
          <div class="flex items-center gap-6 flex-wrap">
            <div class="flex flex-col items-center">
              <CAvatar
                name="Circle User"
                variant="circle"
                size="lg"
                @click="handleEvent('Circle avatar clicked')"
              />
              <span class="text-sm mt-2">Circle</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Square User"
                variant="square"
                size="lg"
                @click="handleEvent('Square avatar clicked')"
              />
              <span class="text-sm mt-2">Square</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Rounded User"
                variant="rounded"
                size="lg"
                @click="handleEvent('Rounded avatar clicked')"
              />
              <span class="text-sm mt-2">Rounded</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Online Status -->
      <section class="test-section">
        <h2 class="section-title">Online Status</h2>
        <p class="section-description">Avatars with online status indicators.</p>
        <div class="example-container">
          <div class="flex items-center gap-6 flex-wrap">
            <div class="flex flex-col items-center">
              <CAvatar
                name="Online User"
                online
                status-color="green"
                size="lg"
                @click="handleEvent('Online avatar clicked')"
              />
              <span class="text-sm mt-2">Online (Green)</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Away User"
                online
                status-color="yellow"
                size="lg"
                @click="handleEvent('Away avatar clicked')"
              />
              <span class="text-sm mt-2">Away (Yellow)</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Busy User"
                online
                status-color="red"
                size="lg"
                @click="handleEvent('Busy avatar clicked')"
              />
              <span class="text-sm mt-2">Busy (Red)</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Offline User"
                size="lg"
                @click="handleEvent('Offline avatar clicked')"
              />
              <span class="text-sm mt-2">Offline</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Custom Fallback Icons -->
      <section class="test-section">
        <h2 class="section-title">Custom Fallback Icons</h2>
        <p class="section-description">Avatars with custom fallback icons.</p>
        <div class="example-container">
          <div class="flex items-center gap-6 flex-wrap">
            <div class="flex flex-col items-center">
              <CAvatar
                name="User with Star"
                fallback-icon="star"
                size="lg"
                @click="handleEvent('Star fallback clicked')"
              />
              <span class="text-sm mt-2">Star Icon</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="User with Heart"
                fallback-icon="favorite"
                size="lg"
                @click="handleEvent('Heart fallback clicked')"
              />
              <span class="text-sm mt-2">Heart Icon</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="User with Home"
                fallback-icon="home"
                size="lg"
                @click="handleEvent('Home fallback clicked')"
              />
              <span class="text-sm mt-2">Home Icon</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Custom Slots -->
      <section class="test-section">
        <h2 class="section-title">Custom Slots</h2>
        <p class="section-description">Avatars with custom content using slots.</p>
        <div class="example-container">
          <div class="flex items-center gap-6 flex-wrap">
            <div class="flex flex-col items-center">
              <CAvatar
                name="Custom Content"
                size="lg"
                @click="handleEvent('Custom content clicked')"
              >
                <template #default>
                  <div class="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-lg">AI</span>
                  </div>
                </template>
              </CAvatar>
              <span class="text-sm mt-2">Custom Content</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="With Badge"
                size="lg"
                @click="handleEvent('Badge avatar clicked')"
              >
                <template #badge>
                  <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-xs font-bold">3</span>
                  </div>
                </template>
              </CAvatar>
              <span class="text-sm mt-2">With Badge</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                name="Custom Fallback"
                size="lg"
                @click="handleEvent('Custom fallback clicked')"
              >
                <template #fallback>
                  <div class="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
                    <CIcon name="person" library="material" variant="filled" size="md" class="text-white" />
                  </div>
                </template>
              </CAvatar>
              <span class="text-sm mt-2">Custom Fallback</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Loading States -->
      <section class="test-section">
        <h2 class="section-title">Loading States</h2>
        <p class="section-description">Avatars in loading states.</p>
        <div class="example-container">
          <div class="flex items-center gap-6 flex-wrap">
            <div class="flex flex-col items-center">
              <CAvatar
                name="Loading User"
                loading
                size="lg"
              />
              <span class="text-sm mt-2">Loading</span>
            </div>
            <div class="flex flex-col items-center">
              <CAvatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                name="Loading with Image"
                loading
                size="lg"
              />
              <span class="text-sm mt-2">Loading with Image</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Performance Test -->
      <section class="test-section">
        <h2 class="section-title">Performance Test</h2>
        <p class="section-description">Multiple avatars to test rendering performance.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <CButton
                @click="generatePerformanceAvatars"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Generate {{ performanceCount }} Avatars
              </CButton>
              <label for="avatar-performance-count" class="text-sm text-gray-600">
                Count
              </label>
              <input
                id="avatar-performance-count"
                v-model.number="performanceCount"
                type="number"
                min="5"
                max="50"
                class="px-3 py-2 border rounded-lg w-20"
              />
            </div>

            <div class="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-2 max-h-64 overflow-y-auto">
              <CAvatar
                v-for="(avatar, index) in performanceAvatars"
                :key="index"
                :name="avatar.name"
                :size="avatar.size"
                :color-scheme="avatar.colorScheme"
                :online="avatar.online"
                @click="handleEvent(`Performance avatar ${index + 1} clicked`)"
              />
            </div>

            <div class="text-sm text-gray-600" v-if="performanceAvatars.length > 0">
              Rendered {{ performanceAvatars.length }} avatars
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
import { CAvatar } from '@lib/components/atoms/avatar'
import { CButton } from '@lib/components/atoms/button'
import { CIcon } from '@lib/components/atoms/icon'
import ApiReference from '@/components/Common/ApiReference/apiReference.vue'
import { avatarApiData } from '@/data/apiReference'

// Router
const router = useRouter()

// Back button functionality
const goBack = () => {
  router.push('/playground')
}

// Event tracking
const lastEvent = ref<string>('')

// Performance testing
const performanceCount = ref(20)
const performanceAvatars = ref<Array<{
  name: string
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  colorScheme: string
  online: boolean
}>>([])

// Event handlers
const handleEvent = (message: string) => {
  lastEvent.value = `${new Date().toLocaleTimeString()}: ${message}`
}

const generatePerformanceAvatars = () => {
  const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank']
  const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl']
  const colorSchemes = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'purple', 'pink']

  performanceAvatars.value = []

  for (let i = 0; i < performanceCount.value; i++) {
    const name = names[i % names.length]
    const size = sizes[i % sizes.length]
    const colorScheme = colorSchemes[i % colorSchemes.length]
    const online = Math.random() > 0.5

    performanceAvatars.value.push({
      name: `${name} ${i + 1}`,
      size,
      colorScheme,
      online
    })
  }

  handleEvent(`Generated ${performanceCount.value} performance avatars`)
}
</script>

<style scoped>
.avatar-test-page {
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

.gap-6 {
  gap: 1.5rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-2 {
  gap: 0.5rem;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-center {
  align-items: center;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-8 {
  grid-template-columns: repeat(8, minmax(0, 1fr));
}

.max-h-64 {
  max-height: 16rem;
}

.overflow-y-auto {
  overflow-y: auto;
}

@media (min-width: 768px) {
  .md\\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-16 {
    grid-template-columns: repeat(16, minmax(0, 1fr));
  }
}
</style>



