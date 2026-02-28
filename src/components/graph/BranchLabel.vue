<script setup>
defineProps({
  name: String,
  x: Number,
  y: Number,
  nodeX: Number,
  nodeY: Number,
  isOffset: Boolean,
  color: String,
  isHEAD: Boolean,
})
</script>

<template>
  <g class="branch-label">
    <!-- Connector line from offset label down to the actual commit node -->
    <line
      v-if="isOffset"
      :x1="x"
      :y1="y - 20"
      :x2="nodeX"
      :y2="nodeY - 18"
      :stroke="color"
      stroke-width="1"
      stroke-dasharray="3 2"
      opacity="0.35"
    />

    <foreignObject
      :x="x - 45"
      :y="y - 46"
      width="90"
      height="28"
    >
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        class="flex items-center justify-center gap-1 text-[11px] font-mono font-semibold rounded-md px-2 py-1 whitespace-nowrap"
        :style="{
          backgroundColor: color + '18',
          color: color,
          border: `1.5px solid ${color}55`,
          boxShadow: isHEAD ? `0 0 8px ${color}33` : 'none',
        }"
      >
        {{ name }}
      </div>
    </foreignObject>
  </g>
</template>

<style scoped>
.branch-label {
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
