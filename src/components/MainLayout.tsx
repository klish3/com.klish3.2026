import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { Nav } from "./Nav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased transition-colors duration-300 selection:bg-stone-900 selection:text-stone-50 dark:bg-stone-950 dark:text-stone-50">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-12 md:py-16">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-stone-200 pb-8 text-sm tracking-tight dark:border-stone-800">
          <Link
            to="/"
            className="font-medium transition-colors hover:text-stone-500"
          >
            Tawanda Kanyangarara
          </Link>
          <Nav />
        </header>

        <main>{children}</main>

        <footer className="mt-32 flex flex-col items-start justify-between gap-6 border-t border-stone-200 pb-4 pt-10 text-sm text-stone-500 dark:border-stone-800 dark:text-stone-400 sm:flex-row sm:items-center">
          <div>© {currentYear} Tawanda Kanyangarara · Guildford, UK</div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/klish3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-stone-900 dark:hover:text-stone-100"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/tawandakli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-stone-900 dark:hover:text-stone-100"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:klish3@gmail.com"
              className="transition-colors hover:text-stone-900 dark:hover:text-stone-100"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
