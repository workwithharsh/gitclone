import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Import controllers
import { addFiles } from "./controllers/add.controller.js";
import { commitChanges } from "./controllers/commit.controller.js";
import { initRepo } from "./controllers/init.controller.js";
import { pullChanges } from "./controllers/pull.controller.js";
import { pushChanges } from "./controllers/push.controller.js";
import { revertChanges } from "./controllers/revert.controller.js";

// Initialize yargs & Define commands
yargs(hideBin(process.argv))
  .command("init", "Create a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add files to the staging area",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    addFiles
  )
  .command(
    "commit <message>",
    "Commit staged changes",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    commitChanges
  )
  .command("push", "Push commits to the remote repository", {}, pushChanges)
  .command(
    "pull",
    "Fetch and merge changes from the remote repository",
    {},
    pullChanges
  )
  .command(
    "revert <commitID>",
    "Revert changes to a previous commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Commit Id to revert to",
        type: "string",
      });
    },
    revertChanges
  )
  .demandCommand(1, "Please specify an action")
  .help().argv;
