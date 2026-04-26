export const meta = {
  title: "Project 03 \u2014 Fraud Signal Dashboard",
  slug: "03-fraud-signal-dashboard",
  date: "2026-04-19",
  author: "Tawanda K",
  category: "Technical Project",
  image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80",
  excerpt: "You are building a public GitHub portfolio project for a Frontend Technical Lead targeting Staff/Principal roles at payments/fintech companies (Checko..."
};

export default function Project03FraudSignalDashboard() {
  return (
    <>
      {/* NOTE: This component was auto-generated from Markdown */}
      <h1 className="text-3xl font-bold mt-8 mb-4">Project 03 — Fraud Signal Dashboard</h1>
<p className="mb-4 leading-relaxed"><strong>Agent:</strong> You are building a public GitHub portfolio project for a Frontend Technical Lead targeting Staff/Principal roles at payments/fintech companies (Checkout.com, Revolut, Monzo). The deliverable is a real-time fraud signals dashboard that proves the author can build dense, performant, trustworthy data-heavy interfaces. Execute the specification exactly as written. Deviations require a written justification in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">DECISIONS.md</code>.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">1. Objective</h2>
<p className="mb-4 leading-relaxed">Build a single-page dashboard application that visualises <strong>simulated real-time payment fraud signals</strong> for an operations/analytics audience. The interface must demonstrate:</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Real-time data ingestion via WebSockets with graceful reconnect</li>
<li className="ml-6 list-disc mb-1">High-density but legible data visualisation</li>
<li className="ml-6 list-disc mb-1">Fast filtering and drill-down across 10k+ synthetic events</li>
<li className="ml-6 list-disc mb-1">Clear, non-decorative visual language — nothing performative, nothing that hides the signal in chart-junk</li>
<li className="ml-6 list-disc mb-1">Type-safe end-to-end data contracts</li>
</ul>
<p className="mb-4 leading-relaxed">This is a recruiter-facing artefact. A staff engineer at a payments firm must be able to scan the README, run the project locally, and within 3 minutes conclude "this person has built this kind of system before."</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">2. Non-Goals</h2>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> build a real fraud detection model. Signals are rule-based and simulated.</li>
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> build authentication. Single-user demo.</li>
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> persist to a real database. Event history lives in an in-memory ring buffer with optional IndexedDB mirror.</li>
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> handle real PII. All data is synthetic, generated from seeded faker config.</li>
<li className="ml-6 list-disc mb-1">Do <strong>not</strong> build a case management system. This is a monitoring surface, not a workflow tool.</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">3. Tech Stack — Fixed</h2>
<pre className="text-xs overflow-x-auto my-4">| Layer | Choice |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.6+, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">strict: true</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">noUncheckedIndexedAccess: true</code> |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 + CSS custom properties for theming |
| Charts | Recharts 2.x for most; D3 selection only where Recharts can't express the shape (document in DECISIONS.md) |
| State | Zustand 5 + TanStack Query 5 |
| Real-time | Native WebSocket API on the client; &lt;code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm"&gt;ws&lt;/code&gt; on the server |
| Event generator | Node.js + seeded &lt;code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm"&gt;@faker-js/faker&lt;/code&gt; |
| Virtualisation | TanStack Virtual for the events table |
| Forms | React Hook Form + Zod |
| Test | Vitest + React Testing Library + Playwright |
| Lint | ESLint flat config + &lt;code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm"&gt;@typescript-eslint/strict-type-checked&lt;/code&gt; |
| CI | GitHub Actions |</pre>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">4. Domain Model</h2>
<p className="mb-4 leading-relaxed">Create <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">src/domain/events.ts</code>. These types are load-bearing. No deviation.</p>
<pre className="bg-stone-100 dark:bg-stone-900 p-4 rounded overflow-x-auto my-4 text-sm">
  <code>type EventId = string & &#123; readonly __brand: 'EventId' &#125;;
type MerchantId = string & &#123; readonly __brand: 'MerchantId' &#125;;
type CustomerId = string & &#123; readonly __brand: 'CustomerId' &#125;;
type Currency = 'GBP' | 'EUR' | 'USD';
type PaymentChannel = 'card_present' | 'card_not_present' | 'open_banking' | 'wallet';
type FraudSignalType =
  | 'velocity_breach'        // N transactions / window
  | 'geo_mismatch'           // IP country vs billing country
  | 'amount_anomaly'         // z-score on customer history
  | 'bin_attack_pattern'     // sequential BIN testing
  | 'device_reputation'      // flagged device fingerprint
  | 'chargeback_neighbourhood'; // shared-attribute cluster
type RiskBand = 'low' | 'medium' | 'high' | 'critical';
type PaymentEvent = &#123;
  readonly id: EventId;
  readonly timestamp: number;
  readonly merchantId: MerchantId;
  readonly customerId: CustomerId;
  readonly amountMinor: number;     // store in minor units. always.
  readonly currency: Currency;
  readonly channel: PaymentChannel;
  readonly signals: ReadonlyArray&lt;FraudSignalType&gt;;
  readonly riskScore: number;       // 0–1000
  readonly riskBand: RiskBand;
  readonly decision: 'approved' | 'challenged' | 'declined' | 'review';
  readonly latencyMs: number;
&#125;;
</code>
</pre>
<p className="mb-4 leading-relaxed">Additional types to model: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">AggregateMetric</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">TimeWindow</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">Filter</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">AlertRule</code>. No <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code>, no <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">unknown</code> without guards, no type assertions outside a single <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">brand.ts</code> helper.</p>
<p className="mb-4 leading-relaxed">Currency amounts are <strong>always</strong> stored and transmitted in minor units (pence, cents). Formatting happens at the render boundary only. This is non-negotiable for a fintech-targeted portfolio piece.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">5. Required Views</h2>
<p className="mb-4 leading-relaxed">The dashboard is a single page with four regions. No routing. The whole thing is navigable with keyboard alone.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">5.1 Header strip</h3>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">App name</li>
<li className="ml-6 list-disc mb-1">Live/Paused toggle (pauses the event stream without disconnecting the socket)</li>
<li className="ml-6 list-disc mb-1">Connection status indicator (connected, reconnecting, disconnected)</li>
<li className="ml-6 list-disc mb-1">Current time window selector: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">5m | 15m | 1h | 6h | 24h</code></li>
<li className="ml-6 list-disc mb-1">Theme toggle (light/dark)</li>
</ul>
<h3 className="text-xl font-semibold mt-6 mb-3">5.2 KPI tiles — top row</h3>
Five tiles showing, for the selected window:
1. Total events
2. Events per second (rolling 10s)
3. Approval rate (%)
4. Average risk score
5. Critical signals count
<p className="mb-4 leading-relaxed">Each tile shows the current value large, a delta vs the previous equivalent window (e.g. <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">+12.4% vs prior 1h</code>), and a 60-point sparkline.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">5.3 Signal distribution panel</h3>
A stacked area chart showing fraud signal types over time within the selected window. Legend is clickable — clicking a signal type toggles it in/out of the chart and in/out of the events table filter. State is shared.
<h3 className="text-xl font-semibold mt-6 mb-3">5.4 Risk heatmap</h3>
A 2D heatmap: <strong>time (x)</strong> × <strong>merchant category (y)</strong>. Cell colour = average risk score. Hover reveals event count and a "drill in" affordance that filters the events table to that cell's slice.
<h3 className="text-xl font-semibold mt-6 mb-3">5.5 Events table</h3>
Virtualised table of events, newest at top.
<p className="mb-4 leading-relaxed">Columns: timestamp, merchant, amount, channel, signals (chips), risk band, decision.</p>
<p className="mb-4 leading-relaxed">Features:</p>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Virtual scroll handling 10k+ rows at 60fps</li>
<li className="ml-6 list-disc mb-1">Column sort (timestamp, amount, risk score)</li>
<li className="ml-6 list-disc mb-1">Multi-column filter via a filter bar above the table (signals, risk band, decision, channel, amount range)</li>
<li className="ml-6 list-disc mb-1">Row click opens a detail drawer on the right with the full event payload, a mini timeline of the customer's recent events, and a "copy event JSON" button</li>
<li className="ml-6 list-disc mb-1">Filter state is URL-synced so a link reproduces the view</li>
</ul>
<h3 className="text-xl font-semibold mt-6 mb-3">5.6 Alert rules panel (collapsible, right side)</h3>
The user can define simple alert rules:
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Example: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">risk_band = critical AND amount_minor &gt; 100000 AND signals includes velocity_breach → visual+sound alert</code></li>
<li className="ml-6 list-disc mb-1">Rules evaluated client-side against incoming events</li>
<li className="ml-6 list-disc mb-1">When an alert fires, a toast appears and the event row pulses once in the table</li>
<li className="ml-6 list-disc mb-1">Rule management UI with Zod-validated form</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">6. Event Generator (Server)</h2>
<p className="mb-4 leading-relaxed"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">server/</code> contains a Node.js WebSocket server that generates synthetic events.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">6.1 Behaviour</h3>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Emits events at a configurable rate (default 25/sec, min 1/sec, max 200/sec).</li>
<li className="ml-6 list-disc mb-1">Each event is seeded from <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">faker</code> with a deterministic seed passed via env var — so the same seed produces the same stream. This matters for reproducible demos.</li>
<li className="ml-6 list-disc mb-1">The generator follows a realistic distribution: 85% low risk, 10% medium, 4% high, 1% critical. Skew can be adjusted via env var.</li>
<li className="ml-6 list-disc mb-1">Periodically injects correlated bursts (e.g. a 20-event BIN-attack pattern in 3 seconds) to make the dashboard visually interesting during demos.</li>
</ul>
<h3 className="text-xl font-semibold mt-6 mb-3">6.2 WebSocket protocol</h3>
<p className="mb-4 leading-relaxed">All messages are JSON. Schemas defined with Zod in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">shared/schemas.ts</code> (imported by both client and server).</p>
<p className="mb-4 leading-relaxed">Message types:
<ul className="my-4">
<li className="ml-6 list-disc mb-1"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">server → client</code>: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">&#123; type: 'event', payload: PaymentEvent &#125;</code></li>
<li className="ml-6 list-disc mb-1"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">server → client</code>: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">&#123; type: 'heartbeat', timestamp: number &#125;</code></li>
<li className="ml-6 list-disc mb-1"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">server → client</code>: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">&#123; type: 'rate_change', eventsPerSecond: number &#125;</code></li>
<li className="ml-6 list-disc mb-1"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">client → server</code>: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">&#123; type: 'set_rate', eventsPerSecond: number &#125;</code></li>
<li className="ml-6 list-disc mb-1"><code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">client → server</code>: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">&#123; type: 'set_seed', seed: string &#125;</code></li>
</ul></p>
<p className="mb-4 leading-relaxed">Heartbeat every 10s. Client treats missing heartbeat for 25s as disconnected.</p>
<h3 className="text-xl font-semibold mt-6 mb-3">6.3 Reconnect</h3>
<p className="mb-4 leading-relaxed">The client reconnects with exponential backoff (1s, 2s, 4s, 8s, cap 30s). On reconnect, it re-establishes subscriptions and fetches a snapshot of the last 60s of events via a REST endpoint <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">GET /api/events/backfill?seconds=60</code>.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">7. Performance Requirements</h2>
<p className="mb-4 leading-relaxed">These are hard requirements. Measure and record the results in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">PERFORMANCE.md</code>.
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Dashboard remains at <strong>≥ 55fps</strong> while ingesting 50 events/sec with the events table, heatmap, and charts all visible.</li>
<li className="ml-6 list-disc mb-1">Events table scroll is smooth at 60fps with 10,000 rows.</li>
<li className="ml-6 list-disc mb-1">Initial JS payload (gzipped) under 300KB. Check with <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">rollup-plugin-visualizer</code>.</li>
<li className="ml-6 list-disc mb-1">LCP under 2.0s on simulated 4G.</li>
<li className="ml-6 list-disc mb-1">No memory leaks over a 10-minute session at 50 events/sec. Verified via Chrome DevTools heap snapshots — include before/after screenshots in <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">PERFORMANCE.md</code>.</li>
</ul></p>
<p className="mb-4 leading-relaxed">The event ingest pipeline must use a <strong>batching strategy</strong>: events arriving within a 100ms window are coalesced into a single state update. Do not call <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">setState</code> per event. This is the performance-lead-level detail reviewers are scanning for.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">8. Repository Structure</h2>
<pre className="bg-stone-100 dark:bg-stone-900 p-4 rounded overflow-x-auto my-4 text-sm"><code>/
├── README.md
├── DECISIONS.md
├── ARCHITECTURE.md
├── PERFORMANCE.md
├── CHANGELOG.md
├── .github/workflows/ci.yml
├── shared/
│   └── schemas.ts            # Zod schemas shared by client + server
├── server/
│   ├── src/
│   │   ├── index.ts
│   │   ├── generator/
│   │   ├── patterns/         # Correlated burst injectors
│   │   └── ws/
│   └── package.json
└── web/
    ├── src/
    │   ├── domain/
    │   ├── features/
    │   │   ├── connection/
    │   │   ├── kpis/
    │   │   ├── signals-chart/
    │   │   ├── heatmap/
    │   │   ├── events-table/
    │   │   ├── event-detail/
    │   │   └── alerts/
    │   ├── components/       # Dumb, no business logic
    │   ├── hooks/
    │   ├── lib/
    │   ├── stores/
    │   ├── styles/
    │   └── App.tsx
    ├── tests/
    └── package.json
</code></pre>
<p className="mb-4 leading-relaxed">pnpm workspaces. Shared schemas referenced from <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">shared/</code>.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">9. Visual Design Constraints</h2>
<p className="mb-4 leading-relaxed">This is the part most portfolios get wrong. Read carefully.
<ul className="my-4">
<li className="ml-6 list-disc mb-1"><strong>No gratuitous colour.</strong> The palette has one neutral, one emphasis, and four risk-band colours (low/med/high/critical). That is the entire palette.</li>
<li className="ml-6 list-disc mb-1"><strong>Risk colours are not red-yellow-green.</strong> Use an accessible, non-cliché scale — e.g. blue → violet → magenta → red for low→critical. Document the choice. Both palettes (light/dark) must pass WCAG AA for text on colour.</li>
<li className="ml-6 list-disc mb-1"><strong>Numbers dominate.</strong> Large, tabular-figure numeric displays on the KPI tiles. Use a monospaced or tabular-number variant.</li>
<li className="ml-6 list-disc mb-1"><strong>Typography:</strong> one display face for numerics, one body face. Both self-hosted. No <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">Inter</code>, no <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">Roboto</code>, no system stack default. Recommended: a grotesque like <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">Söhne</code>/<code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">Haffer</code>/<code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">GT America</code> (whichever has an open-source permissive equivalent — <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">Geist</code> is acceptable; <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">Inter</code> is not).</li>
<li className="ml-6 list-disc mb-1"><strong>No drop shadows, no gradients on cards.</strong> Data density beats decoration. If it looks like a 2021 SaaS landing page, it's wrong.</li>
<li className="ml-6 list-disc mb-1"><strong>Motion is functional only.</strong> Row pulse on new alert. Skeleton on reconnect. Nothing else. No page transitions, no hover elevation, no scroll-triggered anything.</li>
</ul></p>
<p className="mb-4 leading-relaxed">If the final output looks like a Dribbble shot, you have failed. It should look like a Bloomberg terminal that a designer was allowed to breathe on for two weeks.</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">10. Accessibility</h2>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">All charts have a textual summary alternative (<code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">aria-label</code> with the computed headline).</li>
<li className="ml-6 list-disc mb-1">All interactive chart elements are keyboard-reachable where meaningful; where not (e.g. heatmap cells), provide an equivalent table view toggle.</li>
<li className="ml-6 list-disc mb-1">Events table uses correct ARIA grid semantics.</li>
<li className="ml-6 list-disc mb-1">Colour alone is never the signal for risk band. Use colour + label + icon.</li>
<li className="ml-6 list-disc mb-1">Zero axe-core violations on the deployed page. Enforced in CI via Playwright axe test.</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">11. Testing Requirements</h2>
<ul className="my-4">
<li className="ml-6 list-disc mb-1"><strong>Unit tests ≥ 80% coverage</strong> for <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">domain/</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">lib/</code>, reducers/selectors.</li>
<li className="ml-6 list-disc mb-1"><strong>Component tests</strong> for each feature's primary state: loading, populated, error, empty.</li>
<li className="ml-6 list-disc mb-1"><strong>Integration tests</strong> (Playwright):</li>
<li className="ml-6 list-disc mb-1">Connect, receive 100 events, verify KPI tiles update</li>
<li className="ml-6 list-disc mb-1">Apply signal filter, verify events table + chart both update</li>
<li className="ml-6 list-disc mb-1">Simulate disconnect, verify reconnect, verify backfill merges correctly with no duplicates</li>
<li className="ml-6 list-disc mb-1">Define an alert rule, inject a matching event, verify alert fires and row pulses</li>
<li className="ml-6 list-disc mb-1"><strong>Performance regression test</strong>: a Vitest benchmark for the event batching reducer. Budget: process 1000 events in &lt; 50ms on CI.</li>
<li className="ml-6 list-disc mb-1"><strong>No flaky tests.</strong> A flaky test is a broken test. Fix or delete.</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">12. README Structure</h2>
<p className="mb-4 leading-relaxed">1. One-sentence summary
2. Live demo link
3. 10-second MP4 or GIF showing live event ingestion and an alert firing
4. Why this exists — the fintech-targeted version of the pitch
5. Architecture — Mermaid diagram showing generator → WS → client pipeline
6. Domain model — quote <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">PaymentEvent</code> and explain the minor-units decision
7. Performance — link to <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">PERFORMANCE.md</code>, quote the headline numbers (fps at rate, payload size, LCP)
8. Key decisions — link to <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">DECISIONS.md</code>, highlight: batching strategy, why Recharts over D3, reconnect/backfill approach
9. Local setup — exact commands, tested clean
10. Known limitations — must exist, must be honest</p>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">13. Deployment</h2>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">Web client: Cloudflare Pages or Vercel</li>
<li className="ml-6 list-disc mb-1">WebSocket server: Fly.io or Railway (cheapest tier)</li>
<li className="ml-6 list-disc mb-1">Demo seed fixed in production so the demo is reproducible for recruiters</li>
<li className="ml-6 list-disc mb-1">URL pinned in repo description</li>
</ul>
<hr className="my-8 border-stone-200 dark:border-stone-800" />
<h2 className="text-2xl font-semibold mt-8 mb-4">14. Acceptance Criteria</h2>
<ul className="my-4">
<li className="ml-6 list-disc mb-1">[ ] <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">pnpm install && pnpm dev</code> works from a clean clone.</li>
<li className="ml-6 list-disc mb-1">[ ] CI green: lint, typecheck, tests (unit + component + integration), bench, build.</li>
<li className="ml-6 list-disc mb-1">[ ] Live demo reachable, zero console errors, zero axe violations.</li>
<li className="ml-6 list-disc mb-1">[ ] Demo video embedded in README actually loads.</li>
<li className="ml-6 list-disc mb-1">[ ] 10,000-row events table scrolls at 60fps on a 2020-era MacBook Air.</li>
<li className="ml-6 list-disc mb-1">[ ] Event batching implementation exists and is tested.</li>
<li className="ml-6 list-disc mb-1">[ ] Reconnect works — killable via server restart, recovers within 10s without data loss.</li>
<li className="ml-6 list-disc mb-1">[ ] No <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">any</code>, no unjustified <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">unknown</code>, no non-exhaustive discriminated-union switches.</li>
<li className="ml-6 list-disc mb-1">[ ] All currency is stored in minor units; formatting happens at the render boundary only.</li>
<li className="ml-6 list-disc mb-1">[ ] <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">DECISIONS.md</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">ARCHITECTURE.md</code>, <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded text-sm">PERFORMANCE.md</code> exist and are substantive.</li>
</ul>
<p className="mb-4 leading-relaxed">Ship when green. Not before.</p>
    </>
  );
}
