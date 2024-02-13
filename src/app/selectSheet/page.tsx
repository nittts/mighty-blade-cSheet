"use client";

import { IUser } from "@/types/user";
import Card from "@/components/Card";
import Text from "@/components/Text";

import { useGetSheets } from "@/hooks/sheets";
import { useStorage } from "@/utils/localStorage";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

import { ISheetCardChar } from "@/types/sheets";

import SheetCard from "@/components/SheetCard";
import Btn from "@/components/Button";

import { useToast } from "@/providers/ToastProvider";
import CreateSheetModal from "@/components/CreateSheetModal";

export default function SelectSheetPage() {
  const user: IUser = useStorage.get("@APP:USER");
  const [openModal, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const { sheets, sheetsStatus, getSheetsError } = useGetSheets(user.id);
  const { handleOpen } = useToast();
  const router = useRouter();

  useEffect(() => {
    const messages = {
      error: "Algo deu errado na busca das fichas, tente novamente.",
    };

    if (sheetsStatus === "idle") return;

    if (isAxiosError(getSheetsError)) {
      messages.error = getSheetsError?.response?.data?.message ?? messages.error;
    }

    const message = messages[sheetsStatus as keyof typeof messages];

    if (message) {
      handleOpen({
        severity: sheetsStatus,
        text: message,
      });
    }
  }, [sheetsStatus, handleOpen, getSheetsError, sheets]);

  return (
    <>
      <Card>
        <Grid container spacing={1}>
          <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
            <Card cardProps={{ elevation: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Text variant="h4">Seleção de Personagens</Text>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Btn size="large" onClick={handleOpenModal}>
                    Novo Personagem
                  </Btn>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Btn size="large" onClick={() => router.push("/")}>
                    Desconectar
                  </Btn>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
            <Grid container>
              {(sheets?.list || []).map((c: ISheetCardChar) => (
                <SheetCard key={c.id} character={c} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <CreateSheetModal open={openModal} handleClose={handleCloseModal} />
    </>
  );
}
