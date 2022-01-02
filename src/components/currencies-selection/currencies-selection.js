import React from 'react';
import SelectorButton from "../selector-button";
import CurrencyList from "../currency-list";
import PropTypes from "prop-types";
import {PropTypesTemplates as Templates} from "../../utils";
import {currenciesSelectionWithAnimation} from "../hoc";

import "./currencies-selection.scss";

const CurrenciesSelection = (
  {dataType, toggle, classes, activeStatus, currency, currencyList, currencyListClickHandler}) =>(
      <div className="converter__currency-type-block">
        <SelectorButton
          dataType={dataType}
          onClick={toggle}
          classNames={classes.selectorButton}>
          {currency}
        </SelectorButton>

        {activeStatus &&
        <CurrencyList
          dataType={dataType}
          classNames={classes.currencyList}
          onClick={currencyListClickHandler}>{currencyList}</CurrencyList>
        }
      </div>);


CurrenciesSelection.propTypes = {
  dataType: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    currencyList: PropTypes.string.isRequired,
    selectorButton: PropTypes.string.isRequired
  }).isRequired,
  activeStatus: PropTypes.bool.isRequired,
  currency: PropTypes.oneOf(Templates.currenciesArray).isRequired,
  currencyList: PropTypes.array.isRequired,
  currencyListClickHandler: PropTypes.func
};

export default  currenciesSelectionWithAnimation(CurrenciesSelection);