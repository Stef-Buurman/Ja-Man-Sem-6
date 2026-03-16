export const ToastPosition = {
  TopLeft: "top-left",
  TopRight: "top-right",
  BottomLeft: "bottom-left",
  BottomRight: "bottom-right",
  TopCenter: "top-center",
  BottomCenter: "bottom-center",
} as const;

export type ToastPosition = (typeof ToastPosition)[keyof typeof ToastPosition];
