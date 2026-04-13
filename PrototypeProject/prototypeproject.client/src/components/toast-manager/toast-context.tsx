import type { ToastPosition, ToastOptions } from "react-toastify";
import type { ToastType } from "../../enums/ToastType";
import type { ToastButtonConfig } from "../../interfaces/toasts/toast-button-config";
import type { ToastManagerHandle } from "../../interfaces/toasts/toast-manager-handle";
import ToastManager from "./toast-manager";
import { createRef } from "react";

const globalToastRef = createRef<ToastManagerHandle>();

export const toast = {
  show: (
    type: ToastType,
    message?: string,
    title?: string,
    position?: ToastPosition,
    options?: ToastOptions,
    response?: Response,
    buttons?: ToastButtonConfig[],
    autoClose?: number,
  ) =>
    globalToastRef.current?.showToast(
      type,
      message,
      title,
      position,
      options,
      response,
      buttons,
      autoClose,
    ),

  success: (
    message: string,
    title?: string,
    position?: ToastPosition,
    options?: ToastOptions,
    buttons?: ToastButtonConfig[],
  ) =>
    globalToastRef.current?.showToastSuccess(
      message,
      title,
      position,
      options,
      buttons,
    ),

  error: (
    message: string,
    title?: string,
    position?: ToastPosition,
    options?: ToastOptions,
    buttons?: ToastButtonConfig[],
  ) =>
    globalToastRef.current?.showToastError(
      message,
      title,
      position,
      options,
      buttons,
    ),

  errorResponse: (
    response: Response,
    options?: ToastOptions,
    position?: ToastPosition,
    buttons?: ToastButtonConfig[],
  ) =>
    globalToastRef.current?.showToastErrorResponse(
      response,
      options,
      position,
      buttons,
    ),

  warning: (
    message: string,
    title?: string,
    position?: ToastPosition,
    options?: ToastOptions,
    buttons?: ToastButtonConfig[],
  ) =>
    globalToastRef.current?.showToastWarning(
      message,
      title,
      position,
      options,
      buttons,
    ),

  info: (
    message: string,
    title?: string,
    position?: ToastPosition,
    options?: ToastOptions,
    buttons?: ToastButtonConfig[],
  ) =>
    globalToastRef.current?.showToastInfo(
      message,
      title,
      position,
      options,
      buttons,
    ),

  default: (
    message: string,
    title?: string,
    position?: ToastPosition,
    options?: ToastOptions,
    buttons?: ToastButtonConfig[],
  ) =>
    globalToastRef.current?.showToastDefault(
      message,
      title,
      position,
      options,
      buttons,
    ),

  custom: (
    content: React.ReactNode,
    title?: string,
    position?: any,
    options?: any,
    autoClose?: number,
  ) =>
    globalToastRef.current?.showToastCustom?.(
      content,
      title,
      position,
      options,
      autoClose,
    ),

  update: (id: number, content: React.ReactNode, options?: any) =>
    globalToastRef.current?.updateToast?.(id, content, options),

  infoWithId: (
    message: React.ReactNode,
    title?: string,
    position?: any,
    options?: any,
    buttonConfig?: any,
    autoClose?: boolean | number,
  ) =>
    globalToastRef.current?.showToastInfoWithId?.(
      message,
      title,
      position,
      options,
      buttonConfig,
      autoClose,
    ),
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <ToastManager ref={globalToastRef} />
      {children}
    </>
  );
};
