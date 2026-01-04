import styles from "./FlowNode.module.css";

type FlowNodeType = {
  children?: React.ReactNode;
};

export function FlowNode({ children }: FlowNodeType) {
  return (
    <div className={styles.flowNode}>
      <header />
      <div className={styles.flowNodeContent}>{children}</div>
    </div>
  );
}
