import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ConverterInputField from "../converter-input-field";
import CurrenciesSelection from "../currencies-selection";
import {addCurrencyValue, setListStatus, setCurrency} from "../../actions";
import "./converter-row.scss";
import {PropTypesTemplates as Templates, returnAnotherFieldType} from "../../utils";

const ConverterRow  = (props) =>{
  const {type, converter, setListStatus, setCurrency, fetch, addCurrencyValue, currencyList} = props;

  // переключатель currency-list
  const toggleHandler = () => {

    // получаем тип другого currency-list
    let anotherType = returnAnotherFieldType(type);

    // меняем состояние текущего currency-list на противоположное, для другого currency-list, состояние ставим в false

    let payload = { [type]: !converter.listsStatus[type] };

    if (converter.listsStatus[anotherType]){
      payload[anotherType] = false;
    }

    setListStatus(payload);
  }

  // отправляем выбранную валюту, получаем обновленные данные для новой валютной пары, скрываем currency-list
  const sendCurrency = async (value) => {
    await setCurrency({type, value});
    await fetch();
    toggleHandler();
  }

  // при вводе в input-field, функция отправит новое значение в store
  const onInputChange = (value) => addCurrencyValue(value);

  return (
    <div className="converter__currency-block">

      <ConverterInputField
        onInputChange={onInputChange}
        currencyValue={converter[type].value}
        type={type}/>

      <CurrenciesSelection
        dataType={converter.dataType}
        toggleHandler={toggleHandler}
        activeStatus={converter.listsStatus[type]}
        currency={converter[type].currency}
        currencyList={currencyList}
        currencyListClickHandler={sendCurrency}/>
    </div>
  );
}

ConverterRow.propTypes = {
  addCurrencyValue: PropTypes.func.isRequired,
  setListStatus: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
  converter: PropTypes.shape({
    converted: PropTypes.shape({
      currency: PropTypes.oneOf(Templates.currenciesArray).isRequired,
      value: PropTypes.oneOfType(Templates.stringWithNumber).isRequired
    }).isRequired,
    current: PropTypes.shape({
      currency: PropTypes.oneOf(Templates.currenciesArray).isRequired,
      value: PropTypes.oneOfType(Templates.stringWithNumber).isRequired
    }).isRequired,
    dataType: PropTypes.string.isRequired,
    listsStatus: PropTypes.shape({
      current: PropTypes.bool.isRequired,
      converted: PropTypes.bool.isRequired,
    }).isRequired
  }).isRequired,
  currencyList: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

const mapStateToProps = ({converter, currencyList}) =>(
  {converter:{
      current:{
        value: converter.current.value,
        currency: converter.current.currency
      },
      converted:{
        value: converter.converted.value,
        currency: converter.converted.currency
      },
      dataType: converter.dataType,
      listsStatus: converter.listsStatus
    },
  currencyList});

const mapDispatchToProps ={
    addCurrencyValue,
    setListStatus,
    setCurrency
};

export default connect(mapStateToProps, mapDispatchToProps)(ConverterRow);