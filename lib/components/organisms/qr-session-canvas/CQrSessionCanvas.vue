<template>
  <div class="cui-qr-canvas">
    <div class="cui-qr-canvas-display" aria-live="polite">
      <!-- QR Code -->
      <QrcodeVue 
        v-if="isQrVisible && qrData" 
        :value="qrData"
        :size="250"
        level="M"
        render-as="svg"
        class="cui-qr-canvas-image" 
      />
      
      <!-- Overlay for loading, error, expired, or success -->
      <div v-if="!isQrVisible || status === 'scanned' || status === 'loading'" class="cui-qr-canvas-overlay">
        <CIcon 
          v-if="overlayIcon" 
          :name="overlayIcon" 
          size="lg" 
          :class="`cui-qr-canvas-icon-${status}`" 
        />
        <!-- Using CIcon with a generic loader if loading, or just text -->
        <CIcon v-if="status === 'loading'" name="loader" size="lg" class="animate-spin text-gray-400" />
        
        <p class="cui-qr-canvas-message">{{ statusMessage }}</p>
      </div>
    </div>
    
    <div v-if="expiresIn && status === 'active'" class="text-sm text-gray-500">
      Expires in {{ expiresIn }}s
    </div>

    <div class="cui-qr-canvas-actions">
      <CButton 
        v-if="status === 'expired' || status === 'error'"
        class="w-full justify-center" 
        :loading="loading" 
        :disabled="disabled"
        @click="handleRefresh"
      >
        Refresh QR Code
      </CButton>
      
      <CButton 
        class="w-full justify-center" 
        variant="ghost" 
        :disabled="disabled || loading"
        @click="handleCancel"
      >
        Cancel
      </CButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQrSessionCanvas } from './composables/useQrSessionCanvas'
import type { CQrSessionCanvasProps, CQrSessionCanvasEmits } from './CQrSessionCanvas.types'
import { CButton } from '../../atoms/button'
import CIcon from '../../atoms/icon/CIcon.vue'
import QrcodeVue from 'qrcode.vue'
import './styles/CQrSessionCanvas.css'

defineOptions({ name: 'CQrSessionCanvas' })

const props = withDefaults(defineProps<CQrSessionCanvasProps>(), {
  status: 'active',
  loading: false,
  disabled: false
})

const emit = defineEmits<CQrSessionCanvasEmits>()

const { 
  isQrVisible, 
  statusMessage, 
  overlayIcon, 
  handleRefresh, 
  handleCancel 
} = useQrSessionCanvas(props, emit)
</script>
