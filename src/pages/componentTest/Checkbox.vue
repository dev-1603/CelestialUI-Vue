<template>
  <div class="checkbox-test-page">
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
      <h1 class="text-4xl font-bold mb-4">CCheckbox Component</h1>
      <p class="text-lg text-gray-600 mb-8">
        CelestialUI has a component called CCheckbox which is a binary selection control with comprehensive features.
        It supports indeterminate states, custom icons, accessibility, and form integration with full SSR support.
      </p>

      <!-- API Reference -->
      <ApiReference v-bind="checkboxApiData" />
    </div>

    <!-- Event Display -->
    <div class="bg-gray-100 p-4 rounded-lg mb-8">
      <h3 class="font-semibold mb-2">Last Event:</h3>
      <p class="text-sm font-mono">{{ lastEvent || 'No events yet...' }}</p>
    </div>

    <!-- Test Sections -->
    <div class="space-y-12">

      <!-- Basic States -->
      <section class="test-section">
        <h2 class="section-title">Basic States</h2>
        <p class="section-description">Fundamental checkbox states: unchecked, checked, and indeterminate.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex gap-6 flex-wrap">
              <CCheckbox
                :checked="basicStates.unchecked"
                @change="handleBasicStateChange('unchecked', $event)"
                children="Unchecked"
              />
              <CCheckbox
                :checked="basicStates.checked"
                @change="handleBasicStateChange('checked', $event)"
                children="Checked"
              />
              <CCheckbox
                :indeterminate="true"
                :checked="false"
                @change="handleEvent('Indeterminate clicked')"
                children="Indeterminate"
              />
            </div>
            <div class="text-sm text-gray-600">
              States: Unchecked: {{ basicStates.unchecked }}, Checked: {{ basicStates.checked }}
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="test-section">
        <h2 class="section-title">Checkbox Sizes</h2>
        <p class="section-description">Available checkbox sizes from small to large with consistent scaling.</p>
        <div class="example-container">
          <div class="flex items-center gap-6 flex-wrap">
            <CCheckbox
              :checked="true"
              size="sm"
              @change="handleEvent('Small checkbox changed')"
              children="Small"
            />
            <CCheckbox
              :checked="true"
              size="md"
              @change="handleEvent('Medium checkbox changed')"
              children="Medium"
            />
            <CCheckbox
              :checked="true"
              size="lg"
              @change="handleEvent('Large checkbox changed')"
              children="Large"
            />
          </div>
        </div>
      </section>

      <!-- Color Schemes -->
      <section class="test-section">
        <h2 class="section-title">Color Schemes</h2>
        <p class="section-description">Different color themes for various use cases and brand consistency.</p>
        <div class="example-container">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CCheckbox
              :checked="colorStates.primary"
              color-scheme="primary"
              @change="handleColorChange('primary', $event)"
              children="Primary"
            />
            <CCheckbox
              :checked="colorStates.secondary"
              color-scheme="secondary"
              @change="handleColorChange('secondary', $event)"
              children="Secondary"
            />
            <CCheckbox
              :checked="colorStates.success"
              color-scheme="success"
              @change="handleColorChange('success', $event)"
              children="Success"
            />
            <CCheckbox
              :checked="colorStates.warning"
              color-scheme="warning"
              @change="handleColorChange('warning', $event)"
              children="Warning"
            />
            <CCheckbox
              :checked="colorStates.danger"
              color-scheme="danger"
              @change="handleColorChange('danger', $event)"
              children="Danger"
            />
            <CCheckbox
              :checked="colorStates.info"
              color-scheme="info"
              @change="handleColorChange('info', $event)"
              children="Info"
            />
            <CCheckbox
              :checked="colorStates.purple"
              color-scheme="purple"
              @change="handleColorChange('purple', $event)"
              children="Purple"
            />
            <CCheckbox
              :checked="colorStates.pink"
              color-scheme="pink"
              @change="handleColorChange('pink', $event)"
              children="Pink"
            />
          </div>
        </div>
      </section>

      <!-- Custom Icons -->
      <section class="test-section">
        <h2 class="section-title">Custom Icons</h2>
        <p class="section-description">Checkboxes with custom check and indeterminate icons.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex gap-6 flex-wrap">
              <CCheckbox
                :checked="customIconStates.star"
                check-icon="⭐"
                @change="handleCustomIconChange('star', $event)"
                children="Star Icon"
              />
              <CCheckbox
                :checked="customIconStates.heart"
                check-icon="💖"
                @change="handleCustomIconChange('heart', $event)"
                children="Heart Icon"
              />
              <CCheckbox
                :checked="customIconStates.rocket"
                check-icon="🚀"
                @change="handleCustomIconChange('rocket', $event)"
                children="Rocket Icon"
              />
            </div>
            <div class="flex gap-6 flex-wrap">
              <CCheckbox
                :indeterminate="true"
                :checked="false"
                indeterminate-icon="◆"
                @change="handleEvent('Custom indeterminate clicked')"
                children="Custom Indeterminate"
              />
              <CCheckbox
                :indeterminate="true"
                :checked="false"
                indeterminate-icon="●"
                @change="handleEvent('Dot indeterminate clicked')"
                children="Dot Indeterminate"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Icon Slots -->
      <section class="test-section">
        <h2 class="section-title">Custom Icon Slots</h2>
        <p class="section-description">Using slots for complete control over checkbox icons.</p>
        <div class="example-container">
          <div class="flex gap-6 flex-wrap">
            <CCheckbox
              :checked="slotIconStates.svg"
              @change="handleSlotIconChange('svg', $event)"
              children="SVG Icon"
            >
              <template #icon>
                <svg v-if="slotIconStates.svg" class="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </template>
            </CCheckbox>

            <CCheckbox
              :checked="slotIconStates.custom"
              @change="handleSlotIconChange('custom', $event)"
              children="Custom Component"
            >
              <template #icon>
                <div v-if="slotIconStates.custom" class="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-sm flex items-center justify-center">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </template>
            </CCheckbox>
          </div>
        </div>
      </section>

      <!-- Disabled States -->
      <section class="test-section">
        <h2 class="section-title">Disabled States</h2>
        <p class="section-description">Disabled checkboxes in various states and configurations.</p>
        <div class="example-container">
          <div class="flex gap-6 flex-wrap">
            <CCheckbox
              :checked="false"
              :disabled="true"
              @change="handleEvent('Disabled unchecked clicked')"
              children="Disabled Unchecked"
            />
            <CCheckbox
              :checked="true"
              :disabled="true"
              @change="handleEvent('Disabled checked clicked')"
              children="Disabled Checked"
            />
            <CCheckbox
              :indeterminate="true"
              :checked="false"
              :disabled="true"
              @change="handleEvent('Disabled indeterminate clicked')"
              children="Disabled Indeterminate"
            />
          </div>
        </div>
      </section>

      <!-- Label Slots -->
      <section class="test-section">
        <h2 class="section-title">Label and Description Slots</h2>
        <p class="section-description">Custom label content and descriptions using slots.</p>
        <div class="example-container">
          <div class="space-y-6">
            <CCheckbox
              :checked="labelSlotStates.rich"
              @change="handleLabelSlotChange('rich', $event)"
            >
              <template #label>
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-blue-600">Rich Label</span>
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Pro</span>
                </div>
              </template>
              <template #description>
                <span class="text-sm text-gray-500">
                  This is a checkbox with rich label content and description
                </span>
              </template>
            </CCheckbox>

            <CCheckbox
              :checked="labelSlotStates.complex"
              @change="handleLabelSlotChange('complex', $event)"
            >
              <template #label>
                <div>
                  <span class="font-medium">Complex Label with Multiple Lines</span>
                  <div class="text-sm text-gray-600 mt-1">
                    Secondary text with additional information
                  </div>
                </div>
              </template>
              <template #description>
                <div class="text-sm text-gray-500 mt-2">
                  <p>This checkbox demonstrates:</p>
                  <ul class="list-disc list-inside ml-2 mt-1">
                    <li>Multi-line labels</li>
                    <li>Rich description content</li>
                    <li>Flexible slot usage</li>
                  </ul>
                </div>
              </template>
            </CCheckbox>
          </div>
        </div>
      </section>

      <!-- Form Integration -->
      <section class="test-section">
        <h2 class="section-title">Form Integration</h2>
        <p class="section-description">Checkboxes integrated with form submission and validation.</p>
        <div class="example-container">
          <form @submit.prevent="handleFormSubmit" class="space-y-4">
            <div class="space-y-3">
              <CCheckbox
                v-model:checked="formData.newsletter"
                name="newsletter"
                value="yes"
                id="newsletter-checkbox"
                children="Subscribe to newsletter"
              />

              <CCheckbox
                v-model:checked="formData.terms"
                name="terms"
                value="accepted"
                id="terms-checkbox"
                aria-describedby="terms-help"
                children="I agree to the terms and conditions"
              />
              <div id="terms-help" class="text-sm text-gray-500 ml-7">
                Required to proceed with registration
              </div>

              <CCheckbox
                v-model:checked="formData.marketing"
                name="marketing"
                value="yes"
                id="marketing-checkbox"
                children="Receive marketing emails"
              />

              <CCheckbox
                v-model:checked="formData.analytics"
                name="analytics"
                value="yes"
                id="analytics-checkbox"
                children="Allow analytics tracking"
              />
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="submit"
                :disabled="!formData.terms"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit Form
              </button>
              <button
                type="reset"
                @click="resetForm"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
            </div>

            <div class="mt-4 p-3 bg-gray-50 rounded text-sm">
              <strong>Form Data:</strong>
              <pre class="mt-2">{{ JSON.stringify(formData, null, 2) }}</pre>
            </div>
          </form>
        </div>
      </section>

      <!-- Select All Pattern -->
      <section class="test-section">
        <h2 class="section-title">Select All Pattern</h2>
        <p class="section-description">Implementing the select all/indeterminate pattern for list management.</p>
        <div class="example-container">
          <div class="space-y-4">
            <!-- Select All Checkbox -->
            <div class="border-b pb-3">
              <CCheckbox
                :checked="allItemsSelected"
                :indeterminate="someItemsSelected && !allItemsSelected"
                @change="toggleAllItems"
                children="Select all items"
                class="font-semibold"
              />
            </div>

            <!-- Individual Items -->
            <div class="space-y-2 ml-6">
              <CCheckbox
                v-for="item in selectAllItems"
                :key="item.id"
                :checked="item.selected"
                @change="toggleItem(item.id, $event)"
                :children="item.name"
              />
            </div>

            <div class="text-sm text-gray-600 ml-6">
              Selected: {{ selectedItemsCount }} of {{ selectAllItems.length }} items
            </div>
          </div>
        </div>
      </section>

      <!-- Accessibility Features -->
      <section class="test-section">
        <h2 class="section-title">Accessibility Features</h2>
        <p class="section-description">Comprehensive accessibility support and keyboard navigation.</p>
        <div class="example-container">
          <div class="space-y-6">
            <!-- ARIA Attributes -->
            <div>
              <h4 class="font-medium mb-3">ARIA Attributes</h4>
              <div class="space-y-3">
                <CCheckbox
                  :checked="a11yStates.described"
                  @change="handleA11yChange('described', $event)"
                  id="described-checkbox"
                  aria-describedby="checkbox-help"
                  children="Checkbox with description"
                />
                <div id="checkbox-help" class="text-sm text-gray-500 ml-7">
                  This checkbox has an aria-describedby attribute for screen readers
                </div>

                <CCheckbox
                  :checked="a11yStates.labeled"
                  @change="handleA11yChange('labeled', $event)"
                  id="labeled-checkbox"
                  children="Properly labeled checkbox"
                />
              </div>
            </div>

            <!-- Keyboard Navigation -->
            <div>
              <h4 class="font-medium mb-3">Keyboard Navigation</h4>
              <div class="space-y-2">
                <p class="text-sm text-gray-600">Use Tab to navigate, Space to toggle</p>
                <div class="flex gap-4">
                  <CCheckbox
                    :checked="a11yStates.key1"
                    @change="handleA11yChange('key1', $event)"
                    tab-index="0"
                    children="First (Tab order 1)"
                  />
                  <CCheckbox
                    :checked="a11yStates.key2"
                    @change="handleA11yChange('key2', $event)"
                    tab-index="0"
                    children="Second (Tab order 2)"
                  />
                  <CCheckbox
                    :checked="a11yStates.key3"
                    @change="handleA11yChange('key3', $event)"
                    tab-index="0"
                    children="Third (Tab order 3)"
                  />
                </div>
              </div>
            </div>

            <!-- Focus Management -->
            <div>
              <h4 class="font-medium mb-3">Focus Events</h4>
              <CCheckbox
                :checked="a11yStates.focus"
                @change="handleA11yChange('focus', $event)"
                @focus="handleEvent('Focus event received')"
                @blur="handleEvent('Blur event received')"
                children="Focus/Blur tracking"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Event Handling -->
      <section class="test-section">
        <h2 class="section-title">Event Handling</h2>
        <p class="section-description">Comprehensive event handling for change, focus, and blur events.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex gap-6 flex-wrap">
              <CCheckbox
                :checked="eventStates.allEvents"
                @change="handleAllEventsChange"
                @focus="handleEvent('All events: Focus')"
                @blur="handleEvent('All events: Blur')"
                children="All Events Checkbox"
              />

              <CCheckbox
                :checked="eventStates.changeOnly"
                @change="handleChangeOnlyChange"
                children="Change Event Only"
              />
            </div>

            <div class="text-sm text-gray-600">
              <p><strong>Last Change Event:</strong> {{ lastChangeEvent || 'None' }}</p>
              <p><strong>Change Count:</strong> {{ changeEventCount }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Performance Test -->
      <section class="test-section">
        <h2 class="section-title">Performance Test</h2>
        <p class="section-description">Multiple checkboxes to test rendering and interaction performance.</p>
        <div class="example-container">
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <button
                @click="generatePerformanceCheckboxes"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Generate {{ performanceCount }} Checkboxes
              </button>
              <input
                v-model.number="performanceCount"
                type="number"
                min="10"
                max="100"
                class="px-3 py-2 border rounded-lg w-20"
              />
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
              <CCheckbox
                v-for="(checkbox, index) in performanceCheckboxes"
                :key="index"
                :checked="checkbox.checked"
                :size="checkbox.size"
                :color-scheme="checkbox.colorScheme"
                @change="handlePerformanceChange(index, $event)"
                :children="`Checkbox ${index + 1}`"
              />
            </div>

            <div class="text-sm text-gray-600" v-if="performanceCheckboxes.length > 0">
              Rendered {{ performanceCheckboxes.length }} checkboxes.
              Selected: {{ performanceCheckboxes.filter(cb => cb.checked).length }}
            </div>
          </div>
        </div>
      </section>

      <!-- Headless Usage -->
      <section class="test-section">
        <h2 class="section-title">Headless Usage</h2>
        <p class="section-description">Using the useCheckboxHeadless composable for custom implementations.</p>
        <div class="example-container">
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-3">Custom Checkbox Implementation</h4>
              <div class="flex gap-4">
                <button
                  @click="customCheckbox.toggle()"
                  :class="[
                    'flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all',
                    customCheckbox.isChecked.value
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : 'bg-gray-100 border-gray-300 text-gray-700 hover:border-gray-400'
                  ]"
                >
                  <span class="text-lg">
                    {{ customCheckbox.isChecked.value ? '✅' : '⬜' }}
                  </span>
                  <span>
                    Custom Checkbox ({{ customCheckbox.isChecked.value ? 'ON' : 'OFF' }})
                  </span>
                </button>

                <button
                  @click="toggleCheckbox.toggle()"
                  :class="[
                    'px-4 py-2 rounded-lg transition-all',
                    toggleCheckbox.isChecked.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  ]"
                >
                  {{ toggleCheckbox.isChecked.value ? 'Enabled' : 'Disabled' }}
                </button>
              </div>
            </div>

            <div>
              <h4 class="font-medium mb-3">Switch-like Implementation</h4>
              <button
                @click="switchCheckbox.toggle()"
                :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  switchCheckbox.isChecked.value ? 'bg-blue-600' : 'bg-gray-300'
                ]"
              >
                <span
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    switchCheckbox.isChecked.value ? 'translate-x-6' : 'translate-x-1'
                  ]"
                />
              </button>
              <span class="ml-3">
                Switch is {{ switchCheckbox.isChecked.value ? 'ON' : 'OFF' }}
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CCheckbox, useCheckboxHeadless } from '@lib/components/atoms/checkbox'
import ApiReference from '@/components/Common/ApiReference/apiReference.vue'
import { checkboxApiData } from '@/data/apiReference'

