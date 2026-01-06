import { FlowCanvas } from "./components/FlowCanvas/FlowCanvas";
import { MessagesContainer } from "./components/MessageContainer/MessageContainer";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { FlowContextProvider } from "./contexts/FlowContextProvider";

export default function App() {
  return (
    <FlowContextProvider>
      <MessagesContainer>
        <Toolbar />
        <FlowCanvas />
      </MessagesContainer>
    </FlowContextProvider>
  );
}
