import {
  Button,
  Group,
  Stack,
  Title,
  Paper,
  Text,
  Avatar,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

type User = {
  id: number;
  photoUrl: string;
  name: string;
  about: string;
};

export default function RequestManager() {
  return (
    <Stack p="xl">
      <Title order={3}>Friend invites</Title>
      <RequestList />
    </Stack>
  );
}

function RequestList() {
  const [requests, setRequests] = useState<{ id: number; from: User }[]>([]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    fetch(`${apiUrl}/requests/`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((_) => {
        notifications.show({
          title: "Something went wrong!",
          message: "Couldn't fetch requests list",
          color: "red",
        });
      });
  }, [update]);

  if (requests.length === 0)
    return (
      <Text style={{ flex: 1 }} c="dimmed">
        Go socialize buddy...
      </Text>
    );

  const decide = (id: number, accept: boolean) => async () => {
    try {
      const res = await fetch(`${apiUrl}/requests/${id}`, {
        credentials: "include",
        method: accept ? "PUT" : "DELETE",
      });
      if (!res.ok) throw Error();
      setUpdate((o) => o + 1);
      notifications.show({
        title: "Success",
        message: accept
          ? "Friend added successfully"
          : "Removed request successfully",
      });
    } catch (e) {
      notifications.show({
        title: "Something went wrong!",
        message: accept ? "Couldn't accept request" : "Couldn't remove request",
        color: "red",
      });
    }
  };

  return (
    <>
      {requests.map((e) => (
        <RequestBar
          user={e.from}
          key={e.id}
          delFunc={decide(e.id, false)}
          accFunc={decide(e.id, true)}
        />
      ))}
    </>
  );
}

function RequestBar({
  user,
  delFunc,
  accFunc,
}: {
  user: User;
  delFunc: () => void;
  accFunc: () => void;
}) {
  return (
    <Paper withBorder shadow="md" p="md">
      <Group>
        <Avatar
          color="initials"
          name={user.name}
          src={`${apiUrl}/public/${user.photoUrl}`}
        />
        <Text>{user.name}</Text>
        <Text style={{ flex: 1 }} c="dimmed" size="sm">
          {user.about}
        </Text>
        <Button onClick={accFunc}>Accept</Button>
        <Button onClick={delFunc} color="red">
          Reject
        </Button>
      </Group>
    </Paper>
  );
}
