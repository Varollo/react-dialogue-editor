import styles from "./AddNodeButton.module.css";

export function AddNodeButton(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return <button className={styles.addNodeButton} {...props}>+</button>;
}
