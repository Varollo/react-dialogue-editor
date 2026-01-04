import { FlowCanvas } from "./components/FlowCanvas/FlowCanvas";
import { MessagesContainer } from "./components/MessageContainer/MessageContainer";
import { FlowContextProvider } from "./contexts/FlowContextProvider";

export default function App() {
  return (
    <FlowContextProvider>
      <MessagesContainer>
        <FlowCanvas />
      </MessagesContainer>
    </FlowContextProvider>
  );
}
