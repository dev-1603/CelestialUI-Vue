<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">QR Session Canvas</h1>
    <p class="text-gray-600 mb-8">
      A visual container for displaying and managing stateful QR codes (e.g., cross-device authentication).
    </p>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex gap-8 flex-wrap justify-center">
        <!-- Active -->
        <div class="flex flex-col gap-2 items-center">
          <h3 class="font-medium text-sm text-gray-500">Active</h3>
          <CQrSessionCanvas 
            status="active"
            :qr-data="mockQr"
            :expires-in="60"
            @cancel="handleCancel"
          />
        </div>

        <!-- Loading -->
        <div class="flex flex-col gap-2 items-center">
          <h3 class="font-medium text-sm text-gray-500">Loading</h3>
          <CQrSessionCanvas 
            status="loading"
            @cancel="handleCancel"
          />
        </div>
        
        <!-- Scanned -->
        <div class="flex flex-col gap-2 items-center">
          <h3 class="font-medium text-sm text-gray-500">Scanned</h3>
          <CQrSessionCanvas 
            status="scanned"
            :qr-data="mockQr"
            @cancel="handleCancel"
          />
        </div>
        
        <!-- Expired -->
        <div class="flex flex-col gap-2 items-center">
          <h3 class="font-medium text-sm text-gray-500">Expired</h3>
          <CQrSessionCanvas 
            status="expired"
            @refresh="handleRefresh"
            @cancel="handleCancel"
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
          <tr><td class="p-2 border">status</td><td class="p-2 border">'loading' | 'active' | 'scanned' | 'expired' | 'error'</td><td class="p-2 border">'active'</td><td class="p-2 border">Component state</td></tr>
          <tr><td class="p-2 border">qrData</td><td class="p-2 border">string</td><td class="p-2 border">-</td><td class="p-2 border">Base64 image or URL</td></tr>
          <tr><td class="p-2 border">error</td><td class="p-2 border">string</td><td class="p-2 border">-</td><td class="p-2 border">Error message</td></tr>
          <tr><td class="p-2 border">expiresIn</td><td class="p-2 border">number</td><td class="p-2 border">-</td><td class="p-2 border">Seconds to expiration</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CQrSessionCanvas } from '../../../lib/components/organisms/qr-session-canvas'

// Dummy QR code for display purposes
const mockQr = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

const handleCancel = () => alert('Cancel clicked')
const handleRefresh = () => alert('Refresh clicked')
</script>
