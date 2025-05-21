import { Center, Loader } from "@mantine/core";

export default function LoadingBar() {
  return (
    <Center style={{ height: "100vh", width: "100vw" }}>
      <Loader type="dots" color="cyan" size="xl" />
    </Center>
  );
}
