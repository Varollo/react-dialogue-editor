import { useReducer } from "react";
import { FlowContext } from "./FlowContext";
import { defaultFlowState } from "./defaultFlowState";
import { flowReducer } from "../reducers/flowReducer";

type FlowContextProviderProps = {
  children?: React.ReactNode;
};

export function FlowContextProvider({ children }: FlowContextProviderProps) {
  const [state, dispatch] = useReducer(flowReducer, defaultFlowState);
  
  return (
    <FlowContext.Provider value={{ state, dispatch }}>
      {children}
    </FlowContext.Provider>
  );
}
