import React, {Component} from 'react';
import ConverterInputField from "../converter-input-field";
import CurrenciesList from "../currencies-list";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import withCurrencyPairService from "../hoc";
import {fetchPairValue} from "../../actions";


// ПРОВЕРИТЬ КОД СЕРВИСА, НЕ ЗАБЫТЬ СДЕЛАТЬ КОММИТ, РЕАЛИЗОВАТЬ КОНВЕРТАЦИЮ

class Converter extends Component {

  async componentDidMount() {
    const {
      currencyPairService,
      fetchPairValue,
      currenciesInfo: {
        currentCurrency: currentCurrency,
        convertedCurrency: convertedCurrency
      }} = this.props;

    // образуем ключ текущей пары
    this.pair = currentCurrency + convertedCurrency;

    // получаем курс текущей пары
    let pairValue = await currencyPairService.getCourse(this.pair);

    // отправляем значение в store
    fetchPairValue(pairValue);
  }


  render() {
    const {currentCurrency, convertedCurrency, exchangeRate} = this.props.currenciesInfo;
    return (
      <main className="converter">

        <div className="converter__currency-block">
          <ConverterInputField></ConverterInputField>
          <CurrenciesList currency={currentCurrency}></CurrenciesList>
        </div>

        <div className="converter__currency-block">
          <ConverterInputField></ConverterInputField>
          <CurrenciesList currency={convertedCurrency}></CurrenciesList>
        </div>

      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchPairValue: fetchPairValue
  }, dispatch);
}

const mapStateToProps = ({currenciesInfo}) => {
  return {currenciesInfo};
}

export default withCurrencyPairService()(connect(mapStateToProps, mapDispatchToProps)(Converter));