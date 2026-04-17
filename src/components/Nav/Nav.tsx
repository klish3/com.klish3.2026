import { Link } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";

export const Nav = () => {
  return (
    <nav className="flex items-center gap-6 text-stone-500 dark:text-stone-400">
      {/* <Link
        to="/hacks"
        className="transition-colors hover:text-stone-900 dark:hover:text-stone-100"
      >
        Hacks
      </Link> */}
      <Link
        to="/vibes"
        className="transition-colors hover:text-stone-900 dark:hover:text-stone-100"
      >
        Vibes
      </Link>
      <Link
        to="/scribbles"
        className="transition-colors hover:text-stone-900 dark:hover:text-stone-100"
      >
        Scribbles
      </Link>

      <ThemeToggle />
    </nav>
  );
};
