import React, {Component} from "react";
import {connect} from "react-redux";
import {addCurrenciesValues, setCurrencyInTable ,setTableStatuses} from "../../actions";
import PropTypes from "prop-types";
import ErrorBoundary from "../error-boundary";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import CurrenciesSelection from "../currencies-selection/currencies-selection";
import CurrenciesTableView from "../currencies-table-view";
import {listDisablerHandler} from "../../utils";

class CurrenciesTable extends Component {

  static propTypes = {
    addCurrenciesValues: PropTypes.func.isRequired,
    setCurrencyInTable: PropTypes.func.isRequired,
    currencyList: PropTypes.array.isRequired,
    currenciesTable: PropTypes.shape({
      currentCurrency: PropTypes.string.isRequired,
      values: PropTypes.object.isRequired,
      dataType: PropTypes.string.isRequired,
      activeStatus: PropTypes.bool.isRequired,
      isLoading: PropTypes.bool.isRequired,
      error: PropTypes.shape({
        status: PropTypes.bool.isRequired,
        message: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      })
    })
  };

  // класс для переоформления спиннера
  spinnerClassname = `currencies-table`;
  // data для формирования header таблицы
  tableHeaderValues = [
    {id: 1, value: `Валюта`},
    {id: 2, value: `Цена`}
  ];

  // переключатель activeStatus для currency-list
  toggle = () => this.props.setTableStatuses(!this.props.currenciesTable.activeStatus);

  // отправляем в store выбранную валюту, получаем обновленные данные
  sendCurrency = async (value) => {
    await this.props.setCurrencyInTable(value);
    this.props.addCurrenciesValues();
  }

  // listener отслеживает клики, при любом активном currency-list, при клике, вне окна, или же при смене фокуса на элемент без необходимого dataType, меняет состояние на false
  listDisabler = (evt) => {
    const {dataType, activeStatus} = this.props.currenciesTable;
    const func = () => this.props.setTableStatuses(false);
    // для проверки соблюдения условий, используется общий handler
    listDisablerHandler(evt, activeStatus, dataType, func);
  };

  // получаем данные после монтирования и назначаем обработчики
  componentDidMount() {
    this.props.addCurrenciesValues();
    document.addEventListener(`click`, this.listDisabler);
    document.addEventListener(`keyup`, this.listDisabler);
  }

  componentWillUnmount() {
    document.removeEventListener(`click`, this.listDisabler);
    document.removeEventListener(`keyup`, this.listDisabler);
  }

  render() {

    const {currencyList, currenciesTable: {currentCurrency, values: bodyValues, dataType, activeStatus, isLoading, error: {status: error}}} = this.props;

    // data для построения таблицы
    const tableData = {
      headerValues: this.tableHeaderValues,
      bodyValues
    }

    let tableComponent;

    // отображаем нужный компонент в зависимости от state
    if (!error && !isLoading){
      tableComponent = <CurrenciesTableView>{tableData}</CurrenciesTableView>
    }
    else if (isLoading){
      tableComponent = <Spinner>{this.spinnerClassname}</Spinner>;
    }
    else if(error){tableComponent = <ErrorIndicator/>;}

    return (
      <ErrorBoundary>
        <div className="currency-table__component">
          {tableComponent}
          <CurrenciesSelection
            dataType={dataType}
            toggleHandler={this.toggle}
            activeStatus={activeStatus}
            currency={currentCurrency}
            currencyList={currencyList}
            currencyListClickHandler={this.sendCurrency}/>
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = ({currencyList, currenciesTable}) => ({currencyList, currenciesTable})

const mapDispatchToProps ={
    addCurrenciesValues,
    setCurrencyInTable,
    setTableStatuses
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesTable);