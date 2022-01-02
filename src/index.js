import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";

import {Provider} from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    {/*Error Boundary*/}
    {/*  <CurrencyPairServiceProvider value={currencyPairService}>*/}
        {/* Router */}
          <App></App>
        {/* Router */}
      {/*</CurrencyPairServiceProvider>*/}
    {/*Error Boundary*/}
  </Provider>,
  document.getElementById('root')
);