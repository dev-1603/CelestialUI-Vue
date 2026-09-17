<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">PIN Input</h1>
    <p class="text-gray-600 mb-8">
      A segmented input component used to collect one-time passwords (OTP) or personal identification numbers (PIN).
    </p>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex flex-col gap-6">
        <div>
          <label class="block mb-2 font-medium">4-Digit PIN (Default)</label>
          <CPinInput v-model="pin1" />
          <div class="mt-2 text-sm text-gray-500">Value: {{ pin1 }}</div>
        </div>

        <div>
          <label class="block mb-2 font-medium">6-Digit Number-only PIN</label>
          <CPinInput v-model="pin2" :length="6" type="number" />
          <div class="mt-2 text-sm text-gray-500">Value: {{ pin2 }}</div>
        </div>

        <div>
          <label class="block mb-2 font-medium">Password PIN</label>
          <CPinInput v-model="pin3" type="password" />
        </div>
        
        <div>
          <label class="block mb-2 font-medium">Disabled & Error States</label>
          <div class="flex gap-8">
            <CPinInput v-model="pin4" disabled />
            <CPinInput v-model="pin5" error />
          </div>
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
          <tr><td class="p-2 border">modelValue</td><td class="p-2 border">string</td><td class="p-2 border">required</td><td class="p-2 border">The current value of the PIN</td></tr>
          <tr><td class="p-2 border">length</td><td class="p-2 border">number</td><td class="p-2 border">4</td><td class="p-2 border">Number of input fields</td></tr>
          <tr><td class="p-2 border">type</td><td class="p-2 border">'text' | 'password' | 'number'</td><td class="p-2 border">'text'</td><td class="p-2 border">Input type and validation</td></tr>
          <tr><td class="p-2 border">placeholder</td><td class="p-2 border">string</td><td class="p-2 border">''</td><td class="p-2 border">Placeholder character</td></tr>
          <tr><td class="p-2 border">disabled</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Disables the input</td></tr>
          <tr><td class="p-2 border">error</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Displays error styling</td></tr>
          <tr><td class="p-2 border">autofocus</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Focuses the first input on mount</td></tr>
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
          <tr><td class="p-2 border">update:modelValue</td><td class="p-2 border">string</td><td class="p-2 border">Fired when value changes</td></tr>
          <tr><td class="p-2 border">complete</td><td class="p-2 border">string</td><td class="p-2 border">Fired when all inputs are filled</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CPinInput } from '../../../lib/components/molecules/pin-input'

const pin1 = ref('')
const pin2 = ref('')
const pin3 = ref('')
const pin4 = ref('12')
const pin5 = ref('')
</script>
