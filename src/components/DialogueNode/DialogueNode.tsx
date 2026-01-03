import { Handle, Position } from "@xyflow/react";

import styles from "./DialogueNode.module.css";

export function DialogueNode() {
  return (
    <div className={styles.dialogueNode}>
      <div>
        <header />
        <textarea rows={5} className="nodrag" />
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
}
