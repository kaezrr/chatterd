import "@mantine/core/styles.css";
import { MantineProvider, AppShell, Title, Group, Anchor } from "@mantine/core";

import globalTheme from "../theme.tsx";

import { SignUpForm } from "../components/SignUpForm.tsx";
import { LoginForm } from "../components/LoginForm.tsx";

export default function App({ signin }: { signin: Boolean }) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={globalTheme}>
      <AppShell padding="md" header={{ height: 60 }}>
        <AppShell.Header p="xs">
          <Group justify="space-between" align="center">
            <Title order={2}>Chatterd</Title>
            <Anchor fz="xl" href={signin ? "/signup" : "/signin"}>
              {signin ? "Sign up" : "Sign in"}
            </Anchor>
          </Group>
        </AppShell.Header>
        <AppShell.Main>{signin ? <LoginForm /> : <SignUpForm />}</AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
