import { CircularProgress, Button, ButtonProps } from "@mui/material";

interface BtnProps extends ButtonProps {
  loading?: boolean;
}
export default function Btn(props: BtnProps) {
  const { children } = props;

  return (
    <Button fullWidth variant="contained" {...props}>
      {props.loading ? <CircularProgress /> : children}
    </Button>
  );
}
