import { SHEETS_QUERY_ID } from "@/constants/queryKeys";
import { editSheet } from "@/services/sheets";
import { ISheetCardChar } from "@/types/sheets";
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteSheet() {
  const queryClient = useQueryClient();

  const {
    mutate: editSheetFn,
    status: editSheetStatus,
    error: editSheetError,
  } = useMutation(SHEETS_QUERY_ID, editSheet, {
    onSuccess: (data, variables) => {
      queryClient.setQueriesData(SHEETS_QUERY_ID, (oldData: any) => {
        if (oldData) {
          const newList = oldData.list.map((sheet: ISheetCardChar) =>
            sheet.id === variables.id ? { ...sheet, ...variables } : sheet
          );

          console.log({ newList, oldData });

          return { ...oldData, list: newList };
        }

        return {};
      });
    },
  });

  return { editSheetFn, editSheetStatus, editSheetError };
}
