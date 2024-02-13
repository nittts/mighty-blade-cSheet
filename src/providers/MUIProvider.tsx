import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

type IContext = {
  mode: string;
  theme: Theme;
  changeMode: () => void;
};

const MUIProviderContext = createContext<IContext>({} as IContext);

export default function MUIPRovider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const changeMode = useCallback(() => {
    if (mode === "dark") {
      return setMode("light");
    }
    setMode("dark");
  }, [mode]);

  const values = useMemo(
    () => ({
      changeMode,
      mode,
      theme,
    }),
    [mode, theme, changeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <MUIProviderContext.Provider value={values}>
        <CssBaseline />
        {children}
      </MUIProviderContext.Provider>
    </ThemeProvider>
  );
}

export function useAppTheme() {
  const context = useContext(MUIProviderContext);

  if (!context) throw new Error("AppTheme Context not defined.");

  return context;
}
