"use client";

import CardComponent from "@/components/Card";
import EquipamentsForm, { IEquipamentsFormPayload } from "@/components/SheetForms/equipaments";
import { useEditSheet, useGetSheets } from "@/hooks/sheets";
import { useToast } from "@/providers/ToastProvider";
import { PageProps } from "@/types/page";
import { ISheetCardChar } from "@/types/sheets";
import { Alert, Grid, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { useEffect } from "react";

export default function AbilitiesPage({ params }: PageProps) {
  const { sheets, sheetsStatus } = useGetSheets();
  const { editSheetFn, editSheetError, editSheetStatus } = useEditSheet();
  const { handleOpen } = useToast();

  const sheet = (sheets?.list || []).find((s: ISheetCardChar) => s.id === params.slug);

  const handleChange = (payload: IEquipamentsFormPayload) => {
    const data = { ...payload, id: params.slug };
    editSheetFn(data);
  };

  useEffect(() => {
    const messages = {
      error: "Algo deu errado na edição dos equipamentos, tente novamente.",
    };

    if (editSheetStatus === "idle") return;

    if (isAxiosError(editSheetError)) {
      messages.error = editSheetError?.response?.data?.message ?? messages.error;
    }

    const message = messages[editSheetStatus as keyof typeof messages];

    if (message) {
      handleOpen({
        severity: editSheetStatus,
        text: message,
      });
    }
  }, [editSheetStatus, handleOpen, editSheetError, sheets]);

  if (sheetsStatus === "loading") {
    return (
      <Alert severity="warning" style={{ marginTop: 20 }}>
        Carregando Habilidades
      </Alert>
    );
  }

  if (!sheet) {
    return <Alert severity="error">Erro ao retornar os equipamentos, tente novamente</Alert>;
  }

  return (
    <CardComponent cardProps={{ elevation: 8 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">Equipamentos</Typography>
        </Grid>
        <Grid item xs={12}>
          <EquipamentsForm initialValues={sheet?.equipaments || []} onChange={handleChange} />
        </Grid>
      </Grid>
    </CardComponent>
  );
}
