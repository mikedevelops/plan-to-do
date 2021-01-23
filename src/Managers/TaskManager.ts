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

