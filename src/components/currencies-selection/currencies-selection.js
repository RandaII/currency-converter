import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeCurrency} from "../../actions";
import SelectorButton from "../selector-button";
import CurrencyList from "../currency-list";
import PropTypes from "prop-types";
import {PropTypesTemplates as Templates} from "../../utils";

//TODO сделать передачу через контекст

const CurrenciesSelection = ({currencyListToggle, type, changeCurrency, fetch, currency, activeStatus, currencyList}) =>{
  let firstMount = true;

  const toggle = () => currencyListToggle(type);

  const sendCurrency = async ({target: {textContent: value}}) => {

    await changeCurrency({type, value});
    fetch();
    currencyListToggle(type);
  }

    let currencyListClasses = `currency-list `;

    if (activeStatus) {
      currencyListClasses += `currency-list--show`;
    } else if (!activeStatus && firstMount) {
      currencyListClasses += `currency-list--out-border`;
      firstMount = false;
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

CurrenciesSelection.propTypes = {
  currency: PropTypes.oneOf(Templates.currenciesArray).isRequired,
  type: PropTypes.oneOf([
    `currentCurrency`,
    `convertedCurrency`]).isRequired,
  fetch: PropTypes.func.isRequired,
  currencyListToggle: PropTypes.func.isRequired,
  activeStatus: PropTypes.bool.isRequired
};

const mapStateToProps = ({currencyList}) => {
  return {currencyList};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeCurrency: changeCurrency
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesSelection);