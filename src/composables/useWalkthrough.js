import { computed } from 'vue'
import store from '../stores/gitStore.js'
import { useGitOperations } from './useGitOperations.js'

const { createCommit, createBranch, checkoutBranch, amendCommit, rebase, resetAll } = useGitOperations()

const steps = [
  {
    title: 'Starting Fresh',
    description: 'We begin with 3 commits on main. This is our baseline — remember these SHAs.',
    action: null, // No action, just observe
  },
  {
    title: 'Create a Feature Branch',
    description: 'Watch: a new branch appears, pointing to the same commit as main. No commits were copied.',
    action: () => createBranch('feature'),
  },
  {
    title: 'Add a Commit on Feature',
    description: 'This commit exists only on the feature branch. Check the proof panel — main is unchanged.',
    action: () => createCommit('Add login form'),
  },
  {
    title: 'Add Another Commit',
    description: 'Feature branch grows, main stays put. Two independent pointers, same shared history.',
    action: () => createCommit('Add validation'),
  },
  {
    title: 'Amend the Last Commit',
    description: 'Amending creates a NEW commit with a new SHA. The old one fades. Main? Still untouched.',
    action: () => amendCommit('Add validation (with tests)'),
  },
  {
    title: 'Switch Back to Main',
    description: 'Back on main. Notice all of main\'s SHAs are exactly what they were at the start.',
    action: () => checkoutBranch('main'),
  },
  {
    title: 'Add a Commit on Main',
    description: 'Main advances independently. Feature branch doesn\'t see this commit (yet).',
    action: () => createCommit('Fix security issue'),
  },
  {
    title: 'The Proof Is Complete',
    description: 'Through branching, committing, and amending — main\'s original commits never changed. Branches are independent pointers. QED.',
    action: () => checkoutBranch('feature'),
  },
]

export function useWalkthrough() {
  const isActive = computed(() => store.walkthrough.active)
  const currentStep = computed(() => store.walkthrough.currentStep)
  const totalSteps = computed(() => steps.length)
  const currentStepData = computed(() => steps[store.walkthrough.currentStep] || null)
  const isLastStep = computed(() => store.walkthrough.currentStep >= steps.length - 1)

  function startWalkthrough() {
    resetAll()
    store.walkthrough.active = true
    store.walkthrough.currentStep = 0
    store.walkthrough.totalSteps = steps.length
  }

  function nextStep() {
    const next = store.walkthrough.currentStep + 1
    if (next >= steps.length) {
      store.walkthrough.active = false
      return
    }

    store.walkthrough.currentStep = next
    const step = steps[next]
    if (step.action) {
      step.action()
    }
  }

  function skipWalkthrough() {
    store.walkthrough.active = false
  }

  return {
    isActive,
    currentStep,
    totalSteps,
    currentStepData,
    isLastStep,
    startWalkthrough,
    nextStep,
    skipWalkthrough,
  }
}
