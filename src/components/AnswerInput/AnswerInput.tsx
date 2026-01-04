import styles from "./AnswerInput.module.css";

export function AnswerInput(props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className= {`nodrag ${styles.answerInput}`}
      name="actor"
      autoCorrect="off"
      autoComplete="off"
      spellCheck={false}
      {...props}
    />
  );
}
