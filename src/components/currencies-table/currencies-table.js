import React, {Component} from "react";
import {connect} from "react-redux";
import {addCurrenciesValues, setCurrencyInTable} from "../../actions";
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
    currencyPairService: PropTypes.object.isRequired,
    currenciesTable: PropTypes.shape({
      currentCurrency: PropTypes.string.isRequired,
      values: PropTypes.object.isRequired,
      dataType: PropTypes.string.isRequired
    })
  };

  _INITIAL_STATE ={
    activeStatus: false,
    isLoading: true,
    error: {
      status: false,
      message: null
    }
  };

  state = {...this._INITIAL_STATE};

  // класс для переоформления спиннера
  spinnerClassname = `currencies-table`;
  // data для формирования header таблицы
  tableHeaderValues = [
    {id: 1, value: `Валюта`},
    {id: 2, value: `Цена`}
  ];

  // переключатель activeStatus для currency-list
  toggle = () => this.setState(({activeStatus}) =>({activeStatus: !activeStatus}));

  // отправляем в store выбранную валюту, получаем обновленные данные
  sendCurrency = async (value) => {
    await this.props.setCurrencyInTable(value);
    await this.addAllCourses();
  }

  // Error-handler, запускаемый при ошибке, также переводим статус загрузки в false
  onError = (err) => {
    this.setState({
      error: {
        status: true,
        message: err.message
      },
      isLoading: false
    });
    throw err;
  }

  // добавления курсов валют
  addAllCourses = async () => {
    const {currencyPairService, currencyList, currenciesTable: {currentCurrency}, addCurrenciesValues} = this.props;

    // до начала получения данных, применяем initialState, после получения, отсылаем в store и переводим loading в false
    this.setState({...this._INITIAL_STATE});

    await currencyPairService.getAllCourses(currentCurrency, currencyList)
      .then(addCurrenciesValues)
      .catch(this.onError);

    this.setState({isLoading: false});
  }

  // listener отслеживает клики, при любом активном currency-list, при клике, вне окна, или же при смене фокуса на элемент без необходимого dataType, меняет состояние на false
  listDisabler = (evt) => {

    const {activeStatus} = this.state;
    const {dataType} = this.props.currenciesTable;
    const func = () => this.setState({activeStatus: false});
    // для проверки соблюдения условий, используется общий handler
    listDisablerHandler(evt, activeStatus, dataType, func);
  };

  // получаем данные после монтирования и назначаем обработчики
  componentDidMount() {
    this.addAllCourses();
    document.addEventListener(`click`, this.listDisabler);
    document.addEventListener(`keyup`, this.listDisabler);
  }

  componentWillUnmount() {
    document.removeEventListener(`click`, this.listDisabler);
    document.removeEventListener(`keyup`, this.listDisabler);
  }

  render() {

    const {currencyList, currenciesTable: {currentCurrency, values: bodyValues, dataType}} = this.props;
    const {activeStatus, isLoading, error: {status: error}} = this.state;
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

const mapStateToProps = ({currencyList, currenciesTable, currencyPairService}) => ({currencyList, currenciesTable, currencyPairService})

const mapDispatchToProps ={
    addCurrenciesValues,
    setCurrencyInTable
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesTable);