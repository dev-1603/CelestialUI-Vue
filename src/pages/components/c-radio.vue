<template>
  <section class="radio-demo p-8 max-w-6xl mx-auto">
    <div class="mb-12">
      <h1 class="text-3xl font-bold mb-4">Radio Component</h1>
      <p class="text-gray-600">A customizable radio component with various styles and states. Supports different sizes, states, and help text options.</p>
    </div>

    <!-- Basic Radio Group -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Basic Radio Group</h2>
      <div class="space-y-4">
        <p class="text-sm text-gray-600">A simple radio group with basic functionality.</p>
        <div class="space-y-3">
          <CRadio
            v-for="variant in basicRadioGroup"
            :key="variant.label"
            v-model="selectedBasic"
            v-bind="variant"
          />
        </div>
        <div class="text-sm text-gray-500 mt-4">
          Selected value: {{ selectedBasic }}
        </div>
      </div>
    </div>

    <!-- Disabled States -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Disabled States</h2>
      <div class="space-y-4">
        <p class="text-sm text-gray-600">Radio buttons in different disabled states.</p>
        <div class="space-y-3">
          <CRadio
            v-for="variant in disabledVariants"
            :key="variant.label"
            v-bind="variant"
          />
        </div>
        <div class="text-sm text-gray-500 mt-2">
          Props: disabled, checked (for disabled checked state)
        </div>
      </div>
    </div>

    <!-- Size Variants -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Size Variants</h2>
      <div class="space-y-4">
        <p class="text-sm text-gray-600">Three size variants available: small (sm), default, and large (lg).</p>
        <div class="space-y-4">
          <div v-for="variant in sizeVariants" :key="variant.label" class="space-y-2">
            <CRadio v-bind="variant" />
            <div class="text-sm text-gray-500">
              size="{{ variant.size || 'default' }}"
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- With Help Text -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Help Text & Error States</h2>
      <div class="space-y-4">
        <p class="text-sm text-gray-600">Radio buttons with additional help text and error state.</p>
        <div class="space-y-6">
          <div v-for="variant in helpTextVariants" :key="variant.label" class="space-y-2">
            <CRadio v-bind="variant" />
            <div class="text-sm text-gray-500">
              helpText="{{ variant.helpText }}"
              <template v-if="variant.error">, error=true</template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CRadio from '@/components/CRadio/CRadio.vue'

const selectedBasic = ref('option1')

const basicRadioGroup = ref([
  { label: 'Option 1', value: 'option1', name: 'basic-group' },
  { label: 'Option 2', value: 'option2', name: 'basic-group' },
  { label: 'Option 3', value: 'option3', name: 'basic-group' }
])

const disabledVariants = ref([
  {
    label: 'Disabled Unchecked',
    value: 'disabled1',
    disabled: true,
    name: 'disabled-group'
  },
  {
    label: 'Disabled Checked',
    value: 'disabled2',
    disabled: true,
    checked: true,
    name: 'disabled-group'
  }
])

const sizeVariants = ref([
  {
    label: 'Small Size',
    value: 'small',
    size: 'sm',
    name: 'size-group'
  },
  {
    label: 'Default Size',
    value: 'default',
    name: 'size-group'
  },
  {
    label: 'Large Size',
    value: 'large',
    size: 'lg',
    name: 'size-group'
  }
])

const helpTextVariants = ref([
  {
    label: 'With Help Text',
    value: 'help1',
    helpText: 'This is some helpful description text',
    name: 'help-group'
  },
  {
    label: 'With Error',
    value: 'help2',
    helpText: 'This field has an error',
    error: true,
    name: 'help-group'
  }
])
</script>

<style scoped>
/* Component specific styles */
.radio-demo {
  background-color: #f9fafb;
  min-height: 100vh;
}
</style>
