import * as Tasks from "~/src/api/Tasks";
import meow from "meow";
import { loremIpsum } from "lorem-ipsum";
import rl from "readline";

const cli = meow("Create tasks", {
  flags: {
    tasks: {
      alias: "t",
      isRequired: true,
      type: "number",
    },
  },
});

const { stdout } = process;

(async () => {
  stdout.write(`Creating 0/${cli.flags.tasks} tasks`);
  for (let i = 0; i < cli.flags.tasks; i++) {
    await Tasks.create({
      content: loremIpsum({ count: 5 }),
    });
    rl.cursorTo(process.stdout, 0);
    stdout.write(`Creating ${i + 1}/${cli.flags.tasks} tasks`);
  }
  stdout.write("\n");
  process.exit(0);
})();
