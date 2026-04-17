export const meta = {
  title: "Modernising an Enterprise Front-End - From Monoliths to Micro-Frontends (and the Power of a Front-End Guild)",
  slug: "modernising-an-enterprise-front-end",
  date: "2024-04-12",
  author: "Tawanda K",
  category: "Front-End Architecture",
  image: "https://images.unsplash.com/photo-1775510978826-e95b14db6ae6?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  excerpt: "Enterprise front-end development is evolving rapidly, especially for organisations juggling multiple brands, legacy systems, and growing engineering teams. As a Technical Lead at an insurance company, I’ve led efforts to modernise our front-end architecture – moving from a monolithic, tightly-coupled web application (with even some parts embedded via iframes) to a more modular micro-frontend architecture using Webpack Module Federation. In parallel, I spearheaded a cross-team Front-End Guild to ensure that this technical evolution was paired with organisational alignment, shared standards, and innovation."
};

export default function ModernisingEnterprise() {
  return (
    <>
      <p>
        <strong>Enterprise front-end development is evolving rapidly</strong>, especially for organisations juggling multiple brands, legacy systems, and growing engineering teams. As a Technical Lead at an insurance company, I’ve led efforts to modernise our front-end architecture – moving from a monolithic, tightly-coupled web application (with even some parts embedded via iframes) to a more modular <strong>micro-frontend architecture</strong> using Webpack Module Federation. In parallel, I spearheaded a cross-team <strong>Front-End Guild</strong> to ensure that this technical evolution was paired with organisational alignment, shared standards, and innovation.
      </p>

      <p>
        In this comprehensive post, I’ll share <strong>real-world insights</strong> from our journey: why we needed to modernise, how micro-frontends and shared component libraries solved our challenges, and how the Front-End Guild became a catalyst for consistency and innovation. I’ll also discuss the challenges we faced – from dependency management to design consistency – and how we tackled them.
      </p>

      <h2>From Legacy to Modern: Why We Needed a Front-End Overhaul</h2>

      <p>
        Our journey began with <strong>recognising the limitations of our existing front-end setup</strong>. A few years ago, we had a large single-page application (SPA) serving our insurance customer portal – essentially a <strong>monolithic front-end</strong>. Over time, this application became harder to maintain as more features and brands were added. Different product squads had to coordinate releases tightly because everything was bundled together. This coupling meant slower releases and tricky merges. In one case, parts of our digital claims process had been integrated using an <strong>iframe</strong>, essentially embedding one web application inside another. This stopgap measure allowed us to plug in a separately developed feature (a “dashboard” UI) into the main portal, but it introduced problems: <strong>inconsistent user experience, duplicated frameworks loaded in the browser, and complicated authentication flows</strong> (we had to hack around how the iframe passed auth tokens). It was clear that as we expanded our digital services – and as our company took on new partner brands – the old approach wouldn’t scale.
      </p>

      <p>Several factors drove us to reconsider our front-end architecture:</p>

      <ul>
        <li><strong>Multiple Brands & White-Label Requirements:</strong> We operate several insurance brands (for example, esure and Sheilas’ Wheels are sister brands), and we also onboarded partner brands like RIAS ((part of the Ageas group, known internally as “AGS”)) as white-label offerings. Each brand carried its own style guide and design system quirks. Initially, our solution was to fork or theme the front-end for each brand, but that led to <strong>divergent codebases and duplicated effort</strong>. We needed a way to support multiple <strong>design systems</strong> without fragmenting our code.</li>
        <li><strong>Growing Teams & Feature Streams:</strong> Our engineering organisation scaled into multiple squads, each focusing on different parts of the customer journey (Quotes, Claims, Self-Service, etc.). The monolithic front-end became a bottleneck – all squads had to work in the same codebase, and releases were entangled. We wanted to give teams more autonomy via a modular architecture where different parts of the site could be developed and deployed independently.</li>
        <li><strong>Legacy Constraints:</strong> The tech stack and pipeline needed updates. Some of our front-end builds were still on older tooling (e.g. Webpack 4 and older versions of React), and spinning up a new test environment could take an inordinately long time due to manual processes. In fact, provisioning a full new environment for a brand or feature used to take <strong>several development sprints</strong>. This was recently highlighted when we contrasted our legacy process with a new automated approach: what once took <em>“four sprints”</em> of effort can now be done in <em>“six minutes”</em> with the right tooling. More on that later – but clearly, the old way of working was hindering our ability to innovate quickly.</li>
      </ul>

      <p>
        In summary, <strong>the combination of multi-brand design divergence, a tightly-coupled front-end, and outdated manual processes signalled it was time for a change</strong>. We set out a multi-pronged modernisation strategy, focusing on architecture (through micro-frontends), consistency (through a shared design system), and efficiency (through automation). Equally important, we established a <strong>Front-End Guild</strong> to bring all stakeholders on this journey together and make decisions collaboratively.
      </p>

      <h2>Embracing Micro-Frontend Architecture with Module Federation</h2>

      <p>
        One of the biggest changes was adopting a <strong>micro-frontend architecture</strong>. Similar to how microservices break back-end monoliths into smaller, independent services, <strong>micro-frontends</strong> break the UI into semi-independent “mini-applications” that are composed into a larger application. In our case, we wanted to replace the clunky iframe integration and allow different parts of our customer portal to be delivered by different teams without stepping on each other’s toes.
      </p>

      <p>
        <strong>Module Federation (Webpack 5):</strong> The enabler for our micro-frontend approach was Webpack 5’s Module Federation plugin. This technology allows one JavaScript application to dynamically load code from another bundle at runtime as if it were part of its own build. In simpler terms, <strong>one team’s app can seamlessly consume UI components or even entire features from another team’s app</strong> – all in the user’s browser. We structured our portal to have a main container (often called a “shell”) and multiple <strong>remotes</strong> (the independently deployed micro-apps). For example, our <strong>Claims Dashboard</strong> and <strong>First Notice of Loss (FNOL) form</strong> became separate micro-frontends. The shell automatically pulls in the latest version of each micro-frontend at runtime.
      </p>

      <p>
        <strong>Why not stick with iframes?</strong> Unlike an iframe, Module Federation allows micro-apps to share runtime context and resources. In our legacy setup, the claims dashboard running in an iframe was isolated – it loaded its own copy of React and styles, and any cross-communication (like notifying the parent app of an updated claim status) was clunky. With Module Federation, all microfrontends run in the <strong>same page context</strong>, so they can easily call shared functions or update shared state. It also means we can <strong>share common libraries</strong> instead of each app bundling its own copy. For instance, we designate core dependencies such as React, our design system components, and utility libraries as <em>singletons</em> in the Module Federation configuration. This ensures the host shell provides one instance of React that all microfrontends use, preventing duplicate copies (and thus reducing bundle size and consistency issues).
      </p>

      <p>
        <strong>Decoupled Deployment:</strong> Each micro-frontend is built and deployed independently. Our teams now manage their own release cycles for their respective front-end slices – for example, the Quotes team can deploy a new version of the Quotes micro-frontend without having to coordinate a full portal release, as long as they haven’t changed the contract with the shell. The shell, in turn, can be a very thin application whose main job is to stitch the microfrontends together (e.g., via a routing mechanism that loads the appropriate micro-app for a given URL route).
      </p>

      <p>
        <strong>Real-World Payoff:</strong> This approach paid off when integrating a partner’s features. We had a scenario where a third-party-developed component (for a new type of insurance claim) needed to be added quickly for a partner brand. In the old world, we might have resorted to another iframe or a rushed integration of their code into our monolith. Instead, we worked with the partner to have their feature delivered as a micro-frontend module, integrated via federation. This allowed us to sandbox their code (for security and quality) and lazy-load it only when needed, without impacting our entire application. Meanwhile, our consistent look-and-feel was maintained by having the partner use our shared component library – so even though the code came from outside, it <em>looked and felt native</em> in our portal. The micro-frontend approach meant faster integration and a better user experience.
      </p>

      <p>
        The diagram below illustrates a simplified contrast between our legacy approach and the new micro-frontend architecture:
      </p>

      <h3>Benefits of Micro-Frontends in Our Context</h3>

      <p>Adopting micro-frontends provided several tangible benefits for our engineering team and the product:</p>

      <ul>
        <li><strong>Independent Development & Deployment:</strong> Teams can work on different parts of the front-end in parallel, using their own repositories and pipelines. In our case, the Claims team and the Self-Service team could both release updates on their own schedules. This autonomy boosted our delivery speed and reduced coordination overhead during releases. We still perform <strong>integration testing</strong> in a staging environment where all microfrontends come together, but gone are the days of a single colossal release train for every little front-end change.</li>
        <li><strong>Technology Diversity & Upgrades:</strong> With a monolith, adopting a new front-end technology or even upgrading a major library (like React) can be like turning a giant ship – slow and risky, because everything must be validated together. Micro-frontends gave us the freedom to try new tools in one part of the product without affecting the whole. For instance, one team wanted to adopt a faster build tool (Vite) and a new state management library for their micro-frontend; they could do so without disrupting others, as long as the public interface of their module remained consistent. Meanwhile, another team could continue with the existing setup until they were ready to also upgrade. The result is <strong>incremental modernization</strong> rather than big-bang rewrites. (That said, we do coordinate on certain foundational choices – e.g., we ultimately decided <strong>all microfrontends should use the same major version of React</strong> to avoid conflicts).</li>
        <li><strong>Resilience and Fault Isolation:</strong> With proper design, an issue in one micro-frontend doesn’t necessarily bring down the whole app. If one part of the UI fails to load, the shell can catch the error and, say, display an error boundary with a friendly message in that section, while other parts of the page still function. This is harder to achieve in a monolith where an uncaught exception might blank out the entire app. In practice, we found this beneficial in scenarios like A/B testing new features – if a new micro-frontend had problems, we could rollback just that one without a full downtime deployment.</li>
        <li><strong>Selective Scaling and Optimisation:</strong> Different microfrontends have different performance needs. Our FNOL (First Notice of Loss) intake form, for example, is used by all customers filing a claim and must be extremely robust. The Claims Dashboard, on the other hand, is used later in the process by a subset of users. With microservices on the back-end and microfrontends on the front, we can scale the resources for FNOL independently (both in back-end and possibly using a CDN for front-end assets) without unnecessarily scaling the dashboard at the same rate. We can also tailor performance optimisations to each micro-app (like fine-tuning webpack bundling, code splitting, or utilising edge caching on a per-microfrontend basis).</li>
      </ul>

      <h3>Challenges in Micro-Frontend Adoption</h3>

      <p>No architectural shift comes free of hurdles. Here are some challenges we encountered and how we addressed them:</p>

      <ul>
        <li><strong>Dependency Management and Shared Code:</strong> In a multi-front-end scenario, if each micro-app includes its own copy of common libraries (like React or your UI components), you’d bloat your overall bundle and possibly introduce version conflicts. Our solution was to use Module Federation’s <strong>shared dependency</strong> mechanism. We configure the host shell and all microfrontends to treat certain packages as singletons, ensuring that only one instance is loaded (from the shell) and shared. We ran proof-of-concepts to validate this works as expected. However, it requires coordination – all micro-apps need to use compatible versions of those shared libraries. For example, if one team lags behind on upgrading React, it could hold back others because the shell can only provide one version of React at a time. To manage this, our Front-End Guild established a shared <strong>technical roadmap</strong> (e.g. target dates for upgrading to React 18 across all apps) so that we stay in sync.</li>
        <li><strong>Complexity and Learning Curve:</strong> Building a micro-frontend system is inherently more complex than a single-page app. Developers need to grapple with issues like routing between micro-apps, deploying multiple artifacts, and debugging across app boundaries. We mitigated this by creating clear internal documentation and leveraging our guild to share knowledge. We hosted internal tech talks on Module Federation, and one of our senior engineers who had prior experience with micro-frontends (from a previous project) mentored others. We also chose one pilot area (our Claims portal) to implement the pattern end-to-end before scaling it out. This allowed us to iron out kinks (like the auth token sharing mechanism) in a smaller scope.</li>
        <li><strong>Overhead vs. Benefit:</strong> Not every feature warrants a micro-frontend. If overused, microfrontends can lead to fragmentation or performance issues (too many separate bundles). We had debates about the right “granularity” of splitting. Eventually we chose to align the microfrontends with team boundaries and clear business domains. In areas where a feature was truly shared (like a payments widget used in multiple places), we made it a shared component rather than a separate micro-app. This balance was important to avoid creating a forest of microservices and micro-apps without clear ownership. It’s worth regularly evaluating if the added indirection of a micro-frontend is justified by team autonomy or other benefits; if not, simpler integration techniques might suffice.</li>
      </ul>

      <h2>Shared Design System and Component Library: Consistency at Scale</h2>

      <p>
        In an enterprise with multiple customer-facing brands, <strong>design consistency</strong> is a moving target. Each brand had its own style – logos, colour schemes, typography, component variations – maintained by different design teams in Figma. One of our modernisation goals was to <strong>align these design systems into a more unified framework</strong>, so that our development teams could build reusable components that serve all brands with configuration, rather than rewriting components per brand.
      </p>

      <p>
        <strong>Design Systems Alignment:</strong> We kicked off a series of workshops with our UX/design department to understand the differences and commonalities between each brand’s design system. This resulted in documentation capturing the variance in components between (for example) the <strong>esure</strong> and <strong>RIAS</strong> brands. We found that many components were essentially the same across brands, just with different theming. For instance, buttons, form inputs, and layout grids followed the same structure, with only CSS differences (colours, fonts, spacing) per brand. Those could be handled by a theming approach. Other components had slight variations – for example, the car insurance <em>“Policy Details”</em> card for one brand had an extra field or a different icon. We categorised components into <strong>fully shared vs. brand-specific variations</strong>, which informed the architecture of our component library.
      </p>

      <p>
        <strong>Shared Component Library:</strong> With this knowledge, the guild agreed to develop a <strong>shared component library</strong> that would house the common UI components (implementing the design system fundamentals) for all brands. This library would be used by all squads, ensuring that, say, the “Address Lookup” or “Vehicle Details” component is implemented once and reused everywhere with consistent behaviour. We structured the library with an <strong>atomic design principle</strong> – starting with base components (<em>atoms</em> like buttons, inputs, etc., and <em>molecules</em> like form fields, cards) which could be composed into larger structures. In one guild decision, we agreed on adopting an atomic structure for the shared library and focusing initially on those foundational pieces. This way, even if higher-level features differ by brand or product, they are built on the same base elements.
      </p>

      <p>
        <strong>Multi-Brand Theming:</strong> To handle cosmetic differences, we leveraged the capabilities of our design system tooling. Our designers maintain a <strong>Figma library</strong> that supports multiple themes for different brands (essentially a <em>white-label</em> setup). Tokens for colours, fonts, and spacing can be swapped to reskin components for each brand. Our front-end components consume a set of theme variables (through CSS variables or a theming context in React). So, switching the app from esure to RIAS, for example, is mostly a matter of loading a different theme file. We also increased the number of Figma developer seats so that every engineer could easily inspect design specs for all brand variants of a component. This direct access to design assets helped developers understand the intended design nuances and implement the shared components in a compatible way.
      </p>

      <p>
        <strong>Example – Error Messages Font Size:</strong> One concrete example of maintaining consistency was deciding on a standard font size for form error messages across brands. In one brand’s guidelines, error text was 12px; in another, it was 14px. This seems minor, but as an enterprise serving millions of users, even small inconsistencies can become noticeable (and have maintenance costs). During our guild meetings, designers proposed aligning on a single font size for all brands’ error messages (14px, in this case) and treating it as a global token, unless a brand explicitly overrides it. We agreed this was a sensible approach – consistency where possible, with flexibility where needed – and folded this into the design system. The shared component library was updated accordingly to use the new token, improving uniformity in user experience.
      </p>

      <p>
        <strong>Web Components for Framework Agnosticism:</strong> One interesting avenue we explored was using <strong>Web Components</strong> for truly framework-agnostic UI elements. The idea was that if our shared components were built as Web Components (using, say, <em>Stencil</em> or plain custom elements), they could be used in any web application – React, Angular, or even static HTML – without modification. This could future-proof our design system and even allow sharing components with partner organisations that might not use our tech stack. However, there are trade-offs: building complex components as Web Components can mean giving up some of the conveniences of frameworks like React (state management, ecosystems of libraries, etc.). Our current approach is to stick with React for the bulk of our shared library (since all our microfrontends are React-based for now), but we remain open to Web Components for certain truly generic widgets. The discussion is ongoing, and we may do a proof-of-concept in the future to evaluate this path.
      </p>

      <h3>Challenges and How We Handled Them</h3>

      <p>Creating and adopting a shared design system and component library across multiple teams had its own challenges:</p>

      <ul>
        <li><strong>Governance & Ownership:</strong> We learned that without a clear ownership model, a shared library can turn into a free-for-all, which risks quality and consistency. One of our guild members noted that it’s better to have a <strong>centralised team or owner responsible for the component library</strong>. We formed a small virtual team (comprising a few senior front-end engineers, including myself) who act as the maintainers of the shared library. Other teams contribute via pull requests, but the maintainers oversee reviews, enforce coding standards, and decide on component API changes. This governance model has helped keep the library coherent.</li>
        <li><strong>Versioning and Integration:</strong> We treat the component library as a versioned dependency. One challenge was how to release updates without constantly breaking teams. We decided on a predictable release cycle (bi-weekly minor releases, with urgent patches as needed), and documentation of any breaking changes. We also leverage automated tools (like a combo of <strong>Dependabot</strong> and custom CI checks) to alert teams when a new version is available and to ensure they update regularly. In guild meetings, we highlighted the importance of keeping up to date with these shared dependencies – much like you’d stay on top of security patches – to avoid divergence.</li>
        <li><strong>Design Consistency vs. Autonomy:</strong> While our goal is consistency, we also must allow some brand or product-specific uniqueness. We addressed this by clearly defining <strong>what is global vs what is local</strong>. Global elements (shared icons, grid system, common pages like login screens) are governed strictly by the design system. Localised elements (e.g., a quote progress tracker that might differ for a partner brand) can deviate, but even then we encourage using shared base components and just layering on differences through configuration or extension. This balance is delicate and requires ongoing conversation between design and development. The guild has been a great forum for these discussions – giving a chance for designers and developers from each team to voice concerns when something might not fit all sizes, so we can find a path that works for everyone (or at least most).</li>
        <li><strong>Cross-Team Coordination and Buy-In:</strong> A new shared way of working only succeeds if teams actually adopt it. This is where <strong>the Front-End Guild’s cultural influence</strong> was crucial. By involving representatives from each team in the planning and decision-making, we created a sense of collective ownership. No one felt that “some other team is forcing a library on us” – instead, everyone had a chance to contribute to its roadmap. We also used the guild to show off early prototypes of the shared components and gather feedback, which created excitement. One tactic that worked well was running “lightning demos” during guild meetings: e.g. a developer would demonstrate a new component or a micro-frontend integration for 5 minutes. Seeing live examples helped convince others of the benefits and got them on board.</li>
      </ul>

      <h2>Automating Front-End Environments: From Months to Minutes</h2>

      <p>
        In tandem with architectural changes, we invested in improving our <strong>infrastructure and deployment processes</strong> for front-end applications. Historically, setting up a new environment (say, for a new brand or a new feature branch for testing) was painfully slow. It involved coordinating with multiple teams – network, ops, etc. – and could take weeks. This was clearly at odds with the fast-moving, decoupled ideal of microservices and microfrontends.
      </p>

      <p>
        Our DevOps team introduced an internal tool called <strong>StackSpin</strong> – essentially a set of scripts and templates for automated environment provisioning – and the Front-End Guild quickly championed its adoption for all our front-end teams. In a guild meeting earlier this year, we made the decision to <em>“adopt StackSpin for automated front-end environment provisioning and configuration”</em>. The idea was to treat environment configuration as code, stored in a central config service, with templated variables that could be replaced for each environment or brand.
      </p>

      <p>The results were spectacular. What used to require manually writing config files, copying them across repos, and raising tickets for infra setup, is now handled by an automated pipeline:</p>

      <ul>
        <li><strong>Layered Config Templates:</strong> We created a hierarchy of configuration: base templates, then account-specific settings, environment-specific overrides, and brand-specific overrides. For example, a base template might define an API endpoint as <code>https://{'{brand}'}.api.example.com/{'{env}'}/</code>, and then brand layer files supply values like <code>brand = esure</code> vs <code>brand = rias</code>, and env layer supplies <code>env = prod</code> vs <code>env = dev</code>. StackSpin uses these to generate the actual config files for each deployment.</li>
        <li><strong>One-Click Environment Build:</strong> With everything templatized, we can now spin up a full environment (in AWS) by running a single pipeline with the desired parameters. Under the hood, this creates CloudFront distributions, S3 buckets for static assets, config entries, and deploys the appropriate versions of the front-end apps – all in an <strong>automated fashion</strong>. We proved this out by deploying a new “Claims Digital” environment for the partner brand (AGS) in a controlled test. It worked end-to-end in minutes, whereas a manual approach was estimated to take 4 sprints of work – essentially a shift from nearly <strong>two months of effort to under 10 minutes</strong>. This kind of automation dramatically improves our ability to scale and respond to new needs (like onboarding new brands or standing up temporary test environments).</li>
        <li><strong>Ephemeral Environments:</strong> As a bonus, because it’s so quick to create environments, we can also create <strong>ephemeral environments</strong> for feature testing or pull requests, and then tear them down. This is part of our longer-term DevOps vision, which StackSpin makes possible. It’s not solely a front-end concern – it involves infra-as-code and continuous integration – but it’s a critical part of modernising how we deliver front-end software. As a tech lead, I consider these improvements as important as the application architecture changes.</li>
      </ul>

      <h2>The Front-End Guild: Driving Consistency and Innovation Across Teams</h2>

      <p>
        Technology alone isn’t enough; people and processes need to evolve together with architecture. To facilitate this, I helped establish and lead a <strong>Front-End Guild</strong> – a regular forum where front-end developers, tech leads, and UX/designers from all squads come together. This guild became the engine of our front-end modernisation in many ways, by providing a space for sharing, learning, and decision-making across traditional team boundaries.
      </p>

      <p>
        <strong>Guild Objectives:</strong> We set out clear themes for the guild in 2026: <strong>technical standardisation, cross-team integration, and innovation</strong>. Some of the specific focus areas included:
      </p>

      <ul>
        <li>Upgrading core dependencies (e.g., Node.js and React versions) in a coordinated manner so no team falls behind.</li>
        <li>Security practices, like using <strong>Semgrep</strong> and <strong>Wiz</strong> for static code analysis and vulnerability scanning, plus ensuring all teams use tools like Dependabot for keeping dependencies up to date.</li>
        <li>Integrating new partner teams (we welcomed folks from our partner company Ageas into the guild to help onboard them to our front-end practices and ensure their needs were considered in our plans).</li>
        <li>Sharing updates on the <strong>Design System</strong> and the new <strong>shared component library</strong> progress, getting feedback from all developers who will use it.</li>
        <li>Discussing architecture enhancements, such as the move to Module Federation and how to best share common code (we had open questions around handling dependencies and singletons, which the guild helped answer through POCs).</li>
        <li>Scheduling “show & tell” sessions where squads demoed what they were working on (for example, one team showed a self-service claims feature, another showed how they integrated a new build tool).</li>
      </ul>

      <p><strong>Key Achievements:</strong> Through the guild, we reached consensus and drove several key initiatives:</p>

      <ul>
        <li>We <strong>adopted Module Federation</strong> for micro-frontends, with guidelines on how to use it (naming conventions for remote modules, which libraries to share, etc.), after guild members reviewed a prototype and agreed on the approach.</li>
        <li>We <strong>launched the Shared Component Library project</strong>, with volunteers from multiple teams. The guild set the ground rules, like “use atomic design”, “establish code owners for the library”, and “make accessibility a priority from day one”.</li>
        <li>We <strong>standardised our CI/CD pipelines</strong> for front-end projects: each team’s repository was updated to use a common pipeline template that included steps for running linters, accessibility tests, and bundling with our Module Federation config. This was accompanied by migrating all teams to the new config server approach.</li>
        <li>We rolled out <strong>StackSpin</strong> to all front-end squads, with guild meetings serving as a knowledge-sharing platform. Team members who pioneered the tool (like Jacek and Zaher from our DevOps group) presented how it works, and we discussed challenges in migrating existing apps to use it. This collective problem-solving made the rollout much smoother, as teams learned from each other.</li>
        <li>We improved <strong>cross-team communication</strong>. For example, when a security issue with an NPM package arose (like the “ctx.axio” malware incident in early 2026), the guild was the place where it was first raised and addressed. We created shared guidelines and even proposed using AI bots to help monitor such issues in our repos. This meant faster, coordinated responses to threats that could have otherwise been patched inconsistently.</li>
      </ul>

      <p><strong>Guild Dynamics – Keeping It Effective:</strong> Running an engineering guild comes with its own set of lessons:</p>

      <ul>
        <li>We experimented with formats and settled on a <strong>biweekly meeting cadence</strong>, alternating between focus sessions (deep-dives, planning) and demo sessions (lightning talks, show-and-tell). This keeps things lively and ensures we balance “talking about work” with “showing the work.”</li>
        <li>To avoid fatigue, we rotate facilitation and encourage different people to present. Engineers from various teams have demoed their work on things like performance optimisations, new testing tools, etc. This not only spreads knowledge but gives individuals a chance to shine and build their presentation skills.</li>
        <li>We maintain an open backlog (“FEDS board”) for guild topics, where anyone can add an idea or issue they want the guild to discuss. This democratizes the agenda.</li>
        <li><strong>Management support:</strong> We regularly share highlights from the guild with senior leadership (e.g., summary of decisions made, any blockers that need help). This kept our managers supportive and aware of the guild’s value. Over time, they saw the guild as a model for cross-team collaboration – a way to break silos without formal reorgs.</li>
      </ul>

      <h2>Conclusion: Lessons Learned on the Road to Modernisation</h2>

      <p>
        Modernising our front-end architecture has been a challenging but rewarding journey. By moving to micro-frontends, we achieved a level of modularity and team autonomy that was impossible with our old monolith. By investing in a shared design system and component library, we set the stage for consistency and reuse across multiple products and brands. And by embracing automation in our tooling (StackSpin for environments, among others), we removed bottlenecks that were slowing us down.
      </p>

      <p>
        Perhaps most importantly, the human element – via the Front-End Guild – ensured that all these changes were successfully adopted. The guild became a breeding ground for new ideas and a safety net for shared challenges. It’s been instrumental in driving a cultural shift towards <strong>continuous improvement and collective code ownership</strong> in our front-end teams.
      </p>

      <p>For other technical leads, front-end engineers, or engineering managers on a similar path, here are some <strong>actionable takeaways</strong> from our experience:</p>

      <ul>
        <li><strong>Break down silos carefully:</strong> If you have a large front-end and multiple teams, consider micro-frontends to give teams freedom. But do this gradually – start with a pilot, get the fundamentals (like shared auth and routing) in place, and identify clear seams in your app where splitting makes sense. Don’t fragment things that are better maintained as a single unit.</li>
        <li><strong>Invest in a design system early:</strong> A shared design language and component library will pay dividends as you scale. It reduces duplicate work, and more importantly, ensures that customers get a consistent experience across features and brands. Get your designers and devs in a room (or a Teams call) to map out the common components and the variability. Build for accessibility and theming from day one.</li>
        <li><strong>Tackle DevOps for front-end with the same urgency as back-end:</strong> Automating deployments, environment setup, and tests for front-end projects can dramatically increase your team’s velocity. Treat your front-end infrastructure as code. If you’re on a cloud platform, explore infrastructure templating and deployment pipelines for front-end assets, not just servers.</li>
        <li><strong>Align through communities of practice:</strong> Establish forums like a front-end guild or tech huddles where people can share knowledge and align on decisions. It’s much easier to introduce a new library or practice when you’ve discussed it with all teams ahead of time, rather than surprise them after the fact. Use these forums to also celebrate wins and cool new experiments – that keeps the momentum and buy-in high.</li>
        <li><strong>Be ready for challenges:</strong> Expect hiccups with version mismatches, learning curves, or debates on the “right” way to do things. That’s normal. Have a plan for how decisions will be made (e.g., via a small group or a guild vote) and don’t let analysis-paralysis stop progress. Prove things with prototypes when consensus is hard to reach – seeing is believing.</li>
      </ul>

      <p>
        Modernising an enterprise front-end is a journey with no true finish line – there will always be new frontiers (from the next JavaScript framework, to Web3, to who-knows-what). But with a solid modular architecture and a culture of collaboration, you’ll be well-equipped to adapt and thrive. Our insurance platform’s front-end is now in a stronger position: we’ve cut the gordian knot of the monolith, set up a pipeline for rapid iteration, and created a community that keeps us moving forward. The lessons we learned along the way are universally applicable: <strong>decouple to scale, standardise to simplify, automate to accelerate, and bring people together to make it all possible.</strong>
      </p>
    </>
  );
}
