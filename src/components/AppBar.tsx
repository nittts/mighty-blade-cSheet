"use client";

import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { MdMenu } from "react-icons/md";
import Text from "./Text";
import Btn from "./Button";
import { useRouter } from "next/navigation";

interface IMenuProps {
  openMenu: (newVal: boolean) => void;
}

export default function NavTitle({ openMenu }: IMenuProps) {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => openMenu(true)}
          >
            <MdMenu />
          </IconButton>
          <Text variant="h6" component="div" sx={{ flexGrow: 1 }}></Text>
          <Btn
            fullWidth={false}
            color="inherit"
            onClick={() => router.push("/selectSheet")}
            style={{ marginRight: 10 }}
          >
            Trocar de Personagem
          </Btn>
          <Btn fullWidth={false} color="inherit" onClick={() => router.push("/")}>
            Desconectar
          </Btn>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
