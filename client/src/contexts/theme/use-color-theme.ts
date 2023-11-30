import { createTheme, PaletteMode } from "@mui/material";
import React from "react";

const darkPalette = {
  primary: {
    main: "#1E1E22",
  },
  text: {
    primary: "#0d4280",
    secondary: "#916e14",
  },
};

const lightPalette = {
  primary: {
    main: "#1565c0",
  },
  text: {
    primary: "#1565c0",
    secondary: "#c29319",
  },
};

export const useColorTheme = () => {
  const [mode, setMode] = React.useState<PaletteMode>("light");

  const toggleColorMode = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light" ? lightPalette : darkPalette),
        },
      }),
    [mode]
  );

  return {
    theme,
    mode,
    toggleColorMode,
  };
};
