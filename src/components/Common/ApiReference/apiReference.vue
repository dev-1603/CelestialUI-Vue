<template>
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-6 text-center">{{ title }}</h2>
    <div class="flex  gap-6">
      <!-- Props Card -->
      <div class="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
        <div
          class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-colors"
          @click="toggleSection('props')">
          <h3 class="text-lg font-semibold text-white flex items-center justify-between">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12a1 1 0 102 0V7a1 1 0 10-2 0v5zM10 15a1 1 0 100-2 1 1 0 000 2z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" />
              </svg>
              Props ({{ componentProps.length }})
            </div>
            <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': expandedSections.props }"
              fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </h3>
        </div>
        <div v-show="expandedSections.props" class="transition-all duration-300"
          :class="{ 'max-h-96 overflow-y-auto': expandedSections.props }">
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="(prop, index) in componentProps" :key="prop.name" class="border-b border-gray-100 pb-3"
                :class="{ 'border-b-0': index === componentProps.length - 1 }">
                <div class="flex justify-between items-start">
                  <code class="text-sm font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">{{ prop.name }}</code>
                  <span class="text-xs ml-2" :class="prop.required ? 'text-gray-500' : 'text-gray-400'">
                    {{ prop.required ? 'required' : 'optional' }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ prop.description }}</p>
                <p class="text-xs text-gray-500 mt-1"><strong>Type:</strong> {{ prop.type }}</p>
                <p v-if="prop.default" class="text-xs text-blue-600 mt-1"><strong>Default:</strong> {{ prop.default }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Events Card -->

      </div>
      <div class="bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden">
        <div
          class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 cursor-pointer hover:from-green-600 hover:to-green-700 transition-colors"
          @click="toggleSection('events')">
          <h3 class="text-lg font-semibold text-white flex items-center justify-between">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              Events ({{ componentEvents.length }})
            </div>
            <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': expandedSections.events }"
              fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </h3>
        </div>
        <div v-show="expandedSections.events" class="transition-all duration-300"
          :class="{ 'max-h-96 overflow-y-auto': expandedSections.events }">
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="(event, index) in componentEvents" :key="event.name" class="border-b border-gray-100 pb-3"
                :class="{ 'border-b-0': index === componentEvents.length - 1 }">
                <div class="flex justify-between items-start">
                  <code class="text-sm font-mono bg-green-100 text-green-800 px-2 py-1 rounded">{{ event.name }}</code>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ event.description }}</p>
                <p class="text-xs text-gray-500 mt-1"><strong>Payload:</strong> {{ event.payload }}</p>
                <p class="text-xs text-green-600 mt-1"><strong>Usage:</strong> {{ event.usage }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Slots Card -->
      <div class="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden">
        <div
          class="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-colors"
          @click="toggleSection('slots')">
          <h3 class="text-lg font-semibold text-white flex items-center justify-between">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" />
              </svg>
              Slots ({{ componentSlots.length }})
            </div>
            <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': expandedSections.slots }"
              fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </h3>
        </div>
        <div v-show="expandedSections.slots" class="transition-all duration-300"
          :class="{ 'max-h-96 overflow-y-auto': expandedSections.slots }">
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="(slot, index) in componentSlots" :key="slot.name" class="border-b border-gray-100 pb-3"
                :class="{ 'border-b-0': index === componentSlots.length - 1 }">
                <div class="flex justify-between items-start">
                  <code class="text-sm font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded">{{ slot.name }}</code>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ slot.description }}</p>
                <p class="text-xs text-gray-500 mt-1"><strong>Content:</strong> {{ slot.content }}</p>
                <div v-if="slot.example" class="mt-2 p-2 bg-gray-50 rounded text-xs">
                  <pre class="whitespace-pre-wrap">{{ slot.example }}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <!-- Usage Examples Section -->
     <div v-if="usageExamples && usageExamples.length > 0"
        class="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-800">Quick Usage Examples</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="example in usageExamples" :key="example.title" class="bg-white rounded-lg p-4 shadow-sm">
            <h4 class="font-medium text-gray-700 mb-2">{{ example.title }}</h4>
            <code class="text-sm bg-gray-800 text-white p-2 rounded block whitespace-pre-wrap">{{ example.code }}</code>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// Types
interface PropDefinition {
  name: string
  type: string
  required?: boolean
  description: string
  default?: string
}

interface EventDefinition {
  name: string
  description: string
  payload: string
  usage: string
}

interface SlotDefinition {
  name: string
  description: string
  content: string
  example?: string
}

interface UsageExample {
  title: string
  code: string
}

// Props
interface Props {
  title?: string
  componentProps: PropDefinition[]
  componentEvents: EventDefinition[]
  componentSlots: SlotDefinition[]
  usageExamples?: UsageExample[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'API Reference',
  usageExamples: () => []
})

// State
const expandedSections = reactive({
  props: true,
  events: true,
  slots: true
})

// Methods
const toggleSection = (section: 'props' | 'events' | 'slots') => {
  const newState = !expandedSections[section]
  // When any section is toggled, apply the same state to all sections
  expandedSections.props = newState
  expandedSections.events = newState
  expandedSections.slots = newState
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.max-h-96 {
  max-height: 24rem;
}

.overflow-y-auto {
  overflow-y: auto;
}

.cursor-pointer {
  cursor: pointer;
}

.hover\:from-blue-600:hover {
  --tw-gradient-from: #2563eb;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(37, 99, 235, 0));
}

.hover\:to-blue-700:hover {
  --tw-gradient-to: #1d4ed8;
}

.hover\:from-green-600:hover {
  --tw-gradient-from: #16a34a;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(22, 163, 74, 0));
}

.hover\:to-green-700:hover {
  --tw-gradient-to: #15803d;
}

.hover\:from-purple-600:hover {
  --tw-gradient-from: #9333ea;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(147, 51, 234, 0));
}

.hover\:to-purple-700:hover {
  --tw-gradient-to: #7c2d12;
}
</style>
