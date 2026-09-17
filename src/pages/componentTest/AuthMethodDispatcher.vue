<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">Auth Method Dispatcher</h1>
    <p class="text-gray-600 mb-8">
      A routing component that presents multiple authentication options to a user.
    </p>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex justify-center">
        <div class="w-full max-w-sm bg-white p-6 shadow-sm rounded-xl">
          <CAuthMethodDispatcher 
            identifier="jane.doe@example.com"
            :available-methods="['password', 'magic_link', 'otp']"
            @select-method="handleMethod"
            @back="handleBack"
          />
        </div>
      </div>
    </section>

    <!-- With Social Providers -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">With Social Providers</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex justify-center">
        <div class="w-full max-w-sm bg-white p-6 shadow-sm rounded-xl">
          <CAuthMethodDispatcher 
            identifier="jane.doe@example.com"
            :available-methods="['password']"
            :social-providers="[
              { id: 'google', name: 'Google', icon: 'google' },
              { id: 'github', name: 'GitHub', icon: 'github' }
            ]"
            @select-method="handleMethod"
            @select-social="handleSocial"
            @back="handleBack"
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
          <tr><td class="p-2 border">identifier</td><td class="p-2 border">string</td><td class="p-2 border">required</td><td class="p-2 border">User's identity</td></tr>
          <tr><td class="p-2 border">availableMethods</td><td class="p-2 border">AuthMethod[]</td><td class="p-2 border">required</td><td class="p-2 border">List of auth methods</td></tr>
          <tr><td class="p-2 border">socialProviders</td><td class="p-2 border">ProviderState[]</td><td class="p-2 border">[]</td><td class="p-2 border">Social login options</td></tr>
          <tr><td class="p-2 border">defaultMethod</td><td class="p-2 border">AuthMethod</td><td class="p-2 border">first method</td><td class="p-2 border">Pre-selected option</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CAuthMethodDispatcher } from '../../../lib/components/organisms/auth-method-dispatcher'

const handleMethod = (method: string) => alert(`Selected method: ${method}`)
const handleSocial = (provider: string) => alert(`Selected social provider: ${provider}`)
const handleBack = () => alert('Back clicked')
</script>
