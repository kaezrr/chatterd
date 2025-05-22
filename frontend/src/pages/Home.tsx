import { AppShell, Group, Title, Anchor, Tabs, Avatar } from "@mantine/core";
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
    <AppShell header={{ height: 60 }}>
      <AppShell.Header p="xs">
        <Group justify="space-between" align="center">
          <Avatar
            color="initials"
            name={userData.name}
            src={`${apiUrl}/public/${userData.photoUrl}`}
          />
          <Title order={2}>Welcome {userData.name}!</Title>
          <Anchor fz="xl" onClick={signOut}>
            Sign out
          </Anchor>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Tabs orientation="horizontal" defaultValue="gallery">
          <Tabs.List grow>
            <Tabs.Tab value="message">Messages</Tabs.Tab>
            <Tabs.Tab value="friends">Friends</Tabs.Tab>
            <Tabs.Tab value="account">Account</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="message">message tab content</Tabs.Panel>
          <Tabs.Panel value="friends">friends tab content</Tabs.Panel>
          <Tabs.Panel value="account">
            <Profile user={userData} />
          </Tabs.Panel>
        </Tabs>
      </AppShell.Main>
    </AppShell>
  );
}
