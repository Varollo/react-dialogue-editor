import { useCallback } from "react";
import {
  ReactFlow,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DialogueNode } from "./components/DialogueNode/DialogueNode";

import "./styles/index.css";
import { AddNodeButton } from "./components/AddNodeButton/AddNodeButton";
import { v4 as uuid } from "uuid";
import { useFlowContext } from "./contexts/useFlowContext";
import { FlowActions } from "./models/FlowActionModel";

const nodeTypes = {
  dialogueNode: DialogueNode,
};

export default function App() {
  const { state, dispatch } = useFlowContext();

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      dispatch({
        type: FlowActions.UPDATE_NODES,
        payload: changes,
      }),
    [dispatch]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      dispatch({
        type: FlowActions.UPDATE_EDGES,
        payload: changes,
      }),
    [dispatch]
  );

  const onConnect = useCallback(
    (params: Connection) =>
      dispatch({
        type: FlowActions.CONNECT_NODES,
        payload: params,
      }),
    [dispatch]
  );

  const addNode = useCallback(
    () =>
      dispatch({
        type: FlowActions.ADD_NODE,
        payload: {
          id: uuid(),
          type: "dialogueNode",
          position: { x: 0, y: 0 },
          data: { actor: "", line: "" },
        },
      }),
    [dispatch]
  );

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={state.nodes}
          edges={state.edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        />
      </div>
      <AddNodeButton onClick={addNode} />
    </>
  );
}
