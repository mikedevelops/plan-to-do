import React, {useEffect, useState} from "react";
import {Task} from "~/src/common/Tasks/types";
import * as TaskService from "./TaskService";
import {Task as TaskComponent} from "~/src/frontend/Tasks/Task";
import {TemporaryTask} from "~/src/frontend/Tasks/types";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const placeholder = "Create a new item";
  const handleCreateTask = async (newTask: TemporaryTask) => {
    const task = await TaskService.createTask(newTask);
    setTasks([...tasks, task]);
  };
  const handleUpdateTask = async (updatedTask: Task) => {
    const task = await TaskService.updateTask(updatedTask);
    setTasks(tasks.map(thisTask => thisTask.id === task.id ? task : thisTask));
  };
  const handleDeleteTask = async (taskToDelete: Task) => {
    const task = await TaskService.deleteTask(taskToDelete);
    setTasks(tasks.filter(thisTask => thisTask.id != task.id));
  };

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
    <div>
      {
        tasks.map(task =>
          <TaskComponent
            key={task.id}
            task={task}
            createTask={handleCreateTask}
            updateTask={handleUpdateTask}
            deleteTask={handleDeleteTask}
          />
        )
      }
      <TaskComponent
        task={{ content: "" }}
        createTask={handleCreateTask}
        updateTask={handleUpdateTask}
        deleteTask={handleDeleteTask}
      />
    </div>
  )
};