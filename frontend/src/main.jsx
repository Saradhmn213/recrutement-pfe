import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import Root from "./layouts/root.jsx";
import SidebarLayout from "./layouts/SidebarLayout.jsx"

import { UserProvider } from "./hooks/UserProvider.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import ErrorPage from "./pages/error-page.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Profile from "./pages/Profile/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
        {
        path: "",
        element: <SidebarLayout />, 
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "profile", element: <Profile /> },

        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
