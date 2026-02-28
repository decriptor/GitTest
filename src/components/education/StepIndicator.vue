<script setup>
defineProps({
  currentStep: Number,
  totalSteps: Number,
  stepTitle: String,
  stepDescription: String,
  isLastStep: Boolean,
})

const emit = defineEmits(['next', 'skip'])
</script>

<template>
  <div class="rounded-xl bg-surface-secondary border-2 border-brand-blue/30 p-5">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-semibold text-brand-blue uppercase tracking-wider">
        Guided Tour — Step {{ currentStep + 1 }} of {{ totalSteps }}
      </h3>
      <button
        class="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        @click="emit('skip')"
      >
        Skip tour
      </button>
    </div>

    <!-- Progress dots -->
    <div class="flex gap-1.5 mb-4">
      <div
        v-for="i in totalSteps"
        :key="i"
        class="h-1.5 rounded-full transition-all duration-300"
        :class="[
          i - 1 <= currentStep ? 'bg-brand-blue' : 'bg-gray-700',
          i - 1 === currentStep ? 'w-6' : 'w-1.5',
        ]"
      />
    </div>

    <h4 class="text-lg font-semibold text-white mb-1">{{ stepTitle }}</h4>
    <p class="text-sm text-gray-400 leading-relaxed mb-4">{{ stepDescription }}</p>

    <button
      class="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150
             active:scale-95"
      :class="isLastStep
        ? 'bg-brand-green text-gray-950 hover:bg-green-400'
        : 'bg-brand-blue text-white hover:bg-blue-400'"
      @click="emit('next')"
    >
      {{ isLastStep ? 'Finish Tour' : 'Next Step →' }}
    </button>
  </div>
</template>
