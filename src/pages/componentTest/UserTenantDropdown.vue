<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">User Tenant Dropdown</h1>
    <p class="text-gray-600 mb-8">
      A combined user profile and tenant switcher component, commonly placed in application headers.
    </p>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex justify-end">
        <CUserTenantDropdown 
          :user="mockUser" 
          :tenants="mockTenants" 
          current-tenant-id="t1"
          @logout="handleLogout"
          @settings="handleSettings"
          @select-tenant="handleSelectTenant"
        />
      </div>
    </section>

    <!-- Disabled State -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Disabled State</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex justify-end">
        <CUserTenantDropdown 
          :user="mockUser" 
          :tenants="mockTenants" 
          current-tenant-id="t1"
          disabled
        />
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
          <tr><td class="p-2 border">user</td><td class="p-2 border">UserProfile</td><td class="p-2 border">required</td><td class="p-2 border">Current user data</td></tr>
          <tr><td class="p-2 border">tenants</td><td class="p-2 border">Tenant[]</td><td class="p-2 border">required</td><td class="p-2 border">List of available tenants</td></tr>
          <tr><td class="p-2 border">currentTenantId</td><td class="p-2 border">string</td><td class="p-2 border">-</td><td class="p-2 border">Active tenant ID</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CUserTenantDropdown } from '../../../lib/components/organisms/user-tenant-dropdown'

const mockUser = {
  id: 'usr1',
  name: 'Jane Doe',
  email: 'jane.doe@example.com'
}

const mockTenants = [
  { id: 't1', name: 'Acme Corp' },
  { id: 't2', name: 'Globex Inc' }
]

const handleLogout = () => alert('Logout clicked')
const handleSettings = () => alert('Settings clicked')
const handleSelectTenant = (t: any) => alert(`Selected tenant: ${t.name}`)
</script>
