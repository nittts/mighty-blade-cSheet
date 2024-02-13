import { Fade, Modal } from "@mui/material";
import Card from "./Card";
import CreateSheetForm from "./createSheetForm";
import { createSheetPayload } from "@/types/sheets";
import { useCreateSheet } from "@/hooks/sheets";
import { useToast } from "@/providers/ToastProvider";
import { isAxiosError } from "axios";
import { useEffect } from "react";

type IModalProps = {
  open: boolean;
  handleClose: () => void;
};

export default function CreateSheetModal({ open, handleClose }: IModalProps) {
  const { createSheetFn, createSheetStatus, createSheetError } = useCreateSheet();
  const { handleOpen: handleOpenToast } = useToast();

  const onFinish = (payload: createSheetPayload) => {
    createSheetFn(payload);
  };

  useEffect(() => {
    const messages = {
      error: "Algo deu errado no cadastro, tente novamente.",
      success: "Ficha registrada com sucesso",
    };

    if (createSheetStatus === "idle") return;

    if (isAxiosError(createSheetError)) {
      messages.error = createSheetError?.response?.data?.message ?? messages.error;
    }

    const message = messages[createSheetStatus as keyof typeof messages];

    if (message) {
      handleOpenToast({
        severity: createSheetStatus,
        text: message,
      });
    }
  }, [createSheetStatus, handleOpenToast, createSheetError]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Fade in={open}>
        <div>
          <Card>
            <CreateSheetForm onFinish={onFinish} initialValues={{ name: "" }} />
          </Card>
        </div>
      </Fade>
    </Modal>
  );
}
