import styles from "./ActorInput.module.css";

export function ActorInput(props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className= {`nodrag ${styles.actorInput}`}
      name="actor"
      placeholder="Actor Name"
      autoCorrect="off"
      autoComplete="off"
      spellCheck={false}
      {...props}
    />
  );
}
