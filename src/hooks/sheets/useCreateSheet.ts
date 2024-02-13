import { SHEETS_QUERY_ID } from "@/constants/queryKeys";
import { createSheet } from "@/services/sheets";
import { useMutation, useQueryClient } from "react-query";

export default function useCreateSheet() {
  const queryClient = useQueryClient();

  const {
    mutate: createSheetFn,
    status: createSheetStatus,
    error: createSheetError,
  } = useMutation(SHEETS_QUERY_ID, createSheet, {
    onSuccess: (_, variables) => {
      queryClient.setQueriesData<unknown[]>(SHEETS_QUERY_ID, (oldData) => {
        if (oldData) {
          return [...oldData, variables];
        }
        return [];
      });
    },
  });

  return { createSheetFn, createSheetStatus, createSheetError };
}
