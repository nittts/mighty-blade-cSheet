import InputField from "@/components/Input";
import { combatTypeDefenseList, defenseType } from "@/types/sheets";
import { Grid } from "@mui/material";
import { set } from "lodash";
import React from "react";
import { GiCapeArmor, GiLegArmor, GiWingedShield } from "react-icons/gi";
import { useWindowSize } from "usehooks-ts";
import DefenseItemsTable from "./table";

interface IDefenseProps {
  values: defenseType;
  setFieldValue: (t: defenseType) => void;
}

export default function CombatDefenseForm({ setFieldValue, values }: IDefenseProps) {
  const handleSet = (path: string, value: string | combatTypeDefenseList[]) => {
    const copy = { ...values };
    set(copy, path, value);

    setFieldValue(copy);
  };

  return (
    <Grid container columnSpacing={1} rowSpacing={3}>
      <Grid item xs={12} md={4} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <GiWingedShield size={100} color="#FFF" />
        <InputField
          variant="filled"
          size="small"
          label="Bloqueio"
          id="block"
          name="block"
          onChange={(e) => handleSet("block", e.target.value)}
          value={values?.block || ""}
        />
      </Grid>
      <Grid item xs={12} md={4} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <GiLegArmor size={100} color="#FFF" />
        <InputField
          variant="filled"
          size="small"
          label="Esquiva"
          id="dodge"
          name="dodge"
          onChange={(e) => handleSet("dodge", e.target.value)}
          value={values?.dodge || ""}
        />
      </Grid>
      <Grid item xs={12} md={4} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <GiCapeArmor size={100} color="#FFF" />
        <InputField
          variant="filled"
          size="small"
          label="Determinação"
          id="determination"
          name="determination"
          onChange={(e) => handleSet("determination", e.target.value)}
          value={values?.determination || ""}
        />
      </Grid>
      <Grid item xs={12}>
        <DefenseItemsTable initialValues={values?.list || []} onChange={(payload) => handleSet("list", payload)} />
      </Grid>
    </Grid>
  );
}
