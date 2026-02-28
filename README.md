# Git Branch Explorer

An interactive web app that **visually proves** Git branches are independent pointers. Create commits, branch, amend, and rebase — watch `main` stay perfectly untouched.

## Why?

A coworker claims that modifying commits on a feature branch also changes `main`. This app proves them wrong through interactive visualization.

## Features

- **Interactive git graph** — SVG commit nodes with curved Bezier connections, branch labels, HEAD pointer
- **Live operations** — Create commits, create branches, checkout, amend, rebase — all update in real-time
- **Proof panel** — Side-by-side SHA comparison showing main never changes
- **Guided walkthrough** — 8-step tour that demonstrates branch independence
- **Free exploration** — Skip the tour and experiment on your own
- **Animations** — Spring-in nodes, drawing connections, fading replaced commits
- **Educational** — Context-sensitive explanations for every operation

## Tech Stack

- Vue 3 (Composition API, `<script setup>`)
- Vite 6
- Tailwind CSS 4
- SVG-based graph rendering

## Getting Started

```bash
npm install
npm run dev
```

## How It Works

The app simulates Git's internal data model:

- **Commits** are stored in a flat map keyed by SHA hash
- **Branches** are string pointers mapping a name to a commit SHA
- **HEAD** points to the currently checked-out branch name

This mirrors how real Git works. When you amend or rebase, new commits with new SHAs are created. The old commits are orphaned (shown faded). The key insight: **main's pointer never moves** unless you explicitly commit on main.

## Architecture

```
src/
├── stores/gitStore.js          # Reactive state
├── composables/
│   ├── useGitOperations.js     # Git simulation logic
│   ├── useShaGenerator.js      # Deterministic SHA generation
│   └── useWalkthrough.js       # Guided tour
├── components/
│   ├── layout/                 # Header, Footer
│   ├── hero/                   # Landing section
│   ├── graph/                  # SVG visualization
│   ├── controls/               # Action buttons
│   ├── proof/                  # SHA comparison
│   └── education/              # Explanations, walkthrough
└── utils/
    ├── constants.js            # Colors, sizes
    └── graphLayout.js          # X/Y position algorithm
```
