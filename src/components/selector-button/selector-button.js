import React from "react";
import PropTypes from "prop-types";
import {PropTypesTemplates as Templates} from "../../utils";

import "./selector-button.scss";

const SelectorButton = ({dataType, onClick, children, classNames}) =>(
    <button
      data-element-type={dataType}
      className={ `selected-currency-button ${classNames}`}
      onClick={onClick}>
        {children}
      <i className="fa--converter fa fa-angle-down"
         data-element-type={dataType}></i>
    </button>);

SelectorButton.propTypes = {
  dataType: PropTypes.string,
  classNames: PropTypes.string,
  children: PropTypes.oneOf(Templates.currenciesArray).isRequired,
  onClick: PropTypes.func.isRequired
};

export default SelectorButton;