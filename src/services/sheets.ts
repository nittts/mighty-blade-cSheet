import { createSheetPayload } from "@/types/sheets";
import api from "./api";

export async function getSheets({ userId }: { userId: string | undefined }) {
  const res = await api.get("/api/sheets", { params: { userId } });

  return res.data;
}

export async function createSheet(payload: createSheetPayload) {
  const res = await api.post("/api/sheets", payload);

  return res.data;
}
