import { runCommand, runCommandAsync } from "./Helpers/RunCommand.mjs";
import { serverFolderName } from "./Helpers/Globals.mjs";

runCommand("dotnet ef database update", serverFolderName);
runCommandAsync("dotnet run", serverFolderName);
