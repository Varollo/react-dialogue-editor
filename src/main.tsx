import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { FlowContextProvider } from "./contexts/FlowContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FlowContextProvider>
      <App />
    </FlowContextProvider>
  </StrictMode>
);
