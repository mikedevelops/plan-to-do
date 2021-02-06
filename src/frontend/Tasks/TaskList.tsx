import React, {ChangeEvent, useEffect, useState} from "react";
import { Task } from "~/src/common/Tasks/types";
import * as TaskService from "./TaskService";

export const TaskItem = ({ task }: { task: Task }) => {
  const [isComplete, setComplete] = useState<boolean>(task.complete);
  const handleSetComplete = (event: ChangeEvent) => {
    if (event.target === null) {
      return;
    }

    const target = event.target as HTMLInputElement;
    // TODO: this might fail!
    TaskService.setTaskComplete(target.checked, task);
    setComplete(target.checked);
  };

  return (
    <div>
      <form>
        <input onChange={handleSetComplete} type="checkbox" checked={isComplete}/>
        <textarea disabled={isComplete} defaultValue={task.content}/>
      </form>
    </div>
  );
};

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    if (hydrated) {
      return;
    }

    TaskService.getTasks().then((tasks: Task[]) => {
      setTasks(tasks);
      setHydrated(true);
    });
  });

  return (
    <ol>
      { tasks.map(task => <TaskItem key={task.id} task={task}/>) }
    </ol>
  )
};