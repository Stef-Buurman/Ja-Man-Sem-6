import React, { createContext, useContext, useRef } from "react";
import ToastManager from "./toast-manager";
import type { ToastManagerHandle } from "../../interfaces/toasts/toast-manager-handle";

export type ToastRef = React.RefObject<ToastManagerHandle | null>;

const ToastContext = createContext<ToastRef | undefined>(undefined);

export const globalToastRef: ToastRef = { current: null };

export const useToast = (): ToastRef => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    globalToastRef.current = context.current;
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const toastRef = useRef<ToastManagerHandle>(null);
    globalToastRef.current = toastRef.current;
    return (
        <ToastContext.Provider value={toastRef}>
            <ToastManager ref={toastRef} />
            {children}
        </ToastContext.Provider>
    );
};
