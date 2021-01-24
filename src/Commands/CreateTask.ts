import meow from "meow";
import { createTask } from "~/src/Tasks/TaskService";

const cli = meow("Create a task", {
  flags: {
    content: {
      type: "string",
      alias: "c",
      isRequired: true,
    },
  },
});

(async () => {
  const task = await createTask({ content: cli.flags.content });
  console.log("Created 1 Task", task);
})();
