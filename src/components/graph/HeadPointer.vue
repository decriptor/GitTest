<script setup>
defineProps({
  x: Number,
  y: Number,
  color: String,
})
</script>

<template>
  <g class="head-pointer">
    <!-- HEAD arrow pointing down to the commit -->
    <foreignObject
      :x="x - 28"
      :y="y - 70"
      width="56"
      height="24"
    >
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        class="text-[10px] font-mono font-bold text-center rounded bg-white/10 border border-white/20 text-white px-1 py-0.5"
      >
        HEAD
      </div>
    </foreignObject>

    <!-- Small connector line from HEAD badge to branch label -->
    <line
      :x1="x"
      :y1="y - 47"
      :x2="x"
      :y2="y - 46"
      stroke="white"
      stroke-width="1"
      opacity="0.3"
    />
  </g>
</template>
