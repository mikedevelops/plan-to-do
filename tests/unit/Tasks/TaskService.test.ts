import { sql } from "~/src/api/Database";
import type { TaskSerialised } from "~/src/api/Tasks/types";
import * as Tasks from "~/src/api/Tasks";
import { AssertionError } from "assert";
import { Task } from "~/src/common/Tasks/types";

jest.mock("~/src/api/Database/DatabaseService");
jest.mock("~/src/api/Database/ConnectionFactory");
jest.mock("~/src/api/Tasks/TaskFactory");

const deserializeMock = Tasks.deserialize as jest.Mock;
const sqlGetMock = sql.getOne as jest.Mock;
const sqlRunMock = sql.run as jest.Mock;

describe("Tasks", () => {
  describe("getTask", () => {
    test("Should return null for a task not found", async () => {
      sqlGetMock.mockReturnValue(Promise.resolve(undefined));

      const task = await Tasks.getById(666);

      expect(task).toBeNull();
    });

    test("Should return a task", async () => {
      const created = new Date(1988, 9, 3, 22, 30);
      const modified = new Date(1988, 9, 3, 22, 30);
      const serialisedTask: TaskSerialised = {
        id: 666,
        content: "Hello, World!",
        archived: 0,
        complete: 0,
        created: created.toString(),
        modified: modified.toString(),
      };
      const parsedTask: Task = {
        id: serialisedTask.id,
        content: serialisedTask.content,
        archived: false,
        complete: false,
        created: created,
        modified: modified,
      };
      sqlGetMock.mockReturnValue(Promise.resolve(serialisedTask));
      deserializeMock.mockReturnValue(Promise.resolve(parsedTask));

      const task = await Tasks.getById(666);

      expect(task).toEqual(parsedTask);
    });
  });

  describe("createTask", () => {
    test("Should create a task and return it", async () => {
      const created = new Date(1988, 9, 3, 22, 30);
      const modified = new Date(1988, 9, 3, 22, 45);
      const serialisedTask: TaskSerialised = {
        id: 666,
        content: "Hello, World",
        complete: 0,
        archived: 0,
        created: created.toString(),
        modified: modified.toString(),
      };
      const parsedTask: Task = {
        id: 666,
        content: "Hello, World!",
        complete: false,
        archived: false,
        created: created,
        modified: modified,
      };
      sqlRunMock.mockReturnValue(Promise.resolve(1));
      sqlGetMock.mockReturnValue(Promise.resolve(serialisedTask));
      deserializeMock.mockReturnValue(Promise.resolve(parsedTask));

      const task = await Tasks.create({ content: "Hello, World!" });

      expect(task).toEqual({
        id: 666,
        content: "Hello, World!",
        archived: false,
        complete: false,
        modified: modified,
        created: created,
      });
    });
  });

  describe("setTaskComplete", () => {
    test("Should set task complete", async () => {
      const created = new Date(1988, 9, 3, 22, 30);
      const modified = new Date(1988, 9, 3, 22, 45);
      const task: Task = {
        id: 666,
        content: "Hello, World!",
        archived: false,
        complete: false,
        created: created,
        modified: modified,
      };
      sqlRunMock.mockReturnValue(Promise.resolve(1));

      const updatedTask = await Tasks.setComplete(task, true);

      expect(updatedTask.modified.getTime()).toBeGreaterThan(
        task.modified.getTime()
      );
      expect(updatedTask).toEqual({
        id: task.id,
        content: task.content,
        archived: task.archived,
        complete: true,
        created: task.created,
        modified: expect.any(Date),
      });
    });

    test("Should set task incomplete", async () => {
      const created = new Date(1988, 9, 3, 22, 30);
      const modified = new Date(1988, 9, 3, 22, 45);
      const task: Task = {
        id: 666,
        content: "Hello, World!",
        archived: false,
        complete: false,
        created: created,
        modified: modified,
      };
      sqlRunMock.mockReturnValue(Promise.resolve(1));

      const updatedTask = await Tasks.setComplete(task, false);

      expect(updatedTask.modified.getTime()).toBeGreaterThan(
        task.modified.getTime()
      );
      expect(updatedTask).toEqual({
        id: task.id,
        content: task.content,
        archived: task.archived,
        complete: false,
        created: task.created,
        modified: expect.any(Date),
      });
    });

    test("Should throw if task is not updated", async () => {
      const created = new Date(1988, 9, 3, 22, 30);
      const modified = new Date(1988, 9, 3, 22, 45);
      const task: Task = {
        id: 666,
        content: "Hello, World!",
        archived: false,
        complete: false,
        created: created,
        modified: modified,
      };
      sqlRunMock.mockReturnValue(Promise.resolve(0));

      expect.assertions(1);

      try {
        await Tasks.setComplete(task, false);
      } catch (error) {
        expect(error).toBeInstanceOf(AssertionError);
      }
    });
  });

  describe("setTaskArchived", () => {
    test("Should set task archived", async () => {
      const created = new Date(1988, 9, 3, 22, 30);
      const modified = new Date(1988, 9, 3, 22, 45);
      const task: Task = {
        id: 666,
        content: "Hello, World!",
        archived: false,
        complete: false,
        created: created,
        modified: modified,
      };
      sqlRunMock.mockReturnValue(Promise.resolve(1));

      const updatedTask = await Tasks.setArchived(task, true);

      expect(updatedTask.modified.getTime()).toBeGreaterThan(
        task.modified.getTime()
      );
      expect(updatedTask).toEqual({
        id: task.id,
        content: task.content,
        archived: true,
        complete: task.complete,
        created: task.created,
        modified: expect.any(Date),
      });
    });

    test("Should set task unarchived", async () => {
      const created = new Date(1988, 9, 3, 22, 30);
      const modified = new Date(1988, 9, 3, 22, 45);
      const task: Task = {
        id: 666,
        content: "Hello, World!",
        archived: true,
        complete: false,
        created: created,
        modified: modified,
      };
      sqlRunMock.mockReturnValue(Promise.resolve(1));

      const updatedTask = await Tasks.setArchived(task, false);

      expect(updatedTask.modified.getTime()).toBeGreaterThan(
        task.modified.getTime()
      );
      expect(updatedTask).toEqual({
        id: task.id,
        content: task.content,
        archived: false,
        complete: task.complete,
        created: task.created,
        modified: expect.any(Date),
      });
    });

    test("Should throw if task is not updated", async () => {
      const created = new Date(1988, 9, 3, 22, 30);
      const modified = new Date(1988, 9, 3, 22, 45);
      const task: Task = {
        id: 666,
        content: "Hello, World!",
        archived: false,
        complete: false,
        created: created,
        modified: modified,
      };
      sqlRunMock.mockReturnValue(Promise.resolve(0));

      expect.assertions(1);

      try {
        await Tasks.setArchived(task, false);
      } catch (error) {
        expect(error).toBeInstanceOf(AssertionError);
      }
    });
  });

  describe("getTasks", () => {
    test("Should return a task list", () => {});
  });
});
