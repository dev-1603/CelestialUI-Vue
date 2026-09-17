<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">Password Input</h1>
    <p class="text-gray-600 mb-8">
      A specialized text field for collecting passwords, equipped with visibility toggles, strength indicators, and requirement tracking.
    </p>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex flex-col gap-6">
        <div>
          <CPasswordInput 
            v-model="pwd1" 
            label="Simple Password" 
            placeholder="Enter password..." 
          />
        </div>

        <div>
          <CPasswordInput 
            v-model="pwd2" 
            label="With Strength Indicator" 
            placeholder="Enter password..." 
            show-strength-indicator
          />
        </div>

        <div>
          <CPasswordInput 
            v-model="pwd3" 
            label="With Requirements & Strength" 
            placeholder="Create strong password..." 
            show-strength-indicator
            show-requirements
          />
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
          <tr><td class="p-2 border">modelValue</td><td class="p-2 border">string</td><td class="p-2 border">required</td><td class="p-2 border">The current value</td></tr>
          <tr><td class="p-2 border">label</td><td class="p-2 border">string</td><td class="p-2 border">-</td><td class="p-2 border">Input label</td></tr>
          <tr><td class="p-2 border">placeholder</td><td class="p-2 border">string</td><td class="p-2 border">-</td><td class="p-2 border">Placeholder text</td></tr>
          <tr><td class="p-2 border">showStrengthIndicator</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Shows strength bar</td></tr>
          <tr><td class="p-2 border">showRequirements</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Shows checklist of rules</td></tr>
          <tr><td class="p-2 border">requirements</td><td class="p-2 border">PasswordRequirement[]</td><td class="p-2 border">default rules</td><td class="p-2 border">Custom regex rules</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CPasswordInput } from '../../../lib/components/molecules/password-input'

const pwd1 = ref('')
const pwd2 = ref('')
const pwd3 = ref('')
</script>
