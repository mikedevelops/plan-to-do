import React, {FormEvent, useState} from "react";
import {Task as TaskType} from "~/src/common/Tasks/types";
import {TemporaryTask} from "~/src/frontend/Tasks/types";

interface TextInputProps {
  task: TaskType|TemporaryTask;
  createTask: (task: TemporaryTask) => void;
  updateTask: (task: TaskType) => void;
  deleteTask: (task: TaskType) => void;
}

const AUTO_SAVE_TIMEOUT = 1500;
const placeholder = "Create a new task";
const isTemporaryTask = (task: TaskType|TemporaryTask): boolean => {
  return !task.hasOwnProperty('id');
};

export const Task = (
  props: TextInputProps
) => {
  const [content, setContent] = useState<string>(props.task.content);
  const showPlaceholder = content === "";
  let timeout: number;
  const handleInput = (event: KeyboardEvent) => {
    if (event.target === null) {
      return;
    }

    clearTimeout(timeout);

    const target = event.target as unknown as HTMLElement;
    requestAnimationFrame(() => {
      if (event.key === "Backspace" && !isTemporaryTask(props.task) && target.innerText === "") {
        console.log("delete!");
        props.deleteTask(props.task as TaskType);
        return;
      }

      setContent(target.innerText);
      timeout = setTimeout(() => {
        if (isTemporaryTask(props.task)) {
          props.createTask({ content: target.innerText });
          return;
        }

        props.updateTask({
          ...props.task as TaskType,
        content: target.innerText,
        });
      }, AUTO_SAVE_TIMEOUT) as unknown as number;
    });
  };
  return (
    <div style={TextInputStyle}>
      { showPlaceholder && <div style={PlaceholderStyle}>{ placeholder }</div> }
      <div
        style={ContentStyle}
        onKeyDown={handleInput}
        contentEditable={true}
        dangerouslySetInnerHTML={{ __html: props.task.content }}
      />
    </div>
  )
};

const TextInputStyle = {
  content: "sadlkfjalsdkjfalsdkjfalsdkjfaldksjf",
  padding: "1rem",
  border: "1px red solid",
  position: "relative",
};

const ContentStyle = {
  border: "1px solid blue",
  position: "absolute",
  width: "100%",
  minHeight: "1rem",
  top: 0,
  left: 0,
  bottom: 0,
  down: 0,
};
const PlaceholderStyle = {
  border: "1px solid red",
  position: "absolute",
  minHeight: "1rem",
  left: 0,
  bottom: 0,
  right: 0,
  top: 0,
  opacity: 0.5
};
