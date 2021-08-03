import ConverterInputField from "../converter-input-field";
import CurrenciesSelection from "../currencies-selection";
import ErrorIndicator from "../error-indicator";
import React from "react";

import "./converter.scss";

const converterView = ({
                         onInputChange,
                         fetchCurrenciesInfo,
                         currencyListToggle,
                         currentCurrency,
                         currentCurrencyValue,
                         convertedCurrency,
                         convertedCurrencyValue,
                         listActiveCurrent,
                         listActiveConverted,
                         errorStatus
                       }) => {

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
            activeStatus={listActiveCurrent}/>
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
            activeStatus={listActiveConverted}/>
        </div>
      </div>
  }

  return (<main className="converter">
      {component}
    </main>
  );
}

export default converterView;