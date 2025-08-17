<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <h1 class="title">
          <CIcon name="star" class="title-icon" />
          CelestialUI Vue
        </h1>
        <div class="header-actions">
          <CButton
            variant="outline"
            size="sm"
            @click="toggleTheme"
            :left-icon="isDark ? 'sun' : 'moon'"
          >
            {{ isDark ? 'Light' : 'Dark' }}
          </CButton>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <!-- Hero Section -->
        <section class="hero">
          <h2 class="hero-title">
            Build Beautiful UIs with
            <span class="gradient-text">CelestialUI</span>
          </h2>
          <p class="hero-description">
            A comprehensive Vue 3 component library with multi-framework styling support.
            Compatible with Tailwind CSS, SCSS, Material Design, and pure CSS.
          </p>
          <div class="hero-actions">
            <CButton size="lg" left-icon="rocket">
              Get Started
            </CButton>
            <CButton variant="outline" size="lg" left-icon="github">
              View on GitHub
            </CButton>
          </div>
        </section>

        <!-- Features Grid -->
        <section class="features">
          <h3 class="section-title">Features</h3>
          <div class="features-grid">
            <CCard class="feature-card" hoverable>
              <template #header>
                <CIcon name="palette" class="feature-icon" />
                <div>
                  <h4>Multi-Framework Styling</h4>
                  <p>Supports Tailwind, SCSS, Material, and CSS</p>
                </div>
              </template>
              <p>Choose your preferred styling approach without compromising on functionality.</p>
            </CCard>

            <CCard class="feature-card" hoverable>
              <template #header>
                <CIcon name="universal-access" class="feature-icon" />
                <div>
                  <h4>Accessibility First</h4>
                  <p>WCAG compliant components</p>
                </div>
              </template>
              <p>Built with accessibility in mind, ensuring your apps work for everyone.</p>
            </CCard>

            <CCard class="feature-card" hoverable>
              <template #header>
                <CIcon name="code" class="feature-icon" />
                <div>
                  <h4>TypeScript Support</h4>
                  <p>Full type safety included</p>
                </div>
              </template>
              <p>Comprehensive TypeScript definitions for better developer experience.</p>
            </CCard>

            <CCard class="feature-card" hoverable>
              <template #header>
                <CIcon name="mobile-alt" class="feature-icon" />
                <div>
                  <h4>Responsive Design</h4>
                  <p>Mobile-first approach</p>
                </div>
              </template>
              <p>Components that look great on all screen sizes and devices.</p>
            </CCard>
          </div>
        </section>

        <!-- Components Showcase -->
        <section class="showcase">
          <h3 class="section-title">Component Showcase</h3>

          <!-- Buttons -->
          <div class="showcase-section">
            <h4 class="showcase-title">Buttons</h4>
            <div class="component-demo">
              <CButton variant="primary">Primary</CButton>
              <CButton variant="secondary">Secondary</CButton>
              <CButton variant="outline">Outline</CButton>
              <CButton variant="ghost">Ghost</CButton>
              <CButton variant="link">Link</CButton>
              <CButton variant="destructive">Delete</CButton>
            </div>
          </div>

          <!-- Inputs -->
          <div class="showcase-section">
            <h4 class="showcase-title">Inputs</h4>
            <div class="input-demo">
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
                helperText="Must be at least 8 characters"
              />
            </div>
          </div>

          <!-- Cards -->
          <div class="showcase-section">
            <h4 class="showcase-title">Cards</h4>
            <div class="card-demo">
              <CCard title="Basic Card" subtitle="Simple card example">
                <p>This is a basic card with title and subtitle.</p>
                <template #footer>
                  <CButton size="sm">Action</CButton>
                </template>
              </CCard>

              <CCard variant="outlined" hoverable clickable @click="showToast('success', 'Card clicked!')">
                <template #header>
                  <CIcon name="image" />
                  <div>
                    <h4>Interactive Card</h4>
                    <p>Click me!</p>
                  </div>
                </template>
                <p>This card is interactive and shows a toast when clicked.</p>
              </CCard>
            </div>
          </div>

          <!-- Actions -->
          <div class="showcase-section">
            <h4 class="showcase-title">Interactive Elements</h4>
            <div class="actions-demo">
              <CButton @click="openModal" left-icon="window-maximize">
                Open Modal
              </CButton>
              <CButton @click="showToast('info', 'Hello from CelestialUI!')" left-icon="bell">
                Show Toast
              </CButton>
              <CButton @click="showToast('warning', 'This is a warning!')" variant="outline" left-icon="exclamation-triangle">
                Show Warning
              </CButton>
              <CButton @click="showToast('error', 'Something went wrong!')" variant="destructive" left-icon="exclamation-circle">
                Show Error
              </CButton>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 CelestialUI. Built with Vue 3 and ❤️</p>
      </div>
    </footer>

    <!-- Demo Modal -->
    <CModal
      v-model="isModalOpen"
      title="Demo Modal"
      max-width="600px"
    >
      <div class="modal-content">
        <h4>Welcome to CelestialUI!</h4>
        <p>This is a demo modal showcasing the modal component. You can:</p>
        <ul>
          <li>Close with the X button</li>
          <li>Close by pressing Escape</li>
          <li>Close by clicking outside (if not persistent)</li>
        </ul>

        <div class="modal-form">
          <CInput
            v-model="modalInput"
            label="Your Name"
            placeholder="Enter your name"
            prefix-icon="user"
          />
        </div>
      </div>

      <template #footer>
        <CButton variant="outline" @click="isModalOpen = false">
          Cancel
        </CButton>
        <CButton @click="submitModal" :disabled="!modalInput">
          Submit
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '../lib/composables/useTheme'
import { useToast } from '../lib/composables/useToast'
import CButton from '../lib/components/ui/button/CButton.vue'
import CInput from '../lib/components/ui/input/CInput.vue'
import CCard from '../lib/components/ui/card/CCard.vue'
import CIcon from '../lib/components/ui/icon/CIcon.vue'
import CModal from '../lib/components/ui/modal/CModal.vue'

