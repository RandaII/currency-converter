import React from 'react';
import Converter from "../converter";
import withCurrencyPairService from "../hoc";
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom";

import * as styles from './app.scss';
import CurrenciesList from "../currencies-table";

//TODO оформить переключатель в отдельный компонент

const App = ({currencyPairService}) => {
  return (
    <Router>
      <div>
        <div className="switch-buttons">
          <NavLink to="/" activeClassName="active" exact>Конвертер</NavLink>
          <NavLink to="/currencies-table" activeClassName="active">Таблица валют</NavLink>
        </div>
        <Route path="/" component={Converter} exact></Route>
        <Route path="/currencies-table" component={CurrenciesList}></Route>
      </div>
    </Router>
  );
}


export default withCurrencyPairService()(App);