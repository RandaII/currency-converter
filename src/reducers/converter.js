import {returnRoundValue, returnAnotherCurrencyType, returnConvertedValue} from "../utils";

const initialState = {
  currentCurrency: `USD`,
  convertedCurrency: `RUB`,
  currentCurrencyValue: 1,
  convertedCurrencyValue: ``,
  exchangeRate: ``,
  reverseExchangeRate: ``
};

const updateConverter = (state = initialState, action) => {
  switch (action.type) {
    case `FETCH_PAIR_VALUE`:

      const {currentCurrencyValue} = state;

      // вычисляем конвертируемое значение и округляем его
      const convertedCurrencyValue = (currentCurrencyValue) ? returnRoundValue((currentCurrencyValue * action.payload[0])) : ``;

      return {
        ...state,
        exchangeRate: action.payload[0],
        reverseExchangeRate: action.payload[1],
        convertedCurrencyValue
      }
    case `ADD_CURRENCY_VALUE`:
      const {type, value} = action.payload;
      const [anotherType, anotherRate] = returnAnotherCurrencyType(type);


      const convertedValue = returnConvertedValue(value, state, anotherRate);

      return {
          ...state,
          [type]: (value) ? value : ``,
          [anotherType]: convertedValue
        }
    case `CHANGE_CURRENCY`:
      return {
          ...state,
          [action.payload.type]: action.payload.value
        }
    default: return state;
  }
}

export default updateConverter;