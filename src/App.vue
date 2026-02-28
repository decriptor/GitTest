<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './components/hero/HeroSection.vue'

function handleStartExploring() {
  // Will wire to walkthrough in a later commit
}
</script>

<template>
  <div class="min-h-screen bg-surface-primary text-white flex flex-col">
    <AppHeader />
    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <HeroSection @start-exploring="handleStartExploring" />
    </main>
    <AppFooter />
  </div>
</template>
