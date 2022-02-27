import React from 'react';
import Converter from "../converter";
import CurrenciesList from "../currencies-table";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import SwitchButtons from "../switch-buttons";

const App = () => (
    <Router>
      <div className="currencies-app">
        <SwitchButtons/>
        <Switch>
          <Route path="/" component={Converter} exact/>
          <Route path="/currencies-table" component={CurrenciesList}/>
          <Redirect to="/"/>
        </Switch>
      </div>
    </Router>
  );

export default App;