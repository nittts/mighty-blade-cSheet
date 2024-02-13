import { useToast } from "@/providers/ToastProvider";

import { Alert, Snackbar } from "@mui/material";

export default function Toast({}) {
  const { handleClose, data } = useToast();

  return (
    <Snackbar open={data.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={data.severity as any} variant="filled" sx={{ width: "100%" }}>
        {data.text}
      </Alert>
    </Snackbar>
  );
}
