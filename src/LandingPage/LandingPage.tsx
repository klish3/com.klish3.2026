import React from "react";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";

/**
 * Variant 1 — Editorial / Metric-Forward Minimalism
 * Style: oversized type, monochrome, CV-as-homepage.
 * Best for: recruiters & hiring managers scanning in 5 seconds.
 *
 * Dependencies:
 *   npm i lucide-react
 *   Tailwind CSS (uses utility classes only)
 */

const METRICS = [
  { value: "40%", label: "Reduction in technical debt", context: "Front-End Guild, esure" },
  { value: "60%", label: "Reduction in system downtime", context: "AWS Synthetics monitoring" },
  { value: "35%", label: "Faster claims processing", context: "Conversational AI interface" },
  { value: "100%", label: "Fraudulent claim tracking", context: "First-ever fraud system at esure" },
];

const EXPERIENCE = [
  {
    role: "Technical Lead — Digital Claims",
    company: "esure Group",
    period: "2022 — Present",
    summary:
      "Leading front-end engineering for a £1B+ insurer. Founded the Front-End Guild, shipped fraud detection, conversational AI and AWS observability across 15+ production apps.",
  },
  {
    role: "React Native Lead (Contract)",
    company: "Stena Group IT",
    period: "2023",
    summary:
      "Architected a NestJS BFF cutting latency 45% and ran security & CI/CD on OpenShift to 99.8% uptime for a multinational ferry & logistics group.",
  },
  {
    role: "Lead Developer — Trade Loans",
    company: "Barclays Africa (Absa)",
    period: "2016 — 2019",
    summary:
      "Sole developer of a digital trade finance platform deployed across African markets — presented at the World Economic Forum 2019 by the Absa Group CEO.",
  },
];

export default function LandingPage(): React.ReactElement {
  return (
    <>
      {/* Hero */}
      <section className="mt-24 md:mt-40">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          Technical Lead · Fintech &amp; Insurtech · Guildford, UK
        </p>
        <h1 className="mt-6 text-5xl md:text-8xl font-medium leading-[0.95] tracking-tight">
          I lead teams<br />
           that ship<br />
          <span className="italic font-light text-stone-500 dark:text-stone-400">work that matters.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-relaxed">
          10+ years architecting React &amp; TypeScript platforms across insurance,
          payments and pan-African banking — including a solution showcased at the
          World Economic Forum 2019.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="mailto:klish3@gmail.com"
            className="group inline-flex items-center gap-2 rounded-full bg-stone-900 dark:bg-stone-50 px-6 py-3 text-sm font-medium text-stone-50 dark:text-stone-950 transition-all hover:bg-stone-700 dark:hover:bg-stone-200"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="https://linkedin.com/in/tawandakli"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 dark:border-stone-700 px-6 py-3 text-sm font-medium text-stone-700 dark:text-stone-300 transition-all hover:border-stone-900 dark:hover:border-stone-100 hover:text-stone-900 dark:hover:text-stone-100"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href="https://github.com/klish3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 dark:border-stone-700 px-6 py-3 text-sm font-medium text-stone-700 dark:text-stone-300 transition-all hover:border-stone-900 dark:hover:border-stone-100 hover:text-stone-900 dark:hover:text-stone-100"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </section>

      {/* Metrics */}
      <section className="mt-32 md:mt-48 border-t border-stone-200 dark:border-stone-800 pt-16">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-12">
          Selected impact
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {METRICS.map((m) => (
            <div key={m.value} className="border-l-2 border-stone-900 dark:border-stone-100 pl-5">
              <div className="text-5xl md:text-6xl font-medium tracking-tight text-stone-900 dark:text-stone-50">{m.value}</div>
              <div className="mt-3 text-sm font-medium text-stone-900 dark:text-stone-100">{m.label}</div>
              <div className="mt-1 text-sm text-stone-500 dark:text-stone-400">{m.context}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="work" className="mt-32 md:mt-48 border-t border-stone-200 dark:border-stone-800 pt-16">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-12">
          Selected experience
        </p>
        <div className="space-y-16">
          {EXPERIENCE.map((job) => (
            <article
              key={job.role}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 group cursor-default"
            >
              <div className="md:col-span-3 text-sm text-stone-500 dark:text-stone-400 tabular-nums">
                {job.period}
              </div>
              <div className="md:col-span-9">
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-50">
                  {job.role}
                </h3>
                <p className="mt-1 text-stone-500 dark:text-stone-400">{job.company}</p>
                <p className="mt-4 text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
                  {job.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="mt-32 md:mt-48 border-t border-stone-200 dark:border-stone-800 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8"
      >
        <div className="md:col-span-3 text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          About
        </div>
        <div className="md:col-span-9 max-w-2xl">
          <p className="text-xl md:text-2xl leading-relaxed text-stone-800 dark:text-stone-200">
            Equally effective at the system-design level and hands-on in the codebase.
            Currently looking for a Technical Lead, Staff or Principal role in a UK
            fintech or insurtech where governance, AI interfaces and platform thinking
            actually move the needle.
          </p>
        </div>
      </section>
    </>
  );
}

