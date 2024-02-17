import { equipaments } from "@/types/sheets";
import { MRT_ColumnDef } from "material-react-table";

const columns: MRT_ColumnDef<equipaments>[] = [
  {
    accessorKey: "item",
    header: "Item",
  },
  {
    accessorKey: "weight",
    header: "Peso",
  },
  {
    accessorKey: "cost",
    header: "Custo",
  },
];

export default columns;
