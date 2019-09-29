import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#394a6d" },
    secondary: { main: "#3c9d9b", contrastText: "#fff" },
    error: red
  }
});
