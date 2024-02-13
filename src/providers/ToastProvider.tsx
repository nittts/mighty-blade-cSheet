import Toast from "@/components/Toast";
import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";

interface IToastProps {
  data: IToastData;
  handleOpen: (data: Omit<IToastData, "open">) => void;
  handleClose: () => void;
}

type IToastData = {
  open: boolean;
  text: string;
  severity: string;
};

const ToastContext = createContext<IToastProps>({} as IToastProps);

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<IToastData>({
    open: false,
    text: "",
    severity: "info",
  });

  const handleOpen = useCallback((data: Omit<IToastData, "open">) => {
    setData({ open: true, ...data });
  }, []);

  const handleClose = useCallback(() => {
    setData((prev) => ({ ...prev, open: false }));
  }, []);

  const values = useMemo(() => ({ data, handleOpen, handleClose }), [data, handleOpen, handleClose]);

  return (
    <ToastContext.Provider value={values}>
      {children}
      <Toast />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) throw new Error("Toast Context not defined.");

  return context;
}
