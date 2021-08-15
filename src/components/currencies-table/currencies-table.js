import {Component} from "react";
import {connect} from "react-redux";
import withCurrencyPairService from "../hoc";
import {bindActionCreators} from "redux";
import {addCurrenciesValues, choicesCurrencyInTable} from "../../actions";
import PropTypes from "prop-types";
import currenciesTableView from "./currencies-table-view";

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

  // необходим для корректного отображения стилей
  firstMount = true;

  state = {
    activeStatus: false,
    isLoading: true,
    error: {
      status: false,
      message: null
    }
  }

  toggle = () => {
    // переключатель для currency-list
    this.setState(({activeStatus}) => {
      return {activeStatus: !activeStatus}
    });
  }

  sendCurrency = async ({target: {textContent}}) => {
    // закрываем модальное окно, отправляем в store выбранную валюту, получаем обновленные данные
    this.toggle();
    await this.props.choicesCurrencyInTable(textContent);
    await this.addAllCourses();
  }

  onError = ({message}) => {
    // функция, запускаемая при ошибке, также переводим статус загрузки в false
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

  backgroundsListener = ({target}) => {
    if (this.state.activeStatus && target.getAttribute(`data-element-type`) !== `currency-table-item`) {
      this.toggle();
    }
  }

  async componentDidMount() {
    // получаем данные и назначаем listener
    await this.addAllCourses();
    document.addEventListener(`mousedown`, this.backgroundsListener)
    this.firstMount = false;
  }

  render() {

    const {currencyList, currenciesTable: {currentCurrency, values: currenciesValue}} = this.props;
    const {activeStatus, isLoading, error: {status: error}} = this.state;
    const {firstMount, toggle, sendCurrency} = this;

    const properties = {
      currencyList,
      currentCurrency,
      currenciesValue,
      activeStatus,
      isLoading,
      error,
      firstMount,
      toggle,
      sendCurrency
    }
    return currenciesTableView({...properties});
  }
}

const mapStateToProps = ({currencyList, currenciesTable}) => {
  return {currencyList, currenciesTable}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addCurrenciesValues: addCurrenciesValues,
    choicesCurrencyInTable: choicesCurrencyInTable
  }, dispatch)
}

export default withCurrencyPairService()(connect(mapStateToProps, mapDispatchToProps)(CurrenciesTable));