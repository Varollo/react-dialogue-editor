import { createContext } from "react";
import { defaultFlowState } from "./defaultFlowState";
import type { FlowStateModel } from "../models/FlowStateModel";

type FlowValueProps = {
  state: FlowStateModel,
  setState: React.Dispatch<React.SetStateAction<FlowStateModel>>;
}

const defaultFlowValue: FlowValueProps = {
  state: defaultFlowState,
  setState: () => {},
}

export const FlowContext = createContext(defaultFlowValue);
