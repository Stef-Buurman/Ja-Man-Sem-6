import type { ToastOptions } from "react-toastify";
import type { ToastPosition } from "../../enums/ToastPosition";
import type { ToastType } from "../../enums/ToastType";
import type { ToastButtonConfig } from "./toast-button-config";

export interface ShowToast {
  (
    type: ToastType,
    message?: string,
    title?: string,
    position?: ToastPosition,
    options?: ToastOptions,
    response?: Response,
    buttons?: ToastButtonConfig[],
    autoClose?: number,
  ): void;
}
