import { Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import { useDebounceValue } from "usehooks-ts";
import { SubmitListener, getChangedValues } from "../FormikSubmitHelper";
import { combatType } from "@/types/sheets";
import CombatAttackForm from "./attack";
import CombatDefenseForm from "./defense";

export type ICombatPayload = {
  combat: combatType;
};

interface combatFormProps {
  initialValues: combatType;
  onChange: (payload: ICombatPayload) => void;
}

export default function CombatForm({ initialValues, onChange }: combatFormProps) {
  const [tabValue, setTabValue] = useState(0);
  const [editValues, setEditValues] = useState<any>({});
  const debouncedValues = useDebounceValue(editValues, 1000);

  const formik = useFormik<combatType>({
    initialValues,
    onSubmit: (values) => setEditValues(getChangedValues(values, initialValues)),
  });

  useEffect(() => {
    if (Object.keys(debouncedValues[0]).length > 0) {
      onChange({ combat: debouncedValues[0] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues[0]]);

  return (
    <form>
      <SubmitListener formik={formik} />
      <Grid container spacing={1}>
        <Tabs
          value={tabValue}
          onChange={(_, newTab) => setTabValue(newTab)}
          sx={{ marginLeft: "-8px", marginTop: "-8px" }}
        >
          <Tab label="Defesa" value={0} />
          <Tab label="Ataque" value={1} />
        </Tabs>
        {tabValue === 0 && (
          <Grid item xs={12}>
            <CombatDefenseForm
              values={formik.values?.defense || {}}
              setFieldValue={(payload) => formik.setFieldValue("defense", payload)}
            />
          </Grid>
        )}
        {tabValue === 1 && (
          <Grid item xs={12}>
            <CombatAttackForm
              values={formik.values?.attack || {}}
              setFieldValue={(payload) => formik.setFieldValue("attack", payload)}
            />
          </Grid>
        )}
      </Grid>
    </form>
  );
}
