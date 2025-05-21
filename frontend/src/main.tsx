import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Protected from "./pages/Protected.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/signin",
    element: <App signin={true} />,
  },
  {
    path: "/signup",
    element: <App signin={false} />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
