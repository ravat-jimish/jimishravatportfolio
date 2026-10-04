import React from "react";
import {BrowserRouter} from "react-router-dom";
import "./App.scss";
import Main from "./containers/Main";
import {AppConfigProvider} from "./contexts/appConfig/AppConfigContext";

function App() {
  return (
    <BrowserRouter>
      <AppConfigProvider>
        <Main />
      </AppConfigProvider>
    </BrowserRouter>
  );
}

export default App;
