export const meta = {
  title: "Boxing In the LLM: What a Motor Claims Triage UI Taught Me About Disciplined AI Integration",
  slug: "boxing-in-the-llm",
  date: "2026-04-26",
  author: "Tawanda K",
  category: "AI Integration",
  image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1500&auto=format&fit=crop",
  excerpt: "Most AI-assisted UIs I encounter in the wild share a common failure mode. The LLM sits at the centre, and everything else — UI state, business logic, data integrity — bends around it hoping for the best."
};

export default function BoxingInTheLlm() {
  return (
    <>
      <p>
        Most AI-assisted UIs I encounter in the wild share a common failure mode. The LLM sits at the centre, and everything else — UI state, business logic, data integrity — bends around it hoping for the best. It's the architectural equivalent of building your house around the TV. When the TV breaks, you have no house.
      </p>

      <p>
        I built <a href="https://github.com">an FNOL (First Notification of Loss) triage interface</a> for motor insurance claims to deliberately explore the opposite position: what does it look like to <em>constrain</em> generative AI tightly, to treat its outputs with the same suspicion you'd apply to any external dependency, and to build a system where the LLM's failure modes are survivable by design?
      </p>

      <p>
        This post is a technical breakdown of the decisions I made and, more importantly, <em>why</em> I made them.
      </p>

      <hr />

      <h2>The Problem I Was Solving</h2>

      <p>
        FNOL is the initial contact phase of an insurance claim — the policyholder calls or interacts digitally to report an incident. It's conversational by nature, which makes it an obvious candidate for LLM integration. But it also sits inside a <em>regulated workflow</em> with legal, financial, and operational consequences. An LLM that hallucinates a field value, expresses false confidence, or produces an inconsistent assessment doesn't just degrade user experience — it creates downstream liability.
      </p>

      <p>
        The challenge is not "how do I use an LLM here." It's "how do I use an LLM here <em>without the system becoming dependent on its reliability</em>."
      </p>

      <hr />

      <h2>Decision 1: The BFF as an API Key Firewall</h2>

      <p>
        The first decision is the most unglamorous: don't put the Anthropic API key in the browser.
      </p>

      <p>
        This sounds obvious, but a surprising number of demo projects — and production products — serve it directly to the client or construct API calls from React code. A Hono-based Backend-for-Frontend (BFF) running on Node handles all Anthropic communication. The browser never sees the key.
      </p>

      <pre><code className="language-typescript">{`// server/src/index.ts
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});`}</code></pre>

      <p>
        The BFF does three things beyond key protection: it enforces rate limiting via a simple in-memory token bucket (10 requests per minute per IP), it normalises the streaming response into a consistent SSE format, and it gives me a clean seam to add authentication later without touching the frontend at all.
      </p>

      <pre><code className="language-typescript">{`// Minimal token bucket — not production-distributed, but honest about its limitations
const rateLimit = new Map<string, { tokens: number; lastRefill: number }>();
const MAX_TOKENS = 10;
const REFILL_RATE_MS = 60000;`}</code></pre>

      <p>
        The DECISIONS.md in the repo captures it plainly: <em>putting the Anthropic API key directly in a browser environment is a fast-track to abuse and runaway billing.</em> It's one of those things where the correct choice has zero cleverness to it — that's precisely why it needs to be written down.
      </p>

      <hr />

      <h2>Decision 2: Discriminated Unions as Finite State</h2>

      <p>
        This is the decision I'm most proud of.
      </p>

      <p>
        React applications that integrate async AI tend to accumulate boolean flags. <code>isLoading</code>, <code>isAssessing</code>, <code>hasResult</code>, <code>isOverridden</code>. These booleans proliferate because each new state needs a new flag, and eventually you have combinations that are either impossible or contradictory — but TypeScript doesn't know that. You discover them at runtime, usually in production.
      </p>

      <p>
        I modelled the claim lifecycle as a discriminated union instead:
      </p>

      <pre><code className="language-typescript">{`// web/src/domain/claim.ts
export type TriageStatus =
  | { kind: 'intake' }
  | { kind: 'gathering'; collectedFields: ReadonlyArray<keyof ClaimDraft> }
  | { kind: 'ai_assessing'; startedAt: number }
  | { kind: 'ai_complete'; assessment: AIAssessment; requiresHumanReview: boolean }
  | { kind: 'human_overridden'; original: AIAssessment; override: HumanDecision }
  | { kind: 'submitted'; claimReference: string; submittedAt: number }
  | { kind: 'failed'; reason: string; recoverable: boolean };`}</code></pre>

      <p>
        The key consequence: <code>ai_assessing</code> and <code>human_overridden</code> cannot coexist. <code>ai_complete</code> always carries its assessment payload — there is no <code>ai_complete</code> without an <code>AIAssessment</code>. Every component that reads this state goes through an exhaustive switch, and <code>assertNever</code> on the default branch means the compiler tells you when you've missed a case.
      </p>

      <pre><code className="language-typescript">{`// web/src/domain/assertNever.ts
export function assertNever(x: never): never {
  throw new Error(\`Unexpected object: \${JSON.stringify(x)}\`);
}`}</code></pre>

      <p>
        This pattern eliminates an entire class of bugs. It also forces you to think clearly about the state machine <em>before</em> you wire up the AI — because you have to name every state the system can occupy. That design exercise alone is worth doing even if you never write the assertion.
      </p>

      <hr />

      <h2>Decision 3: Zod Schemas as the LLM Contract</h2>

      <p>
        The LLM does two distinct jobs here: conversational intake and structured assessment. Both are governed by Zod schemas that define exactly what the model is permitted to output.
      </p>

      <p>
        For intake, the tool call schema extracts structured fields from natural conversation:
      </p>

      <pre><code className="language-typescript">{`// web/src/ai/schemas/intake.ts
export const claimDraftSchema = z.object({
  incidentDate: z.string().optional(),
  incidentDescription: z.string().optional(),
  vehicleDrivable: z.boolean().optional(),
  partiesInvolved: z.number().optional(),
  injuriesPresent: z.boolean().optional(),
  policeContacted: z.boolean().optional(),
});`}</code></pre>

      <p>
        For assessment, the schema is more opinionated — constrained enums rather than open strings, a bounded confidence float, a typed recommended action:
      </p>

      <pre><code className="language-typescript">{`// web/src/ai/schemas/assessment.ts
export const assessmentSchema = z.object({
  suggestedIncidentType: z.enum([
    'collision_third_party',
    'collision_single_vehicle',
    'theft',
    'vandalism',
    'weather',
    'animal_strike',
    'unknown'
  ]),
  suggestedSeverity: z.enum(['low', 'medium', 'high', 'total_loss']),
  confidence: z.number().min(0.0).max(1.0),
  reasoning: z.string(),
  fraudSignals: z.array(z.object({ id: z.string(), description: z.string() })),
  missingInformation: z.array(z.string()),
  recommendedNextAction: z.enum([
    'auto_approve_fast_track',
    'route_to_handler',
    'request_more_info',
    'escalate_siu'
  ]),
});`}</code></pre>

      <p>
        The schemas are sent to the BFF as JSON Schema (via <code>zod-to-json-schema</code>) and used as Anthropic tool definitions. The model is constrained to fill valid shapes. On the way back in, <code>assessmentSchema.parse()</code> validates the tool call output before it ever touches application state.
      </p>

      <p>
        If the LLM returns something that violates the contract, the parse throws, the <code>onError</code> handler fires, and the status transitions to <code>{`{`} kind: 'failed', reason: ..., recoverable: true {`}`}</code>. The system degrades gracefully rather than silently accepting bad data.
      </p>

      <hr />

      <h2>Decision 4: The Confidence Signal Drives Business Logic</h2>

      <p>
        The confidence score is not cosmetic. It gates what actions are available:
      </p>

      <pre><code className="language-typescript">{`// web/src/features/assessment/AssessmentPanel.tsx
const canAutoApprove = assessment.recommendedNextAction === 'auto_approve_fast_track' 
    && assessment.confidence >= 0.7 
    && assessment.severity !== 'total_loss'
    && assessment.fraudSignals.length === 0;`}</code></pre>

      <p>
        Below 0.7 confidence, the fast-track action is disabled regardless of what the model recommended. Total loss claims always require human review regardless of confidence. And if fraud signals are present, the handler must acknowledge each one explicitly — clicking a chip — before any downstream action becomes available.
      </p>

      <p>
        This is the pattern I'd describe as <em>confidence-aware routing</em>. The LLM expresses uncertainty through a numeric signal, and the application uses that signal to determine how much human oversight is required. High confidence on a low-severity, no-fraud claim flows straight through. Low confidence on anything escalates.
      </p>

      <p>
        The system prompt reinforces this at the model level too:
      </p>

      <pre><code className="language-typescript">{`// web/src/ai/systemPrompts/assessment.ts
// ...If severity is total_loss, confidence is < 0.7, or there are any fraud signals,
// you CANNOT recommend 'auto_approve_fast_track'.`}</code></pre>

      <p>
        It's defense in depth applied to AI output: the prompt instructs the model not to recommend fast-track in these conditions, <em>and</em> the UI independently enforces it regardless of what the model says. Neither layer trusts the other unconditionally.
      </p>

      <hr />

      <h2>Decision 5: Human Override with Mandatory Friction</h2>

      <p>
        Soft overrides are a habituation trap.
      </p>

      <p>
        If a claims handler can override an AI flag with a single click, they will do it reflexively. The decision becomes a gesture rather than a judgement. This is well-documented in human factors research and in the behavioural economics literature around alarm fatigue — if the cost of dismissal is zero, dismissal becomes automatic.
      </p>

      <p>
        The override panel requires a text justification of at least 20 characters before submission:
      </p>

      <pre><code className="language-typescript">{`// web/src/features/override/OverridePanel.tsx
const overrideSchema = z.object({
  overrideType: z.enum([...]),
  overrideSeverity: z.enum(['low', 'medium', 'high', 'total_loss']),
  justification: z.string().min(20, "Justification must be at least 20 characters length."),
});`}</code></pre>

      <p>
        Twenty characters isn't a large cognitive load. But it's enough to break the zero-friction dismissal path. You can't click through it. You have to type something — and typing something means forming a thought. The friction is the feature.
      </p>

      <p>
        The override, once submitted, transitions status to <code>human_overridden</code> with both the original AI assessment and the human decision preserved. The audit trail captures both. Downstream analytics could surface patterns: which handlers override most often, which fraud signals get dismissed, which confidence thresholds correlate with incorrect AI assessments. The justification strings become training signal.
      </p>

      <hr />

      <h2>Decision 6: An In-Memory Audit Log as First-Class Citizen</h2>

      <p>
        Every meaningful state transition in the application is logged to a structured audit trail:
      </p>

      <pre><code className="language-typescript">{`// From triageStore.ts
logEvent('system', 'assessment_started', { draft });
logEvent('ai', 'assessment_completed', assessment);
logEvent('user', 'ai_assessment_overridden', { decision, originalAssessment });`}</code></pre>

      <p>
        Each event carries actor (user / ai / system), event type, timestamp, and a typed payload. The audit log is a Zustand slice that persists in memory for the session and can be downloaded as JSON from the UI.
      </p>

      <p>
        In production this would be an append-only event store — the DECISIONS.md notes it's currently in-memory and would fail in a distributed deployment. But the <em>interface</em> for capturing events is clean, and migrating to a durable backend means changing one function's implementation rather than rearchitecting the call sites.
      </p>

      <p>
        The audit trail also serves as a second-order design pressure. When you know every action will be logged, you think more carefully about what the actions are and who performs them. The events are effectively an event-sourced record of the claim intake — which means you can replay the state of any claim at any point in time if you want.
      </p>

      <hr />

      <h2>What I'd Do Differently in Production</h2>

      <p>
        A few honest gaps:
      </p>

      <p>
        <strong>PII handling.</strong> Claim descriptions contain names, addresses, and incident details. Currently these pass raw to the Anthropic API with no masking or redaction. A production system needs a PII detection layer before the API call — either a local NER model or a service like Microsoft Presidio. Claim data leaking into third-party training pipelines is a real regulatory exposure in GDPR/FCA regulated environments.
      </p>

      <p>
        <strong>SSE stream parsing.</strong> The stream parsing in <code>useChatCompletion.ts</code> is a manual buffer-accumulation approach. It works, but it's fragile against malformed chunks and doesn't handle reconnection. The Anthropic SDK's <code>stream.toReadableStream()</code> or a dedicated SSE library would be more robust.
      </p>

      <p>
        <strong>Distributed rate limiting.</strong> The in-memory token bucket works for a single process. In a horizontally scaled deployment, each instance has its own counter and you lose the protection. Redis-backed rate limiting (or a service like Upstash) is the correct fix.
      </p>

      <p>
        <strong>Authentication context.</strong> The current implementation has no concept of a logged-in user. In a real claims environment you'd need to know <em>who</em> is operating the interface — both for access control (only authorised handlers can override) and for the audit trail (user IDs, not just actors).
      </p>

      <hr />

      <h2>The Principle Behind All of It</h2>

      <p>
        There's a thread running through all six decisions: the LLM is treated as an <em>external dependency with an unreliable contract</em>, not as a trustworthy orchestrator.
      </p>

      <p>
        It gets a constrained input surface (typed schemas, explicit system prompts). Its outputs are validated before they touch state (Zod parse). Its confidence signal feeds business logic that operates independently of its recommendations. Its mistakes are recoverable (the <code>failed</code> state, the override path). Every action it influences is logged.
      </p>

      <p>
        This is not scepticism about LLM capability. It's standard defensive engineering applied to a new type of component. We validate database query results. We handle network errors. We don't trust user input. The reasoning that applies to those integrations applies equally to language model integrations — the failure modes are just different in character.
      </p>

      <p>
        The goal isn't to eliminate the AI. It's to build a system that's useful <em>because</em> of the AI, but not fragile <em>because of</em> the AI.
      </p>

      <p>
        Those two things are different. Getting them right is the work.
      </p>

      <hr />

      <p>
        <em>The full source is available on GitHub. The DECISIONS.md is probably the most honest part of the repo — read that first.</em>
      </p>

      <p>
        <em>Posted to <a href="https://www.klish3.com/scribbles">klish3.com/scribbles</a></em>
      </p>
    </>
  );
}
