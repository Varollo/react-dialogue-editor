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
import { DialogueNode } from "../DialogueNode/DialogueNode";

import "../../styles/index.css";
import { AddNodeButton } from "../AddNodeButton/AddNodeButton";
import { v4 as uuid } from "uuid";
import { useFlowContext } from "../../contexts/useFlowContext";
import { FlowActions } from "../../models/FlowActionModel";
import { QuestionNode } from "../QuestionNode/QuestionNode";

const nodeTypes = {
  dialogueNode: DialogueNode,
  questionNode: QuestionNode,
};

export function FlowCanvas() {
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

  // const addNode = useCallback(
  //   () =>
  //     dispatch({
  //       type: FlowActions.ADD_NODE,
  //       payload: {
  //         id: uuid(),
  //         type: "dialogueNode",
  //         position: { x: 0, y: 0 },
  //         data: { actor: "", line: "" },
  //       },
  //     }),
  //   [dispatch]
  // );

  const addQuestionNode = useCallback(
    () =>
      dispatch({
        type: FlowActions.ADD_NODE,
        payload: {
          id: uuid(),
          type: "questionNode",
          position: { x: 0, y: 0 },
          data: { actor: "", line: "", answers: [] },
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
      <div style={{
        position: 'absolute',
        right: '2rem',
        bottom: '2rem',
        display: 'flex',
        gap: '0.5rem',
      }}>
        <AddNodeButton onClick={addQuestionNode} />
        {/* <AddNodeButton onClick={addNode} /> */}
      </div>
    </>
  );
}
