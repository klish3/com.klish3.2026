export const meta = {
  title: "Project 01 \u2014 AI-Powered Claims Triage UI",
  slug: "01-ai-claims-triage-ui",
  date: "2026-04-19",
  author: "Tawanda K",
  category: "Technical Project",
  image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80",
  excerpt: "You are building a public GitHub portfolio project for a Frontend Technical Lead targeting Staff/Principal Engineer roles at insurtech companies (Trac..."
};

export default function Project01AIPoweredClaimsTriageUI() {
  return (
    <>
      {/* NOTE: This component was auto-generated from Markdown */}
      <h1 className="text-3xl font-bold mt-8 mb-4">Project 01 — AI-Powered Claims Triage UI</h1>
<p className="mb-4 leading-relaxed"><strong>Agent:</strong> You are building a public GitHub portfolio project for a Frontend Technical Lead targeting Staff/Principal Engineer roles at insurtech companies (Tractable, Marshmallow, By Miles). This is a recruiter-facing artefact. Execute the specification exactly as written. Do not add features not listed. Do not remove requirements you find inconvenient. Deviations require a written justification in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">DECISIONS.md</code>.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">1. Objective</h2>
<p className="mb-4 leading-relaxed">Build a single-page application that simulates an <strong>AI-assisted first notification of loss (FNOL) triage interface</strong> for motor insurance claims. The interface demonstrates a conversational LLM layer over a structured claims intake flow, with explicit attention to type safety, state modelling, latency handling, and regulatory-adjacent UX patterns (audit trail, confidence surfacing, human-in-the-loop override).</p>
<p className="mb-4 leading-relaxed">The project must be understandable by a senior engineer in under 5 minutes of scanning the README and running <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">npm install && npm run dev</code>.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">2. Non-Goals</h2>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> build a backend claims system. Persistence is in-memory plus <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">localStorage</code> only.</li>
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> integrate a real policy/PAS system. Mock data lives in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">src/mocks/</code>.</li>
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> build authentication. Assume single-user demo.</li>
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> include payment flows, document upload to S3, or any PII-handling features beyond mock data.</li>
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> build a mobile app. Responsive web only.</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">3. Tech Stack — Fixed</h2>
<pre className="text-xs overflow-x-auto my-4">| Layer | Choice | Version |
|---|---|---|
| Framework | React | 19.x |
| Language | TypeScript | 5.6+ — <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">strict: true</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">noUncheckedIndexedAccess: true</code> |
| Build | Vite | 6.x |
| Styling | Tailwind CSS | 4.x |
| State (server) | TanStack Query | 5.x |
| State (client) | Zustand | 5.x (single slice only — no over-engineering) |
| Forms | React Hook Form + Zod resolvers | latest |
| Validation | Zod | 3.x |
| LLM | Anthropic Claude via <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">@anthropic-ai/sdk</code>, model <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">claude-sonnet-4-5</code> | latest SDK |
| Backend | Node.js + Hono (tiny BFF for API key protection) | 20 LTS |
| Test | Vitest + React Testing Library + Playwright (smoke only) | latest |
| Lint | ESLint flat config + <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">@typescript-eslint/strict-type-checked</code> | latest |
| Format | Prettier | latest |
| CI | GitHub Actions — lint, typecheck, test, build | — |</pre>
<p className="mb-4 leading-relaxed">No other runtime dependencies without justification in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">DECISIONS.md</code>.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">4. Domain Model — Type-First</h2>
<p className="mb-4 leading-relaxed">Create <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">src/domain/claim.ts</code>. These types are the spine of the application. All UI state must conform.</p>
<pre className="bg-stone-100 dark:bg-stone-900 p-4 rounded overflow-x-auto my-4 text-sm"><code>type ClaimId = string &amp; &#123; readonly __brand: 'ClaimId' &#125;;
type IncidentType =
  | 'collision_third_party'
  | 'collision_single_vehicle'
  | 'theft'
  | 'vandalism'
  | 'weather'
  | 'animal_strike'
  | 'unknown';
type ClaimSeverity = 'low' | 'medium' | 'high' | 'total_loss';
type TriageStatus =
  | &#123; kind: 'intake' &#125;
  | &#123; kind: 'gathering'; collectedFields: ReadonlyArray&lt;keyof ClaimDraft&gt; &#125;
  | &#123; kind: 'ai_assessing'; startedAt: number &#125;
  | &#123; kind: 'ai_complete'; assessment: AIAssessment; requiresHumanReview: boolean &#125;
  | &#123; kind: 'human_overridden'; original: AIAssessment; override: HumanDecision &#125;
  | &#123; kind: 'submitted'; claimReference: string; submittedAt: number &#125;
  | &#123; kind: 'failed'; reason: string; recoverable: boolean &#125;;
type AIAssessment = &#123;
  suggestedIncidentType: IncidentType;
  suggestedSeverity: ClaimSeverity;
  confidence: number; // 0.0–1.0
  reasoning: string;
  fraudSignals: ReadonlyArray&lt;FraudSignal&gt;;
  missingInformation: ReadonlyArray&lt;string&gt;;
  recommendedNextAction: 'auto_approve_fast_track' | 'route_to_handler' | 'request_more_info' | 'escalate_siu';
&#125;;
</code></pre>
<p className="mb-4 leading-relaxed">Expand the model to cover <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">ClaimDraft</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">HumanDecision</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">FraudSignal</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">ConversationMessage</code>, and any derived types. <strong>No <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code>. No <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">unknown</code> without a narrowing type guard. No type assertions outside a single <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">src/domain/brand.ts</code> helper module.</strong></p>
<p className="mb-4 leading-relaxed"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">TriageStatus</code> is a discriminated union. All consumers must use exhaustive switch statements with a <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">never</code> default. Provide a helper <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">assertNever(x: never): never</code> in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">src/domain/assertNever.ts</code>.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">5. Required Features</h2>
<h3 className="text-xl font-semibold mt-6 mb-3">5.1 Conversational Intake</h3>
<p className="mb-4 leading-relaxed">A chat-style interface where the user describes an incident in natural language. The LLM extracts structured fields into the <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">ClaimDraft</code> shape. As fields are extracted, they populate a visible <strong>claim summary panel</strong> on the right of the chat — updating in real time as messages are exchanged.</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">The system prompt lives in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">src/ai/systemPrompts/intake.ts</code> — versioned, commented, and exported as a named constant.</li>
<li className="ml-6 list-disc mb-1">Tool use pattern: define a Zod schema for the extraction output, pass it to Claude via structured output (JSON mode or tool calling). Parse the response with Zod. If parsing fails, surface a graceful error state — do not crash, do not silently discard.</li>
<li className="ml-6 list-disc mb-1">Streaming is required. Use SSE or the Anthropic SDK's streaming interface. Show tokens as they arrive.</li>
<li className="ml-6 list-disc mb-1">Typing indicator while the model is working.</li>
<li className="ml-6 list-disc mb-1">Every message carries a timestamp and role. The conversation is rendered from an append-only array.</li>
</ul>
<h3 className="text-xl font-semibold mt-6 mb-3">5.2 AI Assessment Stage</h3>
<p className="mb-4 leading-relaxed">Once the <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">ClaimDraft</code> has the minimum required fields (define and document this threshold), a button appears: <strong>"Run AI Assessment"</strong>. Clicking it transitions <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">TriageStatus</code> to <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">ai_assessing</code>, sends the structured draft to a second LLM call with the assessment prompt (<code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">src/ai/systemPrompts/assessment.ts</code>), and returns an <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">AIAssessment</code>.</p>
<p className="mb-4 leading-relaxed">The assessment UI must display:</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Suggested incident type and severity with visual confidence indicators (not just a percentage — use a bar, a ring, or a typographic treatment that makes low confidence <em>visually uncomfortable</em> to approve).</li>
<li className="ml-6 list-disc mb-1">Reasoning rendered as prose, not bullet points.</li>
<li className="ml-6 list-disc mb-1">Fraud signals as individually acknowledgeable chips (the reviewer must click each one to confirm they've seen it before submission becomes available — this is the human-in-the-loop pattern).</li>
<li className="ml-6 list-disc mb-1">Missing information as a call-to-action list that routes back to the chat.</li>
</ul>
<h3 className="text-xl font-semibold mt-6 mb-3">5.3 Human Override</h3>
<p className="mb-4 leading-relaxed">A reviewer can disagree with the AI. Provide a distinct <strong>"Override AI Assessment"</strong> affordance. Opening this reveals a form to enter the reviewer's decision with a <strong>mandatory free-text justification (min 20 chars)</strong>. On submission, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">TriageStatus</code> transitions to <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">human_overridden</code> and retains the original assessment for audit.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">5.4 Audit Trail</h3>
<p className="mb-4 leading-relaxed">Every state transition and every AI call must be logged to an in-memory event log, visible via a collapsible "Audit Log" drawer. Each entry: timestamp, actor (<code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">user</code> | <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">ai</code> | <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">system</code>), event type, and a JSON payload (collapsible).</p>
<p className="mb-4 leading-relaxed">The audit log must be exportable as JSON via a "Download Audit Log" button. This is the feature that signals you understand regulated-industry expectations.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">5.5 Latency and Failure States</h3>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">All AI calls have a visible loading state. After 8 seconds show a "still working…" message. After 30 seconds offer a cancel button.</li>
<li className="ml-6 list-disc mb-1">All AI calls have explicit error states: network failure, rate limit, schema parse failure, content policy refusal. Each renders a different recovery affordance.</li>
<li className="ml-6 list-disc mb-1">Retries are <strong>user-initiated</strong>, not automatic. No silent retry loops.</li>
</ul>
<h3 className="text-xl font-semibold mt-6 mb-3">5.6 Confidence-Driven Routing UI</h3>
<p className="mb-4 leading-relaxed">If <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">confidence &lt; 0.7</code> OR any fraud signal is present OR severity is <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">total_loss</code>, the <strong>"Auto-approve fast-track"</strong> action is disabled and visually marked as unavailable with a tooltip explaining why. This is a hard UX rule, not a soft suggestion.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">6. BFF (Backend-For-Frontend) Requirements</h2>
<p className="mb-4 leading-relaxed">A minimal Hono server in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">server/</code> exposing exactly these routes:</p>
<pre className="text-xs overflow-x-auto my-4">| Method | Path | Purpose |
|---|---|---|
| <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">POST</code> | <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">/api/triage/chat</code> | Streaming chat completion — proxies to Anthropic |
| <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">POST</code> | <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">/api/triage/assess</code> | Non-streaming structured assessment call |
| <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">GET</code> | <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">/api/health</code> | Returns <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">&#123; status: 'ok', timestamp &#125;</code> |</pre>
<p className="mb-4 leading-relaxed">The Anthropic API key lives in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">server/.env</code> and is <strong>never</strong> exposed to the client. If the client code imports <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">@anthropic-ai/sdk</code> directly, the PR fails review.</p>
<p className="mb-4 leading-relaxed">Rate limiting per-IP (10 req/min) using a simple in-memory token bucket. No Redis — this is a demo.</p>
<p className="mb-4 leading-relaxed">CORS: permissive in dev, restricted to the deployed origin in prod via env var.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">7. Repository Layout</h2>
<pre className="bg-stone-100 dark:bg-stone-900 p-4 rounded overflow-x-auto my-4 text-sm"><code>/
├── README.md
├── DECISIONS.md              # ADR-lite log of every non-obvious choice
├── ARCHITECTURE.md           # Single-diagram + prose explainer
├── CHANGELOG.md
├── .github/
│   └── workflows/
│       └── ci.yml
├── server/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   ├── llm/
│   │   └── middleware/
│   ├── .env.example
│   └── package.json
└── web/
    ├── src/
    │   ├── domain/           # Pure types + brand helpers + assertNever
    │   ├── ai/
    │   │   ├── systemPrompts/
    │   │   └── schemas/      # Zod schemas for LLM output
    │   ├── features/
    │   │   ├── intake/
    │   │   ├── assessment/
    │   │   ├── override/
    │   │   └── audit/
    │   ├── components/       # Dumb, reusable, no business logic
    │   ├── hooks/
    │   ├── lib/
    │   ├── mocks/
    │   ├── stores/           # Zustand — single slice per feature
    │   ├── styles/
    │   ├── App.tsx
    │   └── main.tsx
    ├── tests/
    └── package.json
</code></pre>
<p className="mb-4 leading-relaxed">Monorepo via npm workspaces. No Nx, no Turborepo — scope does not justify them.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">8. README Requirements</h2>
<p className="mb-4 leading-relaxed">The README is the primary recruiter artefact. It must contain, in this order:</p>
<p className="mb-4 leading-relaxed">1. <strong>One-sentence summary</strong> — what this is, for whom.
2. <strong>Live demo link</strong> (Vercel or Cloudflare Pages).
3. <strong>Animated GIF or MP4</strong> (≤ 10s) showing the intake → assessment → override flow.
4. <strong>Why this exists</strong> — 3 short paragraphs framing the problem, the technical interest, and what it proves about the author.
5. <strong>Architecture diagram</strong> — render via Mermaid inline in the README. Show the client, BFF, LLM boundary, and data flow. No hand-waving clouds.
6. <strong>Domain model section</strong> — quote the <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">TriageStatus</code> discriminated union and explain the modelling choice in 4–5 sentences.
7. <strong>Key decisions</strong> — linked out to <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">DECISIONS.md</code>. Highlight: why streaming, why discriminated unions, why mandatory override justification, why human-in-the-loop on fraud signals.
8. <strong>Local setup</strong> — exact commands, tested on a clean machine. If it doesn't work via copy-paste, it's broken.
9. <strong>Running the tests</strong> — commands, coverage target.
10. <strong>Known limitations</strong> — a short, honest list. This section must exist. Omitting it is a red flag to senior reviewers.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">9. Testing Requirements</h2>
<ul className="my-4">
<li className="ml-6 list-disc mb-1"><strong>Unit tests</strong>: 80% coverage of <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">src/domain/</code> and <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">src/ai/schemas/</code>. These are pure functions — no excuse for low coverage.</li>
<li className="ml-6 list-disc mb-1"><strong>Component tests</strong>: cover every state of the assessment panel (loading, success, low-confidence, fraud-signal-present, error).</li>
<li className="ml-6 list-disc mb-1"><strong>Integration test</strong>: one full Playwright smoke test — user describes a collision, AI extracts fields, assessment runs (mocked), human submits override, audit log contains all expected entries. This test uses a mocked Anthropic response, not a real API call.</li>
<li className="ml-6 list-disc mb-1"><strong>Typecheck</strong>: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">tsc --noEmit</code> passes on CI. No <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">@ts-expect-error</code> without a comment explaining why.</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">10. Accessibility</h2>
<p className="mb-4 leading-relaxed">Not optional.
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Every interactive element reachable by keyboard. Focus rings visible, not removed.</li>
<li className="ml-6 list-disc mb-1">Chat messages have correct ARIA live region semantics.</li>
<li className="ml-6 list-disc mb-1">Confidence visualisations have textual equivalents for screen readers.</li>
<li className="ml-6 list-disc mb-1">Colour is not the only signal — confidence and severity use icon + text + colour.</li>
<li className="ml-6 list-disc mb-1">Target: zero axe-core violations on the deployed page. Include axe test in Playwright smoke.</li>
</ul></p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">11. Performance</h2>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Initial JS payload (gzipped) under 200KB. Check with <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">rollup-plugin-visualizer</code> and document the output in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">ARCHITECTURE.md</code>.</li>
<li className="ml-6 list-disc mb-1">No blocking web fonts. Self-host one display font + one body font. <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">font-display: swap</code>.</li>
<li className="ml-6 list-disc mb-1">LCP under 2.0s on a simulated 4G connection. Measure and record in README.</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">12. Deployment</h2>
<p className="mb-4 leading-relaxed">Deploy the frontend to Cloudflare Pages or Vercel. Deploy the BFF to Cloudflare Workers (adapt Hono) or Fly.io. Free tiers only. The live URL is pinned in the repo description.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">13. Acceptance Criteria</h2>
<p className="mb-4 leading-relaxed">The project is complete when <strong>all</strong> of the following are true:</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">[ ] <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">npm install && npm run dev</code> works from a clean clone on macOS and Linux.</li>
<li className="ml-6 list-disc mb-1">[ ] CI passes: lint, typecheck, test, build.</li>
<li className="ml-6 list-disc mb-1">[ ] Live demo is reachable, under 2s LCP, zero console errors.</li>
<li className="ml-6 list-disc mb-1">[ ] A recruiter can understand the project's value in under 2 minutes by reading the README alone.</li>
<li className="ml-6 list-disc mb-1">[ ] A senior engineer reviewing the code finds no <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code>, no unjustified <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">unknown</code>, no unexhaustive switches on discriminated unions, no API keys in the client bundle.</li>
<li className="ml-6 list-disc mb-1">[ ] <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">DECISIONS.md</code> exists and is not empty.</li>
<li className="ml-6 list-disc mb-1">[ ] The animated demo in the README actually loads (not a broken image).</li>
</ul>
<p className="mb-4 leading-relaxed">Anything short of this is not done. Ship when the list is green.</p>
    </>
  );
}
