import { combatTypeAttackList } from "@/types/sheets";
import { MRT_ColumnDef } from "material-react-table";

const columns: MRT_ColumnDef<combatTypeAttackList>[] = [
  {
    accessorKey: "weapon",
    header: "Arma",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "damage",
    header: "Dano",
  },
];

export default columns;
