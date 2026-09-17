<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">Social Login Button</h1>
    <p class="text-gray-600 mb-8">
      Buttons for authenticating users via third-party identity providers.
    </p>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex gap-4 flex-wrap">
        <CSocialLoginButton provider="google" />
        <CSocialLoginButton provider="github" />
        <CSocialLoginButton provider="apple" />
        <CSocialLoginButton provider="facebook" />
      </div>
    </section>

    <!-- Solid Variant -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Solid Variant</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex gap-4 flex-wrap">
        <CSocialLoginButton provider="google" variant="solid" />
        <CSocialLoginButton provider="twitter" variant="solid" />
        <CSocialLoginButton provider="github" variant="solid" />
      </div>
    </section>

    <!-- Custom Labels & States -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Custom Labels & States</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex flex-col gap-4 max-w-sm">
        <CSocialLoginButton provider="microsoft" label="Sign in using Microsoft" />
        <CSocialLoginButton provider="google" loading />
        <CSocialLoginButton provider="github" disabled />
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
          <tr><td class="p-2 border">provider</td><td class="p-2 border">'google' | 'github' | 'apple' | 'microsoft' | 'facebook' | 'twitter'</td><td class="p-2 border">required</td><td class="p-2 border">Identity provider</td></tr>
          <tr><td class="p-2 border">label</td><td class="p-2 border">string</td><td class="p-2 border">"Continue with {Provider}"</td><td class="p-2 border">Button text</td></tr>
          <tr><td class="p-2 border">loading</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Loading state</td></tr>
          <tr><td class="p-2 border">disabled</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Disabled state</td></tr>
          <tr><td class="p-2 border">variant</td><td class="p-2 border">'outline' | 'solid'</td><td class="p-2 border">'outline'</td><td class="p-2 border">Button style</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CSocialLoginButton } from '../../../lib/components/molecules/social-login-button'
</script>
