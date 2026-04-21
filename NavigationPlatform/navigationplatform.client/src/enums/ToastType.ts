export const ToastType = {
  Success: "success",
  Error: "error",
  Warning: "warning",
  Info: "info",
  Default: "default",
} as const;

export type ToastType = (typeof ToastType)[keyof typeof ToastType];
