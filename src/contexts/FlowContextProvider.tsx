import { useState } from "react";
import { FlowContext } from "./flowContext";
import { defaultFlowState } from "./defaultFlowState";

type FlowContextProviderProps = {
  children?: React.ReactNode;
};

export function FlowContextProvider({ children }: FlowContextProviderProps) {
  const [state, setState] = useState(defaultFlowState);

  return (
    <FlowContext.Provider value={{ state, setState }}>
      {children}
    </FlowContext.Provider>
  );
}
