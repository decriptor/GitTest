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

    <!-- "amended/new" badge -->
    <g v-if="isAmended && !isReplaced">
      <rect
        :x="x + 12"
        :y="y - 30"
        width="16"
        height="14"
        rx="3"
        fill="#f59e0b"
      />
      <text
        :x="x + 20"
        :y="y - 22"
        text-anchor="middle"
        dominant-baseline="central"
        class="text-[8px] fill-gray-950 font-bold pointer-events-none"
      >
        ★
      </text>
    </g>

    <!-- Strikethrough for replaced commits -->
    <line
      v-if="isReplaced"
      :x1="x - 20"
      :y1="y"
      :x2="x + 20"
      :y2="y"
      stroke="rgba(255,255,255,0.4)"
      stroke-width="2"
    />
  </g>
</template>

<style scoped>
.commit-node {
  animation: spring-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.commit-node:hover .hover-glow {
  opacity: 0.5;
}

.amended-ring {
  animation: pulse-ring 2s ease-in-out infinite;
}

@keyframes spring-in {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse-ring {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.5; }
}
</style>
