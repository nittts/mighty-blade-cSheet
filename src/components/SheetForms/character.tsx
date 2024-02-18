import { FormControl, FormControlLabel, FormLabel, Grid, Input, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../Input";
import { useFormik } from "formik";
import { useDebounceValue } from "usehooks-ts";
import { SubmitListener, getChangedValues } from "./FormikSubmitHelper";
import { statsType } from "@/types/sheets";
import CharacterStats from "../characterStats";
import CardComponent from "../Card";

export type ICharacterFormPayload = {
  name: string;
  race: string;
  class: string;
  age: number;
  level: number;
  background: string;
  experience: number;
  motivation: string;
  stats: statsType;
};

interface characterFormProps {
  initialValues: ICharacterFormPayload;
  onChange: (payload: ICharacterFormPayload) => void;
}

export default function CharacterForm({ initialValues, onChange }: characterFormProps) {
  const [editValues, setEditValues] = useState<any>({});
  const debouncedValues = useDebounceValue(editValues, 1000);

  const formik = useFormik<ICharacterFormPayload>({
    initialValues,
    onSubmit: (values) => setEditValues(getChangedValues(values, initialValues)),
  });

  useEffect(() => {
    if (Object.keys(debouncedValues[0]).length > 0) {
      onChange(debouncedValues[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues[0]]);

  return (
    <form>
      <SubmitListener formik={formik} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CardComponent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <InputField
                  size="small"
                  label="Nome"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values?.name || ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  size="small"
                  label="Raça"
                  id="race"
                  name="race"
                  onChange={formik.handleChange}
                  value={formik.values?.race || ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  size="small"
                  label="classe"
                  id="class"
                  name="class"
                  onChange={formik.handleChange}
                  value={formik.values?.class || ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  size="small"
                  type="number"
                  label="Idade"
                  id="age"
                  name="age"
                  onChange={formik.handleChange}
                  value={formik.values?.age || ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  size="small"
                  type="number"
                  label="Nível"
                  id="level"
                  name="level"
                  onChange={formik.handleChange}
                  value={formik.values?.level || ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  size="small"
                  label="Antecedente"
                  id="background"
                  name="background"
                  onChange={formik.handleChange}
                  value={formik.values?.background || ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  multiline
                  rows={3}
                  label="Motivação"
                  id="motivation"
                  name="motivation"
                  onChange={formik.handleChange}
                  value={formik.values.motivation}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Experiência</FormLabel>
                  <RadioGroup id="experience" name="experience" row style={{ width: "100%" }}>
                    {Array.from(new Array(11))
                      .fill("")
                      .map((_, indx) => (
                        <FormControlLabel
                          labelPlacement="bottom"
                          label={indx}
                          key={indx}
                          name="experience"
                          control={
                            <Radio
                              size="small"
                              checked={formik.values.experience === indx}
                              onChange={() => {
                                formik.setFieldValue("experience", indx);
                              }}
                            />
                          }
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </CardComponent>
        </Grid>
        {/* Stats */}
        <Grid item xs={12}>
          <CardComponent>
            <CharacterStats
              values={formik?.values?.stats || {}}
              handleChange={(payload) => formik.setFieldValue("stats", payload)}
            />
          </CardComponent>
        </Grid>
      </Grid>
    </form>
  );
}
