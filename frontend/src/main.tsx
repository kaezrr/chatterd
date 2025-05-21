import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

import Protected from "./pages/Protected.tsx";
import Home from "./pages/Home.tsx";
import App from "./pages/App.tsx";

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

const theme = createTheme({
  fontFamily: "Verdana, sans-serif",
  primaryColor: "cyan",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
