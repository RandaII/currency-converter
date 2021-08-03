import React from "react";
import PropTypes from "prop-types";
import {PropTypesTemplates as Templates} from "../../utils";

import "./currency-list.scss";

const CurrencyList = ({currencyArray, className, dataType, onClick}) => {

  const currencyListItems = currencyArray.map((value, index) =>
    <li className="currency-list-item"
        onClick={onClick}
        key={index}
        data-element-type={dataType}>{value}
    </li>);

  return (<ul className={className}>{currencyListItems}</ul>);
}

CurrencyList.propTypes = {
  currencyArray: PropTypes.arrayOf(PropTypes.oneOf(Templates.currenciesArray)),
  className: PropTypes.string.isRequired,
  dataType: PropTypes.oneOf([`currency-converter-item`, `currency-table-item`]),
  onClick: PropTypes.func.isRequired
}

export default CurrencyList;