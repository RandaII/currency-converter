import React, {Component} from "react";
import {connect} from "react-redux";
import withCurrencyPairService from "../hoc";
import {bindActionCreators} from "redux";
import {addCurrenciesValues, choicesCurrencyInTable} from "../../actions";
import PropTypes from "prop-types";
import CurrenciesTableView from "./currencies-table-view";

//TODO переписать код
//TODO добавить view

class CurrenciesTable extends Component {

  static propTypes = {
    addCurrenciesValues: PropTypes.func.isRequired,
    choicesCurrencyInTable: PropTypes.func.isRequired,
    currencyList: PropTypes.array.isRequired,
    currencyPairService: PropTypes.object.isRequired,
    currencyTable: PropTypes.shape({
      currentCurrency: PropTypes.string.isRequired,
      values: PropTypes.object.isRequired
    })
  };

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
    this.setState(({activeStatus}) => {
      return {activeStatus: !activeStatus}
    });
  }

  sendCurrency = async ({target: {textContent}}) => {
    this.toggle();
    await this.props.choicesCurrencyInTable(textContent);
    await this.addAllCourses();
  }

  onError = ({message}) => {
    this.setState({
      error: {
        status: true,
        message
      },
      isLoading: false
    })
  }

  addAllCourses = async () => {
    const {currencyPairService, currencyList, currencyTable: {currentCurrency}, addCurrenciesValues} = this.props;

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
    await this.addAllCourses();
    document.addEventListener(`mousedown`, this.backgroundsListener)
    this.setState({isLoading: false});
    this.firstMount = false;
  }

  render() {

    const {currencyList, currencyTable: {currentCurrency, values: currenciesValue}} = this.props;
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
    return <CurrenciesTableView {...properties}/>
  }
}

const mapStateToProps = ({currencyList, currencyTable}) => {
  return {currencyList, currencyTable}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addCurrenciesValues: addCurrenciesValues,
    choicesCurrencyInTable: choicesCurrencyInTable
  }, dispatch)
}

export default withCurrencyPairService()(connect(mapStateToProps, mapDispatchToProps)(CurrenciesTable));