// Router
const router = useRouter()

// Back button functionality
const goBack = () => {
  router.push('/playground')
}

// Event tracking
const lastEvent = ref<string>('')
const lastChangeEvent = ref<string>('')
const changeEventCount = ref(0)

// Basic states
const basicStates = reactive({
  unchecked: false,
  checked: true
})

// Color scheme states
const colorStates = reactive({
  primary: true,
  secondary: false,
  success: true,
  warning: false,
  danger: true,
  info: false,
  purple: true,
  pink: false
})

// Custom icon states
const customIconStates = reactive({
  star: true,
  heart: false,
  rocket: true
})

// Slot icon states
const slotIconStates = reactive({
  svg: true,
  custom: false
})

// Label slot states
const labelSlotStates = reactive({
  rich: false,
  complex: true
})

// Form data
const formData = reactive({
  newsletter: false,
  terms: false,
  marketing: true,
  analytics: false
})

// Select all pattern
const selectAllItems = ref([
  { id: 1, name: 'Item 1', selected: false },
  { id: 2, name: 'Item 2', selected: true },
  { id: 3, name: 'Item 3', selected: false },
  { id: 4, name: 'Item 4', selected: true },
  { id: 5, name: 'Item 5', selected: false }
])

// Accessibility states
const a11yStates = reactive({
  described: false,
  labeled: true,
  key1: false,
  key2: true,
  key3: false,
  focus: false
})

