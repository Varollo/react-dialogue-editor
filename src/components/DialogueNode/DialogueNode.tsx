import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

import styles from "./DialogueNode.module.css";
import { useFlowContext } from "../../contexts/useFlowContext";
import type { ChangeEvent } from "react";

export type DialogueNodeData = {
  text: string;
};

export function DialogueNode({ id, data }: NodeProps<Node<DialogueNodeData>>) {
  const { setState } = useFlowContext();

  function handleLabelChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const value = event.target.value;

    setState((prevState) => {
      const index = prevState.nodes.findIndex((node) => node.id === id);

      if (index === -1) return prevState;

      const newNodes = [...prevState.nodes];
      newNodes[index].data.text = value;

      return {
        ...prevState,
        nodes: newNodes,
      };
    });
  }

  return (
    <div className={styles.dialogueNode}>
      <div>
        <header />
        <textarea
          rows={5}
          className="nodrag"
          value={data.text}
          onChange={handleLabelChange}
        />
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
}
