import meow from "meow";
import { create } from "~/src/api/Tasks/TaskService";

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
  const task = await create({ content: cli.flags.content });
  console.log("Created 1 Task", task);
})();
