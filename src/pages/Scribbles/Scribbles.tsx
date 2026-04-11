import React from "react";
import { Calendar, Clock, User } from "lucide-react";

const posts = [
  {
    title: "The Future of Web Development in 2024",
    excerpt: "Exploring the rise of AI-driven development and the evolution of modern frontend frameworks.",
    date: "April 10, 2024",
    readTime: "5 min read",
    author: "Tawanda K",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Mastering TypeScript for Enterprise Applications",
    excerpt: "Deep dive into advanced TypeScript patterns that help build scalable and maintainable codebases.",
    date: "March 28, 2024",
    readTime: "8 min read",
    author: "Tawanda K",
    category: "Coding",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Designing for Dark Mode: Best Practices",
    excerpt: "How to create beautiful and accessible dark mode interfaces that users will love.",
    date: "March 15, 2024",
    readTime: "4 min read",
    author: "Tawanda K",
    category: "Design",
    image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800"
  }
];

export const Scribbles: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-sky-600 bg-clip-text text-transparent">Scribbles</span> & Thoughts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A space where I write about technology, design, and my journey as a technical lead.
          </p>
        </div>

        <div className="space-y-12">
          {posts.map((post, index) => (
            <article key={index} className="group cursor-pointer">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 shrink-0 overflow-hidden rounded-2xl aspect-[16/9] md:aspect-square">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/30 px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 md:line-clamp-none">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                  </div>
                </div>
              </div>
              {index !== posts.length - 1 && (
                <div className="mt-12 border-b border-gray-100 dark:border-gray-800"></div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
