import { runCommandAsync } from "./Helpers/RunCommand.mjs";
import { serverFolderName } from "./Helpers/Globals.mjs";
import open from "open";

runCommandAsync("dotnet watch run", serverFolderName);

setTimeout(() => {
    open("https://localhost:58895");
}, 5000);
