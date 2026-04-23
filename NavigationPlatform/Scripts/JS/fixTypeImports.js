const fs = require("fs");
const path = require("path");

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (full.endsWith(".ts")) {
      fixFile(full);
    }
  }
}

function normalizeImports(names) {
  return [...new Set(names.map((name) => name.trim()).filter(Boolean))];
}

function fixFile(file) {
  let text = fs.readFileSync(file, "utf8");
  let original = text;

  // Make all imports from data-contracts type-only
  text = text.replace(
    /import\s+\{\s*([^}]+)\s*\}\s+from\s+["'](.+?data-contracts(?:\.ts)?)["'];/g,
    (_, imports, importPath) => {
      const names = normalizeImports(imports.split(","));
      return `import type { ${names.join(", ")} } from "${importPath}";`;
    },
  );

  // Split http-client imports into runtime and type imports
  text = text.replace(
    /import\s+\{\s*([^}]+)\s*\}\s+from\s+["'](.+?http-client(?:\.ts)?)["'];/g,
    (_, imports, importPath) => {
      const names = normalizeImports(imports.split(","));

      const typeImports = names.filter((name) => name === "RequestParams");
      const valueImports = names.filter((name) => name !== "RequestParams");

      const lines = [];

      if (valueImports.length > 0) {
        lines.push(`import { ${valueImports.join(", ")} } from "${importPath}";`);
      }

      if (typeImports.length > 0) {
        lines.push(`import type { ${typeImports.join(", ")} } from "${importPath}";`);
      }

      return lines.join("\n");
    },
  );

  if (text !== original) {
    fs.writeFileSync(file, text, "utf8");
    console.log(`Fixed imports in: ${file}`);
  }
}

walk(path.resolve(process.cwd(), process.env.npm_package_config_apiOutput || "src/api"));
