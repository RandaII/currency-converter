import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeCurrency} from "../../actions";
import SelectorButton from "../selector-button";
import CurrencyList from "../currency-list";
import PropTypes from "prop-types";
import {PropTypesTemplates as Templates} from "../../utils";

import "./currencies-selection.scss";

class CurrenciesSelection extends Component{

  static propTypes = {
    currency: PropTypes.oneOf(Templates.currenciesArray).isRequired,
    type: PropTypes.oneOf([
      `currentCurrency`,
      `convertedCurrency`]).isRequired,
    fetch: PropTypes.func.isRequired,
    currencyListToggle: PropTypes.func.isRequired,
    activeStatus: PropTypes.bool.isRequired
  };

  firstMount = true;

  toggle = () => this.props.currencyListToggle(this.props.type);

  sendCurrency = async ({target: {textContent: value}}) => {

    const {changeCurrency, type, fetch, currencyListToggle} = this.props;

    await changeCurrency({type, value});
    fetch();
    currencyListToggle(type);
  }

  render(){
    const {activeStatus, currency, currencyList} = this.props;
    const {firstMount, toggle, sendCurrency} = this;

    let currencyListClasses = `currency-list `;

    if (activeStatus) {
      currencyListClasses += `currency-list--show`;
    } else if (!activeStatus && firstMount) {
      currencyListClasses += `currency-list--out-border`;
      this.firstMount = false;
    } else {
      currencyListClasses += `currency-list--hide`;
    }

    return (
      <div className="converter__currency-type-block">

        <SelectorButton
          dataType="currency-converter-item"
          onClick={toggle}
          activeStatus={activeStatus}>
          {currency}
        </SelectorButton>

        <CurrencyList
          currencyArray={currencyList}
          className={currencyListClasses}
          dataType="currency-converter-item"
          onClick={sendCurrency}/>

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

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesSelection);