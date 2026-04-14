import { runCommandAsync } from "./Helpers/RunCommand.mjs";
import { clientFolderName, serverFolderName } from "./Helpers/Globals.mjs";
import open from "open";

runCommandAsync("dotnet ef database update", serverFolderName);
runCommandAsync("dotnet watch run", serverFolderName);
runCommandAsync("npm run dev", clientFolderName);

setTimeout(() => {
  open("https://localhost:49164");
}, 5000);
