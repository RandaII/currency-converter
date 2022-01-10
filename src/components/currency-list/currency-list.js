import React from "react";
import PropTypes from "prop-types";

import "./currency-list.scss";

const CurrencyList = ({children, classNames, dataType, onClick}) => {
  const handler = (evt) =>{
    if (evt.target.dataset.elementType === dataType){
      if (evt.type === `keydown` && evt.key === `Enter`){
        onClick(evt);
      }
      else if(evt.type === `click`){
        onClick(evt);
      }
    }
  }
  return (
    <ul className={`currency-list ${classNames}`} onKeyDown={handler} onClick={handler}>
      {children.map((value, index) =>
        <li className="currency-list-item"
            key={index}
            data-element-type={dataType}
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