import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";

import {Provider} from "react-redux";
import {CurrencyPairServiceProvider} from "./components/currency-pair-service-context";
import store from "./store";
import CurrencyPairService from "./services/currency-pair-service";

const currencyPairService = new CurrencyPairService();

ReactDOM.render(
  <Provider store={store}>
    {/*Error Boundary*/}
      <CurrencyPairServiceProvider value={currencyPairService}>
        {/* Router */}
          <App></App>
        {/* Router */}
      </CurrencyPairServiceProvider>
    {/*Error Boundary*/}
  </Provider>,
  document.getElementById('root')
);