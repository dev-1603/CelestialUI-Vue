<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">Identifier First Resolver</h1>
    <p class="text-gray-600 mb-8">
      A form component used as the first step in authentication to resolve a user's identity (email or phone).
    </p>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="p-6 border rounded-lg bg-gray-50 max-w-sm">
        <CIdentifierFirstResolver 
          @resolve="handleResolve"
        />
      </div>
    </section>

    <!-- States -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">States</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex flex-col gap-8 max-w-sm">
        <div>
          <h3 class="text-lg font-medium mb-2">Loading</h3>
          <CIdentifierFirstResolver loading />
        </div>
        
        <div>
          <h3 class="text-lg font-medium mb-2">With Error</h3>
          <CIdentifierFirstResolver error="Account not found" />
        </div>
        
        <div>
          <h3 class="text-lg font-medium mb-2">Disabled</h3>
          <CIdentifierFirstResolver disabled />
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
          <tr><td class="p-2 border">initialIdentifier</td><td class="p-2 border">string</td><td class="p-2 border">''</td><td class="p-2 border">Pre-filled value</td></tr>
          <tr><td class="p-2 border">loading</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Loading state</td></tr>
          <tr><td class="p-2 border">disabled</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Disabled state</td></tr>
          <tr><td class="p-2 border">error</td><td class="p-2 border">string</td><td class="p-2 border">''</td><td class="p-2 border">External error message</td></tr>
          <tr><td class="p-2 border">label</td><td class="p-2 border">string</td><td class="p-2 border">'Email or Phone'</td><td class="p-2 border">Input label</td></tr>
          <tr><td class="p-2 border">placeholder</td><td class="p-2 border">string</td><td class="p-2 border">'Enter your email or phone number'</td><td class="p-2 border">Placeholder text</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CIdentifierFirstResolver } from '../../../lib/components/organisms/identifier-first-resolver'

const handleResolve = (identifier: string) => {
  alert(`Resolved identifier: ${identifier}`)
}
</script>
