"use client";

import { createContext, useContext } from "react";
import { Toaster, toast } from "sonner";

type ToastContextType = {
  successToast: (message: string) => void;
  errorToast: (message: string) => void;
  info: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const value: ToastContextType = {
    successToast: (message) => toast.success(message),
    errorToast: (message) => toast.error(message),
    info: (message) => toast(message),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster richColors position="top-right" />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
