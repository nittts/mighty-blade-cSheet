import { statsType } from "@/types/sheets";
import { Divider, Grid } from "@mui/material";
import { set } from "lodash";
import React from "react";
import {
  GiArm,
  GiBackpack,
  GiBoots,
  GiBrain,
  GiHealthPotion,
  GiHearts,
  GiKnapsack,
  GiLeg,
  GiLightBackpack,
  GiMagicPotion,
  GiSprint,
  GiWisdom,
} from "react-icons/gi";
import InputField from "./Input";
import { useWindowSize } from "@uidotdev/usehooks";

interface characterStatsProps {
  handleChange: (payload: statsType) => void;
  values: statsType;
}

function CharacterStats({ handleChange, values }: characterStatsProps) {
  const { width } = useWindowSize();

  const handleSet = (path: string, value: string) => {
    const copy = { ...values };

    set(copy, path, value);

    handleChange(copy);
  };

  return (
    <Grid container columnSpacing={1} rowSpacing={3}>
      <Grid item xs={12} md={3.9}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <GiHealthPotion size={100} color="#740000" />
            <InputField
              variant="filled"
              size="small"
              label="Vida"
              id="health"
              name="health"
              onChange={(e) => handleSet("health", e.target.value)}
              value={values?.health || ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <GiMagicPotion size={100} color="#234ba1" />
            <InputField
              variant="filled"
              size="small"
              label="Mana"
              id="mana"
              name="mana"
              onChange={(e) => handleSet("mana", e.target.value)}
              value={values?.mana || ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <GiBoots size={100} color="#5a3826" />
            <InputField
              variant="filled"
              size="small"
              label="Deslocamento"
              id="movement"
              name="movement"
              onChange={(e) => handleSet("movement", e.target.value)}
              value={values?.movement || ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <GiSprint size={100} color="#ae8b0c" />
            <InputField
              variant="filled"
              size="small"
              label="Corrida"
              id="runSpeed"
              name="runSpeed"
              onChange={(e) => handleSet("runSpeed", e.target.value)}
              value={values?.runSpeed || ""}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={0.1} container direction="row" justifyContent="center" alignItems="center">
        <Divider
          orientation={width && width <= 900 ? "horizontal" : "vertical"}
          flexItem
          style={{ height: "100%" }}
          sx={{ marginY: 1, borderBottomWidth: 3, background: "rgba(255,255,255,0.6)" }}
        />
      </Grid>
      <Grid item xs={12} md={3.9}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <GiArm size={100} color="#FFFF" />
            <InputField
              variant="filled"
              size="small"
              label="Força"
              id="strength"
              name="strength"
              onChange={(e) => handleSet("strength", e.target.value)}
              value={values?.strength || ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <GiLeg size={100} color="#FFFF" />
            <InputField
              variant="filled"
              size="small"
              label="Agilidade"
              id="agility"
              name="agility"
              onChange={(e) => handleSet("agility", e.target.value)}
              value={values?.agility || ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <GiBrain size={100} color="#FFFF" />
            <InputField
              variant="filled"
              size="small"
              label="Inteligência"
              id="inteligence"
              name="inteligence"
              onChange={(e) => handleSet("inteligence", e.target.value)}
              value={values?.inteligence || ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <GiWisdom size={100} color="#FFFF" />
            <InputField
              variant="filled"
              size="small"
              label="Vontade"
              id="will"
              name="will"
              onChange={(e) => handleSet("will", e.target.value)}
              value={values?.will || ""}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={0.1} container direction="row" justifyContent="center" alignItems="center">
        <Divider
          orientation={width && width <= 900 ? "horizontal" : "vertical"}
          flexItem
          style={{ height: "100%" }}
          sx={{ marginY: 1, borderBottomWidth: 3, background: "rgba(255,255,255,0.6)" }}
        />
      </Grid>
      <Grid item xs={12} md={3.9}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <GiKnapsack size={100} color="#83A50D" />
            <InputField
              variant="filled"
              size="small"
              label="Carga Básica"
              id="basic"
              name="basic"
              onChange={(e) => handleSet("capacity.basic", e.target.value)}
              value={values?.capacity?.basic || ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <GiLightBackpack size={100} color="#fbec5d" />
            <InputField
              variant="filled"
              size="small"
              label="Carga pesada"
              id="heavy"
              name="heavy"
              onChange={(e) => handleSet("capacity.heavy", e.target.value)}
              value={values?.capacity?.heavy || ""}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <GiBackpack size={100} color="#FF5733" />
            <InputField
              variant="filled"
              size="small"
              label="Carga Máxima"
              id="max"
              name="max"
              onChange={(e) => handleSet("capacity.max", e.target.value)}
              value={values?.capacity?.max || ""}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CharacterStats;
