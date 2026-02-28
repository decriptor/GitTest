import store, { resetStore } from '../stores/gitStore.js'
import { useShaGenerator } from './useShaGenerator.js'

const { generateSha } = useShaGenerator()

const commitMessages = [
  'Update styles',
  'Fix navigation bug',
  'Add user profile page',
  'Refactor API client',
  'Update dependencies',
  'Add unit tests',
  'Fix auth token refresh',
  'Improve error handling',
  'Add dark mode support',
  'Optimize image loading',
]

let messageIndex = 0

function nextMessage() {
  const msg = commitMessages[messageIndex % commitMessages.length]
  messageIndex++
  return msg
}

function recordOperation(type, details) {
  store.lastOperation = { type, details, timestamp: Date.now() }
  store.operationHistory.push(store.lastOperation)
}

export function useGitOperations() {
  function createCommit(customMessage) {
    const branch = store.HEAD
    const parentSha = store.branches[branch]
    const message = customMessage || nextMessage()
    const sha = generateSha(message, parentSha)
    const timestamp = Math.max(...Object.values(store.commits).map((c) => c.timestamp)) + 1

    store.commits[sha] = {
      sha,
      message,
      parent: parentSha,
      branch,
      timestamp,
      amended: false,
      replacedBy: null,
    }

    store.branches[branch] = sha

    recordOperation('commit', { sha, message, branch })
    return sha
  }

  function createBranch(name) {
    const branchName = name || `feature-${Object.keys(store.branches).length}`
    const currentSha = store.branches[store.HEAD]

    if (store.branches[branchName]) {
      recordOperation('error', { message: `Branch "${branchName}" already exists` })
      return null
    }

    store.branches[branchName] = currentSha
    store.HEAD = branchName

    recordOperation('branch', { name: branchName, from: currentSha })
    return branchName
  }

  function checkoutBranch(name) {
    if (!store.branches[name]) {
      recordOperation('error', { message: `Branch "${name}" not found` })
      return false
    }
    store.HEAD = name
    recordOperation('checkout', { branch: name })
    return true
  }

  function amendCommit(newMessage) {
    const branch = store.HEAD
    const oldSha = store.branches[branch]
    const oldCommit = store.commits[oldSha]

    if (!oldCommit) return null

    // Cannot amend main's commits to prove they're independent
    if (branch === 'main') {
      recordOperation('error', { message: 'Cannot amend on main — switch to a feature branch first' })
      return null
    }

    const message = newMessage || `${oldCommit.message} (amended)`
    const sha = generateSha(message, oldCommit.parent)
    const timestamp = Math.max(...Object.values(store.commits).map((c) => c.timestamp)) + 1

    // Create the new amended commit
    store.commits[sha] = {
      sha,
      message,
      parent: oldCommit.parent,
      branch,
      timestamp,
      amended: true,
      replacedBy: null,
    }

    // Mark old commit as replaced (faded in UI)
    store.commits[oldSha] = { ...oldCommit, replacedBy: sha }

    // Move branch pointer
    store.branches[branch] = sha

    recordOperation('amend', { oldSha, newSha: sha, branch })
    return sha
  }

  function rebase(ontoBranch = 'main') {
    const branch = store.HEAD
    if (branch === ontoBranch) {
      recordOperation('error', { message: 'Cannot rebase a branch onto itself' })
      return null
    }

    const ontoSha = store.branches[ontoBranch]

    // Find commits unique to current branch (not in onto branch)
    const ontoAncestors = new Set()
    let walk = ontoSha
    while (walk) {
      ontoAncestors.add(walk)
      walk = store.commits[walk]?.parent
    }

    const toRebase = []
    walk = store.branches[branch]
    while (walk && !ontoAncestors.has(walk)) {
      toRebase.unshift(store.commits[walk])
      walk = store.commits[walk]?.parent
    }

    if (toRebase.length === 0) {
      recordOperation('error', { message: 'Nothing to rebase — branches share the same commits' })
      return null
    }

    // Replay commits onto the target
    let newParent = ontoSha
    const rebasedSHAs = []

    for (const oldCommit of toRebase) {
      const sha = generateSha(oldCommit.message, newParent)
      const timestamp = Math.max(...Object.values(store.commits).map((c) => c.timestamp)) + 1

      store.commits[sha] = {
        sha,
        message: oldCommit.message,
        parent: newParent,
        branch,
        timestamp,
        amended: true, // highlight as "new" in UI
        replacedBy: null,
      }

      // Mark old commit as replaced
      store.commits[oldCommit.sha] = { ...oldCommit, replacedBy: sha }

      rebasedSHAs.push(sha)
      newParent = sha
    }

    // Move branch pointer to tip of rebased chain
    store.branches[branch] = newParent

    recordOperation('rebase', { branch, onto: ontoBranch, rebasedSHAs })
    return rebasedSHAs
  }

  function resetAll() {
    resetStore()
    messageIndex = 0
    recordOperation('reset', {})
  }

  return {
    createCommit,
    createBranch,
    checkoutBranch,
    amendCommit,
    rebase,
    resetAll,
  }
}
