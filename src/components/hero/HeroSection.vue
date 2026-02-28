<script setup>
const emit = defineEmits(['start-exploring'])
</script>

<template>
  <section class="text-center py-16 sm:py-24">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
      <span class="bg-gradient-to-r from-brand-green via-emerald-400 to-teal-400 bg-clip-text text-transparent">
        Branches Don't Change Main
      </span>
    </h1>

    <p class="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
      Your coworker thinks modifying commits on a feature branch also changes
      <code class="text-brand-green font-mono bg-surface-tertiary px-2 py-0.5 rounded">main</code>.
      They're wrong. Watch the proof unfold — create commits, branch, amend,
      and rebase while <code class="text-brand-green font-mono bg-surface-tertiary px-2 py-0.5 rounded">main</code>
      stays perfectly untouched.
    </p>

    <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
      <button
        class="px-8 py-3 rounded-lg bg-brand-green text-gray-950 font-semibold text-lg
               hover:bg-green-400 active:bg-green-500 transition-colors
               shadow-lg shadow-green-500/25"
        @click="emit('start-exploring')"
      >
        Start Exploring
      </button>
      <span class="text-sm text-gray-500">or scroll down to experiment freely</span>
    </div>

    <div class="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-brand-green"></span>
        main — always safe
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-brand-amber"></span>
        feature — your playground
      </div>
    </div>
  </section>
</template>
