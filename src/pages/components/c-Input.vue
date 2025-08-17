<template>
  <section class="input-demo p-8 max-w-6xl mx-auto">
    <div class="mb-12">
      <h1 class="text-3xl font-bold mb-4">Input Component</h1>
      <p class="text-gray-600">A versatile input component with various styles and states. Supports different sizes, states, types and icon placements.</p>
    </div>

    <!-- Basic Input -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Basic Input</h2>
      <div class="space-y-4">
        <p class="text-sm text-gray-600">The default input with basic text functionality.</p>
        <CUInput
          v-model="basicInput"
          type="text"
          id="basic-input"
          name="basicInput"
          placeholder="Basic input example"
          class="w-full max-w-md"
        />
        <div class="text-sm text-gray-500">
          Props: type="text", placeholder="Basic input example"
        </div>
      </div>
    </div>

    <!-- Input Sizes -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Input Sizes</h2>
      <div class="space-y-6">
        <p class="text-sm text-gray-600">Three size variants available: small (sm), default, and large (lg).</p>
        <div class="grid gap-4">
          <div class="space-y-2">
            <CUInput
              v-model="smallInput"
              size="sm"
              placeholder="Small input"
              class="w-full max-w-md"
            />
            <div class="text-sm text-gray-500">size="sm"</div>
          </div>
          <div class="space-y-2">
            <CUInput
              v-model="defaultInput"
              placeholder="Default input"
              class="w-full max-w-md"
            />
            <div class="text-sm text-gray-500">default size</div>
          </div>
          <div class="space-y-2">
            <CUInput
              v-model="largeInput"
              size="lg"
              placeholder="Large input"
              class="w-full max-w-md"
            />
            <div class="text-sm text-gray-500">size="lg"</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input States -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Input States</h2>
      <div class="space-y-6">
        <p class="text-sm text-gray-600">Different states to indicate input status: disabled, error, and success.</p>
        <div class="grid gap-6">
          <div class="space-y-2">
            <CUInput
              v-model="disabledInput"
              placeholder="Disabled input"
              disabled
              class="w-full max-w-md"
            />
            <div class="text-sm text-gray-500">disabled</div>
          </div>
          <div class="space-y-2">
            <CUInput
              v-model="errorInput"
              placeholder="Error input"
              error
              helpText="This field has an error"
              class="w-full max-w-md"
            />
            <div class="text-sm text-gray-500">error, helpText="This field has an error"</div>
          </div>
          <div class="space-y-2">
            <CUInput
              v-model="successInput"
              placeholder="Success input"
              success
              helpText="Input is valid"
              class="w-full max-w-md"
            />
            <div class="text-sm text-gray-500">success, helpText="Input is valid"</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Types -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Input Types</h2>
      <div class="space-y-6">
        <p class="text-sm text-gray-600">Different input types for specific data entry: password, number, and email.</p>
        <div class="grid gap-6">
          <div class="space-y-2">
            <CUInput
              v-model="passwordInput"
              type="password"
              placeholder="Password input"
              class="w-full max-w-md"
            />
            <div class="text-sm text-gray-500">type="password"</div>
          </div>
          <div class="space-y-2">
            <CUInput
              v-model="numberInput"
              type="number"
              placeholder="Number input"
              class="w-full max-w-md"
            />
            <div class="text-sm text-gray-500">type="number"</div>
          </div>
          <div class="space-y-2">
            <CUInput
              v-model="emailInput"
              type="email"
              placeholder="Email input"
              class="w-full max-w-md"
            />
            <div class="text-sm text-gray-500">type="email"</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input with Icons -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Input with Icons</h2>
      <div class="space-y-6">
        <p class="text-sm text-gray-600">Inputs with decorative icons on either side for enhanced visual feedback.</p>
        <div class="grid gap-6">
          <div class="space-y-2">
            <CUInput
              v-model="leftIconInput"
              placeholder="Input with left icon"
              leftIcon="search"
              class="w-full max-w-md"
            />
            <div class="text-sm text-gray-500">leftIcon="search"</div>
          </div>
          <div class="space-y-2">
            <CUInput
              v-model="rightIconInput"
              placeholder="Input with right icon"
              rightIcon="calendar"
              class="w-full max-w-md"
            />
            <div class="text-sm text-gray-500">rightIcon="calendar"</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CUInput from "@/components/CInput/CInput.vue";

// Basic input
const basicInput = ref('');

// Size variants
const smallInput = ref('');
const defaultInput = ref('');
const largeInput = ref('');

// State variants
const disabledInput = ref('');
const errorInput = ref('');
const successInput = ref('');

// Type variants
const passwordInput = ref('');
const numberInput = ref('');
const emailInput = ref('');

// Icon variants
const leftIconInput = ref('');
const rightIconInput = ref('');
</script>
