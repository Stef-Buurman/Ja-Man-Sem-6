export function extractMethodName(fn: Function): string {
  return fn.name || fn.constructor.name || "anonymous";
}
