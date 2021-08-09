import {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import withCurrencyPairService from "../hoc";
import {fetchPairValue, addCurrencyValue} from "../../actions";
import PropTypes from "prop-types";
import {PropTypesTemplates as Templates} from "../../utils";
import converterView from "./converter-view";

class Converter extends Component {

  static propTypes = {
    addCurrencyValue: PropTypes.func.isRequired,
    converter: PropTypes.shape({
      convertedCurrency: PropTypes.string.isRequired,
      convertedCurrencyValue: PropTypes.oneOfType(Templates.stringWithNumber).isRequired,
      currentCurrency: PropTypes.string.isRequired,
      currentCurrencyValue: PropTypes.oneOfType(Templates.stringWithNumber).isRequired,
      exchangeRate: PropTypes.oneOfType(Templates.stringWithNumber).isRequired,
      reverseExchangeRate: PropTypes.oneOfType(Templates.stringWithNumber).isRequired,
    }),
    currencyPairService: PropTypes.object.isRequired,
    fetchPairValue: PropTypes.func.isRequired
  }

  state = {
    activeList: {
      currentCurrency:false,
      convertedCurrency: false
    },
    error:{
      status: false,
      message: null
    }
  }

  currencyListToggle = async (type) => {

      let anotherType = (type === `currentCurrency`) ? `convertedCurrency` : `currentCurrency`;

      await this.setState((state) => {
        return {activeList:{
            [type]: !state.activeList[type],
            [anotherType]: false
          }}
      });
  }

  backgroundClickListener = ({target}) =>{

    const {currentCurrency, convertedCurrency} = this.state.activeList;
    const attribute = target.getAttribute(`data-element-type`);

    if ((currentCurrency || convertedCurrency) && attribute !== `currency-converter-item`){
        this.setState({
          activeList:{
            currentCurrency:false,
            convertedCurrency: false
          }
        });
    }
  }

  onError = ({message}) =>{
    this.setState({
      error:{
        status: true,
        message
      }
    });
  }

  fetchCurrenciesInfo = async () => {
    const {
      currencyPairService,
      fetchPairValue,
      converter: {
        currentCurrency,
        convertedCurrency
      }
    } = this.props;

    // образуем ключи текущей пары
    this.pair = [currentCurrency + convertedCurrency, convertedCurrency + currentCurrency];

    // получаем курс текущей пары
    await currencyPairService.getCourse(this.pair)
      // отправляем значение в store
      .then((fetchPairValue))
      .catch(this.onError);
  }

  onInputChange = (value) => this.props.addCurrencyValue(value);

  async componentDidMount() {
    await this.fetchCurrenciesInfo();
    document.addEventListener(`click`, this.backgroundClickListener);
  }

  render() {
    const {currentCurrency, convertedCurrency, currentCurrencyValue, convertedCurrencyValue} = this.props.converter;

    const {activeList} = this.state;
    const {status: errorStatus} = this.state.error;
    const {onInputChange, fetchCurrenciesInfo, currencyListToggle} = this;

    const properties = {
      funcs:{onInputChange, fetchCurrenciesInfo, currencyListToggle},
      converter:{
        currentCurrency,
        currentCurrencyValue,
        convertedCurrency,
        convertedCurrencyValue
      },
      errorStatus,
      activeList
    }

    return converterView({...properties})
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchPairValue: fetchPairValue,
    addCurrencyValue: addCurrencyValue
  }, dispatch);
}

const mapStateToProps = ({converter}) => {
  return {converter};
}

export default withCurrencyPairService()(connect(mapStateToProps, mapDispatchToProps)(Converter));