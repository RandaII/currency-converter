import React from "react";
import PropTypes from "prop-types";

import "./currency-list.scss";

const CurrencyList = ({children, classNames = "", dataType = "", onClick = () =>{}}) => {
  // общий handler для ввода с клавиатуры/мыши, в случае соответствия dataType
  const handler = (evt) =>{
    if (evt.target.dataset.elementType === dataType){
      if (evt.key === `Enter` || evt.type === `click`){
        onClick(evt.target.dataset.elementValue);
      }
    }
  }
  return (
    <ul className={`currency-list ${classNames}`} onKeyDown={handler} onClick={handler}>
      {children.map((value, index) =>
        <li className="currency-list-item"
            key={index}
            data-element-type={dataType}
            data-element-value={value}
            tabIndex="0">{value}
        </li>)}
    </ul>);
}

CurrencyList.propTypes = {
  children: PropTypes.array.isRequired,
  classNames: PropTypes.string,
  dataType: PropTypes.string,
  onClick: PropTypes.func
}

export default CurrencyList;