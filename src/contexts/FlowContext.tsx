import { createContext } from "react";
import { defaultFlowState } from "./defaultFlowState";
import type { FlowStateModel } from "../models/FlowStateModel";
import type { FlowActionModel } from "../models/FlowActionModel";

type FlowValueProps = {
  state: FlowStateModel,
  dispatch: React.Dispatch<FlowActionModel>;
}

const defaultFlowValue: FlowValueProps = {
  state: defaultFlowState,
  dispatch: () => {},
}

export const FlowContext = createContext(defaultFlowValue);
