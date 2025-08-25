<template>
  <div class="p-6">
    <div v-if="component" class="space-y-8">
      <!-- Header -->
      <div class="border-b border-border-base pb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-3xl font-bold text-text-primary mb-2">{{ component.name }}</h1>
            <p class="text-text-secondary text-lg">{{ component.description }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="bg-success-100 text-success-700 text-xs px-2 py-1 rounded-full font-semibold">
              ✓ Implemented
            </span>
            <CButton
              v-if="component.storybookPath"
              variant="outline"
              size="sm"
              right-icon="external-link"
              @click="openStorybook"
            >
              View in Storybook
            </CButton>
          </div>
        </div>

        <div class="flex items-center gap-4 text-sm text-text-secondary">
          <span>Category: {{ component.category }}</span>
          <span>•</span>
          <span>Status: {{ component.implemented ? 'Implemented' : 'Planned' }}</span>
        </div>
      </div>

      <!-- Props Section -->
      <div v-if="component.props && component.props.length > 0">
        <h2 class="text-2xl font-semibold text-text-primary mb-4">Props</h2>
        <CCard>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-background-secondary">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Prop
                  </th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Type
                  </th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Default
                  </th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-base">
                <tr v-for="prop in component.props" :key="prop" class="hover:bg-background-secondary">
                  <td class="px-4 py-3">
                    <code class="text-sm font-mono text-primary-600 bg-primary-50 px-2 py-1 rounded">
                      {{ prop }}
                    </code>
                  </td>
                  <td class="px-4 py-3 text-sm text-text-secondary">
                    <span class="text-text-primary">string | number | boolean</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-text-secondary">
                    <span class="text-text-muted">-</span>
                  </td>
                  <td class="px-4 py-3 text-sm text-text-secondary">
                    {{ getPropDescription(prop) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CCard>
      </div>

      <!-- Examples Section -->
      <div v-if="component.examples && component.examples.length > 0">
        <h2 class="text-2xl font-semibold text-text-primary mb-4">Examples</h2>
        <div class="space-y-6">
          <CCard v-for="example in component.examples" :key="example" class="p-6">
            <h3 class="text-lg font-semibold text-text-primary mb-4">{{ example }}</h3>
            <div class="bg-background-secondary rounded-lg p-4 mb-4">
              <p class="text-text-secondary text-sm">
                Example implementation for {{ example.toLowerCase() }} usage.
              </p>
            </div>
            <div class="bg-background-base border border-border-base rounded-lg p-4">
              <pre class="text-sm text-text-secondary overflow-x-auto"><code>&lt;{{ component.name }}
  // Example props for {{ example }}
/&gt;</code></pre>
            </div>
          </CCard>
        </div>
      </div>

      <!-- Usage Section -->
      <div>
        <h2 class="text-2xl font-semibold text-text-primary mb-4">Usage</h2>
        <CCard>
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-text-primary mb-2">Basic Usage</h3>
              <div class="bg-background-base border border-border-base rounded-lg p-4">
                <pre class="text-sm text-text-secondary overflow-x-auto"><code>&lt;template&gt;
  &lt;{{ component.name }}
    v-model="value"
    placeholder="Enter value"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import {{ component.name }} from '@/lib/components/ui/{{ component.name.toLowerCase() }}/{{ component.name }}.vue'

const value = ref('')
&lt;/script&gt;</code></pre>
              </div>
            </div>
          </div>
        </CCard>
      </div>

      <!-- Related Components -->
      <div>
        <h2 class="text-2xl font-semibold text-text-primary mb-4">Related Components</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CCard
            v-for="related in relatedComponents"
            :key="related.name"
            class="p-4 hover:shadow-md transition-shadow cursor-pointer"
            @click="$router.push(related.docPath)"
          >
            <div class="flex items-center gap-3">
              <span class="text-lg text-primary-500">
                <i class="fas fa-cube" />
              </span>
              <div>
                <h3 class="font-semibold text-text-primary">{{ related.name }}</h3>
                <p class="text-sm text-text-secondary">{{ related.description }}</p>
              </div>
            </div>
          </CCard>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-12">
      <h1 class="text-3xl font-bold text-text-primary mb-4">Component Not Found</h1>
      <p class="text-text-secondary mb-6">
        The component you're looking for doesn't exist or hasn't been implemented yet.
      </p>
      <CButton @click="$router.push('/')">
        Back to Components
      </CButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getComponentByName, getComponentsByCategory } from '../data/components'
import { CButton, CCard } from '../../lib/index'

const route = useRoute()
const router = useRouter()

const componentName = computed(() => route.params.componentName as string)
const component = computed(() => getComponentByName(componentName.value))

const relatedComponents = computed(() => {
  if (!component.value) return []

  const componentsByCategory = getComponentsByCategory()
  const categoryComponents = componentsByCategory[component.value.category] || []

  return categoryComponents
    .filter(c => c.name !== component.value?.name)
    .slice(0, 3)
})

const getPropDescription = (prop: string) => {
  const descriptions: Record<string, string> = {
    modelValue: 'The v-model binding value',
    placeholder: 'Placeholder text for the input',
    disabled: 'Whether the component is disabled',
    size: 'Size variant of the component',
    variant: 'Visual variant of the component',
    label: 'Label text for the component',
    error: 'Whether to show error state',
    'error-text': 'Error message text',
    'helper-text': 'Helper text below the component',
    type: 'Input type (text, email, password, etc.)',
    clearable: 'Whether the input can be cleared',
    'prefix-icon': 'Icon to show before the input',
    'suffix-icon': 'Icon to show after the input',
    loading: 'Whether to show loading state',
    icon: 'Icon name to display',
    color: 'Color variant',
    weight: 'Font weight',
    align: 'Text alignment',
    width: 'Width of the component',
    height: 'Height of the component',
    max: 'Maximum value',
    min: 'Minimum value',
    step: 'Step increment',
    rows: 'Number of rows for textarea',
    'max-length': 'Maximum character length',
    resize: 'Resize behavior',
    multiple: 'Whether multiple selection is allowed',
    searchable: 'Whether the component is searchable',
    options: 'Available options for selection',
    title: 'Title text',
    subtitle: 'Subtitle text',
    elevation: 'Elevation level',
    hoverable: 'Whether the component is hoverable',
    clickable: 'Whether the component is clickable',
    persistent: 'Whether the modal is persistent',
    'max-width': 'Maximum width',
    position: 'Position of the component',
    overlay: 'Whether to show overlay',
    width: 'Width of the component',
    'max-items': 'Maximum number of items to show',
    separator: 'Separator character',
    orientation: 'Orientation of the component',
    spacing: 'Spacing between items',
    animation: 'Animation type',
    thickness: 'Thickness of the component',
    shape: 'Shape variant',
    fallback: 'Fallback content',
    children: 'Child content',
    indeterminate: 'Indeterminate state',
    dot: 'Whether to show a dot indicator',
    marks: 'Mark indicators',
    level: 'Heading level (1-6)',
    value: 'Current value',
    max: 'Maximum value',
    format: 'Format string',
    presets: 'Preset options',
    showToggle: 'Whether to show toggle',
    'strength-meter': 'Whether to show strength meter',
    length: 'Length of the input',
    mask: 'Input mask',
    legend: 'Legend text',
    'max-selected': 'Maximum number of selected items',
    suggestions: 'Autocomplete suggestions',
    debounce: 'Debounce delay',
    autoplay: 'Whether to autoplay',
    indicators: 'Whether to show indicators',
    controls: 'Whether to show controls',
    sortable: 'Whether the table is sortable',
    filterable: 'Whether the table is filterable',
    striped: 'Whether to show striped rows',
    columns: 'Number of columns',
    gap: 'Gap between items',
    areas: 'Grid areas',
    lightbox: 'Whether to show lightbox',
    'has-more': 'Whether there are more items',
    'on-load-more': 'Load more callback',
    threshold: 'Scroll threshold',
    'item-height': 'Height of each item',
    overscan: 'Overscan count',
    commands: 'Available commands',
    shortcut: 'Keyboard shortcut',
    nodes: 'Graph nodes',
    edges: 'Graph edges',
    layout: 'Layout algorithm',
    interactive: 'Whether the component is interactive',
    categories: 'Available categories',
    expanded: 'Expanded state',
    selectable: 'Whether items are selectable',
    files: 'File list',
    view: 'View mode',
    'sort-by': 'Sort field',
    data: 'Chart data',
    options: 'Chart options',
    responsive: 'Whether the chart is responsive',
    cards: 'Card data',
    draggable: 'Whether cards are draggable',
    events: 'Timeline events',
    connector: 'Connector style',
    language: 'Programming language',
    theme: 'Editor theme',
    extensions: 'Editor extensions',
    view: 'Calendar view',
    events: 'Calendar events',
    preview: 'Whether to show preview',
    toolbar: 'Whether to show toolbar',
    formats: 'Available formats'
  }

  return descriptions[prop] || 'Component property'
}

const openStorybook = () => {
  if (component.value?.storybookPath) {
    window.open(`http://localhost:6006${component.value.storybookPath}`, '_blank')
  }
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
