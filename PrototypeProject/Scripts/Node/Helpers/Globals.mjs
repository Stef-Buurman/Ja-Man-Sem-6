import os from "os";

export const isWindows = os.platform() === "win32";
export const clientFolderName =
  process.env.npm_package_config_clientOutput ||
  "encryptionhashingprototype.client";
export const serverFolderName =
  process.env.npm_package_config_serverOutput ||
  "EncryptionHashingPrototype.Server";
export const swaggerFilePath =
  process.env.npm_package_config_swaggerInput || "Swagger/swagger.json";
