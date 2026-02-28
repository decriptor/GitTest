<script setup>
import { ref, onMounted } from 'vue'

const darkMode = ref(true)

function toggleDarkMode() {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('light-mode', !darkMode.value)
}

onMounted(() => {
  document.documentElement.classList.toggle('light-mode', !darkMode.value)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-surface-secondary/80 backdrop-blur-md border-b border-gray-800"
    role="banner"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <svg class="w-7 h-7 text-brand-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="18" r="3" />
          <line x1="12" y1="9" x2="6" y2="15" />
          <line x1="12" y1="9" x2="18" y2="15" />
        </svg>
        <span class="text-lg font-semibold tracking-tight">Git Branch Explorer</span>
      </div>
      <nav class="flex items-center gap-4 text-sm text-gray-400" aria-label="Site navigation">
        <span class="hidden sm:inline">Branches are just pointers</span>
        <button
          class="p-1.5 rounded-md hover:bg-surface-tertiary transition-colors"
          :aria-label="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleDarkMode"
        >
          <span class="text-lg">{{ darkMode ? '☀' : '☾' }}</span>
        </button>
      </nav>
    </div>
  </header>
</template>
