import { AppShell, Group, Title, Anchor, Tabs, Avatar } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingBar from "../components/LoadingBar";
import Profile from "../components/Profile";
import Friends from "../components/Friends";
import RequestManager from "../components/RequestManager";

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
            Sign Out
          </Anchor>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Tabs orientation="horizontal" defaultValue="messages">
          <Tabs.List grow>
            <Tabs.Tab value="messages">Messages</Tabs.Tab>
            <Tabs.Tab value="friends">Friends</Tabs.Tab>
            <Tabs.Tab value="requests">Requests</Tabs.Tab>
            <Tabs.Tab value="account">Account</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="messages">message tab content</Tabs.Panel>
          <Tabs.Panel value="friends">
            <Friends />
          </Tabs.Panel>
          <Tabs.Panel value="requests">
            <RequestManager />
          </Tabs.Panel>
          <Tabs.Panel value="account">
            <Profile user={userData} />
          </Tabs.Panel>
        </Tabs>
      </AppShell.Main>
    </AppShell>
  );
}
