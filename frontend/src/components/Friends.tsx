import {
  Button,
  Group,
  Stack,
  TextInput,
  Title,
  Paper,
  Text,
  Avatar,
  CloseButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

type User = {
  id: number;
  photoUrl: string;
  name: string;
  about: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

export default function Friends() {
  const [update, setUpdate] = useState(0);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
    },
    validate: {
      username: (name) => (name.length > 0 ? null : "Please enter an username"),
    },
  });

  const sendRequest = async (values: { username: string }) => {
    const response = await fetch(`${apiUrl}/requests/${values.username}`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      form.setErrors({ username: "Could not send request" });
      return;
    }
    form.reset();
    form.clearErrors();
    notifications.show({
      title: "Success",
      message: "Sent a friend request successfully",
    });
  };

  return (
    <Stack p="xl">
      <form onSubmit={form.onSubmit(sendRequest)}>
        <Group align="center">
          <TextInput
            mih="85"
            label="Add friends"
            placeholder="Enter username"
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <Button type="submit">Send Request</Button>
        </Group>
      </form>
      <Group>
        <Title order={3}>Friends List</Title>
        <Button variant="outline" onClick={() => setUpdate((o) => o + 1)}>
          Refresh
        </Button>
      </Group>
      <FriendList update={update} setUpdate={setUpdate} />
    </Stack>
  );
}

function FriendList({
  update,
  setUpdate,
}: {
  update: number;
  setUpdate: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/friends/`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setFriends(data))
      .catch((_) => {
        notifications.show({
          title: "Something went wrong!",
          message: "Couldn't fetch friends list",
          color: "red",
        });
      });
  }, [update]);

  if (friends.length === 0)
    return (
      <Text style={{ flex: 1 }} c="dimmed">
        You are so lonely...
      </Text>
    );

  const delFunc = (id: number) => async () => {
    try {
      const res = await fetch(`${apiUrl}/friends/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      if (!res.ok) throw Error();
      setUpdate((o) => o + 1);
      notifications.show({
        title: "Success",
        message: "Removed friend successfully",
      });
    } catch (e) {
      notifications.show({
        title: "Something went wrong!",
        message: "Couldn't remove friend",
        color: "red",
      });
    }
  };

  return (
    <>
      {friends.map((e) => (
        <FriendBar user={e} key={e.id} delFunc={delFunc(e.id)} />
      ))}
    </>
  );
}

function FriendBar({ user, delFunc }: { user: User; delFunc: () => void }) {
  return (
    <Paper withBorder shadow="md" p="md">
      <Group>
        <Avatar
          color="initials"
          name={user.name}
          src={
            user.photoUrl !== null ? `${apiUrl}/public/${user.photoUrl}` : ""
          }
        />
        <Text>{user.name}</Text>
        <Text style={{ flex: 1 }} c="dimmed" size="sm">
          {user.about}
        </Text>
        <CloseButton size="lg" onClick={delFunc} />
      </Group>
    </Paper>
  );
}
