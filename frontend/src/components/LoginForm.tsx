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

export function LoginForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  const [visible, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const loginUser = async (values: { username: string; password: string }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/auth/signin`, {
      body: JSON.stringify(values),
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data: { message: string } = await response.json();
    if (!response.ok) {
      form.setErrors({
        username: data.message.includes("Username") ? data.message : null,
        password: data.message.includes("Password") ? data.message : null,
      });
      return;
    }
    console.log(data);
    navigate("/");
  };

  return (
    <Stack align="center">
      <Title order={3}>Log in to Chatterd</Title>
      <form onSubmit={form.onSubmit(loginUser)}>
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