// Event handling states
const eventStates = reactive({
  allEvents: false,
  changeOnly: true
})

// Performance testing
const performanceCount = ref(20)
const performanceCheckboxes = ref<Array<{checked: boolean, size: string, colorScheme: string}>>([])

// Select all computed properties
const selectedItemsCount = computed(() =>
  selectAllItems.value.filter(item => item.selected).length
)

const allItemsSelected = computed(() =>
  selectAllItems.value.every(item => item.selected)
)

const someItemsSelected = computed(() =>
  selectAllItems.value.some(item => item.selected)
)

// Headless checkbox examples
const customCheckbox = useCheckboxHeadless({
  defaultChecked: false,
  onChange: (checked) => {
    handleEvent(`Custom checkbox: ${checked ? 'checked' : 'unchecked'}`)
  }
})

const toggleCheckbox = useCheckboxHeadless({
  defaultChecked: true,
  onChange: (checked) => {
    handleEvent(`Toggle checkbox: ${checked ? 'enabled' : 'disabled'}`)
  }
})

const switchCheckbox = useCheckboxHeadless({
  defaultChecked: false,
  onChange: (checked) => {
    handleEvent(`Switch checkbox: ${checked ? 'ON' : 'OFF'}`)
  }
})

// Event handlers
const handleEvent = (message: string) => {
  lastEvent.value = `${new Date().toLocaleTimeString()}: ${message}`
}

