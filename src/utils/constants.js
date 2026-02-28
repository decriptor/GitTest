// Graph layout dimensions
export const NODE_RADIUS = 20
export const NODE_SPACING_X = 100
export const NODE_SPACING_Y = 80
export const GRAPH_PADDING_X = 50
export const GRAPH_PADDING_Y = 80  // room for HEAD pointer + branch label above nodes

// Branch colors
export const BRANCH_COLORS = {
  main: '#22c55e',      // green
  default: '#f59e0b',   // amber for feature branches
  extra: ['#3b82f6', '#a855f7', '#ec4899', '#06b6d4'], // blue, purple, pink, cyan
}

// Commit node states
export const COMMIT_STATES = {
  normal: 'normal',
  amended: 'amended',
  replaced: 'replaced',
}
