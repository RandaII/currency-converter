import React, {Component} from 'react';
import {returnCheckedValue} from "../../utils";

//TODO реализовать возможность ввода чисел с запятой

export default class ConverterInputField extends Component {

  onchange = ({target:{value}}) =>{
    const {onInputChange, type} = this.props;
    // проверяем поступившее значение

    onInputChange({
      type,
      value: returnCheckedValue(value) // присваеваем проверенное значение
    });

  }

  clearInput = () => this.props.onInputChange({
      type: this.props.type,
      value: ``
    });

  render() {

    const {currencyValue} = this.props;

    return (
      <div className="converter__input-block">
        <input type="text" value={currencyValue} onChange={this.onchange} maxLength={15}/>
        <span onClick={this.clearInput} className="converter__input-clear">&#215;</span>
      </div>
    )
  }
}