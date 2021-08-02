import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import SelectorButton from "../selector-button";
import CurrencyList from "../currency-list";
import React from "react";

const currenciesTableView = ({ currencyList,
                               currentCurrency,
                               currenciesValue,
                               activeStatus,
                               isLoading,
                               error,
                               firstMount,
                               toggle,
                               sendCurrency}) =>{

    let items = currencyList.map((item, i) => {
      if (item !== currentCurrency) {
        let pair = currentCurrency + item;

        return (<tr className="currency-table__row" key={i}>
          <td>{currentCurrency}/{item}</td>
          <td>{currenciesValue[pair]}</td>
        </tr>);
      }
    });

    let currencyListClasses = `currency-list `;

    if (activeStatus) {
      currencyListClasses += `currency-list--show`;
    }
    else if (!activeStatus && firstMount) {
      currencyListClasses += `currency-list--out-border`;

    } else {
      currencyListClasses += `currency-list--hide`;
    }

    const currencyTable = <table className="currency-table">
      <thead>
      <tr className="currency-table__row">
        <th>Валюта</th>
        <th>Цена</th>
      </tr>
      </thead>
      <tbody>
      {items}
      </tbody>
    </table>;

    return (
      <div className="currency-table__component">
        <div className="currency-table__wrapper">

          {(!error && !isLoading) && currencyTable}
          {isLoading && <Spinner/>}
          {error && <ErrorIndicator/>}
        </div>

        <div>

          <SelectorButton
            dataType="currency-table-item"
            onClick={toggle}
            activeStatus={activeStatus}>{currentCurrency}
          </SelectorButton>

          <CurrencyList
            currencyArray={currencyList}
            onClick={sendCurrency}
            dataType="currency-table-item"
            className={currencyListClasses}
          />

        </div>
      </div>
    );
}

export default currenciesTableView;