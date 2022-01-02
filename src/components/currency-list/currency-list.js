import React from "react";
import PropTypes from "prop-types";

import "./currency-list.scss";

const CurrencyList = ({children, classNames, dataType, onClick}) =>(
    <ul className={`currency-list ${classNames}`}>
      {children.map((value, index) =>
        <li className="currency-list-item"
            onClick={onClick}
            key={index}
            data-element-type={dataType}>{value}
        </li>)}
    </ul>);

CurrencyList.propTypes = {
  children: PropTypes.array.isRequired,
  classNames: PropTypes.string,
  dataType: PropTypes.string,
  onClick: PropTypes.func
}

export default CurrencyList;