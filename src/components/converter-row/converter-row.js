import React, {Component} from "react";
import ConverterInputField from "../converter-input-field";
import CurrenciesSelection from "../currencies-selection";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addCurrencyValue, changeActiveList, changeCurrency} from "../../actions";
import PropTypes from "prop-types";
import "./converter-row.scss";
import {PropTypesTemplates as Templates} from "../../utils";

class ConverterRow extends Component{

  static propTypes = {
    addCurrencyValue: PropTypes.func.isRequired,
    changeActiveList: PropTypes.func.isRequired,
    changeCurrency: PropTypes.func.isRequired,
    converter: PropTypes.shape({
      converted: PropTypes.shape({
        currency: PropTypes.oneOf(Templates.currenciesArray),
        value: PropTypes.oneOfType(Templates.stringWithNumber),
        exchangeRate: PropTypes.oneOfType(Templates.stringWithNumber)
      }).isRequired,
      current: PropTypes.shape({
        currency: PropTypes.oneOf(Templates.currenciesArray),
        value: PropTypes.oneOfType(Templates.stringWithNumber),
        exchangeRate: PropTypes.oneOfType(Templates.stringWithNumber)
      }).isRequired,
      activeList: PropTypes.shape({
        current: PropTypes.bool.isRequired,
        converted: PropTypes.bool.isRequired
      })
    }),
    fetch: PropTypes.func.isRequired,
    currencyList: PropTypes.array.isRequired,
    type: PropTypes.oneOf([`current`, `converted`])
  }

  // переключатель currency-list
  toggleHandler = async () => {
    const {type, converter:{activeList}, changeActiveList} = this.props;

    // получаем тип другого currency-list
    let anotherType = (type === `current`) ? `converted` : `current`;

    // меняем состояние текущего currency-list на противоположное, для другого currency-list, состояние ставим в false

    let payload = {
      [type]: !activeList[type]
    };

    if (activeList[anotherType]){
      payload[anotherType] = false;
    }

    await changeActiveList(payload);
  }

  // listener отслеживает клики, при любом активном currency-list, при клике, вне окна, меняет состояние на false
  backgroundClickCallback = () => {
    this.props.changeActiveList({
      current: false,
      converted: false
    });
  }

  sendCurrency = async ({target: {textContent: value}}) => {
    // отправляем выбранную валюту, получаем обновленные данные для новой валютной пары и закрываем модальное окно
    const {changeCurrency, type, fetch} = this.props;

    await changeCurrency({type, value});
    fetch();
  }

  // при вводе в input-field, отправляем новое значение в store
  onInputChange = (value) => this.props.addCurrencyValue(value);

  render() {

    const {converter, type, currencyList} = this.props;

    return (
      <div className="converter__currency-block">

        <ConverterInputField
          onInputChange={this.onInputChange}
          currencyValue={converter[type].value}
          type={type}/>

        <CurrenciesSelection
          dataType="currency-converter-item"
          toggleHandler={this.toggleHandler}
          activeStatus={converter.activeList[type]}
          currency={converter[type].currency}
          currencyList={currencyList}
          currencyListClickHandler={this.sendCurrency}
          bgcCallback={this.backgroundClickCallback}
        />
      </div>
    );
  }
}

const mapStateToProps = ({converter, currencyList}) =>{return {converter, currencyList};}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    addCurrencyValue,
    changeActiveList,
    changeCurrency
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConverterRow);