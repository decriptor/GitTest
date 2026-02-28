import { reactive, computed } from 'vue'

/**
 * Simulated Git object store.
 *
 * Data model mirrors real Git:
 * - commits: flat map of SHA → commit object
 * - branches: map of branch name → SHA (just pointers!)
 * - HEAD: the currently checked-out branch name
 */

const initialCommits = {
  'a1b2c3d': {
    sha: 'a1b2c3d',
    message: 'Initial commit',
    parent: null,
    branch: 'main',
    timestamp: 1,
    amended: false,
    replacedBy: null,
  },
  'e4f5a6b': {
    sha: 'e4f5a6b',
    message: 'Add README',
    parent: 'a1b2c3d',
    branch: 'main',
    timestamp: 2,
    amended: false,
    replacedBy: null,
  },
  'c7d8e9f': {
    sha: 'c7d8e9f',
    message: 'Add config file',
    parent: 'e4f5a6b',
    branch: 'main',
    timestamp: 3,
    amended: false,
    replacedBy: null,
  },
}

const store = reactive({
  // Core git objects
  commits: { ...initialCommits },
  branches: {
    main: 'c7d8e9f',
  },
  HEAD: 'main',

  // UI/tracking state
  lastOperation: null,
  operationHistory: [],
  mainSnapshotSHAs: ['a1b2c3d', 'e4f5a6b', 'c7d8e9f'],

  // Walkthrough state
  walkthrough: {
    active: false,
    currentStep: 0,
    totalSteps: 8,
  },
})

// --- Computed helpers ---

export const currentBranch = computed(() => store.HEAD)

export const headCommitSha = computed(() => store.branches[store.HEAD])

export const branchNames = computed(() => Object.keys(store.branches))

export const mainCommits = computed(() => {
  const result = []
  let sha = store.branches['main']
  while (sha) {
    const commit = store.commits[sha]
    if (!commit) break
    result.unshift(commit)
    sha = commit.parent
  }
  return result
})

export const currentBranchCommits = computed(() => {
  const result = []
  let sha = store.branches[store.HEAD]
  while (sha) {
    const commit = store.commits[sha]
    if (!commit) break
    result.unshift(commit)
    sha = commit.parent
  }
  return result
})

export const allVisibleCommits = computed(() => {
  const visited = new Set()
  const result = []

  for (const branchName of Object.keys(store.branches)) {
    let sha = store.branches[branchName]
    while (sha && !visited.has(sha)) {
      visited.add(sha)
      const commit = store.commits[sha]
      if (!commit) break
      result.push(commit)
      sha = commit.parent
    }
  }

  // Also include faded (replaced) commits that haven't been garbage-collected
  for (const commit of Object.values(store.commits)) {
    if (!visited.has(commit.sha) && commit.replacedBy) {
      result.push(commit)
    }
  }

  return result.sort((a, b) => a.timestamp - b.timestamp)
})

export const mainSHAs = computed(() => {
  return mainCommits.value.map((c) => c.sha)
})

export function resetStore() {
  store.commits = { ...initialCommits }
  store.branches = { main: 'c7d8e9f' }
  store.HEAD = 'main'
  store.lastOperation = null
  store.operationHistory = []
  store.mainSnapshotSHAs = ['a1b2c3d', 'e4f5a6b', 'c7d8e9f']
  store.walkthrough = { active: false, currentStep: 0, totalSteps: 8 }
}

export default store
