import React from 'react';
import {PropTypesTemplates as Templates, returnCheckedValue} from "../../utils";
import PropTypes from "prop-types";

import "./converter-input-field.scss"

const ConverterInputField = ({onInputChange, type, currencyValue}) => {

  const onchange = ({target: {value}}) => {
    //проверяем поступившее значение на недопустимые символы и делаем еще несколько проверок, после чего переприсваеваем
    value = returnCheckedValue(value);

    // в случае, если значение после проверки изменилось, отправляем его в store
    if (value !== currencyValue){
      onInputChange({
        type,
        value
      });
    }
  }

  // очистка input
  const clearInput = (evt) => {
    onInputChange({
      type,
      value: ``
    });
    evt.target.blur();
  };

  // обработчик для управления с клавиатуры
  const clearInputOnKeyDown = (evt) =>{
    if (evt.key === `Enter`){clearInput(evt);}
  }

  return (
    <div className="converter__input-block">
      <input type="text"
             value={currencyValue}
             onChange={onchange}
             maxLength={15}/>
      <span onClick={clearInput} onKeyDown={clearInputOnKeyDown} className="converter__input-clear" tabIndex="0">&#215;</span>
    </div>
  );
}

ConverterInputField.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  currencyValue: PropTypes.oneOfType(Templates.stringWithNumber).isRequired,
  type: PropTypes.string.isRequired
}

export default ConverterInputField;