import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createStoreContext } from "@mollycule/redux-hook";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import "./App.scss";
import AppBar from "../components/AppBar";
import { theme } from "../theme";
import createStore from "../utils/createStore";
import ReportLost from "scenes/ReportLost";

const store = createStore();
const { Provider } = createStoreContext<any>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppBar />
          <Router>
            <Switch>
              <Route exact path="/" component={ReportLost} />
              <Route exact path="/report" component={ReportLost} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
