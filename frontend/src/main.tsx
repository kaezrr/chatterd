import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

import Home from "./pages/Home.tsx";
import App from "./pages/App.tsx";
import { Notifications } from "@mantine/notifications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
  primaryColor: "green",
  colors: {
    dark: [
      "#d5d7e0",
      "#acaebf",
      "#8c8fa3",
      "#666980",
      "#4d4f66",
      "#34354a",
      "#2b2c3d",
      "#1d1e30",
      "#0c0d21",
      "#01010a",
    ],
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
