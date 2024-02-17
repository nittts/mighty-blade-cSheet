import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div style={{ width: "100vw", height: "100vw", position: "fixed", display: "grid", placeItems: "center" }}>
      <CircularProgress />
    </div>
  );
}
