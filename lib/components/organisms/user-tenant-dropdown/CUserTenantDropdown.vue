<template>
  <div class="cui-user-tenant-wrapper">
    <CDropdownMenu
      :items="dropdownItems"
      :trigger="trigger"
      :disabled="disabled || loading"
      placement="bottom-end"
      @select="handleSelect"
    >
      <template #trigger>
        <div class="cui-user-tenant-trigger" :class="{ 'cui-user-tenant-trigger--disabled': disabled || loading }">
          <CAvatar 
            :name="user.name" 
            :src="user.avatar" 
            size="sm" 
            :online="true" 
            :alt="user.name"
          />
          <div class="cui-user-tenant-info">
            <span class="cui-user-tenant-name">{{ user.name }}</span>
            <span v-if="currentTenant" class="cui-user-tenant-tenant-name">{{ currentTenant.name }}</span>
          </div>
          <CIcon name="chevron-down" size="sm" class="text-gray-400" />
        </div>
      </template>

      <template #item="{ item }">
        <div v-if="item.id === 'user-profile-header'" class="cui-user-tenant-header">
          <span class="cui-user-tenant-header-name">{{ user.name }}</span>
          <span class="cui-user-tenant-header-email">{{ user.email }}</span>
        </div>
        <!-- Default rendering for other items -->
        <template v-else>
          <span class="cui-dropdown-item-content">
            <CIcon v-if="item.icon" :name="item.icon" size="sm" />
            <span :class="{'ml-6': !item.icon && item.id.toString().startsWith('tenant_')}">{{ item.label }}</span>
          </span>
          <span v-if="item.shortcut" class="cui-dropdown-item-shortcut">{{ item.shortcut }}</span>
        </template>
      </template>
    </CDropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { useUserTenantDropdown } from './composables/useUserTenantDropdown'
import type { CUserTenantDropdownProps, CUserTenantDropdownEmits } from './CUserTenantDropdown.types'
import { CDropdownMenu } from '../../molecules/dropdown-menu'
import { CAvatar } from '../../atoms/avatar'
import CIcon from '../../atoms/icon/CIcon.vue'
import './styles/CUserTenantDropdown.css'

defineOptions({ name: 'CUserTenantDropdown' })

const props = withDefaults(defineProps<CUserTenantDropdownProps>(), {
  loading: false,
  disabled: false,
  trigger: 'click'
})

const emit = defineEmits<CUserTenantDropdownEmits>()

const { currentTenant, dropdownItems, handleSelect } = useUserTenantDropdown(props, emit)
</script>
