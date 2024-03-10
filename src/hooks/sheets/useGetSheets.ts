"use client"

import { SHEETS_QUERY_ID } from "@/constants/queryKeys";
import { getSheets } from "@/services/sheets";
import { useStorage } from "@/utils/localStorage";
import { useQuery } from "react-query";

export default function useGetSheets(filters?: any) {
  let user = {};

  if(typeof window !== "undefined") {
    user = useStorage.get("@APP:USER");
  }

  const {
    data: sheets,
    refetch: refetchSheets,
    status: sheetsStatus,
    error: getSheetsError,
  } = useQuery([SHEETS_QUERY_ID, user, filters], () => getSheets(filters));

  return { sheets, refetchSheets, sheetsStatus, getSheetsError };
}
