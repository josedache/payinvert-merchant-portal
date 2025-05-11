import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "configs/theme";

export function MuiThemeProvider(props: MuiThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default MuiThemeProvider;

export type MuiThemeProviderProps = { children: any };
