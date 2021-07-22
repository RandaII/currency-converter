import React from "react";

const CurrencyList = (props) =>{

  const {currencyArray, className, elementType, onClick} = props;

  const currencyListItems = currencyArray.map((value, index) =>
    <li className="currency-list-item"
        onClick={onClick}
        key={index}
        data-element-type={elementType}>{value}
    </li>);

  return(<ul className={className}>{currencyListItems}</ul>);
}

export default CurrencyList;