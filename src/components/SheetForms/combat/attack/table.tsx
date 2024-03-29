import React, { useEffect, useState } from "react";
import { combatTypeAttackList } from "@/types/sheets";
import { useDebounceValue } from "usehooks-ts";
import { MRT_TableOptions, MaterialReactTable } from "material-react-table";

import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import columns from "./columns";
import { Alert, Box, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import Btn from "@/components/Button";
import { MdDelete, MdMergeType } from "react-icons/md";

import { useWindowSize } from "@uidotdev/usehooks";
import { GiBookCover, GiDrippingSword } from "react-icons/gi";

export type ICombatListAttackPayload = combatTypeAttackList[];

interface CombatListAttackProps {
  initialValues: combatTypeAttackList[];
  onChange: (payload: ICombatListAttackPayload) => void;
}

function AttackItemsTable({ initialValues, onChange }: CombatListAttackProps) {
  const [editValues, setEditValues] = useState<any>({});
  const debouncedValues = useDebounceValue(editValues, 500);

  const { width } = useWindowSize();
  const isSmall = width && width <= 768;

  const createNewAbility = (table: any) => {
    const values = { weapon: "", type: "", damage: "" };
    const copy = [...initialValues, values];

    onChange(copy);
    table.setCreatingRow(null);
  };

  const deleteAbilityRow = (row: any) => {
    const filter = initialValues.filter((_, idx) => idx !== row.index);

    onChange(filter);
  };

  const saveInputValue = (event: any, row: any) => {
    const { name, value } = event.target;
    const editedList = initialValues.map((sheet, idx) => (idx === row.index ? { ...sheet, [name]: value } : sheet));

    onChange(editedList);
  };

  const muiEditTextFieldProps = ({ row }: any) => ({
    type: "text",
    onBlur: (e: any) => saveInputValue(e, row),
  });

  const SmallCell = ({ row }: any) => {
    const label = [
      { header: "Arma", icon: <GiBookCover />, key: "weapon" },
      { header: "Tipo", icon: <MdMergeType />, key: "type" },
      { header: "Dano", icon: <GiDrippingSword />, key: "damage" },
    ];

    return (
      <Grid container spacing={1}>
        {label.map(({ key }, idx) => (
          <Grid item xs={12} key={key}>
            <TextField
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              name={key}
              InputProps={{
                startAdornment: <div style={{ marginRight: 10 }}>{label[idx].icon}</div>,
              }}
              label={label[idx].header}
              defaultValue={row.original[key]}
              onChange={(e) => {
                const { name, value } = e.target;
                const editedList = initialValues.map((sheet, idx) =>
                  idx === row.index ? { ...sheet, [name]: value } : sheet
                );

                setEditValues(editedList);
              }}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  /* ------------------------------------ . ----------------------------------- */

  useEffect(() => {
    if (Object.keys(debouncedValues[0]).length > 0) {
      onChange(debouncedValues[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues[0]]);

  const smallColumns = [
    {
      header: "Itens de defesa",
      enableSorting: false,
      enableColumnActions: false,
      Cell: SmallCell,
    },
  ];

  const memoColumns = isSmall ? smallColumns : columns.map((c) => ({ ...c, muiEditTextFieldProps }));

  return (
    <MaterialReactTable
      enableEditing={!isSmall}
      enableToolbarInternalActions={false}
      enableRowActions
      enableCellActions
      enableClickToCopy="context-menu"
      createDisplayMode="row"
      editDisplayMode="cell"
      enableRowVirtualization
      onCreatingRowSave={createNewAbility}
      enablePagination={false}
      localization={MRT_Localization_PT_BR}
      columns={memoColumns}
      data={initialValues.filter((v) => Boolean(v))}
      muiTablePaperProps={{
        sx: {
          background: "#0b0b0b",
        },
      }}
      initialState={{
        density: "compact",
      }}
      renderBottomToolbar={false}
      renderTopToolbarCustomActions={({ table }) => (
        <Btn
          fullWidth={false}
          sx={{ fontSize: ["0.6em", "0.9em"] }}
          onClick={() => {
            table.setCreatingRow(true);
            createNewAbility(table);
          }}
        >
          Novo Item
        </Btn>
      )}
      renderRowActions={({ row }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Tooltip title="Remover">
            <IconButton color="error" onClick={() => deleteAbilityRow(row)}>
              <MdDelete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      renderEmptyRowsFallback={() => <Alert severity="info">Não há items para serem exibidos, crie um!</Alert>}
    />
  );
}

export default AttackItemsTable;
