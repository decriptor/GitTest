<script setup>
defineProps({
  label: String,
  icon: String,
  variant: {
    type: String,
    default: 'default', // 'default' | 'green' | 'amber' | 'red' | 'blue'
  },
  disabled: Boolean,
})

const emit = defineEmits(['click'])

const variantClasses = {
  default: 'bg-surface-tertiary hover:bg-gray-700 text-gray-200 border-gray-700',
  green: 'bg-green-500/15 hover:bg-green-500/25 text-brand-green border-green-500/30',
  amber: 'bg-amber-500/15 hover:bg-amber-500/25 text-brand-amber border-amber-500/30',
  red: 'bg-red-500/15 hover:bg-red-500/25 text-brand-red border-red-500/30',
  blue: 'bg-blue-500/15 hover:bg-blue-500/25 text-brand-blue border-blue-500/30',
}
</script>

<template>
  <button
    class="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-150
           disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
    :class="variantClasses[variant]"
    :disabled="disabled"
    @click="emit('click')"
  >
    <span v-if="icon" class="text-base">{{ icon }}</span>
    <span>{{ label }}</span>
  </button>
</template>
