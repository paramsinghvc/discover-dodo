import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { createStoreContext } from "@mollycule/redux-hook";

import logo from "assets/logo.svg";
import "./App.scss";
import AppBar from "../components/AppBar";
import { theme } from "../theme";
import createStore from "../utils/createStore";

const store = createStore();
const { Provider } = createStoreContext<any>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
