import { useForm } from "@mantine/form";
import {
  Button,
  PasswordInput,
  Group,
  TextInput,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function LoginForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  const [visible, { toggle }] = useDisclosure(false);

  return (
    <Stack align="center">
      <Title order={3}>Log in to Chatterd</Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          required
          withAsterisk
          label="Username"
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <PasswordInput
          required
          withAsterisk
          label="Password"
          key={form.key("password")}
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps("password")}
        />

        <Group justify="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Stack>
  );
}