const handleBasicStateChange = (key: keyof typeof basicStates, checked: boolean) => {
  basicStates[key] = checked
  handleEvent(`Basic state ${key}: ${checked}`)
}

const handleColorChange = (color: keyof typeof colorStates, checked: boolean) => {
  colorStates[color] = checked
  handleEvent(`Color ${color}: ${checked}`)
}

const handleCustomIconChange = (icon: keyof typeof customIconStates, checked: boolean) => {
  customIconStates[icon] = checked
  handleEvent(`Custom icon ${icon}: ${checked}`)
}

const handleSlotIconChange = (icon: keyof typeof slotIconStates, checked: boolean) => {
  slotIconStates[icon] = checked
  handleEvent(`Slot icon ${icon}: ${checked}`)
}

const handleLabelSlotChange = (label: keyof typeof labelSlotStates, checked: boolean) => {
  labelSlotStates[label] = checked
  handleEvent(`Label slot ${label}: ${checked}`)
}

const handleA11yChange = (key: keyof typeof a11yStates, checked: boolean) => {
  a11yStates[key] = checked
  handleEvent(`A11y ${key}: ${checked}`)
}

const handleAllEventsChange = (checked: boolean) => {
  eventStates.allEvents = checked
  changeEventCount.value++
  lastChangeEvent.value = `All events checkbox: ${checked} (${new Date().toLocaleTimeString()})`
  handleEvent(`All events change: ${checked}`)
}

