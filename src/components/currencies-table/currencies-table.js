import React, {Component} from "react";
import {connect} from "react-redux";
import withCurrencyPairService from "../hoc";
import {bindActionCreators} from "redux";
import {addCurrenciesValues, choicesCurrencyInTable} from "../../actions";
import SelectorButton from "../selector-button";
import CurrencyList from "../currency-list";
import Spinner from "../spinner";

//TODO переписать код

class CurrenciesTable extends Component {

  firstMount = true;

  state = {
    activeStatus:  false,
    isLoading: true
  }

  toggle = () =>{
    this.setState((state) =>{
      return {activeStatus: !state.activeStatus}
    });
  }

  sendCurrency = async ({target: {textContent}}) =>{
    this.toggle();
    this.setState({isLoading: true});
    await this.props.choicesCurrencyInTable(textContent);
    await this.addAllCourses();
    this.setState({isLoading: false});
  }

  addAllCourses = async () =>{
    const {currencyPairService, currencyList, currencyTable:{currentCurrency}, addCurrenciesValues} = this.props;
    let values = await currencyPairService.getAllCourse(currentCurrency, currencyList);
    addCurrenciesValues(values);
  }

  backgroundsListener = ({target}) =>{
    if (this.state.activeStatus && target.getAttribute(`data-element-type`) !== `currency-table-item`){
      this.toggle();
    }
  }

  async componentDidMount() {
    await this.addAllCourses();
    document.addEventListener(`mousedown`,this.backgroundsListener)
    this.setState({isLoading: false});
    this.firstMount = false;
  }

  render() {

    const {currencyList, currencyTable:{currentCurrency}} = this.props;
    const {activeStatus, isLoading} = this.state;

    let items = currencyList.map((item, i) => {
      if (item !== currentCurrency) {
        let pair = currentCurrency + item;

        return (<tr className="currency-table__row" key={i}>
          <td>{currentCurrency}/{item}</td>
          <td>{this.props.currencyTable.values[pair]}</td>
        </tr>);
      }
    });

    let currencyListClasses = `currency-list `;

    if (activeStatus) {
      currencyListClasses += `currency-list--show`;
    }
    else if (!activeStatus && this.firstMount) {
      currencyListClasses += `currency-list--out-border`;

    } else {
      currencyListClasses += `currency-list--hide`;
    }

    return (
      <div className="currency-table__component">
        <div className="currency-table__wrapper">
          <table className="currency-table">
            <thead>
            <tr className="currency-table__row">
              <th>Валюта</th>
              <th>Цена</th>
            </tr>
            </thead>
            <tbody>
            {items}
            </tbody>
          </table>
          {isLoading && <Spinner/>}
        </div>

        <div>

          <SelectorButton
            className="selected-currency-button"
            dataType="currency-table-item"
            onClick={this.toggle}
            activeStatus={activeStatus}>{currentCurrency}
          </SelectorButton>

          <CurrencyList
            currencyArray={currencyList}
            onClick={this.sendCurrency}
            elementType="currency-table-item"
            className={currencyListClasses}
          ></CurrencyList>

        </div>
      </div>
    )
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