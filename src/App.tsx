import { useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
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

const nodeTypes = {
  dialogueNode: DialogueNode,
};

export default function App() {
  const { state, setState } = useFlowContext();

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setState((prevState) => ({
        ...prevState,
        nodes: applyNodeChanges(changes, prevState.nodes),
      })),
    [setState]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setState((prevState) => ({
        ...prevState,
        edges: applyEdgeChanges(changes, prevState.edges),
      })),
    [setState]
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setState((prevState) => ({
        ...prevState,
        edges: addEdge(params, prevState.edges),
      })),
    [setState]
  );

  const addNode = () =>
    setState((prevState) => ({
      ...prevState,
      nodes: [
        ...prevState.nodes,
        {
          id: uuid(),
          type: "dialogueNode",
          position: { x: 0, y: 0 },
          data: { label: "" },
        },
      ],
    }));

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
