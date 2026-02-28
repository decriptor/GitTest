<script setup>
import { computed } from 'vue'
import store, { branchNames, currentBranch } from '../../stores/gitStore.js'

const emit = defineEmits(['checkout'])

const branches = computed(() => branchNames.value)
const current = computed(() => currentBranch.value)
</script>

<template>
  <div class="flex items-center gap-2">
    <label class="text-xs text-gray-500 uppercase tracking-wider font-medium">Branch:</label>
    <select
      :value="current"
      class="bg-surface-tertiary text-white text-sm rounded-lg border border-gray-700
             px-3 py-1.5 focus:outline-none focus:border-brand-green cursor-pointer"
      @change="emit('checkout', $event.target.value)"
    >
      <option
        v-for="name in branches"
        :key="name"
        :value="name"
      >
        {{ name }}{{ name === current ? ' (HEAD)' : '' }}
      </option>
    </select>
  </div>
</template>
