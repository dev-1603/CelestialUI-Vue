<template>
  <div class="space-y-8 p-6">
    <!-- Back button -->
    <div class="mb-6">
      <router-link
        to="/playground/atomic/input"
        class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Input base
      </router-link>
    </div>

    <!-- Page Title -->
    <div class="border-b pb-6">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        CInput Customization Examples
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Demonstrating headless usage, class overrides, and custom styling with Tailwind CSS
      </p>
    </div>

    <!-- Default CInput -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">1. Default CInput</h2>
      <div class="p-4 border rounded-lg">
        <CInput
          v-model:value="values.default"
          placeholder="Default input with all styles"
        />
      </div>
      <div class="text-sm text-gray-600">
        <strong>Value:</strong> "{{ values.default }}"
      </div>
    </section>

    <!-- Class Overrides -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">2. Class Overrides</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Custom wrapper classes -->
        <div class="space-y-2">
          <h3 class="font-medium">Custom Wrapper Classes</h3>
          <div class="p-4 border rounded-lg">
            <CInput
              v-model:value="values.customWrapper"
              placeholder="Custom wrapper styling"
              wrapper-class="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-2 border-dashed border-blue-300"
            />
          </div>
        </div>

        <!-- Custom input classes -->
        <div class="space-y-2">
          <h3 class="font-medium">Custom Input Classes</h3>
          <div class="p-4 border rounded-lg">
            <CInput
              v-model:value="values.customInput"
              placeholder="Custom input styling"
              input-class="bg-gradient-to-r from-green-100 to-blue-100 border-green-500 text-green-800 placeholder-green-600 rounded-full px-6"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Headless Mode -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">3. Headless Mode</h2>
      <div class="space-y-4">
        <!-- Using CInputHeadless -->
        <div class="space-y-2">
          <h3 class="font-medium">CInputHeadless with Custom Tailwind Classes</h3>
          <div class="p-4 border rounded-lg">
            <CInputHeadless
              v-model:value="values.headless"
              placeholder="Completely custom design"
              wrapper-class="relative"
              container-class="relative flex items-center bg-white border-2 border-gray-300 rounded-lg shadow-sm hover:border-blue-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
              input-class="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0"
              helper-text-class="mt-2 text-sm text-gray-600"
              helper-text="This is completely custom styled with Tailwind"
            >
              <template #leftElement>
                <div class="pl-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </template>
            </CInputHeadless>
          </div>
        </div>

        <!-- Pure headless with useInput hook -->
        <div class="space-y-2">
          <h3 class="font-medium">Pure Headless with useInput Hook</h3>
          <div class="p-4 border rounded-lg">
            <div class="relative">
              <input
                :value="pureHeadlessValue"
                @input="handlePureHeadlessInput"
                @focus="handlePureHeadlessFocus"
                @blur="handlePureHeadlessBlur"
                placeholder="Pure headless input"
                :class="[
                  'w-full px-4 py-3 text-lg font-medium bg-gray-900 text-white rounded-xl border-2 transition-all duration-200',
                  pureHeadlessState.isFocused
                    ? 'border-yellow-400 shadow-lg shadow-yellow-400/20'
                    : 'border-gray-700 hover:border-gray-600'
                ]"
              />
              <div
                v-if="pureHeadlessValue"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <span class="text-green-400 font-semibold">✓</span>
              </div>
            </div>
            <div class="mt-2 text-sm text-gray-400">
              Focus state: {{ pureHeadlessState.isFocused ? 'Focused' : 'Not focused' }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Unstyled Mode -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">4. Unstyled Mode</h2>
      <div class="space-y-4">
        <div class="space-y-2">
          <h3 class="font-medium">Unstyled with Custom CSS Classes</h3>
          <div class="p-4 border rounded-lg">
            <CInput
              v-model:value="values.unstyled"
              placeholder="Unstyled input"
              unstyled
              wrapper-class="custom-input-wrapper"
              container-class="custom-input-container"
              input-class="custom-input-field"
              helper-text="Custom styled input using CSS classes"
              helper-text-class="custom-helper-text"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Advanced Customization -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">5. Advanced Customization</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Glassmorphism style -->
        <div class="space-y-2">
          <h3 class="font-medium">Glassmorphism Style</h3>
          <div class="p-6 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-xl">
            <CInput
              v-model:value="values.glass"
              placeholder="Glassmorphism input"
              container-class="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-xl"
              input-class="bg-transparent text-white placeholder-white/70 px-4 py-3"
              :style="{
                '--tw-ring-color': 'rgba(255, 255, 255, 0.3)',
              }"
            />
          </div>
        </div>

        <!-- Neon style -->
        <div class="space-y-2">
          <h3 class="font-medium">Neon Style</h3>
          <div class="p-6 bg-gray-900 rounded-xl">
            <CInput
              v-model:value="values.neon"
              placeholder="Neon input"
              container-class="bg-gray-800 border-2 border-cyan-500 rounded-lg shadow-lg shadow-cyan-500/50"
              input-class="bg-transparent text-cyan-300 placeholder-cyan-400 px-4 py-3"
            />
          </div>
        </div>

        <!-- Minimal style -->
        <div class="space-y-2">
          <h3 class="font-medium">Minimal Style</h3>
          <div class="p-4 border rounded-lg">
            <CInput
              v-model:value="values.minimal"
              placeholder="Minimal input"
              container-class="border-0 border-b-2 border-gray-300 rounded-none p-0"
              input-class="bg-transparent border-0 px-0 py-2 text-lg focus:ring-0"
            />
          </div>
        </div>

        <!-- Card style -->
        <div class="space-y-2">
          <h3 class="font-medium">Card Style</h3>
          <div class="p-4 border rounded-lg">
            <CInput
              v-model:value="values.card"
              placeholder="Card style input"
              container-class="bg-white shadow-lg rounded-2xl border-0 p-1"
              input-class="bg-gray-50 rounded-xl px-4 py-3 border-0 focus:bg-white focus:ring-0"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Multiple Elements Customization -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">6. Multiple Elements Customization</h2>
      <div class="p-4 border rounded-lg space-y-4">
        <CInput
          v-model:value="values.multiElement"
          placeholder="Amount"
          invalid
          error-message="Please enter a valid amount"
          container-class="relative"
          left-element-class="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-gray-500"
          right-element-class="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-500"
          input-class="pl-12 pr-16 py-3 border-2 border-red-300 rounded-lg focus:border-red-500 focus:ring-red-200"
          error-message-class="mt-2 text-sm text-red-600 font-medium"
        >
          <template #leftElement>
            <span class="font-bold">$</span>
          </template>
          <template #rightElement>
            <span class="text-xs">USD</span>
          </template>
        </CInput>
      </div>
    </section>

    <!-- Performance Comparison -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">7. Performance & Bundle Size</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 border rounded-lg">
          <h3 class="font-semibold text-green-600">CInput (Default)</h3>
          <p class="text-sm text-gray-600 mt-2">
            Includes all styles (~3KB CSS)
          </p>
          <CInput
            v-model:value="values.perf1"
            placeholder="With styles"
            size="sm"
          />
        </div>

        <div class="p-4 border rounded-lg">
          <h3 class="font-semibold text-blue-600">CInputHeadless</h3>
          <p class="text-sm text-gray-600 mt-2">
            No styles, custom classes only
          </p>
          <CInputHeadless
            v-model:value="values.perf2"
            placeholder="Headless"
            container-class="border border-gray-300 rounded px-3 py-1"
            input-class="w-full border-0 focus:outline-none text-sm"
          />
        </div>

        <div class="p-4 border rounded-lg">
          <h3 class="font-semibold text-purple-600">Pure Hook</h3>
          <p class="text-sm text-gray-600 mt-2">
            Logic only, minimal overhead
          </p>
          <input
            :value="hookOnlyValue"
            @input="handleHookOnlyInput"
            placeholder="Hook only"
            class="w-full border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </section>

    <!-- Values Debug -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Debug Values</h2>
      <div class="p-4 bg-gray-100 rounded-lg">
        <pre class="text-sm overflow-auto">{{ JSON.stringify(values, null, 2) }}</pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { CInput, CInputHeadless, useInputHeadless } from '../../../lib/components/atoms/input'

