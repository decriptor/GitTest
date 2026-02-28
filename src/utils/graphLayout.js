import {
  NODE_SPACING_X,
  NODE_SPACING_Y,
  GRAPH_PADDING_X,
  GRAPH_PADDING_Y,
  BRANCH_COLORS,
} from './constants.js'

/**
 * Compute layout positions for all visible commits.
 *
 * Strategy:
 * - Assign each branch to a lane (Y position)
 * - Place commits left-to-right by timestamp order (X position)
 * - Track which lane each commit belongs to based on its branch
 *
 * Returns: { nodes: [...], connections: [...], width, height, branchLanes }
 */
export function computeLayout(commits, branches, HEAD) {
  if (!commits || commits.length === 0) {
    return { nodes: [], connections: [], width: 200, height: 200, branchLanes: {} }
  }

  // Sort commits by timestamp
  const sorted = [...commits].sort((a, b) => a.timestamp - b.timestamp)

  // Assign lanes to branches (main always lane 0)
  const branchLanes = {}
  let nextLane = 0

  // Main gets lane 0
  branchLanes['main'] = nextLane++

  // Assign other branches in order of first appearance
  for (const commit of sorted) {
    if (commit.branch && !(commit.branch in branchLanes)) {
      branchLanes[commit.branch] = nextLane++
    }
  }

  // Compute positions — X based on column index, Y based on lane
  const commitIndex = {}
  let col = 0
  for (const commit of sorted) {
    commitIndex[commit.sha] = col
    col++
  }

  const nodes = sorted.map((commit) => {
    const lane = branchLanes[commit.branch] ?? 0
    const colIdx = commitIndex[commit.sha]

    return {
      sha: commit.sha,
      message: commit.message,
      branch: commit.branch,
      x: GRAPH_PADDING_X + colIdx * NODE_SPACING_X,
      y: GRAPH_PADDING_Y + lane * NODE_SPACING_Y,
      isReplaced: commit.replacedBy !== null,
      isAmended: commit.amended,
      color: getBranchColor(commit.branch, branchLanes),
    }
  })

  // Build a quick lookup from sha → node
  const nodeMap = {}
  for (const node of nodes) {
    nodeMap[node.sha] = node
  }

  // Compute connections (parent → child lines)
  const connections = []
  for (const commit of sorted) {
    if (commit.parent && nodeMap[commit.parent]) {
      const from = nodeMap[commit.parent]
      const to = nodeMap[commit.sha]
      connections.push({
        id: `${commit.parent}-${commit.sha}`,
        fromX: from.x,
        fromY: from.y,
        toX: to.x,
        toY: to.y,
        color: to.color,
        isReplaced: commit.replacedBy !== null,
      })
    }
  }

  // Branch labels positioned at the tip commit of each branch
  const branchLabels = []
  for (const [name, sha] of Object.entries(branches)) {
    const node = nodeMap[sha]
    if (node) {
      branchLabels.push({
        name,
        x: node.x,
        y: node.y,
        color: getBranchColor(name, branchLanes),
        isHEAD: name === HEAD,
      })
    }
  }

  const maxX = Math.max(...nodes.map((n) => n.x), 0) + GRAPH_PADDING_X
  const maxY = Math.max(...nodes.map((n) => n.y), 0) + GRAPH_PADDING_Y

  return {
    nodes,
    connections,
    branchLabels,
    width: maxX,
    height: maxY,
    branchLanes,
  }
}

function getBranchColor(branchName, branchLanes) {
  if (branchName === 'main') return BRANCH_COLORS.main
  const lane = branchLanes[branchName]
  if (lane === 1) return BRANCH_COLORS.default
  const extraIdx = (lane - 2) % BRANCH_COLORS.extra.length
  return BRANCH_COLORS.extra[extraIdx] || BRANCH_COLORS.default
}
