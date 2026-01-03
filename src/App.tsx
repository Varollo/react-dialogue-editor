import { useCallback, useState } from "react";
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

const nodeTypes = {
  textUpdater: DialogueNode,
};

const defaultNodes: Node[] = [];
const defaultEdges: Edge[] = [];

export default function App() {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
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
