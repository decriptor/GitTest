<script setup>
import ActionButton from './ActionButton.vue'
import BranchSelector from './BranchSelector.vue'
import { computed } from 'vue'
import store, { currentBranch } from '../../stores/gitStore.js'

const emit = defineEmits([
  'create-commit',
  'create-branch',
  'checkout',
  'amend',
  'rebase',
  'reset',
])

const isOnMain = computed(() => currentBranch.value === 'main')
const hasBranches = computed(() => Object.keys(store.branches).length > 1)
</script>

<template>
  <div class="rounded-xl bg-surface-secondary border border-gray-800 p-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider">Controls</h3>
      <BranchSelector @checkout="(name) => emit('checkout', name)" />
    </div>

    <div class="flex flex-wrap gap-2">
      <ActionButton
        label="Create Commit"
        icon="+"
        variant="green"
        @click="emit('create-commit')"
      />
      <ActionButton
        label="Create Branch"
        icon="⑂"
        variant="blue"
        @click="emit('create-branch')"
      />
      <ActionButton
        label="Amend Last Commit"
        icon="✎"
        variant="amber"
        :disabled="isOnMain"
        @click="emit('amend')"
      />
      <ActionButton
        label="Rebase onto Main"
        icon="↩"
        variant="amber"
        :disabled="isOnMain || !hasBranches"
        @click="emit('rebase')"
      />
      <ActionButton
        label="Reset All"
        icon="↺"
        variant="red"
        @click="emit('reset')"
      />
    </div>

    <p v-if="isOnMain" class="mt-3 text-xs text-gray-500">
      Switch to a feature branch to use Amend and Rebase.
    </p>
  </div>
</template>
