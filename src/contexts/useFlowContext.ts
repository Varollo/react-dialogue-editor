import { useContext } from "react";
import { FlowContext } from "./flowContext";

export function useFlowContext() {
  return useContext(FlowContext);
}