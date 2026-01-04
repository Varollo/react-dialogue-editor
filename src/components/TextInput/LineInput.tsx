import styles from "./LineInput.module.css";

export function LineInput(props: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) {
  return (
    <textarea
      className={`nodrag ${styles.lineInput}`}
      name="line"
      placeholder="Dialogue text..."
      autoCorrect="off"
      autoComplete="off"
      spellCheck={false}
      rows={5}
      {...props}
    />
  );
}
