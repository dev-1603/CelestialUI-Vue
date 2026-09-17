<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">Tabs</h1>
    <p class="text-gray-600 mb-8">
      A set of layered sections of content—known as tab panels—that are displayed one at a time.
    </p>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex flex-col gap-8">
        
        <!-- Line Variant -->
        <div>
          <h3 class="text-lg font-medium mb-2">Line (Default)</h3>
          <CTabs v-model="activeTab1" :items="items">
            <template #panel-account>
              <div class="p-4 bg-white rounded shadow-sm border mt-4">Account settings content</div>
            </template>
            <template #panel-security>
              <div class="p-4 bg-white rounded shadow-sm border mt-4">Security settings content</div>
            </template>
            <template #panel-billing>
              <div class="p-4 bg-white rounded shadow-sm border mt-4">Billing settings content</div>
            </template>
          </CTabs>
        </div>

        <!-- Enclosed Variant -->
        <div>
          <h3 class="text-lg font-medium mb-2">Enclosed</h3>
          <CTabs v-model="activeTab2" :items="items" variant="enclosed">
            <template #panel-account>
              <div class="p-4 bg-white rounded-b shadow-sm border border-t-0">Account settings content</div>
            </template>
            <template #panel-security>
              <div class="p-4 bg-white rounded-b shadow-sm border border-t-0">Security settings content</div>
            </template>
            <template #panel-billing>
              <div class="p-4 bg-white rounded-b shadow-sm border border-t-0">Billing settings content</div>
            </template>
          </CTabs>
        </div>

        <!-- Pills Variant -->
        <div>
          <h3 class="text-lg font-medium mb-2">Pills</h3>
          <CTabs v-model="activeTab3" :items="items" variant="pills">
            <template #panel-account>
              <div class="p-4 bg-white rounded shadow-sm border mt-4">Account settings content</div>
            </template>
            <template #panel-security>
              <div class="p-4 bg-white rounded shadow-sm border mt-4">Security settings content</div>
            </template>
            <template #panel-billing>
              <div class="p-4 bg-white rounded shadow-sm border mt-4">Billing settings content</div>
            </template>
          </CTabs>
        </div>

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
          <tr><td class="p-2 border">modelValue</td><td class="p-2 border">string | number</td><td class="p-2 border">required</td><td class="p-2 border">Active tab ID</td></tr>
          <tr><td class="p-2 border">items</td><td class="p-2 border">CTabItem[]</td><td class="p-2 border">required</td><td class="p-2 border">List of tabs</td></tr>
          <tr><td class="p-2 border">variant</td><td class="p-2 border">'line' | 'enclosed' | 'pills'</td><td class="p-2 border">'line'</td><td class="p-2 border">Visual style</td></tr>
          <tr><td class="p-2 border">orientation</td><td class="p-2 border">'horizontal' | 'vertical'</td><td class="p-2 border">'horizontal'</td><td class="p-2 border">Layout orientation</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CTabs } from '../../../lib/components/molecules/tabs'

const items = [
  { id: 'account', label: 'Account' },
  { id: 'security', label: 'Security' },
  { id: 'billing', label: 'Billing' },
  { id: 'disabled', label: 'Disabled', disabled: true }
]

const activeTab1 = ref('account')
const activeTab2 = ref('account')
const activeTab3 = ref('account')
</script>
