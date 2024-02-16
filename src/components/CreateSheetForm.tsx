import { createSheetPayload } from "@/types/sheets";
import { Box, Grid, IconButton, Input } from "@mui/material";
import { useFormik } from "formik";
import InputField from "./Input";
import Btn from "./Button";
import Text from "./Text";
import { MdClose } from "react-icons/md";

type createSheetForms = {
  onFinish: (payload: createSheetPayload) => void;
};

export default function CreateSheetForm({ onFinish }: createSheetForms) {
  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const formikForm = useFormik<createSheetPayload>({
    initialValues: {
      name: "",
      race: "",
      class: "",
      age: 0,
      experience: 0,
      motivation: "",
      src: "",
    },
    onSubmit: (values) => onFinish(values),
  });

  return (
    <form onSubmit={formikForm.handleSubmit}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <InputField
            size="small"
            label="Nome"
            id="name"
            name="name"
            onChange={formikForm.handleChange}
            value={formikForm.values.name}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            size="small"
            label="Raça"
            id="race"
            name="race"
            onChange={formikForm.handleChange}
            value={formikForm.values.race}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            size="small"
            label="classe"
            id="class"
            name="class"
            onChange={formikForm.handleChange}
            value={formikForm.values.class}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            type="file"
            id="src"
            name="src"
            onChange={async (e: any) => {
              const file = e.target.files[0];
              const base64 = await getBase64(file);
              formikForm.setFieldValue("src", base64);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Btn type="submit">Criar</Btn>
        </Grid>
      </Grid>
    </form>
  );
}
