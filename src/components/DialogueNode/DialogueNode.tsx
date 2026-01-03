import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

import styles from "./DialogueNode.module.css";
import { useFlowContext } from "../../contexts/useFlowContext";
import type { ChangeEvent } from "react";
import { FlowActions } from "../../models/FlowActionModel";

export type DialogueNodeData = {
  label: string;
};

export function DialogueNode({ id, data }: NodeProps<Node<DialogueNodeData>>) {
  const { dispatch } = useFlowContext();

  function handleLabelChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    dispatch({
      type: FlowActions.UPDATE_NODE_DATA,
      payload: { id, data: {...data, label: event.target.value} },
    });
  }

  return (
    <div className={styles.dialogueNode}>
      <div>
        <header />
        <textarea
          rows={5}
          className="nodrag"
          onBlur={handleLabelChange}
        />
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
}
