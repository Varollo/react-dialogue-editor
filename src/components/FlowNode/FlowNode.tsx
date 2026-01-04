import { XIcon } from "lucide-react";
import { GerenicButton } from "../AddNodeButton/GenericButton";
import styles from "./FlowNode.module.css";

type FlowNodeType = {
  children?: React.ReactNode;
  onClose?: () => void;
};

export function FlowNode({ onClose, children }: FlowNodeType) {
  return (
    <div className={styles.flowNode}>
      <header><GerenicButton onClick={onClose} size="1rem"><XIcon /></GerenicButton></header>
      <div className={styles.flowNodeContent}>{children}</div>
    </div>
  );
}
