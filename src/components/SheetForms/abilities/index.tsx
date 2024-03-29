import React, { useEffect, useState } from "react";
import { ability } from "@/types/sheets";
import { useDebounceValue } from "usehooks-ts";
import { MaterialReactTable } from "material-react-table";

import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import columns from "./columns";
import { Alert, Box, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import Btn from "@/components/Button";
import { MdDelete } from "react-icons/md";

import { useWindowSize } from "@uidotdev/usehooks";
import { GiBookCover, GiMagicSwirl } from "react-icons/gi";
import { FaDiceD20 } from "react-icons/fa";
import { BsChatLeftTextFill } from "react-icons/bs";

import InputField from "@/components/Input";
import CardComponent from "@/components/Card";

export type IAbilitiesFormPayload = { abilities: ability[] };

interface abilitiesFormProps {
  initialValues: ability[];
  onChange: (payload: IAbilitiesFormPayload) => void;
}

export default function AbilitiesForm({ initialValues, onChange }: abilitiesFormProps) {
  const [editValues, setEditValues] = useState<any>({});
  const debouncedValues = useDebounceValue(editValues, 500);

  const { width } = useWindowSize();
  const isSmall = width && width <= 768;

  const createNewAbility = (table: any) => {
    const values = { description: "", difficuty: "", mana: "", name: "" };
    const copy = [...initialValues, values];

    onChange({ abilities: copy });
    table.setCreatingRow(null);
  };

  const deleteAbilityRow = (row: any) => {
    const filter = initialValues.filter((_, idx) => idx !== row.index);

    onChange({ abilities: filter });
  };

  const saveInputValue = (event: any, row: any) => {
    const { name, value } = event.target;
    const editedList = initialValues.map((sheet, idx) => (idx === row.index ? { ...sheet, [name]: value } : sheet));

    onChange({ abilities: editedList });
  };

  const muiEditTextFieldProps = ({ row }: any) => ({
    type: "text",
    onBlur: (e: any) => saveInputValue(e, row),
  });


  /* ------------------------------------ - ----------------------------------- */

  const expansiveRow = ({ row, table }: any) => {
    const { index, original } = row;

    const handleChange = (text: string) => {
      const edittedAbility = { ...original, description: text }

      const copyAbilities = initialValues.map((sheet, idx) => idx === index ? edittedAbility : sheet)
      
      setEditValues(copyAbilities);
    }

    return ( 
    <CardComponent cardProps={{ elevation: 4}}>
      <InputField
        fullWidth
        multiline
        variant="filled"
        style={{ border: 'none',fontSize: '7px'  }}
        defaultValue={original.description}
        onChange={(e) => { handleChange(e.target.value)}}
      />
    </CardComponent>)
  }

  const SmallCell = ({ row }: any) => {
    const label = [
      { header: "Nome", icon: <GiBookCover />, key: "name" },
      { header: "Dificuldade", icon: <FaDiceD20 />, key: "difficulty" },
      { header: "Mana", icon: <GiMagicSwirl />, key: "mana" },
    ];

    return (
      <Grid container spacing={1} >
        {label.map(({ key,  header }, idx) => (
          <Grid item xs={12} key={key}>
            <TextField
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              {...(header === 'Descrição' && { multiline: true })}
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
      onChange({ abilities: debouncedValues[0] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues[0]]);

  const smallColumns = [
    {
      header: "Habilidade",
      enableSorting: false,
      enableColumnActions: false,
      Cell: SmallCell,
    },
  ];

  const memoColumns = isSmall ? smallColumns : columns.map((c) => ({ ...c, muiEditTextFieldProps }));

  /* ------------------------------------ - ----------------------------------- */

  return (
    <MaterialReactTable
      enableEditing={!isSmall}
      enableToolbarInternalActions={false}
      enableRowActions
      enableCellActions
      renderDetailPanel={expansiveRow}
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
      muiTableBodyCellProps={{ 
        sx: {
          padding: 0,
          margin: 0,
        }
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
          Nova Habilidade
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
      renderEmptyRowsFallback={() => <Alert severity="info">Não há habilidades para serem exibidas, crie uma!</Alert>}
    />
  );
}
