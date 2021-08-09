import ConverterInputField from "../converter-input-field";
import CurrenciesSelection from "../currencies-selection";
import ErrorIndicator from "../error-indicator";
import React from "react";

import "./converter.scss";
import ErrorBoundary from "../error-boundary";

const converterView = (props) => {

  const {
    funcs: {onInputChange, fetchCurrenciesInfo, currencyListToggle}, converter: {currentCurrency, currentCurrencyValue, convertedCurrency, convertedCurrencyValue},
    activeList,
    errorStatus
  } = props;

  let component;

  if (errorStatus) {
    component = <ErrorIndicator/>;
  } else {

    component =
      <div className="converter__wrapper">
        <div className="converter__currency-block">
          <ConverterInputField
            onInputChange={onInputChange}
            currencyValue={currentCurrencyValue}
            type='currentCurrencyValue'/>

          <CurrenciesSelection
            currency={currentCurrency}
            type='currentCurrency'
            fetch={fetchCurrenciesInfo}
            currencyListToggle={currencyListToggle}
            activeStatus={activeList.currentCurrency}/>
        </div>

        <div className="converter__currency-block">
          <ConverterInputField
            onInputChange={onInputChange}
            currencyValue={convertedCurrencyValue}
            type='convertedCurrencyValue'/>

          <CurrenciesSelection
            currency={convertedCurrency}
            type='convertedCurrency'
            fetch={fetchCurrenciesInfo}
            currencyListToggle={currencyListToggle}
            activeStatus={activeList.convertedCurrency}/>
        </div>
      </div>
  }

  return (
    <ErrorBoundary>
      <main className="converter">
        {component}
      </main>
    </ErrorBoundary>
  );
}

export default converterView;