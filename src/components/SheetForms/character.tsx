import { FormControl, FormControlLabel, FormLabel, Grid, Input, Radio, RadioGroup } from "@mui/material";
import React from "react";
import InputField from "../Input";
import { Formik, useFormik } from "formik";

type IPayload = {
  name: string;
  race: string;
  class: string;
  age: number;
  level: number;
  background: string;
  experience: number;
  motivation: string;
};

interface characterFormProps {
  initialValues: IPayload;
  onFinish: (payload: IPayload) => void;
}

export default function CharacterForm({ initialValues, onFinish }: characterFormProps) {
  return (
    <Formik initialValues={initialValues} onSubmit={(values) => onFinish(values)}>
      {({ values, handleChange, setFieldValue }) => (
        <form>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <InputField size="small" label="Nome" id="name" name="name" onChange={handleChange} value={values.name} />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputField size="small" label="Raça" id="race" name="race" onChange={handleChange} value={values.race} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                size="small"
                label="classe"
                id="class"
                name="class"
                onChange={handleChange}
                value={values.class}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField size="small" label="Idade" id="age" name="age" onChange={handleChange} value={values.age} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField
                size="small"
                label="Nível"
                id="level"
                name="level"
                onChange={handleChange}
                value={values.level}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InputField
                size="small"
                label="Antecedente"
                id="background"
                name="background"
                onChange={handleChange}
                value={values.background}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                label="Motivação"
                id="motivation"
                name="motivation"
                onChange={handleChange}
                value={values.motivation}
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
                            value={`${Number(values.experience) <= indx}`}
                            onChange={() => {
                              setFieldValue("experience", indx);
                            }}
                          />
                        }
                      />
                    ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
