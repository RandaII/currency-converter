import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchPairValue} from "../../actions";
import PropTypes from "prop-types";
import {PropTypesTemplates as Templates} from "../../utils";
import ErrorIndicator from "../error-indicator";
import ConverterRow from "../converter-row";
import ErrorBoundary from "../error-boundary";

import "./converter.scss";

class Converter extends Component {

  static propTypes = {
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
      }).isRequired
    }),
    currencyPairService: PropTypes.object.isRequired,
    fetchPairValue: PropTypes.func.isRequired
  }

  state = {
    error: {
      status: false,
      message: null
    }
  }

  // функция вызываемая при возникновении ошибки
  onError = ({message}) => {
    this.setState({
      error: {
        status: true,
        message
      }
    });
  }

  fetchCurrenciesInfo = async () => {
    // получение информации по валютной паре, и отправка ее в store
    const {
      currencyPairService,
      fetchPairValue,
      converter: {
        current:{currency: currentCurrency},
        converted:{currency: convertedCurrency}
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

  // после монтирования получаем текущий курс
  async componentDidMount() {await this.fetchCurrenciesInfo();}

  render() {

    const {fetchCurrenciesInfo} = this;
    const {status: errorStatus} = this.state.error;

    // в зависимости от статуса, показываем нужный компонент
     const component =
        <>
        {(errorStatus && <ErrorIndicator/>) ||

          <div className="converter__wrapper">
            <ConverterRow
              type="current"
              fetch={fetchCurrenciesInfo}>
            </ConverterRow>

            <ConverterRow
              type="converted"
              fetch={fetchCurrenciesInfo}>
            </ConverterRow>
          </div>
        }
        </>

    return (
      <ErrorBoundary>
        <main className="converter">
          {component}
        </main>
      </ErrorBoundary>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchPairValue
  }, dispatch);
}

const mapStateToProps = ({converter, currencyPairService}) => {
  return {converter, currencyPairService};
}

export default connect(mapStateToProps, mapDispatchToProps)(Converter);