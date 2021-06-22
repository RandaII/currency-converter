import React, {Component} from 'react';
import ConverterInputField from "../converter-input-field";
import CurrenciesList from "../currencies-list";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import withCurrencyPairService from "../hoc";
import {fetchPairValue, addCurrencyValue} from "../../actions";

// TODO сделать компонент строку, переписать код компонента

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
    // this.pair = currentCurrency + convertedCurrency;
    this.pair = [currentCurrency + convertedCurrency, convertedCurrency + currentCurrency];

    // получаем курс текущей пары
    let pairValue = await currencyPairService.getCourse(this.pair);

    // отправляем значение в store
    fetchPairValue(pairValue);
  }

  onInputChange = (value) =>{
    this.props.addCurrencyValue(value);
  }

  render() {
    const {currentCurrency, convertedCurrency, currentCurrencyValue, convertedCurrencyValue} = this.props.currenciesInfo;

    return (
      <main className="converter">

        <div className="converter__currency-block">
          <ConverterInputField
            onInputChange={this.onInputChange}
            currencyValue={currentCurrencyValue}
            type='currentCurrencyValue'></ConverterInputField>
          <CurrenciesList currency={currentCurrency}></CurrenciesList>
        </div>

        <div className="converter__currency-block">
          <ConverterInputField
            onInputChange={this.onInputChange}
            currencyValue={convertedCurrencyValue}
            type='convertedCurrencyValue'></ConverterInputField>
          <CurrenciesList currency={convertedCurrency}></CurrenciesList>
        </div>

      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchPairValue: fetchPairValue,
    addCurrencyValue: addCurrencyValue
  }, dispatch);
}

const mapStateToProps = ({currenciesInfo}) => {
  return {currenciesInfo};
}

export default withCurrencyPairService()(connect(mapStateToProps, mapDispatchToProps)(Converter));