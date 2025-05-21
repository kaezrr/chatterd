import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import globalTheme from "../theme.tsx";
import LoadingBar from "../components/LoadingBar.tsx";

export default function Main({ children }: { children: React.ReactNode }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/users/me`, { credentials: "include" }).then((res) => {
      setLoading(false);
      setOk(res.ok);
    });
  }, []);

  if (!loading && !ok) {
    return <Navigate to="/signin" />;
  }

  return (
    <MantineProvider defaultColorScheme="dark" theme={globalTheme}>
      {loading ? <LoadingBar /> : children}
    </MantineProvider>
  );
}
