<script setup>
import { computed, ref } from 'vue'
import store, { allVisibleCommits } from '../../stores/gitStore.js'
import { computeLayout } from '../../utils/graphLayout.js'
import CommitNode from './CommitNode.vue'
import CommitConnection from './CommitConnection.vue'
import BranchLabel from './BranchLabel.vue'
import CommitTooltip from './CommitTooltip.vue'

const selectedCommit = ref(null)

function handleSelectCommit(sha) {
  selectedCommit.value = selectedCommit.value === sha ? null : sha
}

const layout = computed(() =>
  computeLayout(allVisibleCommits.value, store.branches, store.HEAD)
)

const selectedNode = computed(() => {
  if (!selectedCommit.value) return null
  return layout.value.nodes.find((n) => n.sha === selectedCommit.value)
})

// Expand viewBox height when tooltip is open to prevent clipping
const viewHeight = computed(() => {
  const base = layout.value.height
  if (selectedNode.value) return Math.max(base, selectedNode.value.y + 200)
  return base
})
</script>

<template>
  <div class="w-full rounded-xl bg-surface-secondary border border-gray-800 p-4 overflow-hidden">
    <div class="w-full overflow-x-auto">
      <svg
        :viewBox="`0 0 ${layout.width} ${viewHeight}`"
        :style="{ minWidth: layout.width + 'px', height: viewHeight + 'px' }"
        class="w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Git commit graph visualization"
      >
        <!-- Curved connections between commits -->
        <g class="connections">
          <CommitConnection
            v-for="conn in layout.connections"
            :key="conn.id"
            :from-x="conn.fromX"
            :from-y="conn.fromY"
            :to-x="conn.toX"
            :to-y="conn.toY"
            :color="conn.color"
            :is-replaced="conn.isReplaced"
          />
        </g>

        <!-- Commit nodes -->
        <g class="nodes">
          <CommitNode
            v-for="node in layout.nodes"
            :key="node.sha"
            :sha="node.sha"
            :x="node.x"
            :y="node.y"
            :color="node.color"
            :is-replaced="node.isReplaced"
            :is-amended="node.isAmended"
            :message="node.message"
            @select="handleSelectCommit"
          />
        </g>

        <!-- Branch label bubbles (grouped per commit) -->
        <g class="labels">
          <BranchLabel
            v-for="group in layout.branchLabelGroups"
            :key="group.sha"
            :x="group.x"
            :y="group.y"
            :branches="group.branches"
          />
        </g>

        <!-- Tooltip for selected commit -->
        <CommitTooltip
          v-if="selectedNode"
          :sha="selectedNode.sha"
          :x="selectedNode.x"
          :y="selectedNode.y"
          @close="selectedCommit = null"
        />
      </svg>
    </div>
  </div>
</template>
