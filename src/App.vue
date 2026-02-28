<script setup>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './components/hero/HeroSection.vue'
import GitGraph from './components/graph/GitGraph.vue'
import ControlPanel from './components/controls/ControlPanel.vue'

function handleStartExploring() {
  // Will wire to walkthrough in a later commit
}
</script>

<template>
  <div class="min-h-screen bg-surface-primary text-white flex flex-col">
    <AppHeader />
    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <HeroSection @start-exploring="handleStartExploring" />

      <section class="mt-12 space-y-6">
        <ControlPanel />
        <h2 class="text-xl font-semibold text-gray-300">Commit Graph</h2>
        <GitGraph />
      </section>
    </main>
    <AppFooter />
  </div>
</template>
