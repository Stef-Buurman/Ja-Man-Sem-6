import os from "os";

export const isWindows = os.platform() === "win32";
export const clientFolderName = process.env.npm_package_config_clientOutput || "evfrauddetectionsoftware.client";
export const serverFolderName = process.env.npm_package_config_serverOutput || "EVFraudDetectionSoftware.Server";
export const databaseFolderName = process.env.npm_package_config_DBOutput || "EVFraudDetectionSoftware.database";
export const serverTestFolderName =
    process.env.npm_package_config_serverTestOutput || "EVFraudDetectionSoftware.Server.Test";
export const databaseTestFolderName =
    process.env.npm_package_config_DBTestsOutput || "EVFraudDetectionSoftware.DB.tests";
export const swaggerFilePath = process.env.npm_package_config_swaggerInput || "Swagger/swagger.json";
