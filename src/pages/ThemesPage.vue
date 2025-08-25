<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-text-primary mb-4">Themes</h1>
      <p class="text-text-secondary text-lg">
        Customize the appearance of CelestialUI components with our theme system.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CCard v-for="theme in themes" :key="theme.name" class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-text-primary">{{ theme.name }}</h3>
          <CButton
            variant="outline"
            size="sm"
            @click="applyTheme(theme)"
          >
            Apply Theme
          </CButton>
        </div>
        <p class="text-text-secondary text-sm mb-4">{{ theme.description }}</p>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-xs text-text-secondary">Primary:</span>
            <div class="w-4 h-4 rounded" :style="{ backgroundColor: theme.colors.primary }"></div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-text-secondary">Secondary:</span>
            <div class="w-4 h-4 rounded" :style="{ backgroundColor: theme.colors.secondary }"></div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-text-secondary">Accent:</span>
            <div class="w-4 h-4 rounded" :style="{ backgroundColor: theme.colors.accent }"></div>
          </div>
        </div>
      </CCard>
    </div>

    <div class="mt-8">
      <h2 class="text-2xl font-semibold text-text-primary mb-4">Custom Theme Builder</h2>
      <CCard class="p-6">
        <p class="text-text-secondary mb-4">
          Create your own custom theme by modifying the CSS custom properties.
        </p>
        <CButton variant="outline">
          Open Theme Builder
        </CButton>
      </CCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CButton, CCard } from '../../lib/index'

const themes = [
  {
    name: 'Starlit Night',
    description: 'Deep midnight blue with silver accents for a professional celestial look',
    colors: {
      primary: '#0B1426',
      secondary: '#8B9DC3',
      accent: '#C5D4E6'
    }
  },
  {
    name: 'Nebula Dream',
    description: 'Bold cosmic purple with vibrant magenta for striking visual impact',
    colors: {
      primary: '#2E1065',
      secondary: '#D741A7',
      accent: '#9B7EDE'
    }
  },
  {
    name: 'Celestial Ocean',
    description: 'Clean celestial blue with deep ocean teal for tranquility',
    colors: {
      primary: '#5398BE',
      secondary: '#2A9D8F',
      accent: '#AEE0F0'
    }
  },
  {
    name: 'Solar Flare',
    description: 'Warm gold with amber glow for a welcoming atmosphere',
    colors: {
      primary: '#F2CD5D',
      secondary: '#DEA54B',
      accent: '#FFE5B4'
    }
  }
]

const applyTheme = (theme: any) => {
  // This would integrate with the theme system
  console.log('Applying theme:', theme.name)
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
