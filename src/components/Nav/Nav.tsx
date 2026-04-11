import { DarkThemeToggle, Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Klish3
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 md:p-0 ${
              isActive
                ? "text-blue-700 dark:text-blue-500"
                : "text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
            }`
          }
        >
          Resume
        </NavLink>
        <NavLink
          to="/hacks"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 md:p-0 ${
              isActive
                ? "text-blue-700 dark:text-blue-500"
                : "text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
            }`
          }
        >
          Hacks
        </NavLink>
        <NavLink
          to="/scribbles"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 md:p-0 ${
              isActive
                ? "text-blue-700 dark:text-blue-500"
                : "text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
            }`
          }
        >
          Scribbles
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
};
