<script setup>
defineProps({
  x: Number,
  y: Number,
  color: String,
})
</script>

<template>
  <g class="head-pointer">
    <!-- HEAD badge above the branch label -->
    <foreignObject
      :x="x - 28"
      :y="y - 68"
      width="56"
      height="20"
    >
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        class="text-[9px] font-mono font-bold text-center rounded bg-white/10 border border-white/20 text-white px-1 py-0.5"
      >
        HEAD
      </div>
    </foreignObject>

    <!-- Connector line -->
    <line
      :x1="x"
      :y1="y - 49"
      :x2="x"
      :y2="y - 47"
      stroke="white"
      stroke-width="1"
      opacity="0.3"
    />
  </g>
</template>
