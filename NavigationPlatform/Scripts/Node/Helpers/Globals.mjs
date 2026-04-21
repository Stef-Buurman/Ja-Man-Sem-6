import os from "os";

export const isWindows = os.platform() === "win32";
export const clientFolderName = process.env.npm_package_config_clientOutput || "navigationPlatform.client";
export const serverFolderName = process.env.npm_package_config_serverOutput || "NavigationPlatform.Server";
export const swaggerFilePath = process.env.npm_package_config_swaggerInput || "Swagger/swagger.json";
