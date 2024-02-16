import { Fade, Grid, IconButton, Modal } from "@mui/material";
import Card from "./Card";
import CreateSheetForm from "./CreateSheetForm";
import { createSheetPayload } from "@/types/sheets";
import { useCreateSheet } from "@/hooks/sheets";
import { useToast } from "@/providers/ToastProvider";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import Text from "./Text";

type IModalProps = {
  open: boolean;
  handleClose: () => void;
};

const modalStyles = {
  width: ["95vw", "50vw", "40vw", "30vw"],
};

export default function CreateSheetModal({ open, handleClose }: IModalProps) {
  const { createSheetFn, createSheetStatus, createSheetError } = useCreateSheet();
  const { handleOpen: handleOpenToast } = useToast();

  const onFinish = (payload: createSheetPayload) => {
    createSheetFn(payload);
    handleClose();
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
          <Card
            cardProps={{
              sx: modalStyles,
            }}
          >
            <Grid container>
              <Grid item xs={11}>
                <Text variant="h6">Criar Personagem</Text>
              </Grid>
              <Grid item xs={1} style={{ display: "flex", justifyContent: "flex-end", marginTop: "-0.7em" }}>
                <IconButton>
                  <MdClose size={40} />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <CreateSheetForm onFinish={onFinish} />
              </Grid>
            </Grid>
          </Card>
        </div>
      </Fade>
    </Modal>
  );
}
