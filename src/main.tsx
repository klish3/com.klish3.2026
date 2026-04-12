import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import "./index.css";


import { MainLayout } from "./components/MainLayout";

import { Pheonix } from "./pages/Resume/Pheonix";
import { ComingSoon } from "./pages/ComingSoon";
import { TimeLineKli } from "./components/Timeline";
import { Landing } from "./pages/Resume";
import { Hacks } from "./pages/Hacks";
import { Scribbles, ScribblePost } from "./pages/Scribbles";
import LandingPage from "./LandingPage/LandingPage";

const router = createBrowserRouter([
  {
    element: (
      <Flowbite>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </Flowbite>
    ),
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
      {
        path: "/scribbles/:slug",
        element: <ScribblePost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
