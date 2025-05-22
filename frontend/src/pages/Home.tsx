import { AppShell, Group, Title, Anchor, Avatar } from "@mantine/core";
import { useState, useEffect } from "react";

import LoadingBar from "../components/LoadingBar";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";

export default function Home() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState<{
    name: string;
    photoUrl: string;
    about: string;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiUrl}/users/me`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  if (userData === null) {
    return <LoadingBar />;
  }

  const signOut = async () => {
    await fetch(`${apiUrl}/auth/signout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/signin");
  };

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header p="xs">
        <Group justify="space-between" align="center">
          <Profile user={userData} />
          <Title order={2}>Welcome {userData.name}!</Title>
          <Anchor fz="xl" onClick={signOut}>
            Sign out
          </Anchor>
        </Group>
      </AppShell.Header>
    </AppShell>
  );
}
