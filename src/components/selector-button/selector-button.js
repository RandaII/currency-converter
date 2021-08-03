import React from "react";
import PropTypes from "prop-types";
import {PropTypesTemplates as Templates} from "../../utils";

import "./selector-button.scss";

const SelectorButton = ({activeStatus, dataType, onClick, children}) =>{

  let buttonClassname = `selected-currency-button`;
  buttonClassname += (activeStatus) ? ` active` : ``;

  return (
    <button
      data-element-type={dataType}
      className={buttonClassname}
      onClick={onClick}
    >{children}
      <i
        className="fa--converter fa fa-angle-down"
         data-element-type={dataType}></i>
    </button>
  )
}

SelectorButton.propTypes = {
  activeStatus: PropTypes.bool.isRequired,
  dataType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOf(Templates.currenciesArray).isRequired
};

export default SelectorButton;