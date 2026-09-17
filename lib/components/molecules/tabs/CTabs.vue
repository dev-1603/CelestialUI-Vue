<template>
  <div :class="wrapperClasses" :dir="rtl ? 'rtl' : undefined">
    <!-- Tab List -->
    <div 
      :class="tabListClasses" 
      role="tablist"
      :aria-orientation="orientation"
    >
      <button
        v-for="(item, index) in items"
        :key="item.id"
        :id="`tab-${item.id}`"
        :class="getTabClasses(item, activeTab === item.id)"
        role="tab"
        :aria-selected="activeTab === item.id"
        :aria-controls="`panel-${item.id}`"
        :disabled="item.disabled"
        :tabindex="activeTab === item.id ? 0 : -1"
        @click="selectTab(item)"
        @keydown="handleKeyDown($event, index)"
      >
        <slot name="tab" :item="item" :isActive="activeTab === item.id">
          <CIcon v-if="item.icon" :name="item.icon" size="sm" />
          <span>{{ item.label }}</span>
        </slot>
      </button>
    </div>

    <!-- Tab Panels (we render all and hide inactive ones using v-show for DOM persistence) -->
    <div class="cui-tab-panels">
      <div
        v-for="item in items"
        :key="`panel-${item.id}`"
        v-show="activeTab === item.id"
        :id="`panel-${item.id}`"
        class="cui-tab-panel"
        role="tabpanel"
        :aria-labelledby="`tab-${item.id}`"
        :tabindex="activeTab === item.id ? 0 : undefined"
      >
        <slot :name="`panel-${item.id}`" :item="item">
          <!-- Default fallback if specific panel slot is missing -->
          <slot name="panel" :item="item" :isActive="activeTab === item.id"></slot>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTabs } from './composables/useTabs'
import { useTabsStyles } from './composables/useTabsStyles'
import type { CTabsProps, CTabsEmits } from './CTabs.types'
import CIcon from '../../atoms/icon/CIcon.vue'
import './styles/CTabs.css'

defineOptions({ name: 'CTabs' })

const props = withDefaults(defineProps<CTabsProps>(), {
  variant: 'line',
  orientation: 'horizontal',
  rtl: false,
  scrollable: false
})

const emit = defineEmits<CTabsEmits>()

const { activeTab, selectTab, handleKeyDown } = useTabs(props, emit)
const { wrapperClasses, tabListClasses, getTabClasses } = useTabsStyles(props)
</script>
