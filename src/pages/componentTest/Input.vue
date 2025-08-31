<template>
  <div class="space-y-8 p-6">
    <!-- Back button -->
    <div class="mb-6">
      <router-link
        to="/playground"
        class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Component Testing
      </router-link>
    </div>

        <!-- Page Title -->
    <div class="border-b pb-6">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        CInput Component Test
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-4">
        CelestialUI has a component called CInput which is a versatile input component with comprehensive features.
        It supports multiple input types, validation, debouncing, headless usage, and full accessibility support with extensive customization options.
      </p>

      <!-- API Reference -->
      <ApiReference v-bind="inputApiData" />

      <!-- Quick Links -->
      <div class="flex gap-4 mt-6">
        <router-link
          to="/playground/atomic/input/customization"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Customization Examples →
        </router-link>
      </div>
    </div>

    <!-- Basic Usage -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Basic Usage</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Default Input</label>
          <CInput
            v-model:value="values.basic"
            placeholder="Enter text here"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">With Helper Text</label>
          <CInput
            v-model:value="values.helper"
            placeholder="Username"
            helper-text="Choose a unique username"
          />
        </div>
      </div>
    </section>

    <!-- Input Types -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Input Types</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Text</label>
          <CInput
            v-model:value="values.text"
            type="text"
            placeholder="Enter text"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <CInput
            v-model:value="values.email"
            type="email"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Password</label>
          <CInput
            v-model:value="values.password"
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Number</label>
          <CInput
            v-model:value="values.number"
            type="number"
            placeholder="Enter number"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">URL</label>
          <CInput
            v-model:value="values.url"
            type="url"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Search</label>
          <CInput
            v-model:value="values.search"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Sizes</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Small</label>
          <CInput
            v-model:value="values.small"
            size="sm"
            placeholder="Small input"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Medium (Default)</label>
          <CInput
            v-model:value="values.medium"
            size="md"
            placeholder="Medium input"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Large</label>
          <CInput
            v-model:value="values.large"
            size="lg"
            placeholder="Large input"
          />
        </div>
      </div>
    </section>

    <!-- Variants -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Variants</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Outline (Default)</label>
          <CInput
            v-model:value="values.outline"
            variant="outline"
            placeholder="Outline variant"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Filled</label>
          <CInput
            v-model:value="values.filled"
            variant="filled"
            placeholder="Filled variant"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Unstyled</label>
          <CInput
            v-model:value="values.unstyled"
            variant="unstyled"
            placeholder="Unstyled variant"
          />
        </div>
      </div>
    </section>

    <!-- States -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">States</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2">Disabled</label>
          <CInput
            v-model:value="values.disabled"
            disabled
            placeholder="Disabled input"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Readonly</label>
          <CInput
            v-model:value="values.readonly"
            readonly
            placeholder="Readonly input"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Required</label>
          <CInput
            v-model:value="values.required"
            required
            placeholder="Required input"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Invalid</label>
          <CInput
            v-model:value="values.invalid"
            invalid
            error-message="This field has an error"
            placeholder="Invalid input"
          />
        </div>
      </div>
    </section>

    <!-- With Elements -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">With Elements</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Search with Icon</label>
          <CInput
            v-model:value="values.searchIcon"
            placeholder="Search products"
          >
            <template #leftElement>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </template>
          </CInput>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Price with Currency</label>
          <CInput
            v-model:value="values.price"
            type="number"
            placeholder="0.00"
          >
            <template #leftElement>
              <span class="text-gray-500">$</span>
            </template>
            <template #rightElement>
              <span class="text-gray-500">USD</span>
            </template>
          </CInput>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Website URL</label>
          <CInput
            v-model:value="values.website"
            type="url"
            placeholder="example"
          >
            <template #prepend>
              <span class="text-gray-500">https://</span>
            </template>
            <template #append>
              <span class="text-gray-500">.com</span>
            </template>
          </CInput>
        </div>
      </div>
    </section>

    <!-- Validation -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Validation</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Email Validation</label>
          <CInput
            v-model:value="validationValues.email"
            type="email"
            :invalid="!isValidEmail(validationValues.email) && validationValues.email.length > 0"
            :error-message="validationValues.email.length > 0 && !isValidEmail(validationValues.email) ? 'Please enter a valid email address' : ''"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Password with Requirements</label>
          <CInput
            v-model:value="validationValues.password"
            type="password"
            :invalid="!isValidPassword(validationValues.password) && validationValues.password.length > 0"
            :error-message="getPasswordError(validationValues.password)"
            helper-text="Must be 8+ characters with uppercase, lowercase, and number"
            placeholder="Enter password"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Username with Length</label>
          <CInput
            v-model:value="validationValues.username"
            :min-length="3"
            :max-length="20"
            :invalid="!isValidUsername(validationValues.username) && validationValues.username.length > 0"
            :error-message="getUsernameError(validationValues.username)"
            placeholder="3-20 characters"
          />
        </div>
      </div>
    </section>

    <!-- Debounced Input -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Debounced Input</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Search with 500ms Debounce</label>
          <CInput
            v-model:value="debouncedValue"
            :debounce-ms="500"
            placeholder="Type to search..."
            helper-text="Change events are debounced by 500ms"
            @change="handleDebouncedChange"
            @input="handleInput"
          >
            <template #leftElement>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </template>
          </CInput>
        </div>

        <div class="p-4 bg-gray-50 rounded-lg">
          <p><strong>Value:</strong> "{{ debouncedValue }}"</p>
          <p><strong>Input events:</strong> {{ inputCount }}</p>
          <p><strong>Change events:</strong> {{ changeCount }}</p>
        </div>
      </div>
    </section>

    <!-- Headless Usage -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Headless Usage</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">CInputHeadless with Custom Classes</label>
          <CInputHeadless
            v-model:value="values.headless"
            placeholder="Completely custom design"
            wrapper-class="space-y-2"
            container-class="flex items-center bg-blue-50 border-2 border-blue-300 rounded-lg p-2"
            input-class="flex-1 bg-transparent border-0 text-blue-800 placeholder-blue-500 focus:outline-none px-2"
            helper-text="This uses CInputHeadless with custom Tailwind classes"
            helper-text-class="text-sm text-blue-600"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Using useInputHeadless Hook</label>
          <div class="relative">
            <input
              :value="hookValue"
              @input="handleHookInput"
              @focus="handleHookFocus"
              @blur="handleHookBlur"
              placeholder="Pure headless with hook"
              :class="[
                'w-full px-4 py-2 border-2 rounded-lg transition-all',
                hookState.isFocused
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              ]"
            />
            <div class="mt-1 text-sm text-gray-600">
              Focus state: {{ hookState.isFocused ? 'Focused' : 'Not focused' }}
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- Values Debug -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Debug Values</h2>
      <div class="p-4 bg-gray-100 rounded-lg">
        <pre class="text-sm overflow-auto">{{ JSON.stringify({ values, validationValues, debouncedValue, hookValue }, null, 2) }}</pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { CInput, CInputHeadless, useInputHeadless } from '../../../lib/components/atoms/input'
