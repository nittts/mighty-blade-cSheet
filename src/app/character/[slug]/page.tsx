"use client";

import CardComponent from "@/components/Card";
import Img from "@/components/Image";
import CharacterForm, { ICharacterFormPayload } from "@/components/SheetForms/character";
import { useGetSheets, useEditSheet } from "@/hooks/sheets";
import { PageProps } from "@/types/page";
import { ISheetCardChar } from "@/types/sheets";
import { Alert, Grid } from "@mui/material";

export default function Page({ params }: PageProps) {
  const { sheets, sheetsStatus } = useGetSheets();
  const { editSheetFn } = useEditSheet();
  const sheet = (sheets?.list || []).find((s: ISheetCardChar) => s.id === params.slug);

  const handleChange = (payload: ICharacterFormPayload) => {
    const data = { ...payload, id: params.slug };
    editSheetFn(data);
  };

  if (sheetsStatus === "loading") {
    return (
      <Alert severity="warning" style={{ marginTop: 20 }}>
        Carregando Ficha
      </Alert>
    );
  }

  if (!sheet) {
    return <Alert severity="error">Ficha não encontrada, verifique novamente</Alert>;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <CardComponent cardProps={{ elevation: 8 }}>
          <CharacterForm initialValues={sheet} onChange={handleChange} />
        </CardComponent>
      </Grid>
    </Grid>
  );
}
