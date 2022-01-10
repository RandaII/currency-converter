import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addCurrenciesValues, choicesCurrencyInTable} from "../../actions";
import PropTypes from "prop-types";
import ErrorBoundary from "../error-boundary";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import CurrenciesSelection from "../currencies-selection/currencies-selection";

import "./currencies-table.scss";

class CurrenciesTable extends Component {

  static propTypes = {
    addCurrenciesValues: PropTypes.func.isRequired,
    choicesCurrencyInTable: PropTypes.func.isRequired,
    currencyList: PropTypes.array.isRequired,
    currencyPairService: PropTypes.object.isRequired,
    currenciesTable: PropTypes.shape({
      currentCurrency: PropTypes.string.isRequired,
      values: PropTypes.object.isRequired
    })
  };

  state = {
    activeStatus: false,
    isLoading: true,
    error: {
      status: false,
      message: null
    }
  }

  // переключатель activeStatus для currency-list
  toggle = () => this.setState({activeStatus: !this.state.activeStatus});

  // отправляем в store выбранную валюту, получаем обновленные данные
  sendCurrency = async ({target: {textContent}}) => {
    await this.props.choicesCurrencyInTable(textContent);
    await this.addAllCourses();
  }

  // Error-handler, запускаемый при ошибке, также переводим статус загрузки в false
  onError = ({message}) => {
    this.setState({
      error: {
        status: true,
        message
      },
      isLoading: false
    });
  }

  addAllCourses = async () => {
    const {currencyPairService, currencyList, currenciesTable: {currentCurrency}, addCurrenciesValues} = this.props;

    // при получении данных, выводим блок загрузки, после выключаем
    this.setState({isLoading: true});

    await currencyPairService.getAllCourse(currentCurrency, currencyList)
      .then(addCurrenciesValues)
      .catch(this.onError);

    this.setState({isLoading: false});
  }

  // при клике по бэкграунду переводим activeStatus в false
  backgroundsListener = () => this.setState({activeStatus: false});

  // получаем данные после монтирования
  async componentDidMount() {await this.addAllCourses();}

  render() {

    const {currencyList, currenciesTable: {currentCurrency, values: currenciesValue}} = this.props;
    const {activeStatus, isLoading, error: {status: error}} = this.state;

    // выводим все айтемы, кроме выбранной валюты
    let items = currencyList.map((item, i) => {
      if (item !== currentCurrency) {
        let pair = currentCurrency + item;

        return (<tr className="currency-table__row" key={i}>
          <td>{currentCurrency}/{item}</td>
          <td>{currenciesValue[pair]}</td>
        </tr>);
      }
    });

    const currencyTable = <table className="currency-table">
      <thead>
        <tr className="currency-table__row">
          <th>Валюта</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>{items}</tbody>
    </table>;

    const spinnerStyle = {
      width: `350px`,
      height: `160px`,
      border: `1px solid #bdbcbc`,
      position: `relative`};

    return (
      <ErrorBoundary>
        <div className="currency-table__component">
          {(!error && !isLoading) &&
            <div className="currency-table__wrapper">{currencyTable}</div>}
          {isLoading && <Spinner>{spinnerStyle}</Spinner>}
          {error && <ErrorIndicator/>}

          <CurrenciesSelection
            dataType="currency-table-item"
            toggleHandler={this.toggle}
            activeStatus={activeStatus}
            currency={currentCurrency}
            currencyList={currencyList}
            currencyListClickHandler={this.sendCurrency}
            bgcCallback={this.backgroundsListener}/>
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = ({currencyList, currenciesTable, currencyPairService}) => {
  return {currencyList, currenciesTable, currencyPairService}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addCurrenciesValues,
    choicesCurrencyInTable
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesTable);