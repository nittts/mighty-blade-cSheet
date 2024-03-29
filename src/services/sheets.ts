"use client";

import { createSheetPayload } from "@/types/sheets";
import api from "./api";
import { useStorage } from "@/utils/localStorage";

export async function getSheets(params: any) {
  const user = useStorage.get("@APP:USER");
  const res = await api.get("/api/sheets", { params: { userId: user.id, ...params } });

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

export async function editSheet(payload: any) {
  const { id } = payload;

  const res = await api.patch("/api/sheets", payload, { params: { characterId: id } });

  return res.data;
}
