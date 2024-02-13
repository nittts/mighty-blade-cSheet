"use client";

import { ReactNode } from "react";
import QueryProvider from "./queryProvider";
import MUIPRovider from "./MUIProvider";
import ToastProvider from "./ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <MUIPRovider>
        <ToastProvider>{children}</ToastProvider>
      </MUIPRovider>
    </QueryProvider>
  );
}
