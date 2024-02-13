import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { GiBackpack, GiBookAura, GiElfHelmet, GiSwordInStone } from "react-icons/gi";
import { MdClose } from "react-icons/md";

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
];

export default function NavBar({ open, closeMenu }: INavbarProps) {
  const router = useRouter();
  const [http, space, url, href, charId] = window.location.href.split("/");

  return (
    <Drawer open={open} onClose={() => closeMenu(false)} PaperProps={{ sx: { width: ["75vw", "50vw", "auto"] } }}>
      <Toolbar style={{ position: "relative" }}>
        <IconButton onClick={() => closeMenu(false)} style={{ position: "absolute", top: 0, right: 0 }}>
          <MdClose size={30} />
        </IconButton>
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
    </Drawer>
  );
}
