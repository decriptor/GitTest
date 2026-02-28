<script setup>
import { ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './components/hero/HeroSection.vue'
import GitGraph from './components/graph/GitGraph.vue'
import ControlPanel from './components/controls/ControlPanel.vue'
import ProofPanel from './components/proof/ProofPanel.vue'
import ExplanationPanel from './components/education/ExplanationPanel.vue'
import StepIndicator from './components/education/StepIndicator.vue'
import BranchDiffPage from './components/diff/BranchDiffPage.vue'
import { useGitOperations } from './composables/useGitOperations.js'
import { useWalkthrough } from './composables/useWalkthrough.js'

const { createCommit, createBranch, checkoutBranch, amendCommit, rebase, resetAll } = useGitOperations()
const {
  isActive: walkthroughActive,
  currentStep,
  totalSteps,
  currentStepData,
  isLastStep,
  startWalkthrough,
  nextStep,
  skipWalkthrough,
} = useWalkthrough()

const currentPage = ref('home')

function handleStartExploring() {
  startWalkthrough()
}
</script>

<template>
  <!-- Branch Diff page -->
  <Transition name="fade" mode="out-in">
    <BranchDiffPage
      v-if="currentPage === 'diff'"
      @back="currentPage = 'home'"
    />

    <!-- Main app page -->
    <div v-else class="min-h-screen bg-surface-primary text-white flex flex-col">
      <AppHeader />
      <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Transition name="fade" mode="out-in">
          <HeroSection
            v-if="!walkthroughActive"
            @start-exploring="handleStartExploring"
          />
        </Transition>

        <section class="mt-12 space-y-6">
          <!-- Walkthrough step indicator -->
          <Transition name="slide-up" mode="out-in">
            <StepIndicator
              v-if="walkthroughActive && currentStepData"
              :key="currentStep"
              :current-step="currentStep"
              :total-steps="totalSteps"
              :step-title="currentStepData.title"
              :step-description="currentStepData.description"
              :is-last-step="isLastStep"
              @next="nextStep"
              @skip="skipWalkthrough"
            />
          </Transition>

          <!-- Controls (hidden during walkthrough) -->
          <Transition name="scale-in">
            <ControlPanel
              v-if="!walkthroughActive"
              @create-commit="createCommit()"
              @create-branch="createBranch()"
              @checkout="checkoutBranch"
              @amend="amendCommit()"
              @rebase="rebase()"
              @reset="resetAll()"
            />
          </Transition>

          <h2 class="text-xl font-semibold text-gray-300">Commit Graph</h2>
          <GitGraph />

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProofPanel />
            <ExplanationPanel />
          </div>

          <!-- Link to Branch Diff page -->
          <div class="rounded-xl bg-surface-secondary border border-gray-800 p-5 text-center">
            <p class="text-sm text-gray-400 mb-3">
              Want to see how rewriting commit messages affects SHA hashes across branches?
            </p>
            <button
              class="px-6 py-2.5 rounded-lg bg-brand-blue text-white font-semibold text-sm
                     hover:bg-blue-400 active:bg-blue-500 transition-colors
                     shadow-lg shadow-blue-500/20"
              @click="currentPage = 'diff'"
            >
              View Branch Diff: main vs dev
            </button>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  </Transition>
</template>
