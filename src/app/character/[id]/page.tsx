"use client";

import Img from "@/components/Image";
import CharacterForm from "@/components/SheetForms/character";
import { useGetSheets } from "@/hooks/sheets";
import { ISheetCardChar } from "@/types/sheets";
import { IUser } from "@/types/user";
import { useStorage } from "@/utils/localStorage";
import { Alert, Grid } from "@mui/material";

type LooseObject = {
  [key: string]: unknown;
};

export default function Page({ params }: LooseObject) {
  const user: IUser = useStorage.get("@APP:USER");
  const { sheets, sheetsStatus } = useGetSheets(user.id);

  const sheet = (sheets?.list || []).find((s: ISheetCardChar) => s.id === params.id);

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
    <Grid container spacing={1} style={{ marginTop: 10 }}>
      <Grid item xs={12} md={2}>
        <Img width="100%" height="100%" src={sheet.src} alt="characterIMG" />
      </Grid>
      <Grid item xs={12} md={10}>
        <CharacterForm initialValues={sheet} onFinish={() => {}} />
      </Grid>
    </Grid>
  );
}