// Theme management
const { isDark, toggleTheme } = useTheme()

// Toast management
const { success: showSuccessToast, error: showErrorToast, warning: showWarningToast, info: showInfoToast } = useToast()

// Demo state
const demoInput = ref('')
const demoPassword = ref('')
const isModalOpen = ref(false)
const modalInput = ref('')

// Methods
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
/* Layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header */
.header {
  background: var(--cui-color-surface-primary);
  border-bottom: 1px solid var(--cui-color-border-primary);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--cui-color-text-primary);
  margin: 0;
}

.title-icon {
  color: var(--cui-color-primary-500);
}

/* Main */
.main {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

/* Hero */
.hero {
  text-align: center;
  padding: 4rem 0;
  border-bottom: 1px solid var(--cui-color-border-primary);
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--cui-color-text-primary);
}

.gradient-text {
  background: linear-gradient(135deg, var(--cui-color-primary-500), var(--cui-color-secondary-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--cui-color-text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Sections */
.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--cui-color-text-primary);
}

/* Features */
.features {
  margin-bottom: 4rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card :deep(.cui-card__header) {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.feature-icon {
  color: var(--cui-color-primary-500);
  font-size: 1.5rem;
  flex-shrink: 0;
}

.feature-card h4 {
  margin: 0 0 0.25rem;
  font-weight: 600;
  color: var(--cui-color-text-primary);
}

.feature-card p {
  margin: 0;
  color: var(--cui-color-text-secondary);
  font-size: 0.875rem;
}

/* Showcase */
.showcase {
  margin-bottom: 4rem;
}

.showcase-section {
  margin-bottom: 3rem;
}

.showcase-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--cui-color-text-primary);
}

.component-demo {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.input-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 600px;
}

.card-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 800px;
}

.actions-demo {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Modal */
.modal-content h4 {
  margin-top: 0;
  color: var(--cui-color-text-primary);
}

.modal-content ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
  color: var(--cui-color-text-secondary);
}

.modal-form {
  margin-top: 2rem;
}

/* Footer */
.footer {
  background: var(--cui-color-surface-secondary);
  border-top: 1px solid var(--cui-color-border-primary);
  padding: 2rem 0;
  text-align: center;
  color: var(--cui-color-text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .component-demo {
    justify-content: center;
  }

  .input-demo {
    grid-template-columns: 1fr;
  }

  .card-demo {
    grid-template-columns: 1fr;
  }
}
</style>
