import React, {ChangeEvent, useState} from "react";
import type { Task as TaskType } from "~/src/common/Tasks/types";
import * as TaskService from "~/src/frontend/Tasks/TaskService";

const AUTOSAVE_DEBOUNCE = 1500;

export const Task = ({ task }: { task: TaskType }) => {
  const [isComplete, setComplete] = useState<boolean>(task.complete);
  let timeout: number|null = null;
  const handleSetComplete = (event: ChangeEvent) => {
    if (event.target === null) {
      return;
    }

    const target = event.target as HTMLInputElement;
    // TODO: this might fail!
    TaskService.setTaskComplete(task.id, target.checked);
    setComplete(target.checked);
  };
  const handleInput = (event: InputEvent) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    const target = event.target as HTMLInputElement;
    timeout = setTimeout(() => {
      // TODO this might fail!
      TaskService.saveContent(task.id, target.value);
    }, AUTOSAVE_DEBOUNCE) as unknown as number; // TS is using the Node setTimeout \o/
  };

  return (
    <div>
      <form>
        <input onChange={handleSetComplete} type="checkbox" checked={isComplete}/>
        <textarea onInput={handleInput} disabled={isComplete} defaultValue={task.content}/>
      </form>
    </div>
  );
};
