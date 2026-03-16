const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const packageJson = require("../../package.json");
const config = packageJson.config;

const apiDir = path.resolve(config.apiOutput);
const outputDir = path.resolve(config.apiOutput + "/methods");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  const typesFile = path.join(outputDir, "Types.ts");
  const typesContent = `
import type { HttpResponse, RequestParams } from "../http-client";

export type ExtractResponse<T> =
  T extends Promise<HttpResponse<infer R, any>> ? R : never;
export type UnwrapArray<T> = T extends (infer U)[] ? U : T;
export type ExtractDataIfPaginated<T> = T extends { data?: (infer U)[] | null }
  ? U
  : T;
export type SortableKeys<T> = keyof UnwrapArray<ExtractDataIfPaginated<T>>;
export type ResponseMapper<TIn, TOut> = (input: TIn) => TOut;
export type ToastOptions = {
  toastSuccess?: { message: string; title?: string };
  toastError?: { message: string; title?: string };
};
export type WithoutRequestParams<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends RequestParams
    ? Rest
    : [First, ...WithoutRequestParams<Rest>]
  : [];
`.trim();

  const formattedTypes = await prettier.format(typesContent, {
    parser: "typescript",
  });
  fs.writeFileSync(typesFile, formattedTypes);
})().catch(console.error);

const apiFiles = fs
  .readdirSync(apiDir)
  .filter(
    (f) =>
      f.endsWith(".ts") &&
      f !== "http-client.ts" &&
      f !== "data-contracts.ts" &&
      !f.includes(".api"),
  );

const pascalCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const toQueryName = (str) => `${pascalCase(str)}Query`;

(async () => {
  for (const file of apiFiles) {
    const filePath = path.join(apiDir, file);
    const source = fs.readFileSync(filePath, "utf8");

    const className = file
      .replace(".ts", "")
      .split("-")
      .map(pascalCase)
      .join("");

    const instanceName =
      className.charAt(0).toLowerCase() + className.slice(1) + "Api";

    const methodRegex = /^\s*(\w+)\s*=\s*\(/gm;

    const paginatedMethods = [];
    const simpleQueryMethods = [];
    const nonQueryMethods = [];

    let match;

    while ((match = methodRegex.exec(source)) !== null) {
      const methodName = match[1];

      const signatureRegex = new RegExp(
        `${methodName}\\s*=\\s*\\(([^)]*)\\)\\s*=>`,
        "m",
      );
      const signatureMatch = source.match(signatureRegex);
      if (!signatureMatch) continue;

      const params = signatureMatch[1].trim();

      // Extract return type
      const returnTypeRegex = new RegExp(
        `${methodName}[\\s\\S]*?this\\.request<([^,>]+)`,
        "m",
      );

      const returnMatch = source.match(returnTypeRegex);
      const returnType = returnMatch?.[1] ?? "";

      const isPaginated =
        returnType.includes("ApiPaginationResponse") ||
        returnType.trim().endsWith("[]");

      if (params.startsWith("query")) {
        if (isPaginated) {
          paginatedMethods.push(methodName);
        } else {
          simpleQueryMethods.push(methodName);
        }
      } else {
        nonQueryMethods.push(methodName);
      }
    }

    /* =======================
       Query Types
       ======================= */

    const types = [...paginatedMethods, ...simpleQueryMethods]
      .map((m) =>
        `
export type ${toQueryName(m)} =
  NonNullable<Parameters<${className}["${m}"]>[0]>;
`.trim(),
      )
      .join("\n\n");

    /* =======================
       Paginated Query Methods
       ======================= */

    const paginatedMethodOverloads = paginatedMethods
      .map((m) =>
        `
export async function ${m}(
  filters: FilterFormValues<${toQueryName(m)}>[] = [],
  page = 1,
  pageSize = 100,
  sortBy: SortableKeys<ExtractResponse<ReturnType<${className}["${m}"]>>> | null = null,
  descending?: boolean,
  toastOptions?: ToastOptions,
): Promise<ApiResult<ExtractResponse<ReturnType<${className}["${m}"]>>>> {
  return handleApiResponse(
    () =>
      ${instanceName}.${m}(
        buildQuery<
          ${toQueryName(m)},
          UnwrapArray<
            ExtractDataIfPaginated<
              ExtractResponse<ReturnType<${className}["${m}"]>>
            >
          >
        >(filters, page, pageSize, sortBy, descending),
      ),
    toastOptions,
  );
}
`.trim(),
      )
      .join("\n\n");

    /* =======================
       Simple Query Methods
       ======================= */

    const simpleQueryMethodOverloads = simpleQueryMethods
      .map((m) =>
        `
export async function ${m}(
  query?: ${toQueryName(m)},
  toastOptions?: ToastOptions,
): Promise<ApiResult<ExtractResponse<ReturnType<${className}["${m}"]>>>> {
  return handleApiResponse(
    () => ${instanceName}.${m}(query),
    toastOptions,
  );
}
`.trim(),
      )
      .join("\n\n");

    /* =======================
       Non-Query Methods
       ======================= */

    const nonQueryMethodOverloads = nonQueryMethods
      .map((m) =>
        `
export async function ${m}(
  ...argsWithToast: [...WithoutRequestParams<Parameters<${className}["${m}"]>>,ToastOptions?, RequestParams?]
): Promise<ApiResult<ExtractResponse<ReturnType<${className}["${m}"]>>>> {
  const { args, toastOptions, params } = extractArgsToastsAndParams(argsWithToast);
  return handleApiResponse(() => ${instanceName}.${m}(...args, params), toastOptions);
}
`.trim(),
      )
      .join("\n\n");

    const instanceFile = path.join(outputDir, `${className}.api.ts`);

    const content = `
import { ${className} } from "../${file.replace(".ts", "")}";
import type { ExtractResponse, ToastOptions, WithoutRequestParams } from "./Types";
import type { RequestParams } from "../http-client";
import { handleApiResponse } from "../../utils/HandleApiResponse";
import type { ApiResult } from "../../interfaces/responses/ApiResult";
import { extractArgsToastsAndParams } from "../../utils/ExtractArgsToastsAndParams";

/* =======================
   Query Types
   ======================= */
${types}

/* =======================
   API Instance
   ======================= */
const ${instanceName} = new ${className}();

/* =======================
   Paginated Query Methods
   ======================= */
${paginatedMethodOverloads}

/* =======================
   Simple Query Methods
   ======================= */
${simpleQueryMethodOverloads}

/* =======================
   Non-Query Methods
   ======================= */
${nonQueryMethodOverloads}
`.trimStart();

    const formatted = await prettier.format(content, { parser: "typescript" });
    fs.writeFileSync(instanceFile, formatted);
  }
})().catch(console.error);
