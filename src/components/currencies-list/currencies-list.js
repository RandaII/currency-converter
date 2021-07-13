import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeCurrency} from "../../actions";

// TODO сделать обработку ошибок
//TODO сделать отдельную рендер функцию

class CurrenciesList extends Component {

  firstMount = true;

  toggle = () => this.props.currencyListToggle(this.props.type);

  sendCurrency = async ({target: {textContent: value}}) => {

    const {changeCurrency, type, fetch, currencyListToggle} = this.props;

    await changeCurrency({type, value});
    fetch();
    currencyListToggle();
  }


  render() {
    const {currency, activeStatus, currencyList} = this.props;

    const currencyListItems = currencyList.map((value, index) =>
      <li className="converter__currency-list-item"
          onClick={this.sendCurrency}
          key={index}
          data-currency-item>{value}
      </li>);

    let currencyListClasses = `converter__currency-list `;

    if (activeStatus) {
      currencyListClasses += `converter__currency-list--show`;
      }
     else if (!activeStatus && this.firstMount) {
      currencyListClasses += `converter__currency-list--out-border`;
      this.firstMount = false;
    } else {
      currencyListClasses += `converter__currency-list--hide`;
    }

    let currencyListNode = <ul className={currencyListClasses}>{currencyListItems}</ul>;


    return (
      <div className="converter__currency-type-block">
        <button
          data-currency-item
          className="converter__selected-currency"
          onClick={this.toggle}
          >{currency}
          <i className="fa--converter fa fa-angle-down" data-currency-item></i>
        </button>
        {currencyListNode}
      </div>
    );
  }
}

const mapStateToProps = ({currencyList}) => {
  return {currencyList};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrency: changeCurrency
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesList);