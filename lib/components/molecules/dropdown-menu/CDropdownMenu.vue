<template>
  <div 
    :class="wrapperClasses"
    @mouseenter="trigger === 'hover' ? open() : undefined"
    @mouseleave="trigger === 'hover' ? close() : undefined"
  >
    <!-- Trigger -->
    <div 
      ref="triggerRef"
      class="cui-dropdown-trigger"
      role="button"
      tabindex="0"
      aria-haspopup="menu"
      :aria-expanded="isOpen"
      @click="trigger === 'click' ? toggle() : undefined"
      @keydown.enter="trigger === 'click' ? toggle() : undefined"
      @keydown.space.prevent="trigger === 'click' ? toggle() : undefined"
    >
      <slot name="trigger"></slot>
    </div>

    <!-- Menu -->
    <Transition name="cui-dropdown-fade">
      <div 
        v-if="isOpen" 
        ref="menuRef"
        :class="menuClasses"
        role="menu"
      >
        <template v-for="(group, groupIndex) in normalizedItems" :key="'group-' + groupIndex">
          <div v-if="groupIndex > 0" class="cui-dropdown-item--divider" role="separator"></div>
          
          <template v-for="item in group" :key="item.id">
            <div v-if="item.divider" class="cui-dropdown-item--divider" role="separator"></div>
            <button
              v-else
              :class="getItemClasses(item)"
              role="menuitem"
              :aria-disabled="item.disabled"
              :disabled="item.disabled"
              @click="select(item)"
            >
              <slot name="item" :item="item">
                <span class="cui-dropdown-item-content">
                  <CIcon v-if="item.icon" :name="item.icon" size="sm" />
                  <span>{{ item.label }}</span>
                </span>
                <span v-if="item.shortcut" class="cui-dropdown-item-shortcut">{{ item.shortcut }}</span>
              </slot>
            </button>
          </template>
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDropdownMenu } from './composables/useDropdownMenu'
import { useDropdownMenuStyles } from './composables/useDropdownMenuStyles'
import type { CDropdownMenuProps, CDropdownMenuEmits, CDropdownItem } from './CDropdownMenu.types'
import CIcon from '../../atoms/icon/CIcon.vue'
import './styles/CDropdownMenu.css'

defineOptions({ name: 'CDropdownMenu' })

const props = withDefaults(defineProps<CDropdownMenuProps>(), {
  trigger: 'click',
  placement: 'bottom-start',
  disabled: false
})

const emit = defineEmits<CDropdownMenuEmits>()

const { 
  isOpen, 
  menuRef, 
  triggerRef, 
  toggle, 
  open, 
  close, 
  select 
} = useDropdownMenu(props, emit)

const { wrapperClasses, menuClasses, getItemClasses } = useDropdownMenuStyles(props)

// Normalize items to array of arrays for grouping
const normalizedItems = computed(() => {
  if (!props.items || props.items.length === 0) return []
  if (Array.isArray(props.items[0])) {
    return props.items as CDropdownItem[][]
  }
  return [props.items as CDropdownItem[]]
})
</script>
