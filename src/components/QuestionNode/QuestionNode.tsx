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
import { GerenicButton } from "../AddNodeButton/GenericButton";
import { PlusIcon } from "lucide-react";

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
  const { dispatch } = useFlowContext();
  const [data, setData] = useState(defaultData);

  function handleLineChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    handleDataChange(event.target.name, event.target.value);
  }

  function handleActorChange(event: ChangeEvent<HTMLInputElement>): void {
    handleDataChange(event.target.name, event.target.value);
  }

  function handleAnswerBlur(
    event: React.FocusEvent<HTMLInputElement, Element>
  ): void {
    const id = event.target.id;
    const value = event.target.value;

    if (!value) {
      deleteAnswer(id);
    }
  }

  function handleAnswerChange(event: ChangeEvent<HTMLInputElement>) {
    const id = event.target.id;
    const value = event.target.value;

    updateAnswer(id, value);
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
      handleDataChange("answers", [
        ...data.answers,
        {
          id: uuid(),
          text: answerInput.value,
        },
      ]);
      answerInput.value = "";
    } else {
      showMessage.warn("Can't add empty answer.");
    }

    answerInput.focus();

    event.preventDefault();
  }

  function updateAnswer(id: string, text: string) {
    const newArray = [...data.answers];
    const index = newArray.findIndex((a) => a.id === id);
    newArray[index] = { ...newArray[index], text };
    handleDataChange("answers", newArray);
  }

  function deleteAnswer(id: string) {
    const newArray = [...data.answers].filter((a) => a.id !== id);
    handleDataChange("answers", newArray);
  }

  function handleCloseNode(): void {
    dispatch({ type: FlowActions.REMOVE_NODE, payload: { id } });
  }

  return (
    <FlowNode onClose={handleCloseNode}>
      <div className={styles.notch1} />
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
        <GerenicButton type="submit">
          <PlusIcon />
        </GerenicButton>
      </form>
      <Handle
        type="target"
        position={Position.Left}
        style={{ top: "6.2rem" }}
      />

      {data.answers.length == 0 && (
        <>
          <div className={styles.notch2} />
          <Handle
            type="source"
            position={Position.Right}
            style={{ top: "6.2rem" }}
          />
        </>
      )}
      <div className={styles.answerContainer}>
        {data.answers.map((answer, i) => (
          <Fragment key={answer.id}>
            <AnswerInput
              id={answer.id}
              onBlur={handleAnswerBlur}
              onDelete={deleteAnswer}
              onChange={handleAnswerChange}
              value={
                data.answers[data.answers.findIndex((a) => a.id === answer.id)]
                  .text
              }
            />
            <Handle
              type="source"
              position={Position.Right}
              style={{
                top: `${13.2 + (data.answers.length - i - 1) * 2.17}rem`,
              }}
              id={answer.id}
            />
          </Fragment>
        ))}
      </div>
    </FlowNode>
  );
}
