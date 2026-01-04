import { Trash2Icon } from "lucide-react";
import { GerenicButton } from "../AddNodeButton/GenericButton";
import styles from "./AnswerInput.module.css";

type AnswerInputProps = {
  id: string;
  onDelete?: (id: string) => void;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function AnswerInput({ id, onDelete, ...props }: AnswerInputProps) {
  function handleDelete(): void {
    if (onDelete) {
      onDelete(id);
    }
  }

  return (
    <div className={styles.answerInput}>
      <GerenicButton onClick={handleDelete} size="1.25rem">
        <Trash2Icon />
      </GerenicButton>
      <input
        id={id}
        className="nodrag"
        name="actor"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        {...props}
      />
    </div>
  );
}
