import React from 'react';
import {PropTypesTemplates as Templates, returnCheckedValue} from "../../utils";
import PropTypes from "prop-types";

import "./converter-input-field.scss"

const ConverterInputField = ({onInputChange, type, currencyValue}) => {

  const onchange = ({target: {value}}) => {

    onInputChange({
      type,
      value: returnCheckedValue(value) //проверяем поступившее значение и присваеваем
    });
  }

  const clearInput = () => onInputChange({
    type,
    value: ``
  });

  return (
    <div className="converter__input-block">
      <input type="text"
             value={currencyValue}
             onChange={onchange}
             maxLength={15}/>
      <span onClick={clearInput} className="converter__input-clear">&#215;</span>
    </div>
  )
}

ConverterInputField.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  currencyValue: PropTypes.oneOfType(Templates.stringWithNumber).isRequired,
  type: PropTypes.oneOf([`currentCurrencyValue`, `convertedCurrencyValue`]).isRequired
}

export default ConverterInputField;