import React, {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import "./App.scss";
import Main from "./containers/Main";
import {AppConfigProvider} from "./contexts/appConfig/AppConfigContext";
import {trackVisit} from "./lib/edgeFunctions";

function App() {
  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <BrowserRouter>
      <AppConfigProvider>
        <Main />
      </AppConfigProvider>
    </BrowserRouter>
  );
}

export default App;
