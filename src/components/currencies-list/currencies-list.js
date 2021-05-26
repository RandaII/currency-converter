import React from 'react';

const CurrenciesList = ({currency}) =>{
  return(
    <div className="converter__currency-type-block">
      <button className="converter__selected-currency">{currency}
        <i className="fa fa-angle-down"></i>
      </button>
      <select name="currency" id="currency-list-1" className="converter__currency-list"></select>
    </div>
  );
}

export default CurrenciesList;