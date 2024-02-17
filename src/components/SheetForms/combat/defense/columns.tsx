import { combatTypeDefenseList } from "@/types/sheets";
import { MRT_ColumnDef } from "material-react-table";

const columns: MRT_ColumnDef<combatTypeDefenseList>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "defense",
    header: "Defesa",
  },
];

export default columns;
