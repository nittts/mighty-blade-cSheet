import { ability } from "@/types/sheets";
import { MRT_ColumnDef } from "material-react-table";

const columns: MRT_ColumnDef<ability>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "difficuty",
    header: "Dificuldade",
  },
  {
    accessorKey: "mana",
    header: "Mana",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
];

export default columns;
