import React, { useEffect, useState } from "react";
import { equipaments } from "@/types/sheets";
import { useDebounceValue } from "usehooks-ts";
import { MRT_TableOptions, MaterialReactTable } from "material-react-table";

import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import columns from "./columns";
import { Alert, Box, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import Btn from "@/components/Button";
import { MdDelete } from "react-icons/md";

import { useWindowSize } from "@uidotdev/usehooks";
import { GiBookCover, GiCoins, GiWeight } from "react-icons/gi";

export type IEquipamentsFormPayload = { equipaments: equipaments[] };

interface EquipamentsFormProps {
  initialValues: equipaments[];
  onChange: (payload: IEquipamentsFormPayload) => void;
}

export default function EquipamentsForm({ initialValues, onChange }: EquipamentsFormProps) {
  const [editValues, setEditValues] = useState<any>({});
  const debouncedValues = useDebounceValue(editValues, 500);

  const { width } = useWindowSize();
  const isSmall = width && width <= 768;

  const createNewAbility = (table: any) => {
    const values = { item: "", weight: "", cost: "" };
    const copy = [...initialValues, values];

    onChange({ equipaments: copy });
    table.setCreatingRow(null);
  };

  const deleteAbilityRow = (row: any) => {
    const filter = initialValues.filter((_, idx) => idx !== row.index);

    onChange({ equipaments: filter });
  };

  const saveInputValue = (event: any, row: any) => {
    const { name, value } = event.target;
    const editedList = initialValues.map((sheet, idx) => (idx === row.index ? { ...sheet, [name]: value } : sheet));

    onChange({ equipaments: editedList });
  };

  const muiEditTextFieldProps = ({ row }: any) => ({
    type: "text",
    onBlur: (e: any) => saveInputValue(e, row),
  });

  const SmallCell = ({ row }: any) => {
    const label = [
      { header: "Item", icon: <GiBookCover />, key: "item" },
      { header: "Peso", icon: <GiWeight />, key: "weight" },
      { header: "Custo", icon: <GiCoins />, key: "cost" },
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
      onChange({ equipaments: debouncedValues[0] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues[0]]);

  const smallColumns = [
    {
      header: "Equipamento",
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
          Novo Equipamento
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
      renderEmptyRowsFallback={() => (
        <Alert severity="info">Não há equipamentos gerais para serem exibidos, crie uma!</Alert>
      )}
    />
  );
}
