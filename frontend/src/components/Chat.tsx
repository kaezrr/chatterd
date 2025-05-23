import {
  Group,
  Stack,
  Tabs,
  Title,
  Paper,
  Avatar,
  Text,
  Button,
  TextInput,
  Divider,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import { format } from "date-fns";
import { useForm } from "@mantine/form";

type User = {
  id: number;
  photoUrl: string;
  name: string;
  about: string;
};

type Message = {
  id: number;
  you: boolean;
  message: string;
  when: Date;
};

const apiUrl = import.meta.env.VITE_API_URL;

export default function Chat() {
  const [friends, setFriends] = useState<User[]>([]);
  const [update, setUpdate] = useState(0);

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

  return (
    <Stack p="md">
      <Group>
        <Title order={2}>Your Chats</Title>
        <Button variant="outline" onClick={() => setUpdate((o) => o + 1)}>
          Refresh
        </Button>
      </Group>
      {friends.length === 0 && (
        <Text c="dimmed">You don't seem to have any friends right now...</Text>
      )}
      {friends.length > 0 && (
        <Tabs orientation="vertical" defaultValue={friends[0].name}>
          <Tabs.List miw="200">
            {friends.map((e) => (
              <Tabs.Tab value={e.name} key={e.id}>
                <Group>
                  <Avatar
                    color="initials"
                    name={e.name}
                    src={e.photoUrl ? `${apiUrl}/public/${e.photoUrl}` : ""}
                  />
                  <Title order={4}>{e.name}</Title>
                </Group>
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {friends.map((e) => (
            <Tabs.Panel value={e.name} pl="md" pr="md">
              <PersonalChat who={e.id} token={update} refresh={setUpdate} />
            </Tabs.Panel>
          ))}
        </Tabs>
      )}
    </Stack>
  );
}

function PersonalChat({
  refresh,
  token,
  who,
}: {
  token: number;
  refresh: React.Dispatch<React.SetStateAction<number>>;
  who: number;
}) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      message: "",
    },
  });

  const sendMessage = async (values: { message: string }) => {
    const response = await fetch(`${apiUrl}/messages/${who}`, {
      body: JSON.stringify(values),
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      form.setErrors({ message: "Could not send message" });
      return;
    }
    form.reset();
    form.clearErrors();
    refresh((o) => o + 1);
  };

  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    fetch(`${apiUrl}/messages/`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((_) => {
        notifications.show({
          title: "Something went wrong!",
          message: "Couldn't fetch messages list",
          color: "red",
        });
      });
  }, [token]);

  return (
    <Stack>
      <form onSubmit={form.onSubmit(sendMessage)}>
        <Group>
          <TextInput
            required
            key={form.key("message")}
            placeholder="Write your message here"
            style={{ flex: 1 }}
            {...form.getInputProps("message")}
          />
          <Button type="submit">Send</Button>
        </Group>
      </form>
      <Divider
        variant="dashed"
        label="Your conversation"
        labelPosition="center"
      />
      <Stack>
        {messages.map((e) => (
          <ChatBubble msg={e.message} date={e.when} your={e.you} key={e.id} />
        ))}
      </Stack>
    </Stack>
  );
}

function ChatBubble({
  msg,
  date,
  your,
}: {
  msg: string;
  date: Date;
  your: boolean;
}) {
  return (
    <Group justify={your ? "end" : "start"}>
      <Paper withBorder p="md" bg={your ? "darkgreen" : "darkblue"} radius="lg">
        <Text>{msg}</Text>
        <Text ta="end" size="xs" c="dimmed">
          {format(date, "HH:mm - MMM dd")}
        </Text>
      </Paper>
    </Group>
  );
}
