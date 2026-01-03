import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

import styles from "./DialogueNode.module.css";
import { useFlowContext } from "../../contexts/useFlowContext";
import { useState, type ChangeEvent } from "react";
import { FlowActions } from "../../models/FlowActionModel";

type DialogueNodeData = {
  actor: string;
  line: string;
};

export function DialogueNode({ id, data: defaultData }: NodeProps<Node<DialogueNodeData>>) {
  const { dispatch } = useFlowContext();
  const [data, setData] = useState(defaultData);

  function handleLabelChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    handleDataChange(event.target.name, event.target.value);
  }

  function handleTitleChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    handleDataChange(event.target.name, event.target.value);
  }

  function handleDataChange(key: string, value: unknown): void {
    const newData = { ...data, [key]: value }
    setData(newData);
    dispatch({
      type: FlowActions.UPDATE_NODE_DATA,
      payload: { id, data: newData },
    });
  }

  return (
    <div className={styles.dialogueNode}>
      <header />
      <div className={styles.dialogueNodeContent}>
        <input
          className="nodrag"
          name="actor"
          placeholder="Actor Name"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          onChange={handleTitleChange}
          value={data.actor}
        />
        <textarea
          className="nodrag"
          name="line"
          placeholder="Dialogue text..."
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          rows={5}
          onChange={handleLabelChange}
          value={data.line}
        />
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
}
