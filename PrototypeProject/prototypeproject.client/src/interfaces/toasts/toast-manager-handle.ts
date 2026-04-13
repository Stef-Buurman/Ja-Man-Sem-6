import React from "react";
import type { ShowToast } from "./show-toast";
import type { ShowToastDefault } from "./show-toast-default";
import type { ShowToastError } from "./show-toast-error";

export interface ToastManagerHandle {
  showToast: ShowToast;
  showToastError: ShowToastDefault;
  showToastErrorResponse: ShowToastError;
  showToastSuccess: ShowToastDefault;
  showToastWarning: ShowToastDefault;
  showToastInfo: ShowToastDefault;
  showToastDefault: ShowToastDefault;
  showToastCustom?: (
    content: React.ReactNode,
    title?: string,
    position?: any,
    options?: any,
    autoClose?: number,
  ) => number | undefined;
  updateToast?: (id: number, content: React.ReactNode, options?: any) => void;
  showToastInfoWithId?: (
    message: React.ReactNode,
    title?: string,
    position?: any,
    options?: any,
    buttonConfig?: any,
    autoClose?: boolean | number,
  ) => number | undefined;
}
