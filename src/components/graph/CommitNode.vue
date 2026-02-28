<script setup>
defineProps({
  sha: String,
  x: Number,
  y: Number,
  color: String,
  isReplaced: Boolean,
  isAmended: Boolean,
  message: String,
})

const emit = defineEmits(['select'])
</script>

<template>
  <g
    class="commit-node cursor-pointer"
    :class="{ 'opacity-25': isReplaced }"
    @click="emit('select', sha)"
  >
    <!-- Hover glow ring -->
    <circle
      :cx="x"
      :cy="y"
      r="24"
      fill="none"
      :stroke="color"
      stroke-width="2"
      class="opacity-0 hover-glow transition-opacity duration-200"
    />

    <!-- Amended pulse ring -->
    <circle
      v-if="isAmended && !isReplaced"
      :cx="x"
      :cy="y"
      r="22"
      fill="none"
      :stroke="color"
      stroke-width="1.5"
      opacity="0.4"
      class="amended-ring"
    />

    <!-- Main circle -->
    <circle
      :cx="x"
      :cy="y"
      r="18"
      :fill="color"
      stroke="rgba(255,255,255,0.1)"
      stroke-width="1"
    />

    <!-- SHA label -->
    <text
      :x="x"
      :y="y + 1"
      text-anchor="middle"
      dominant-baseline="central"
      class="text-[10px] font-mono fill-gray-950 font-bold pointer-events-none select-none"
    >
      {{ sha.slice(0, 5) }}
    </text>

    <!-- "amended" badge -->
    <g v-if="isAmended && !isReplaced">
      <rect
        :x="x + 14"
        :y="y - 28"
        width="8"
        height="8"
        rx="2"
        fill="#f59e0b"
      />
    </g>
  </g>
</template>

<style scoped>
.commit-node:hover .hover-glow {
  opacity: 0.5;
}

.amended-ring {
  animation: pulse-ring 2s ease-in-out infinite;
}

@keyframes pulse-ring {
  0%, 100% { opacity: 0.2; r: 22; }
  50% { opacity: 0.5; r: 26; }
}
</style>
