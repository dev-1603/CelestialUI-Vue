<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">MFA Challenge Panel</h1>
    <p class="text-gray-600 mb-8">
      A panel for completing multi-factor authentication challenges like TOTP or SMS verification.
    </p>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">TOTP (Authenticator App)</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex justify-center">
        <div class="w-full max-w-sm bg-white p-6 shadow-sm rounded-xl">
          <CMfaChallengePanel 
            method="totp"
            @verify="handleVerify"
            @cancel="handleCancel"
          />
        </div>
      </div>
    </section>

    <!-- SMS with Resend -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">SMS with Resend</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex justify-center">
        <div class="w-full max-w-sm bg-white p-6 shadow-sm rounded-xl">
          <CMfaChallengePanel 
            method="sms"
            destination="+1 (555) 123-4567"
            :resend-cooldown="30"
            @verify="handleVerify"
            @resend="handleResend"
            @cancel="handleCancel"
          />
        </div>
      </div>
    </section>
    
    <!-- Error State -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Error State</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex justify-center">
        <div class="w-full max-w-sm bg-white p-6 shadow-sm rounded-xl">
          <CMfaChallengePanel 
            method="email"
            destination="user@example.com"
            error="The code you entered is incorrect."
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
          <tr><td class="p-2 border">method</td><td class="p-2 border">'totp' | 'sms' | 'email'</td><td class="p-2 border">required</td><td class="p-2 border">Type of MFA</td></tr>
          <tr><td class="p-2 border">destination</td><td class="p-2 border">string</td><td class="p-2 border">-</td><td class="p-2 border">Target phone/email</td></tr>
          <tr><td class="p-2 border">loading</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Loading state</td></tr>
          <tr><td class="p-2 border">disabled</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Disabled state</td></tr>
          <tr><td class="p-2 border">error</td><td class="p-2 border">string</td><td class="p-2 border">-</td><td class="p-2 border">Error message</td></tr>
          <tr><td class="p-2 border">resendDisabled</td><td class="p-2 border">boolean</td><td class="p-2 border">false</td><td class="p-2 border">Disables resend button</td></tr>
          <tr><td class="p-2 border">resendCooldown</td><td class="p-2 border">number</td><td class="p-2 border">-</td><td class="p-2 border">Seconds to wait</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CMfaChallengePanel } from '../../../lib/components/organisms/mfa-challenge-panel'

const handleVerify = (code: string) => alert(`Verified code: ${code}`)
const handleResend = () => alert('Resending code...')
const handleCancel = () => alert('Cancel clicked')
</script>
