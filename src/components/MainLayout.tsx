import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const currentYear = new Date().getFullYear();



  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-50 font-sans antialiased selection:bg-stone-900 selection:text-stone-50 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-12 md:py-16">
        {/* Top bar */}
        <header className="flex items-center justify-between text-sm tracking-tight border-b border-stone-200 dark:border-stone-800 pb-8">
          <Link to="/" className="font-medium hover:text-stone-500 transition-colors">Tawanda Kanyangarara</Link>
          <nav className="flex items-center gap-6 text-stone-500 dark:text-stone-400">
            <Link to="/#work" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Work</Link>
            {/* <Link to="/hacks" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Hacks</Link> */}
            <Link to="/scribbles" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Scribbles</Link>
            <a href="mailto:klish3@gmail.com" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">Contact</a>
            <ThemeToggle />
          </nav>
        </header>

        <main>
          {children}
        </main>

        <footer className="mt-32 border-t border-stone-200 dark:border-stone-800 pt-10 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-sm text-stone-500 dark:text-stone-400">
          <div>© {currentYear} Tawanda Kanyangarara · Guildford, UK</div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/klish3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/tawandakli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:klish3@gmail.com"
              aria-label="Email"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
