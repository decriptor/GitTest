<script setup>
import { computed, ref, watch } from 'vue'
import store, { mainSHAs, currentBranch, currentBranchCommits } from '../../stores/gitStore.js'

const flashActive = ref(false)

const snapshotSHAs = computed(() => store.mainSnapshotSHAs)

const mainUnchanged = computed(() => {
  const current = mainSHAs.value
  const snapshot = snapshotSHAs.value
  if (current.length !== snapshot.length) return false
  return current.every((sha, i) => sha === snapshot[i])
})

const featureSHAs = computed(() => {
  if (currentBranch.value === 'main') return []
  return currentBranchCommits.value.map((c) => c.sha)
})

const operationCount = computed(() => store.operationHistory.length)

// Flash the panel whenever an operation happens
watch(operationCount, () => {
  flashActive.value = true
  setTimeout(() => { flashActive.value = false }, 600)
})
</script>

<template>
  <div
    class="rounded-xl bg-surface-secondary border border-gray-800 p-5 transition-all duration-300"
    :class="{ 'ring-2 ring-brand-green/50': flashActive && mainUnchanged }"
  >
    <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
      Proof: Branch Independence
    </h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Main column -->
      <div class="space-y-2">
        <div class="flex items-center gap-2 mb-3">
          <span class="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
          <span class="text-sm font-semibold text-brand-green">main</span>
          <span
            v-if="mainUnchanged"
            class="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
                   bg-green-500/15 text-brand-green border border-green-500/30"
          >
            ✓ Unchanged
          </span>
        </div>
        <div
          v-for="(sha, i) in mainSHAs"
          :key="'main-' + sha"
          class="flex items-center gap-2"
        >
          <code class="text-xs font-mono px-2 py-1 rounded bg-surface-tertiary text-brand-green">
            {{ sha }}
          </code>
          <span
            v-if="snapshotSHAs[i] === sha"
            class="text-green-400 text-[10px]"
          >
            ═ snapshot
          </span>
        </div>
      </div>

      <!-- Feature branch column -->
      <div class="space-y-2">
        <div class="flex items-center gap-2 mb-3">
          <span class="w-2.5 h-2.5 rounded-full bg-brand-amber"></span>
          <span class="text-sm font-semibold text-brand-amber">
            {{ currentBranch === 'main' ? '(select a feature branch)' : currentBranch }}
          </span>
        </div>

        <template v-if="featureSHAs.length > 0">
          <div
            v-for="sha in featureSHAs"
            :key="'feature-' + sha"
            class="flex items-center gap-2"
          >
            <code
              class="text-xs font-mono px-2 py-1 rounded bg-surface-tertiary"
              :class="snapshotSHAs.includes(sha) ? 'text-brand-green' : 'text-brand-amber'"
            >
              {{ sha }}
            </code>
            <span
              v-if="snapshotSHAs.includes(sha)"
              class="text-[10px] text-gray-500"
            >
              shared
            </span>
            <span v-else class="text-[10px] text-brand-amber">
              branch-only
            </span>
          </div>
        </template>
        <p v-else class="text-xs text-gray-500 italic">
          Create a branch to see the comparison
        </p>
      </div>
    </div>

    <!-- Proof verdict -->
    <div
      v-if="store.operationHistory.length > 0"
      class="mt-4 pt-4 border-t border-gray-800 text-center"
    >
      <p v-if="mainUnchanged" class="text-sm text-brand-green font-medium">
        After {{ store.operationHistory.length }} operation(s), main's SHAs are
        <strong>identical</strong> to the original snapshot.
      </p>
    </div>
  </div>
</template>
