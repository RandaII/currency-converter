import React from 'react';
import Converter from "../converter";
import withCurrencyPairService from "../hoc";

import * as styles from './app.scss';

const App = ({currencyPairService}) => {
  return (
    <Converter></Converter>
  );
}


export default withCurrencyPairService()(App);