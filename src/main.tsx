import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import App from "./App";
import "./index.css";


import { Nav } from "./components/Nav";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Flowbite>
      <Nav />
      <RouterProvider router={router} />
    </Flowbite>
  </React.StrictMode>,
);
