import { Button, Avatar, FileButton, TextInput, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

type User = {
  name: string;
  photoUrl: string;
  about: string;
};

export default function Profile({ user }: { user: User }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      about: user.about,
    },
  });

  const updateAbout = async (values: { about: string }) => {
    const response = await fetch(`${apiUrl}/users/about`, {
      body: JSON.stringify(values),
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      form.setErrors({
        about: "Something went wrong",
      });
      return;
    }
    notifications.show({
      title: "About updated!",
      message: "Please refresh the page to see changes.",
    });
  };

  const updateAvatar = (file: File | null) => {
    if (file === null) return;
    const formData = new FormData();
    formData.append("avatar", file);
    fetch(`${apiUrl}/users/display`, {
      body: formData,
      method: "PUT",
      credentials: "include",
    }).then((res) => {
      if (!res.ok) {
        alert("Error while uploading photo!");
        return;
      }
      notifications.show({
        title: "Avatar updated!",
        message: "Please refresh the page to see changes.",
      });
    });
  };

  return (
    <Group p="xl" justify="center" gap="xl">
      <Avatar
        color="initials"
        name={user.name}
        src={`${apiUrl}/public/${user.photoUrl}`}
        size="200"
      />
      <form onSubmit={form.onSubmit(updateAbout)}>
        <TextInput
          label="About"
          placeholder="A brief description about yourself"
          key={form.key("about")}
          {...form.getInputProps("about")}
        />
        <Group grow justify="flex-end" mt="md">
          <FileButton onChange={updateAvatar} accept="image/png,image/jpeg">
            {(props) => <Button {...props}>Update avatar</Button>}
          </FileButton>
          <Button type="submit">Update About</Button>
        </Group>
      </form>
    </Group>
  );
}
