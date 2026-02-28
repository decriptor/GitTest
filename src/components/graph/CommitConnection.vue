<script setup>
import { computed } from 'vue'

const props = defineProps({
  fromX: Number,
  fromY: Number,
  toX: Number,
  toY: Number,
  color: String,
  isReplaced: Boolean,
})

const pathD = computed(() => {
  const { fromX, fromY, toX, toY } = props
  const midX = (fromX + toX) / 2

  // If same lane (same Y), use a gentle horizontal curve
  if (fromY === toY) {
    return `M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`
  }

  // Different lanes: curve from parent's lane down/up to child's lane
  const cpX1 = fromX + (toX - fromX) * 0.4
  const cpX2 = fromX + (toX - fromX) * 0.6
  return `M ${fromX} ${fromY} C ${cpX1} ${fromY}, ${cpX2} ${toY}, ${toX} ${toY}`
})

const pathLength = computed(() => {
  const dx = props.toX - props.fromX
  const dy = props.toY - props.fromY
  // Approximate curve length
  return Math.sqrt(dx * dx + dy * dy) * 1.2
})
</script>

<template>
  <path
    :d="pathD"
    fill="none"
    :stroke="color"
    stroke-width="2.5"
    stroke-linecap="round"
    :opacity="isReplaced ? 0.15 : 0.6"
    class="commit-connection"
    :style="{
      '--path-length': pathLength,
    }"
  />
</template>

<style scoped>
.commit-connection {
  stroke-dasharray: var(--path-length);
  stroke-dashoffset: 0;
}
</style>
