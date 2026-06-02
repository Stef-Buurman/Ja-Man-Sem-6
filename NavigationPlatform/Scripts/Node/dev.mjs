import { runCommandAsync, runCommand } from "./Helpers/RunCommand.mjs";
import { serverFolderName, clientFolderName } from "./Helpers/Globals.mjs";
import open from "open";

const shouldOpenBrowser = !process.argv.includes("--no");

runCommand("docker compose up postgres pgadmin --build -d");
runCommand("dotnet ef database update", serverFolderName);
runCommandAsync("dotnet watch run", serverFolderName);
runCommandAsync("npm run dev", clientFolderName);

if (shouldOpenBrowser) {
  setTimeout(() => {
    open("https://localhost:5173");
    open("http://localhost:5294/swagger");
  }, 5000);
}
