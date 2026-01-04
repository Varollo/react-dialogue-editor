import { useState, type ChangeEvent, type FormEvent } from "react";
import { ActorInput } from "../ActorInput/ActorInput";
import { FlowNode } from "../FlowNode/FlowNode";
import { LineInput } from "../TextInput/LineInput";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { v4 as uuid } from "uuid";
import { FlowActions } from "../../models/FlowActionModel";
import { useFlowContext } from "../../contexts/useFlowContext";

import styles from "./QuestionNode.module.css";

type AnswerProps = {
  id: string;
  text: string;
};

type QuestionNodeData = {
  actor: string;
  line: string;
  answers: AnswerProps[];
};

export function QuestionNode({
  id,
  data: defaultData,
}: NodeProps<Node<QuestionNodeData>>) {
  const [answers, setAnswers] = useState(defaultData.answers);
  const { dispatch } = useFlowContext();
  const [data, setData] = useState(defaultData);

  function handleLabelChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    handleDataChange(event.target.name, event.target.value);
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
    handleDataChange(event.target.name, event.target.value);
  }

  function handleDataChange(key: string, value: unknown): void {
    const newData = { ...data, [key]: value };
    setData(newData);
    dispatch({
      type: FlowActions.UPDATE_NODE_DATA,
      payload: { id, data: newData },
    });
  }

  function addNewAnswer(event: FormEvent<HTMLFormElement>): void {
    const answerInput = event.currentTarget.elements.namedItem(
      "answer"
    ) as HTMLInputElement;

    setAnswers((prevState) => [
      ...prevState,
      {
        id: uuid(),
        text: answerInput.value,
      },
    ]);

    answerInput.value = "";
    answerInput.focus();

    event.preventDefault();
  }

  return (
    <FlowNode>
      <div className={styles.dialogueContainer}>
        <ActorInput value={data.actor} onChange={handleTitleChange} />
        <LineInput value={data.line} onChange={handleLabelChange} />
      </div>
      <form onSubmit={addNewAnswer} className={styles.questionContainer}>
        <input
          className="nodrag"
          name="answer"
          placeholder="Enter an answer..."
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit">+</button>
      </form>
      <Handle type="target" position={Position.Left} style={{top: "5.65rem"}} />
      
      {answers.length == 0 && <Handle type="source" position={Position.Right} />}
      <div className={styles.answerContainer}>
        {answers.map((answer, i) => (
          <>
            <p className={styles.answer}>{answer.text}</p>
            <Handle
              type="source"
              position={Position.Right}
              style={{ top: `${12.25 + (answers.length - i - 1) * 2.325}rem` }}
              id={answer.id}
              key={answer.id}
            />
          </>
        ))}
      </div>
    </FlowNode>
  );
}
