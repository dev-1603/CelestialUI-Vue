<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-text-primary mb-4">Component Playground</h1>
      <p class="text-text-secondary text-lg">
        Interactive examples and demonstrations of CelestialUI components.
      </p>
    </div>

    <!-- Existing Components Section -->
    <div class="mb-12">
      <h2 class="text-2xl font-semibold text-text-primary mb-6">Implemented Components</h2>

      <!-- Button Examples -->
      <CCard class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold text-text-primary">Button Component</h3>
        </template>
        <div class="space-y-4">
          <div>
            <h4 class="text-sm font-medium text-text-secondary mb-2">Variants</h4>
            <div class="flex flex-wrap gap-2">
              <CButton variant="primary">Primary</CButton>
              <CButton variant="secondary">Secondary</CButton>
              <CButton variant="outline">Outline</CButton>
              <CButton variant="ghost">Ghost</CButton>
              <CButton variant="link">Link</CButton>
              <CButton variant="destructive">Delete</CButton>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium text-text-secondary mb-2">Sizes</h4>
            <div class="flex flex-wrap items-center gap-2">
              <CButton size="sm">Small</CButton>
              <CButton size="md">Medium</CButton>
              <CButton size="lg">Large</CButton>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium text-text-secondary mb-2">With Icons</h4>
            <div class="flex flex-wrap gap-2">
              <CButton left-icon="star">With Left Icon</CButton>
              <CButton right-icon="arrow-right">With Right Icon</CButton>
              <CButton left-icon="heart" right-icon="arrow-right">Both Icons</CButton>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium text-text-secondary mb-2">States</h4>
            <div class="flex flex-wrap gap-2">
              <CButton :loading="true">Loading</CButton>
              <CButton disabled>Disabled</CButton>
              <CButton @click="showToast('success', 'Button clicked!')">Click Me</CButton>
            </div>
          </div>
        </div>
      </CCard>

      <!-- Input Examples -->
      <CCard class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold text-text-primary">Input Component</h3>
        </template>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CInput
              v-model="demoInput"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              prefix-icon="envelope"
              clearable
            />
            <CInput
              v-model="demoPassword"
              label="Password"
              type="password"
              placeholder="Enter your password"
              prefix-icon="lock"
              helper-text="Must be at least 8 characters"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CInput
              v-model="demoInput2"
              label="With Error"
              placeholder="This input has an error"
              :error="true"
              error-text="This field is required"
            />
            <CInput
              v-model="demoInput3"
              label="Disabled Input"
              placeholder="This input is disabled"
              disabled
            />
          </div>
        </div>
      </CCard>

      <!-- Card Examples -->
      <CCard class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold text-text-primary">Card Component</h3>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CCard title="Basic Card" subtitle="Simple card example">
            <p class="text-text-secondary">This is a basic card with title and subtitle.</p>
            <template #footer>
              <CButton size="sm">Action</CButton>
            </template>
          </CCard>

          <CCard variant="outlined" hoverable clickable @click="showToast('info', 'Card clicked!')">
            <template #header>
              <CIcon name="image" />
              <div>
                <h4 class="text-text-primary">Interactive Card</h4>
                <p class="text-text-secondary">Click me!</p>
              </div>
            </template>
            <p class="text-text-secondary">This card is interactive and shows a toast when clicked.</p>
          </CCard>
        </div>
      </CCard>

      <!-- Modal Example -->
      <CCard class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold text-text-primary">Modal Component</h3>
        </template>
        <div class="space-y-4">
          <CButton @click="openModal" left-icon="window-maximize">
            Open Modal
          </CButton>
          <p class="text-sm text-text-secondary">
            Click the button above to open a modal dialog.
          </p>
        </div>
      </CCard>

      <!-- Toast Examples -->
      <CCard class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold text-text-primary">Toast Component</h3>
        </template>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-2">
            <CButton @click="showToast('success', 'Success message!')" left-icon="check-circle">
              Success Toast
            </CButton>
            <CButton @click="showToast('error', 'Error message!')" variant="destructive" left-icon="exclamation-circle">
              Error Toast
            </CButton>
            <CButton @click="showToast('warning', 'Warning message!')" variant="outline" left-icon="exclamation-triangle">
              Warning Toast
            </CButton>
            <CButton @click="showToast('info', 'Info message!')" left-icon="info-circle">
              Info Toast
            </CButton>
          </div>
          <p class="text-sm text-text-secondary">
            Click any button above to show different types of toast notifications.
          </p>
        </div>
      </CCard>
    </div>

    <!-- Coming Soon Section -->
    <div class="mb-12">
      <h2 class="text-2xl font-semibold text-text-primary mb-6">Coming Soon</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CCard v-for="component in comingSoonComponents" :key="component.name" class="p-4">
          <div class="flex items-center gap-3 mb-3">
            <CIcon :name="component.icon" class="text-primary-500" />
            <h3 class="text-lg font-semibold text-text-primary">{{ component.name }}</h3>
          </div>
          <p class="text-text-secondary text-sm mb-4">{{ component.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-xs text-text-muted">Planned</span>
            <CButton variant="ghost" size="sm" disabled>
              Coming Soon
            </CButton>
          </div>
        </CCard>
      </div>
    </div>

    <!-- Demo Modal -->
    <CModal
      v-model="isModalOpen"
      title="Demo Modal"
      max-width="600px"
    >
      <div class="space-y-4">
        <h4 class="text-lg font-semibold text-text-primary">Welcome to CelestialUI!</h4>
        <p class="text-text-secondary">
          This is a demo modal showcasing the modal component. You can:
        </p>
        <ul class="list-disc list-inside text-text-secondary space-y-1">
          <li>Close with the X button</li>
          <li>Close by pressing Escape</li>
          <li>Close by clicking outside (if not persistent)</li>
        </ul>

        <div class="mt-6">
          <CInput
            v-model="modalInput"
            label="Your Name"
            placeholder="Enter your name"
            prefix-icon="user"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex gap-2">
          <CButton variant="outline" @click="isModalOpen = false">
            Cancel
          </CButton>
          <CButton @click="submitModal" :disabled="!modalInput">
            Submit
          </CButton>
        </div>
      </template>
    </CModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast, CButton, CInput, CCard, CIcon, CModal } from '../../lib/index'

const { success: showSuccessToast, error: showErrorToast, warning: showWarningToast, info: showInfoToast } = useToast()

// Demo state
const demoInput = ref('')
const demoPassword = ref('')
const demoInput2 = ref('')
const demoInput3 = ref('')
const isModalOpen = ref(false)
const modalInput = ref('')

const comingSoonComponents = [
  {
    name: 'Avatar',
    description: 'User profile image display with fallback support',
    icon: 'user-circle'
  },
  {
    name: 'Badge',
    description: 'Status indicators and notification badges',
    icon: 'tag'
  },
  {
    name: 'Checkbox',
    description: 'Binary selection control with validation',
    icon: 'check-square'
  },
  {
    name: 'Select',
    description: 'Dropdown selection with search and multi-select',
    icon: 'chevron-down'
  },
  {
    name: 'Tabs',
    description: 'Tab navigation with content switching',
    icon: 'folder'
  },
  {
    name: 'Progress',
    description: 'Progress indicators and loading bars',
    icon: 'spinner'
  }
]

const showToast = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
  switch (type) {
    case 'success':
      showSuccessToast(message)
      break
    case 'error':
      showErrorToast(message)
      break
    case 'warning':
      showWarningToast(message)
      break
    case 'info':
      showInfoToast(message)
      break
  }
}

const openModal = () => {
  isModalOpen.value = true
}

const submitModal = () => {
  showSuccessToast(`Hello, ${modalInput.value}!`)
  isModalOpen.value = false
  modalInput.value = ''
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
