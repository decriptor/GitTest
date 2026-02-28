<script setup>
import { computed } from 'vue'

const props = defineProps({
  x: Number,
  y: Number,
  branches: Array, // [{ name, color, isHEAD }]
})

const hasHEAD = computed(() => props.branches.some((b) => b.isHEAD))
const bubbleHeight = computed(() => 4 + props.branches.length * 22)
const bubbleWidth = 100
</script>

<template>
  <g class="branch-label-group">
    <!-- Connector line from bubble to commit node -->
    <line
      :x1="x"
      :y1="y - 20"
      :x2="x"
      :y2="y - bubbleHeight - 6"
      stroke="white"
      stroke-width="1"
      opacity="0.15"
    />

    <!-- Bubble container -->
    <foreignObject
      :x="x - bubbleWidth / 2"
      :y="y - bubbleHeight - 24"
      :width="bubbleWidth"
      :height="bubbleHeight + 4"
    >
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        class="rounded-lg border overflow-hidden"
        :style="{
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          borderColor: hasHEAD ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
          boxShadow: hasHEAD ? '0 0 10px rgba(255,255,255,0.05)' : 'none',
        }"
      >
        <div
          v-for="branch in branches"
          :key="branch.name"
          class="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-semibold whitespace-nowrap"
          :style="{ color: branch.color }"
        >
          <span
            class="w-1.5 h-1.5 rounded-full flex-shrink-0"
            :style="{ backgroundColor: branch.color }"
          ></span>
          <span class="truncate">{{ branch.name }}</span>
          <span
            v-if="branch.isHEAD"
            class="ml-auto text-[8px] font-bold opacity-60 flex-shrink-0"
          >
            HEAD
          </span>
        </div>
      </div>
    </foreignObject>
  </g>
</template>

<style scoped>
.branch-label-group {
  animation: slide-down 0.3s ease-out forwards;
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
