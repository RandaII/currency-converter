import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchPairValue, setListStatus} from "../../actions";
import PropTypes from "prop-types";
import {PropTypesTemplates as Templates, listDisablerHandler} from "../../utils";
import ErrorIndicator from "../error-indicator";
import ErrorBoundary from "../error-boundary";
import ConverterView from "../converter-view";

class Converter extends Component {

  static propTypes = {
    converter: PropTypes.shape({
      converted: PropTypes.shape({
        currency: PropTypes.oneOf(Templates.currenciesArray).isRequired
      }).isRequired,
      current: PropTypes.shape({
        currency: PropTypes.oneOf(Templates.currenciesArray).isRequired
      }).isRequired,
      dataType: PropTypes.string.isRequired,
      listsStatus: PropTypes.shape({
        current: PropTypes.bool.isRequired,
        converted: PropTypes.bool.isRequired,
      }).isRequired
    }),
    currencyPairService: PropTypes.object.isRequired,
    fetchPairValue: PropTypes.func.isRequired,
    setListStatus: PropTypes.func.isRequired
  };

  state = {
    error: {
      status: false,
      message: null
    }
  }

  // функция вызываемая при возникновении ошибки
  onError = (err) => {
    this.setState({
      error: {
        status: true,
        message: err.message
      }
    });
    throw err;
  }

  // Типы для row компонентов
  rowTypes = [
    {id:0, type:`current`},
    {id:1, type:`converted`}
  ];

  // listener отслеживает клики, при любом активном currency-list, при клике, вне окна, или же при смене фокуса на элемент без необходимого dataType, меняет состояние на false
  listDisabler = (evt) =>{
    const {dataType, listsStatus:{current, converted}} = this.props.converter;
    const activeStatus = current || converted;
    const func = () =>
        this.props.setListStatus({
          current: false,
          converted: false
        })
    // для проверки соблюдения условий, используется общий handler
    listDisablerHandler(evt, activeStatus, dataType, func);
  }

  // получение data по валютной паре, и отправка ее в store
  fetchCurrenciesInfo = async () => {
    const {
      currencyPairService,
      fetchPairValue,
      converter: {
        current:{currency: currentCurrency},
        converted:{currency: convertedCurrency}
      }
    } = this.props;

    // образуем ключи текущей пары
    const pair = [currentCurrency + convertedCurrency, convertedCurrency + currentCurrency];

    // получаем курс текущей пары
    currencyPairService.getCourse(pair)
      // отправляем значение в store
      .then(fetchPairValue)
      .catch(this.onError);
  }

  // после монтирования получаем текущий курс и назначаем обработчики
  componentDidMount() {
    this.fetchCurrenciesInfo();
    document.addEventListener(`click`, this.listDisabler);
    document.addEventListener(`keyup`, this.listDisabler);
  }

  componentWillUnmount() {
    document.removeEventListener(`click`, this.listDisabler);
    document.removeEventListener(`keyup`, this.listDisabler);
  }

  render() {

    const {status: errorStatus} = this.state.error;

    // в зависимости от статуса, показываем нужный компонент
    return (
      <ErrorBoundary>
        {(errorStatus && <ErrorIndicator/>) ||
        <ConverterView
          rowTypes={this.rowTypes}
          fetch={this.fetchCurrenciesInfo}/>}
      </ErrorBoundary>);
  }
}

const mapDispatchToProps = {fetchPairValue, setListStatus};

const mapStateToProps = ({converter, currencyPairService}) => ({converter:{
    current: {currency:converter.current.currency},
    converted: {currency:converter.converted.currency},
    dataType: converter.dataType,
    listsStatus: converter.listsStatus
  },
  currencyPairService});

export default connect(mapStateToProps, mapDispatchToProps)(Converter);