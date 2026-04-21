const fs = require("fs");
const path = require("path");
const packageJson = require("../../package.json");
const config = packageJson.config;

const apiDir = path.join(process.cwd(), config.apiOutput);
const httpClientValueImports = new Set(["ContentType", "HttpClient"]);

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (e.isFile() && full.endsWith(".ts")) out.push(full);
  }
  return out;
}

function normalizeNames(raw) {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/\s+as\s+.+$/, "").trim()); // drop aliases for matching
}

for (const file of walk(apiDir)) {
  let text = fs.readFileSync(file, "utf8");
  const original = text;

  // 1) data-contracts => type import
  text = text.replace(
    /import\s*\{([\s\S]*?)\}\s*from\s*["']\.\/data-contracts["'];?/g,
    (_, names) => `import type {${names}} from "./data-contracts";`,
  );

  // 2) http-client => split value/type imports
  text = text.replace(/import\s*\{([\s\S]*?)\}\s*from\s*["']\.\/http-client["'];?/g, (_, namesRaw) => {
    const parts = namesRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const valueParts = [];
    const typeParts = [];

    for (const p of parts) {
      const base = p.replace(/\s+as\s+.+$/, "").trim();
      if (httpClientValueImports.has(base)) valueParts.push(p);
      else typeParts.push(p);
    }

    const lines = [];
    if (valueParts.length) lines.push(`import { ${valueParts.join(", ")} } from "./http-client";`);
    if (typeParts.length) lines.push(`import type { ${typeParts.join(", ")} } from "./http-client";`);
    return lines.join("\n");
  });

  if (text !== original) {
    fs.writeFileSync(file, text, "utf8");
    console.log(`patched: ${path.relative(process.cwd(), file)}`);
  }
}
