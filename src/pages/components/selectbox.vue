<template>
  <div>
    <h1>CUSelect Demo</h1>

    <h2>Single Select</h2>
    <CUSelect v-model="singleSelect" :options="options" placeholder="Select an option" />

    <h2>Multi Select</h2>
    <CUSelect v-model="multiSelect" :options="options" placeholder="Select multiple options" multiple />

    <h2>Disabled Select</h2>
    <CUSelect v-model="disabledSelect" :options="options" placeholder="Disabled select" disabled />

    <h2>Custom Label Select</h2>
    <CUSelect v-model="customLabelSelect" :options="customOptions" label="name" placeholder="Select an option" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const singleSelect = ref<string | null>(null);
const multiSelect = ref<string[]>([]);
const disabledSelect = ref<string | null>(null);
const customLabelSelect = ref<string | null>(null);

const options = [
  { value: 'option1', text: 'Option 1' },
  { value: 'option2', text: 'Option 2' },
  { value: 'option3', text: 'Option 3' }
];

const customOptions = [
  { id: 'custom1', name: 'Custom Option 1' },
  { id: 'custom2', name: 'Custom Option 2' },
  { id: 'custom3', name: 'Custom Option 3' }
];
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}

h2 {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
