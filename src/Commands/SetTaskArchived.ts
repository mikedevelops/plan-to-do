import meow from "meow";
import { setTaskArchived, getTask } from "~/src/Tasks/TaskService";

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
  let task = await getTask(cli.flags.task);

  if (task === null) {
    console.log(`Unable to find task with id "${cli.flags.task}`);
    process.exit(0);
    return;
  }

  task = await setTaskArchived(task, cli.flags.archived);
  console.log("Updated 1 Task", task);
})();
