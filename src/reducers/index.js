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
  ],
  currencyTable:{
    values:{},
    currentCurrency: `USD`
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case `FETCH_PAIR_VALUE`:

      const {currentCurrencyValue} = state.currenciesInfo;

      // вычисляем конвертируемое значение и округляем его
      const convertedCurrencyValue = (currentCurrencyValue) ? returnRoundValue((currentCurrencyValue * action.payload[0])) : ``;

      return {
        ...state,
        currenciesInfo: {
          ...state.currenciesInfo,
          exchangeRate: action.payload[0],
          reverseExchangeRate: action.payload[1],
          convertedCurrencyValue
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
          [type]: (value) ? +value : ``,
          [anotherType]: convertedValue
        }
      }
    case `ADD_CURRENCIES_VALUES`:
      return {
        ...state,
        currencyTable:{
          ...state.currencyTable,
          values: action.payload
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
    case `CHOICES_CURRENCY_IN_TABLE`:
      return {
        ...state,
        currencyTable: {
          ...state.currencyTable,
          currentCurrency: action.payload
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