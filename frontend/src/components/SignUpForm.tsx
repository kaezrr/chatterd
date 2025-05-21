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
import { useNavigate } from "react-router-dom";

export function SignUpForm() {
  const navigate = useNavigate();
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
  const signUpUser = async (values: { username: string; password: string }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/auth/signup`, {
      body: JSON.stringify(values),
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data: { path: "username" | "password"; msg: string }[] =
      await response.json();
    if (!response.ok) {
      const errors = { username: "", password: "" };
      data.forEach((e) => (errors[e.path] = e.msg));
      form.setErrors(errors);
      return;
    }
    navigate("/signin");
  };

  return (
    <Stack align="center">
      <Title order={3}>Create a new account</Title>
      <form onSubmit={form.onSubmit(signUpUser)}>
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
