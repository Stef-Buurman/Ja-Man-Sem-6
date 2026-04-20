import { runCommandAsync } from "./Helpers/RunCommand.mjs";
import { serverFolderName } from "./Helpers/Globals.mjs";
import open from "open";

runCommandAsync("dotnet ef database update", serverFolderName);
runCommandAsync("dotnet run", serverFolderName);

setTimeout(() => {
  open("https://localhost:49164");
}, 5000);
