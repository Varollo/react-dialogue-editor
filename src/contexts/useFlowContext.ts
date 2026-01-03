import { useContext } from "react";
import { FlowContext } from "./FlowContext";

export function useFlowContext() {
  return useContext(FlowContext);
}