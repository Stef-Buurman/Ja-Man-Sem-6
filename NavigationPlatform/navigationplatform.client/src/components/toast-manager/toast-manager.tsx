import { forwardRef, useImperativeHandle } from "react";
import { ToastContainer, toast, type ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast-manager.css";
import { ToastPosition } from "../../enums/ToastPosition";
import { ToastType } from "../../enums/ToastType";
import type { ShowToast } from "../../interfaces/toasts/show-toast";
import type { ShowToastDefault } from "../../interfaces/toasts/show-toast-default";
import type { ShowToastError } from "../../interfaces/toasts/show-toast-error";
import type { ToastButtonConfig } from "../../interfaces/toasts/toast-button-config";
import type { ToastManagerHandle } from "../../interfaces/toasts/toast-manager-handle";
import Button from "../button/button";

const ToastManager = forwardRef<ToastManagerHandle>((_, ref) => {
  const buildContent = (title: string, message?: string, buttons: ToastButtonConfig[] = []) => {
    return ({ closeToast }: { closeToast?: () => void }) => (
      <div>
        <strong>{title}</strong>
        <div>{message}</div>
        {buttons.length > 0 && (
          <div>
            {buttons.map((btn, index) => (
              <Button
                btnKey={index}
                className="toast-button"
                style={{ marginTop: "10px" }}
                onClick={() => {
                  if (btn.onClick) {
                    btn.onClick();
                  }
                  if (closeToast) {
                    closeToast();
                  }
                }}
                title={btn.label}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const showToast: ShowToast = (
    type: ToastType,
    message = "",
    title = "",
    position = ToastPosition.BottomRight,
    options: ToastOptions = {},
    response?: Response,
    buttons: ToastButtonConfig[] = [],
    autoClose = 500,
  ) => {
    const defaultTitles: Record<ToastType, string> = {
      [ToastType.Success]: "Success!",
      [ToastType.Error]: "Error!",
      [ToastType.Warning]: "Warning!",
      [ToastType.Info]: "Info",
      [ToastType.Default]: "Notification",
    };
    const finalTitle = title || defaultTitles[type];

    const handleToast = (finalMessage: string) => {
      const content = buildContent(finalTitle, finalMessage, buttons);
      const commonOptions: ToastOptions = {
        autoClose: autoClose,
        className: `toast-${type.toLowerCase()} toast`,
        position,
        ...options,
      };

      switch (type) {
        case ToastType.Success:
          toast.success(content, commonOptions);
          break;
        case ToastType.Error:
          toast.error(content, commonOptions);
          break;
        case ToastType.Warning:
          toast.warn(content, commonOptions);
          break;
        case ToastType.Info:
          toast.info(content, commonOptions);
          break;
        default:
          toast(content, commonOptions);
          break;
      }
    };

    if (response) {
      response
        .text()
        .then((text) => {
          handleToast(text || message);
        })
        .catch(() => {
          handleToast(message);
        });
    } else {
      handleToast(message);
    }
  };

  const callMainToast = (
    type: ToastType,
    message = "",
    title = "",
    position?: ToastPosition,
    options?: ToastOptions,
    response?: Response,
    buttons: ToastButtonConfig[] = [],
    autoClose = 500,
  ) => {
    showToast(type, message, title, position, options, response, buttons, autoClose);
  };

  useImperativeHandle(ref, () => ({
    showToast,
    showToastError: ((message, title, position, options, buttons) => {
      callMainToast(ToastType.Error, message, title, position, options, undefined, buttons, 2000);
    }) as ShowToastDefault,

    showToastErrorResponse: ((response, options, position, buttons) => {
      callMainToast(ToastType.Error, "", "", position, options, response, buttons, 2000);
    }) as ShowToastError,

    showToastSuccess: ((message, title, position, options, buttons) => {
      callMainToast(ToastType.Success, message, title, position, options, undefined, buttons);
    }) as ShowToastDefault,

    showToastWarning: ((message, title, position, options, buttons) => {
      callMainToast(ToastType.Warning, message, title, position, options, undefined, buttons, 2000);
    }) as ShowToastDefault,

    showToastInfo: ((message, title, position, options, buttons) => {
      callMainToast(ToastType.Info, message, title, position, options, undefined, buttons, 2000);
    }) as ShowToastDefault,

    showToastDefault: ((message, title, position, options, buttons) => {
      callMainToast(ToastType.Default, message, title, position, options, undefined, buttons);
    }) as ShowToastDefault,
    showToastCustom: ((
      content: React.ReactNode,
      title?: string,
      position?: ToastPosition,
      options: ToastOptions = {},
      autoClose = 500,
    ) => {
      const finalPosition = position ?? ToastPosition.BottomRight;
      const defaultClass = "toast-info toast";
      const finalOptions: ToastOptions = {
        autoClose: autoClose,
        position: finalPosition,
        className: options.className ?? defaultClass,
        ...options,
      } as ToastOptions;

      const render = () => (
        <div>
          {title && <strong>{title}</strong>}
          <div>{content}</div>
        </div>
      );
      try {
        const id = toast(render, finalOptions);
        return id as number;
      } catch (e) {
        return undefined;
      }
    }) as any,

    updateToast: ((id: number, content: React.ReactNode, options?: ToastOptions) => {
      try {
        toast.update(id, { render: <div>{content}</div>, ...options });
      } catch (e) {}
    }) as any,

    showToastInfoWithId: ((
      message: React.ReactNode,
      title?: string,
      position?: ToastPosition,
      options: ToastOptions = {},
      buttonConfig?: ToastButtonConfig,
      autoClose: boolean | number = false,
    ) => {
      const finalTitle = title || "Info";
      const finalPosition = position ?? ToastPosition.BottomRight;
      const content = ({ closeToast }: { closeToast?: () => void }) => (
        <div>
          <strong>{finalTitle}</strong>
          <div>{message}</div>
          {buttonConfig && (
            <Button
              className="toast-button"
              style={{ marginTop: "10px" }}
              onClick={() => {
                if (buttonConfig.onClick) buttonConfig.onClick();
                if (closeToast) closeToast();
              }}
              title={buttonConfig.label}
            />
          )}
        </div>
      );
      try {
        const finalOptions: ToastOptions = {
          autoClose: autoClose as any,
          position: finalPosition,
          className: options.className ?? "toast-info toast",
          ...options,
        } as ToastOptions;
        const id = toast.info(content, finalOptions);
        return id as number;
      } catch {
        return undefined;
      }
    }) as any,
  }));

  return <ToastContainer />;
});

export default ToastManager;
