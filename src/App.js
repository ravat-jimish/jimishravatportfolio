import React from "react";
import {BrowserRouter} from "react-router-dom";
import "./App.scss";
import Main from "./containers/Main";

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
