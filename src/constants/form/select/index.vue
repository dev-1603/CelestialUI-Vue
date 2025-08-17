<template>
  <div class="relative">
    <button @click="toggleDropdown"
      class="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      <slot name="selected-option">
        <span class="block truncate">{{ selectedOption ? selectedOption.label : 'Select an option' }}</span>
      </slot>
      <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <slot name="dropdown-icon">
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            aria-hidden="true">
            <path fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
              clip-rule="evenodd" />
          </svg>
        </slot>
      </span>
    </button>

    <div v-if="isOpen" class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
      <ul tabindex="-1" role="listbox"
        class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        <li v-for="option in options" :key="option.value" @click="selectOption(option)"
          :class="{ 'text-white bg-indigo-600': option.value === selectedOption?.value, 'text-gray-900': option.value !== selectedOption?.value }"
          class="cursor-default select-none relative py-2 pl-3 pr-9" role="option">
          <slot name="option" :option="option">
            <span
              :class="{ 'font-semibold': option.value === selectedOption?.value, 'font-normal': option.value !== selectedOption?.value }"
              class="block truncate">
              {{ option.label }}
            </span>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent, type PropType } from 'vue';

interface Option {
  value: string | number;
  label: string;
}

export default defineComponent({
  name: 'CUSelectBox',
  props: {
    options: {
      type: Array as PropType<Option[]>,
      required: true,
    },
    modelValue: {
      type: Object as PropType<Option | null>,
      default: null,
    },
  },
  setup(props, { emit }) {
    const isOpen = ref(false);
    const selectedOption = ref<Option | null>(props.modelValue);

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const selectOption = (option: Option) => {
      selectedOption.value = option;
      isOpen.value = false;
      emit('update:modelValue', option);
    };

    watch(() => props.modelValue, (newValue) => {
      selectedOption.value = newValue;
    });

    return {
      isOpen,
      selectedOption,
      toggleDropdown,
      selectOption,
    };
  },
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
