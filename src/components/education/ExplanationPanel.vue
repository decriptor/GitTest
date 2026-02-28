<script setup>
import { computed } from 'vue'
import store from '../../stores/gitStore.js'

const explanations = {
  commit: {
    title: 'New Commit Created',
    text: 'A commit is a snapshot of your project. Each commit has a unique SHA hash derived from its content and parent. Creating a commit on a feature branch adds to that branch only — main\'s history is untouched.',
    concept: 'Commits are immutable snapshots. A branch pointer simply moves forward to the new commit.',
  },
  branch: {
    title: 'Branch Created',
    text: 'A branch is just a pointer to a commit — literally a 41-byte file containing a SHA hash. Creating a branch doesn\'t copy any commits. Both branches point to the same commit until one moves forward.',
    concept: 'Branches are lightweight pointers, not copies. That\'s why they\'re instant to create.',
  },
  checkout: {
    title: 'Switched Branches',
    text: 'Checking out a branch moves HEAD to point at that branch. HEAD is Git\'s way of knowing "where you are right now." Your working directory updates to match that branch\'s latest commit.',
    concept: 'HEAD → branch → commit. It\'s pointers all the way down.',
  },
  amend: {
    title: 'Commit Amended',
    text: 'Amending replaces the last commit with a new one that has a different SHA. The old commit still exists in the object store (shown faded) but the branch pointer now points to the new commit. Notice: main\'s commits didn\'t change!',
    concept: 'Amending creates a NEW commit with a NEW SHA. It doesn\'t modify the old one — commits are immutable.',
  },
  rebase: {
    title: 'Branch Rebased',
    text: 'Rebase replays your branch\'s unique commits on top of the target branch, creating entirely new commits with new SHAs. The old commits are orphaned (faded). Main\'s commits remain exactly the same.',
    concept: 'Rebase rewrites YOUR branch\'s history by creating new commits. The target branch (main) is never modified.',
  },
  reset: {
    title: 'Everything Reset',
    text: 'All branches and commits restored to the initial state. Ready to explore again!',
    concept: 'This simulates starting fresh. In real Git, you\'d use git reset or re-clone.',
  },
  error: {
    title: 'Operation Not Allowed',
    text: '',
    concept: '',
  },
}

const lastOp = computed(() => store.lastOperation)

const explanation = computed(() => {
  if (!lastOp.value) return null
  const exp = explanations[lastOp.value.type]
  if (!exp) return null

  // For errors, use the error message
  if (lastOp.value.type === 'error') {
    return {
      title: 'Operation Not Allowed',
      text: lastOp.value.details?.message || 'Something went wrong.',
      concept: '',
    }
  }

  return exp
})
</script>

<template>
  <div
    v-if="explanation"
    class="rounded-xl bg-surface-secondary border border-gray-800 p-5"
  >
    <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
      What Just Happened
    </h3>
    <h4 class="text-lg font-semibold text-white mb-2">
      {{ explanation.title }}
    </h4>
    <p class="text-sm text-gray-400 leading-relaxed">
      {{ explanation.text }}
    </p>

    <div
      v-if="explanation.concept"
      class="mt-3 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20"
    >
      <p class="text-xs text-blue-400">
        <strong class="text-blue-300">Key concept:</strong>
        {{ explanation.concept }}
      </p>
    </div>

    <!-- Operation details -->
    <div v-if="lastOp?.details" class="mt-3 text-xs text-gray-500 font-mono">
      <template v-if="lastOp.type === 'commit'">
        SHA: {{ lastOp.details.sha }} · Branch: {{ lastOp.details.branch }}
      </template>
      <template v-else-if="lastOp.type === 'branch'">
        New branch: {{ lastOp.details.name }} · From: {{ lastOp.details.from?.slice(0, 7) }}
      </template>
      <template v-else-if="lastOp.type === 'amend'">
        Old: {{ lastOp.details.oldSha }} → New: {{ lastOp.details.newSha }}
      </template>
      <template v-else-if="lastOp.type === 'rebase'">
        Rebased {{ lastOp.details.rebasedSHAs?.length }} commit(s) onto {{ lastOp.details.onto }}
      </template>
    </div>
  </div>

  <div
    v-else
    class="rounded-xl bg-surface-secondary border border-gray-800 border-dashed p-5 text-center"
  >
    <p class="text-sm text-gray-500">
      Perform an operation above to see an explanation here.
    </p>
  </div>
</template>
