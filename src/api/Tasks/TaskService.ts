import { sql, getConnection } from "~/src/api/Database";
import { serialiseDate } from "~/src/api/Time";
import { deserialize } from "./TaskFactory";
import assert from "assert";
import type { TaskSerialised } from "./types";
import { Task, TaskUpdateFields } from "~/src/common/Tasks/types";
import { logSql } from "~/src/api/Logger";

interface TaskParams {
  content: string;
}

export const getById = async (id: number): Promise<Task | null> => {
  const query = `SELECT * from tasks where id=${id}`;
  const task = await sql.getOne<TaskSerialised>(await getConnection(), query);

  logSql(query);

  if (task === undefined) {
    return null;
  }

  return deserialize(task);
};

export const create = async (params: TaskParams): Promise<Task> => {
  assert.notStrictEqual(params.content, "", "A new task must have content");

  const query = `INSERT INTO tasks (content) VALUES ('${params.content}')`;
  const updated: number = await sql.run(await getConnection(), query);

  logSql(query);
  assert.strictEqual(updated, 1, "create should update 1 row");

  const task = await sql.getOne<TaskSerialised>(
    await getConnection(),
    `SELECT * FROM tasks ORDER BY id DESC LIMIT 1`
  );

  return deserialize(task);
};

export const update = async (
  task: Task,
  fields: TaskUpdateFields
): Promise<Task> => {
  let query = "UPDATE tasks set ";
  for (const field in fields) {
    let value = fields[field];

    switch (typeof value) {
      case "boolean":
        query += `${field}=${fields[field] ? 1 : 0} `;
        break;
      case "string":
        query += `${field}='${fields[field]}' `;
        break;
    }
  }
  query += `where id=${task.id}`;

  const updated: number = await sql.run(await getConnection(), query);

  logSql(query);
  assert.strictEqual(updated, 1, "update should update 1 row");

  return Object.assign({}, task, fields);
};

export const setComplete = async (
  task: Task,
  complete: boolean
): Promise<Task> => {
  const now = new Date();
  const query = `
    UPDATE tasks 
      set complete=${complete ? 1 : 0},
        modified='${serialiseDate(now)}'
      where id=${task.id}
      `;
  const updated = await sql.run(await getConnection(), query);

  logSql(query);
  assert.strictEqual(updated, 1, "setComplete should update 1 row");

  return Object.assign({}, task, { complete, modified: now });
};

export const setArchived = async (
  task: Task,
  archive: boolean
): Promise<Task> => {
  const now = new Date();
  const query = `
  UPDATE tasks 
      set archived=${archive ? 1 : 0}, 
        modified='${serialiseDate(now)}'
      where id=${task.id}
  `;
  const updated = await sql.run(await getConnection(), query);

  logSql(query);
  assert.strictEqual(updated, 1, "setArchived should update 1 row");

  return Object.assign({}, task, { archived: archive, modified: now });
};

export const getAll = async (
  limit: number,
  offset: number
): Promise<Task[]> => {
  const query = `
    SELECT * from tasks 
      ORDER BY created
      LIMIT ${limit} 
      OFFSET ${offset}`;
  const tasks = await sql.getAll<TaskSerialised>(await getConnection(), query);

  logSql(query);

  return tasks.map(deserialize);
};

export const remove = async (id: number): Promise<void> => {
  const query = `
    DELETE from tasks
      where id=${id}`;
  await sql.run(await getConnection(), query);

  logSql(query);
};
