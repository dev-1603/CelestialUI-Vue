<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">Dialog (Modal)</h1>
    <p class="text-gray-600 mb-8">
      A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
    </p>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex gap-4 flex-wrap">
        <CButton @click="showBasic = true">Open Basic Dialog</CButton>
        <CDialog v-model="showBasic" title="Basic Dialog">
          <p>This is a basic dialog with default settings. It can be closed by clicking the X, clicking outside, or pressing Escape.</p>
          <template #footer>
            <CButton variant="outline" @click="showBasic = false">Cancel</CButton>
            <CButton @click="showBasic = false">Confirm</CButton>
          </template>
        </CDialog>
      </div>
    </section>

    <!-- Sizes -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Sizes</h2>
      <p class="mb-4 text-gray-600">Dialogs come in multiple sizes: sm, md, lg, and full.</p>
      <div class="p-6 border rounded-lg bg-gray-50 flex gap-4 flex-wrap">
        <CButton @click="showSm = true">Small</CButton>
        <CDialog v-model="showSm" size="sm" title="Small Dialog">
          <p>Small dialog content</p>
        </CDialog>

        <CButton @click="showLg = true">Large</CButton>
        <CDialog v-model="showLg" size="lg" title="Large Dialog">
          <p>Large dialog content</p>
        </CDialog>

        <CButton @click="showFull = true">Full Screen</CButton>
        <CDialog v-model="showFull" size="full" title="Full Screen Dialog">
          <p>Full screen dialog content</p>
          <template #footer>
            <CButton @click="showFull = false">Close</CButton>
          </template>
        </CDialog>
      </div>
    </section>

    <!-- API Documentation -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">API Reference</h2>
      
      <h3 class="text-xl font-medium mt-6 mb-2">Props</h3>
      <table class="w-full border-collapse border text-left">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border">Prop</th>
            <th class="p-2 border">Type</th>
            <th class="p-2 border">Default</th>
            <th class="p-2 border">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="p-2 border">modelValue</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Controls visibility</td></tr>
          <tr><td class="p-2 border">title</td><td class="p-2 border">string</td><td class="p-2 border">-</td><td class="p-2 border">Header title</td></tr>
          <tr><td class="p-2 border">description</td><td class="p-2 border">string</td><td class="p-2 border">-</td><td class="p-2 border">Accessible description</td></tr>
          <tr><td class="p-2 border">size</td><td class="p-2 border">'sm' | 'md' | 'lg' | 'full'</td><td class="p-2 border">'md'</td><td class="p-2 border">Dialog width</td></tr>
          <tr><td class="p-2 border">closable</td><td class="p-2 border">boolean</td><td class="p-2 border">true</td><td class="p-2 border">Show close X button</td></tr>
          <tr><td class="p-2 border">closeOnOutsideClick</td><td class="p-2 border">boolean</td><td class="p-2 border">true</td><td class="p-2 border">Close on backdrop click</td></tr>
          <tr><td class="p-2 border">closeOnEsc</td><td class="p-2 border">boolean</td><td class="p-2 border">true</td><td class="p-2 border">Close on Escape key</td></tr>
        </tbody>
      </table>

      <h3 class="text-xl font-medium mt-6 mb-2">Events</h3>
      <table class="w-full border-collapse border text-left">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border">Event</th>
            <th class="p-2 border">Payload</th>
            <th class="p-2 border">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="p-2 border">update:modelValue</td><td class="p-2 border">boolean</td><td class="p-2 border">Fired when dialog opens/closes</td></tr>
          <tr><td class="p-2 border">close</td><td class="p-2 border">-</td><td class="p-2 border">Fired when dialog is closed</td></tr>
          <tr><td class="p-2 border">open</td><td class="p-2 border">-</td><td class="p-2 border">Fired when dialog is opened</td></tr>
        </tbody>
      </table>

      <h3 class="text-xl font-medium mt-6 mb-2">Slots</h3>
      <table class="w-full border-collapse border text-left">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border">Name</th>
            <th class="p-2 border">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="p-2 border">default</td><td class="p-2 border">Main content of the dialog body</td></tr>
          <tr><td class="p-2 border">header</td><td class="p-2 border">Overrides the entire header section</td></tr>
          <tr><td class="p-2 border">footer</td><td class="p-2 border">Content placed at the bottom, typically action buttons</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CDialog } from '../../../lib/components/molecules/dialog'
import { CButton } from '../../../lib/components/atoms/button'

const showBasic = ref(false)
const showSm = ref(false)
const showLg = ref(false)
const showFull = ref(false)
</script>
