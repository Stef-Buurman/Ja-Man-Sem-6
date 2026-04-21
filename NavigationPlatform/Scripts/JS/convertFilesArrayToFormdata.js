const fs = require("fs");
const path = require("path");

// ---------------------------
// CONFIG: Read apiOutput from package.json
// ---------------------------
const packageJson = require("../../package.json");
const config = packageJson.config;
const apiDir = path.resolve(config.apiOutput);

// ---------------------------
// Get all .ts files
// ---------------------------
function getAllTsFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllTsFiles(filePath));
    } else if (filePath.endsWith(".ts")) {
      results.push(filePath);
    }
  });
  return results;
}

// ---------------------------
// Simple string replacement approach
// ---------------------------
function convertUploadMethods(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  const originalContent = content;

  const patterns = [
    {
      search:
        /uploadChargepointFile\s*=\s*\(\s*data\s*:\s*\{\s*files\?\s*:\s*File\[\];?\s*\}\s*,\s*params\s*:\s*RequestParams\s*=\s*\{\}\s*,?\s*\)/g,
      replace: "uploadChargepointFile = (data: FormData, params: RequestParams = {})",
    },
    {
      search:
        /uploadTransactionFile\s*=\s*\(\s*data\s*:\s*\{\s*files\?\s*:\s*File\[\];?\s*\}\s*,\s*params\s*:\s*RequestParams\s*=\s*\{\}\s*,?\s*\)/g,
      replace: "uploadTransactionFile = (data: FormData, params: RequestParams = {})",
    },
  ];

  patterns.forEach((pattern) => {
    content = content.replace(pattern.search, pattern.replace);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ Updated: ${filePath}`);
  }
}

// ---------------------------
// DEBUG: Show what we're looking for
// ---------------------------
function debugFile(filePath) {
  console.log(`\n=== DEBUG: ${filePath} ===`);
  const content = fs.readFileSync(filePath, "utf-8");

  const lines = content.split("\n");
  lines.forEach((line, index) => {
    if (line.includes("uploadChargepointFile")) {
      console.log(`Line ${index + 1}: ${line.trim()}`);
      for (let i = 1; i <= 3; i++) {
        if (lines[index + i]) {
          console.log(`        ${lines[index + i].trim()}`);
        }
      }
    }
  });
}

// ---------------------------
// Main function
// ---------------------------
console.log("Starting conversion...");
const tsFiles = getAllTsFiles(apiDir);
console.log(`Found ${tsFiles.length} TypeScript files`);

if (tsFiles.length > 0) {
  debugFile(tsFiles[0]);
}

tsFiles.forEach((file, index) => {
  console.log(`\nProcessing ${index + 1}/${tsFiles.length}: ${path.basename(file)}`);
  convertUploadMethods(file);
});

console.log("\n🎉 Conversion completed!");
