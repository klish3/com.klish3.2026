import React from "react";
import { Card } from "flowbite-react";
import { Code2, Cpu, Globe, Rocket } from "lucide-react";

const hacks = [
  {
    title: "AI Image Generator",
    description: "A tool to generate stunning images using Stable Diffusion and React.",
    icon: <Globe className="h-6 w-6 text-sky-500" />,
    status: "Coming Soon",
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    title: "Performance Monitor",
    description: "Real-time performance tracking for web applications with intuitive dashboards.",
    icon: <Cpu className="h-6 w-6 text-emerald-500" />,
    status: "In Development",
    gradient: "from-emerald-500 to-teal-400"
  },
  {
    title: "Component Lab",
    description: "A sandbox for testing and showcasing experimental React components.",
    icon: <Code2 className="h-6 w-6 text-purple-500" />,
    status: "Planned",
    gradient: "from-purple-500 to-indigo-400"
  },
  {
    title: "Next-Gen CLI",
    description: "A powerful command-line interface for streamlining development workflows.",
    icon: <Rocket className="h-6 w-6 text-orange-500" />,
    status: "Concept",
    gradient: "from-orange-500 to-red-400"
  }
];

export const Hacks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            Creative <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">Hacks</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of experimental projects, tools, and digital toys crafted with curiosity and code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {hacks.map((hack, index) => (
            <div key={index} className="group relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${hack.gradient} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}></div>
              <Card className="relative bg-white dark:bg-gray-800 border-none">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {hack.icon}
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold text-sky-600 bg-sky-100 dark:bg-sky-900/30 dark:text-sky-400 rounded-full">
                    {hack.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-sky-500 transition-colors">
                  {hack.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {hack.description}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2 group/btn">
                    Explore Project
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
