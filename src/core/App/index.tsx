import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createStoreContext } from "@mollycule/redux-hook";
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Switch
} from "react-router-dom";

import "./App.scss";
import AppBar from "../components/AppBar";
import { theme } from "../theme";
import createStore from "../utils/createStore";
import ReportLost from "scenes/Report/ReportLost";
import ReportFound from "scenes/Report/ReportFound";
import ApiService from "shared/services/apiService";
import PetsListing from "scenes/PetsListing";
import MapView from "scenes/PetsListing/MapView";
import Details from "scenes/PetDetails";
import storageService from "shared/services/storageService";
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
          <Router>
            <AppBar />
            <Switch>
              <Route exact path="/" component={PetsListing} />
              <Route exact path="/report/lost" component={ReportLost} />
              <Route exact path="/report/found" component={ReportFound} />
              <Route exact path="/map" component={MapView} />
              <Route exact path="/details/:id" component={Details} />
              <Route exact path="/about" component={About} />
              {/* <Route render={() => <Redirect to="/" />} /> */}
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