const handleChangeOnlyChange = (checked: boolean) => {
  eventStates.changeOnly = checked
  changeEventCount.value++
  lastChangeEvent.value = `Change only checkbox: ${checked} (${new Date().toLocaleTimeString()})`
}

const handleFormSubmit = () => {
  handleEvent(`Form submitted: ${JSON.stringify(formData)}`)
}

const resetForm = () => {
  Object.assign(formData, {
    newsletter: false,
    terms: false,
    marketing: false,
    analytics: false
  })
  handleEvent('Form reset')
}

const toggleAllItems = (checked: boolean) => {
  selectAllItems.value.forEach(item => {
    item.selected = checked
  })
  handleEvent(`Select all: ${checked}`)
}

const toggleItem = (id: number, checked: boolean) => {
  const item = selectAllItems.value.find(item => item.id === id)
  if (item) {
    item.selected = checked
    handleEvent(`Item ${id}: ${checked}`)
  }
}

const handlePerformanceChange = (index: number, checked: boolean) => {
  performanceCheckboxes.value[index].checked = checked
}

const generatePerformanceCheckboxes = () => {
  const sizes = ['sm', 'md', 'lg']
  const colorSchemes = ['primary', 'secondary', 'success', 'warning', 'danger']

  performanceCheckboxes.value = Array.from({ length: performanceCount.value }, (_, i) => ({
    checked: Math.random() > 0.5,
    size: sizes[i % sizes.length],
    colorScheme: colorSchemes[i % colorSchemes.length]
  }))

  handleEvent(`Generated ${performanceCount.value} performance checkboxes`)
}
</script>

<style scoped>
.checkbox-test-page {
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

pre {
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  overflow-x: auto;
}

/* Utility classes for spacing and layout */
.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-y-12 > * + * {
  margin-top: 3rem;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .md\\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
