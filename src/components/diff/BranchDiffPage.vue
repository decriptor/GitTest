<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['back'])

const commits = [
  {
    num: 1,
    subject: 'Initialize Vue 3 + Vite project',
    body: 'Set up the foundation for Git Branch Explorer with Vue 3.5,\nVite 6 build tooling, and basic app shell.',
    main: { sha: 'f3305809c95af6480c12a77bdf1136e10dbf8932', short: 'f330580' },
    dev:  { sha: 'd58b575f50ef81fd6414cc9f37eaa174d6d8a0ad', short: 'd58b575' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 2,
    subject: 'Install and configure Tailwind CSS 4',
    body: 'Add @tailwindcss/vite plugin, custom theme tokens for brand colors\n(green, amber, blue) and dark surface palette. Import styles in main.js.',
    main: { sha: '72db9dcbbec242fc8e10045c7c64efa5ecbaf2e4', short: '72db9dc' },
    dev:  { sha: '5e023bc325a3bb110ea0e0c3330080aadf5b741f', short: '5e023bc' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 3,
    subject: 'Add layout components',
    body: 'Create AppHeader with sticky nav, git branch icon, and tagline.\nCreate AppFooter with educational message. Wire both into App.vue\nwith flex column layout for proper page structure.',
    main: { sha: '24b8f0ac76b65911ed22619e997f7fb440184f4f', short: '24b8f0a' },
    dev:  { sha: '4a69e1ae1bceb9a5daca7659d6b5e3071cdce1c3', short: '4a69e1a' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 4,
    subject: 'Create HeroSection with gradient headline and CTA',
    body: 'Educational hero explaining the misconception about branches changing\nmain. Includes gradient heading, descriptive copy with inline code\ntags, "Start Exploring" button, and color legend for main vs feature.',
    main: { sha: '4366432f1f35de17a0918a3d90272920325afd3d', short: '4366432' },
    dev:  { sha: '7ddce8b51e4c0dbddf2471471136851835c5fd81', short: '7ddce8b' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 5,
    subject: 'Build reactive git store with commits, branches, and HEAD',
    body: 'Core data model: commits as a flat SHA map, branches as name\u2192SHA\npointers, HEAD as current branch name. Initialized with 3 commits\non main. Includes computed helpers for walking commit chains,\nlisting branches, and tracking main\'s SHA snapshot for proof.',
    main: { sha: 'c493d0adc19f09eb6598a947de1de8bc47ad63ea', short: 'c493d0a' },
    dev:  { sha: 'ecd35f7078ccc7a2ad18a8fc0a1bdeb029f5c6de', short: 'ecd35f7' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 6,
    subject: 'Implement git operations composable and SHA generator',
    body: 'useShaGenerator: deterministic 7-char hex SHA from message+parent.\nuseGitOperations: createCommit, createBranch, checkoutBranch,\namendCommit, rebase, resetAll. Amend/rebase mark old commits as\nreplaced and create new SHAs \u2014 proving branch independence.',
    main: { sha: '10d1c815071d5a6f6675f8c61ff65a10d0b0ddc0', short: '10d1c81' },
    dev:  { sha: 'e15d75bc9b9cf231090d6f06f59722a0e117d154', short: 'e15d75b' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 7,
    subject: 'Implement graph layout algorithm',
    body: 'computeLayout assigns branches to Y-axis lanes (main=0) and places\ncommits left-to-right by timestamp. Generates positioned nodes,\nparent-child connections, and branch labels for SVG rendering.\nIncludes color mapping per branch.',
    main: { sha: '81e977f0fe75348237f1747d7988c909d6e5b07f', short: '81e977f' },
    dev:  { sha: '1dd77074ef769de83845c45be92eb9efdbd4c2cb', short: '1dd7707' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 8,
    subject: 'Create GitGraph SVG container with basic rendering',
    body: 'Responsive SVG with computed viewBox from layout algorithm.\nRenders commit circles with SHA labels, straight-line connections,\nand branch labels using foreignObject. Wired into App.vue.',
    main: { sha: 'a56fabb2e58b6fe497194e1ca29450ce29f54525', short: 'a56fabb' },
    dev:  { sha: 'bde973e220e8e5a603dbec0b08c2afd38f3f5ea9', short: 'bde973e' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 9,
    subject: 'Build CommitNode component with hover glow and SHA labels',
    body: 'Colored circles with 5-char SHA labels, hover glow ring, pulse\nanimation for amended commits, and amber badge indicator. Replace\ninline circles in GitGraph with CommitNode components.',
    main: { sha: '5391da6a4c1a10b11aa5ac71fafd059d65980fbf', short: '5391da6' },
    dev:  { sha: 'd43c97f191e4da5a8e94a172e2411033389bb5d0', short: 'd43c97f' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 10,
    subject: 'Build CommitConnection with curved SVG Bezier paths',
    body: 'Cubic Bezier curves between parent-child commits that gracefully\nhandle lane changes for branch divergence. Replaced straight lines\nin GitGraph. Includes stroke-dasharray for future draw animation.',
    main: { sha: '840a291fccd27a821c2ef375bc906da51379df10', short: '840a291' },
    dev:  { sha: 'ba42f7dc15eaf9addb46788e87e1f22b7bc2067b', short: 'ba42f7d' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 11,
    subject: 'Build BranchLabel and HeadPointer components',
    body: 'BranchLabel: styled badge at branch tip with color-matched border\nand glow for HEAD branch. HeadPointer: floating HEAD indicator\nabove the active branch. Both use foreignObject for HTML styling.',
    main: { sha: 'dea50b43d939d1f74315e7405287deb1d39b1e5b', short: 'dea50b4' },
    dev:  { sha: 'b490179690f448e021457cf044e4a2bdba0d7418', short: 'b490179' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 12,
    subject: 'Build ControlPanel with action buttons and branch selector',
    body: 'ActionButton: reusable button with color variants and icon support.\nBranchSelector: dropdown showing all branches with HEAD indicator.\nControlPanel: groups Create Commit, Create Branch, Amend, Rebase,\nand Reset buttons. Amend/Rebase disabled when on main.',
    main: { sha: 'e1dad0157201107472f58ec20fbcbeb6952d2e22', short: 'e1dad01' },
    dev:  { sha: 'd83d0647dda7a6f391bd09372b430166fb6fe82c', short: 'd83d064' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 13,
    subject: 'Wire up commit and branch creation to control panel',
    body: 'Connect useGitOperations to ControlPanel events. Clicking buttons\nnow mutates the reactive store, and the graph auto-re-renders via\nVue\'s computed dependency tracking. Full reactive loop complete.',
    main: { sha: '8da6d0c551736730166bb91012b334d2ea37bddc', short: '8da6d0c' },
    dev:  { sha: '51700337b974a91b2e0c6f6f74f8726094aefa01', short: '5170033' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 14,
    subject: 'Wire up amend and rebase with visual feedback',
    body: 'Enhanced CommitNode: replaced commits show strikethrough line,\namended/rebased commits display amber star badge. Operations\nalready connected in previous commit \u2014 this adds the visual\ndistinction between old (faded+struck) and new (highlighted) nodes.',
    main: { sha: '3db8b6e71813ea45499c44955f0554c6070d9520', short: '3db8b6e' },
    dev:  { sha: 'f56066bf51c0132abb3253eeeb78bcb29f97afcb', short: 'f56066b' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 15,
    subject: 'Build ProofPanel with side-by-side SHA comparison',
    body: 'Two-column view comparing main\'s SHAs against initial snapshot.\nShows green "UNCHANGED" badge when main is untouched (always true).\nFeature branch column highlights shared vs branch-only commits.\nFlash animation triggers on each operation. Verdict counter at bottom.',
    main: { sha: 'a0b7512d212c97ccc55d52d43a44791c8d88c1b1', short: 'a0b7512' },
    dev:  { sha: '0e483852148ca7239185e29249ba21d71411c0a4', short: '0e48385' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 16,
    subject: 'Build ExplanationPanel with context-sensitive education',
    body: 'Shows title, explanation, and key concept for each operation type\n(commit, branch, checkout, amend, rebase, reset). Includes\noperation details in monospace. Laid out in 2-column grid alongside\nProofPanel for simultaneous proof + learning.',
    main: { sha: '91a582a944358b64c31721ed3ed560e3dda77531', short: '91a582a' },
    dev:  { sha: '96033a3ae951bd8db05a33f7d24493bacfc0dc5f', short: '96033a3' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 17,
    subject: 'Build CommitTooltip with full commit details popup',
    body: 'Click a commit node to see SHA, message, branch, parent, and\namended/replaced status in a floating tooltip panel. Toggle on/off\nby clicking. Positioned below the selected node using foreignObject.',
    main: { sha: '421cd52df9d951ec3daeb0a94066b2e08a9fcdc1', short: '421cd52' },
    dev:  { sha: '5f7cacecebfcba11480093f51c8d4fcdd53450fc', short: '5f7cace' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 18,
    subject: 'Implement 8-step guided walkthrough with progress indicator',
    body: 'useWalkthrough composable manages step state and auto-executes\ngit operations. StepIndicator shows progress dots, step title,\ndescription, and next/skip buttons. Hero CTA triggers walkthrough.\nSteps: observe \u2192 branch \u2192 commit \u2192 commit \u2192 amend \u2192 checkout main\n\u2192 commit on main \u2192 verify proof.',
    main: { sha: '916064cbad2e8cab02cf5b3b38fab63f0e914d5a', short: '916064c' },
    dev:  { sha: '6c4eb378f836d50c4fb1d17e8d87199a1c2543fb', short: '6c4eb37' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 19,
    subject: 'Add animations and transitions throughout',
    body: 'Spring-in animation on commit nodes, draw-connection animation on\npaths, slide-down on branch labels. Vue Transition wrappers on\nhero, walkthrough steps, and control panel (fade, slide-up,\nscale-in). Proof panel flash animation. Global keyframes in style.css.',
    main: { sha: 'dab01fcc7dcde0c498f5bc5c32552969d5177537', short: 'dab01fc' },
    dev:  { sha: 'bf96741485913b014303e90c941fa3c9755405ff', short: 'bf96741' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
  {
    num: 20,
    subject: 'Final polish \u2014 dark mode toggle, responsive, accessibility, README',
    body: 'Add dark/light mode toggle in header. Improve accessibility with\nARIA labels, focus-visible outlines, and prefers-reduced-motion.\nCustom scrollbar styling for graph overflow. Meta tags for SEO.\nComprehensive README documenting features, architecture, and usage.',
    main: { sha: 'a80a9d3a72dec17f2eabcc24a6c1b4679ab45268', short: 'a80a9d3' },
    dev:  { sha: 'a907d638926cf5247b464bf8e078535111b38082', short: 'a907d63' },
    attribution: 'Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>',
  },
]

const expandedCommit = ref(null)
const timelineHover = ref(null)

// The fork point: dev branched from main at commit 20, then filter-branch rewrote all 20
const forkPoint = {
  commitNum: 20,
  mainSha: 'a80a9d3',
  description: 'git checkout -b dev',
}

const timelineEvents = [
  { id: 'build', label: '20 commits built on main', range: [1, 20], branch: 'main' },
  { id: 'fork', label: 'git checkout -b dev', at: 20, type: 'fork' },
  { id: 'filter', label: 'git filter-branch (remove attribution)', range: [1, 20], branch: 'dev' },
  { id: 'result', label: 'No common ancestor — histories diverged', type: 'result' },
]

function toggleExpand(num) {
  expandedCommit.value = expandedCommit.value === num ? null : num
}

const stats = computed(() => ({
  total: commits.length,
  shaChanges: commits.filter((c) => c.main.sha !== c.dev.sha).length,
  messageChanges: commits.length, // all have attribution removed
}))
</script>

<template>
  <div class="min-h-screen bg-surface-primary text-white">
    <!-- Header -->
    <div class="sticky top-0 z-50 bg-surface-secondary/80 backdrop-blur-md border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <button
          class="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          @click="emit('back')"
        >
          <span>&larr;</span>
          <span>Back to Explorer</span>
        </button>
        <h1 class="text-sm font-semibold tracking-tight">Branch Diff: main vs dev</h1>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Summary banner -->
      <div class="rounded-xl bg-surface-secondary border border-gray-800 p-6 mb-8">
        <h2 class="text-2xl font-bold mb-2">
          <span class="text-brand-green">main</span>
          <span class="text-gray-600 mx-3">vs</span>
          <span class="text-brand-amber">dev</span>
        </h2>
        <p class="text-gray-400 text-sm mb-4">
          The <code class="text-brand-amber font-mono bg-surface-tertiary px-1.5 py-0.5 rounded">dev</code> branch
          was created from <code class="text-brand-green font-mono bg-surface-tertiary px-1.5 py-0.5 rounded">main</code>
          with all commit attribution removed. Same file content, different commit metadata &mdash; resulting in
          entirely different SHA hashes.
        </p>

        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-tertiary text-sm">
            <span class="text-gray-500">Commits:</span>
            <span class="font-semibold">{{ stats.total }}</span>
          </div>
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-sm">
            <span class="text-red-400">SHA changes:</span>
            <span class="font-semibold text-red-300">{{ stats.shaChanges }} / {{ stats.total }}</span>
          </div>
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm">
            <span class="text-amber-400">Message changes:</span>
            <span class="font-semibold text-amber-300">{{ stats.messageChanges }} / {{ stats.total }}</span>
          </div>
        </div>
      </div>

      <!-- Visual Timeline: How dev branched from main -->
      <div class="rounded-xl bg-surface-secondary border border-gray-800 p-6 mb-8 overflow-hidden">
        <h3 class="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-5">How dev branched from main</h3>

        <div class="relative">
          <!-- SVG Timeline -->
          <svg viewBox="0 0 800 260" class="w-full max-w-3xl mx-auto" aria-label="Branch timeline diagram">
            <defs>
              <marker id="arrow-green" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
              </marker>
              <marker id="arrow-amber" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
              </marker>
              <marker id="arrow-red" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
              </marker>
            </defs>

            <!-- Step 1: main branch line (commits 1-20) -->
            <g>
              <text x="30" y="38" class="text-[11px] fill-gray-500 font-semibold" text-anchor="start">Step 1</text>
              <text x="100" y="38" class="text-[11px] fill-gray-400" text-anchor="start">Build 20 commits on main</text>

              <!-- main line -->
              <line x1="100" y1="55" x2="620" y2="55" stroke="#22c55e" stroke-width="2.5" marker-end="url(#arrow-green)" />

              <!-- Commit dots on main -->
              <circle v-for="i in 20" :key="'m'+i" :cx="100 + (i-1) * 27.4" cy="55" r="4" fill="#22c55e" :opacity="i === 1 || i === 20 ? 1 : 0.4" />

              <!-- Labels at key commits -->
              <text x="100" y="75" class="text-[9px] fill-brand-green font-mono" text-anchor="middle">c1</text>
              <text x="620" y="75" class="text-[9px] fill-brand-green font-mono" text-anchor="middle">c20</text>

              <!-- Branch label -->
              <rect x="635" y="45" width="50" height="20" rx="4" fill="#22c55e" fill-opacity="0.15" stroke="#22c55e" stroke-opacity="0.3" />
              <text x="660" y="59" class="text-[10px] fill-brand-green font-mono font-semibold" text-anchor="middle">main</text>
            </g>

            <!-- Step 2: Fork point -->
            <g>
              <text x="30" y="112" class="text-[11px] fill-gray-500 font-semibold" text-anchor="start">Step 2</text>
              <text x="100" y="112" class="text-[11px] fill-gray-400" text-anchor="start">git checkout -b dev (branch from tip)</text>

              <!-- main line (faded continuation) -->
              <line x1="100" y1="128" x2="620" y2="128" stroke="#22c55e" stroke-width="2" opacity="0.3" />
              <circle cx="620" cy="128" r="5" fill="#22c55e" stroke="#22c55e" stroke-width="1.5" fill-opacity="0.3" />

              <!-- Fork arrow curving down from commit 20 -->
              <path d="M 620 128 C 640 128, 650 148, 650 158" stroke="#f59e0b" stroke-width="2.5" fill="none" stroke-dasharray="4 3" />
              <circle cx="650" cy="158" r="5" fill="#f59e0b" />

              <!-- Fork label -->
              <rect x="660" y="148" width="110" height="20" rx="4" fill="#f59e0b" fill-opacity="0.1" stroke="#f59e0b" stroke-opacity="0.3" />
              <text x="715" y="162" class="text-[9px] fill-brand-amber font-mono" text-anchor="middle">checkout -b dev</text>

              <!-- Fork indicator -->
              <circle cx="620" cy="128" r="8" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.6" />
            </g>

            <!-- Step 3: filter-branch rewrites dev -->
            <g>
              <text x="30" y="205" class="text-[11px] fill-gray-500 font-semibold" text-anchor="start">Step 3</text>
              <text x="100" y="205" class="text-[11px] fill-gray-400" text-anchor="start">git filter-branch rewrites every commit on dev</text>

              <!-- main line (unchanged, solid) -->
              <line x1="100" y1="222" x2="620" y2="222" stroke="#22c55e" stroke-width="2.5" />
              <circle v-for="i in 20" :key="'m2'+i" :cx="100 + (i-1) * 27.4" cy="222" r="3" fill="#22c55e" opacity="0.5" />
              <rect x="635" y="212" width="50" height="20" rx="4" fill="#22c55e" fill-opacity="0.15" stroke="#22c55e" stroke-opacity="0.3" />
              <text x="660" y="226" class="text-[10px] fill-brand-green font-mono font-semibold" text-anchor="middle">main</text>

              <!-- dev line (all new SHAs, below main) -->
              <line x1="100" y1="248" x2="620" y2="248" stroke="#f59e0b" stroke-width="2.5" />
              <circle v-for="i in 20" :key="'d2'+i" :cx="100 + (i-1) * 27.4" cy="248" r="3" fill="#f59e0b" opacity="0.5" />
              <rect x="635" y="238" width="42" height="20" rx="4" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-opacity="0.3" />
              <text x="656" y="252" class="text-[10px] fill-brand-amber font-mono font-semibold" text-anchor="middle">dev</text>

              <!-- X marks — no connection between the two lines -->
              <g opacity="0.5">
                <line x1="85" y1="230" x2="93" y2="240" stroke="#ef4444" stroke-width="1.5" />
                <line x1="93" y1="230" x2="85" y2="240" stroke="#ef4444" stroke-width="1.5" />
              </g>
              <text x="50" y="238" class="text-[8px] fill-red-400" text-anchor="middle">no common</text>
              <text x="50" y="247" class="text-[8px] fill-red-400" text-anchor="middle">ancestor</text>

              <!-- Correspondence dotted lines between matching commits -->
              <line v-for="i in [1, 10, 20]" :key="'corr'+i" :x1="100 + (i-1) * 27.4" y1="225" :x2="100 + (i-1) * 27.4" y2="245" stroke="#6b7280" stroke-width="1" stroke-dasharray="2 2" opacity="0.4" />
            </g>
          </svg>

          <!-- Text callout below timeline -->
          <div class="mt-4 mx-auto max-w-3xl px-3 py-2.5 rounded-lg bg-red-500/8 border border-red-500/15">
            <p class="text-[11px] text-red-400 text-center">
              <strong class="text-red-300">git merge-base main dev</strong> returns nothing.
              Because <code class="bg-red-500/10 px-1 rounded">filter-branch</code> rewrote every commit
              (including the root), Git sees these as <strong>completely unrelated histories</strong> with no shared ancestor.
              The fork point at commit 20 was erased when all parent hashes changed.
            </p>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap gap-4 mb-6 text-xs text-gray-500">
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded bg-brand-green/20 border border-brand-green/40"></span>
          main branch
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded bg-brand-amber/20 border border-brand-amber/40"></span>
          dev branch
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded bg-red-500/20 border border-red-500/40"></span>
          Changed / removed
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded bg-gray-700 border border-gray-600"></span>
          Identical
        </div>
      </div>

      <!-- Commit comparison list -->
      <div class="space-y-3">
        <div
          v-for="commit in commits"
          :key="commit.num"
          class="rounded-xl bg-surface-secondary border border-gray-800 overflow-hidden transition-all duration-200 hover:border-gray-700"
        >
          <!-- Commit row header -->
          <button
            class="w-full text-left px-4 sm:px-6 py-4 flex items-start gap-4 cursor-pointer"
            @click="toggleExpand(commit.num)"
          >
            <!-- Commit number -->
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-surface-tertiary flex items-center justify-center text-xs font-bold text-gray-400">
              {{ commit.num }}
            </div>

            <div class="flex-1 min-w-0">
              <!-- Subject line (identical on both) -->
              <div class="flex items-center gap-2">
                <p class="font-semibold text-sm text-gray-200 truncate">{{ commit.subject }}</p>
                <!-- Correspondence badge -->
                <span class="flex-shrink-0 text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-surface-tertiary text-gray-500 border border-gray-700"
                  :title="`main commit #${commit.num} corresponds to dev commit #${commit.num} — same code, different SHA`"
                >
                  main:#{{ commit.num }} &harr; dev:#{{ commit.num }}
                </span>
              </div>

              <!-- SHA comparison row -->
              <div class="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div class="flex items-center gap-1.5">
                  <span class="text-[10px] font-semibold uppercase tracking-wider text-brand-green w-10">main</span>
                  <code class="text-xs font-mono px-2 py-0.5 rounded bg-brand-green/10 text-brand-green border border-brand-green/20">
                    {{ commit.main.short }}
                  </code>
                </div>
                <span class="hidden sm:inline text-gray-600">&ne;</span>
                <div class="flex items-center gap-1.5">
                  <span class="text-[10px] font-semibold uppercase tracking-wider text-brand-amber w-10">dev</span>
                  <code class="text-xs font-mono px-2 py-0.5 rounded bg-brand-amber/10 text-brand-amber border border-brand-amber/20">
                    {{ commit.dev.short }}
                  </code>
                </div>
                <span class="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  SHA differs
                </span>
              </div>
            </div>

            <!-- Expand indicator -->
            <div class="flex-shrink-0 text-gray-600 mt-1 transition-transform duration-200" :class="{ 'rotate-180': expandedCommit === commit.num }">
              &#9662;
            </div>
          </button>

          <!-- Expanded diff view -->
          <Transition name="slide-up">
            <div v-if="expandedCommit === commit.num" class="border-t border-gray-800 px-4 sm:px-6 py-5">
              <!-- Full SHA comparison -->
              <div class="mb-5">
                <h4 class="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Full SHA Hash</h4>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <div class="px-3 py-2 rounded-lg bg-brand-green/5 border border-brand-green/15">
                    <span class="text-[10px] text-brand-green font-semibold uppercase">main</span>
                    <code class="block mt-1 text-xs font-mono text-brand-green break-all">{{ commit.main.sha }}</code>
                  </div>
                  <div class="px-3 py-2 rounded-lg bg-brand-amber/5 border border-brand-amber/15">
                    <span class="text-[10px] text-brand-amber font-semibold uppercase">dev</span>
                    <code class="block mt-1 text-xs font-mono text-brand-amber break-all">{{ commit.dev.sha }}</code>
                  </div>
                </div>
              </div>

              <!-- Message diff -->
              <div>
                <h4 class="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Commit Message Diff</h4>
                <div class="rounded-lg bg-gray-950 border border-gray-800 font-mono text-xs overflow-hidden">
                  <!-- Subject (identical) -->
                  <div class="px-4 py-1.5 border-b border-gray-800/50 text-gray-300">
                    {{ commit.subject }}
                  </div>
                  <!-- Body (identical) -->
                  <div class="px-4 py-1.5 border-b border-gray-800/50 text-gray-500 whitespace-pre-line">{{ commit.body }}</div>
                  <!-- Attribution line — main has it, dev doesn't -->
                  <div class="px-4 py-1.5 bg-red-500/8 border-l-2 border-red-500">
                    <div class="flex items-start gap-2">
                      <span class="text-red-400 font-bold select-none flex-shrink-0">&minus;</span>
                      <span class="text-red-400/70 line-through">{{ commit.attribution }}</span>
                      <span class="ml-auto text-[9px] uppercase tracking-wider text-red-400/50 flex-shrink-0 bg-red-500/10 px-1.5 py-0.5 rounded">
                        removed in dev
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- File content status -->
              <div class="mt-4 flex items-center gap-3 px-3 py-2 rounded-lg bg-green-500/8 border border-green-500/15">
                <span class="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-[10px] text-brand-green font-bold">&#10003;</span>
                <p class="text-[11px] text-green-400">
                  <strong class="text-green-300">File content identical.</strong>
                  The tree (file snapshot) for this commit is byte-for-byte the same on both branches.
                  Only the commit metadata (message, parent hash) differs.
                </p>
              </div>

              <!-- Explanation callout -->
              <div class="mt-2 px-3 py-2 rounded-lg bg-blue-500/8 border border-blue-500/15">
                <p class="text-[11px] text-blue-400">
                  <strong class="text-blue-300">Why do the SHAs differ?</strong>
                  A commit's SHA hash is derived from its content <em>and</em> metadata (message, author, timestamp, parent hash).
                  Removing the co-author trailer changed the message<template v-if="commit.num > 1">, and since this commit's parent hash
                  (commit #{{ commit.num - 1 }}) also changed, the difference cascades</template>.
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Bottom summary -->
      <div class="mt-8 rounded-xl bg-surface-secondary border border-gray-800 p-6 text-center">
        <p class="text-lg font-semibold text-gray-300 mb-2">
          20 commits. Same code. 20 different SHA hashes.
        </p>
        <p class="text-sm text-gray-500">
          Every commit has a different SHA because <code class="text-brand-amber font-mono bg-surface-tertiary px-1 py-0.5 rounded">git filter-branch</code>
          rewrote each commit message, and since each child commit hashes its parent's SHA,
          the change cascaded through the entire history.
        </p>
      </div>
    </div>
  </div>
</template>
