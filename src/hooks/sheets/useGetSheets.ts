import { SHEETS_QUERY_ID } from "@/constants/queryKeys";
import { getSheets } from "@/services/sheets";
import { useQuery } from "react-query";

export default function useGetSheets() {
  const {
    data: sheets,
    refetch: refetchSheets,
    status: sheetsStatus,
    error: getSheetsError,
  } = useQuery([SHEETS_QUERY_ID], () => getSheets());

  return { sheets, refetchSheets, sheetsStatus, getSheetsError };
}
