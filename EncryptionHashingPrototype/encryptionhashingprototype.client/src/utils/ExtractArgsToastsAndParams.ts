import type { RequestParams } from "../api/http-client";
import type { ToastOptions } from "../api/methods/Types";

export function extractArgsToastsAndParams<TArgs extends any[]>(
  argsWithToast: [...TArgs, ToastOptions?, RequestParams?],
): {
  args: TArgs;
  toastOptions?: ToastOptions;
  params?: RequestParams;
} {
  let args = [...argsWithToast] as any[];
  let toastOptions: ToastOptions | undefined;
  let params: RequestParams | undefined;

  // Check last argument for RequestParams
  const lastArg = args[args.length - 1];
  if (
    lastArg &&
    typeof lastArg === "object" &&
    !("toastSuccess" in lastArg) &&
    !("toastError" in lastArg)
  ) {
    params = lastArg as RequestParams;
    args.pop();
  }

  // Check last argument for ToastOptions
  const newLast = args[args.length - 1];
  if (
    newLast &&
    typeof newLast === "object" &&
    ("toastSuccess" in newLast || "toastError" in newLast)
  ) {
    toastOptions = newLast as ToastOptions;
    args.pop();
  }

  return { args: args as TArgs, toastOptions, params };
}
