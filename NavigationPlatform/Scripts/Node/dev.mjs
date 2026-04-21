import { runCommandAsync, runCommand } from "./Helpers/RunCommand.mjs";
import { serverFolderName, clientFolderName } from "./Helpers/Globals.mjs";
import open from "open";

const shouldOpenBrowser = !process.argv.includes("--no");

runCommand("docker compose up postgres pgadmin --build -d");
runCommand("dotnet ef database update", serverFolderName);
runCommandAsync("dotnet watch run", serverFolderName);

setTimeout(() => {
  runCommandAsync("npm run dev", clientFolderName);
}, 5000);

if (shouldOpenBrowser) {
  setTimeout(() => {
    open("https://localhost:49164");
    open("http://localhost:5294/swagger");
  }, 7500);
}
