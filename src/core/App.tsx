import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

import logo from "../assets/logo.svg";
import "./App.scss";
import AppBar from "./components/AppBar";
import { theme } from "./theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Button variant="contained" color="primary">
            Hello
          </Button>
        </header>
      </div>
    </ThemeProvider>
  );
};

export default App;
