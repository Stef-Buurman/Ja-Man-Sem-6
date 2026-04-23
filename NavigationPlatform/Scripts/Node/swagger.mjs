import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { runCommand } from "./Helpers/RunCommand.mjs";
import { safeRun } from "./Helpers/SafeRun.mjs";
import { swaggerFilePath, serverFolderName } from "./Helpers/Globals.mjs";

const API_START_COMMAND = "dotnet";
const API_ARGS = ["run", "--project", `${serverFolderName}/${serverFolderName}.csproj`];
const SWAGGER_URL = "http://localhost:5294/swagger/v1/swagger.json";
const OUTPUT_FILE = path.resolve("./" + swaggerFilePath);

const POLL_INTERVAL = 500;
const POLL_TIMEOUT = 20000;

async function main() {
  try {
    console.info("Starting dependent services...");
    runCommand("docker compose up postgres --build -d");

    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    if (!fs.existsSync(OUTPUT_FILE)) {
      fs.writeFileSync(OUTPUT_FILE, "{}");
    }
    console.info("Starting API...");
    spawn(API_START_COMMAND, API_ARGS, {
      stdio: "inherit",
      shell: true,
    });

    await waitForSwagger(SWAGGER_URL, POLL_INTERVAL, POLL_TIMEOUT);

    console.info("Fetching swagger.json...");
    const swaggerData = await fetchSwagger(SWAGGER_URL);
    fs.writeFileSync(OUTPUT_FILE, swaggerData);
    console.info(`swagger.json saved to ${OUTPUT_FILE}`);

    console.info("Stopping API...");
    safeRun("docker compose stop");
    safeRun("taskkill /IM dotnet.exe /F");

    console.info("Done!");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

function waitForSwagger(url, interval, timeout) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      http
        .get(url, (res) => {
          if (res.statusCode === 200) {
            resolve();
          } else {
            retry();
          }
        })
        .on("error", retry);
    };

    const retry = () => {
      if (Date.now() - start > timeout) {
        reject(new Error("Swagger endpoint did not become ready in time"));
      } else {
        setTimeout(check, interval);
      }
    };

    check();
  });
}

function fetchSwagger(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

await main();
