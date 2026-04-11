import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import App from "./App";
import "./index.css";


import { Nav } from "./components/Nav";
import { Pheonix } from "./pages/Resume/Pheonix";
import { ComingSoon } from "./pages/ComingSoon";
import { TimeLineKli } from "./components/Timeline";
import { Landing } from "./pages/Resume";
import { Hacks } from "./pages/Hacks";
import { Scribbles } from "./pages/Scribbles";
import LandingPage from "./LandingPage/LandingPage";

const Layout = () => (
  <Flowbite>
    {/* <Nav /> */}
    <Outlet />
  </Flowbite>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/k",
        element: <Pheonix />,
      },
      {
        path: "/l",
        element: <ComingSoon />,
      },
      {
        path: "/i",
        element: <TimeLineKli />,
      },
      {
        path: "/s",
        element: <Landing />,
      },
      {
        path: "/hacks",
        element: <Hacks />,
      },
      {
        path: "/scribbles",
        element: <Scribbles />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
