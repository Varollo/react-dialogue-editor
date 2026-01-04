import { Fragment, useState, type ChangeEvent, type FormEvent } from "react";
import { ActorInput } from "../ActorInput/ActorInput";
import { FlowNode } from "../FlowNode/FlowNode";
import { LineInput } from "../TextInput/LineInput";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { v4 as uuid } from "uuid";
import { FlowActions } from "../../models/FlowActionModel";
import { useFlowContext } from "../../contexts/useFlowContext";

import styles from "./QuestionNode.module.css";
import { showMessage } from "../../adapters/showMessage";
import { AnswerInput } from "../AnswerInput/AnswerInput";

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

  function handleLineChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    handleDataChange(event.target.name, event.target.value);
  }

  function handleActorChange(event: ChangeEvent<HTMLInputElement>): void {
    handleDataChange(event.target.name, event.target.value);
  }

  function handleAnswerChange(
    event: React.FocusEvent<HTMLInputElement, Element>
  ): void {
    const id = event.target.id;
    const value = event.target.value;

    /* IF value is empty, REMOVE entry */
    if (!value) {
      setAnswers((prevState) => {
        const newArray = [...prevState];
        return newArray.filter((a) => a.id !== id);
      });
    /* ELSE edit text */
    } else {
      setAnswers((prevState) => {
        const newArray = [...prevState];
        const index = newArray.findIndex((a) => a.id === id);
        newArray[index] = { ...newArray[index], text: value };
        return newArray;
      });
      handleDataChange('answers', answers);
    }
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

    if (answerInput.value) {
      setAnswers((prevState) => [
        ...prevState,
        {
          id: uuid(),
          text: answerInput.value,
        },
      ]);
      handleDataChange('answers', answers);
      answerInput.value = "";
    } else {
      showMessage.warn("Can't add empty answer.");
    }

    answerInput.focus();

    event.preventDefault();
  }

  return (
    <FlowNode>
      <div className={styles.dialogueContainer}>
        <ActorInput value={data.actor} onChange={handleActorChange} />
        <LineInput value={data.line} onChange={handleLineChange} />
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
      <Handle
        type="target"
        position={Position.Left}
        style={{ top: "5.65rem" }}
      />

      {answers.length == 0 && (
        <Handle type="source" position={Position.Right} />
      )}
      <div className={styles.answerContainer}>
        {answers.map((answer, i) => (
          <Fragment key={answer.id}>
            <AnswerInput
              id={answer.id}
              defaultValue={answer.text}
              onBlur={handleAnswerChange}
            />
            <Handle
              type="source"
              position={Position.Right}
              style={{ top: `${12.1 + (answers.length - i - 1) * 2.29}rem` }}
              id={answer.id}
            />
          </Fragment>
        ))}
      </div>
    </FlowNode>
  );
}
