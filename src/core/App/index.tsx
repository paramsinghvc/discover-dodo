import React, { useEffect } from "react";
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
import ContentHeadSection from "../components/ContentHead";
import { theme } from "../theme";
import createStore from "../utils/createStore";
import ReportLost from "scenes/ReportLost";
import ApiService from "shared/services/apiService";
import MapView from "scenes/MapView";
import storageService from "shared/services/storageService";
import ListView from "scenes/ListView";
import About from "scenes/About";

const store = createStore();
const { Provider } = createStoreContext<any>();

ApiService.initFirebase();
storageService.initStorage();

const App: React.FC = () => {
  // useEffect(() => {

  // }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppBar />
          <Router>
            <Switch>
              <Route exact path="/" component={MapView} />
              <Route exact path="/list" component={ListView} />
              <Route exact path="/about" component={About} />
              <Route exact path="/report" component={ReportLost} />
              <Route exact path="/map" component={MapView} />
              {/* <Route render={() => <Redirect to="/" />} /> */}
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
