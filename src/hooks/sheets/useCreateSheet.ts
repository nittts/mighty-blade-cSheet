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
    onSuccess: (data, variables) => {
      console.log(data);

      queryClient.setQueriesData(SHEETS_QUERY_ID, (oldData: any) => {
        if (oldData) {
          const list = [...(oldData?.list || {}), data.newSheet];

          return { ...oldData, list };
        }

        return {};
      });
    },
  });

  return { createSheetFn, createSheetStatus, createSheetError };
}
