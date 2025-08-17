<template>
  <Teleport to="body">
    <div
      v-for="position in positions"
      :key="position"
      :class="getPositionClasses(position)"
    >
      <TransitionGroup name="cui-toast-list" tag="div">
        <CToast
          v-for="toast in getToastsByPosition(position)"
          :key="toast.id"
          v-bind="toast"
          :visible="toast.visible"
          @close="remove(toast.id)"
          @action="handleToastAction(toast)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToastContainer } from '../../../composables/useToast'
import CToast from './CToast.vue'

const { positions, getPositionClasses, getToastsByPosition, remove } = useToastContainer()

const handleToastAction = (toast: any) => {
  if (toast.action?.handler) {
    toast.action.handler()
  }
}
</script>

<style scoped>
/* Toast list transitions */
.cui-toast-list-enter-active,
.cui-toast-list-leave-active {
  transition: all 0.3s ease;
}

.cui-toast-list-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.cui-toast-list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.cui-toast-list-move {
  transition: transform 0.3s ease;
}

/* Position-specific enter animations */
.cui-toast-container--top-left .cui-toast-list-enter-from,
.cui-toast-container--bottom-left .cui-toast-list-enter-from {
  transform: translateX(-100%);
}

.cui-toast-container--top-center .cui-toast-list-enter-from,
.cui-toast-container--bottom-center .cui-toast-list-enter-from {
  transform: translateY(-100%);
}

.cui-toast-container--bottom-center .cui-toast-list-enter-from {
  transform: translateY(100%);
}

/* Position-specific leave animations */
.cui-toast-container--top-left .cui-toast-list-leave-to,
.cui-toast-container--bottom-left .cui-toast-list-leave-to {
  transform: translateX(-100%);
}

.cui-toast-container--top-center .cui-toast-list-leave-to {
  transform: translateY(-100%);
}

.cui-toast-container--bottom-center .cui-toast-list-leave-to {
  transform: translateY(100%);
}
</style>
