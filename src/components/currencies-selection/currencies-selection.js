import React from 'react';
import SelectorButton from "../selector-button";
import CurrencyList from "../currency-list";
import PropTypes from "prop-types";
import {PropTypesTemplates as Templates} from "../../utils";
import {Transition} from "react-transition-group";

import "./currencies-selection.scss";
// компонет выбора валюты, передает пропсы и отвечает за анимацию вложенных компонентов
const CurrenciesSelection = (
  {dataType, toggleHandler, activeStatus, currency, currencyList, currencyListClickHandler = () =>{}}) =>(
    <div className="converter__currency-type-block">
      <Transition
        in={activeStatus}
        timeout={200}>
          {(state) =>(
              <SelectorButton
                dataType={dataType}
                onClick={toggleHandler}
                classNames={state}>
                  {currency}
              </SelectorButton>)}
      </Transition>

      <Transition
        in={activeStatus}
        timeout={200}
        mountOnEnter
        unmountOnExit>
          {(state) =>(
            <CurrencyList
              dataType={dataType}
              classNames={state}
              onClick={currencyListClickHandler}>
                {currencyList}
            </CurrencyList>)}
      </Transition>
    </div>);

CurrenciesSelection.propTypes = {
  dataType: PropTypes.string.isRequired,
  toggleHandler: PropTypes.func.isRequired,
  activeStatus: PropTypes.bool.isRequired,
  currency: PropTypes.oneOf(Templates.currenciesArray).isRequired,
  currencyList: PropTypes.array.isRequired,
  currencyListClickHandler: PropTypes.func
};

export default CurrenciesSelection;