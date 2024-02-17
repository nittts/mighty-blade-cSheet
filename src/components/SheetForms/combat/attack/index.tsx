import { combatTypeAttackList } from "@/types/sheets";
import { Grid } from "@mui/material";
import { set } from "lodash";
import React from "react";

import CombatAttackTable from "./table";

interface IDefenseProps {
  values: { list: combatTypeAttackList[] };
  setFieldValue: (t: { list: combatTypeAttackList[] }) => void;
}

export default function CombatDefenseForm({ setFieldValue, values }: IDefenseProps) {
  const handleSet = (path: string, value: combatTypeAttackList[]) => {
    const copy = { ...values };
    set(copy, path, value);

    setFieldValue(copy);
  };

  return (
    <Grid container columnSpacing={1} rowSpacing={3}>
      <Grid item xs={12}>
        <CombatAttackTable initialValues={values?.list || []} onChange={(payload) => handleSet("list", payload)} />
      </Grid>
    </Grid>
  );
}
