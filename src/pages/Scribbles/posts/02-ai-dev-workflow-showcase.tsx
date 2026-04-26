export const meta = {
  title: "Project 02 \u2014 AI-Augmented Development Workflow Showcase",
  slug: "02-ai-dev-workflow-showcase",
  date: "2026-04-19",
  author: "Tawanda K",
  category: "Technical Project",
  image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80",
  excerpt: "You are building a public GitHub repository that demonstrates **structured, quality-conscious use of LLMs inside a frontend engineering workflow**. Th..."
};

export default function Project02AIAugmentedDevelopmentWorkflowShowcase() {
  return (
    <>
      {/* NOTE: This component was auto-generated from Markdown */}
      <h1 className="text-3xl font-bold mt-8 mb-4">Project 02 — AI-Augmented Development Workflow Showcase</h1>
<p className="mb-4 leading-relaxed"><strong>Agent:</strong> You are building a public GitHub repository that demonstrates <strong>structured, quality-conscious use of LLMs inside a frontend engineering workflow</strong>. The audience is hiring panels at Staff/Principal level who are fatigued by "I use Copilot" claims and want evidence that the candidate treats prompt engineering as a discipline. Execute the specification exactly as written. Deviations require a written justification in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">DECISIONS.md</code>.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">1. Objective</h2>
<p className="mb-4 leading-relaxed">Build a reference repository — half toolkit, half case study — that proves the author operates AI tooling with rigour. The project contains four separable, working modules that a team could lift into their own codebase and run on Monday morning. The repo is the deliverable. The README is the argument.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">2. Non-Goals</h2>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> build a chat interface. This is a dev-tooling repo.</li>
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> build a "one prompt to rule them all" mega-prompt. The value is specificity.</li>
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> generate infinite example output. Quality over quantity.</li>
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> include API keys. Users provide their own via <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">.env</code>.</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">3. Tech Stack — Fixed</h2>
<pre className="text-xs overflow-x-auto my-4">| Layer | Choice |
|---|---|
| Language | TypeScript 5.6+, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">strict: true</code> |
| Runtime | Node.js 20 LTS |
| Package manager | pnpm 9.x |
| CLI framework | Commander.js |
| LLM | Anthropic Claude via <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">@anthropic-ai/sdk</code>, model <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">claude-sonnet-4-5</code> |
| Schema | Zod |
| Test | Vitest |
| Lint | ESLint flat config + <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">@typescript-eslint/strict-type-checked</code> |
| Docs | MkDocs Material (or Astro Starlight — pick one, justify in DECISIONS.md) |
| CI | GitHub Actions |</pre>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">4. Repository Structure</h2>
<pre className="bg-stone-100 dark:bg-stone-900 p-4 rounded overflow-x-auto my-4 text-sm"><code>/
├── README.md                    # The argument. See §10.
├── DECISIONS.md
├── LICENSE                      # MIT
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── ai-review.yml        # See §6
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/                        # Full prose writeups per module
├── packages/
│   ├── prompt-library/          # Module 1
│   ├── any-sentinel/            # Module 2
│   ├── a11y-prompt-hook/        # Module 3
│   └── pr-review-bot/           # Module 4
├── examples/                    # Runnable demos of each module
└── pnpm-workspace.yaml
</code></pre>
<p className="mb-4 leading-relaxed">Monorepo, pnpm workspaces. Each package is independently publishable to npm (scope <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">@tawanda/…</code> or similar — author decides). Each package has its own <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">README.md</code>, its own tests, its own <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">CHANGELOG.md</code>.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">5. Module 1 — Prompt Library</h2>
<p className="mb-4 leading-relaxed"><strong>Path:</strong> <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">packages/prompt-library/</code></p>
<p className="mb-4 leading-relaxed">A typed, versioned, testable library of prompts for frontend engineering tasks. Each prompt is a TypeScript module, not a markdown file.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">5.1 Prompt anatomy</h3>
<p className="mb-4 leading-relaxed">Every prompt exports this shape:</p>
<pre className="bg-stone-100 dark:bg-stone-900 p-4 rounded overflow-x-auto my-4 text-sm"><code>export type Prompt&lt;TInput, TOutput&gt; = &#123;
  readonly id: string;                    // e.g. 'component/react-functional-v2'
  readonly version: string;               // semver
  readonly description: string;
  readonly inputSchema: z.ZodSchema&lt;TInput&gt;;
  readonly outputSchema: z.ZodSchema&lt;TOutput&gt;;
  readonly systemPrompt: string;
  readonly renderUserMessage: (input: TInput) =&gt; string;
  readonly modelConfig: &#123;
    model: string;
    maxTokens: number;
    temperature: number;
  &#125;
  readonly evalCases: ReadonlyArray&lt;EvalCase&lt;TInput, TOutput&gt;&gt;
&#125;
</code></pre>
<h3 className="text-xl font-semibold mt-6 mb-3">5.2 Required prompts — minimum set</h3>
<p className="mb-4 leading-relaxed">Ship at least these six prompts, all working end-to-end:</p>
<p className="mb-4 leading-relaxed">1. <strong><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">component/react-functional</code></strong> — generate a React 19 functional component from a spec. Output conforms to a Zod schema covering component name, props interface, body, and a colocated test stub.
2. <strong><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">refactor/any-to-unknown</code></strong> — take a TS file, replace every <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code> with a correctly narrowed type. Output is a unified diff.
3. <strong><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">test/rtl-for-component</code></strong> — given a React component source, produce a React Testing Library test suite. Output is a full test file.
4. <strong><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">a11y/component-audit</code></strong> — audit a component against WCAG 2.2. Output is a structured JSON list of findings with severity and remediation.
5. <strong><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">adr/from-conversation</code></strong> — given a chat log or meeting notes, produce an Architecture Decision Record in Michael Nygard's format.
6. <strong><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">commit/conventional-from-diff</code></strong> — given a git diff, produce a Conventional Commits message. Output constrained by schema.</p>
<p className="mb-4 leading-relaxed">Each prompt file sits in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">src/prompts/&lt;id&gt;.ts</code> and is re-exported from <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">src/index.ts</code>.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">5.3 Testability</h3>
<p className="mb-4 leading-relaxed">Every prompt ships with at least 5 <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">evalCases</code>. Each case has:</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">name</code></li>
<li className="ml-6 list-disc mb-1"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">input</code> (conforming to <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">inputSchema</code>)</li>
<li className="ml-6 list-disc mb-1"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">assertions</code> — an array of predicates run against the parsed output (e.g. "output includes a test block", "no <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code> tokens remain", "component name matches PascalCase")</li>
</ul>
<p className="mb-4 leading-relaxed">Add a CLI: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">pnpm run eval &lt;prompt-id&gt;</code> — runs the eval cases against the live API and prints a pass/fail table. Store results in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">evals/&lt;prompt-id&gt;/&lt;timestamp&gt;.json</code>.</p>
<p className="mb-4 leading-relaxed">Add a stub mode: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">pnpm run eval &lt;prompt-id&gt; --stub</code> — reads recorded responses from <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">evals/fixtures/</code> and runs assertions offline. This is what CI runs.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">6. Module 2 — Any-Sentinel (CI Guard)</h2>
<p className="mb-4 leading-relaxed"><strong>Path:</strong> <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">packages/any-sentinel/</code></p>
<p className="mb-4 leading-relaxed">A CLI that scans a TypeScript codebase and uses an LLM call to classify every <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code> usage as either:</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">legitimate_escape</code> — with a reason</li>
<li className="ml-6 list-disc mb-1"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">lazy</code> — with a suggested replacement</li>
</ul>
<p className="mb-4 leading-relaxed">The purpose is to turn the <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code> audit from a grep-and-shame exercise into a structured review artefact.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">6.1 Behaviour</h3>
<pre className="bg-stone-100 dark:bg-stone-900 p-4 rounded overflow-x-auto my-4 text-sm"><code>$ npx any-sentinel scan ./src --format markdown --report report.md
</code></pre>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Walks the codebase with ts-morph.</li>
<li className="ml-6 list-disc mb-1">For each <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code>, collects the surrounding AST context (function signature, call site, inferred types of adjacent variables).</li>
<li className="ml-6 list-disc mb-1">Sends a batch of contexts to Claude with a structured-output schema.</li>
<li className="ml-6 list-disc mb-1">Produces a report: markdown by default, JSON with <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">--format json</code>.</li>
<li className="ml-6 list-disc mb-1">Exit code 0 if all remaining <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code>s are classified <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">legitimate_escape</code>. Exit code 1 otherwise. This makes it CI-usable.</li>
</ul>
<h3 className="text-xl font-semibold mt-6 mb-3">6.2 Config</h3>
<p className="mb-4 leading-relaxed"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">.any-sentinel.json</code> at repo root. Fields: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">include</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">exclude</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">allowlist</code> (file paths + line ranges where <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code> is accepted indefinitely — with required <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">reason</code> field).</p>
<h3 className="text-xl font-semibold mt-6 mb-3">6.3 GitHub Action</h3>
<p className="mb-4 leading-relaxed">Ship <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">.github/workflows/ai-review.yml</code> at the repo root that runs <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any-sentinel</code> on every PR touching <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">.ts</code>/<code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">.tsx</code> files and posts the report as a PR comment. Use <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">@actions/github</code> for the comment. Rate-limit: only run if the PR touches ≥1 TS file.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">7. Module 3 — A11y Prompt Hook (Pre-commit)</h2>
<p className="mb-4 leading-relaxed"><strong>Path:</strong> <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">packages/a11y-prompt-hook/</code></p>
<p className="mb-4 leading-relaxed">A pre-commit hook (Husky-compatible) that runs on staged <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">.tsx</code> files and sends them to an LLM with the <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">a11y/component-audit</code> prompt from Module 1. High/critical findings block the commit. Medium/low findings print a warning but allow the commit.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">7.1 Behaviour</h3>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Reads the list of staged files from git.</li>
<li className="ml-6 list-disc mb-1">Filters to <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">.tsx</code>.</li>
<li className="ml-6 list-disc mb-1">For each file, calls the audit prompt.</li>
<li className="ml-6 list-disc mb-1">Aggregates findings.</li>
<li className="ml-6 list-disc mb-1">Prints a human-readable report to stderr.</li>
<li className="ml-6 list-disc mb-1">Exit code 1 if any finding has severity <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">high</code> or <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">critical</code>.</li>
</ul>
<h3 className="text-xl font-semibold mt-6 mb-3">7.2 Config</h3>
<p className="mb-4 leading-relaxed"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">.a11y-hook.json</code> — fields: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">severityThreshold</code> (which level blocks), <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">excludePatterns</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">cacheDir</code> (to avoid re-auditing unchanged files within a session — hash-based cache).</p>
<h3 className="text-xl font-semibold mt-6 mb-3">7.3 Bypass</h3>
<p className="mb-4 leading-relaxed"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">git commit --no-verify</code> bypasses it. Do not try to be clever about preventing this — respect the user's override. But log the bypass to <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">.a11y-hook/bypass.log</code> for auditability.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">8. Module 4 — PR Review Bot</h2>
<p className="mb-4 leading-relaxed"><strong>Path:</strong> <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">packages/pr-review-bot/</code></p>
<p className="mb-4 leading-relaxed">A GitHub Action that reviews pull requests against a <strong>house style guide</strong>. The guide lives in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">docs/house-style.md</code> — a real, opinionated document the author has actually thought about. Not generic fluff.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">8.1 Behaviour</h3>
<p className="mb-4 leading-relaxed">On PR open or sync:</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Fetches the diff.</li>
<li className="ml-6 list-disc mb-1">Loads <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">docs/house-style.md</code>.</li>
<li className="ml-6 list-disc mb-1">Sends to Claude with a review prompt that produces structured output: an array of <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">&#123;file, line, severity, category, comment, suggestion?&#125;</code>.</li>
<li className="ml-6 list-disc mb-1">Posts findings as inline PR review comments using the GitHub Review API.</li>
<li className="ml-6 list-disc mb-1">Adds a summary comment with counts by severity.</li>
</ul>
<h3 className="text-xl font-semibold mt-6 mb-3">8.2 House Style Guide — Content</h3>
<p className="mb-4 leading-relaxed"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">docs/house-style.md</code> must contain at least these sections with concrete examples:</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">TypeScript: discriminated unions over boolean flags; no <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code>; branded types for IDs</li>
<li className="ml-6 list-disc mb-1">React: no <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">useEffect</code> for derived state; prefer composition over prop drilling; server state stays in TanStack Query</li>
<li className="ml-6 list-disc mb-1">Testing: test behaviour, not implementation; no snapshot tests for dynamic UI</li>
<li className="ml-6 list-disc mb-1">Naming: exported symbols are unambiguous; no abbreviations except well-known ones</li>
<li className="ml-6 list-disc mb-1">Comments: explain <em>why</em>, not <em>what</em>; TODOs have a ticket ID or are deleted</li>
</ul>
<p className="mb-4 leading-relaxed">This document is itself a portfolio artefact. Write it with care.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">8.3 Cost control</h3>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Skip review on PRs labelled <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">skip-review</code>.</li>
<li className="ml-6 list-disc mb-1">Skip review on PRs &gt; 1000 changed lines (post a comment explaining why).</li>
<li className="ml-6 list-disc mb-1">Cache style guide embeddings — do not re-upload the guide on every invocation.</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">9. CI Requirements</h2>
<p className="mb-4 leading-relaxed"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">ci.yml</code> must:</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Install with pnpm (frozen lockfile).</li>
<li className="ml-6 list-disc mb-1">Lint all packages.</li>
<li className="ml-6 list-disc mb-1">Typecheck all packages.</li>
<li className="ml-6 list-disc mb-1">Run unit tests.</li>
<li className="ml-6 list-disc mb-1">Run prompt evals in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">--stub</code> mode.</li>
<li className="ml-6 list-disc mb-1">Build each package.</li>
<li className="ml-6 list-disc mb-1">Fail fast on any step.</li>
</ul>
<p className="mb-4 leading-relaxed"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">ai-review.yml</code> must:</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Run only on PRs (not pushes to main).</li>
<li className="ml-6 list-disc mb-1">Require <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">ANTHROPIC_API_KEY</code> secret.</li>
<li className="ml-6 list-disc mb-1">Post at most one summary comment per run (update the existing one on subsequent pushes — do not spam).</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">10. README — The Argument</h2>
<p className="mb-4 leading-relaxed">The root <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">README.md</code> is the primary sales document. Structure:</p>
<h3 className="text-xl font-semibold mt-6 mb-3">10.1 Opening — three paragraphs, no preamble</h3>
1. The claim: LLMs in engineering workflows are underused because teams treat them as autocomplete instead of infrastructure. This repo shows what the alternative looks like.
2. The approach: four composable modules, each with a clear contract, each independently testable, each usable in production.
3. The outcome: a team adopting these patterns ships more TypeScript-correct, more accessible, more consistently-reviewed code — with AI as a force multiplier, not a crutch.
<h3 className="text-xl font-semibold mt-6 mb-3">10.2 Module index</h3>
A table linking to each package's own README, with a one-line summary and a <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">Try it</code> command.
<h3 className="text-xl font-semibold mt-6 mb-3">10.3 Why each module exists</h3>
One short section per module — 3–4 sentences explaining the problem it solves and the design decision at its core.
<h3 className="text-xl font-semibold mt-6 mb-3">10.4 Prompt engineering as a discipline</h3>
A 300–500 word essay in the README itself that argues for treating prompts as:
<ul className="my-4">
<li className="ml-6 list-disc mb-1"><strong>Versioned artefacts</strong> — diff-able, reviewable</li>
<li className="ml-6 list-disc mb-1"><strong>Schema-bounded</strong> — input and output typed</li>
<li className="ml-6 list-disc mb-1"><strong>Evaluated</strong> — with pass/fail cases, not vibes</li>
<li className="ml-6 list-disc mb-1"><strong>Composable</strong> — prompts call prompts</li>
</ul>
<p className="mb-4 leading-relaxed">This section is the portfolio signal. Write it as if it might be quoted.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">10.5 How to use this repo</h3>
Three user journeys, each with exact commands:
<ul className="my-4">
<li className="ml-6 list-disc mb-1">"I want to try the prompt library in my project."</li>
<li className="ml-6 list-disc mb-1">"I want to add any-sentinel to my CI."</li>
<li className="ml-6 list-disc mb-1">"I want the PR review bot on my repo."</li>
</ul>
<h3 className="text-xl font-semibold mt-6 mb-3">10.6 Limitations</h3>
Honest. Short. Must include: API cost considerations, false-positive rates observed in the evals, non-determinism caveats.
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">11. Documentation Site</h2>
<p className="mb-4 leading-relaxed">Build a static docs site (MkDocs Material or Astro Starlight) deployed to GitHub Pages. Not optional.</p>
<p className="mb-4 leading-relaxed">Pages:</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Home (mirror of README opening)</li>
<li className="ml-6 list-disc mb-1">Each module (expanded docs, beyond the per-package READMEs)</li>
<li className="ml-6 list-disc mb-1">The "Prompt Engineering as a Discipline" essay (expanded)</li>
<li className="ml-6 list-disc mb-1">Eval results — auto-generated page showing the latest eval run output</li>
</ul>
<p className="mb-4 leading-relaxed">The docs site URL is pinned in the repo description.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">12. Accessibility of the Docs Site</h2>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Passes axe-core with zero violations.</li>
<li className="ml-6 list-disc mb-1">Keyboard navigation works for every interactive element.</li>
<li className="ml-6 list-disc mb-1">Light and dark theme.</li>
<li className="ml-6 list-disc mb-1">No flashy animations on route transitions.</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">13. Testing Requirements</h2>
<ul className="my-4">
<li className="ml-6 list-disc mb-1"><strong>Unit test coverage ≥ 85%</strong> on non-prompt logic. Prompts themselves are tested via eval cases.</li>
<li className="ml-6 list-disc mb-1"><strong>Eval stub fixtures</strong> checked into the repo — <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">evals/fixtures/</code> — so CI runs offline.</li>
<li className="ml-6 list-disc mb-1"><strong>Integration test</strong>: one end-to-end run of <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any-sentinel</code> against a fixture codebase with known <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code> usages. Assert the classification output matches expectations.</li>
<li className="ml-6 list-disc mb-1"><strong>No skipped tests in main.</strong> Skipped tests are tech debt; tech debt is documented or closed.</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">14. Acceptance Criteria</h2>
<p className="mb-4 leading-relaxed">The project is complete when:</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">[ ] All four modules are published to npm (or at minimum, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">npm pack</code> produces a valid tarball for each).</li>
<li className="ml-6 list-disc mb-1">[ ] CI is green. Eval stub runs green.</li>
<li className="ml-6 list-disc mb-1">[ ] Docs site is live and reachable.</li>
<li className="ml-6 list-disc mb-1">[ ] A developer can clone the repo, run <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">pnpm install && pnpm test</code>, and see everything pass within 5 minutes.</li>
<li className="ml-6 list-disc mb-1">[ ] The PR review bot has reviewed at least one real PR in this repo. That PR is linked from the README as a "see it in action" example.</li>
<li className="ml-6 list-disc mb-1">[ ] Every package's README is non-trivial and complete.</li>
<li className="ml-6 list-disc mb-1">[ ] <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">docs/house-style.md</code> is a document the author would actually stand behind in a code review.</li>
<li className="ml-6 list-disc mb-1">[ ] <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">DECISIONS.md</code> documents every non-obvious architectural choice.</li>
</ul>
<p className="mb-4 leading-relaxed">Do not ship until the list is green.</p>
    </>
  );
}
