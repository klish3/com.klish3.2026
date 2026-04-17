import React from "react";
import { Terminal, ArrowUpRight, Brackets } from "lucide-react";

export const Vibes: React.FC = () => {
  const artifacts = [
    {
      id: "claims-architecture-synthwave",
      title: "Digital Claims Architecture — Synthwave Explorer",
      description:
        "An interactive 80s arcade-themed architecture visualiser with vertical parallax, horizontal deep-dives, character select (FE/BE/QA/Product perspectives), Zod-validated state, and a full FNOL Component View map modal.",
      type: "Full Stack Tool",
      url: "https://claude.ai/public/artifacts/cc1783f1-62d9-45ab-88de-bc01a75c37d0",
      icon: <Terminal className="h-5 w-5" />,
      date: "April 2026",
      tags: [
        "React",
        "Framer Motion",
        "Tailwind CSS",
        "Zod",
        "SVG",
        "Architecture",
      ],
    },
    {
      id: "eba44f9b-5ad6-4d4e-897d-b39809e139bb",
      title: "JS Methods Visualizer",
      description:
        "An interactive Array & Object methods playground with live state tracking, projectile animations, and a full reference drawer.",
      type: "Interactive Learning Tool",
      url: "https://claude.ai/public/artifacts/eba44f9b-5ad6-4d4e-897d-b39809e139bb",
      icon: <Brackets className="h-5 w-5" />,
      date: "April 2026",
      tags: ["React", "Framer Motion", "JavaScript"],
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 px-4 pb-32 pt-24 dark:bg-stone-950 md:px-8 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 md:mb-24">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
            Showcase
          </p>
          <h1 className="mt-6 text-5xl font-medium leading-[0.95] tracking-tight text-stone-900 dark:text-stone-50 md:text-8xl">
            Claude{" "}
            <span className="font-light italic text-stone-500 dark:text-stone-400">
              Artifacts.
            </span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300 md:text-xl">
            A curated collection of UI components, tools, and prototypes
            co-created with AI. Exploring the boundaries of agentic coding and
            rapid prototyping.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {artifacts.map((artifact) => (
            <a
              key={artifact.id}
              href={artifact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl border border-stone-200 bg-white p-8 transition-all duration-500 hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700"
            >
              <div className="absolute right-0 top-0 p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <ArrowUpRight className="h-6 w-6 text-stone-400 transition-colors group-hover:text-stone-900 dark:group-hover:text-stone-50" />
              </div>

              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:group-hover:bg-stone-700">
                  {artifact.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                    {artifact.type}
                  </p>
                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    {artifact.date}
                  </p>
                </div>
              </div>

              <h2 className="mb-4 text-2xl font-medium tracking-tight text-stone-900 dark:text-stone-50 md:text-3xl">
                {artifact.title}
              </h2>

              <p className="mb-8 leading-relaxed text-stone-600 dark:text-stone-300">
                {artifact.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {artifact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
