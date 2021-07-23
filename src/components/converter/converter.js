import React, {Component} from 'react';
import ConverterInputField from "../converter-input-field";
import CurrenciesSelection from "../currencies-selection";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import withCurrencyPairService from "../hoc";
import {fetchPairValue, addCurrencyValue} from "../../actions";

// TODO сделать компонент строку, переписать код компонента
//TODO сделать PropTypes
//TODO переделать очищение инпута

class Converter extends Component {

  state = {
    listActive: {
      currentCurrency:false,
      convertedCurrency: false
    },
  }

  currencyListToggle = async (type) => {

      let anotherType = (type === `currentCurrency`) ? `convertedCurrency` : `currentCurrency`;

      await this.setState((state) => {
        return {listActive:{
            [type]: !state.listActive[type],
            [anotherType]: false
          }}
      });
  }

  backgroundClickListener = ({target}) =>{

    const {currentCurrency, convertedCurrency} = this.state.listActive;
    const attribute = target.getAttribute(`data-element-type`);

    if ((currentCurrency || convertedCurrency) && attribute !== `currency-converter-item`){
        this.setState({
          listActive:{
            currentCurrency:false,
            convertedCurrency: false
          }
        });
    }
  }

  fetchCurrenciesInfo = async () => {
    const {
      currencyPairService,
      fetchPairValue,
      currenciesInfo: {
        currentCurrency,
        convertedCurrency
      }
    } = this.props;

    // образуем ключи текущей пары
    this.pair = [currentCurrency + convertedCurrency, convertedCurrency + currentCurrency];

    // получаем курс текущей пары
    let pairValue = await currencyPairService.getCourse(this.pair);

    // отправляем значение в store
    fetchPairValue(pairValue);
  }

  onInputChange = (value) => this.props.addCurrencyValue(value);


  async componentDidMount() {
    await this.fetchCurrenciesInfo();
    document.addEventListener(`click`, this.backgroundClickListener);
  }

  render() {
    const {currentCurrency, convertedCurrency, currentCurrencyValue, convertedCurrencyValue} = this.props.currenciesInfo;

    const {currentCurrency: listActiveCurrent, convertedCurrency: listActiveConverted } = this.state.listActive;

    return (
      <main className="converter">

        <div className="converter__currency-block">
          <ConverterInputField
            onInputChange={this.onInputChange}
            currencyValue={currentCurrencyValue}
            type='currentCurrencyValue'></ConverterInputField>

          <CurrenciesSelection
            currency={currentCurrency}
            type='currentCurrency'
            fetch={this.fetchCurrenciesInfo}
            currencyListToggle={this.currencyListToggle}
            activeStatus={listActiveCurrent}
            ></CurrenciesSelection>
        </div>

        <div className="converter__currency-block">
          <ConverterInputField
            onInputChange={this.onInputChange}
            currencyValue={convertedCurrencyValue}
            type='convertedCurrencyValue'></ConverterInputField>

          <CurrenciesSelection
            currency={convertedCurrency}
            type='convertedCurrency'
            fetch={this.fetchCurrenciesInfo}
            currencyListToggle={this.currencyListToggle}
            activeStatus={listActiveConverted}></CurrenciesSelection>
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