import ApiReference from '../../components/Common/ApiReference/apiReference.vue'
import { inputApiData } from '../../data/apiReference'

// Basic values
const values = reactive({
  basic: '',
  helper: '',
  text: '',
  email: '',
  password: '',
  number: '',
  url: '',
  search: '',
  small: '',
  medium: '',
  large: '',
  outline: '',
  filled: '',
  unstyled: '',
  disabled: 'Disabled value',
  readonly: 'Readonly value',
  required: '',
  invalid: 'Invalid value',
  searchIcon: '',
  price: '',
  website: '',
  headless: ''
})

// Validation values
const validationValues = reactive({
  email: '',
  password: '',
  username: ''
})

// Debounced input
const debouncedValue = ref('')
const inputCount = ref(0)
const changeCount = ref(0)

const handleInput = () => {
  inputCount.value++
}

const handleDebouncedChange = () => {
  changeCount.value++
}

// Validation functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return email === '' || emailRegex.test(email)
}

const isValidPassword = (password: string): boolean => {
  if (password === '') return true
  return password.length >= 8 &&
         /(?=.*[a-z])/.test(password) &&
         /(?=.*[A-Z])/.test(password) &&
         /(?=.*\d)/.test(password)
}

const isValidUsername = (username: string): boolean => {
  return username === '' || (username.length >= 3 && username.length <= 20)
}

const getPasswordError = (password: string): string => {
  if (password === '') return ''
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (!/(?=.*[a-z])/.test(password)) return 'Password must contain a lowercase letter'
  if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain an uppercase letter'
  if (!/(?=.*\d)/.test(password)) return 'Password must contain a number'
  return ''
}

const getUsernameError = (username: string): string => {
  if (username === '') return ''
  if (username.length < 3) return 'Username must be at least 3 characters'
  if (username.length > 20) return 'Username must be no more than 20 characters'
  return ''
}

// Headless hook example
const hookValue = ref('')
const hookState = reactive({
  isFocused: false
})

const { setValue } = useInputHeadless({
  value: hookValue.value,
  onChange: (value) => {
    hookValue.value = value
  }
})

const handleHookInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  setValue(target.value, event)
}

const handleHookFocus = () => {
  hookState.isFocused = true
}

const handleHookBlur = () => {
  hookState.isFocused = false
}
</script>
