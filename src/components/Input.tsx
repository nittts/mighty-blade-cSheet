import { TextField, TextFieldProps } from "@mui/material";

export default function InputField(props: TextFieldProps) {
  return <TextField fullWidth variant="outlined" InputLabelProps={{ shrink: true }} {...props} />;
}
