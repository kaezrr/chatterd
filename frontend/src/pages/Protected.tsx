import "@mantine/core/styles.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

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
  return loading ? <LoadingBar /> : children;
}
