import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

import "./App.css";

function Main() {
  return <div>Hello World</div>;
}

export default function App() {
  return (
    <MantineProvider>
      <Main />
    </MantineProvider>
  );
}
