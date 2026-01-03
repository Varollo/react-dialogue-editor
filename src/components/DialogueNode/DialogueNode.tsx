import { Handle, Position } from "@xyflow/react";
import { useCallback } from "react";

import styles from "./DialogueNode.module.css";

export function DialogueNode() {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className={styles.dialogueNode}>
      <div>
        <header />
        <textarea rows={5} onChange={onChange} className="nodrag" />
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
}
