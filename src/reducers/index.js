//TODO посмотреть изменения и сделать коммит
// TODO Обратите внимание, валютные пары можно задавать в любом порядке USDRUB = 56.311 или RUBUSD = 0.01776, посмотреть возможность убрать функцию конвертацию
// TODO преобразовать структуру state, добавить типы валют

import {returnRoundValue} from "../utils";

const initialState = {
  currenciesInfo: {
    currentCurrency: `USD`,
    convertedCurrency: `RUB`,
    currentCurrencyValue: 1,
    convertedCurrencyValue: ``,
    exchangeRate: ``,
    reverseExchangeRate: ``
  },
  currencyList: [
    `RUB`,
    `USD`,
    `EUR`,
    `GBP`,
    `BYN`
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case `FETCH_PAIR_VALUE`:
      return {
        ...state,
        currenciesInfo: {
          ...state.currenciesInfo,
          exchangeRate: action.payload[0],
          reverseExchangeRate: action.payload[1],
          convertedCurrencyValue: state.currenciesInfo.currentCurrencyValue * action.payload[0]
        }
      }
    case `ADD_CURRENCY_VALUE`:
      const {type, value} = action.payload;
      const [anotherType, anotherRate] = returnAnotherCurrencyType(type);

      const convertedValue = returnConvertedValue(value, state, anotherRate);

      return {
        ...state,
        currenciesInfo: {
          ...state.currenciesInfo,

          [type]: value,
          [anotherType]: convertedValue
        }
      }
    case `CHANGE_CURRENCY`:
      return {
        ...state,
        currenciesInfo: {
          ...state.currenciesInfo,
          [action.payload.type]: action.payload.value
        }
      }

    default:
      return state;
  }
}

const returnAnotherCurrencyType = (value) => {
  if (value === `currentCurrencyValue`)
    return [`convertedCurrencyValue`, `exchangeRate`];
  else return [`currentCurrencyValue`, `reverseExchangeRate`];
}

const returnConvertedValue =
  (value, {currenciesInfo}, convertedCurrency) =>
    value ? returnRoundValue(value * currenciesInfo[convertedCurrency]) : ``;


export default reducer;