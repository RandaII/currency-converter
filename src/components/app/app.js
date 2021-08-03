import React from 'react';
import Converter from "../converter";
import CurrenciesList from "../currencies-table";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SwitchButtons from "../switch-buttons";

const App = () => {
  return (
    <Router>
      <div className="currencies-app">
        <SwitchButtons/>
        <Route path="/" component={Converter} exact></Route>
        <Route path="/currencies-table" component={CurrenciesList}></Route>
      </div>
    </Router>
  );
}

export default App;