import type { ToastOptions } from "react-toastify";
import type { ToastPosition } from "../../enums/ToastPosition";
import type { ToastButtonConfig } from "./toast-button-config";

export interface ShowToastError {
  (
    response: Response,
    options?: ToastOptions,
    position?: ToastPosition,
    buttons?: ToastButtonConfig[],
  ): void;
}
