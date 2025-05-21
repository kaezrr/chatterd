import { AppShell, Title, Group, Anchor } from "@mantine/core";

import { SignUpForm } from "../components/SignUpForm.tsx";
import { LoginForm } from "../components/LoginForm.tsx";
import { Link } from "react-router-dom";

export default function App({ signin }: { signin: Boolean }) {
  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header p="xs">
        <Group justify="space-between" align="center">
          <Title order={2}>Chatterd</Title>
          <Anchor fz="xl" component={Link} to={signin ? "/signup" : "/signin"}>
            {signin ? "Sign up" : "Sign in"}
          </Anchor>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{signin ? <LoginForm /> : <SignUpForm />}</AppShell.Main>
    </AppShell>
  );
}
