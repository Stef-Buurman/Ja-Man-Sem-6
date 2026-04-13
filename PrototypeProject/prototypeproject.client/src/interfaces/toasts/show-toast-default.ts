import { type ToastOptions } from "react-toastify";
import type { ToastPosition } from "../../enums/ToastPosition";
import type { ToastButtonConfig } from "./toast-button-config";

export interface ShowToastDefault {
  (
    message: string,
    title?: string,
    position?: ToastPosition,
    options?: ToastOptions,
    buttons?: ToastButtonConfig[],
  ): void;
  (message: string, title?: string): void;
  (message: string, position?: ToastPosition): void;
  (message: string): void;
}
