import { useCallback, useState } from "react";
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DialogueNode } from "./components/DialogueNode/DialogueNode";

import "./styles/index.css";
import { AddNodeButton } from "./components/AddNodeButton/AddNodeButton";
import { v4 as uuid } from "uuid";

const nodeTypes = {
  textUpdater: DialogueNode,
};

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  const addNode = () =>
    setNodes([
      ...nodes,
      {
        id: uuid(),
        type: "textUpdater",
        position: { x: 0, y: 0 },
        data: { label: "Node 3" },
      },
    ]);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
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
