"use client";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GiBackpack, GiBookAura, GiElfHelmet, GiSwordInStone } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import Img from "./Image";
import { useEditSheet, useGetSheets } from "@/hooks/sheets";
import { ISheetCardChar } from "@/types/sheets";
import { PiGithubLogoFill } from "react-icons/pi";
import { FaDiceD20 } from "react-icons/fa6";
import getBase64 from "@/utils/getBase64";
import Btn from "./Button";

interface INavbarProps {
  open: boolean;
  closeMenu: (newVal: boolean) => void;
}

const routes = [
  {
    title: "Personagem",
    route: "/",
    icon: GiElfHelmet,
  },
  {
    title: "Habilidades",
    route: "/abilities",
    icon: GiBookAura,
  },
  {
    title: "Combate",
    route: "/combat",
    icon: GiSwordInStone,
  },
  {
    title: "Equipamentos",
    route: "/equipaments",
    icon: GiBackpack,
  },
  {
    title: "Dados",
    route: "/dice",
    icon: FaDiceD20,
  },
];

export default function NavBar({ open, closeMenu }: INavbarProps) {
  const router = useRouter();
  const [charId, setCharId] = useState("");
  const { sheets } = useGetSheets();
  const { editSheetFn } = useEditSheet();

  const sheet = (sheets?.list || []).find((s: ISheetCardChar) => s.id === charId);

  const updateImgSrc = (src: string) => {
    sheet.src = src;
    editSheetFn({ src })
  };

  const imgUploadRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const [http, space, url, href, charId] = window.location.href.split("/");
    setCharId(charId);
  }, []);

  return (
    <Drawer open={open} onClose={() => closeMenu(false)} PaperProps={{ sx: { width: ["75vw", "50vw", "auto"] } }}>
      <Toolbar style={{ position: "relative", display: "flex", flexDirection: "column" }}>
        <IconButton onClick={() => closeMenu(false)} style={{ position: "absolute", top: 0, right: 0 }}>
          <MdClose size={30} />
        </IconButton>
        <input
              style={{ display: "none" }}
              type="file"
              id="src"
              name="src"
              ref={imgUploadRef}
              onChange={async (e: any) => {
                const file = e.target.files[0];
                const base64 = await getBase64(file);
                updateImgSrc(base64)
              }}
        />
        <Btn style={{
            maxHeight: "150px",
            maxWidth: "150px",
            aspectRatio: "1 / 1",
            border: "3px solid grey",
            borderRadius: "4px",
            marginTop: "40px",
            marginBottom: "5px",
            padding: 0,
        }}
        onClick={() => {
          console.log(imgUploadRef.current)
          if(imgUploadRef.current) {
            imgUploadRef.current.click()
          }
        }}
        >
        <Img
          width="100%"
          height="100%"
          src={sheet?.src}
          alt="characterIMG"
          />
        </Btn>

        <Typography variant="subtitle2">Bem vindo de volta, grande aventureiro(a)</Typography>
        <Typography variant="subtitle1">{sheet?.name}</Typography>
        <Divider orientation="horizontal" flexItem sx={{ borderBottomWidth: 4 }} />
      </Toolbar>
      <List>
        {routes.map((r) => (
          <ListItem key={r.title} disablePadding>
            <ListItemButton
              onClick={() => {
                router.push(`/character/${charId}/${r.route}`);
                closeMenu(false);
              }}
            >
              <ListItemIcon>
                <r.icon size={30} />
              </ListItemIcon>
              <ListItemText primary={r.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box style={{ position: "absolute", bottom: 0, right: 0, width: "100%" }}>
        <Typography
          variant="subtitle2"
          textAlign="center"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
        >
          Made with ❤️ by Will
          <Tooltip title="Github">
            <Link href="https://github.com/nittts" target="_blank" rel="noreferrer">
              <PiGithubLogoFill color="#fff" size="2em" />
            </Link>
          </Tooltip>
        </Typography>
      </Box>
    </Drawer>
  );
}
