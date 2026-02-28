<script setup>
import { computed } from 'vue'
import store from '../../stores/gitStore.js'

const props = defineProps({
  sha: String,
  x: Number,
  y: Number,
})

const emit = defineEmits(['close'])

const commit = computed(() => store.commits[props.sha])

const parentMessage = computed(() => {
  if (!commit.value?.parent) return null
  return store.commits[commit.value.parent]?.message || null
})
</script>

<template>
  <g v-if="commit" class="commit-tooltip">
    <foreignObject
      :x="x - 120"
      :y="y + 30"
      width="240"
      height="160"
    >
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        class="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 text-left"
        @click.stop
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Commit Details</span>
          <button
            class="text-gray-500 hover:text-white text-xs leading-none"
            @click="emit('close')"
          >
            ✕
          </button>
        </div>

        <div class="space-y-1.5 text-xs">
          <div>
            <span class="text-gray-500">SHA:</span>
            <code class="ml-1 font-mono text-white">{{ commit.sha }}</code>
          </div>
          <div>
            <span class="text-gray-500">Message:</span>
            <span class="ml-1 text-gray-300">{{ commit.message }}</span>
          </div>
          <div>
            <span class="text-gray-500">Branch:</span>
            <span class="ml-1 text-gray-300">{{ commit.branch }}</span>
          </div>
          <div>
            <span class="text-gray-500">Parent:</span>
            <code v-if="commit.parent" class="ml-1 font-mono text-gray-400">{{ commit.parent }}</code>
            <span v-else class="ml-1 text-gray-500 italic">none (root)</span>
          </div>
          <div v-if="commit.amended">
            <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              AMENDED
            </span>
          </div>
          <div v-if="commit.replacedBy">
            <span class="text-gray-500">Replaced by:</span>
            <code class="ml-1 font-mono text-amber-400">{{ commit.replacedBy }}</code>
          </div>
        </div>
      </div>
    </foreignObject>
  </g>
</template>
