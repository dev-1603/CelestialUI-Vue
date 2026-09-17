<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">Countdown Timer</h1>
    <p class="text-gray-600 mb-8">
      A visual timer component useful for OTP verification timeouts, limited-time offers, or redirects.
    </p>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex gap-4 flex-wrap items-center">
        <CCountdownTimer :initial-seconds="60" auto-start />
        <CCountdownTimer :initial-seconds="65" format="text" auto-start />
        <CCountdownTimer :initial-seconds="15" format="ss" auto-start />
      </div>
    </section>

    <!-- Controlled Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Controlled Usage</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex flex-col gap-4 max-w-xs">
        <CCountdownTimer ref="timerRef" :initial-seconds="30" />
        <div class="flex gap-2">
          <CButton size="sm" @click="timerRef?.start()">Start</CButton>
          <CButton size="sm" variant="outline" @click="timerRef?.pause()">Pause</CButton>
          <CButton size="sm" variant="ghost" @click="timerRef?.reset()">Reset</CButton>
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
          <tr><td class="p-2 border">initialSeconds</td><td class="p-2 border">number</td><td class="p-2 border">required</td><td class="p-2 border">Starting time in seconds</td></tr>
          <tr><td class="p-2 border">autoStart</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Start countdown on mount</td></tr>
          <tr><td class="p-2 border">format</td><td class="p-2 border">'mm:ss' | 'ss' | 'text'</td><td class="p-2 border">'mm:ss'</td><td class="p-2 border">Display format</td></tr>
          <tr><td class="p-2 border">disabled</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Disables functionality</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CCountdownTimer } from '../../../lib/components/molecules/countdown-timer'
import { CButton } from '../../../lib/components/atoms/button'

const timerRef = ref<any>(null)
</script>
