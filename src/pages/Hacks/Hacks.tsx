import { ArrowUpRight, Code2, Cpu, Globe, Rocket } from "lucide-react";

const hacks = [
  {
    title: "AI Image Generator",
    description: "A tool to generate stunning images using Stable Diffusion and React.",
    icon: <Globe className="h-6 w-6" />,
    status: "Coming Soon"
  },
  {
    title: "Performance Monitor",
    description: "Real-time performance tracking for web applications with intuitive dashboards.",
    icon: <Cpu className="h-6 w-6" />,
    status: "In Development"
  },
  {
    title: "Component Lab",
    description: "A sandbox for testing and showcasing experimental React components.",
    icon: <Code2 className="h-6 w-6" />,
    status: "Planned"
  },
  {
    title: "Next-Gen CLI",
    description: "A powerful command-line interface for streamlining development workflows.",
    icon: <Rocket className="h-6 w-6" />,
    status: "Concept"
  }
];

export const Hacks: React.FC = () => {
  return (
    <>
      <div className="mt-24 md:mt-40">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          Experiments & Artifacts
        </p>
        <h1 className="mt-6 text-5xl md:text-8xl font-medium leading-[0.95] tracking-tight text-stone-900 dark:text-stone-50">
          Creative <span className="italic font-light text-stone-500 dark:text-stone-400">Hacks.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-relaxed">
          A curated collection of experimental projects, tools, and digital toys 
          crafted with curiosity and specific technical challenges in mind.
        </p>
      </div>

      <section className="mt-32 md:mt-48 border-t border-stone-200 dark:border-stone-800 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {hacks.map((hack, index) => (
            <article key={index} className="group">
              <div className="flex items-start justify-between mb-8">
                <div className="text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">
                  {hack.icon}
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400 border border-stone-200 dark:border-stone-800 px-2 py-0.5 rounded">
                  {hack.status}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-stone-900 dark:text-stone-50 group-hover:text-stone-500 transition-colors">
                {hack.title}
              </h2>
              <p className="mt-4 text-stone-600 dark:text-stone-400 leading-relaxed max-w-md">
                {hack.description}
              </p>
              <div className="mt-8">
                <button className="text-sm font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2 group/btn border-b border-stone-900 dark:border-stone-100 pb-1 hover:text-stone-500 dark:hover:text-stone-400 hover:border-stone-500 dark:hover:border-stone-400 transition-all">
                  Explore Project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};




