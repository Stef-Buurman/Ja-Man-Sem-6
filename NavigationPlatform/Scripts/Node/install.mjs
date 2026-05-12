import { runCommandAsync, runCommand } from "./Helpers/RunCommand.mjs";
import { serverFolderName, clientFolderName } from "./Helpers/Globals.mjs";

await runCommandAsync("dotnet add package Microsoft.AspNetCore.SignalR", serverFolderName);
await runCommandAsync("dotnet add package Microsoft.EntityFrameworkCore", serverFolderName);
await runCommandAsync("dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL", serverFolderName);
await runCommandAsync("dotnet add package Microsoft.EntityFrameworkCore.Design", serverFolderName);
await runCommandAsync("dotnet tool install --global dotnet-ef", serverFolderName);
await runCommandAsync("dotnet tool update --global dotnet-ef", serverFolderName);
