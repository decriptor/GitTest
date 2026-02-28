<script setup>
import { computed, ref } from 'vue'
import store, { allVisibleCommits } from '../../stores/gitStore.js'
import { computeLayout } from '../../utils/graphLayout.js'
import CommitNode from './CommitNode.vue'

const selectedCommit = ref(null)

function handleSelectCommit(sha) {
  selectedCommit.value = selectedCommit.value === sha ? null : sha
}

const layout = computed(() =>
  computeLayout(allVisibleCommits.value, store.branches, store.HEAD)
)
</script>

<template>
  <div class="w-full overflow-x-auto rounded-xl bg-surface-secondary border border-gray-800">
    <svg
      :viewBox="`0 0 ${layout.width} ${layout.height}`"
      :width="layout.width"
      :height="layout.height"
      class="min-w-full"
      role="img"
      aria-label="Git commit graph visualization"
    >
      <!-- Connections will be added in Commit 10 -->
      <g class="connections">
        <line
          v-for="conn in layout.connections"
          :key="conn.id"
          :x1="conn.fromX"
          :y1="conn.fromY"
          :x2="conn.toX"
          :y2="conn.toY"
          :stroke="conn.color"
          stroke-width="2"
          :opacity="conn.isReplaced ? 0.25 : 0.6"
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

      <!-- Branch labels placeholder — will be replaced in Commit 11 -->
      <g class="labels">
        <g v-for="label in layout.branchLabels" :key="label.name">
          <foreignObject
            :x="label.x - 40"
            :y="label.y - 42"
            width="80"
            height="24"
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              class="text-[11px] font-mono font-semibold text-center rounded px-1 py-0.5 truncate"
              :style="{ backgroundColor: label.color + '22', color: label.color, border: `1px solid ${label.color}44` }"
            >
              {{ label.name }}
            </div>
          </foreignObject>
        </g>
      </g>
    </svg>
  </div>
</template>
