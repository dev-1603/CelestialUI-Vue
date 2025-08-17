<template>
    <div>
        <h1>Component Test</h1>
        <CInput v-model="inputValue" placeholder="Enter text here" input-class="border rounded px-5" />
    </div>
</template>

<script setup lang="ts">
import CInput from '../constants/form/input/CUInput.vue'
import { ref } from 'vue';
const inputValue = ref('')

</script>

<style></style>
