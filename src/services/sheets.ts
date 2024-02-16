"use client";

import { createSheetPayload } from "@/types/sheets";
import api from "./api";
import { useStorage } from "@/utils/localStorage";

export async function getSheets({ userId }: { userId: string | undefined }) {
  const res = await api.get("/api/sheets", { params: { userId } });

  return res.data;
}

export async function createSheet(payload: createSheetPayload) {
  const user = useStorage.get("@APP:USER");
  const res = await api.post("/api/sheets", { ...payload, userId: user.id });

  return res.data;
}

export async function deleteSheet({ id }: { id: string }) {
  const res = await api.delete("/api/sheets", { params: { id } });

  return res.data;
}
