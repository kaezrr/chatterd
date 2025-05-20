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

export function SignUpForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
      confirmp: "",
    },

    validate: {
      username: (value) =>
        /^[a-zA-Z0-9]+$/.test(value) ? null : "Username must be alphanumeric",
      password: (value) =>
        value.length >= 4 ? null : "Password must be minimum 4 characters",
      confirmp: (value, values) =>
        values.password === value ? null : "Passwords do not match",
    },
  });

  const [visible, { toggle }] = useDisclosure(false);

  return (
    <Stack align="center">
      <Title order={3}>Create a new account</Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          required
          withAsterisk
          label="Username"
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          key={form.key("password")}
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps("password")}
        />
        <PasswordInput
          withAsterisk
          label="Confirm Password"
          key={form.key("confirmp")}
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps("confirmp")}
        />
        <Group justify="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Stack>
  );
}
