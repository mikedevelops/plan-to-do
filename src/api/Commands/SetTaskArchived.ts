import meow from "meow";
import { setArchived, getById } from "~/src/api/Tasks/TaskService";

const cli = meow("Set a task (un)archived", {
  flags: {
    task: {
      type: "number",
      alias: "t",
      isRequired: true,
    },
    archived: {
      type: "boolean",
      alias: "a",
      default: true,
    },
  },
});

(async () => {
  let task = await getById(cli.flags.task);

  if (task === null) {
    console.log(`Unable to find task with id "${cli.flags.task}`);
    process.exit(0);
    return;
  }

  task = await setArchived(task, cli.flags.archived);
  console.log("Updated 1 Task", task);
})();
