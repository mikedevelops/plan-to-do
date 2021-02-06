import React, {ChangeEvent, useEffect, useState} from "react";
import { Task } from "~/src/common/Tasks/types";
import * as TaskService from "./TaskService";
import { Task as TaskComponent } from "./Task";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    if (hydrated) {
      return;
    }

    TaskService.getTasks().then((tasks: Task[]) => {
      setHydrated(true);
      setTasks(tasks);
    });
  });

  return (
    <ol>
      { tasks.map(task => <TaskComponent key={task.id} task={task}/>) }
    </ol>
  )
};