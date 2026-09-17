<template>
  <div class="p-8 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">Dropdown Menu</h1>
    <p class="text-gray-600 mb-8">
      Displays a menu to the user—such as a set of actions or functions—triggered by a button.
    </p>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="p-6 border rounded-lg bg-gray-50 flex gap-4 flex-wrap pb-40">
        <CDropdownMenu :items="basicItems" @select="handleSelect">
          <template #trigger>
            <CButton>Click me</CButton>
          </template>
        </CDropdownMenu>
        
        <CDropdownMenu :items="complexItems" placement="bottom-end" trigger="hover">
          <template #trigger>
            <CButton variant="outline">Hover me (End)</CButton>
          </template>
        </CDropdownMenu>
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
          <tr><td class="p-2 border">items</td><td class="p-2 border">CDropdownItem[] | CDropdownItem[][]</td><td class="p-2 border">required</td><td class="p-2 border">Menu items, grouped if array of arrays</td></tr>
          <tr><td class="p-2 border">trigger</td><td class="p-2 border">'click' | 'hover'</td><td class="p-2 border">'click'</td><td class="p-2 border">How the menu is triggered</td></tr>
          <tr><td class="p-2 border">placement</td><td class="p-2 border">'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'</td><td class="p-2 border">'bottom-start'</td><td class="p-2 border">Dropdown position</td></tr>
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
          <tr><td class="p-2 border">select</td><td class="p-2 border">CDropdownItem</td><td class="p-2 border">Fired when an item is selected</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CDropdownMenu } from '../../../lib/components/molecules/dropdown-menu'
import { CButton } from '../../../lib/components/atoms/button'

const basicItems = [
  { id: 1, label: 'Profile' },
  { id: 2, label: 'Settings' },
  { id: 3, label: 'Logout' }
]

const complexItems = [
  [
    { id: 'profile', label: 'My Profile', icon: 'user' },
    { id: 'billing', label: 'Billing', icon: 'credit-card', shortcut: '⌘B' }
  ],
  [
    { id: 'github', label: 'GitHub', icon: 'github', disabled: true }
  ],
  [
    { id: 'logout', label: 'Log out', icon: 'log-out', shortcut: '⇧⌘Q' }
  ]
]

const handleSelect = (item: any) => {
  alert(`Selected: ${item.label}`)
}
</script>
