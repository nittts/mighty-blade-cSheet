import { SHEETS_QUERY_ID } from "@/constants/queryKeys";
import { deleteSheet } from "@/services/sheets";
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteSheet() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteSheetFn,
    status: deleteSheetStatus,
    error: deleteSheetError,
  } = useMutation(SHEETS_QUERY_ID, deleteSheet, {
    onSuccess: (_, variables) => {
      queryClient.setQueriesData(SHEETS_QUERY_ID, (oldData: any) => {
        if (oldData) {
          const { id } = variables;
          const list = (oldData?.list || []).filter((s: any) => s.id !== id);

          return { ...oldData, list };
        }

        return {};
      });
    },
  });

  return { deleteSheetFn, deleteSheetStatus, deleteSheetError };
}