// Reactive values for all examples
const values = reactive({
  default: '',
  customWrapper: '',
  customInput: '',
  headless: '',
  unstyled: '',
  glass: '',
  neon: '',
  minimal: '',
  card: '',
  multiElement: '',
  perf1: '',
  perf2: '',
})

// Pure headless example with useInput hook
const pureHeadlessValue = ref('')
const pureHeadlessState = reactive({
  isFocused: false
})

const handlePureHeadlessInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  pureHeadlessValue.value = target.value
}

const handlePureHeadlessFocus = () => {
  pureHeadlessState.isFocused = true
}

const handlePureHeadlessBlur = () => {
  pureHeadlessState.isFocused = false
}

// Hook-only example
const hookOnlyValue = ref('')
const { setValue } = useInputHeadless({
  value: hookOnlyValue.value,
  onChange: (value) => {
    hookOnlyValue.value = value
  }
})

const handleHookOnlyInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  setValue(target.value, event)
}
</script>

<style scoped>
/* Custom CSS classes for unstyled example */
.custom-input-wrapper {
  @apply relative;
}

.custom-input-container {
  @apply relative flex items-center bg-gradient-to-r from-orange-100 to-pink-100 border-2 border-orange-300 rounded-full px-4 py-2 transition-all duration-300 hover:shadow-lg;
}

.custom-input-field {
  @apply flex-1 bg-transparent text-orange-800 placeholder-orange-500 border-0 focus:outline-none font-medium;
}

.custom-helper-text {
  @apply mt-2 text-sm text-orange-600 font-medium;
}

/* Focus styles for custom container */
.custom-input-container:focus-within {
  @apply border-orange-500 shadow-lg shadow-orange-200;
}
</style>
