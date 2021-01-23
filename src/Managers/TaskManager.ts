import sql from "../Database";

interface Task {
  id: number;
  content: string;
  archived: boolean;
  complete: boolean;
  created: Date;
  modified: Date;
}

interface SerialisedTask {
  id: number;
  content: string;
  archived: number;
  complete: number;
  created: string;
  modified: string;
}

interface TaskParams {
  content: string;
}

export const parseTask = (task: SerialisedTask): Task => {
  return {
    id: task.id,
    content: task.content,
    archived: !!task.archived,
    complete: !!task.archived,
    modified: new Date(task.modified),
    created: new Date(task.created),
  }
};

export const getTask = async (id: number): Promise<Task|null> => {
  const task = await sql.get<SerialisedTask>(`SELECT * from tasks where id=${id}`);

  if (task === undefined) {
    return null;
  }

  return parseTask(task);
};

export const createTask = async (params: TaskParams): Promise<Task> => {
  await sql.run(`
    INSERT INTO tasks 
      (content)
      VALUES ('${params.content}')
  `);
  const task = await sql.get<SerialisedTask>(`
    SELECT * FROM tasks ORDER BY id DESC LIMIT 1
  `);

  return parseTask(task);
};

export const setTaskComplete = async (task: Task, complete: boolean): Promise<Task> => {
  await sql.run(`UPDATE tasks set complete=${complete ? 1 : 0}`);
  return Object.assign({}, task, { complete });
};

