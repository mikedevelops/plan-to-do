import * as Tasks from "~/src/api/Tasks";
import type { SerialisedTask } from "~/src/api/Tasks/TaskTypes";

describe("TaskFactory", () => {
  describe("deserialize", () => {
    test("Should parse a serialised task", () => {
      const created = new Date(1988, 9, 3, 22, 30);
      const modified = new Date(1988, 9, 6, 22, 30);
      const serialisedTask: SerialisedTask = {
        id: 666,
        content: "Hello, World!",
        archived: 1,
        complete: 1,
        created: created.toString(),
        modified: modified.toString(),
      };

      const parsedTask = Tasks.deserialize(serialisedTask);

      expect(parsedTask).toEqual({
        id: 666,
        content: "Hello, World!",
        archived: true,
        complete: true,
        created: created,
        modified: modified,
      });
    });
  });
});
